// @ts-ignore
import fetch from 'node-fetch';
// import request from 'request';

import {
  V1_DIVISION,
  V1_DIVISION_HISTORY,
  V1_DIVISION_PLAYER,
  V1_SEASON,
  V1_SEASON_SUMMARY,
  V1_SEASONS,
} from '../../constants/v1-routes';
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
  getDivisionHistoryHandler: (id: string, handler: (v1Response: any) => any) => {
    const url = V1_DIVISION_HISTORY.replace(':divisionId', id);

    log('get', url);
    return fetch(url)
      .then(res => res.text())
      .then(handler);
  },
  getPlayer: (division: string, playerId: string, handler: (v1Response: any) => any) => {
    const url = V1_DIVISION_PLAYER.replace(':divisionId', division).replace(':playerId', playerId);

    log('get', url);
    return fetch(url)
      .then(res => res.text())
      .then(handler);
  },
};

export default v1Api;
