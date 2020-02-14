import path from 'path';

import { Logger } from 'winston';

import { loadProjectConfiguration } from './project';

describe(loadProjectConfiguration, () => {
  const logger = { debug: jest.fn() } as unknown as Logger;

  it('should load the project configuration successfully', async () => {
    const config = await loadProjectConfiguration(logger, path.resolve(process.cwd(), 'sample'));

    expect(config).toHaveProperty('service');
    expect(logger.debug).toHaveBeenCalled();
  });
});
