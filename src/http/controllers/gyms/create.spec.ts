import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`).send({
        title: 'JavaScript',
        description: 'Some description',
        phone: '11999999',
        latitude: -22.5034622,
        longitude: -44.1044712,
      });
      
    expect(response.statusCode).toEqual(201);
  });
});
