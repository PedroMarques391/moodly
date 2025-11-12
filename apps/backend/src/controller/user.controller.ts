import { CreateUser, LoginUser } from "@moodly/core";
import { FastifyInstance } from "fastify";
import userService from "../services/user.service";

export default function userController(fastify: FastifyInstance) {
  fastify.post<{
    Body: CreateUser;
  }>("/", async (req, reply) => {
    const { name, email, password } = req.body;

    try {
      await userService.createUser({ name, email, password });
      const token = fastify.jwt.sign({ name, email });
      reply.send(token).code(201);
    } catch (error) {
      reply.send(error).code(400);
    }
  });

  fastify.post<{ Body: LoginUser }>("/login", async (req, reply) => {
    const { email, password } = req.body;
    try {
      const user = await userService.loginUser({ email, password });
      const token = fastify.jwt.sign(user);
      reply.send(token).code(200);
    } catch (error) {
      reply.send(error).code(400);
    }
  });
}
