/* global moment */

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
    onChangeCtrl(values, ranges, rangeBar) {
      var _this = this;
      rangeBar.ranges.forEach((range) => {
        var newRange = range.range.map(range.perant.normalise, range.perant);
        if (range.$data.model) {
          range.$data.model.set('range', newRange);
        } else {
          let newModel = Ember.Object.create({ id: 3, range: newRange });
          _this.get('model').pushObject(newModel);
          range.$data.model = newModel;
        }
      });
    },

    onChangingCtrl(values, ranges) {
      console.log('onChangingCtrl');
      console.log(values);
      console.log(ranges);
    },

  },
});
