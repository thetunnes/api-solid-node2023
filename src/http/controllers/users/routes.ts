import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJWT } from '@/http/middlewares/verify-jwt';

export async function UsersRoutes(app: FastifyInstance) {

  app.post('/users', register);
  app.post('/sessions', authenticate);


  /* Authneticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}