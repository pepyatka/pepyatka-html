var gulp    = require('gulp'),
	sass    = require('gulp-sass'),
	concat  = require('gulp-concat'),
	prefix  = require('gulp-autoprefixer'),
	notify  = require('gulp-notify'),
	rename  = require('gulp-rename'),
	uglify  = require('gulp-uglify'),
	size    = require('gulp-size'),
	replace = require('gulp-replace');

gulp.task('default', ['styles', 'scripts', 'font-awesome']);

gulp.task('watch', function () {
 gulp.watch('src/scss/**/*.scss', ['styles']);
});

gulp.task("styles", function(){

	gulp.src('src/scss/fresh/app.scss')
    .pipe(sass({outputStyle: 'compressed', precision: 10}))
       .on("error", notify.onError("<%= error.message %>"))
    .pipe(gulp.dest("public/css/themes/fresh"));

});

gulp.task('scripts', function () {
	var concatinated = size();
	var uglified = size();
	var gzipped = size({gzip: true});
	gulp.src([
		'bower_components/jquery/dist/jquery.js'
	])
		.pipe(concat('script.min.js'))
		.pipe(concatinated)
		.pipe(uglify())
		.on("error", notify.onError("<%= error.message %>"))
		.pipe(uglified)
		.pipe(gulp.dest('public/js'))
		.pipe(gzipped)
		.pipe(notify({
			onLast: true,
			title: "Scripts compiled",
			message: function () {
				return concatinated.prettySize + ' | ' + uglified.prettySize + ' | ' + gzipped.prettySize;
			}
		}));
});


gulp.task('font-awesome', function () {
	gulp.src('bower_components/fontawesome/fonts/**.*')
		.pipe(gulp.dest('public/fonts'))
});
