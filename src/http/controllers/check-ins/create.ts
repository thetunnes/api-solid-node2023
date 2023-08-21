import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body);

  const { gymId } = createCheckInParamsSchema.parse(req.params);

  const createCheckInUseCase = makeCheckInUseCase();

  await createCheckInUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  });

  return rep.status(201).send();
}
