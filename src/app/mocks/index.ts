import seasons from './data/seasons';
import divisions from './data/divisions';
import { getDivisionRecentMatches, getDivisionRanking, getDivisionPendingMatches } from './utils';

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
    divisionRankings: getDivisionRanking(seasonDivisions.map(d => d.id)),
    recentMatches: getDivisionRecentMatches(seasonDivisions.map(d => d.id)),
  });
};

// @ts-ignore
const getSeasonHandler = (req, res) => {
  const { seasonId } = req.params;

  const seasonDivisions = divisions
    .filter(d => d.season === seasonId)
    .map(d => ({
      id: d.id,
      label: d.label,
    }));

  return res.send(seasonDivisions);
};

// @ts-ignore
const getDivisionHandler = (req, res) => {
  const { divisionId } = req.params;

  const division = divisions.find(d => d.id === divisionId);

  if (!division) {
    return res.send();
  }

  return res.send({
    pendingMatches: getDivisionPendingMatches([division.id]),
    playedMatches: getDivisionRecentMatches([division.id], true),
    ranking: getDivisionRanking([division.id]),
  });
};

const mocks = {
  getSeasonsHandler,
  getSeasonSummaryHandler,
  getSeasonHandler,

  getDivisionHandler,
};

export default mocks;
