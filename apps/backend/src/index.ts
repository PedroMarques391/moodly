import dotenv from "dotenv";
import fastify, { FastifyInstance } from "fastify";
dotenv.config();

import userController from "./controller/user.controller";

const server: FastifyInstance = fastify();

const port: number = 3000;

server.register(userController, { prefix: "/users" });

server.listen({ port: port }, (err, _) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`server listening on http://localhost:${port}`);
});
