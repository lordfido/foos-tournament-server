import { SEASON_DIVISIONS, SEASON_SUMMARY, SEASONS } from '../constants/v2-routes';
import { getSeasonHandler, getSeasonsHandler, getSeasonSummaryHandler } from './modules/seasons';

interface IEndpoint {
  handler: (req: any, res: any) => Promise<any>;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
}

export const endpoints: IEndpoint[] = [
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
];
