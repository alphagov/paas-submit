/* eslint-disable functional/no-class */
export class ValidationError extends Error {
  constructor(readonly message: string, readonly errors: ReadonlyArray<string>) {
    super(message);
  }
}

export class ConfigurationError extends ValidationError {}

export function considerThrowingValidationError(errors: ReadonlyArray<string>): number {
  if (errors.length > 0) {
    throw new ConfigurationError('Template source contains invalid attributes', errors);
  }

  return errors.length;
}

export const considerThrowingConfigurationError = considerThrowingValidationError;
