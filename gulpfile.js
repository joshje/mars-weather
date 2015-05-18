var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');

gulp.task('css', function () {
  return gulp.src('public/css/main.scss')
    .pipe(sass({ includePaths: [bourbon.includePaths] }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['css']);
