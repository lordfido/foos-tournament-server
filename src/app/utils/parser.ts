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

export const parseHistoriTable = (v1Response: string, linesToSkip = 1) => {
  if (!v1Response) {
    return undefined;
  }

  const dom = new JSDOM(v1Response);
  const document = dom.window.document;

  const rankingNode = document.querySelector('.classification-history-modal-content');
  const journeys = rankingNode
    ? Array.from(rankingNode.children)
        .slice(linesToSkip)
        .map(div => {
          const matches = Array.from(div.children[0].children[2].children[0].children)
            .slice(1)
            .map(tr => ({
              isSelected: tr.classList.contains('active') || undefined,
              player: tr.children[0].innerHTML,
              wins: tr.children[1].innerHTML,
            }));

          const prevRanking = Array.from(div.children[1].children[0].children[0].children).map(tr => {
            const pointsTd = tr.children[1].children[0] as HTMLElement;
            return {
              isSelected: tr.classList.contains('active') || undefined,
              player: tr.children[0].innerHTML,
              points: pointsTd.title,
            };
          });

          const nextRanking = Array.from(div.children[2].children[0].children[0].children).map(tr => {
            const pointsTd = tr.children[1].children[0] as HTMLElement;
            return {
              isSelected: tr.classList.contains('active') || undefined,
              player: tr.children[0].innerHTML,
              points: pointsTd.title,
            };
          });

          return { matches, prevRanking, nextRanking };
        })
    : undefined;

  return journeys;
};
