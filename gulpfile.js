const { series, src, dest } = require('gulp');
var config = require('./gulp.config.js')();

//copy package.json to dist
function copyPackageJson() {
    return src(config.sources.packageJson)
        .pipe(dest(config.destinations.dist));
}

//copy readme to dist
function copyReadme() {
    return src(config.sources.readme)
        .pipe(dest(config.destinations.dist));
}

/**
 * Copies all the files to the dedicated deploy folder
 **/
const copy = series(copyPackageJson, copyReadme);
exports.copy = copy;
