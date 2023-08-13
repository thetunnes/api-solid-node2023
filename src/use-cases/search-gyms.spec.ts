import { expect, describe, it, beforeEach } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';


let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;
describe('Search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });


  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      latitude: -22.5034622,
      longitude: -44.1044712,
      description: null,
      phone: null
    });
    await gymsRepository.create({
      title: 'TypeScript Gym',
      latitude: -22.5034622,
      longitude: -44.1044712,
      description: null,
      phone: null
    });


    const { gyms } = await sut.execute({
      query: 'Script',
      page: 1
    });


    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym'}),
      expect.objectContaining({ title: 'TypeScript Gym'})
    ]);
  });


  it('should be able to fetch paginated check-in history', async () => {
    
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        latitude: -22.5034622,
        longitude: -44.1044712,
        description: null,
        phone: null
      });
    }


    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2
    });


    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21'}),
      expect.objectContaining({ title: 'TypeScript Gym 22'})
    ]);
  });
});