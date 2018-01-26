/**
 *
 */
export default class NotFoundError extends Error {

  title: string;

  status: number;

  /**
   * @param {string} message
   */
  constructor (message: string = 'Error') {
    super(message);

    this.title = 'Page not found';
    this.status = 404;
  }

}
