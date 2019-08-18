const gulp = require('gulp');
const minify = require('gulp-uglify-es').default;

gulp.task('default', () =>
  gulp.src(['rules/*.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
);
