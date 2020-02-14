import { Context } from 'koa';

import { resolveHealthcheck } from './healthcheck';

describe(resolveHealthcheck, () => {
  const next = jest.fn();
  let ctx: Context;

  it('should not printout the healthcheck page when visiting root path', async () => {
    ctx = {
      path: '/',
    } as unknown as Context;

    await resolveHealthcheck(ctx, next);

    expect(ctx.body).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  it('should printout the healthcheck page when visiting correct path', async () => {
    ctx = {
      config: { project: { service: 'Test Suite' } },
      path: '/healthcheck',
    } as unknown as Context;

    await resolveHealthcheck(ctx, next);

    expect(ctx.body).toBeDefined();
    expect(ctx.body.status).toEqual('OK');
    expect(next).toHaveBeenCalled();
  });

  it('should not printout the healthcheck page when visiting path containing the recognised path', async () => {
    ctx = {
      path: '/healthcheck/test',
    } as unknown as Context;

    await resolveHealthcheck(ctx, next);

    expect(ctx.body).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });
});
