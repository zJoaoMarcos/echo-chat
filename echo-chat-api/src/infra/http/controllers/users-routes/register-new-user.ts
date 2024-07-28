import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'

import { RegisterNewUserUseCase } from "../../../../application/users/use-cases/register-new-user";


export async function registerNewUserController(request: FastifyRequest, reply: FastifyReply) {
    const registerSchema = z.object({
    name: z.string(),
    email: z.string(),
    avatar: z.string().optional(),
    password: z.string(),
    phone: z.string()
  })

  const { name, email, avatar, password, phone } = registerSchema.parse(request.body)

  try {
    const registerNewUserUseCase = new RegisterNewUserUseCase()
    
   const { user } = await  registerNewUserUseCase.execute({
      name, email, avatar, password, phone
    })

    reply.status(201).send({ user })
  } catch (error) {
    console.log(error)
    reply.status(500).send(error)
  }
}