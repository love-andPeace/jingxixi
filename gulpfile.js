const yang_gulp = require('gulp');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const sprite = require('gulp.spritesmith');

// async function testTask(){
//     console.log("测试环境配置成功了！")
// }

// yang_gulp.task('TEST',testTask)

async function copyIndex(){
    yang_gulp.src('./src/index.html')
            .pipe(yang_gulp.dest('./build'))
}

yang_gulp.task('copy-index',copyIndex)



async function copyHtml(){
    yang_gulp.src('./src/html/*.html')
             .pipe(yang_gulp.dest('./dist/html'))
} 

async function copyImg(){
    yang_gulp.src('./src/assets/img/**/*.{jpg,gif,png}')
             .pipe(yang_gulp.dest('./build/assets/img'))
}

async function copyLib(){
    yang_gulp.src('./src/lib/**/*.*')
             .pipe(yang_gulp.dest('./build/lib'))
}

var copyAll = yang_gulp.parallel(copyHtml,copyImg,copyLib);
yang_gulp.task('copy-all',copyAll)


var sass = require('gulp-sass');

async function sassTask(){
     yang_gulp.src("./src/style/**/*.scss")
              .pipe(sass())
              .pipe(yang_gulp.dest('./build/css/'))
}
yang_gulp.task('sas',sassTask)

async function homeJS(){
    yang_gulp.src('./src/js/home/**/*.js')
             .pipe(concat('home.js'))
             .pipe(babel({
                 presets: ['@babel/env']
             }))
             .pipe(uglify())
             .pipe(yang_gulp.dest('./build/js/home'))
}

yang_gulp.task('js-home',homeJS)

//合并

//del
var build = yang_gulp.series(clean,homeJS,sassTask,copyAll)
async function clean(){
    return del(['build'])
}

yang_gulp.task('shanchu',build)

//uglify


//gulp监听，保存即执行
function watch(){
    yang_gulp.watch('./src/index.html',copyIndex);
    yang_gulp.watch('./src/assets/img/**/*.{jpg,png,gif,jpg}',copyImg);
    yang_gulp.watch('./src/html/*.html',copyHtml);
    yang_gulp.watch('./src/lib/**/*.*',copyLib);
    yang_gulp.watch('./src/style/**/*.scss',sassTask)
    yang_gulp.watch('./src/js/home/**/*.js',homeJS)
}
yang_gulp.task('watch',watch)


//精灵图
async function spritesmith(){
    yang_gulp.src('./src/assets/img/**/*.jpg')
             .pipe(sprite({
                 imgName:'sprite.jpg',
                 cssName: 'sprite.css'
             }))
             .pipe(yang_gulp.dest('./build/assets/icons'))
}

yang_gulp.task('sprite',spritesmith)