import { CreateUser, LoginUser, UpdateUser, User } from "@moodly/core";
import { FastifyInstance, FastifyReply } from "fastify";
import { authMiddleware } from "../middlewares/auth.middleware";
import userService from "../services/user.service";

export default function userController(fastify: FastifyInstance) {
  fastify.post<{
    Body: CreateUser;
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

  fastify.get<{ Params: Pick<User, "email"> }>(
    "/:email",
    { preHandler: authMiddleware },
    async (req, reply: FastifyReply) => {
      const { email } = req.params;
      try {
        const user = await userService.getUser(email);
        reply.send(user).code(200);
      } catch (error) {
        reply.send(error).code(400);
      }
    }
  );

  fastify.put<{ Body: UpdateUser; Params: Pick<User, "id"> }>(
    "/:id",
    { preHandler: authMiddleware },
    async (req, reply: FastifyReply) => {
      const data = req.body;
      const { id } = req.params;
      try {
        await userService.update(id, data);
        reply.send({ message: "User updated" }).code(200);
      } catch (error) {
        reply.send(error).code(400);
      }
    }
  );
}
