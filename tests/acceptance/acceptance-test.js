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

    //Initital click of bm-select
    find('bm-select').click();
    equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on open");
    equal(find('bm-select bm-options').css('display'), "block", "Options drop down is visible on bm-select click");

    //Next click on bm-select
    find('bm-select').click();
    equal(find('bm-select').attr('aria-expanded'), "false", "bm-select aria-expanded is set to false on close");
    equal(find('bm-select bm-options').css('display'), "none", "Options drop down is hidden on next bm-select click");

    //Testing aria and keyboard navigation when opening dropdown
    find('bm-select').focus().trigger(keyDown(13));
    equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on enter key press");
    equal(find('bm-select bm-options').css('display'), "block", "Options drop down is visible on enter key press");
    find('bm-select').click().trigger(keyDown(40));
    equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on down arrow key press");
    equal(find('bm-select bm-options').css('display'), "block", "Options drop down is visible on down arrow key press");

    //Testing aria and keyboard navigation when closing dropdown
    find('bm-select').trigger(keyDown(27));
    equal(find('bm-select').attr('aria-expanded'), "false", "bm-select aria-expanded is set to false on escape key press");
    equal(find('bm-select bm-options').css('display'), "none", "Options drop down is hidden on escape key press");

    //Check selected bm-option
    var option = find('bm-select').find('bm-option[aria-checked=true]');
    equal(option.text().trim(), "India", "The correct bm-option has been checked");

    //Change selected option.
    var optionValue = find('bm-option:eq(1)').click().text().trim();
    var selectedOptionValue = find('bm-option[aria-checked=true]').text().trim();
    equal(optionValue, selectedOptionValue, "The correct bm-option has been checked after option click");
    find('bm-select').click().trigger(keyDown(38));
    optionValue = find('bm-option:eq(2)').click().text().trim();
    selectedOptionValue = find('bm-option[aria-checked=true]').text().trim();
    equal(optionValue, selectedOptionValue, "The correct bm-option has been checked after option keyboard navigation");

    //Check if component action is working
    var value = find('#country-value').text();
    equal(value, selectedOptionValue, "The actions from the component are triggered properly on option selection");

    //Ckeck if action triggered is correct when placeholder is clicked
    find('bm-option:eq(0)').click();
    var actionValue = find('#country-value').text();
    var placeholderValue = '';
    equal(actionValue, placeholderValue, "The actions from the component are triggered properly on placeholder selection");

    //Focus to another element and wait for all run loop code to finish before teardown.
    find('#dummy-input').focus();
    wait();

    //Check if options menu closed after focus set to another element
    equal(find('bm-select').attr('aria-expanded'), "false", "bm-select aria-expanded is set to false on focus set to outside element.");
    equal(find('bm-select bm-options').css('display'), "none", "bm-options is closed when focus is set to outside element.");
  });
});

function keyDown(code) {
    var e = $.Event("keydown");
    e.which = e.keyCode = code;
    return e;
}