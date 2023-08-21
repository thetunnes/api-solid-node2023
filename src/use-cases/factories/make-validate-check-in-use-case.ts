import { ValidateCheckInUseCase } from '../validate-check-in';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

export function makeValidateCheckInUseCase() {
  const prismaCheckInRepository = new PrismaCheckInsRepository();
  const validateCheckInUseCase = new ValidateCheckInUseCase(prismaCheckInRepository);

  return validateCheckInUseCase;
}