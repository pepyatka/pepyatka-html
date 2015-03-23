var gulp    = require('gulp'),
	sass    = require('gulp-sass'),
	concat  = require('gulp-concat'),
	prefix  = require('gulp-autoprefixer'),
	notify  = require('gulp-notify'),
	rename  = require('gulp-rename'),
	uglify  = require('gulp-uglify'),
	size    = require('gulp-size'),
	replace = require('gulp-replace'),
	handlebars = require('gulp-ember-handlebars'),
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

gulp.task('templates', function() {
	gulp.src(['./public/js/app/templates/**/*.handlebars'])
		.pipe(handlebars({
			outputType: 'browser',
			namespace: 'Ember.TEMPLATES'
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('./public/dist/'));
});

gulp.task('font-awesome', function () {
	gulp.src('bower_components/fontawesome/fonts/**.*')
		.pipe(gulp.dest('public/fonts'))
});
