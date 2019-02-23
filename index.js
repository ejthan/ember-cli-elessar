'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    this._super.included(app);
    this.app.import('node_modules/elessar/elessar.css');
  },

};
