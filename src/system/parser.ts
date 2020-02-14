import frontMatter from 'front-matter';

import {
  validateErrorPageTemplateAttributes,
  validateFormTemplateAttributes,
  validatePageTemplateAttributes,
  validatePartialTemplateAttributes,
} from '../template';

import { considerThrowingValidationError } from './errors';

export type Kind = 'page' | 'partial' | 'form' | 'error';

export type TemplateAttributes = {
  readonly kind?: Kind;
  // eslint-disable-next-line functional/no-mixed-type
  readonly [key: string]: unknown;
};

export type Template<T> = {
  readonly attributes: T;
  readonly kind: Kind;
  readonly markdown: string;
};

export function parseContent<T>(content: string): Template<T> {
  const data = frontMatter<TemplateAttributes>(content);
  const attributes = data.attributes as unknown as T;
  const kind = data.attributes.kind || 'page';

  switch (kind) {
    case 'error':
      considerThrowingValidationError(validateErrorPageTemplateAttributes(attributes));
      break;
    case 'page':
      considerThrowingValidationError(validatePageTemplateAttributes(attributes));
      break;
    case 'partial':
      considerThrowingValidationError(validatePartialTemplateAttributes(attributes));
      break;
    case 'form':
      considerThrowingValidationError(validateFormTemplateAttributes(attributes));
      break;
    default:
      throw new Error(`Unrecognised Template kind: ${data.attributes.kind}`);
  }

  return {
    attributes,
    kind,
    markdown: data.body,
  };
}
