import Em from 'ember';

export default Em.Component.extend({

  tagName: 'bm-select',

  classNameBindings: ['isOpen'],

  attributeBindings: [
    'role',
    'ariaMultiselectable:aria-multiselectable',
    'ariaExpanded:aria-expanded',
    'tabindex',
    'value'
  ],

  /**
   * This flag is set to true/false based on whether the dropdown is
   * opened/closed.
   *
   * @property isOpen
   * @type Boolean
   */
  isOpen: false,

  /**
   * See http://www.w3.org/TR/wai-aria/roles#listbox
   *
   * @property role
   * @type String
   * @private
   */
  role: 'listbox',

  /**
   * Tells screenreaders whether this widget allows multiple selection.
   *
   * @property 'ariaMultiselectable'
   * @type String
   * @private
   */
  ariaMultiselectable: 'false',

  /**
   * Tells screenreaders whether this widget can be expanded.
   *
   * @property 'ariaExpanded'
   * @type String
   * @private
   */
  ariaExpanded: function() {
    return this.get('isOpen')+'';
  }.property('isOpen'),

  /**
   * Allows the component to get focus on tab press.
   *
   * @property tabindex
   * @type Number
   */
  tabindex: 0,

  /**
   * The value of the selected option. Must be a primitive value.
   *
   * @property value
   */
  value: null,

  /**
   * Reference to the BmOptionsComponent instance.
   *
   * @property options
   * @type BmOptions
   */
  options: null,

  /**
   * Reference to the selected BmOptionComponent instance.
   *
   * @property selectedOption
   * @type BmOption
   */
  selectedOption: null,

  /**
   * Register the BmOptionsComponent instance.
   *
   * @method registerOptions
   */
  registerOptions: function(options) {
    this.set('options', options);
  },

  /**
   * Select an option.
   *
   * @method selectOption
   */
  selectOption: function(item) {
    this.set('selectedOption', item);
    this.set('value', item.get('value'));
    this.sendAction('action', item.get('data'), item.get('value'));
  },

  /**
   * Toggles the dropdown, bound to click.
   *
   * @method toggleOptions
   */
  toggleOptions: function() {
    if(this.get('isOpen')) {
      this.closeOptions();
    } else {
      this.openOptions();
    }
  }.on('click'),

  /**
   * Opens the dropdown.
   *
   * @method openOptions
   */
  openOptions: function() {
    this.set('isOpen', true);
    this.get('options').focusItemAt(this.get('options.selectedIndex'));
  },

  /**
   * Closes the dropdown.
   *
   * @method closeOptions
   */
  closeOptions: function(options) {
    options = options || { focus: true};

    this.set('isOpen', false);
    this.set('options.focusIndex', -1);

    //set focus back to bm-select on dropdown close.
    //dont do this if focussing out or click outside.
    if(options.focus) {
      Em.run.schedule('afterRender', this, function() {
        this.$().focus();
      });
    }
  },

  /**
   * Closes the dropdown when focus changes to another element outside
   * or if focus lost by clicking outside. Bound to focusOut.
   *
   * @method lostFocus
   */
  lostFocus: function() {
    if(this.get('isOpen')) {
      Em.run.later(this, function() {
        var focussedElement = document.activeElement;
        var target = this.$();
        if (target) {
          var isFocussedOut = target.has(focussedElement).length === 0 && !this.$().is(focussedElement);

          if(isFocussedOut) {
            this.closeOptions({focus:false});
          }
        }
      }, 0);
    }
  }.on('focusOut'),

  /**
   * Handles the keydown event once the component gains focus.
   * Bound to keydown.
   *
   * @method navigateOnKeyDown
   */
  navigateOnKeyDown: function(event) {
    var handled = false;

    switch(event.keyCode) {
      //esc
      case 27:
        this.closeOptions();
        handled = true;
        break;

      //up-arrow
      case 38:
        if(this.get('isOpen')) {
          this.get('options').setPreviousItemFocus(this.get('selectedOption'));
        }
        handled = true;
        break;

      //down-arrow
      case 40:
        if(this.get('isOpen')) {
          this.get('options').setNextItemFocus(this.get('selectedOption'));
        } else {
          this.openOptions();
        }
        handled = true;
        break;

      //enter
      case 13:
        if(this.get('isOpen')) {
          var index = this.get('options.focusIndex');
          var option = this.get('options.options').objectAt(index);
          option.selectOption(event);
          if(!option.get('isDisabled')) {
            this.closeOptions();
          }
        } else {
          this.openOptions();
        }
        handled = true;
        break;
    }

    if(handled) {
      event.preventDefault();
    }
  }.on('keyDown')

});