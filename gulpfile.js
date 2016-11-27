
/* eslint no-console: 0, arrow-body-style: 0 */
require('babel-core/register');

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const gulpIstanbul = require('gulp-istanbul');
const isparta = require('isparta');

gulp.task('lint_code', [], () => {
  return gulp.src(['src/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('lint_tests', [], () => {
  return gulp.src(['test/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('pre-test', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(gulpIstanbul({ instrumenter: isparta.Instrumenter, includeAllSources: true }))
    .pipe(gulpIstanbul.hookRequire());
});

gulp.task('test_server', () => {
  return gulp.src('test/**/*.test.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(gulpIstanbul.writeReports({ reporters: ['json', 'lcov'] }));
});

gulp.task('lint', ['lint_code', 'lint_tests']);

gulp.task('validate', ['lint', 'flow']);

gulp.task('test', (done) => {
  runSequence('pre-test', 'test_server', 'lint', done);
});
