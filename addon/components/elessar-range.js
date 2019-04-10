import Component from '@ember/component';
import HeroMultirangeslider from 'hero-multirangeslider';
import $ from 'jquery';
export default Component.extend({

  init() {
    this._super(...arguments);
    
    this.values = this.values || []; // array of value pairs; each pair is the min and max of the range it creates
    this.bgMark = this.bgMark || {
      count: 0,                   // number of value labels to write in the background of the bar
      interval: Infinity,         // provide instead of count to specify the space between labels
      label: '',
    };
  },

  readonly: false,              // whether this bar is read-only
  min: 0,                       // value at start of bar
  max: 100,                     // value at end of bar
  valueFormat: function(a) {    // formats a value on the bar for output
    return a;
  },

  valueParse: function(a) {     // parses an output value for the bar
    return a;
  },

  snap: 0,                      // clamps range ends to multiples of this value (in bar units)
  minSize: 0,                   // smallest allowed range (in bar units)
  maxRanges: 3,                 // maximum number of ranges allowed on the bar

  label: function(a) {        // string or function to write as the text of a label. functions are called with normalised values.
    return parseInt(a[0]) + ' - ' + parseInt(a[1]);
  },

  indicator: null,              // pass a function(RangeBar, Indicator, Function?) Value to calculate where to put a current indicator, calling the function whenever you want the position to be recalculated
  allowDelete: false,           // set to true to enable double-middle-click-to-delete
  deleteTimeout: 5000,          // maximum time in ms between middle clicks
  vertical: false,              // if true the rangebar is aligned vertically, and given the class elessar-vertical
  bounds: null,                 // a function that provides an upper or lower bound when a range is being dragged. call with the range that is being moved, should return an object with an upper or lower key
  htmlLabel: false,             // if true, range labels are written as html
  allowSwap: true,              // swap ranges when dragging past
  barClass: null,               // special css selector for bar
  rangeClass: null,             // special css selector for range
  bindModel: false,             // bind model to range, special way to add ranges (manual)

  didUpdateAttrs() {
    this._super(...arguments);
    var _this = this;
    if (_this.get('bindModel')) {
      _this.rangeBar.ranges.forEach((item) => {
        _this.rangeBar.removeRange(item.$el.index());
      });
      _this.addRangeModel();
    } else {
      _this.rangeBar.val(_this.get('values'));
    }
  },

  addRangeModel() {
    var _this = this;
    _this.get('values').forEach(function(item) {
      _this.rangeBar.addRange(item.get('range').map(_this.rangeBar.abnormalise, _this.rangeBar), { model: item });
    });
  },

  didInsertElement() {
    this.elessarSetup();
  },

  willDestroyElement() {
    this.rangeBar.remove();
  },

  elessarSetup() {
    var _this = this;
    this.rangeBar = new HeroMultirangeslider({
      values: _this.get('bindModel') ? [] : _this.get('values'),
      readonly: _this.get('readonly'),
      min: _this.get('min'),
      max: _this.get('max'),
      valueFormat: _this.get('valueFormat'),
      valueParse: _this.get('valueParse'),
      snap: _this.get('snap'),
      minSize: _this.get('minSize'),
      maxRanges: _this.get('maxRanges'),

      bgMark: _this.get('bgMark'),
      label: _this.get('label'),
      indicator: _this.get('indicator'),
      allowDelete: _this.get('allowDelete'),
      deleteTimeout: _this.get('deleteTimeout'),
      vertical: _this.get('vertical'),
      bounds: _this.get('bounds'),
      htmlLabel: _this.get('htmlLabel'),
      allowSwap: _this.get('allowSwap'),
      barClass: _this.get('barClass'),
      rangeClass: _this.get('rangeClass'),
    });

    if (_this.get('bindModel')) {
      _this.addRangeModel();
    }

    let timeout = null;

    $(this.element).prepend(_this.rangeBar
    .on('change', function(values, range) {
      // workaround for a known bug where many events are triggered when just one should be
      // https://github.com/quarterto/Elessar/issues/99
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (_this.get('onChange')) {
          _this.get('onChange')(values, range, _this.rangeBar);
        }
      }, 10);
    })
    .on('changing', (values, range) => {
      if (_this.get('onChanging')) {
        _this.get('onChanging')(values, range, _this.rangeBar);
      }
    }).$el);
  }

});
