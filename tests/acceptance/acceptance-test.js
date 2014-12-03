import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

module('bm-select Acceptance Test', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
  }
});

test("bm-select Acceptance Test", function() {

  visit('/').then(function() {
    equal(find('bm-select bm-selected').text().trim(), "India", "bm-selected value is correctly set initially");

    find('bm-select').click();
    equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on open");

    find('bm-select').click();
    equal(find('bm-select').attr('aria-expanded'), "false", "bm-select aria-expanded is set to false on close");

    find('bm-select').focus().trigger(keyDown(13));
    equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on enter key press");
  });
});

function keyDown(code) {
    var e = $.Event("keydown");
    e.which = e.keyCode = code;
    return e;
}