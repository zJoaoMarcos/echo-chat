import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";

import { env } from "./infra/env";
import { routes } from "./infra/http/controllers/routes";
import { connectToDatabase } from "./infra/db/moongo-db";
import fastifySocketIO from "./infra/socket/fastify-socket";

export const app = fastify()

connectToDatabase()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(fastifyCors)
app.register(routes)
app.register(fastifySocketIO, { 
  cors: {
    origin: "*"
  },
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})