var gulp    = require('gulp'),
	sass    = require('gulp-sass'),
	concat  = require('gulp-concat'),
	prefix  = require('gulp-autoprefixer'),
	notify  = require('gulp-notify'),
	rename  = require('gulp-rename'),
	uglify  = require('gulp-uglify'),
	size    = require('gulp-size'),
	replace = require('gulp-replace'),
	rjs = require('gulp-requirejs');

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

gulp.task('rjs', function() {
	rjs({
		baseUrl: './public/js/main.js',
		//baseUrl: './build.js',
		out: 'bundle.js',
		shim: {
			// standard require.js shim options
		}
		// ... more require.js options
	})
		.pipe(gulp.dest('./public/dist/')); // pipe it to the output DIR
});


gulp.task('font-awesome', function () {
	gulp.src('bower_components/fontawesome/fonts/**.*')
		.pipe(gulp.dest('public/fonts'))
});
