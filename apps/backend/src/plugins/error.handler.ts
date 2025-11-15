import {
  FastifyError,
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import fp from "fastify-plugin";
import { Prisma } from "../generated/prisma/client";

export const errorHandlerPlugin: FastifyPluginAsync = async (
  app: FastifyInstance
) => {
  app.setErrorHandler(
    (error: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
      const isDbOffline =
        error.code === "P1001" ||
        error instanceof Prisma.PrismaClientInitializationError;

      if (isDbOffline) {
        req.log.error("Banco de dados offline");
        return reply.status(503).send({
          error: "DATABASE_OFFLINE",
          message: "Não foi possível conectar ao banco de dados.",
        });
      }
      req.log.error(error);
      return reply.status(500).send({
        error: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  );
};

fp(errorHandlerPlugin);
