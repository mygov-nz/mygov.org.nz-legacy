'use strict';

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');

gulp.task('default', ['css', 'js']);

/**
 *
 */
gulp.task('css', () => {
  return gulp.src('src/public/scss/style.scss')
    .pipe(sass({
      importer: (url, prev, done) => {
          if (url[0] === '~') {
              return done({ file: './node_modules/' + url.substr(1) });
          }

          done({ file: url });
      }
    }))
    .pipe(postcss([
      autoprefixer({ browsers: ['> 1%', 'ie >= 11'] }),
      cssnano()
    ]))
    .pipe(gulp.dest('build/s3/css'));
});

gulp.task('js', () => {
  return gulp.src('src/public/js/*.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/s3/js'));
});
