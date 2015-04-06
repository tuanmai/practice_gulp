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
    prefix        = require("gulp-autoprefixer");


// ----------------------------------------------------------------

var dest_js     = "dist/js"
var dest_css    = "dist/css"
var src_js      = "src/js/**/*.js"
var src_sass    = "src/sass/**/*.scss"


// ----------------------------------------------------------------

// SASS to CSS
gulp.task('sass', function() {
  gulp.src(src_sass)
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest(dest_css))
      .pipe(minify_css())
      .pipe(gulp.dest(dest_css))
});

// ----------------------------------------------------------------
// Compile JS
gulp.task('js', function() {
  gulp.src(src_js)
      .pipe(plumber())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest(dest_js))
});

// ----------------------------------------------------------------

// Watch

gulp.task('watch', function() {
  gulp.watch(src_js, ['js']);
  gulp.watch(src_sass, ['sass'])
});
