import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let userRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(userRepository);
  });
  
  it('should hash user password upon registration', async () => {

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {


    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(() => sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able to register', async () => {


    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });
});