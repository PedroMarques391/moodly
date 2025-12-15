import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify, { FastifyInstance } from "fastify";
import moodController from "./controller/mood.controller";
import userController from "./controller/user.controller";
import authPlugin from "./plugins/auth.plugin";
import { errorHandlerPlugin } from "./plugins/error.handler";

const server: FastifyInstance = fastify();

const port: number = 3000;

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "@moodly-api",
      description: "Documentação da API do aplicativo moodly.",
      version: "1.0.0",
    },
    tags: [
      {
        name: "User",
        description: "Operações relacionadas aos users.",
      },
      {
        name: "Mood",
        description: "Operações relacionadas aos moods.",
      },
    ],
  },
});

server.register(errorHandlerPlugin);

server.register(
  async function (app: FastifyInstance) {
    await app.register(authPlugin);
    app.register(userController, { prefix: "/users" });
    app.register(async function (protectedApp: FastifyInstance) {
      protectedApp.addHook("onRequest", app.authenticate);
      protectedApp.register(moodController, { prefix: "/mood" });
    });
  },
  { prefix: "/api/v1" }
);
server.register(fastifySwaggerUi, { routePrefix: "/docs" });

server.listen({ port: port, host: "0.0.0.0" }, (err, _) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`server listening on http://localhost:${port}`);
});
