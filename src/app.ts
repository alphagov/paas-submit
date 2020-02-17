import Koa from 'koa';
import KoaCompress from 'koa-compress';
import KoaCSRF from 'koa-csrf';
import KoaHelmet from 'koa-helmet';
import KoaMount from 'koa-mount';
import KoaSession from 'koa-session';
import KoaStatic from 'koa-static';
import winston from 'winston';

import { csp } from './config';
import {
  attachConfig, attachLogger, attachRegistry, captureErrors, handleErrors, resolveHealthcheck, serveContent,
} from './middleware';
import { loadProjectConfiguration, loadRegistry } from './system';

type Setup = {
  readonly source: string;
};

export async function application(logger: winston.Logger, config: Setup): Promise<Koa> {
  const project = await loadProjectConfiguration(logger, config.source);
  const registry = await loadRegistry(logger, config.source);
  const app = new Koa();

  app.keys = [ 'govuk-submit', project.service ];

  app.use(attachConfig({ ...config, project }));
  app.use(attachLogger(logger));
  app.use(attachRegistry(registry));

  app.use(captureErrors);
  app.use(KoaMount('/assets', KoaStatic('dist/assets')));
  app.use(KoaMount('/assets', KoaStatic('node_modules/govuk-frontend/govuk')));
  app.use(KoaMount('/assets', KoaStatic('node_modules/govuk-frontend/govuk/assets')));
  app.use(resolveHealthcheck);
  app.use(KoaHelmet());
  app.use(KoaHelmet.contentSecurityPolicy(csp));
  app.use(KoaSession({ key: 'govuk:submit:session' }, app));
  app.use(new KoaCSRF());
  app.use(serveContent);
  app.use(KoaCompress);

  app.on('error', handleErrors);

  return app;
}
