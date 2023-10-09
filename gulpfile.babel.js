import { src, dest, series } from 'gulp';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import gulpInject from 'gulp-inject';
import streamSeries from 'stream-series';

function javascript() {
    return src('./src/js/*.js')
        .pipe(gulpUglify())
        .pipe(gulpRename({ extname: '.min.js' }))
        .pipe(dest('./dist/js'));
}

function css() {
    return src('./src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        // autoprefixer ???
        .pipe(gulpRename({ extname: '.min.css' }))
        .pipe(dest('./dist/css'));
}

function jsDependiencies() {
    return src([
        './node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js',
        './node_modules/@fortawesome/fontawesome-free/js/solid.min.js',
        './node_modules/@fortawesome/fontawesome-free/js/brands.min.js',
        './node_modules/jquery/dist/jquery.slim.min.js'
    ]).pipe(dest('./dist/js'));
}

function files() {
    const sourcesCss = src(['./dist/css/*.css'], {read: false});
    const sourcesJquery = src(['./dist/js/jquery.slim.min.js'], {read: false});
    const sourcesFontAwesome = src([
        './dist/js/solid.min.js',
        './dist/js/brands.min.js',
        './dist/js/fontawesome.min.js'
    ], {read: false});
    const sourcesBase = src(['./dist/js/scripts.min.js'], {read: false});
    return src('src/*.html')
        .pipe(gulpInject(streamSeries(sourcesCss, sourcesJquery, sourcesFontAwesome, sourcesBase), {
            ignorePath: 'dist',
            addRootSlash: false
        }))
        .pipe(dest('dist/'))
}

exports.default = series(css, javascript, jsDependiencies, files)