'use strict';

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const sketch = require('gulp-sketch');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');
const workbox = require('workbox-build');

const debug = process.env.NODE_ENV !== 'production';

gulp.task('default', ['build']);
gulp.task('build', ['clean', 'copy', 'css', 'images', 'js', 'sw']);
gulp.task('js', ['js-client']);

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
    'src/public/.well-known/apple-app-site-association',
    'src/public/.well-known/assetlinks.json',
    'src/public/apple-app-site-association',
    'src/public/browserconfig.xml',
    'src/public/crossdomain.xml',
    'src/public/manifest.json',
    'src/public/robots.txt',
    'src/public/sitemap.xml'
  ], { base: 'src/public' })
    .pipe(gulp.dest('build/s3'));
});

/**
 * CSS
 */
gulp.task('css', ['clean'], () => {
  const plugins = [
    autoprefixer({ browsers: ['> 1%', 'ie >= 11'] })
  ];

  if (!debug) {
    plugins.push(cssnano({
      autoprefixer: false,
      discardComments: { removeAll: true }
    }));
  }

  return gulp.src('src/public/scss/style.scss')
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
  return gulp.src('src/public/images.sketch')
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
  return gulp.src('src/public/js/*.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/s3/js'));
});

/**
 * Service Worker
 */
gulp.task('sw', ['css', 'js'], () => {
   return workbox.generateSW({
     globDirectory: './build/s3/',
     swDest: './build/s3/sw.js',
     globPatterns: ['**\/*.{js,css}']
   })
   .then(() => {
     console.log('Service worker generated.');
   })
   .catch((err) => {
     console.log('[ERROR] This happened: ' + err);
   });
 })
