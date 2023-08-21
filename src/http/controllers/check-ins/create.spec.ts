import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';
import { prisma } from '@/lib/prisma';

describe('Create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -22.5034622,
        longitude: -44.1044712,
      }
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`).send({
        latitude: -22.5034622,
        longitude: -44.1044712,
      });
      
    expect(response.statusCode).toEqual(201);
  });
});
