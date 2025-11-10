import { FastifyInstance } from "fastify";
import { IUsers } from "../interfaces";

export default function userRouter(fastify: FastifyInstance) {
  const users = [
    { name: "joe", age: 20 },
    { name: "bob", age: 30 },
  ];

  fastify.post<{ Body: Partial<IUsers> }>("/", async (req, reply) => {
    reply.send(users);
  });
}
