/* Global moment */

import Ember from 'ember';

export default Ember.Controller.extend({
  values: [[20, 40], [75, 85]],
  snap: 1000 * 60 * 15,
  minSize: 1000 * 60 * 60,
  minCtrl: moment().startOf('day').format('LLLL'),
  maxCtrl: moment().endOf('day').format('LLLL'),

  timeValues: [
    [
      moment().startOf('day').add(6, 'hours').format('LLLL'),
      moment().startOf('day').add(13, 'hours').format('LLLL'),
    ],
    [
      moment().startOf('day').add(15.5, 'hours').format('LLLL'),
      moment().startOf('day').add(19.5, 'hours').format('LLLL'),
    ],
  ],

  valueParse: function(date) {
    return moment(date).valueOf();
  },

  valueFormat: function(ts) {
    return moment(ts).format('LLLL');
  },

  label: function(a) {
    return moment(a[1]).from(a[0], true);
  },

  actions: {
    onChangeCtrl(values, range, bar) {
      console.log('onChangeCtrl');
      console.log(values);
      console.log(range);
      console.log(bar);
    },

    onChangingCtrl(values, range, bar) {
      console.log('onChangingCtrl');
      console.log(values);
      console.log(range);
      console.log(bar);
    },

  },
});
