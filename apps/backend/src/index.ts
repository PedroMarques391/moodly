import fastifyJwt from "@fastify/jwt";
import fastify, { FastifyInstance } from "fastify";
import moodController from "./controller/mood.controller";
import userController from "./controller/user.controller";
import { authMiddleware } from "./middlewares/auth.middleware";
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
    app.register(async function (protectedRouters: FastifyInstance) {
      protectedRouters.addHook("onRequest", authMiddleware);
      protectedRouters.register(moodController, { prefix: "/mood" });
    });
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
