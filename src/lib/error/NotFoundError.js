export default class NotFoundError extends Error {
  title = 'Page not found';
  status = 404;
}
