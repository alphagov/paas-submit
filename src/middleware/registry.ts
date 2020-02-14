import { Middleware } from 'koa';

import { Record } from '../system';

export function attachRegistry(registry: ReadonlyArray<Record>): Middleware {
  const middleware: Middleware = async (ctx, next) => {
    ctx.registry = registry;

    await next();
  };

  return middleware;
}
