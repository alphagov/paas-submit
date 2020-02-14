import { Context } from 'koa';
import { createLogger } from 'winston';

import { attachLogger } from './logger';

describe(attachLogger, () => {
  const next = jest.fn();
  let ctx: Context;

  it('should setup the logger correctly for further consumption', async () => {
    ctx = {
      config: {
        logLevel: 'debug',
        production: false,
      },
    } as unknown as Context;

    await attachLogger(createLogger())(ctx, next);

    expect(ctx.log).toHaveProperty('debug');
    expect(ctx.log).toHaveProperty('info');
    expect(ctx.log).toHaveProperty('warn');
    expect(ctx.log).toHaveProperty('error');
    expect(next).toHaveBeenCalled();
  });

  it('should setup the logger correctly when dealing with production environment', async () => {
    ctx = {
      config: {
        logLevel: 'error',
        production: true,
      },
    } as unknown as Context;

    await attachLogger(createLogger())(ctx, next);

    expect(next).toHaveBeenCalled();
  });
});
