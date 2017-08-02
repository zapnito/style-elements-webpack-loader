var processor = require("./js/processor.js");
var elmCompiler = require("node-elm-compiler");
var loaderUtils = require('loader-utils');

var hasLoadedDependencies = false;

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var callback = this.async();
  var options = loaderUtils.getOptions(this);

  if (!callback) {
    throw new Error('style-elements-webpack-loader currently only supports async mode.');
  }

  if (!hasLoadedDependencies) {
    elmCompiler
      .findAllDependencies(this.resourcePath)
      .then(deps => deps.forEach(dep => this.addDependency(dep)))
      .then(() => hasLoadedDependencies = true);
  }

  processor(options)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};
