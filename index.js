require("dotenv").config();
const express = require("express");
const { createClient } = require("redis");
const publicRoutes = require("./routes/public.routes");
const forcastService = require("./services/forcast.service");

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(express.json());
app.use(publicRoutes);

// Initialize Redis client
async function initializeRedis() {
  const client = createClient({
    url: `redis://${process.env.REDIS_HOST || "localhost"}:${
      process.env.REDIS_PORT || 6379
    }`,
  });

  client.on("error", (err) => {
    console.error("Redis error:", err);
  });

  try {
    await client.connect();
    console.log("Connected to Redis");
    return client;
  } catch (err) {
    console.error("Error connecting to Redis:", err);
    process.exit(1); // Exit process on Redis connection failure
  }
}

// Start the server
async function startServer() {
  try {
    const redisClient = await initializeRedis(); // Wait for Redis to be connected

    // Pass the Redis client to the forecast service
    forcastService.setRedisClient(redisClient);

    // Start Express server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
