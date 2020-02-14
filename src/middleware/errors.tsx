import { Context, Next } from 'koa';
import React from 'react';

import { Error, render } from '../template/frontend';

// eslint-disable-next-line require-await
export async function handleErrors(_err: Error, ctx: Context): Promise<void> {
  const date = new Date();
  const reference = `submit-${date.getTime()}`;
  ctx.type = 'html';

  switch (ctx.status) {
    case 404:
      ctx.log.debug('page not found', { path: ctx.path, reference });
      ctx.body = render(<Error reference={reference} title="Page not found">
          <p className="govuk-body">If you typed the web address, check it is correct.</p>
          <p className="govuk-body">If you pasted the web address, check you copied the entire address.</p>
        </Error>, {
          csrf: ctx.csrf,
          service: ctx.config.project.service,
          title: 'Page not found',
        });

      break;
    case 422:
    default:
      ctx.log.error('unhandled error', { path: ctx.path, reference });
      ctx.body = render(<Error reference={reference}>
          <p className="govuk-body">Try again later.</p>
        </Error>, {
          csrf: ctx.csrf,
          service: ctx.config.project.service,
          title: 'Sorry, there is a problem with the service',
        });
  }
}

export async function captureErrors(ctx: Context, next: Next): Promise<void> {
  // eslint-disable-next-line functional/no-try-statement
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
}
