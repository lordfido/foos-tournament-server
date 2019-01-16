// @ts-ignore
import fetch from 'node-fetch';
// import request from 'request';

import { V1_SEASON, V1_SEASON_SUMMARY, V1_SEASONS, V1_DIVISION } from '../../constants/v1-routes';
import { log } from '../utils/logger';

const v1Api = {
  // Seasons
  getSeason: (id: string, handler: (v1Response: any) => any) => {
    const url = V1_SEASON.replace(':seasonId', id);

    log('get', url);
    return fetch(url)
      .then(res => res.text())
      .then(handler);
  },
  getSeasonSummary: (id: string, handler: (v1Response: any) => any) => {
    const url = V1_SEASON_SUMMARY.replace(':seasonId', id);

    log('get', url);
    return fetch(url)
      .then(res => res.text())
      .then(handler);
  },
  getSeasons: (handler: (v1Response: any) => any) => {
    const url = V1_SEASONS;

    log('get', url);
    return fetch(url)
      .then(res => res.text())
      .then(handler);
  },

  // Divisions
  getDivision: (id: string, handler: (v1Response: any) => any) => {
    const url = V1_DIVISION.replace(':divisionId', id);

    log('get', url);
    return fetch(url)
      .then(res => res.text())
      .then(handler);
  },
};

export default v1Api;
