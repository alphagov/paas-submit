import path from 'path';

import {  } from 'enzyme';
import request from 'supertest';
import { Logger } from 'winston';

import { application } from './app';

describe(application, () => {
  const logger = {
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  } as unknown as Logger;

  const config = {
    source: path.resolve(process.cwd(), 'sample'),
  };

  it('should run the server correctly', async () => {
    const app = await application(logger, config);
    const server = app.listen();
    const response = await request(server).get('/healthcheck');

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({ service: 'Sample Service', status: 'OK' });

    server.close();
  });

  it('should run the server correctly serving real csrf token', async () => {
    const app = await application(logger, config);
    const server = app.listen();
    const response1 = await request(server).get('/');
    const response2 = await request(server).get('/');

    expect(response1.status).toEqual(200);
    const response1csrf = response1.text.match(/<meta name="csrf-token" content="(.+?)" \/>/);
    expect(response1csrf).not.toBeNull();
    expect(response1csrf && response1csrf[0]).toBeDefined();

    expect(response2.status).toEqual(200);
    const response2csrf = response2.text.match(/<meta name="csrf-token" content="(.+?)" \/>/);
    expect(response2csrf).not.toBeNull();
    expect(response2csrf && response2csrf[0]).toBeDefined();

    expect(response1csrf && response1csrf[0]).not.toEqual(response2csrf && response2csrf[0]);

    server.close();
  });
});
