import {
  validateErrorPageTemplateAttributes,
  validateFormTemplateAttributes,
  validatePageTemplateAttributes,
  validatePartialTemplateAttributes,
  validateProjectConfiguration,
} from './validators';

describe(validateErrorPageTemplateAttributes, () => {
  it('should return no errors if no attributes are provided, except for required ones', () => {
    expect(validateErrorPageTemplateAttributes({
      code: 404,
      title: 'Page title',
    })).toHaveLength(0);
  });

  it('should return errors when attributes are not valid', () => {
    expect(validateErrorPageTemplateAttributes({})).toHaveLength(2);
  });
});

describe(validateFormTemplateAttributes, () => {
  it('should return no errors if all fields are setup correctly', () => {
    expect(validateFormTemplateAttributes({
      fields: [
        { label: 'Text', name: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Number', name: 'number', type: 'number' },
        { label: 'Textarea', name: 'textarea', type: 'textarea' },
        { label: 'Hidden', name: 'hidden', type: 'hidden', value: 'test' },
        { label: 'Select', name: 'select', options: [ { text: 'A' }, { text: 'B' } ], type: 'select' },
        { label: 'Radio', name: 'radio', options: [ { text: 'A' }, { text: 'B' } ], type: 'radio' },
        { label: 'Checkbox', name: 'checkbox', options: [ { text: 'A' }, { text: 'B' } ], type: 'checkbox' },
      ],
    })).toHaveLength(0);
  });

  it('should return error if no fields attribute is provided', () => {
    expect(validateFormTemplateAttributes({})).toHaveLength(1);
  });

  it('should return errors if fields are misconfigured', () => {
    expect(validateFormTemplateAttributes({
      fields: [
        {},
        { type: 'unknown' },
        { maximum: 'a lot', type: 'email' },
        { type: 'number' },
        { label: 'Number-1', minimum: [ {} ], name: 'number-1', options: [ {} ], type: 'number' },
        { type: 'textarea' },
        { type: 'hidden', value: 'test' },
        { options: [ { text: 'A' }, { text: 'B' } ], type: 'select' },
        { label: 'Select-1', name: 'select-1', options: [ {} ], type: 'select' },
        { label: 'Select-2', maximum: 5, name: 'select-2', options: [ { text: 'A' } ], type: 'select' },
        { options: [ { text: 'A' }, { text: 'B' } ], type: 'radio' },
        { label: 'Radio-1', name: 'radio-1', options: [ {} ], type: 'radio' },
        { label: 'Radio-2', minimum: 1, name: 'radio-2', options: [ { text: 'A' } ], type: 'radio' },
        { options: [ { text: 'A' }, { text: 'B' } ], type: 'checkbox' },
        { label: 'Checkbox-1', name: 'checkbox-1', options: [ {} ], type: 'checkbox' },
        { label: 'Checkbox-2', name: 'checkbox-2', options: [], type: 'checkbox' },
        { label: 'Checkbox-3', name: 'checkbox-3', type: 'checkbox' },
      ],
    })).toHaveLength(29);
  });
});

describe(validatePageTemplateAttributes, () => {
  it('should return no errors if no attributes are provided, except for required ones', () => {
    expect(validatePageTemplateAttributes({
      title: 'Page title',
    })).toHaveLength(0);
  });

  it('should return no errors if attributes are in order', () => {
    expect(validatePageTemplateAttributes({
      menu: {
        footer: { column: 3, placement: 'column', position: 0 },
        header: { position: 0 },
      },
      partials: [{ file: 'test.md' }],
      title: 'Page title',
    })).toHaveLength(0);
  });

  it('should return errors when attributes are not valid', () => {
    expect(validatePageTemplateAttributes({
      menu: {
        footer: { column: 5, placement: 'any', position: {} },
        header: { position: '0' },
      },
      partials: [{ layout: 'test' }],
    })).toHaveLength(7);
  });

  it('should return errors when partials element is broken', () => {
    expect(validatePageTemplateAttributes({
      partials: 'test',
      title: 'Page title',
    })).toHaveLength(1);
  });
});

describe(validatePartialTemplateAttributes, () => {
  it('should return no errors if no attributes are provided, except for required ones', () => {
    expect(validatePartialTemplateAttributes({})).toHaveLength(0);
  });
});

describe(validateProjectConfiguration, () => {
  it('should return no errors if no attributes are provided, except for required ones', () => {
    expect(validateProjectConfiguration({
      service: 'Test',
    })).toHaveLength(0);
  });

  it('should return no errors when setting up phase', () => {
    expect(validateProjectConfiguration({
      phase: { content: 'Test service', tag: 'discovery' },
      service: 'Test',
    })).toHaveLength(0);
  });

  it('should return errors if invalid attributes are provided', () => {
    expect(validateProjectConfiguration({
      phase: {},
    })).toHaveLength(2);
  });
});
