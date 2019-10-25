const {series, src, dest} = require('gulp');
const prompt = require('gulp-prompt');
const fs = require('fs');
const semver = require('semver');
const config = require('./gulp.config.js')();

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

//copy readme to dist
function copyRules() {
    return src(config.sources.rules)
        .pipe(dest(config.destinations.dist));
}

/**
 * Copies all the files to the dedicated deploy folder
 **/
const copy = series(copyPackageJson, copyReadme, copyRules);
exports.copy = copy;


/**
 * changing version of package.json for new publish
 * usage: 'npm run publish -- --param1 --param2 param2_value' for publishing
 *
 * @param increment  - Possible values are
 *                      major           (1.x.x to 2.x.x),
 *                      premajor        (1.x.x to 2.x.x-0 or 2.x.x-subversion.0),
 *                      minor           (x.1.x to x.2.x),
 *                      preminor        (x.1.x to x.2.x-0 or x.2.x-subversion.0)
 *                      patch           (x.x.1 to x.x.2),
 *                      prepatch        (x.x.1 to x.x.2-0 or x.x.1 to x.x.2-subversion.0)
 *                      or prerelease   (x.x.x-0 or x.x.x-subversion.0 to x.x.x-1 or x.x.x-subversion.1)
 *                     If not set patch is default. See VERSIONING.md for further information.
 * @param preid      - Sets a subversion (appends '-param_value', e.g. x.x.x-newFeature, to version in package.json) for a premajor,
 *     preminor or prepatch release. Use only, if really necessary!!
 *
 **/
function changeVersion(increment, preid) {
    const json = JSON.parse(fs.readFileSync('./package.json'));

    console.log('-------------------------------------------------');
    console.log('--- OLD PACKAGE VERSION: ' + json.version + ' ---');

    json.version = semver.inc(json.version, increment, preid);

    console.log('--- NEW PACKAGE VERSION: ' + json.version + ' ---');
    console.log('-------------------------------------------------');

    fs.writeFileSync('./package.json', JSON.stringify(json, null, '\t'));
}

function updateVersion() {
    return src('package.json')
        .pipe(prompt.prompt([
            {
                type: 'list',
                name: 'increment',
                message: 'What type of bump would you like to do?',
                choices: ['patch', 'minor', 'major']
            }
        ], function (res) {
            changeVersion(res.increment);
        }))
        .pipe(prompt.confirm({
            message: 'Version correct?',
            default: false
        }))
}
exports.updateVersion = updateVersion;
