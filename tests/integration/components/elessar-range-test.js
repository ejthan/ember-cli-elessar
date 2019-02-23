/* global moment */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';
import { A } from "@ember/array";
import EmberObject from '@ember/object';

moduleForComponent('elessar-range', 'Integration | Component | elessar range', {
  integration: true,
});

test('it renders with values', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(3);

  this.set('values', [[20, 40], [75, 85]]);
  this.render(hbs`{{elessar-range values=values}}`);
  assert.equal(this.$('.elessar-range').length, 2);

  this.set('values', [[20, 40], [55, 65], [75, 85]]);
  assert.equal(this.$('.elessar-range').length, 3);
  assert.equal($(this.$('.elessar-range')[0]).find('.elessar-barlabel').text(), '20 - 40');
});

test('it renders with model', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(1);

  let model = A([
    EmberObject.create({ id: 1, range: [10, 30] }),
    EmberObject.create({ id: 2, range: [50, 70] }),
  ]);

  this.set('model', model);
  this.render(hbs`{{elessar-range values=model bindModel=true}}`);
  assert.equal(this.$('.elessar-range').length, 2);

  // Still looking for a good solution
  // model.pushObject(Ember.Object.create({ id: 3, range: [80, 90] }));
  // this.set('model', model);
  // assert.equal(this.$('.elessar-range').length, 3);

});

test('it renders with moment.js', function(assert) {
  assert.expect(2);

  this.set('minCtrl', moment().startOf('day').format('LLLL'));
  this.set('maxCtrl', moment().endOf('day').format('LLLL'));
  this.set('snap', 1000 * 60 * 15);
  this.set('minSize', 1000 * 60 * 60);

  let timeValues = [
    [
      moment().startOf('day').add(6, 'hours').format('LLLL'),
      moment().startOf('day').add(13, 'hours').format('LLLL'),
    ],
    [
      moment().startOf('day').add(15.5, 'hours').format('LLLL'),
      moment().startOf('day').add(19.5, 'hours').format('LLLL'),
    ],
  ];
  this.set('timeValues', timeValues);

  this.set('valueParse', function(date) {
    return moment(date).valueOf();
  });

  this.set('valueFormat', function(ts) {
    return moment(ts).format('LLLL');
  });

  this.set('label', function(a) {
    return moment(a[1]).from(a[0], true);
  });

  this.render(hbs`{{elessar-range
    values=timeValues
    snap=1
    rangeClass="dummy-range-time"
    barClass="dummy-bar"
    valueParse=valueParse
    valueFormat=valueFormat
    label=label
    snap=snap
    minSize=minSize
    min=minCtrl
    max=maxCtrl
  }}`);

  assert.equal(this.$('.elessar-range').length, 2);
  assert.equal(this.$('.dummy-range-time').length, 2);
});
