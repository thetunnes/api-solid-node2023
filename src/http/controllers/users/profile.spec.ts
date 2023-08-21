import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`);

    
    expect(profileResponse.statusCode).toEqual(201);
    expect(profileResponse.body).toEqual(expect.objectContaining({
      email: 'johndoe@example.com'
    }));
  });
});
