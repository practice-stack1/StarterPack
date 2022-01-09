let source_folder = 'src';
// let project_folder = 'E:/OpenServer/domains/localhost/test';
let project_folder = 'dist';

let fs = require('fs');

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        icon: project_folder + '/icons/',
        fonts: project_folder + '/fonts/',
        php: project_folder + '/',
        phpbasic: project_folder + '/phpmailer/',
        db: project_folder + '/',
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/scss/style.scss',
        js: source_folder + '/js/main.js',
        img: source_folder + '/img/**/*.{png,jpg,svg,gif,ico,webp}',
        icon: source_folder + '/icons/**/*.{png,jpg,svg,gif,ico,webp}',
        fonts: source_folder + '/fonts/*.{ttf,woff,woff2}',
        php: source_folder + '/sendmail.php',
        phpbasic: source_folder + '/phpmailer/**',
        db: source_folder + '/*.json',
    },

    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{png,jpg,svg,gif,ico,webp}',
        icon: source_folder + '/icons/**/*.{png,jpg,svg,gif,ico,webp}',
        db: source_folder + '/*.json',
    },

    clean: './' + project_folder + '/'
}


let { src, dest } = require('gulp'),
webpack = require("webpack-stream"),
gulp = require('gulp'),
browsersync = require('browser-sync').create(),
fileinclude = require('gulp-file-include'),
del = require('del'),
scss = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
group_media = require('gulp-group-css-media-queries'),
clean_css = require('gulp-clean-css'),
rename = require('gulp-rename'),
imagemin = require('gulp-imagemin'),
webp = require('gulp-webp'),
webphtml = require('gulp-webp-html'),
webpcss = require('gulp-webpcss'),
ttf2woff = require('gulp-ttf2woff'),
ttf2woff2 = require('gulp-ttf2woff2'),
htmlmin = require('gulp-htmlmin'),
cache = require('gulp-cache');


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 4200,
        notify: false
    });
}


function html_project() {
   return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.reload({stream: true}));
}
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.reload({stream: true}));
}

function css_project() {
    return src(path.src.css)
    .pipe(
        scss({
            outputStyle: 'compressed'
        }).on('error', scss.logError)
    )
    .pipe(
        group_media()
    )
    .pipe(
        autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 5 versions', '>1%', 'ie 8', 'ie 7'],
            cascade: true
        }))
    .pipe(webpcss())
    .pipe(clean_css())
    .pipe(
        rename({
            extname: '.min.css'
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.reload({stream: true}));
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            }).on('error', scss.logError)
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ['last 5 versions', '>1%', 'ie 8', 'ie 7'],
                cascade: true
            }))
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(browsersync.reload({stream: true}));
}

function js() {
    return gulp.src(path.src.js)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.reload({stream: true}));
}

function js_project() {
    return gulp.src(path.src.js)
                .pipe(webpack(require('./webpack.config.js')))
                .pipe(gulp.dest(path.build.js));
}


function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70,
                method: 3,
                autoFilter: true,
                lossless: true
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(cache(imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                interlaced: true,
                optimizationLevel: 3
            })))
        .pipe(dest(path.build.img))
        .pipe(browsersync.reload({stream: true}))
}

gulp.task('clearCache', function() {
    return cache.clearAll();
});



function icons() {
    return gulp.src(path.src.icon)
        .pipe(dest(path.build.icon));
}

function iconsFonts() {
    return gulp.src('src/fonts/*.svg')
        .pipe(dest(path.build.fonts));
}



function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}



function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/scss/basic/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/basic/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (let i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/basic/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {

}

function watchFile() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.css, css);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, images);
    gulp.watch(path.watch.icon, icons);
}


function clean(params) {
    return del(path.clean);
}


function php_mailer(){
    gulp.src(path.src.php)
     .pipe(dest(path.build.php));
    return gulp.src(path.src.phpbasic)
     .pipe(dest(path.build.phpbasic));
}

function db(){
    return gulp.src(path.src.db)
            .pipe(dest(path.build.db));
}


let dev = gulp.series(clean, gulp.parallel(html, css, images, fonts, icons, iconsFonts, php_mailer, db), js, fontsStyle);
let project = gulp.series(clean, gulp.parallel(html_project, css_project, images, fonts, icons, iconsFonts, php_mailer, db), js_project, fontsStyle);

gulp.task('default', gulp.parallel(dev, watchFile, browserSync));
gulp.task('prod', gulp.parallel(project, browserSync));


exports.html_project = html_project;
exports.iconsFonts = iconsFonts;
exports.css_project = css_project;
exports.js_project = js_project;
exports.icons = icons;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.php_mailer = php_mailer;
exports.db = db;
