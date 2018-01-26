import 'clarify';
import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import middleware from './lib/middleware';
import render from './lib/render';
import NotFoundError from './lib/error/NotFoundError';
import routes from './routes';

const app: Express = express();

app.enable('trust proxy');
app.disable('etag');
middleware(app);

app.engine('js', render);
app.set('view engine', 'js');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError('Page not Found'));
});

// error handler
app.use((error: NotFoundError, req: Request, res: Response, _next: NextFunction): void => {
  res.status(error.status || 500);
  res.render('ErrorPage', {
    layout: {
      title: `${error.title || 'Server error'} - MyGov`,
      description: error.message
    },
    props: {
      error: process.env.NODE_ENV === 'production' ? {} : error,
      message: error.message,
      req
    }
  });
});

export default app;
