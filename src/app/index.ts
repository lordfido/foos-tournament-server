import { SEASONS } from '../constants/v2-routes';
import { getSeasons } from './modules/seasons';

interface IEndpoint {
  handler: (req: any, res: any) => Promise<any>;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
}

export const endpoints: IEndpoint[] = [
  {
    handler: getSeasons,
    method: 'get',
    path: SEASONS,
  },
];
