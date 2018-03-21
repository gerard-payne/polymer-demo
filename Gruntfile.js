/*global module, require */
module.exports = function (grunt) {
    'use strict';
    require('time-grunt')(grunt);
    // settings
    var _rootDirectory = ".",
        _sourceDirectory = "source",
        _buildDirectory = "build",
        _releaseDirectory = "release",
        _filePattern = ['**/*.*'],
        _defaultHost = '127.0.0.1',
        _defaultPort = 80,
        _testPort = 8080;

    // task configs
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // ------------------------------------------------------
        bower: {
            install: {
                options: {
                    install: true,
                    verbose: false
                }
            }
        },
        // ------------------------------------------------------
        watch: {
            project: {
                files: [_sourceDirectory + '/**/*.*'],
                tasks: ['build']
            }
        },
        // ------------------------------------------------------
        copy: {
            bower: {
                cwd: 'bower_components',
                src: _filePattern,
                dest: _buildDirectory + '/bower_components',
                expand: true
            },                  
            build: {
                cwd: _sourceDirectory,
                src: [_filePattern],
                dest: _buildDirectory,
                expand: true
            }
        },
        // ------------------------------------------------------
        connect: {
            develop: {
                options: {
                    base: _buildDirectory,
                    hostname: `${_defaultHost}`,
                    port: _defaultPort,
                    useAvailablePort: true,
                    open: {
                        target: `http://${_defaultHost}:${_defaultPort}`,
                        livereload: 4500
                    }
                }
            }
        },
        // ------------------------------------------------------
        clean: [_buildDirectory, _releaseDirectory]
    });

    // task modules
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('install', ['clean', 'bower:install', 'copy:bower']);
    grunt.registerTask('build',   ['copy:build']);
    grunt.registerTask('develop', ['install', 'build', 'connect:develop', 'watch']);
    // development task
    grunt.registerTask('default', ['develop']);
};
