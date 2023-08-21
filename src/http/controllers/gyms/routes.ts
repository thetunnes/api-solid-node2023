import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';

export async function GymsRoutes(app: FastifyInstance) {

  app.addHook('onRequest', verifyJWT);
  /* Authneticated */


  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);

  app.post('/gyms/create', create);
}