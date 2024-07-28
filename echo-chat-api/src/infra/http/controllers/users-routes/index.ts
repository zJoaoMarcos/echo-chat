import { FastifyInstance } from "fastify";

import { registerNewUserController } from "./register-new-user";
import { authenticateUserController } from "./authenticate-user";
import { findUserProfileController } from "./find-user-profile";

import { verifyJwt } from "../../middlewares/verify-jwt";
import { addContactController } from "./add-contact";

export async function userRoutes(app: FastifyInstance) {
  app.post('/', registerNewUserController)
  app.post('/auth', authenticateUserController)

  /* authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, findUserProfileController)
  app.get('/contact', { onRequest: [verifyJwt] }, addContactController)
  app.post('/contact', { onRequest: [verifyJwt] }, addContactController)
}