var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

var bootstrapSass = './bower_components/bootstrap-sass/';
var fonts = bootstrapSass + 'assets/fonts/**/*';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: [bootstrapSass + 'assets/stylesheets']
};

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
});

gulp.task('fonts', function () {
  return gulp
    .src(fonts)
    .pipe(gulp.dest('fonts'));
});

gulp.task('sass', ['fonts'], function() {
  return gulp.src('scss/*.scss')
    .pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(autoprefixer())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
});