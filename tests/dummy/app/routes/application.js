import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return [
      Ember.Object.create({ id: 1, range: [10, 30] }),
      Ember.Object.create({ id: 2, range: [50, 60] }),
    ];
  },
});
