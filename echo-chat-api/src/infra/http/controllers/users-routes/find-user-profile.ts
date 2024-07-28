import { FastifyReply, FastifyRequest } from "fastify";

import { FindUserProfileUseCase } from "../../../../application/users/use-cases/find-user-profile";

export async function findUserProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const id = request.user.sub;

    const findUserProfileUseCase = new FindUserProfileUseCase();

    const { user } = await findUserProfileUseCase.execute({
      id,
    });

    reply.status(200).send({ user });
  } catch (error) {
    console.log(error);
    reply.status(500).send(error);
  }
}
