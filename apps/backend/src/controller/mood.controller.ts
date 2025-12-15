import { CreateMoodDTO } from "@moodly/core";
import { FastifyInstance } from "fastify";
import { makeMoodService } from "../factories/mood.factory";
import { MoodScheme } from "../schemes/MoodSchema";

export default function moodController(fastify: FastifyInstance) {
  const moodService = makeMoodService();
  fastify.post<{ Body: CreateMoodDTO }>(
    "/",
    {
      schema: MoodScheme.createMood,
    },
    async (req, reply) => {
      const data = req.body;
      const { id } = req.user;
      try {
        await moodService.createMood(id, data);
        reply.code(201);
      } catch (error) {
        reply.send(error).code(400);
      }
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Mood"],
        summary: "Listar moods pelo userId.",
      },
    },
    async (req, reply) => {
      const { id } = req.user;
      try {
        const moods = await moodService.getMoods(id);
        reply.send(moods).code(200);
      } catch (error) {
        reply.send(error).code(400);
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Mood"],
        summary: "Excluir Mood pelo id.",
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      try {
        await moodService.deleteMood(id);
        reply.send().code(204);
      } catch (error) {
        reply.send(error).code(400);
      }
    }
  );

  fastify.put<{ Body: CreateMoodDTO; Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["Mood"],
        summary: "Atualizar Mood pelo id.",
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const data = req.body;
      try {
        await moodService.updateMood(id, data);
        reply.send({ message: "MOOD_UPDATED" }).code(204);
      } catch (error) {
        reply.send(error).code(400);
      }
    }
  );
}
