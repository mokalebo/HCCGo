module.exports = function(grunt) {
  var destinationFolder = './dist';
  grunt.initConfig({
    nwjs: {
       options: {
       	build_dir: './webkitbuilds',
        platforms: ['linux', 'win', 'osx64'],
        version: '0.15.4'
       },
       src: ['HCCGo/app/**']
    },
    less: {
      production: {
        options: {
          paths: ["HCCGo/app/css"]
        },
        files: {
          "HCCGo/app/css/application.css": "HCCGo/app/css/application.less"
        }
      }
    },
    shell: {
      start_webkit: {
        command: 'webkitbuilds/HCCGo/linux64/HCCGo --force'
      }
    },
    auto_install: {
      local: {},
      subdir: {
        options: {
          cwd: 'HCCGo/',
	  stdout: true,
	  stderr: true,
	  failOnError: true,
	  npm: '--development'
	}
      }
    },
    bower: {
      install: {
        options: {
          targetDir: 'HCCGo/app/lib',
          layout: 'byComponent',
          install: true,
          verbose: true,
          cleanTargetDir: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-nw-builder');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('default', ['less', 'bower', 'auto_install', 'nwjs']);
  grunt.registerTask('run', ['less', 'bower', 'nwjs', 'shell:start_webkit'])
};
