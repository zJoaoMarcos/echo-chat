import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticateUserUseCase } from "../../../../application/users/use-cases/authenticate-user";

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateUserSchema = z.object({
    identifier: z.string(),
    password: z.string(),
  });

  const { identifier, password } = authenticateUserSchema.parse(request.body);

  try {
    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const { user } = await authenticateUserUseCase.execute({
      identifier,
      password,
    });

    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user._id.toString(),
        },
      }
    );

    reply.status(200).send({ user, accessToken });
  } catch (error) {
    reply.status(500).send(error);
  }
}
