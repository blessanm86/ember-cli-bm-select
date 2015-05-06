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
    click('bm-select').then(function() {
      equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on open");
      equal(find('bm-select bm-options').css('display'), "block", "Options drop down is visible on bm-select click");
    });

    //Next click on bm-select
    andThen(function() {
      click('bm-select').then(function() {
        equal(find('bm-select').attr('aria-expanded'), "false", "bm-select aria-expanded is set to false on close");
        equal(find('bm-select bm-options').css('display'), "none", "Options drop down is hidden on next bm-select click");
      });
    });

    //Testing aria and keyboard navigation when opening dropdown
    andThen(function() {
      triggerEvent('bm-select', 'focus').then(function() {
        return keyEvent('bm-select', 'keydown', 13);
      }).then(function() {
        equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on enter key press");
        equal(find('bm-select bm-options').css('display'), "block", "Options drop down is visible on enter key press");

        return click('bm-select');
      }).then(function() {
        return keyEvent('bm-select', 'keydown', 40);
      }).then(function() {
        equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on down arrow key press");
        equal(find('bm-select bm-options').css('display'), "block", "Options drop down is visible on down arrow key press");
      });
    });


    //Testing aria and keyboard navigation when opening dropdown
    //find('bm-select').focus().trigger(keyDown(13));
    // equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on enter key press");
    // equal(find('bm-select bm-options').css('display'), "block", "Options drop down is visible on enter key press");
    //find('bm-select').click().trigger(keyDown(40));
    // equal(find('bm-select').attr('aria-expanded'), "true", "bm-select aria-expanded is set to true on down arrow key press");
    // equal(find('bm-select bm-options').css('display'), "block", "Options drop down is visible on down arrow key press");

    //Testing aria and keyboard navigation when closing dropdown
    andThen(function() {
      keyEvent('bm-select', 'keydown', 27).then(function() {
        equal(find('bm-select').attr('aria-expanded'), "false", "bm-select aria-expanded is set to false on escape key press");
        equal(find('bm-select bm-options').css('display'), "none", "Options drop down is hidden on escape key press");
      });
    });

    //Check selected bm-option
    andThen(function() {
      var option = find('bm-select').find('bm-option[aria-checked=true]');
      equal(option.text().trim(), "India", "The correct bm-option has been checked");
    });

    //Change selected option.
    var optionValue, selectedOptionValue;
    andThen(function() {

      click('bm-option:eq(1)').then(function() {
        optionValue = find('bm-option:eq(1)').text().trim();
        selectedOptionValue = find('bm-option[aria-checked=true]').text().trim();
        equal(optionValue, selectedOptionValue, "The correct bm-option has been checked after option click");

        return click('bm-select');
      }).then(function() {
        return keyEvent('bm-select', 'keydown', 38);
      }).then(function() {
        return click('bm-option:eq(2)');
      }).then(function() {
        optionValue = find('bm-option:eq(2)').text().trim();
        selectedOptionValue = find('bm-option[aria-checked=true]').text().trim();
        equal(optionValue, selectedOptionValue, "The correct bm-option has been checked after option keyboard navigation");
      });
    });

    //Check if component action is working
    andThen(function() {
      var value = find('#country-value').text();
      equal(value, selectedOptionValue, "The actions from the component are triggered properly on option selection");
    });

    //Ckeck if action triggered is correct when placeholder is clicked
    var actionValue, placeholderValue;
    andThen(function() {
      click('bm-option:eq(0)').then(function() {
        actionValue = find('#country-value').text();
        placeholderValue = '';
        equal(actionValue, placeholderValue, "The actions from the component are triggered properly on placeholder selection");
      });
    });

    //Check if disabled options are not being selectable.
    //The following actions should not make any change to values so we can reuse above tests.
    andThen(function() {
      click('bm-option:eq(4)').then(function() {
        actionValue = find('#country-value').text();
        equal(actionValue, placeholderValue, "Clicking a disabled option does not change the selected value.");
      });
    });

    //Focus to another element and wait for all run loop code to finish before teardown.
    andThen(function() {
      triggerEvent('#dummy-input', 'focus').then(function() {
        //Check if options menu closed after focus set to another element
        equal(find('bm-select').attr('aria-expanded'), "false", "bm-select aria-expanded is set to false on focus set to outside element.");
        equal(find('bm-select bm-options').css('display'), "none", "bm-options is closed when focus is set to outside element.");
      });
    });
  });
});

function keyDown(code) {
    var e = $.Event("keydown");
    e.which = e.keyCode = code;
    return e;
}
