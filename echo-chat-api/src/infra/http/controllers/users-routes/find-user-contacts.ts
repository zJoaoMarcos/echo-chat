import { FastifyReply, FastifyRequest } from "fastify";
import { FindUserContactsUseCase } from "../../../../application/users/use-cases/find-user-contacts";


export async function findUserContactsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const id = request.user.sub;

    const findUserContactsUseCase = new FindUserContactsUseCase();

    const { contacts } = await findUserContactsUseCase.execute({
      userId: id,
    });

    reply.status(200).send({ contacts });
  } catch (error) {
    console.log(error);
    reply.status(500).send(error);
  }
}
