import { RequestHandler } from 'express';
import divisions from './data/divisions';
import seasons from './data/seasons';
import { getDivisionPendingMatches, getDivisionRanking, getDivisionRecentMatches } from './utils';

const getSeasonsHandler: RequestHandler = (req, res) => res.send(seasons);

const getSeasonSummaryHandler: RequestHandler = (req, res) => {
  const { seasonId } = req.params;

  const season = seasons.find(s => s.id === seasonId);
  if (!season) {
    return res.send({});
  }

  const seasonDivisions = divisions.filter(d => d.season === season.id);

  return res.send({
    divisionRankings: getDivisionRanking(seasonDivisions.map(d => d.id)),
    recentMatches: getDivisionRecentMatches(seasonDivisions.map(d => d.id)),
    seasonId: season.id,
  });
};

const getSeasonHandler: RequestHandler = (req, res) => {
  const { seasonId } = req.params;

  const seasonDivisions = divisions
    .filter(d => d.season === seasonId)
    .map(d => ({
      id: d.id,
      label: d.label,
    }));

  return res.send(seasonDivisions);
};

const getDivisionHandler: RequestHandler = (req, res) => {
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
  getSeasonHandler,
  getSeasonSummaryHandler,
  getSeasonsHandler,

  getDivisionHandler,
};

export default mocks;
