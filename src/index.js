import 'clarify';
import express from 'express';
import path from 'path';
import middleware from './lib/middleware';
import render from './lib/render';
import routes from './routes';

const app = express();

app.set('trust proxy');
app.disable('etag');
middleware(app);

app.engine('js', render);
app.set('view engine', 'js');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.send(error.message);
  // res.render('error');
});

export default app;
