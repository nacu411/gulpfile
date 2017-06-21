var gulp = require('gulp'), //gulp
	sass = require('gulp-sass'), //sass
	watch = require('gulp-watch'), //watch
	concat = require('gulp-concat'), //concat
	rigger = require('gulp-rigger'), //rigger
	debug = require('gulp-debug'),
	imagemin = require('gulp-imagemin'), // imagemin
	sourcemaps = require('gulp-sourcemaps'), // sourcemaps
	browserSync = require('browser-sync'), //browsersync
	reload = browserSync.reload;
	autoprefixer = require('gulp-autoprefixer'); //autoprefixer

var path = {
    build: { 
        html: 'build/',
        js: 'build/scripts/',
        style: 'build/css/',
        media: 'build/media/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/scripts/main.js',
        style: 'src/css/main.scss',
        media: 'src/media/**/*.*', 
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/scripts/**/*.js',
        style: 'src/style/**/*.scss',
        media: 'src/media/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
};

var config = {
	server: {
		baseDir: 'build/'
	},
	host: 'localhost',
	port: 1337,
};

// TASKS

gulp.task('html:build', function() {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('scripts:build', function() {
	gulp.src(path.src.js)
	    .pipe(gulp.dest(path.build.js)) 
	    .pipe(reload({stream: true})); 
});

gulp.task('style:build', function() {
	gulp.src(path.src.style)
		.pipe(sass())
		.pipe(debug({title: 'src'}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(debug({title: 'scss'}))
		.pipe(gulp.dest(path.build.style))
		.pipe(reload({stream: true}));
});

gulp.task('media:build', function() {
   gulp.src(path.src.media)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.media)) 
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function(){
    watch([path.watch.html], function() {
        gulp.start('html:build');
    });
    watch([path.watch.js], function() {
        gulp.start('scripts:build');
    });
  	watch([path.watch.style], function() {
  	    gulp.start('style:build');
  	});
    watch([path.watch.media], function() {
        gulp.start('media:build');
    });
    watch([path.watch.fonts], function() {
        gulp.start('fonts:build');
    });
});

gulp.task('server', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['html:build', 'scripts:build', 'style:build', 'media:build', 'fonts:build']);