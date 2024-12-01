import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import restaurantsRoute from "./routes/restaurants";
import restaurantDetailRoute from "./routes/restaurantDetail";
import photoRoute from "./routes/photo";

dotenv.config();

const server = Fastify({ logger: true });

// Register CORS plugin
server.register(fastifyCors, {
  origin: ["http://localhost", "http://localhost:3000", "http://localhost:80"],
});

// Register routes
server.register(restaurantsRoute);
server.register(restaurantDetailRoute);
server.register(photoRoute);

const start = async () => {
  try {
    await server.listen({ port: 5000, host: "0.0.0.0" });
    console.log("Server is running on http://localhost:5000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
