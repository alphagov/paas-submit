import { MenuConfiguration } from './common';

/**
 * The definition of a partial on the particular page.
 */
export type PagePartialElement = {
  /**
   * The location of the file relative to the project root directory. It will be
   * ignored if the file has a kind set not to 'form' or 'partial'.
   */
  readonly file: string;
  /**
   * The size of the partial on the page.
   *
   * Learn more at https://design-system.service.gov.uk/styles/layout/
   *
   * @option full
   * @option one-half
   * @option one-quarter
   * @option one-third
   * @option three-quarters
   * @option two-thirds
   *
   * @default full
   */
  readonly layout?: 'full' | 'one-half' | 'one-quarter' | 'one-third' | 'three-quarters' | 'two-thirds';
};

/**
 * The recognised attributes when creating a markdown file of type `page`.
 *
 * @example
 * ```markdown
 * ---
 * title: GOV.UK Platform as a Service - Technical Documentation
 * ---
 * # GOV.UK Platform as a Service
 *
 * GOV.UK Platform as a Service (PaaS) is a cloud-hosting platform built by the
 * Government Digital Service (GDS). GOV.UK PaaS manages the deployment of your
 * apps, services and background tasks so you don’t need to hire people with
 * specialist cloud skills.
 * ```
 *
 * @category Template
 */
export type PageTemplateAttributes = {
  /**
   * Title attribute will be used in <title> tag, and when referenced to in
   * breadcrumbs or menu links.
   *
   * @example Contact
   * @example Documentation
   */
  readonly title: string;
  /**
   * The system will attempt to match the URL with your template files, based on
   * both `path` atribute and template position in the file structure.
   * For instance:
   * - `templates/about.md` will be available when visitng `/about`
   * - `templates/contact/index.md` will be available when visitng `/contact`
   *  but not `contact/index`
   * - `templates/contact/page.md` will be available when visiting
   *  `/contact/page`
   *
   * You can disable that behaviour per template basis, by setting this
   * attribute to `true`.
   *
   * @example true
   * @default false
   */
  readonly disableTemplateMatch?: boolean;
  /**
   * URL Path this particular page will be available under. This is an optional
   * parameter, as the Submit engine will compose one based on the placement of
   * the page file in your root directory. It may become useful, if you'd like
   * to organise files in your source code or if you want to ensure that links
   * inside the content will always point to the right place.
   *
   * @example /about
   * @example /contact
   */
  readonly path?: string;
  /**
   * The general configuration for the particular item allowing its placement in
   * one of the allowed menu locations.
   */
  readonly menu?: MenuConfiguration;
  /**
   * The list of files relative to project directory, that will compose the
   * current page. The order of the files will be taken into the consideration
   * when loading up elements to the page.
   */
  readonly partials?: ReadonlyArray<PagePartialElement>;
};
