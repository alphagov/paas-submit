import { shallow } from 'enzyme';
import React from 'react';

import { FormField } from '../form';

import { Footer, Form, Header, Main } from './elements';

describe(Header, () => {
  it('should successfully display the header element', () => {
    const markup = shallow(
      <Header service="Test Suite" />,
    );

    // The following is for simply compliance with the design system.
    // https://github.com/alphagov/govuk-frontend/issues/1688
    expect(markup
      .find('header.govuk-header .govuk-header__logotype svg image')
      .filterWhere(item => item.prop('src') === '/assets/images/govuk-logotype-crown.png'),
    ).toHaveLength(1);
  });

  it('should successfully display the header element with menu', () => {
    const menu = [{ href: '#', text: 'Test' }, { href: '/', text: 'Home' }];

    const markup = shallow(
      <Header service="Test Suite" menu={menu} />,
    );

    expect(markup.find('header.govuk-header nav a.govuk-header__link').at(0).text()).toContain('Test');
    expect(markup.find('header.govuk-header nav a.govuk-header__link').at(0).prop('href')).toEqual('#');

    expect(markup.find('header.govuk-header nav a.govuk-header__link').at(1).text()).toContain('Home');
    expect(markup.find('header.govuk-header nav a.govuk-header__link').at(1).prop('href')).toEqual('/');
  });
});

describe(Main, () => {
  it('should successfully display the main element', () => {
    const markup = shallow(<Main><p>This is a test</p></Main>);
    expect(markup).toHaveText('This is a test');
  });

  it('should successfully display the main element with custom classess', () => {
    const markup = shallow(<Main className="test"><p>This is a test</p></Main>);
    expect(markup.first()).toHaveClassName('govuk-main-wrapper');
    expect(markup.first()).toHaveClassName('test');
  });
});

describe(Footer, () => {
  it('should successfully display the footer element', () => {
    const markup = shallow(<Footer />);
    expect(markup.find('.govuk-footer__licence-description').text()).toContain('All content is available under the');
    expect(markup.find('.govuk-footer__licence-description a')).toMatchElement(
      <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
        Open Government Licence v3.0
      </a>,
    );
    expect(markup).toIncludeText('Crown copyright');
  });

  it('should successfully display the footer element with menu', () => {
    const menu = {
      column: [
        [{ href: '#1', text: 'Column One' }],
        [{ href: '#2', text: 'Column Two' }],
        [{ href: '#3', text: 'Column Three' }],
      ],
      meta: [{ href: '#meta', text: 'Meta' }],
    };

    const markup = shallow(<Footer menu={menu} />);

    expect(markup.find('footer.govuk-footer .govuk-footer__meta ul.govuk-footer__inline-list a.govuk-footer__link').text()).toContain('Meta');
    expect(markup.find('footer.govuk-footer .govuk-footer__meta ul.govuk-footer__inline-list a.govuk-footer__link').prop('href')).toEqual('#meta');

    expect(markup.find('footer.govuk-footer .govuk-footer__section a.govuk-footer__link').at(0).text()).toContain('Column One');
    expect(markup.find('footer.govuk-footer .govuk-footer__section a.govuk-footer__link').at(0).prop('href')).toEqual('#1');

    expect(markup.find('footer.govuk-footer .govuk-footer__section a.govuk-footer__link').at(1).text()).toContain('Column Two');
    expect(markup.find('footer.govuk-footer .govuk-footer__section a.govuk-footer__link').at(1).prop('href')).toEqual('#2');

    expect(markup.find('footer.govuk-footer .govuk-footer__section a.govuk-footer__link').at(2).text()).toContain('Column Three');
    expect(markup.find('footer.govuk-footer .govuk-footer__section a.govuk-footer__link').at(2).prop('href')).toEqual('#3');
  });
});

