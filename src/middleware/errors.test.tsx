import Koa, { Context } from 'koa';
import request from 'supertest';

import { captureErrors, handleErrors } from './errors';

const logger = { debug: jest.fn(), error: jest.fn() };

describe(handleErrors, () => {
  let app: Koa;

  beforeEach(() => {
    logger.debug.mockReset();
    logger.error.mockReset();

    app = new Koa();
    app.use(async (ctx, next) => {
      ctx.config = { project: { service: 'TEST' } };
      ctx.log = logger;
      await next();
    });
    app.use(captureErrors);
  });

  it('should correctly determine 404', async () => {
    app.use(async (ctx, next) => {
      ctx.throw(404);

      return await next();
    });
    app.on('error', handleErrors);

    const server = app.listen();
    const response = await request(server).get('/');

    expect(response.status).toEqual(404);
    expect(response.text).toContain('Page not found');
    expect(response.text).toContain('Reference:');
    expect(logger.debug).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();

    server.close();
  });

  it('should correctly determine 422', async () => {
    app.use(async (ctx, next) => {
      ctx.throw(422);

      return await next();
    });
    app.on('error', handleErrors);

    const server = app.listen();
    const response = await request(server).get('/');

    expect(response.status).toEqual(422);
    expect(response.text).toContain('Sorry, there is a problem with the service');
    expect(response.text).toContain('Reference:');
    expect(logger.debug).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();

    server.close();
  });

  it('should correctly determine all errors', async () => {
    app.use((_ctx, _next) => {
      throw new Error('unhandled');
    });
    app.on('error', handleErrors);

    const server = app.listen();
    const response = await request(server).get('/');

    expect(response.status).toEqual(500);
    expect(response.text).toContain('Sorry, there is a problem with the service');
    expect(response.text).toContain('Reference:');
    expect(logger.debug).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();

    server.close();
  });
});

describe(captureErrors, () => {
  let ctx: {
    app: { emit: () => void };
    body?: any;
    log?: { debug: () => void; error: () => void };
    status?: number;
  };

  beforeEach(() => {
    logger.debug.mockReset();
    logger.error.mockReset();

    ctx = {
      app: { emit: jest.fn() },
      log: logger,
      status: 200,
    };
  });

  it('should successfully capture errors', async () => {
    await expect(captureErrors(ctx as unknown as Context, () => {
      throw new Error('TEST');
    })).resolves.not.toThrowError();

    expect(ctx.status).toEqual(500);
    expect(ctx.body).toEqual('TEST');
    expect(logger.debug).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
    expect(ctx.app.emit).toHaveBeenCalled();
  });
});
