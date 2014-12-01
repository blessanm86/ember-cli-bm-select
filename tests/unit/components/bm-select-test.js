import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('bm-select', 'BmSelectComponent', {
  needs: [
    'component:bm-selected', 
    'component:bm-options'
  ],

  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('is a bm-select tag', function() {
  //this.append();

  equal('bm-select', this.$().prop('tagName').toLowerCase());

});

