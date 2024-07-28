import { FastifyReply, FastifyRequest } from "fastify";
import { GetDirectChatUseCase } from "../../../../application/message/use-cases/get-direct-chat";
import { z } from "zod";

export async function getDirectChatController(request: FastifyRequest, reply: FastifyReply) {
  try { 
    const id = request.user.sub;

    const getDirectChatSchema = z.object({
      contactId: z.string()
    })
    const { contactId } = getDirectChatSchema.parse(request.params)

    const getDirectChatUseCase = new GetDirectChatUseCase()

    const { chat } = await getDirectChatUseCase.execute({
      userId: id, contactId,
    })

    reply.status(200).send(chat)
  } catch (error) { 
    console.log(error)
    reply.status(500).send(error)
  }
}