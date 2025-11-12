import { CreateUser } from "@moodly/core";
import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth.middleware";
import userService from "../services/user.service";

export default function userController(fastify: FastifyInstance) {
  fastify.post<{
    Body: CreateUser;
  }>("/", async (req, reply) => {
    const { name, email, password } = req.body;

    try {
      await userService.createUser({ name, email, password });
      const payload = { name, email };
      const token = fastify.jwt.sign(payload);
      reply.send({ message: "user created", token }).code(201);
    } catch (error) {
      reply.send(error).code(400);
    }
  });

  fastify.get("/", { preHandler: authMiddleware }, async (req, reply) => {
    const payload = req.user;
    reply.send(payload);
  });
}
