import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberCheckInsError } from './errors/max-number-check-in-error';


let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;
describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);
    
    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -22.518126,
      longitude: -44.1245426,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.518126,
      userLongitude: -44.1245426
    });


    expect(checkIn.id).toEqual(expect.any(String));
  });

  // O teste abaixo é o 1º teste utilizando TDD (desenvolvimento dirigido por testes).
  // O fluxo dos testes em TDD sempre segue:
  // RED, GREEN e REFACTORY
  
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));
    
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.518126,
      userLongitude: -44.1245426
    });

    await expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.518126,
      userLongitude: -44.1245426
    })).rejects.toBeInstanceOf(MaxNumberCheckInsError);

  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));
    
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.518126,
      userLongitude: -44.1245426
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.518126,
      userLongitude: -44.1245426
    });

    expect(checkIn.id).toEqual(expect.any(String));

  });

  it('should not be able to check in on distant gym', async () => {
    
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.5034622),
      longitude: new Decimal(-44.1044712)
    });   

    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -22.5034622,
      userLongitude: -44.4221551
    })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});