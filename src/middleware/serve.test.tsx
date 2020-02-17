import createError from 'http-errors';
import { Context } from 'koa';

import { serveContent } from './serve';

describe(serveContent, () => {
  const next = jest.fn();
  const logger = { debug: jest.fn() };
  const registry = [
    {
      kind: 'partial',
      markdown: 'Partial',
      template: '/partial.md',
    },
    {
      attributes: {
        fields: [
          { label: 'Email address', name: 'email', type: 'email' },
          {
            label: 'Terms and Conditions',
            name: 'terms-conditions',
            options: [ { text: 'I accept the terms and conditions', value: 'yes' } ],
            type: 'checkbox',
          },
        ],
      },
      kind: 'form',
      markdown: 'Form',
      template: '/form.md',
    },
    {
      attributes: {
        menu: { footer: { include: true, placement: 'meta', title: 'Test Page' }, header: { include: true } },
        title: 'Test',
      },
      kind: 'page',
      markdown: 'Test',
      template: '/test.md',
    },
    {
      attributes: {
        menu: { footer: { include: true, placement: 'column' } },
        partials: [{ file: '/partial.md' }, { file: '/partial.md' }, { file: '/form.md', layout: 'one-half' }],
        path: '/test-2',
        title: 'Test 2',
      },
      kind: 'page',
      markdown: 'Test 2',
      template: '/test2.md',
    },
    {
      kind: 'page',
      markdown: 'Test 3',
      template: '/test3.md',
    },
  ];
  let ctx: Context;

  beforeEach(() => {
    ctx = {
      config: { project: { service: 'Test Service' } },
      csrf: 'qwertyuiop-1234567890',
      log: logger,
      registry,
      throw: (...args: any) => { throw createError(...args); },
    } as unknown as Context;
  });

  it('should correctly serve content upon request', async () => {
    ctx.path = '/test';

    await serveContent(ctx, next);

    expect(ctx.status).toBeUndefined();
    expect(ctx.body).toContain('<a class="govuk-header__link" href="/test">Test</a>');
    expect(ctx.body).toContain('<a class="govuk-footer__link" href="/test">Test Page</a>');
    expect(ctx.body).toContain('<a class="govuk-footer__link" href="/test-2">Test 2</a>');
  });

  it('should correctly serve content with partials upon request', async () => {
    ctx.path = '/test-2';

    await serveContent(ctx, next);

    expect(ctx.status).toBeUndefined();
    expect(ctx.body).not.toContain('govuk-grid-column-undefined');
    expect(ctx.body).toContain('<p class="govuk-body">Test 2</p>');
    expect(ctx.body).toContain(
      'Partial</p></div><div class="govuk-grid-column-full"><p class="govuk-body">Partial</p>',
    );
    expect(ctx.body).toContain('<p class="govuk-body">Form</p>');
  });

  it('should correctly serve content when partials are defined but not existant', async () => {
    ctx.path = '/test-2';
    ctx.registry = registry.filter(record => !['form', 'partial'].includes(record.kind));

    await serveContent(ctx, next);

    expect(ctx.status).toBeUndefined();
    expect(ctx.body).not.toContain('govuk-grid-column-undefined');
    expect(ctx.body).toContain('<p class="govuk-body">Test 2</p>');
    expect(ctx.body).not.toContain('Partial');
    expect(ctx.body).not.toContain('<p class="govuk-body">Form</p>');
  });

  it('should correctly serve content without attributes upon request', async () => {
    ctx.path = '/test3/';

    await serveContent(ctx, next);

    expect(ctx.status).toBeUndefined();
    expect(ctx.body).toContain('<p class="govuk-body">Test 3</p>');
  });

  it('should return a not found page when accessing route not on the registry', async () => {
    ctx.path = '/not-found';

    await expect(serveContent(ctx, next)).rejects.toThrowError(/missing record/);
  });
});
