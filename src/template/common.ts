/**
 * GOV.UK Template supports two kinds of placement for links in the footer. One
 * being one of three columns, the other being the meta information.
 *
 * Learn more at https://design-system.service.gov.uk/components/footer/
 */
export type FooterMenuItemPlacement = 'column' | 'meta';

/**
 * GOV.UK Template has capability of having three columns in the footer. These
 * columns can be configured in the main configuration of the system. The
 * maximum number of columns, is three. These can however be spaced over more
 * than one column.
 *
 * Learn more at https://design-system.service.gov.uk/components/footer/
 */
export type FooterMenuItemColumn = 1 | 2 | 3;

/**
 * Allow the item to be placed in the navigation located in the footer.
 */
export type FooterMenuConfiguration = {
  /**
   * Define which column should this particular item be placed in.
   *
   * @option 1
   * @option 2
   * @option 3
   */
  readonly column?: FooterMenuItemColumn;
  /**
   * Choose if this specific page should be included in the footer menu.
   *
   * @default false
   */
  readonly include?: boolean;
  /**
   * Define the placement of the item. You can choose from `column` or `meta`.
   *
   * Learn more at https://design-system.service.gov.uk/components/footer/
   *
   * @option column
   * @option meta
   */
  readonly placement?: FooterMenuItemPlacement;
  /**
   * Define position of this particular item.
   *
   * @example 2
   */
  readonly position?: number;
  /**
   * Override the page title when displaying ad navigation link.
   *
   * @example Cookies
   */
  readonly title?: string;
};

/**
 * Allow the item to be placed in the navigation located in the header.
 */
export type HeaderMenuConfiguration = {
  /**
   * Choose if this specific page should be included in the header menu.
   *
   * @default false
   */
  readonly include?: boolean;
  /**
   * Define position of this particular item.
   *
   * @example 2
   */
  readonly position?: number;
  /**
   * Override the page title when displaying ad navigation link.
   *
   * @example Features
   */
  readonly title?: string;
};

/**
 * The general configuration for the particular item allowing its placement in
 * one of the allowed menu locations.
 */
export type MenuConfiguration = {
  /** Allow the item to be placed in the navigation located in the header. */
  readonly header?: HeaderMenuConfiguration;
  /** Allow the item to be placed in the navigation located in the footer. */
  readonly footer?: FooterMenuConfiguration;
};
