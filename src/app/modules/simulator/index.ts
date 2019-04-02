import { RequestHandler } from 'express';
import { JSDOM } from 'jsdom';
import { log } from '../../../common/utils/logger';

import v1Api from '../../../common/apis/foos-v1';

export const getSimulationDataHandler: RequestHandler = (req, res) => {
  const { matchId } = req.params;
  log('Param received', matchId);

  return v1Api.getSimulationData(matchId, v1Response => {
    const dom = new JSDOM(v1Response);
    const document = dom.window.document;

    const matchesNodes = document.querySelector('.col-md-12 table tbody');
    log(matchesNodes);

    return res.send(v1Response);
  });
};
