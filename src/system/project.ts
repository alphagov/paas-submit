import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import yaml from 'js-yaml';
import { Logger } from 'winston';

import { ProjectConfiguration, validateProjectConfiguration } from '../template';

import { considerThrowingConfigurationError } from './errors';

export async function loadProjectConfiguration(logger: Logger, source: string): Promise<ProjectConfiguration> {
  const projectConfigLocation = path.resolve(source, 'config.yaml');

  logger.debug('loading project configuration', { matcher: projectConfigLocation });
  const content = await promisify(fs.readFile)(projectConfigLocation);
  const config = yaml.safeLoad(content.toString());

  considerThrowingConfigurationError(validateProjectConfiguration(config));
  logger.debug('loaded project configuration', { service: config.service });

  return config as ProjectConfiguration;
}
