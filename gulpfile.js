const { src, dest, series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default; 
const imagemin = require('gulp-imagemin');

function cssMinify() {
    return src('style.css')
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(dest('dist/css'));
}

function jsMinify() {
    return src('script.js')
        .pipe(uglify())
        .pipe(dest('dist/js')); 
}

function imageOptimize() {
    return src('images/**/*.{avif,jpg,png}') 
        .pipe(imagemin([
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
        ]))
        .pipe(dest('dist/images'));
}

exports.build = series(cssMinify, jsMinify, imageOptimize);

exports.default = exports.build;