'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    this._super.included.apply(this, arguments);
    this.app.import('node_modules/hero-multirangeslider/dist/hero-multirangeslider.css');
  },

};
