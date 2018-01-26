const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const cssnano = require('cssnano');
const favicon = require('gulp-to-ico');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const rev = require('gulp-rev');
const revDel = require('gulp-rev-delete-original');
const sass = require('gulp-sass');
const sketch = require('gulp-sketch');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');
const workbox = require('workbox-build');

/**
 * Copy
 */
gulp.task('copy', () => {
  return gulp.src([
    'src/public/.well-known/apple-app-site-association',
    'src/public/.well-known/assetlinks.json',
    'src/public/apple-app-site-association',
    'src/public/browserconfig.xml',
    'src/public/crossdomain.xml',
    'src/public/favicon.ico',
    'src/public/manifest.json',
    'src/public/robots.txt',
    'src/public/sitemap.xml'
  ], { base: 'src' })
    .pipe(gulp.dest('build'));
});

/**
 * CSS
 */
gulp.task('css', () => {
  const plugins = [
    autoprefixer({ browsers: ['last 2 versions', '> 1%', 'ie >= 11'] })
  ];

  if (process.env.NODE_ENV === 'production') {
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
    .pipe(gulp.dest('build/public/css'));
});

gulp.task('favicon', ['images'], () => {
  return gulp.src('build/public/images/favicon-*.png')
    .pipe(favicon('favicon.ico'))
    .pipe(gulp.dest('build/public'));
});

/**
 * Images
 */
gulp.task('images', () => {
  return gulp.src('src/public/images.sketch')
    .pipe(sketch({
      clean: true,
      compact: true,
      export: 'artboards'
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('build/public/images'));
});

/**
 * JS (Client)
 */
gulp.task('js-client', () => {
  return gulp.src('src/public/js/*.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/public/js'));
});

/**
 * JS (Server)
 */
gulp.task('js-server', () => {
  return gulp.src([
      'src/*',
      'src/**/*',
      '!src/public/*',
      '!src/public/**/*'
    ], { base: 'src' })
    .pipe(babel({
      presets: [
        ['env', {
          targets: {
            node: process.versions.node
          }
        }],
        'react'
      ]
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('rev', () => {
  return gulp.src([
    'build/public/css/style.css',
    'build/public/js/*.js'
  ], { base: 'build/public' })
    .pipe(rev())
    .pipe(revDel())
    .pipe(gulp.dest('build/public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build'));
});

/**
 * Service Worker
 */
gulp.task('sw', ['rev'], () => {
  return workbox.generateSW({
    globDirectory: __dirname + '/build/public',
    swDest: __dirname + '/build/public/sw.js',
    globPatterns: ['**\/*.{js,css}']
  })
  .then(() => console.log('Service worker generated.'))
  .catch(error => console.log(`[ERROR] ${error}`));
});

gulp.task('default', [
  'copy',
  'css',
  // 'favicon',
  'images',
  'js-client',
  'js-server',
  'sw'
]);
