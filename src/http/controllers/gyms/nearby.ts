import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';

export async function nearby(req: FastifyRequest, rep: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymQuerySchema.parse(req.params);

  const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  });

  return rep.status(201).send({
    gyms,
  });
}
