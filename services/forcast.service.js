class ForcastService {
  constructor() {
    this.CURRENT_URL_FORCAST =
      "https://api.weatherapi.com/v1/current.json?key=";
    this.redisClient = null; // Redis client will be set later
  }

  setRedisClient(client) {
    this.redisClient = client; // Assign the connected Redis client
  }

  async getFromCache(key) {
    try {
      return await this.redisClient.get(key);
    } catch (err) {
      console.error("Error fetching from Redis:", err);
      return null;
    }
  }

  async saveToCache(key, value, ttl = 43200) {
    // Cache for 12 hours (43200 seconds)
    try {
      await this.redisClient.set(key, value, { EX: ttl });
    } catch (err) {
      console.error("Error saving to Redis:", err);
    }
  }

  async getCurrentForcastByLatAndLong(lat, long) {
    const cacheKey = `forecast_${lat}_${long}`;
    const cachedData = await this.getFromCache(cacheKey);

    console.log("from cash", cachedData);
    if (cachedData) {
      return JSON.parse(cachedData); // Return cached data if available
    }

    // Fetch data from API if not in cache
    const url = `${this.CURRENT_URL_FORCAST}${process.env.API_KEY}&q=${lat},${long}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();

    // Cache the response data
    await this.saveToCache(cacheKey, JSON.stringify(data?.current?.temp_c));

    return data;
  }

  async getCurrentForcastByCityName(cityName) {
    const cacheKey = `forecast_${cityName}`;
    const cachedData = await this.getFromCache(cacheKey);
    console.log("from cash", cachedData);

    if (cachedData) {
      return JSON.parse(cachedData); // Return cached data if available
    }

    // Fetch data from API if not in cache
    const url = `${this.CURRENT_URL_FORCAST}${process.env.API_KEY}&q=${cityName}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();

    // Cache the response data
    await this.saveToCache(cacheKey, JSON.stringify(data?.current?.temp_c));

    return data;
  }
}

module.exports = new ForcastService();
