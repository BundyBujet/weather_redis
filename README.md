# Weather API with Redis caching

A simple weather API built with Node.js, Express.js and Redis as caching database.

## Technologies used

- Node.js
- Express.js
- Redis

## How it works

The API fetches the current weather data from the [Weather API](https://www.weatherapi.com/) and stores it in Redis for 12 hours. If the same request is made again within the 12 hour period, the API will return the cached data from Redis instead of fetching it from the Weather API again.

## Endpoints

- `GET /myloc?q=<lat>,<lon>`: Returns the current weather data for the given latitude and longitude.
- `GET /city?q=<city name>`: Returns the current weather data for the given city name.

## Running the API

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file with the following variables:
   - `API_KEY`: Your Weather API key
   - `REDIS_HOST`: The hostname of your Redis server
   - `REDIS_PORT`: The port number of your Redis server
4. Run `npm start` to start the API

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
