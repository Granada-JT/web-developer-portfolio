const gulp = require('gulp');
const replace = require('gulp-replace');
const dotenv = require('dotenv');

dotenv.config()

gulp.task('inject-env', () => {
  return gulp.src('index.html')
    .pipe(replace('G-WR44F2NEMR', process.env['GA_MEASUREMENT_ID']))
    .pipe(gulp.dest('.'));
});
