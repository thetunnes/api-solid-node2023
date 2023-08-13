import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';


let userRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;
describe('Get user profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  it('should be able to get user profile', async () => {

    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    });

    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.name).toBe('John Doe');
  });

  it('should not be able to get user profile with wrong id', async () => {

    await expect(() => sut.execute({
      userId: 'not-existing-id'
    })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});