describe(Form, () => {
  const fields: ReadonlyArray<FormField> = [
    { label: 'Name-1', name: 'name-1' },
    { description: 'Full name', label: 'Name-2', maximum: 2,
      minimum: 1, name: 'name-2', required: true, type: 'text' },

    { label: 'Email-1', name: 'email-1', type: 'email' },
    { description: 'Email address', label: 'Email-2', maximum: 2,
      minimum: 1, name: 'email-2', required: true, type: 'email' },

    { label: 'Number-1', name: 'number-1', type: 'number' },
    { description: 'Pick a number', label: 'Number-2', maximum: 2,
      minimum: 1, name: 'number-2', required: true, type: 'number' },

    { label: 'Select-1', name: 'select-1', type: 'select' },
    { description: 'Select a thing', label: 'Select-2', name: 'select-2',
      options: [ { selected: true, text: 'A', value: 'a' }, { text: 'B' } ],
      required: true, type: 'select' },

    { label: 'Radio-1', name: 'radio-1', type: 'radio' },
    { description: 'Radio a thing', label: 'Radio-2', name: 'radio-2',
      options: [ { selected: true, text: 'A', value: 'a' }, { text: 'B' } ],
      required: true, type: 'radio' },

    { label: 'Checkbox-1', name: 'checkbox-1', type: 'checkbox' },
    { description: 'Check a thing', label: 'Checkbox-2', name: 'checkbox-2',
      options: [ { selected: true, text: 'A', value: 'a' }, { text: 'B' } ],
      required: true, type: 'checkbox' },

    { label: 'Textarea-1', name: 'textarea-1', type: 'textarea' },
    { description: 'Comment', label: 'Textarea-2', maximum: 2,
      minimum: 1, name: 'textarea-2', required: true, type: 'textarea' },

    { label: 'N/A', name: 'hidden-1', type: 'hidden', value: 'TEST' },
  ];
  const markup = shallow(<Form csrf="CSRF_TOKEN" fields={fields} />);

  it('should successfully display the form element with csrf token', () => {
    expect(markup.find('[name="_csrf"]').prop('value')).toEqual('CSRF_TOKEN');
  });

  it.each([['name-1'], ['email-1'], ['number-1']])(
    'should successfully display the form element with field %s', field => {
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[for="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`label[for="${field}"]`).text()).toEqual(data?.label);
    expect(markup.render().find(`[name="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`[name="${field}"]`).attr('type')).toEqual(data?.type === 'email' ? 'email' : 'text');
    expect(markup.render().find(`[name="${field}"]`).attr('required')).toBeUndefined();
    expect(markup.render().find(`[name="${field}"]`).attr('max')).toBeUndefined();
    expect(markup.render().find(`[name="${field}"]`).attr('min')).toBeUndefined();
    expect(markup.render().find(`#${field}-hint`)).toHaveLength(0);
  });

  it.each([['name-2'], ['email-2'], ['number-2']])(
    'should successfully display the form element with field %s', field => {
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[for="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`label[for="${field}"]`).text()).toEqual(data?.label);
    expect(markup.render().find(`[name="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`[name="${field}"]`).attr('type')).toEqual(data?.type === 'email' ? 'email' : 'text');
    expect(markup.render().find(`[name="${field}"]`).attr('required')).toBeDefined();
    expect(markup.render().find(`[name="${field}"]`).attr('max')).toEqual(`${data?.maximum}`);
    expect(markup.render().find(`[name="${field}"]`).attr('min')).toEqual(`${data?.minimum}`);
    expect(markup.render().find(`#${field}-hint`).text()).toEqual(data?.description);
  });

  it.each([['radio-1'], ['checkbox-1']])('should successfully display the form element with field %s', field => {
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[data-field="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`label[data-field="${field}"]`).text()).toEqual(data?.label);
    expect(markup.render().find(`[name="${field}"]`)).toHaveLength(0);
    expect(markup.render().find(`#${field}-hint`)).toHaveLength(0);
  });

  it.each([['radio-2'], ['checkbox-2']])('should successfully display the form element with field %s', field => {
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[data-field="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`label[data-field="${field}"]`).text()).toEqual(data?.label);
    expect(markup.render().find(`[name="${field}"]`)).toHaveLength(2);
    expect(markup.render().find(`[name="${field}"]`).attr('type')).toEqual(data?.type);
    expect(markup.render().find(`[name="${field}"]`).attr('required')).toBeDefined();
    expect(markup.render().find(`#${field}-hint`).text()).toEqual(data?.description);
  });

  it('should successfully display the form element with field select-1', () => {
    const field = 'select-1';
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[for="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`label[for="${field}"]`).text()).toEqual(data?.label);
    expect(markup.render().find(`select[name="${field}"] option`)).toHaveLength(0);
    expect(markup.render().find(`select[name="${field}"]`).attr('required')).toBeUndefined();
    expect(markup.render().find(`#${field}-hint`)).toHaveLength(0);
  });

  it('should successfully display the form element with field select-2', () => {
    const field = 'select-2';
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[for="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`label[for="${field}"]`).text()).toEqual(data?.label);
    expect(markup.render().find(`select[name="${field}"] option`)).toHaveLength(2);
    expect(markup.render().find(`select[name="${field}"]`).attr('required')).toBeDefined();
    expect(markup.render().find(`#${field}-hint`).text()).toEqual(data?.description);
  });

  it('should successfully display the form element with field textarea-1', () => {
    const field = 'textarea-1';
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[for="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`label[for="${field}"]`).text()).toEqual(data?.label);
    expect(markup.render().find(`textarea[name="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`textarea[name="${field}"]`).attr('required')).toBeUndefined();
    expect(markup.render().find(`textarea[name="${field}"]`).attr('maxlength')).toBeUndefined();
    expect(markup.render().find(`textarea[name="${field}"]`).attr('minlength')).toBeUndefined();
    expect(markup.render().find(`#${field}-hint`)).toHaveLength(0);
    expect(markup.render().find(`#${field}-info`)).toHaveLength(0);
  });

  it('should successfully display the form element with field textarea-2', () => {
    const field = 'textarea-2';
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[for="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`label[for="${field}"]`).text()).toEqual(data?.label);
    expect(markup.render().find(`textarea[name="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`textarea[name="${field}"]`).attr('required')).toBeDefined();
    expect(markup.render().find(`textarea[name="${field}"]`).attr('maxlength')).toEqual(`${data?.maximum}`);
    expect(markup.render().find(`textarea[name="${field}"]`).attr('minlength')).toEqual(`${data?.minimum}`);
    expect(markup.render().find(`#${field}-hint`).text()).toEqual(data?.description);
    expect(markup.render().find(`#${field}-info`).text()).toContain(data?.maximum);
  });

  it('should successfully display the form element with field hidden-1', () => {
    const field = 'hidden-1';
    const data = fields.find(f => f.name === field);

    expect(data).toBeDefined();
    expect(markup.render().find(`label[for="${field}"]`)).toHaveLength(0);
    expect(markup.render().find(`[name="${field}"]`)).toHaveLength(1);
    expect(markup.render().find(`[name="${field}"]`).attr('value')).toEqual('TEST');
    expect(markup.render().find(`#${field}-hint`)).toHaveLength(0);
    expect(markup.render().find(`#${field}-info`)).toHaveLength(0);
  });
});
