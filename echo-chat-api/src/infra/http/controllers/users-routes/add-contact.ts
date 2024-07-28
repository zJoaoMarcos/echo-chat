import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AddContactUseCase } from "../../../../application/users/use-cases/add-contact";

export async function addContactController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.sub

  const addContactSchema = z.object({
    contact: z.object({
      name: z.string(),
      phone: z.string(),
    })
  });

  const { contact } = addContactSchema.parse(request.body);

  try {
    const addContactUseCase = new AddContactUseCase();

    const { contacts } = await addContactUseCase.execute({ userId,
      newContact: contact
    });
    
    reply.status(200).send({ contacts });
  } catch (error) {
    reply.status(500).send(error);
  }
}
