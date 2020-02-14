import { Context, Next } from 'koa';

export async function resolveHealthcheck(ctx: Context, next: Next): Promise<void> {
  if (ctx.path === '/healthcheck') {
    ctx.status = 200;
    ctx.body = { service: ctx.config.project.service, status: 'OK' };

    return;
  }

  await next();
}
