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

  it('should be able search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`).send({
        title: 'JavaScript',
        description: 'Some description',
        phone: '11999999',
        latitude: -22.5034622,
        longitude: -44.1044712,
      });
      
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`).send({
        title: 'TypeScript',
        description: 'Some description',
        phone: '11999999',
        latitude: -22.5034622,
        longitude: -44.1044712,
      });

    const response = await request(app.server).get('/gyms/search').query({
      query: 'JavaScript'
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
