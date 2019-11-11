
/**
 * TimerService class
 */
export default class TimerService {
  /**
   * TimerService constructor
   *
   */
  constructor() {
    this.timers = {};
  }

  /**
   * Start timer
   * @param identifier
   */
  start(identifier: string) {
    this.timers[identifier] = new Date().getTime();
  }

  /**
   * Stop timer
   * @param identifier
   */
  stop(identifier: string) {
    if (typeof this.timers[identifier] !== 'undefined') {
      const duration = new Date().getTime() - this.timers[identifier];

      console.info(`Timing - ${identifier} took ${duration}ms to complete`);
    }
  }
}
