module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		watch: {
			options: {
				interrupt: true
			},
			styles: {
				files: ['public/sass/**/*.scss'],
				tasks: ['compass:dev']
			}
		}

	});

	// Load plugins.
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Custom tasks.
	grunt.registerTask('default', ['compass']);
	grunt.registerTask('watchDev', ['compass:dev', 'watch']);

};