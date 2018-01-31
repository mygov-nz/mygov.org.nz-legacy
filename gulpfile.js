const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const cssnano = require('cssnano');
const favicon = require('gulp-to-ico');
const fs = require('fs');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const rev = require('gulp-rev');
const revDel = require('gulp-rev-delete-original');
const sass = require('gulp-sass');
const sketch = require('gulp-sketch');
const ts = require('gulp-typescript');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');
const workbox = require('workbox-build');
const pkgLock = require('./package-lock.json');

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
  const tsProject = ts.createProject('tsconfig.json');

  return gulp.src([
      'src/*',
      'src/**/*',
      '!src/public/*',
      '!src/public/**/*'
    ], { base: 'src' })
    .pipe(tsProject())
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

gulp.task('rev', ['css', 'js-client'], () => {
  return gulp.src([
    'build/public/css/*.css',
    'build/public/js/*.js'
  ], { base: 'build/public' })
    .pipe(rev())
    .pipe(revDel())
    .pipe(gulp.dest('build/public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build'));
});

gulp.task('manifest', ['rev'], (callback) => {
  const revManifest = require('./build/rev-manifest.json');
  const manifest = `module.exports = ${JSON.stringify(revManifest)};`;

  fs.writeFile('build/rev-manifest.js', manifest, callback);
});

/**
 * Service Worker
 */
gulp.task('sw', ['rev', 'workbox'], (callback) => {
  const revManifest = require('./build/rev-manifest.json');
  const fileManifest = [];

  Object.keys(revManifest).map(key => {
    const url = revManifest[key];
    const match = revManifest[key].match(/-([0-9a-f]{10})\.[a-z]+$/);

    fileManifest.push({
      url,
      revision: match[1]
    });
  });

  const sw = `importScripts('workbox-sw.prod.v${pkgLock.dependencies['workbox-build'].version}.js');
  const workboxSW = new self.WorkboxSW({
    skipWaiting: true,
    clientsClaim: true
  });
  workboxSW.precache(${JSON.stringify(fileManifest)});
  `;

  fs.writeFile('build/sw.js', sw, callback);
});

gulp.task('workbox', ['manifest'], () => {
  return workbox.generateSW({
    globDirectory: __dirname + '/build/public',
    swDest: __dirname + '/build/public/sw.js',
    globPatterns: ['**\/*.{js,css}'],
    clientsClaim: true,
    skipWaiting: true
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
  'manifest',
  'rev',
  'sw'
]);
