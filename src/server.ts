import winston from 'winston';

import { application } from './app';

const logger = winston.createLogger({
  defaultMeta: { application: 'submit' },
  format: process.env.NODE_ENV === 'production'
    ? winston.format.json()
    : winston.format.combine(
      winston.format.align(),
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.simple(),
    ),
  level: process.env.LOG_LEVEL || 'warn',
  transports: [
    new winston.transports.Console(),
  ],
});

application(logger, { source: process.env.PROJECT || '.' }).then(app => {
  const port = process.env.PORT || 3000;
  logger.info('listening...', { port: port });
  app.listen(port);
}).catch(logger.error);
