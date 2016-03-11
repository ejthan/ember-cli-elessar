import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  from: DS.attr('number'),
  to: DS.attr('number'),

  range: Ember.computed('from', 'to', function() {
    return [this.get('from'), this.get('to')];
  }),
});
