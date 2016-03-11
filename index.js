/* jshint node: true */
'use strict';
var path = require('path');

module.exports = {
  name: 'ember-cli-elessar',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/elessar/elessar.css');
    this.app.import(app.bowerDirectory + '/elessar/dist/elessar.js');
  },

};
