import { createUserDTO, LoginUser, updateUserDTO } from "@moodly/core";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { makeUserService } from "../factories/user.factory";
import { UserSchema } from "../schemes/UserSchema";

export default function userRouter(fastify: FastifyInstance) {
  const userService = makeUserService();

  fastify.post<{
    Body: createUserDTO;
  }>(
    "/",
    {
      schema: UserSchema.createUser,
    },
    async (req, reply) => {
      const { name, email, password } = req.body;
      try {
        const payload = await userService.createUser({ name, email, password });
        const token = fastify.jwt.sign(payload);
        reply.send({ token }).code(201);
      } catch (error) {
        reply.send({ message: error.message }).code(400);
      }
    }
  );

  fastify.post<{ Body: LoginUser }>(
    "/login",
    {
      schema: UserSchema.loginUser,
    },
    async (req, reply) => {
      const { email, password } = req.body;
      try {
        const payload = await userService.loginUser({ email, password });
        const token = fastify.jwt.sign(payload);
        reply.code(201).send({ token });
      } catch (error) {
        reply.code(400).send({ error: 400, message: error.message });
      }
    }
  );

  fastify.get(
    "/profile",
    {
      onRequest: [fastify.authenticate],
      schema: {
        tags: ["User"],
        summary: "Listar usuário pelo email.",
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
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
    {
      onRequest: [fastify.authenticate],
      schema: UserSchema.updateUser,
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
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
