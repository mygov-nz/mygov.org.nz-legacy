'use strict';

const AWS = require('aws-sdk');
const autoprefixer = require('autoprefixer');
const awspublish = require('gulp-awspublish');
const cssnano = require('cssnano');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const serverlessGulp = require('serverless-gulp');
const sketch = require('gulp-sketch');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackConfigServerless = require('./webpack.config.serverless.js');
const webpackStream = require('webpack-stream');
const workbox = require('workbox-build');

const debug = process.env.NODE_ENV !== 'production';

gulp.task('default', ['build']);
gulp.task('build', ['copy', 'css', 'images', 'js-client', 'js-serverless', 'serverless-yml', 'sw']);
gulp.task('deploy', ['s3', 'serverless']);

/**
 * Clean
 */
 gulp.task('clean', () => {
   return gulp.src([
       'build/*',
       'build/**/*',
       'build/.*/*',
       'build/.*/**/*'
     ], { read: false })
     .pipe(rm());
 });

/**
 * Copy
 */
gulp.task('copy', ['clean'], () => {
  return gulp.src([
    'public/.well-known/apple-app-site-association',
    'public/.well-known/assetlinks.json',
    'public/apple-app-site-association',
    'public/browserconfig.xml',
    'public/crossdomain.xml',
    'public/manifest.json',
    'public/robots.txt',
    'public/sitemap.xml'
  ], { base: 'public' })
    .pipe(gulp.dest('build/s3'));
});

/**
 * CSS
 */
gulp.task('css', ['clean'], () => {
  const plugins = [
    autoprefixer({ browsers: ['last 2 versions', '> 1%', 'ie >= 11'] })
  ];

  if (!debug) {
    plugins.push(cssnano({
      autoprefixer: false,
      discardComments: { removeAll: true }
    }));
  }

  return gulp.src('public/scss/style.scss')
    .pipe(sass({
      importer: (url, prev, done) => {
          if (url[0] !== '~') {
            return done({ file: url });
          }

          done({ file: `./node_modules/${url.slice(1)}` });
      }
    }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build/s3/css'));
});

/**
 * Images
 */
gulp.task('images', ['clean'], () => {
  return gulp.src('public/images.sketch')
    .pipe(sketch({
      clean: true,
      compact: true,
      export: 'artboards'
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('build/s3/images'));
});

/**
 * Client JS
 */
gulp.task('js-client', ['clean'], () => {
  return gulp.src('public/js/*.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/s3/js'));
});

/**
 * Serverless JS
 */
gulp.task('js-serverless', ['clean'], () => {
  return gulp.src('handlers/*.js')
    .pipe(webpackStream(webpackConfigServerless, webpack))
    .pipe(gulp.dest('build/lambda'));
});

gulp.task('serverless-yml', ['clean'], () => {
  return gulp.src([
    'serverless.yml'
  ])
    .pipe(gulp.dest('build/lambda'));
});

/**
 * Service Worker
 */
gulp.task('sw', ['css', 'js-client'], () => {
  return workbox.generateSW({
    globDirectory: __dirname + '/build/s3/',
    swDest: __dirname + '/build/s3/sw.js',
    globPatterns: ['**\/*.{js,css}']
  })
  .then(() => {
    console.log('Service worker generated.');
  })
  .catch(error => {
    console.log(`[ERROR] ${error}`);
  });
})

/**
 * Upload to S3
 */
gulp.task('s3', ['copy', 'css', 'images', 'js-client', 'sw', 'serverless'], () => {
  const publisher = awspublish.create({
    region: 'us-east-1',
    credentials: new AWS.SharedIniFileCredentials({ profile: 'mygov' }),
    params: {
      Bucket: debug ? 'mygov-dev-website' : 'mygov-website'
    }
  });

  return gulp.src([
      'build/s3/*',
      'build/s3/**/*',
      'build/s3/.*/*',
      'build/s3/.*/**/*'
    ], { base: 'build/s3' })
    .pipe(awspublish.gzip({ ext: '.gz' }))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});

/**
 * Serverless deploy
 */
gulp.task('serverless', ['js-serverless', 'serverless-yml'], () => {
  return gulp.src([
    'build/lambda/serverless.yml'
  ], { read: false })
    .pipe(serverlessGulp.exec('deploy', { stage: debug ? 'dev' : 'prod' }));
});
