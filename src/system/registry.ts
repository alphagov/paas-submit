import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import glob from 'glob';
import { Logger } from 'winston';

import { parseContent, Template } from '.';

export interface Record<T = unknown> extends Template<T> {
  readonly template: string;
}

export async function loadRegistry(logger: Logger, source: string): Promise<ReadonlyArray<Record>> {
  const pattern = path.resolve(source, '**', '*.md');
  logger.debug('loading registry', { pattern });
  const filenames = await promisify(glob)(pattern);

  const registry = filenames.map(async filename => {
    const content = await promisify(fs.readFile)(filename);
    const data = parseContent(content.toString());

    return {
      ...data,
      template: filename.replace(path.resolve(process.cwd(), source), ''),
    };
  });

  logger.debug(`loaded ${registry.length} file(s) into registry`, { pattern });

  return await Promise.all(registry);
}
