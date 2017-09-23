const gulp = require('gulp');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');

gulp.task('pug', () => {
  const pug = require('gulp-pug');
  gulp.src('src/templates/*.pug')
    .pipe(plumber())
    .pipe(pug({}))
    .pipe(gulp.dest('public'))
    .pipe(livereload())
  ;
});

gulp.task('sass', () => {
  const sass = require('gulp-sass');
  gulp.src('src/sass/*.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(livereload());
  ;
});

gulp.task('babel', () => {
  const babel = require('gulp-babel');
  const sourcemaps = require('gulp-sourcemaps');
  gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['env']}))
    .pipe(sourcemaps.write('../../'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(livereload())
  ;
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/templates/**/*.pug', ['pug']);
  gulp.watch('src/js/**/*.js', ['babel']);
});

