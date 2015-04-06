var gulp          = require("gulp"),
    sass          = require("gulp-sass"),
    concat        = require("gulp-concat"),
    watch         = require("gulp-watch"),
    plumber       = require("gulp-plumber"),
    minify_css    = require("gulp-minify-css"),
    uglify        = require("gulp-uglify"),
    sourcemaps    = require("gulp-sourcemaps"),
    imagemin      = require("gulp-imagemin"),
    notify        = require("gulp-notify"),
    pngquant      = require("imagemin-pngquant"),
    prefix        = require("gulp-autoprefixer"),
    jshint        = require("gulp-jshint"),
    browserSync   = require("browser-sync");


// ----------------------------------------------------------------
var dest = {
  js: "dist/js",
  css: "dist/css",
  img: "dist/img",
  min_css: "app.css.min",
  min_js: "app.js.min",
}

var src = {
  js: "src/js/**/*.js",
  sass: "src/sass/**/*.scss",
  img: "src/img/*",
}

var onError = function(err) {
  console.log(err);
  this.emit('end');
}


// ----------------------------------------------------------------

// SASS to CSS
gulp.task('sass', function() {
  return gulp.src(src.sass)
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(sass())
      .pipe(concat(dest.min_css))
      .pipe(prefix('last 2 versions'))
      .pipe(gulp.dest(dest.css))
      .pipe(minify_css())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest.css));
      // .pipe(notify({ message: 'Hello world, we are done!' }))
});

// ----------------------------------------------------------------

// Compile JS
gulp.task('js', function() {
  return gulp.src(src.js)
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(uglify())
      .pipe(concat(dest.min_js))
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest.js));
});
// ----------------------------------------------------------------

// Images
gulp.task('img', function() {
  return gulp.src(src.img)
      .pipe(gulp.dest(dest.img));
});

// ----------------------------------------------------------------

// Watch

gulp.task('watch', function() {
  gulp.watch(src.js, ['js']);
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.img, ['img']);
});

// ----------------------------------------------------------------

// Default

gulp.task('default', ['watch', 'sass', 'js', 'img']);
