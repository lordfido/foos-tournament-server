import { RequestHandler } from 'express';
import {
  DIVISION,
  DIVISION_HISTORY,
  DIVISION_PLAYER,
  MATCH_SIMULATOR,
  SEASON_DIVISIONS,
  SEASON_SUMMARY,
  SEASONS,
} from '../constants/v2-routes';

import mocks from './mocks';

import { getDivisionHandler, getDivisionHistoryHandler, getPlayerHandler } from './modules/divisions';
import { getSeasonHandler, getSeasonsHandler, getSeasonSummaryHandler } from './modules/seasons';
import { getSimulationDataHandler } from './modules/simulator';

import { useMocks } from '../constants/config';

interface IEndpoint {
  handler: RequestHandler;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
}

export const endpoints: IEndpoint[] = [
  // Seasons
  {
    handler: useMocks ? mocks.getSeasonsHandler : getSeasonsHandler,
    method: 'get',
    path: SEASONS,
  },
  {
    handler: useMocks ? mocks.getSeasonSummaryHandler : getSeasonSummaryHandler,
    method: 'get',
    path: SEASON_SUMMARY,
  },
  {
    handler: useMocks ? mocks.getSeasonHandler : getSeasonHandler,
    method: 'get',
    path: SEASON_DIVISIONS,
  },

  // Divisions
  {
    handler: useMocks ? mocks.getDivisionHandler : getDivisionHandler,
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

  // Simulator
  {
    handler: getSimulationDataHandler,
    method: 'get',
    path: MATCH_SIMULATOR,
  },
];
