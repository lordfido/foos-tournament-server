import divisions from './data/divisions';
import matches from './data/matches';
import players from './data/players';
import divisionPlayers from './data/division-players';
import pendingMatches from './data/pending-matches';

export const getDivisionPendingMatches = (divisionIds: string[]) =>
  pendingMatches
    .filter(m => divisionIds.findIndex(d => d === m.division) >= 0)
    .map(m => {
      const division = divisions.find(d => d.id === m.division);
      const matchPlayers = [...m.matches[0].locals, ...m.matches[0].visitors];

      if (!division) {
        return undefined;
      }

      return {
        id: m.id,
        division: divisionIds.length <= 1 ? undefined : division.label,
        players: matchPlayers.map(p => {
          const player = players.find(pl => pl.id === p);

          if (!player) {
            return undefined;
          }

          return player.name;
        }),
      };
    });

export const getDivisionRecentMatches = (divisionIds: string[], showDuration: boolean = false) =>
  matches
    .filter(m => divisionIds.findIndex(d => d === m.division) >= 0)
    .map(m => {
      const division = divisions.find(d => d.id === m.division);
      const matchPlayers = [...m.matches[0].locals, ...m.matches[0].visitors];

      if (!division) {
        return undefined;
      }

      return {
        date: m.date,
        division: divisionIds.length <= 1 ? undefined : division.label,
        duration: showDuration ? m.duration : undefined,
        id: m.id,
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
    });

export const getDivisionRanking = (divisionIds: string[]) => {
  const rankings = divisions
    .filter(d => divisionIds.findIndex(dId => d.id === dId) >= 0)
    .map(d => {
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
    });

  // @ts-ignore
  return divisionIds.length <= 1 ? rankings[0].ranking : rankings;
};
