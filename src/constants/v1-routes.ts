export const V1_HOST = 'http://suso.eu';
export const V1_PATH = `${V1_HOST}/foos`;

export const V1_SEASONS = `${V1_PATH}/`;
export const V1_SEASON = `${V1_PATH}/ajax/season/:seasonId`;
export const V1_SEASON_SUMMARY = `${V1_PATH}/ajax/summary/:seasonId`;

export const V1_DIVISION = `${V1_PATH}/ajax/division/:divisionId`;
export const V1_DIVISION_HISTORY = `${V1_PATH}/ajax/history/:divisionId`;
export const V1_DIVISION_PLAYER = `${V1_PATH}/ajax/player/:playerId/:divisionId`;

export const V1_MATCH_SIMULATOR = `${V1_PATH}/ajax/simulator/:matchId`;
export const V1_MATCH_SIMULATE = `${V1_PATH}/ajax/simulation/:matchId`;
