import { Context, Next } from 'koa';
import React from 'react';
import Markdown from 'react-markdown';
import { Logger } from 'winston';

import { Record } from '../system';
import { PageTemplateAttributes } from '../template';
import { FooterMenu, render } from '../template/frontend';
import { Form, NavigationElement } from '../template/frontend/elements';
import { renderers } from '../template/frontend/markdown-elements';

function removeTrailingSlash(path?: string): undefined | string {
  return path ? path.replace(/\/$/, '') : undefined;
}

function pathFromTemplate(template: string): string {
  return template
    .replace('.md', '')
    .replace('index', '')
    .replace(/\/$/, '');
}

function filterRecords(path: string, logger: Logger): Function {
  return (record: Record<PageTemplateAttributes>): boolean => {
    if (!['page'].includes(record.kind)) {
      return false;
    }

    const pathURL = removeTrailingSlash(path);
    const pathAttribue = removeTrailingSlash(record.attributes?.path);

    if (pathAttribue === pathURL) {
      logger.debug('found matching template attribute `path`', {
        match: pathAttribue,
        path,
        template: record.template,
      });

      return true;
    }

    const pathTemplate = pathFromTemplate(record.template);
    if (!record.attributes?.disableTemplateMatch && pathTemplate === pathURL) {
      logger.debug('found matching template file naming', {
        match: record.template,
        path,
      });

      return true;
    }

    return false;
  };
}

type composeNavigationRecordReturn = (record: Record<PageTemplateAttributes>) => NavigationElement;

function composeNavigationRecord(path: string, location: 'footer' | 'header'): composeNavigationRecordReturn {
  return (record: Record<PageTemplateAttributes>) => {
    const pathURL = removeTrailingSlash(path);
    const pathAttribue = removeTrailingSlash(record.attributes.path);
    const pathTemplate = pathFromTemplate(record.template);

    return {
      active: pathURL === pathAttribue || pathURL === pathTemplate,
      href: pathAttribue || pathTemplate || '/',
      text: record.attributes.menu![location]!.title || record.attributes.title, // eslint-disable-line @typescript-eslint/no-non-null-assertion
    };
  };
}

function composeHeaderNavigation(ctx: Context): ReadonlyArray<NavigationElement> {
  return ctx.registry
    .filter((record: Record) => ['page'].includes(record.kind))
    .filter((record: Record<PageTemplateAttributes>) => record.attributes?.menu?.header?.include)
    .sort((recordA: Record<PageTemplateAttributes>, recordB: Record<PageTemplateAttributes>) =>
      (recordA.attributes.menu!.header!.position || 999) - (recordB.attributes.menu!.header!.position || 999)) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    .map(composeNavigationRecord(ctx.path, 'header'));
}

function composeFooterNavigation(ctx: Context): FooterMenu {
  const pages = ctx.registry
    .filter((record: Record) => ['page'].includes(record.kind))
    .filter((record: Record<PageTemplateAttributes>) => record.attributes?.menu?.footer?.include)
    .sort((recordA: Record<PageTemplateAttributes>, recordB: Record<PageTemplateAttributes>) =>
      (recordA.attributes.menu!.footer!.position || 999) - (recordB.attributes.menu!.footer!.position || 999)); // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const inColumns = pages
    .filter((record: Record<PageTemplateAttributes>) => record.attributes.menu!.footer!.placement === 'column'); // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const column = [1, 2, 3].map(col => inColumns
    .filter((record: Record<PageTemplateAttributes>) => (record.attributes.menu!.footer!.column || 1) === col) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    .map(composeNavigationRecord(ctx.path, 'footer')));

  const meta = pages
    .filter((record: Record<PageTemplateAttributes>) => record.attributes.menu!.footer!.placement === 'meta') // eslint-disable-line @typescript-eslint/no-non-null-assertion
    .map(composeNavigationRecord(ctx.path, 'footer'));

  return { column, meta };
}

export async function serveContent(ctx: Context, next: Next): Promise<void> {
  const page: undefined | Record<PageTemplateAttributes> = ctx.registry.find(filterRecords(ctx.path, ctx.log));

  if (!page) {
    ctx.throw(404, 'missing record');
  }

  const allPartials = ctx.registry.filter((record: Record) => !['page', 'error'].includes(record.kind));
  const partials = page.attributes?.partials?.map(partial => ({
    ...(allPartials.find((record: Record) => record.template === partial.file) || []),
    layout: partial.layout || 'full',
  }));
  const footerMenu = composeFooterNavigation(ctx);
  const headerMenu = composeHeaderNavigation(ctx);

  ctx.body = render(<>
    <Markdown renderers={renderers}>{page.markdown}</Markdown>

    <div className="govuk-grid-row">
      {partials?.map((partial, index) => {
        return <div key={index} className={`govuk-grid-column-${partial.layout}`}>
          <Markdown renderers={renderers}>{partial.markdown}</Markdown>

          {partial.kind === 'form' ? <Form csrf={ctx.csrf} fields={partial.attributes.fields} /> : null}
        </div>;
      })}
    </div>
  </>, {
    csrf: ctx.csrf,
    menu: {
      footer: footerMenu,
      header: headerMenu,
    },
    service: ctx.config.project.service,
    title: page.attributes?.title || ctx.config.project.service,
  });

  await next();
}
