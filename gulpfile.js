var gulp = require('gulp')

var concatCss = require('gulp-concat-css')
var uglifycss = require('gulp-uglifycss')
var sass = require('gulp-sass')

var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var pump = require('pump')

var htmlmin = require('gulp-htmlmin')

var spritesmith = require('gulp.spritesmith')

gulp.task('sprites', function () {
	gulp.src('./src/assets/sprites/btn-**').pipe(spritesmith({
		imgName: './assets/images/btn-img.png',
		cssName: './json/btn-img.json',
	})).pipe(gulp.dest('./src/'))
})

gulp.task('htmlmini', function () {
	gulp.src('./*.html').pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest('./dist'))
})

gulp.task('canvasJs', function () {
	pump([
		gulp.src(['./src/lib/easeljs.min.js', './src/lib/preloadjs.min.js', './src/lib/soundjs.min.js', './src/lib/tweenjs.min.js', './src/js/**.js']).pipe(concat('app.js', { newLine: ';var COPYRIGHT=decodeURIComponent(\'%E7%89%88%E6%9D%83%E6%89%80%E6%9C%89%EF%BC%8C%E7%9B%97%E8%80%85%E5%BF%85%E7%A9%B6\');' })),
		uglify({ output: { beautify: false, preamble: '/* ! 版权© 归 震勇科技-前端开发组, Team Leader: Timson,  归属 震勇科技网络有限公司所有, 如有盗窃,必究到底 */\n' }, compress: { drop_console: false }, mangle: { eval: true, toplevel: true } }),
		gulp.dest('./dist/src/js/'),
	])	
})

gulp.task('canvasBuildJs', function () {
	pump([
		gulp.src(['./src/lib/easeljs.min.js', './src/lib/preloadjs.min.js', './src/lib/soundjs.min.js', './src/lib/tweenjs.min.js', './src/js/**.js']).pipe(concat('app.js', { newLine: ';var COPYRIGHT=decodeURIComponent(\'%E7%89%88%E6%9D%83%E6%89%80%E6%9C%89%EF%BC%8C%E7%9B%97%E8%80%85%E5%BF%85%E7%A9%B6\');' })),
		uglify({ output: { beautify: false, preamble: '/* ! 版权© 归 震勇科技-前端开发组, Team Leader: Timson,  归属 震勇科技网络有限公司所有, 如有盗窃,必究到底 */\n' }, compress: { drop_console: true }, mangle: { eval: true, toplevel: true } }),
		gulp.dest('./dist/src/js/'),
	])
})

gulp.task('devJs', function () {
	pump([
		gulp.src(['./src/lib/jquery.min.js', './src/lib/vue.js', './src/js/**.js']).pipe(concat('app.js', { newLine: ';var COPYRIGHT=decodeURIComponent(\'%E7%89%88%E6%9D%83%E6%89%80%E6%9C%89%EF%BC%8C%E7%9B%97%E8%80%85%E5%BF%85%E7%A9%B6\');' })),
		uglify({ output: { beautify: false, preamble: '/* ! 版权© 归 震勇科技-前端开发组, Team Leader: Timson,  归属 震勇科技网络有限公司所有, 如有盗窃,必究到底 */\n' }, compress: { drop_console: false }, mangle: { eval: true, toplevel: true } }),
		gulp.dest('./dist/src/js/'),
	])	
})

gulp.task('buildJs', function () {
	pump([
		gulp.src(['./src/lib/jquery.min.js', './src/lib/vue.js', './src/js/**.js']).pipe(concat('app.js', { newLine: ';var COPYRIGHT=decodeURIComponent(\'%E7%89%88%E6%9D%83%E6%89%80%E6%9C%89%EF%BC%8C%E7%9B%97%E8%80%85%E5%BF%85%E7%A9%B6\');' })),
		uglify({ output: { beautify: false, preamble: '/* ! 版权© 归 震勇科技-前端开发组, Team Leader: Timson,  归属 震勇科技网络有限公司所有, 如有盗窃,必究到底 */\n' }, compress: { drop_console: true }, mangle: { eval: true, toplevel: true } }),
		gulp.dest('./dist/src/js/'),
	])
})

gulp.task('sass', function () {
	return gulp.src('./src/sass/**.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('./src/css/'))
})

gulp.task('uglifycss', function () {
	gulp.src('./src/css/**.css').pipe(concatCss('lib.css')).pipe(uglifycss({
		maxLineLen: -1,
		uglyComments: true,
	})).pipe(gulp.dest('./dist/src/css/'))
})

gulp.task('copyAssets', function () {
	gulp.src('./src/assets/images/*').pipe(gulp.dest('./dist/src/assets/images/'))
	gulp.src('./src/assets/music/*').pipe(gulp.dest('./dist/src/assets/music/'))
	gulp.src('./src/assets/json/*').pipe(gulp.dest('./dist/src/assets/json/'))	
})

gulp.task('dev', function () {
	gulp.watch('./**.html', ['htmlmini']).on('change', function (event) {
		console.info('File ' + event.path + ' was ' + event.type + ', running tasks...')
	})

	gulp.watch('./src/js/**.js', ['devJs']).on('change', function (event) {
		console.info('File ' + event.path + ' was ' + event.type + ', running tasks...')
	})

	gulp.watch('./src/css/**.css', ['uglifycss']).on('change', function (event) {
		console.info('File ' + event.path + ' was ' + event.type + ', running tasks...')
	})

	gulp.watch('./src/sass/**.scss', ['sass']).on('change', function (event) {
		console.info('File ' + event.path + ' was ' + event.type + ', running tasks...')		
	})

	gulp.watch('./src/assets/images/**', ['copyAssets']).on('change', function (event) {
		console.info('File ' + event.path + ' was ' + event.type + ', running tasks...')
	})
	gulp.watch('./src/assets/music/**', ['copyAssets']).on('change', function (event) {
		console.info('File ' + event.path + ' was ' + event.type + ', running tasks...')
	})
	gulp.watch('./src/assets/json/**', ['copyAssets']).on('change', function (event) {
		console.info('File ' + event.path + ' was ' + event.type + ', running tasks...')
	})
})

gulp.task('release', ['htmlmini', 'buildJs', 'sass', 'uglifycss', 'copyAssets'],function () {})
