import { Context } from 'koa';

import { attachRegistry } from './registry';

describe(attachRegistry, () => {
  const next = jest.fn();
  let ctx: Context;

  it('should pass the config to the next midleware', async () => {
    ctx = {} as unknown as Context;

    await attachRegistry([
      {
        attributes: {},
        kind: 'page',
        markdown: '# Test the world',
        template: '/test.md',
      },
    ])(ctx, next);

    expect(ctx.registry).toHaveLength(1);
    expect(next).toHaveBeenCalled();
  });
});
