import { JSDOM } from 'jsdom';
import { log } from '../../common/utils/logger';

import v1Api from '../../common/apis/foos-v1';

// @ts-ignore
export const getSeasons = (req, res) =>
  v1Api.getSeasons(v1Response => {
    log('Server response', v1Response);

    const dom = new JSDOM(v1Response);
    const document = dom.window.document;

    const nodes = document.querySelector('#navbar ul.dropdown-menu');
    if (!nodes) {
      return res.send(undefined);
    }

    const seasons = Array.from(nodes.children)
      .map(li => {
        const child = li.firstChild as HTMLElement;

        if (child.dataset && child.dataset.seasonId) {
          return {
            id: child.dataset.seasonId,
            label: child.innerHTML,
          };
        }

        return undefined;
      })
      .filter(season => season);
    log('Seasons', seasons);

    return res.send(seasons);
  });
