import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { getChatController } from "./get-chats";
import { getDirectChatController } from "./get-direct-chat";

export async function chatRoutes(app: FastifyInstance) { 
  app.get('/userId', { onRequest: [verifyJwt] }, getChatController)
  app.get('/direct/:contactId', { onRequest: [verifyJwt] }, getDirectChatController)
}