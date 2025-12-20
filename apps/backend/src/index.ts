import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify, { FastifyInstance } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import authPlugin from "./plugins/auth.plugin";
import errorHandlerPlugin from "./plugins/error.handler";
import moodRouter from "./router/mood.router";
import userRouter from "./router/user.router";

const server: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>();

const port: number = 3000;

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

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
    app.register(userRouter, { prefix: "/users" });
    app.register(async function (protectedApp: FastifyInstance) {
      protectedApp.addHook("onRequest", app.authenticate);
      protectedApp.register(moodRouter, { prefix: "/mood" });
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
