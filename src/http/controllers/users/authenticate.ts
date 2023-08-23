import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { email, password } = registerBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password});

    const token = await rep.jwtSign({
      role: user.role
    }, {
      sign: {
        sub: user.id
      }
    });
    
    const refreshToken = await rep.jwtSign({
      role: user.role
    }, {
      sign: {
        sub: user.id,
        expiresIn: '7d'
      }
    });

    return rep.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    }).status(201).send({ token });

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {

      return rep.status(400).send({ message: err.message });
    }

    throw err;
  }

}