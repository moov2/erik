/**
 * -----------------------------------------------------------------------------
 * Loads in gulp, quite important for a gulp build file.
 * -----------------------------------------------------------------------------
 */

var gulp = require('gulp');

/**
 * -----------------------------------------------------------------------------
 * Load plug-ins used throughout the build process.
 * -----------------------------------------------------------------------------
 */

    var msbuild = require('gulp-msbuild'),
        rimraf = require('gulp-rimraf'),
        es = require('event-stream'),
        gulpReplace = require('gulp-replace'),
        replace = require('replace'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        uglify = require('gulp-uglify');


/**
 * -----------------------------------------------------------------------------
 * Custom variables to aid the build process.
 * -----------------------------------------------------------------------------
 */

/**
 * Object containing paths to files / directories used throughout the build.
 */
var paths = {
    solution: 'Erik.sln',
    src: './src/',
    intermediate: './intermediate/',
    release: './dist/',
    js: 'Erik/assets/js/'
}

/**
 * -----------------------------------------------------------------------------
 * Useful functions to aid the build.
 * -----------------------------------------------------------------------------
 */

/**
 * Returns path to the directory in the source files.
 */
var src = function (path) {
    return (!path) ? paths.src : paths.src + path;
}

/**
 * Returns path to the intermediate directory that contains source files that are
 * manipulated during the build process.
 */
var intermediate = function (path) {
    return (!path) ? paths.intermediate : paths.intermediate + path;
};

/**
 * Returns path to the distributable directory that will contain the production
 * release.
 */
var release = function (path) {
    return (!path) ? paths.release : paths.release + path;
}

/**
 * Excludes the copying of directories that don't contain any files.
 * Credit: http://stackoverflow.com/questions/23719731/gulp-copying-empty-directories
 */
var excludeEmptyDirs = function(es) {
    return es.map(function(file, cb) {
        if (file.stat.isFile()) {
            return cb(null, file);
        } else {
            return cb();
        }
    });
};

/**
 * Global error handler that is used to prevent the watch task from ending when
 * failing to execute a task (e.g. the Sass fails to compile due to error in Sass
 * files).
 */
var handleError = function (err) {
    console.log(err.toString());
    this.emit('end');
};


/**
 * -----------------------------------------------------------------------------
 * Gulp tasks to be used while developing the website.
 * -----------------------------------------------------------------------------
 */

/**
 * Default task is to be used when developing.
 */
gulp.task('default', []);

/**
 * Creates a browserify bundle.
 */
gulp.task('browserify-dev', function() {
    return browserify(src(paths.js + 'main.js'))
            .bundle()
            .on('error', handleError)
            .pipe(source('erik.js'))
            .pipe(gulp.dest(src(paths.js)));
});

/**
 * Watches for changes to source files while your developing in order to do special
 * stuff that makes your life easier!
 */
gulp.task('watch-dev', function() {
    // changes to JS files will trigger browserify to create bundle.
    gulp.watch(src(paths.js + '**/*.js'), ['browserify-dev']);
});

/**
 * Have this task running while you're doing development on Erik.
 */
gulp.task('development', ['browserify-dev', 'watch-dev']);

/**
 * -----------------------------------------------------------------------------
 * Gulp tasks used to build a production ready version of the project.
 * -----------------------------------------------------------------------------
 */

/**
 * Removes artefacts from previous builds.
 */
gulp.task('clean', function () {
    return gulp.src([release(), intermediate()])
            .pipe(rimraf());
});

/**
 * Copies source files into an intermediate location to ensure that files that are
 * editing during development aren't touched by the build process.
 */
gulp.task('intermediate', ['clean'], function () {
    // for some reason gulp doesn't copy the .nuget directory so have to do this
    // in a separate copy.
    gulp.src([src('.nuget/**/*')])
        .pipe(gulp.dest(intermediate('.nuget/')));

    // copy phaser across as this is loaded seperately from the distributable JS
    // file that is created by browserify.
    gulp.src([src(paths.js + '/vendor/phaser.min.js')])
        .pipe(gulp.dest(intermediate(paths.js + '/vendor')));

    return gulp.src(['src/**/*', '!**/bin/**', '!**/obj/**', '!**/*.user', '!**/*.css', '!**/*.js'])
        .pipe(gulp.dest(intermediate()));
});

/**
 * Bundles the JS modules together into a single file.
 */
gulp.task('browserify', ['clean'], function () {
    return browserify(src(paths.js + 'main.js'))
        .bundle()
        .pipe(source('erik.js'))
        .pipe(gulp.dest(intermediate(paths.js)));
});

/**
 * Compresses the single file.
 */
gulp.task('uglify', ['browserify'], function () {
    gulp.src(intermediate(paths.js + 'erik.js'))
        .pipe(uglify())
        .pipe(gulp.dest(release('/assets/js/')))
});

/**
 * Builds a release version of the
 */
gulp.task('build', ['intermediate'], function() {
    return gulp.src(intermediate(paths.solution))
        .pipe(msbuild({
            targets: ['Clean', 'Build'],
            properties: { Configuration: 'Release', Platform: 'Any CPU' },
            errorOnFail: true
        }));
});

/**
 * Copies the solution build files into a distribution directory.
 */
gulp.task('copy', ['build'], function () {
    return gulp.src([intermediate('Erik/**/*'), '!**/obj/**/*', '!**/*.csproj', '!**/*.cs', '!**/erik.js', '!**/packages.config'])
                   .pipe(excludeEmptyDirs(es))
                   .pipe(gulp.dest(release()));
});

/**
 * Ensure the production version doesn't run with debug compilation set to true.
 */
gulp.task('replace', ['copy'], function () {
    return gulp.src([intermediate('Erik/Web.config')])
                           .pipe(gulpReplace('<compilation debug="true"', '<compilation debug="false"'))
                           .pipe(gulp.dest(release()));
});

/**
 * Bit of house cleaning, removing the no longer required intermediate directory.
 */
gulp.task('tidy', ['replace'], function () {
    gulp.src(intermediate())
            .pipe(rimraf());
});

/**
 * Task handles created a production ready version of the project.
 */
gulp.task('dist', ['clean', 'intermediate', 'browserify', 'build', 'copy', 'uglify', 'replace', 'tidy'])
