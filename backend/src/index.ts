import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import restaurantsRoutes from "./routes/restaurants";

dotenv.config();

const server = Fastify({ logger: true });

// Register CORS plugin
server.register(fastifyCors, {
  origin: ["http://localhost:3000"],
});

// Register routes
server.register(restaurantsRoutes);

const start = async () => {
  try {
    await server.listen({ port: 5000 });
    console.log("Server is running on http://localhost:5000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
