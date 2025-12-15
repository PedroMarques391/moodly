import {
  FastifyError,
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import fp from "fastify-plugin";
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from "fastify-type-provider-zod";
import { Prisma } from "../generated/prisma/client";

const errorHandlerPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
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
      if (hasZodFastifySchemaValidationErrors(error)) {
        return reply.code(400).send({
          error: "Response Validation Error",
          message: error.message,
          statusCode: 400,
          details: {
            issues: error.validation,
            method: req.method,
            url: req.url,
          },
        });
      }

      if (isResponseSerializationError(error)) {
        return reply.code(500).send({
          error: "Internal Server Error",
          message: "Response doesn't match the schema",
          statusCode: 500,
          details: {
            issues: error.cause.issues,
            method: error.method,
            url: error.url,
          },
        });
      }
    }
  );
};

export default fp(errorHandlerPlugin);
