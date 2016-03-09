module.exports = {
  description: 'ember-cli-elessar',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('elessar'); // is a promise
  },

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
