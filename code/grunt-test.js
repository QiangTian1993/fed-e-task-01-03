module.exports = grunt => {
	grunt.initConfig({
		sass: {
			options: {
				sourceMap: false,
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src/assets/styles',
						src: ['*.scss'],
						dest: 'dist/assets/styles',
						ext: '.css',
					},
				],
			},
		},

		babel: {
			options: {
				sourceMap: true,
				presets: ['@babel/preset-env'],
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src/assets/scripts',
						src: ['*.js'],
						dest: 'dist/assets/scripts',
						ext: '.js',
					},
				],
			},
		},

		copy: {
			main: {
				expand: true,
				src: ['public/*'],
				dest: 'dist',
			},
		},

		htmlmin: {
			options: {
				// Target options
				removeComments: true,
				collapseWhitespace: true,
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src',
						src: ['*.html'],
						dest: 'dist',
					},
				],
			},
		},

		watch: {
			scripts: {
				files: ['src/**'],
				tasks: ['babel', 'sass', 'htmlmin', 'connect'],
				options: {
					spawn: false,
				},
			},
		},

		connect: {
			options: {
				port: 9000,
				hostname: '*',
				livereload: 35729,
			},

			server: {
				options: {
					open: true,
					base: ['dist'],
				},
			},
		},

		clean: ['dist'],
	})

	grunt.registerTask('babel', function () {
		console.log(grunt.config('build'))
	})

	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-contrib-copy')
	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-htmlmin')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-connect')
	// grunt.loadNpmTasks('grunt-swig')
	// grunt.loadNpmTasks('grunt-useref')
	grunt.loadNpmTasks('grunt-babel')

	grunt.registerTask('default', [
		'clean',
		'copy',
		'babel',
		'sass',
		'htmlmin',
		'connect',
		'watch',
	])
}
