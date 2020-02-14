import { DefaultContext, Middleware, Next } from 'koa';

import { ProjectConfiguration } from '../template';

type AppConfiguration = {
  readonly basicAuth?: {
    readonly username: string;
    readonly password: string;
  };
  readonly project: ProjectConfiguration;
};

export function attachConfig(config: AppConfiguration): Middleware {
  return async (ctx: DefaultContext, next: Next) => {
    ctx.config = config;

    await next();
  };
}
