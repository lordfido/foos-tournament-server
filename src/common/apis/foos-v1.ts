// @ts-ignore
import fetch from 'node-fetch';
// import request from 'request';

import { V1_SEASONS } from '../../constants/v1-routes';
import { log } from '../utils/logger';

const v1Api = {
  getSeasons: (handler: (res: any) => any) => {
    log('get', V1_SEASONS);

    return fetch(V1_SEASONS)
      .then(res => res.text())
      .then(handler);
  },
};

export default v1Api;
