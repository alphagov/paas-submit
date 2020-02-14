import { shallow } from 'enzyme';
import React from 'react';
import Markdown from 'react-markdown';

import { Heading, Link, List, Paragraph, renderers } from './markdown-elements';

describe(Heading, () => {
  it('should compile markdown correctly', () => {
    const h1 = shallow(<Markdown renderers={renderers}># Test</Markdown>);
    expect(h1.render().is('h1')).toBe(true);
    expect(h1.render().hasClass('govuk-heading-xl')).toBe(true);

    const h2 = shallow(<Markdown renderers={renderers}>## Test</Markdown>);
    expect(h2.render().is('h2')).toBe(true);
    expect(h2.render().hasClass('govuk-heading-l')).toBe(true);

    const h3 = shallow(<Markdown renderers={renderers}>### Test</Markdown>);
    expect(h3.render().is('h3')).toBe(true);
    expect(h3.render().hasClass('govuk-heading-m')).toBe(true);

    const h4 = shallow(<Markdown renderers={renderers}>#### Test</Markdown>);
    expect(h4.render().is('h4')).toBe(true);
    expect(h4.render().hasClass('govuk-heading-s')).toBe(true);

    const h5 = shallow(<Markdown renderers={renderers}>##### Test</Markdown>);
    expect(h5.render().is('p')).toBe(true);
    expect(h5.render().hasClass('govuk-body')).toBe(true);
  });
});

describe(Link, () => {
  it('should compile markdown correctly', () => {
    const link = shallow(<Markdown renderers={renderers} skipHtml={true}>[Test](https://example.com)</Markdown>);
    expect(link.render().find('a').hasClass('govuk-link')).toBe(true);
  });
});

describe(List, () => {
  it('should compile markdown correctly', () => {
    const list = shallow(<Markdown renderers={renderers} source="* Item 1\n* Item 2\n* Item 3" />);
    expect(list.render().is('ul')).toBe(true);
    expect(list.render().hasClass('govuk-list')).toBe(true);
    expect(list.render().hasClass('govuk-list--bullet')).toBe(true);

    const orderedList = shallow(<Markdown renderers={renderers} source="1. Item 1\n2. Item 2\n3. Item 3" />);
    expect(orderedList.render().is('ol')).toBe(true);
    expect(orderedList.render().hasClass('govuk-list')).toBe(true);
    expect(orderedList.render().hasClass('govuk-list--number')).toBe(true);
  });
});

describe(Paragraph, () => {
  it('should compile markdown correctly', () => {
    const p = shallow(<Markdown renderers={renderers}>
      Testing paragraph
    </Markdown>);
    expect(p.render().is('p')).toBe(true);
    expect(p.render().hasClass('govuk-body')).toBe(true);
  });
});
