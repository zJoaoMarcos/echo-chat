import { FastifyReply, FastifyRequest } from "fastify";
import { GetChatsUseCase } from "../../../../application/message/use-cases/get-chats";

export async function getChatController(request: FastifyRequest, reply: FastifyReply) {
  try { 
    const id = request.user.sub;

    const getChatUseCase = new GetChatsUseCase()

    const { chats } = await getChatUseCase.execute({
      userId: id
    })

    reply.status(200).send({ chats })
  } catch (error) { 
    console.log(error)
    reply.status(500).send(error)
  }
}