import React, { ReactElement, ReactNode } from 'react';

type ErrorProperties = {
  readonly children: ReactNode;
  readonly reference: string;
  readonly title?: string;
};

export function Error(props: ErrorProperties): ReactElement {
  return <>
    <h1 className="govuk-heading-xl">{props.title || 'Sorry, there is a problem with the service'}</h1>

    {props.children}

    <p className="govuk-body-s">Reference: <code className="govuk-!-font-size-14">{props.reference}</code></p>
  </>;
}
