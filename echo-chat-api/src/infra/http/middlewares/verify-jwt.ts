import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err: any) {
    if (err?.code === 'FST_JWT_NO_AUTHORIZATION_IN_COOKIE') {
      return reply.status(400).send({ message: 'Token not found.' })
    }

    if (
      err?.code === 'FST_JWT_BAD_REQUEST' ||
      err?.code === 'FAST_JWT_MISSING_SIGNATURE'
    ) {
      return reply.status(400).send({ message: 'Token invalid format.' })
    }

    if (err?.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
      return reply.status(401).send({ message: 'Token expired.' })
    }

    if (err?.code === 'FST_JWT_AUTHORIZATION_TOKEN_INVALID') {
      return reply.status(401).send({ message: 'Token invalid.' })
    }

    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}