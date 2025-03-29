import request from 'supertest';
import app from './index.js';

describe('POST /api/get-ai-message', () => {
  it('should return an assistant response for an installation inquiry', async () => {
    const response = await request(app)
      .post('/api/get-ai-message')
      .send({ userQuery: 'How can I install part number PS11752778?' })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('role', 'assistant');
    expect(response.body).toHaveProperty('content');
    // log the content for inspection
    console.log('Installation inquiry response:', response.body.content);
  });

  it('should return an assistant response for a compatibility inquiry', async () => {
    const response = await request(app)
      .post('/api/get-ai-message')
      .send({ userQuery: 'Is this part compatible with my WDT780SAEM1 model?' })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('role', 'assistant');
    expect(response.body).toHaveProperty('content');
    console.log('Compatibility inquiry response:', response.body.content);
  });

  it('should return an assistant response for troubleshooting inquiry', async () => {
    const response = await request(app)
      .post('/api/get-ai-message')
      .send({ userQuery: 'The ice maker on my Whirlpool fridge is not working. How can I fix it?' })
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('role', 'assistant');
    expect(response.body).toHaveProperty('content');
    console.log('Troubleshooting inquiry response:', response.body.content);
  });
});