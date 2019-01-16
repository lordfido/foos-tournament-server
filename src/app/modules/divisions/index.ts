import { JSDOM } from 'jsdom';
import { log } from '../../../common/utils/logger';

import v1Api from '../../../common/apis/foos-v1';
import { parseMatchDetailsButton } from '../seasons/parser';

// @ts-ignore
export const getDivisionHandler = (req, res) => {
  const { divisionId } = req.params;
  log('Param received', divisionId);

  return v1Api.getDivision(divisionId, v1Response => {
    const dom = new JSDOM(v1Response);
    const document = dom.window.document;

    const rankingNode = document.querySelector('.tab2-content-classification table');
    const pendingMatchesNode = document.querySelector('.tab2-content-matches div:first-child table');
    const playedMatchesNode = document.querySelector('.tab2-content-matches div:last-child table');

    const ranking = rankingNode
      ? Array.from(rankingNode.children[0].children)
          .slice(1)
          .map(tr => {
            const playerLink = tr.children[1].children[0] as HTMLElement;
            const playerPoints = tr.children[2].children[0] as HTMLElement;

            return {
              label: playerLink.innerHTML,
              matches: Number(tr.children[4].innerHTML),
              player: Number(playerLink.dataset.playerId),
              points: Number(playerPoints.title),
              position: Number(tr.children[0].innerHTML),
              rivals: Number(tr.children[3].innerHTML),
            };
          })
      : undefined;

    const pendingMatches = pendingMatchesNode
      ? Array.from(pendingMatchesNode.children[0].children).map(tr => {
          const predictButton = tr.children[4].children[0] as HTMLElement;
          return {
            id: Number(predictButton.dataset.matchId),
            players: [
              tr.children[0].innerHTML,
              tr.children[1].innerHTML,
              tr.children[2].innerHTML,
              tr.children[3].innerHTML,
            ],
          };
        })
      : undefined;

    const playedMatches = playedMatchesNode
      ? Array.from(playedMatchesNode.children[0].children)
          .slice(1)
          .map(tr => {
            const detailsButton = tr.children[9].children[0] as HTMLElement;
            const predictButton = tr.children[10].children[0] as HTMLElement;

            return {
              date: new Date(tr.children[0].innerHTML).getTime(),
              duration: tr.children[11].innerHTML,
              id: Number(predictButton.dataset.matchId),
              matches: parseMatchDetailsButton(detailsButton.dataset.content),
              players: [
                {
                  name: tr.children[1].innerHTML,
                  wins: Number(tr.children[2].innerHTML),
                },
                {
                  name: tr.children[3].innerHTML,
                  wins: Number(tr.children[4].innerHTML),
                },
                {
                  name: tr.children[5].innerHTML,
                  wins: Number(tr.children[6].innerHTML),
                },
                {
                  name: tr.children[7].innerHTML,
                  wins: Number(tr.children[8].innerHTML),
                },
              ],
            };
          })
      : undefined;

    return res.send({
      pendingMatches,
      playedMatches,
      ranking,
    });
  });
};
