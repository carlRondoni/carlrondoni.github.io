import { src, dest, series } from 'gulp';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import gulpInject from 'gulp-inject';

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

function files() {
    const sources = src(['./dist/css/*.css', './dist/js/*.js'], {read: false});
    return src('src/*.html')
        .pipe(gulpInject(sources, {
            ignorePath: 'dist',
            addRootSlash: false
        }))
        .pipe(dest('dist/'))
}

function fontAwesome() {
    return src([
        './node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js',
        './node_modules/@fortawesome/fontawesome-free/js/solid.min.js',
        './node_modules/@fortawesome/fontawesome-free/js/brands.min.js'
    ]).pipe(dest('./dist/js'));
}

exports.default = series(css, javascript, fontAwesome, files)