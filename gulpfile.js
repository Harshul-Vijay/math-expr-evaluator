const chalk = require('chalk');
const del = require('del');
const exec = require('child_process').exec;
const fs = require('fs');
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
    .pipe(gulp.dest('out'));
});

/* gulp.task('build:rust', (cb) => {
  exec('cargo build', (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  });
  cb();
}) */

gulp.task('build:c++', async (cb) => {
  const commands = await fs.readFileSync('cpp.bat').toString().split(/\n\r/);
  await commands.map(async (command, line) => {
    await exec(`${command}`, (err, stdout, stderr) => {
      // console.log(err);
      // console.log(stdout);
      console.log(chalk.redBright(stderr));
    });
  });
  cb();
})

gulp.task('minify', () => {
  console.log(chalk.green('[i] Minifying...'));
  return gulp.src('out/*.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      noSource: true
    }))
  .pipe(gulp.dest('out/min'));
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
  return del(['out'])
});

gulp.task('default', gulp.series(['transpile', 'minify']));
