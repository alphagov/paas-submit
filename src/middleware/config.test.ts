import { Context } from 'koa';

import { attachConfig } from './config';

describe(attachConfig, () => {
  const next = jest.fn();
  let ctx: Context;

  it('should pass the config to the next midleware', async () => {
    ctx = {} as unknown as Context;

    await attachConfig({ project: { service: 'Test' } })(ctx, next);

    expect(ctx.config).toBeDefined();
    expect(next).toHaveBeenCalled();
  });
});
