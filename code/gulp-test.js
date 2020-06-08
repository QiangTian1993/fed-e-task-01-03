const { series, parallel, src, dest, watch } = require('gulp')

const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const del = require('del')
const browserSync = require('browser-sync')

const bs = browserSync.create()

const style = () =>
	src('src/assets/styles/*.scss', { base: 'src' })
		.pipe(plugins.sass())
		.pipe(dest('temp'))
		.pipe(bs.reload({ stream: true }))

const script = () =>
	src('src/assets/scripts/*.js', { base: 'src' })
		.pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
		.pipe(dest('temp'))
		.pipe(bs.reload({ stream: true }))

const font = () =>
	src('src/assets/fonts/**', { base: 'src' }).pipe(dest('dist'))

const image = () =>
	src('src/assets/images/**', { base: 'src' }).pipe(dest('dist'))

const page = () =>
	src('src/*.html')
		.pipe(plugins.swig({ defaults: { cache: false } }))
		.pipe(dest('temp'))
		.pipe(bs.reload({ stream: true }))

const extra = () => src('public/**', { base: 'public' }).pipe(dest('dist'))

const clean = () => del(['dist', 'temp'])

const serve = () => {
	watch('src/assets/styles/*.scss', style)
	watch('src/assets/script/*.js', script)
	watch('src/*.html', page)
	watch(['src/assets/images/**', 'src/assets/fonts/**', 'public/**'], bs.reload)
	bs.init({
		notify: false,
		port: 2080,
		open: true,
		files: 'dist/**',
		server: {
			baseDir: ['temp', 'src', 'public'],
			routes: {
				'/node_modules': 'node_modules',
			},
		},
	})
}

const useref = () =>
	src('temp/*.html', { base: 'temp' })
		.pipe(
			plugins.useref({
				searchPath: ['temp', '.'],
			})
		)
		.pipe(plugins.if(/\.js$/, plugins.uglify()))
		.pipe(plugins.if(/\.css$/, plugins.cleanCss()))
		.pipe(plugins.if(/\.html$/, plugins.htmlmin()))
		.pipe(dest('dist'))

const compile = parallel(style, script, page)

const build = series(
	clean,
	parallel(series(compile, useref), image, font, extra)
)

const dev = series(compile, serve)

module.exports = { clean, build, dev }
