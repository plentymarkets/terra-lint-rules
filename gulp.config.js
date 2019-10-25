module.exports = function () {

    var sources = {
        packageJson: './package.json',
        readme: './README.md',
        rules: 'src/tslint-rules.json'
    };

    var destinations = {
        dist: './dist/',
    };

    return {
        sources: sources,
        destinations: destinations,
    };
};
