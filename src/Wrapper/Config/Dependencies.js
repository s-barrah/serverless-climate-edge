import TimerService from '../Service/Timer.service';
import RequestService from '../Service/Request.service';


export const DEFINITIONS = {
  REQUEST: 'REQUEST',
  TIMER: 'TIMER',
};

export const DEPENDENCIES = {
  [DEFINITIONS.REQUEST]: RequestService,
  [DEFINITIONS.TIMER]: TimerService,
};

export default {
  DEFINITIONS,
  DEPENDENCIES,
};

