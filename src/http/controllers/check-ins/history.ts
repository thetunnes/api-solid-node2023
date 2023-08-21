import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFetchUserCheckInUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-use-case';

export async function history(req: FastifyRequest, rep: FastifyReply) {
  const checkInQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  });

  const { page } =
  checkInQuerySchema.parse(req.query);

  const fetchUserCheckInUseCase = makeFetchUserCheckInUseCase();

  const { checkIns } = await fetchUserCheckInUseCase.execute({
    page,
    userId: req.user.sub
  });

  return rep.status(201).send({
    checkIns
  });
}
