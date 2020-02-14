import { PagePartialElement } from './page';

/**
 * The recognised attributes when creating a markdown file of type `page`.
 *
 * @example
 * ```markdown
 * ---
 * kind: error
 * title: Not Found
 * ---
 * # Page not found
 *
 * Something went wrong while processing the request.
 *
 * You can browse from the [homepage](/) to find the information you need.
 *
 * If this keeps on occuring, please get in touch.
 * ```
 *
 * @category Template
 */
export type ErrorPageTemplateAttributes = {
  /**
   * The error code this specific template will be used for.
   *
   * @example 404
   * @example 500
   */
  readonly code: number;
  /**
   * Title attribute will be used in <title> tag.
   *
   * @example Contact
   * @example Documentation
   */
  readonly title: string;
  /**
   * The list of files relative to project directory, that will compose the
   * current page. The order of the files will be taken into the consideration
   * when loading up elements to the page.
   */
  readonly partials?: ReadonlyArray<PagePartialElement>;
};
