import fastifyJwt from "@fastify/jwt";
import fastify, { FastifyInstance } from "fastify";
import userController from "./controller/user.controller";
import { errorHandlerPlugin } from "./plugins/error.handler";

const server: FastifyInstance = fastify();

const port: number = 3000;

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

server.register(errorHandlerPlugin);

server.register(
  async function (app: FastifyInstance) {
    app.register(userController, { prefix: "/users" });
  },
  { prefix: "/api/v1" }
);

server.listen({ port: port, host: "0.0.0.0" }, (err, _) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`server listening on http://localhost:${port}`);
});
