var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var templateCache =require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var RevAll = require('gulp-rev-all');
var minifyCss = require('gulp-minify-css');
var runSequence = require('gulp-run-sequence');

var app={
    module:'app',
    dist:'dist'
}
var src={
    js:['src/app/**/*.js','src/common/**/*.js'],
    jsTpl:[app.dist+"/template/*.js"],
    htmlTpl:['src/**/*.tpl.html','common/**/*.tpl.html'],
    css:['src/assets/css/app.css','src/assets/css/font.css'],
    font:['src/assets/fonts/**'],
    img:[,'src/assets/img/**'],
    l10n:['src/assets/l10n/**'],
    vendor:['vendor/**'],
    html:['src/index.html']
}

gulp.task('html2js',function(){
    return gulp.src(src.htmlTpl)
        .pipe(templateCache({
            filename:'template.js',
            module:app.module,
            transformUrl: function(url) {
                return url.replace(/\.tpl\.html$/, '.html')
            }
        }))
        .pipe(gulp.dest(app.dist+'/template'))
})
gulp.task('concat:js',['html2js'],function(){
    var jsPath=src.js.concat(src.jsTpl,src.js);
    return gulp.src(jsPath)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(app.dist+'/js'))
})
gulp.task('concat:css',function(){
    return gulp.src(src.css)
        .pipe(gulpif('*.css',concat('app.css')))
        .pipe(minifyCss())
        .pipe(gulp.dest(app.dist+'/css'))
})
gulp.task('copy:font',function(){
    return gulp.src(src.font)
        .pipe(gulp.dest(app.dist+'/fonts'))
})
gulp.task('copy:img',function(){
    return gulp.src(src.img)
        .pipe(gulp.dest(app.dist+'/img'))
})
gulp.task('copy:l10n',function(){
    return gulp.src(src.l10n)
        .pipe(gulp.dest(app.dist+'/l10n'))
})
gulp.task('concat:vendor',function(){
    return gulp.src(src.vendor)
        .pipe(gulp.dest(app.dist+'/vendor'))
})
gulp.task('copy:html',function(){
    return gulp.src(src.html)
        .pipe(rename('index.tmp.html'))
        .pipe(gulp.dest(app.dist))
})
gulp.task('clean',function(){
    return gulp.src(app.dist)
        .pipe(clean());
})
gulp.task('rev',function(){
    var revAll = new RevAll();
    return gulp.src(app.dist+'/index.tmp.html')
        .pipe(rename('index.html'))
        .pipe(useref())
        .pipe(gulp.dest(app.dist))
})
gulp.task('build', function(cb) {
    runSequence('clean',['concat:js','concat:css','copy:font','copy:img','copy:l10n','concat:vendor','copy:html'], cb);
});
gulp.task('default',function(cb) {
  // 将你的默认的任务代码放在这
    runSequence('build',['rev'],cb)
});