import { FetchUserCheckInsUseCase } from '../fetch-user-check-ins';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

export function makeFetchUserCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const fetchUserCheckInUseCase = new FetchUserCheckInsUseCase(prismaCheckInsRepository);

  return fetchUserCheckInUseCase;
}