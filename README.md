# Ember-cli-elessar

[Demo](http://ejthan.github.io/ember-cli-elessar/)

This is a wrapper for the elessar slider plugin to work with Ember CLI.

### Installation

From inside your ember-cli project, run the following:

```bash
ember install ember-cli-elessar
```

## Usage

### Options for component

```javascript
  values: [],                   // array of value pairs; each pair is the min and max of the range it creates
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
  bgMarks: {
    count: 0,                   // number of value labels to write in the background of the bar
    interval: Infinity,         // provide instead of count to specify the space between labels
    label: '',
  },

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
```

### Usage in Template

```javascript
  {{elessar-range
    values=model
    bindModel=true
    snap=1
    onChange=(action "onChangeCtrl")
    onChanging=(action "onChangingCtrl")
    rangeClass="dummy-range"
    barClass="dummy-bar"
  }}
```

### Example with binding

If the option bindModel is set to true the ranges will be created with the model attached

To attach the model to newly created ranges => check this example
```javascript
    onChangeCtrl(values, ranges, rangeBar) {
      var _this = this;
      rangeBar.ranges.forEach((range) => {
        let newRange = range.range.map(range.perant.normalise, range.perant);
        if (range.$data.model) {
          range.$data.model.set('range', newRange);
        } else {
          let newModel = Ember.Object.create({ id: 3, range: newRange });
          _this.get('model').pushObject(newModel);
          range.$data.model = newModel;
        }
      });
    },
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
