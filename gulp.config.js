module.exports = function () {

    var sources = {
        packageJson: './package.json',
        readme: './README.md',
    };

    var destinations = {
        dist: './dist/',
    };

    return {
        sources: sources,
        destinations: destinations,
    };
};
