import { fastify } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { UsersRoutes } from './http/controllers/users/routes';
import { GymsRoutes } from './http/controllers/gyms/routes';
import { ZodError } from 'zod';
import { env } from './env';
import { CheckInsRoutes } from './http/controllers/check-ins/routes';

export const app = fastify();

app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
});

app.register(UsersRoutes);
app.register(GymsRoutes);
app.register(CheckInsRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});