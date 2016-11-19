module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.initConfig({
        jshint: {
            files: ["Gruntfile.js", "lib/*.js", "Tests/*.js"],
             options : {
                jshintrc : ".jshintrc"
            }
        }
    });

    grunt.registerTask("default", ["jshint"]);
};