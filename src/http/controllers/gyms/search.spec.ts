import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list nearby', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`).send({
        title: 'JavaScript',
        description: 'Some description',
        phone: '11999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
      
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`).send({
        title: 'TypeScript',
        description: 'Some description',
        phone: '11999999',
        latitude: -27.0610928,
        longitude: -49.5229501,
      });

    const response = await request(app.server).get('/gyms/nearby').query({
      latitude: -27.2092052,
      longitude: -49.6401091,
    }).set('Authorization', `Bearer ${token}`).send();
      
    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript'
      })
    ]);
  });
});