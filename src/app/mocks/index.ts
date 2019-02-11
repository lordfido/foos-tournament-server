import seasons from './seasons';
import divisions from './divisions';
import players from './players';
import matches from './matches';
import divisionPlayers from './division-players';

// @ts-ignore
const getSeasonsHandler = (req, res) => res.send(seasons);

// @ts-ignore
const getSeasonSummaryHandler = (req, res) => {
  const { seasonId } = req.params;

  const season = seasons.find(s => s.id === seasonId);
  if (!season) {
    return res.send({});
  }

  const seasonDivisions = divisions.filter(d => d.season === season.id);

  return res.send({
    seasonId: season.id,
    divisionRankings: seasonDivisions.map(d => {
      const dPlayers = divisionPlayers.find(di => di.division === d.id);

      if (!dPlayers) {
        return undefined;
      }

      return {
        division: d.label,
        ranking: dPlayers.players.map((p, idx) => {
          const player = players.find(pl => pl.id === p);

          if (!player) {
            return undefined;
          }

          return {
            player: player.name,
            position: idx + 1,
            points: 150,
          };
        }),
      };
    }),
    recentMatches: matches
      .filter(m => seasonDivisions.findIndex(d => d.id === m.division) >= 0)
      .map(m => {
        const division = divisions.find(d => d.id === m.division);
        const matchPlayers = [...m.matches[0].locals, ...m.matches[0].visitors];

        if (!division) {
          return undefined;
        }

        return {
          date: m.date,
          division: division.label,
          matches: m.matches.map(ma => {
            const getPlayerName = (p: string) => {
              const player = players.find(pl => pl.id === p);

              if (!player) {
                return undefined;
              }

              return player.name;
            };

            const locals = ma.locals.map(getPlayerName);
            const visitors = ma.visitors.map(getPlayerName);

            return {
              locals: `${locals[0]} + ${locals[1]}`,
              result: `${ma.result[0]}-${ma.result[1]}`,
              visitors: `${visitors[0]} + ${visitors[1]}`,
            };
          }),
          players: matchPlayers.map(p => {
            const player = players.find(pl => pl.id === p);
            const wins = m.matches.filter(
              ma =>
                (ma.locals.findIndex(pla => pla === p) >= 0 && ma.result[0] > ma.result[1]) ||
                (ma.visitors.findIndex(pla => pla === p) >= 0 && ma.result[0] < ma.result[1])
            );

            if (!player) {
              return undefined;
            }

            return {
              name: player.name,
              wins: wins.length,
            };
          }),
        };
      }),
  });
};

const mocks = {
  getSeasonsHandler,
  getSeasonSummaryHandler,
};

export default mocks;
