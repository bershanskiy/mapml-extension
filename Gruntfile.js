const fs = require('fs/promises');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          // This just copies files verbatim excluding Firefox-specific file
          // manifest-firefox.js, and background.js which needs extra processing.
          {
            expand: true,
            cwd: 'src',
            src: ['**', '!manifest-firefox.js', '!background*.js'],
            dest: 'build/chrome'
          },
          // Firefox needs to customize manifest.json (merge manifest.json with manifest-firefox.js)
          // and process background.js.
          {
            expand: true,
            cwd: 'src',
            src: ['**', '!manifest.json', '!manifest-firefox.js', '!background*.js'],
            dest: 'build/firefox',
          },
        ],
      },
    },
    clean: {
      build: ['build']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean', 'copy', 'manifest.json', 'background.js']);

  grunt.registerTask('manifest.json', 'Bundle Firefox manifest.json', async function() {
    const done = this.async();

    const baseFile = await fs.readFile('./src/manifest.json');
    const patch = require('./src/manifest-firefox.js');

    // Patch manifest
    const out = {
      ...JSON.parse(baseFile),
      ...patch,
    }

    // Write prepared manifest
    await fs.writeFile('./build/firefox/manifest.json', JSON.stringify(out, null, '  '));

    done();
  });

  grunt.registerTask('background.js', 'Bundle background.js', async function() {
    const done = this.async();

    // Read files in parallel
    const [script, scriptChrome, scriptFirefox] = await Promise.all([
      fs.readFile('./src/background.js', {encoding: 'utf8'}),
      fs.readFile('./src/background-chrome.js', {encoding: 'utf8'}),
      fs.readFile('./src/background-firefox.js', {encoding: 'utf8'}),
    ]);

    // Write prepared manifest
    await fs.writeFile('./build/chrome/background.js', scriptChrome + '\n' + script);
    await fs.writeFile('./build/firefox/background.js', scriptFirefox + '\n' + script);

    done();
  });
};
