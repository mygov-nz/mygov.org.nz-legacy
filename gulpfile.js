'use strict';

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

gulp.task('default', ['css']);

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
