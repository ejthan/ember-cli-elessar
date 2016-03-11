/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-elessar',

  included: function(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/elessar/elessar.css');
    this.app.import(app.bowerDirectory + '/elessar/dist/elessar.js');
  },

};
