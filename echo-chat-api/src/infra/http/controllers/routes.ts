import { FastifyInstance } from "fastify";
import { userRoutes } from "./users-routes";
import { chatRoutes } from "./chat.routes";

export async function routes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: 'users' })
  app.register(chatRoutes, { prefix: 'chats' })
}