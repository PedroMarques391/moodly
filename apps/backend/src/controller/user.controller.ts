import { CreateUser } from "@moodly/core";
import { FastifyInstance } from "fastify";
import userService from "../services/user.service";

export default function userController(fastify: FastifyInstance) {
  fastify.post<{
    Body: CreateUser;
  }>("/", async (req, reply) => {
    const { name, email, password } = req.body;

    try {
      await userService.createUser({ name, email, password });
      reply.send({ message: "user created" }).code(201);
    } catch (error) {
      reply.send(error).code(400);
    }
  });
}
