import React from 'react';

import { render } from './template';

describe(render, () => {
  it('should be able to render GOV.UK frontend correctly', () => {
    const markup = render(<p>This is just a test</p>, {
      csrf: 'qwertyuiop-1234567890',
      service: 'Test Suite',
      title: 'TEST CASE',
    });

    expect(markup).toContain('<!DOCTYPE html>');
    expect(markup).toContain('<html lang=en class="govuk-template">');
    expect(markup).toContain('<head>');
    expect(markup).toContain('<title lang="en">TEST CASE</title>');
    expect(markup).toContain(
      '<meta name="csrf-token" content="qwertyuiop-1234567890" />',
    );
    expect(markup).toContain('<body class="govuk-template__body">');
    expect(markup).toContain('<p>This is just a test</p>');
  });

  it('should be able to render GOV.UK frontend correctly with additional elements from configuration', () => {
    const markup = render(<p>This is just a test</p>, {
      breadcrumbs: [{ href: '/', text: 'Home' }, { text: 'Page' }],
      csrf: 'qwertyuiop-1234567890',
      phase: { content: 'Please provide [feedback](/feedback).', tag: 'alpha' },
      service: 'Test Suite',
      title: 'TEST CASE',
    });

    expect(markup).toContain('govuk-phase-banner');
    expect(markup).toContain('<a href="/feedback" class="govuk-link">feedback</a>.');
    expect(markup).toContain('govuk-breadcrumbs');
    expect(markup)
      .toContain('<li class="govuk-breadcrumbs__list-item"><a class="govuk-breadcrumbs__link" href="/">Home</a></li>');
    expect(markup).toContain('<li class="govuk-breadcrumbs__list-item" aria-current="page">Page</li>');
  });
});
