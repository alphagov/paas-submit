import React, { ReactElement, ReactNode } from 'react';

import { FormField } from '../form';

import { FooterMenu } from './template';

export type BreadcrumbsItem = {
  readonly href?: string;
  readonly text: string;
};

type BreadcrumbsProperties = {
  readonly items: ReadonlyArray<BreadcrumbsItem>;
};

export type NavigationElement = {
  readonly active?: boolean;
  readonly href: string;
  readonly text: string;
};

type HeaderProperties = {
  readonly assetLocation?: string;
  readonly menu?: ReadonlyArray<NavigationElement>;
  readonly service: string;
};

type FooterProperties = {
  readonly assetLocation?: string;
  readonly menu?: FooterMenu;
};

type PhaseBannerProperties = {
  readonly tag: string;
  readonly children?: ReactNode;
};

type MainProperties = {
  readonly className?: string;

  readonly contentStart?: ReactElement;
  readonly contentEnd?: ReactElement;
  readonly language?: string;

  readonly children: ReactElement;
};

type FormProperties = {
  readonly csrf: string;
  readonly fields: ReadonlyArray<FormField>;
};

type FieldProperties = {
  readonly field: FormField;
};

export function Breadcrumbs(props: BreadcrumbsProperties): ReactElement {
  const items = props.items.map((item, index) => (
    <li
      key={index}
      className="govuk-breadcrumbs__list-item"
      aria-current={index + 1 === props.items.length ? 'page' : undefined}
    >
      {item.href ? (
        <a className="govuk-breadcrumbs__link" href={item.href}>
          {item.text}
        </a>
      ) : (
        item.text
      )}
    </li>
  ));

  return (
    <div className="govuk-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">{items}</ol>
    </div>
  );
}

