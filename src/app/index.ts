import {
  DIVISION,
  DIVISION_HISTORY,
  DIVISION_PLAYER,
  SEASON_DIVISIONS,
  SEASON_SUMMARY,
  SEASONS,
} from '../constants/v2-routes';

import { getDivisionHandler, getDivisionHistoryHandler, getPlayerHandler } from './modules/divisions';
import { getSeasonHandler, getSeasonsHandler, getSeasonSummaryHandler } from './modules/seasons';

interface IEndpoint {
  handler: (req: any, res: any) => Promise<any>;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
}

export const endpoints: IEndpoint[] = [
  // Seasons
  {
    handler: getSeasonsHandler,
    method: 'get',
    path: SEASONS,
  },
  {
    handler: getSeasonSummaryHandler,
    method: 'get',
    path: SEASON_SUMMARY,
  },
  {
    handler: getSeasonHandler,
    method: 'get',
    path: SEASON_DIVISIONS,
  },

  // Divisions
  {
    handler: getDivisionHandler,
    method: 'get',
    path: DIVISION,
  },
  {
    handler: getDivisionHistoryHandler,
    method: 'get',
    path: DIVISION_HISTORY,
  },
  {
    handler: getPlayerHandler,
    method: 'get',
    path: DIVISION_PLAYER,
  },
];
