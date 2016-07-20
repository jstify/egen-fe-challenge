var gulp = require("gulp");
var destination = "./dist/"

// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

//Tasks
gulp.task('copyHtml', function() {
	gulp.src('./app/**/*.html').pipe(gulp.dest(destination));
});

gulp.task("copyAssets", function() {
    gulp.src("./app/assets/**/*").pipe(gulp.dest(destination + "assets"));
});

gulp.task('copy', ['copyHtml', 'copyAssets'], function() {
});

gulp.task("bundleCSS", function() {
    var cssFiles = ['./ext-modules/**/*.css', './app/**/*.css'];
    gulp.src(plugins.mainBowerFiles().concat(cssFiles))
        .pipe(plugins.filter('**/*.css'))
        .pipe(plugins.order([
            'normalize.css',
            '*'
        ]))
        .pipe(plugins.concat('bundle.css'))
        .pipe(plugins.cleanCss())
        .pipe(gulp.dest(destination + 'css'));
});

gulp.task("bundleTemplateCache", function() {
    //Bundling ccField Files
    var templateFiles = ['./ext-modules/ccField/**/*.html'];
    gulp.src(templateFiles)
        .pipe(plugins.angularTemplatecache({
            root: 'ext-modules/ccField/',
            module: 'ccField'
        }))
        .pipe(gulp.dest('./ext-modules/ccField/'));

    //End of Bundling ccField Files
});

gulp.task("bundleExtModules", ["bundleTemplateCache"], function() {
    //Bundling ccField Files
    var jsFiles = ['./ext-modules/ccField/*.js', '!./ext-modules/ccField/ccField.js'];
    gulp.src(jsFiles)
        .pipe(plugins.angularFilesort())
        .pipe(plugins.stripLine(['use strict']))
        .pipe(plugins.concat('ccField.js'))
        .pipe(gulp.dest('./ext-modules/ccField/'));

    //End of Bundling ccField Files
});

gulp.task("bundleJS",["bundleTemplateCache", "bundleExtModules"], function() {
    var jsFiles = ['./app/**/*.js', './ext-modules/ccField/ccField.js'];
    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
        .pipe(plugins.filter('**/*.js'))
        //.pipe(plugins.angularFilesort())
        .pipe(plugins.concat('bundle.js'))
        //.pipe(plugins.uglify())
        .pipe(gulp.dest(destination + 'js'));
});

gulp.task("bundle", ["bundleCSS", "bundleJS"], function() {
});

gulp.task("distribute", ["copy", "bundle"], function() {
    console.log("Distribution completed");
});

gulp.task("live-server", function() {
    var server = plugins.liveServer.static('dist', 8080);
    server.start();
});

gulp.task("serve", ["distribute","live-server"], function() {
	console.log("Server is running...");
    gulp.watch("./app/**/*.html", ["copyHtml"]);
	gulp.watch("./app/**/*.css", ["bundleCSS"]);    
	gulp.watch("./app/**/*.js", ["bundleJS"]);

    gulp.watch("./ext-modules/**/*.html", ["bundleJS"]);
	gulp.watch("./ext-modules/**/*.css", ["bundleCSS"]);       
    gulp.watch("./ext-modules/**/*.js", ["bundleJS"]);
});