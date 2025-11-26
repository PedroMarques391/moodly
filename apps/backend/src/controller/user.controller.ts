import { createUserDTO, LoginUser, updateUserDTO } from "@moodly/core";
import { FastifyInstance, FastifyReply } from "fastify";
import { makeUserService } from "../factories/user.factory";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Request } from "../types/IRequest";

export default function userController(fastify: FastifyInstance) {
  const userService = makeUserService();

  fastify.post<{
    Body: createUserDTO;
  }>("/", async (req, reply) => {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    try {
      const payload = await userService.createUser({ name, email, password });
      const token = fastify.jwt.sign(payload);
      reply.send({ token }).code(201);
    } catch (error) {
      reply.send(error).code(400);
    }
  });

  fastify.post<{ Body: LoginUser }>("/login", async (req, reply) => {
    const { email, password } = req.body;
    try {
      const payload = await userService.loginUser({ email, password });
      const token = fastify.jwt.sign(payload);
      reply.send({ token }).code(200);
    } catch (error) {
      reply.send(error).code(400);
    }
  });

  fastify.get(
    "/profile",
    { preHandler: authMiddleware },
    async (req: Request, reply: FastifyReply) => {
      const { email } = req.user;

      try {
        const user = await userService.getUser(email);
        reply.send(user).code(200);
      } catch (error) {
        reply.send(error).code(400);
      }
    }
  );

  fastify.put<{ Body: updateUserDTO }>(
    "/profile",
    { preHandler: authMiddleware },
    async (req: Request, reply: FastifyReply) => {
      const data = req.body;
      const { id } = req.user;
      try {
        await userService.update(id, data);
        reply.send({ message: "User updated" }).code(200);
      } catch (error) {
        reply.send(error).code(400);
      }
    }
  );
}
