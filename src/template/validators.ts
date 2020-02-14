/* eslint-disable @typescript-eslint/no-explicit-any */

const partialTypeList = ['full', 'one-half', 'one-quarter', 'one-third', 'three-quarters', 'two-thirds'];
const formFieldTypeList = ['text', 'textarea', 'email', 'number', 'select', 'checkbox', 'radio', 'hidden'];

type VagueAttributes = { readonly [key: string]: any };

function validateMenuConfiguration(attributes?: VagueAttributes): ReadonlyArray<string> {
  const errors = [];
  const hPosition = attributes?.header?.position;
  const fPosition = attributes?.footer?.position;
  const placement = attributes?.footer?.placement;
  const column = attributes?.footer?.column;

  if (hPosition && typeof hPosition !== 'number') {
    errors.push(`Template expects 'menu.header.position' to be a number, got: ${hPosition}`);
  }

  if (fPosition && typeof fPosition !== 'number') {
    errors.push(`Template expects 'menu.footer.position' to be a number, got: ${fPosition}`);
  }

  if (placement && !['column', 'meta'].includes(placement)) {
    errors.push(`Template expects 'menu.footer.placement' to be either 'column' or 'meta', got: ${placement}`);
  }

  if (column && ![1, 2, 3].includes(column)) {
    errors.push(`Template expects 'menu.footer.column' to be a number in range of 1 - 3, got: ${column}`);
  }

  return errors;
}

function requireTitle(attributes: VagueAttributes): ReadonlyArray<string> {
  if (!attributes.title) {
    return [`Template is missing required attribute: 'title', got: ${attributes.title}`];
  }

  return [];
}

export function validateErrorPageTemplateAttributes(attributes: VagueAttributes): ReadonlyArray<string> {
  const errors = [];

  errors.push(...requireTitle(attributes));

  if (typeof attributes.code !== 'number' || attributes.code < 400 || 500 <= attributes.code) {
    errors.push(`Template expects attribute 'code' representing an error to be a number, got: ${attributes.code}`);
  }

  return errors;
}

function validateFormFields(formFields?: ReadonlyArray<any>): ReadonlyArray<string> {
  const errors = [];
  const fields = formFields || [];

  if (!fields || !Array.isArray(fields) || fields.length === 0) {
    errors.push(`Form expects attribute 'fields' to be an array of fields, got: ${fields}`);
  }

  fields.map(field => {
    const type = field.type || 'text';

    if (!formFieldTypeList.includes(type)) {
      errors.push(`Form field expects to be one of type ${JSON.stringify(formFieldTypeList)}, got: ${type}`);
    }

    if (!field.name || field.name.length === 0) {
      errors.push(`Form field expects attribute 'name' to be a string, got: ${field.name}`);
    }

    if (!field.label || field.label.length === 0) {
      errors.push(`Form field expects attribute 'label' to be a string, got: ${field.label}`);
    }

    if (['select', 'checkbox', 'radio'].includes(type) && (field.minimum || field.maximum)) {
      errors.push(`Field '${type}' should not have 'minimum' or 'maximum' attributes`);
    }

    if (!['select', 'radio', 'checkbox'].includes(type) && field.options) {
      errors.push(`Field '${type}' should not have 'options' attribute`);
    }

    if (field.minimum && typeof field.minimum !== 'number') {
      errors.push(`Form field expects attribute 'minimum' to be a number, got: ${field.minimum}`);
    }

    if (field.maximum && typeof field.maximum !== 'number') {
      errors.push(`Form field expects attribute 'maximum' to be a number, got: ${field.maximum}`);
    }

    if (['select', 'radio', 'checkbox'].includes(type) && (!field.options || field.options.length === 0)) {
      errors.push(`Select field(${field.name}) attribute 'options' should be a list, got: ${field.options}`);
    }

    if (['select', 'radio', 'checkbox'].includes(type) && field.options?.some((option: any) => !option.text)) {
      errors.push(`Select field(${field.name}) 'options' element should have a 'text' field, got: ${field.options}`);
    }
  });

  return errors;
}

export function validateFormTemplateAttributes(attributes: VagueAttributes): ReadonlyArray<string> {
  const errors = [];

  errors.push(...validateFormFields(attributes.fields));

  return errors;
}

export function validatePageTemplateAttributes(attributes: VagueAttributes): ReadonlyArray<string> {
  const errors = [];

  errors.push(...requireTitle(attributes));
  errors.push(...validateMenuConfiguration(attributes.menu));

  if (attributes.partials && !Array.isArray(attributes.partials)) {
    errors.push(`Template expects attribute 'partials' to be an array, got: ${attributes.partials}`);
  } else if (attributes.partials) {
    errors.push(...attributes.partials.reduce((all: ReadonlyArray<string>, partial: any) => {
      const errors = [...all];

      if (!partial.file) {
        errors.push(`Template partial expects 'file' to be set, got: ${partial.file}`);
      }

      if (partial.layout && !partialTypeList.includes(partial.layout)) {
        errors.push(`Template partial expects 'layout' to be one of ${JSON.stringify(partialTypeList)}, got: ${partial.file}`);
      }

      return errors;
    }, []));
  }

  return errors;
}

export function validatePartialTemplateAttributes(_attributes: VagueAttributes): ReadonlyArray<string> {
  return [];
}

export function validateProjectConfiguration(attributes: VagueAttributes): ReadonlyArray<string> {
  const errors = [];

  if (!attributes.service) {
    errors.push(`Configuration expects 'service' to be set, got: ${attributes.service}`);
  }

  if (attributes.phase && (!attributes.phase.tag || !attributes.phase.content)) {
    errors.push(`Configuration expects 'phase' to contain both 'content' and 'tag' fields, got: ${attributes.phase}`);
  }

  return errors;
}
