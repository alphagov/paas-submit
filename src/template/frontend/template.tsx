import React, { ReactElement, ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';

import { Phase } from '../project';

import { Breadcrumbs, BreadcrumbsItem, Footer, Header, Main, NavigationElement, PhaseBanner } from './elements';
import { renderers } from './markdown-elements';
import govukPrintStyles from './print.scss';
import govukIE8Styles from './screen.ie8.scss';
import govukStyles from './screen.scss';

export type FooterMenu = {
  readonly column?: ReadonlyArray<ReadonlyArray<NavigationElement>>;
  readonly meta?: ReadonlyArray<NavigationElement>;
};

type renderConfig = {
  readonly assetLocation?: string;
  readonly breadcrumbs?: ReadonlyArray<BreadcrumbsItem>;
  readonly csrf: string;
  readonly language?: string;
  readonly menu?: {
    readonly footer: FooterMenu;
    readonly header: ReadonlyArray<NavigationElement>;
  };
  readonly phase?: Phase;
  readonly service: string;
  readonly themeColor?: string;
  readonly title: string;
};

export function render(content: ReactElement, config: renderConfig): string {
  const cfg: renderConfig = {
    assetLocation: '/assets',
    language: 'en',
    themeColor: '#0b0c0c',

    ...config,
  };

  return `<!DOCTYPE html>
  <html lang=${cfg.language} class="govuk-template">
    <head>
      <meta charSet="utf-8" />
      <title lang="${cfg.language}">${cfg.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content="${cfg.themeColor}" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf-token" content="${cfg.csrf}" />
      <link rel="shortcut icon" sizes="16x16 32x32 48x48" type="image/x-icon"
        href="${cfg.assetLocation}/images/favicon.ico" />
      <link rel="mask-icon" color="${cfg.themeColor}"
        href="${cfg.assetLocation}/images/govuk-mask-icon.svg" />
      <link rel="apple-touch-icon" sizes="180x180"
        href="${cfg.assetLocation}/images/govuk-apple-touch-icon-180x180.png" />
      <link rel="apple-touch-icon" sizes="167x167"
        href="${cfg.assetLocation}/images/govuk-apple-touch-icon-167x167.png" />
      <link rel="apple-touch-icon" sizes="152x152"
        href="${cfg.assetLocation}/images/govuk-apple-touch-icon-152x152.png" />
      <link rel="apple-touch-icon"
        href="${cfg.assetLocation}/images/govuk-apple-touch-icon.png" />
      <!--[if !IE 8]><!-->
        <link href="${govukStyles}" media="screen" rel="stylesheet" />
        <link href="${govukPrintStyles}" media="print" rel="stylesheet" type="text/css" />
      <!--<![endif]-->
      <!--[if IE 8]>
        <link href="${govukIE8Styles}" media="screen" rel="stylesheet" />
      <![endif]-->
      <!--[if lt IE 9]>
        <script src="/html5-shiv/html5shiv.js"></script>
      <![endif]-->
      <meta property="og:image" content="${cfg.assetLocation}/images/govuk-opengraph-image.png" />
    </head>
    ${renderToStaticMarkup(
      <body className="govuk-template__body">
        <script
          /**
           * This particular occurance, does not allow the content to be modified in any way by users. It's a hard coded
           * piece of JavaScript determinating wheather the user has enabled JavaScript support in their browser.
           */
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              // eslint-disable-next-line quotes
              `document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');`,
          }}
        ></script>
        <a href="#main-content" className="govuk-skip-link">
          Skip to main content
        </a>
        <Header service={cfg.service} menu={cfg.menu?.header} />
        <div className="govuk-width-container">
          {cfg.phase ?
            <PhaseBanner tag={cfg.phase.tag}>
              <Markdown
                allowedTypes={['text', 'emphasis', 'strong', 'link', 'paragraph']}
                renderers={{
                  ...renderers,
                  // eslint-disable-next-line react/display-name
                  paragraph: (props: { readonly children: ReactNode }) => <>{props.children}</>,
                }}
              >
                {cfg.phase.content}
              </Markdown>
            </PhaseBanner>
            : null}
          {cfg.breadcrumbs ? <Breadcrumbs items={cfg.breadcrumbs} /> : null}
          <Main>{content}</Main>
        </div>
        <Footer menu={cfg.menu?.footer} />
        <script src={`${cfg.assetLocation}/all.js`}></script>
        <script src={`${cfg.assetLocation}/init.js`}></script>
      </body>,
    )}
  </html>`;
}
