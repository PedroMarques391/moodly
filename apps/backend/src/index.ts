import fastify, { FastifyInstance } from "fastify";

import userController from "./controller/user.controller";

const server: FastifyInstance = fastify();

const port: number = 3000;

server.register(
  async function (app: FastifyInstance) {
    app.register(userController, { prefix: "/users" });
  },
  { prefix: "/api/v1" }
);

server.listen({ port: port }, (err, _) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`server listening on http://localhost:${port}`);
});
