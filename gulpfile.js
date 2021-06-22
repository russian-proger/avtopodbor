const fs = require('fs');

const gulp = require('gulp');
const node_sass = require('node-sass');

/** @param {string} path */
function compileSass(path) {
  try {
    node_sass.render({
      file: path
    }, function(err, result) {
      if (result) {
        if (result.css.length == 0 && fs.readFileSync(path).length != 0) {
          compileSass(path);
          return;
        }
        let filename = path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
        fs.writeFile(`${__dirname}/assets/css/s_${filename}.css`, result.css, () => {
          console.log(`\x1b[42m${filename} rendered in ${result.stats.duration} ms \x1b[0m`);
        });
      } else if (err != null) {
        console.log(`\x1b[41mError in \x1b[47m \x1b[30m${path} \x1b[37m`);
        console.error(`\x1b[41mLine ${err.line}: ${err.message}`)
        console.log(`\x1b[0m`);
    }
    });
  } catch(e) {

  }
}

function main() {
  const watcher = gulp.watch('assets/sass/*.s[ac]ss', {delay: 100});

  watcher.on('change', compileSass);
}

exports.default = main;