import { parseContent } from './parser';

type UserDefinedAttributes = {
  readonly [key: string]: unknown;
};

describe(parseContent, () => {
  it('should extract attributes from markdown file and deafult to page kind', () => {
    const data = parseContent<UserDefinedAttributes>([
      '---',
      'title: Home',
      '---',
      '# Home page',
      '',
      'Main content of the homepage...',
      '---',
      'Footer',
    ].join('\n'));

    expect(data.kind).toEqual('page');
    expect(data.attributes.title).toEqual('Home');
    expect(data.markdown).not.toContain('title: Home');
    expect(data.markdown).toContain('# Home page');
    expect(data.markdown).toContain('---');
    expect(data.markdown).toContain('Footer');
  });

  it('should parse error kind correctly', () => {
    const data = parseContent<UserDefinedAttributes>([
      '---',
      'kind: error',
      'code: 404',
      'title: Not Found',
      '---',
      '# Not Found',
    ].join('\n'));

    expect(data.kind).toEqual('error');
    expect(data.attributes.title).toEqual('Not Found');
    expect(data.markdown).not.toContain('title: Not Found');
    expect(data.markdown).toContain('# Not Found');
  });

  it('should parse partial kind correctly', () => {
    const data = parseContent<UserDefinedAttributes>([
      '---',
      'kind: partial',
      '---',
      'Test partial',
    ].join('\n'));

    expect(data.kind).toEqual('partial');
    expect(data.markdown).not.toContain('kind: partial');
    expect(data.markdown).toContain('Test partial');
  });

  it('should parse form kind correctly', () => {
    const data = parseContent<UserDefinedAttributes>([
      '---',
      'fields: [{ "label": "Name", "name": "name" }]',
      'kind: form',
      '---',
      'Test form',
    ].join('\n'));

    expect(data.kind).toEqual('form');
    expect(data.markdown).not.toContain('kind: form');
    expect(data.markdown).not.toContain('fields:');
    expect(data.markdown).toContain('Test form');
  });

  it('should throw an error if no required page attributes have been set', () => {
    expect(() => {
      parseContent([
        '# Home page',
        '',
        'Main content of the homepage...',
        '---',
        'Footer',
      ].join('\n'));
    }).toThrowError(/Template source contains invalid attributes/);

    expect(() => {
      parseContent([
        '---',
        'kind: error',
        '---',
        '# Home page',
        '',
        'Main content of the homepage...',
        '---',
        'Footer',
      ].join('\n'));
    }).toThrowError(/Template source contains invalid attributes/);
  });

  it('should throw an error if not-recognised kind has been set', () => {
    expect(() => {
      parseContent([
        '---',
        'kind: test',
        '---',
        '# Home page',
        '',
        'Main content of the homepage...',
        '---',
        'Footer',
      ].join('\n'));
    }).toThrowError(/Unrecognised Template kind/);
  });
});
