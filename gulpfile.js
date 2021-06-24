const fs = require('fs');

const gulp = require('gulp');
const node_sass = require('node-sass');

/** @param {string} path */
function compileSass(path, _arg, attempt=0) {
  try {
    node_sass.render({
      file: path
    }, function(err, result) {
      if (result) {
        console.log(result.css.length, attempt);
        if (result.css.length <= 10 && attempt < 3) {
          console.log(`attempt (${attempt + 1})`, attempt + 1);
          compileSass(path, 0, attempt + 1);
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