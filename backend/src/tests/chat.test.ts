// backend/src/tests/chat.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../server';

describe('POST /api/chat', () => {
  it('should return a simulated AI response', async () => {
    const res = await request(app).post('/api/chat').send({ message: 'Hello' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('response');
    expect(typeof res.body.response).toBe('string');
  });
});
