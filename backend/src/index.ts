import fastify from "fastify";
import userRouter from "./routes/user.router";

const server = fastify();

const port: number = 3000;

server.register(userRouter, { prefix: "/users" });

server.listen({ port: port }, (err, _) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`server listening on http://localhost:${port}`);
});