export function Header(props: HeaderProperties): ReactElement {
  const assetLocation = props.assetLocation || '/assets';

  return (
    <header className="govuk-header" role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <a
            href="/"
            className="govuk-header__link govuk-header__link--homepage"
          >
            <span className="govuk-header__logotype">
              <svg
                role="presentation"
                focusable="false"
                className="govuk-header__logotype-crown"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 132 97"
                height="30"
                width="36"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M25 30.2c3.5 1.5 7.7-.2 9.1-3.7 1.5-3.6-.2-7.8-3.9-9.2-3.6-1.4-7.6.3-9.1 3.9-1.4 3.5.3 7.5 3.9 9zM9 39.5c3.6 1.5 7.8-.2 9.2-3.7 1.5-3.6-.2-7.8-3.9-9.1-3.6-1.5-7.6.2-9.1 3.8-1.4 3.5.3 7.5 3.8 9zM4.4 57.2c3.5 1.5 7.7-.2 9.1-3.8 1.5-3.6-.2-7.7-3.9-9.1-3.5-1.5-7.6.3-9.1 3.8-1.4 3.5.3 7.6 3.9 9.1zm38.3-21.4c3.5 1.5 7.7-.2 9.1-3.8 1.5-3.6-.2-7.7-3.9-9.1-3.6-1.5-7.6.3-9.1 3.8-1.3 3.6.4 7.7 3.9 9.1zm64.4-5.6c-3.6 1.5-7.8-.2-9.1-3.7-1.5-3.6.2-7.8 3.8-9.2 3.6-1.4 7.7.3 9.2 3.9 1.3 3.5-.4 7.5-3.9 9zm15.9 9.3c-3.6 1.5-7.7-.2-9.1-3.7-1.5-3.6.2-7.8 3.7-9.1 3.6-1.5 7.7.2 9.2 3.8 1.5 3.5-.3 7.5-3.8 9zm4.7 17.7c-3.6 1.5-7.8-.2-9.2-3.8-1.5-3.6.2-7.7 3.9-9.1 3.6-1.5 7.7.3 9.2 3.8 1.3 3.5-.4 7.6-3.9 9.1zM89.3 35.8c-3.6 1.5-7.8-.2-9.2-3.8-1.4-3.6.2-7.7 3.9-9.1 3.6-1.5 7.7.3 9.2 3.8 1.4 3.6-.3 7.7-3.9 9.1zM69.7 17.7l8.9 4.7V9.3l-8.9 2.8c-.2-.3-.5-.6-.9-.9L72.4 0H59.6l3.5 11.2c-.3.3-.6.5-.9.9l-8.8-2.8v13.1l8.8-4.7c.3.3.6.7.9.9l-5 15.4v.1c-.2.8-.4 1.6-.4 2.4 0 4.1 3.1 7.5 7 8.1h.2c.3 0 .7.1 1 .1.4 0 .7 0 1-.1h.2c4-.6 7.1-4.1 7.1-8.1 0-.8-.1-1.7-.4-2.4V34l-5.1-15.4c.4-.2.7-.6 1-.9zM66 92.8c16.9 0 32.8 1.1 47.1 3.2 4-16.9 8.9-26.7 14-33.5l-9.6-3.4c1 4.9 1.1 7.2 0 10.2-1.5-1.4-3-4.3-4.2-8.7L108.6 76c2.8-2 5-3.2 7.5-3.3-4.4 9.4-10 11.9-13.6 11.2-4.3-.8-6.3-4.6-5.6-7.9 1-4.7 5.7-5.9 8-.5 4.3-8.7-3-11.4-7.6-8.8 7.1-7.2 7.9-13.5 2.1-21.1-8 6.1-8.1 12.3-4.5 20.8-4.7-5.4-12.1-2.5-9.5 6.2 3.4-5.2 7.9-2 7.2 3.1-.6 4.3-6.4 7.8-13.5 7.2-10.3-.9-10.9-8-11.2-13.8 2.5-.5 7.1 1.8 11 7.3L80.2 60c-4.1 4.4-8 5.3-12.3 5.4 1.4-4.4 8-11.6 8-11.6H55.5s6.4 7.2 7.9 11.6c-4.2-.1-8-1-12.3-5.4l1.4 16.4c3.9-5.5 8.5-7.7 10.9-7.3-.3 5.8-.9 12.8-11.1 13.8-7.2.6-12.9-2.9-13.5-7.2-.7-5 3.8-8.3 7.1-3.1 2.7-8.7-4.6-11.6-9.4-6.2 3.7-8.5 3.6-14.7-4.6-20.8-5.8 7.6-5 13.9 2.2 21.1-4.7-2.6-11.9.1-7.7 8.8 2.3-5.5 7.1-4.2 8.1.5.7 3.3-1.3 7.1-5.7 7.9-3.5.7-9-1.8-13.5-11.2 2.5.1 4.7 1.3 7.5 3.3l-4.7-15.4c-1.2 4.4-2.7 7.2-4.3 8.7-1.1-3-.9-5.3 0-10.2l-9.5 3.4c5 6.9 9.9 16.7 14 33.5 14.8-2.1 30.8-3.2 47.7-3.2z"
                ></path>
                <image
                  src={`${assetLocation}/images/govuk-logotype-crown.png`}
                  className="govuk-header__logotype-crown-fallback-image"
                ></image>
              </svg>{' '}
              <span className="govuk-header__logotype-text">GOV.UK</span>
            </span>{' '}
            <span className="govuk-header__product-name">
              {props.service}
            </span>
          </a>
        </div>
        <div className="govuk-header__content">
          <button
            type="button"
            className="govuk-header__menu-button govuk-js-header-toggle"
            aria-controls="navigation"
            aria-label="Show or hide Top Level Navigation"
          >
            Menu
          </button>

          <nav>
            <ul
              id="navigation"
              className="govuk-header__navigation "
              aria-label="Top Level Navigation"
            >
              {props.menu?.map(item => <li key={item.href} className="govuk-header__navigation-item">
                <a className="govuk-header__link" href={item.href}>{item.text}</a>
              </li>)}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function PhaseBanner(props: PhaseBannerProperties): ReactElement {
  return (
    <div className="govuk-phase-banner">
      <p className="govuk-phase-banner__content">
        <strong className="govuk-tag govuk-phase-banner__content__tag">
          {props.tag}
        </strong>
        <span className="govuk-phase-banner__text">{props.children}</span>
      </p>
    </div>
  );
}

export function Main(props: MainProperties): ReactElement {
  const classess = props.className?.split(' ') || [];

  return (
    <main
      className={['govuk-main-wrapper', ...classess].join(' ')}
      id="main-content"
      role="main"
      lang={props.language}
    >
      {props.children}
    </main>
  );
}

export function Footer(props: FooterProperties): ReactElement {
  return (
    <footer className="govuk-footer" role="contentinfo">
      <div className="govuk-width-container ">
        <div className="govuk-footer__navigation">
          {props.menu?.column?.map((column, index) => <div key={index} className="govuk-footer__section">
              <ul className="govuk-footer__list ">
                {column.map(item => <li key={item.href} className="govuk-footer__list-item">
                    <a className="govuk-footer__link" href={item.href}>{item.text}</a>
                  </li>)}
              </ul>
            </div>)}
        </div>

        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <ul className="govuk-footer__inline-list">
              {props.menu?.meta?.map(item => <li key={item.href} className="govuk-footer__inline-list-item">
                  <a className="govuk-footer__link" href={item.href}>{item.text}</a>
                </li>)}
            </ul>

            <svg
              role="presentation"
              focusable="false"
              className="govuk-footer__licence-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 483.2 195.7"
              height="17"
              width="41"
            >
              <path
                fill="currentColor"
                d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
              />
            </svg>
            <span className="govuk-footer__licence-description">
              All content is available under the{' '}
              <a
                className="govuk-footer__link"
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                rel="license"
              >
                Open Government Licence v3.0
              </a>
              , except where otherwise stated
            </span>
          </div>

          <div className="govuk-footer__meta-item">
            <a
              className="govuk-footer__link govuk-footer__copyright-logo"
              href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
            >
              © Crown copyright
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Text(props: FieldProperties): ReactElement {
  return <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={props.field.name}>
      {props.field.label}
    </label>

    {props.field.description
      ? <span id={`${props.field.name}-hint`} className="govuk-hint">
          {props.field.description}
        </span>
      : null}

    <input className="govuk-input" id={props.field.name} name={props.field.name}
      aria-describedby={props.field.description ? `${props.field.name}-hint` : undefined}
      type={props.field.type || 'text'}
      required={props.field.required} min={props.field.minimum} max={props.field.maximum} />
  </div>;
}

function Textarea(props: FieldProperties): ReactElement {
  const describedBy = [];

  if (props.field.description) {
    describedBy.push(`${props.field.name}-hint`);
  }

  if (props.field.maximum) {
    describedBy.push(`${props.field.name}-info`);
  }

  return <div
    className={props.field.maximum ? 'govuk-character-count' : undefined}
    data-module={props.field.maximum ? 'govuk-character-count' : undefined}
    data-maxlength={props.field.maximum}>
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={props.field.name}>
        {props.field.label}
      </label>

      {props.field.description
        ? <span id={`${props.field.name}-hint`} className="govuk-hint">
            {props.field.description}
          </span>
        : null}

      <textarea className={`govuk-textarea ${props.field.maximum ? 'govuk-js-character-count' : ''}`}
        id={props.field.name} name={props.field.name} rows={5} aria-describedby={describedBy.join(' ')}
        required={props.field.required} minLength={props.field.minimum} maxLength={props.field.maximum} />

      {props.field.maximum ? <span id={`${props.field.name}-info`}
        className="govuk-hint govuk-character-count__message" aria-live="polite">
        You can enter up to {props.field.maximum} characters
      </span> : null}
    </div>
  </div>;
}

function Number(props: FieldProperties): ReactElement {
  return <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={props.field.name}>
      {props.field.label}
    </label>

    {props.field.description
      ? <span id={`${props.field.name}-hint`} className="govuk-hint">
          {props.field.description}
        </span>
      : null}

    <input className="govuk-input" id={props.field.name} name={props.field.name}
      aria-describedby={props.field.description ? `${props.field.name}-hint` : undefined}
      type="text" required={props.field.required} min={props.field.minimum} max={props.field.maximum}
      pattern="[0-9]*" inputMode="numeric" spellCheck={false} />
  </div>;
}

function Select(props: FieldProperties): ReactElement {
  return <div className="govuk-form-group">
    <label className="govuk-label" htmlFor={props.field.name}>
      {props.field.label}
    </label>

    {props.field.description
      ? <span id={`${props.field.name}-hint`} className="govuk-hint">
          {props.field.description}
        </span>
      : null}

    <select className="govuk-select" id={props.field.name} name={props.field.name}
      aria-describedby={props.field.description ? `${props.field.name}-hint` : undefined}
      required={props.field.required}>
      {props.field.options?.map((opt, index) =>
        <option key={index} value={opt.value || opt.text} selected={opt.selected}>{opt.text}</option>)}
    </select>
  </div>;
}

function Radio(props: FieldProperties): ReactElement {
  return <div className="govuk-form-group">
    <fieldset className="govuk-fieldset"
      aria-describedby={props.field.description ? `${props.field.name}-hint` : undefined}>
      <label className="govuk-fieldset__legend govuk-fieldset__legend--xl" data-field={props.field.name}>
        <h1 className="govuk-fieldset__heading">
          {props.field.label}
        </h1>
      </label>

      {props.field.description
        ? <span id={`${props.field.name}-hint`} className="govuk-hint">
            {props.field.description}
          </span>
        : null}

      <div className="govuk-radios">
        {props.field.options?.map((option, index) => <div key={index} className="govuk-radios__item">
            <input className="govuk-radios__input" id={`${props.field.name}-${index}`} name={props.field.name}
              type="radio" value={option.value} defaultChecked={option.selected} required={props.field.required} />
            <label className="govuk-label govuk-radios__label" htmlFor={ `${props.field.name}-${index}`}>
              {option.text}
            </label>
          </div>)}
      </div>
    </fieldset>
  </div>;
}

function Checkbox(props: FieldProperties): ReactElement {
  return <div className="govuk-form-group">
    <fieldset className="govuk-fieldset"
      aria-describedby={props.field.description ? `${props.field.name}-hint` : undefined}>
      <label className="govuk-fieldset__legend govuk-fieldset__legend--xl" data-field={props.field.name}>
        <h1 className="govuk-fieldset__heading">
          {props.field.label}
        </h1>
      </label>

      {props.field.description
        ? <span id={`${props.field.name}-hint`} className="govuk-hint">
            {props.field.description}
          </span>
        : null}

      <div className="govuk-checkboxes">
        {props.field.options?.map((option, index) => <div key={index} className="govuk-checkboxes__item">
            <input className="govuk-checkboxes__input" id={`${props.field.name}-${index}`} name={props.field.name}
              type="checkbox" value={option.value} defaultChecked={option.selected} required={props.field.required} />
            <label className="govuk-label govuk-checkboxes__label" htmlFor={ `${props.field.name}-${index}`}>
              {option.text}
            </label>
          </div>)}
      </div>
    </fieldset>
  </div>;
}

function Hidden(props: FieldProperties): ReactElement {
  return <input type="hidden" name={props.field.name} defaultValue={props.field.value} />;
}

function Field(props: FieldProperties): ReactElement {
  switch (props.field.type) {
    case 'hidden':
      return <Hidden field={props.field} />;
    case 'textarea':
      return <Textarea field={props.field} />;
    case 'number':
      return <Number field={props.field} />;
    case 'select':
      return <Select field={props.field} />;
    case 'radio':
      return <Radio field={props.field} />;
    case 'checkbox':
      return <Checkbox field={props.field} />;
    default:
      return <Text field={props.field} />;
  }
}

export function Form(props: FormProperties): ReactElement {
  return <form method="post">
    <input type="hidden" name="_csrf" value={props.csrf} />
    {props.fields.map((field, index) => <Field key={index} field={field} />)}

    <button className="govuk-button" data-module="govuk-button" data-prevent-double-click="true">
      Submit
    </button>
  </form>;
}
