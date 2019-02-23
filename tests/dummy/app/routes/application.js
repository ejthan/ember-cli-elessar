import Route from '@ember/routing/route';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default Route.extend({

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
    return A([
      EmberObject.create({ id: 1, range: [10, 30] }),
      EmberObject.create({ id: 2, range: [50, 70] }),
    ]);
  },
});
