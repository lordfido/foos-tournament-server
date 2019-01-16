import { JSDOM } from 'jsdom';
import { log } from '../../../common/utils/logger';

import v1Api from '../../../common/apis/foos-v1';
import { parseMatchDetailsButton } from './parser';

// @ts-ignore
export const getSeasonsHandler = (req, res) =>
  v1Api.getSeasons(v1Response => {
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

    return res.send(seasons);
  });

// @ts-ignore
export const getSeasonSummaryHandler = (req, res) => {
  const { seasonId } = req.params;
  log('Param received', seasonId);

  return v1Api.getSeasonSummary(seasonId, v1Response => {
    const dom = new JSDOM(v1Response);
    const document = dom.window.document;

    const matchesNodes = document.querySelector('.col-md-12 table tbody');
    const divisionsRankingNodes = Array.from(document.getElementsByClassName('col-md-3')).map(div => ({
      division: div.children[0].innerHTML,
      ranking: div.children[1].children[0].children,
    }));
    if (!matchesNodes || !divisionsRankingNodes) {
      return res.send(undefined);
    }

    const recentMatches = Array.from(matchesNodes.children)
      .slice(1)
      .map(tr => {
        const date = new Date(tr.children[0].innerHTML).getTime();
        const division = tr.children[1].innerHTML;
        const players = [
          {
            name: tr.children[2].innerHTML,
            wins: Number(tr.children[3].innerHTML),
          },
          {
            name: tr.children[4].innerHTML,
            wins: Number(tr.children[5].innerHTML),
          },
          {
            name: tr.children[6].innerHTML,
            wins: Number(tr.children[7].innerHTML),
          },
          {
            name: tr.children[8].innerHTML,
            wins: Number(tr.children[9].innerHTML),
          },
        ];

        const detailsBtn = tr.children[10].firstChild as HTMLElement;
        const matches = parseMatchDetailsButton(detailsBtn.dataset ? detailsBtn.dataset.content : undefined);

        return {
          date,
          division,
          matches,
          players,
        };
      });

    const divisionRankings = divisionsRankingNodes.map(division => ({
      division: division.division,
      ranking: Array.from(division.ranking)
        .slice(1)
        .map(tr => ({
          player: tr.children[1].innerHTML,
          points: Number(tr.children[2].children[0].innerHTML),
          position: Number(tr.children[0].innerHTML),
        })),
    }));

    return res.send({
      divisionRankings,
      recentMatches,
      seasonId,
    });
  });
};

// @ts-ignore
export const getSeasonHandler = (req, res) => {
  const { seasonId } = req.params;
  log('Param received', seasonId);

  return v1Api.getSeason(seasonId, v1Response => {
    const dom = new JSDOM(v1Response);
    const document = dom.window.document;

    const divisionsNodes = document.querySelector('ul.nav.nav-tabs');
    if (!divisionsNodes) {
      return res.send(undefined);
    }

    const divisions = Array.from(divisionsNodes.children)
      .slice(1)
      .map(li => {
        const child = li.firstChild as HTMLElement;

        if (child.dataset && child.dataset.divisionId) {
          return {
            id: child.dataset.divisionId,
            label: child.innerHTML,
          };
        }

        return undefined;
      })
      .filter(division => division);

    return res.send({ divisions });
  });
};
