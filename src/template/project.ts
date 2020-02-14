/**
 * The Phase banner that will be displayed on your web page.
 */
export type Phase = {
  /**
   * The markdown formatted helper text for the phase banner.
   *
   * @example This is an experimental service. Please get in touch with [support queries](/support).
   * @example Please leave us [feedback](/feedback).
   */
  readonly content: string;
  /**
   * The label for the phase badge.
   *
   * @example alpha
   * @example beta
   */
  readonly tag: string;
};

/**
 * Project main configuration, to be used by the system in order to further help hosting your web page.
 */
export type ProjectConfiguration = {
  readonly phase?: Phase;
  /**
   * Your service's name, that will be printed out in the header next to GOV.UK Logo.
   *
   * @example Platform as a Service
   * @example Notify
   */
  readonly service: string;
};
