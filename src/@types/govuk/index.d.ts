export {};

declare global {
  interface Window {
    readonly GOVUKFrontend: {
      readonly initAll: (opts?: { readonly scope?: Document | string }) => {};
    };
  }
}
