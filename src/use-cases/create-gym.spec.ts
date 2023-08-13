import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create a new gym', async () => {


    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      latitude: -22.5034622,
      longitude: -44.1044712,
      description: null,
      phone: null
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});