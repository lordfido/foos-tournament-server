import { JSDOM } from 'jsdom';
// import { log } from '../../../common/utils/logger';

export const parseMatchDetailsButton = (innerHTML?: string) => {
  if (!innerHTML) {
    return undefined;
  }

  const dom = new JSDOM(innerHTML);
  const document = dom.window.document;

  const table = document.querySelector('table');
  if (!table) {
    return undefined;
  }

  return Array.from(table.children[0].children).map(tr => ({
    foreigners: tr.children[2].innerHTML,
    locals: tr.children[0].innerHTML,
    result: tr.children[1].innerHTML,
  }));
};
