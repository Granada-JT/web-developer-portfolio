const gulp = require('gulp');
const replace = require('gulp-replace');
const dotenv = require('dotenv');

dotenv.config()

gulp.task('inject-env', () => {
	return gulp.src('index.html')
		.pipe(replace(/{{{(\w+)}}}/g, (match, p1) => process.env[p1] || match))
		.pipe(gulp.dest('.'));
});
