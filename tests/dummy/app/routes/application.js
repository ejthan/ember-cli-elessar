import Ember from 'ember';

export default Ember.Route.extend({

  // beforeModel() {
  //   this.store.createRecord('example', {
  //     from: 10,
  //     to: 30,
  //   });
  //   this.store.createRecord('example', {
  //     from: 50,
  //     to: 60,
  //   });
  // },

  model() {
    //return this.store.peekAll('example').toArray();
    return Ember.A([
      Ember.Object.create({ id: 1, range: [10, 30] }),
      Ember.Object.create({ id: 2, range: [50, 70] }),
    ]);
  },
});
