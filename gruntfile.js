
module.exports = function(grunt) {

	//var Log = require('grunt-legacy-log').Log;
	//var logger = new Log({grunt: grunt});
	//grunt.log = logger.writeln;


	grunt.log.writeln('Adding config');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			dev: {
				dest: 'public/',
				js_dest: 'public/js/lib',
				css_dest: 'public/sass/lib'
			}
		},
		compass: {
			options: {
				config: 'compassConfig.rb'
			},
			dev: {
				options: {
					environment: 'development',
					"output-style": 'nested',
					sourcemap: true
				}
			},
			prod: {
				options: {
					environment: 'production'
				}
			}
		},
		requirejs: {

		},
		scsslint: {
			allFiles: [
				'public/sass/**/*.scss',
				'!public/sass/lib/**/*.scss'
			],
			options: {
				config: '.scss-lint.yml',
				colorizeOutput: true
			}
		},
		watch: {
			options: {
				interrupt: true
			},
			styles: {
				files: ['public/sass/**/*.scss'],
				tasks: ['compass:dev', 'scsslint']
			}
		}

	});

	// Load plugins.
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Custom tasks.
	grunt.registerTask('default', ['compass']);
	grunt.registerTask('watchDev', ['compass:dev', 'watch']);

};