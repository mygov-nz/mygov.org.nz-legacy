import * as express from 'express';
import helmet from 'helmet';
// import RateLimit from 'express-rate-limit';

/**
 * @param {express.Application} app
 */
export default function middlware (app: express.Application): void {

  /**
   * Rate limit
   */

  /* app.use(new RateLimit({
    windowMs: 9e5, // 15 minutes
    max: 100,      // limit each IP to 100 requests per windowMs
    delayMs: 0     // disable delaying - full speed until the max limit is reached
  })); */

  /**
   * Helmet
   */

  app.use(helmet.contentSecurityPolicy({
    directives: {
      sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin'],
      connectSrc: ['\'self\''],
      defaultSrc: ['\'none\''],
      fontSrc: ['\'self\'', 'fonts.gstatic.com', 'data:'],
      imgSrc: ['\'self\'', 'www.google-analytics.com', 'stats.g.doubleclick.net', 'data:'],
      manifestSrc: ['\'self\''],
      scriptSrc: ['\'self\'', '\'unsafe-inline\'', 'google-analytics.com', 'stats.g.doubleclick.net'],
      styleSrc: ['\'self\'', '\'unsafe-inline\'', 'fonts.googleapis.com'],
      workerSrc: ['\'self\'']
    }
  }));

  app.use(helmet.hsts({
    maxAge: 31557600,
    includeSubDomains: true,
    preload: true
  }));

  app.use(helmet.frameguard({ action: 'deny' }));

  // app.use(helmet.hidePoweredBy({ setTo: 'Democracy' }));
  app.use(helmet.hidePoweredBy());

  app.use(helmet.noSniff());

  app.use(helmet.xssFilter());

}
