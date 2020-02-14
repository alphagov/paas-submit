import path from 'path';

import { Logger } from 'winston';

import { loadRegistry } from './registry';

describe(loadRegistry, () => {
  const logger = { debug: jest.fn() } as unknown as Logger;

  it('should load the registry successfully', async () => {
    const registry = await loadRegistry(logger, path.resolve(process.cwd(), 'sample'));

    expect(registry.length).toBeGreaterThan(0);
    expect(logger.debug).toHaveBeenCalled();
  });
});
