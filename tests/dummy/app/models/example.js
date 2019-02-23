import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  from: DS.attr('number'),
  to: DS.attr('number'),

  range: computed('from', 'to', function() {
    return [this.get('from'), this.get('to')];
  }),
});
