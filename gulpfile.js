var gulp           = require('gulp'),
gutil          = require('gulp-util' ),
sass           = require('gulp-sass'),
browserSync    = require('browser-sync'),
concat         = require('gulp-concat'),
uglify         = require('gulp-uglify'),
cleanCSS       = require('gulp-clean-css'),
rename         = require('gulp-rename'),
jade           = require('gulp-jade'),
cache          = require('gulp-cache'),
autoprefixer   = require('gulp-autoprefixer'),
bourbon        = require('node-bourbon'),
ftp            = require('vinyl-ftp'),
notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass',  function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({includePaths: [require('node-bourbon').includePaths, require('bourbon-neat').includePaths]}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});


gulp.task('watch', ['sass', 'browser-sync', 'jade'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/index.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/jade/*.jade', ['jade']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
});

gulp.task('jade', function() {
  return gulp.src('app/jade/*.jade')
    .pipe(jade({
    	pretty: true
    }).on("error", notify.onError()))
    //.pipe(obfuscate())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
