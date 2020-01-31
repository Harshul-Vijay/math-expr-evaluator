const chalk = require('chalk');
const del = require('del');
const gulp = require('gulp');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');

gulp.task('transpile', async () => {
  console.log(chalk.green('[i] Transpiling...'));
  const tsProject = ts.createProject('tsconfig.json');
  const result = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return result.js
    .pipe(sourcemaps.write('sourcemaps', {
      includeContent: false,
      sourceRoot: '../src'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', () => {
  console.log(chalk.green('[i] Minifying...'));
  return gulp.src('dist/*.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      noSource: true
    }))
  .pipe(gulp.dest('dist/min'));
});

gulp.task('watch', () => {
  console.log(chalk.blue('[i] Watching...'));
  gulp.watch('src/*.ts', gulp.series([
    'transpile',
    'minify'
  ]));
});

gulp.task('clean', () => {
  console.log(chalk.red('[i] Cleaning directory...'));
  return del(['dist'])
});

gulp.task('default', gulp.series(['transpile', 'minify', 'watch']));
