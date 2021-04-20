'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var prettify = require('gulp-html-prettify'); // beautiful html
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var nib = require('nib');
var rupture = require('rupture');
var csscomb = require('gulp-csscomb'); // beautiful css
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); // js minification
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var runSequence = require('run-sequence');
var del = require('del');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var zip = require('gulp-zip');
var mainBowerFiles = require('main-bower-files');


var path = {
    dist: {
        all: 'dist/**/*',
        html: 'dist',
        css: 'dist/assets/styles',
        js: 'dist/assets/scripts',
        img: 'dist/assets/images',
        font: 'dist/assets/fonts',
        fontAwesome: 'dist/assets/fonts/FontAwesome'
    },
    src: {
        template: 'app/templates/*.pug',
        style: 'app/styles/*.styl',
        script: 'app/scripts/*.js',
        img: 'app/resources/images/**/*',
        font: 'app/resources/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}'
    },
    watch: {
        template: 'app/**/*.pug',
        style: 'app/**/*.styl',
        script: 'app/**/*.js',
        img: 'app/resources/images/**/*',
        font: 'app/resources/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}'
    },
    bower: {
        js: '**/*.js',
        css: '**/*.css',
        font: '**/*.{otf,eot,svg,ttf,woff,woff2}'
    },
    clean: './dist',
    root: './'
};


gulp.task('templates', function() {
    gulp.src(path.src.template)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(pug())
        .pipe(prettify())
        // .pipe(newer(path.dist.html))
        .pipe(gulp.dest(path.dist.html))
        .pipe(livereload())
});

gulp.task('styles', function() {
    gulp.src(path.src.style)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use:[
                nib(),
                rupture(),
                autoprefixer()
            ],
            'include css': true
        }))
        .pipe(csscomb())
        // .pipe(newer(path.dist.css))
        .pipe(gulp.dest(path.dist.css))
        .pipe(nano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(livereload())
});

gulp.task('scripts', function() {
    gulp.src([path.src.script, path.watch.script])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        // .pipe(newer(path.dist.js))
        .pipe(gulp.dest(path.dist.js))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('images', function() {
    gulp.src(path.src.img)
        .pipe(newer(path.dist.img))
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('fonts', function() {
    gulp.src(path.src.font)
        .pipe(newer(path.dist.font))
        .pipe(gulp.dest(path.dist.font))
});

gulp.task('mainJS', function() {
    gulp.src(mainBowerFiles(path.bower.js))
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('mainCSS', function() {
    gulp.src(mainBowerFiles(path.bower.css))
        .pipe(gulp.dest(path.dist.css))
});

gulp.task('mainFont', function() {
    gulp.src(mainBowerFiles(path.bower.font))
        .pipe(gulp.dest(path.dist.fontAwesome))
});

gulp.task('bower', function() {
    runSequence(['mainJS', 'mainCSS', 'mainFont']);
});

gulp.task('watch', function() {
    livereload.listen();
    watch(path.watch.template, function() {gulp.start('templates');});
    watch(path.watch.style, function() {gulp.start('styles');});
    watch(path.watch.script, function() {gulp.start('scripts');});
    watch(path.watch.img, function() {gulp.start('images');});
    watch(path.watch.font, function() {gulp.start('fonts');});
});

gulp.task('clean', function() {
    del(path.clean);
});

gulp.task('zip', function() {
    gulp.src(path.dist.all)
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest(path.root));
});

gulp.task('build', function() {
    runSequence(
        ['images', 'fonts'],
        ['styles', 'scripts', 'templates']
    );
});

gulp.task('default', ['build', 'watch']);