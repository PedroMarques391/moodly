import { FastifyRequest } from "fastify";

export interface Request extends FastifyRequest {
  user: {
    id: string;
    email: string;
  };
}
