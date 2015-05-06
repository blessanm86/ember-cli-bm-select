import Em from 'ember';

export default Em.Component.extend({

  tagName: 'bm-option',

  attributeBindings: [
    'role',
    'ariaChecked:aria-checked',
    'ariaDisabled:aria-disabled',
    'tabindex',
    'value',
    'data',
    'key',
    'isDisabled'
  ],

  /**
   * See http://www.w3.org/TR/wai-aria/roles#option
   *
   * @property role
   * @type String
   * @private
   */
  role: 'option',

  /**
   * Tells screenreaders whether this component is selected.
   *
   * @property 'ariaHidden'
   * @type String
   * @private
   */
  ariaChecked: Em.computed('isSelected', function() {
    return this.get('isSelected')+'';
  }),

  ariaDisabled: Em.computed('isDisabled', function() {
    return Boolean(this.get('isDisabled')).toString();
  }),

  isDisabled: false,

  /**
   * Allows the component to get focus on tab press.
   *
   * @property tabindex
   * @type Number
   */
  tabindex: Em.computed('isFocused', function() {
    return this.get('isFocused')? 0 : -1;
  }),

  /**
   * The value of the this option. Must be a primitive value.
   *
   * @property value
   */
  value: null,

  /**
   * The data object of the this option. Will be same as value if value is
   * specified.
   *
   * @property data
   * @type Object
   */
  data: null,

  /**
   * The key in the data object in the value for this component can be accessed.
   *
   * @property key
   * @type String
   */
  key: '',

  /**
   * Reference to the BmSelectComponent instance.
   *
   * @property select
   * @type BmSelect
   */
  select: Em.computed.alias('parentView.parentView'),

  /**
   * Reference to the BmOptionsComponent instance.
   *
   * @property options
   * @type BmOptions
   */
  options: Em.computed.alias('parentView'),

  /**
   * The index of this option in the BmOptionsComponent instance.
   *
   * @property index
   * @type Number
   */
  index: Em.computed('options.options.@each', function() {
    return this.get('options.options').indexOf(this);
  }),

  /**
   * Whether this option is selected or not.
   *
   * @property isSelected
   * @type Boolean
   */
  isSelected: Em.computed('select.selectedOption', function() {
    return this.get('select.selectedOption') === this;
  }),

  /**
   * Whether this option is focussed or not.
   *
   * @property isFocused
   * @type Boolean
   */
  isFocused: Em.computed('options.focusIndex', function() {
    return this.get('options.focusIndex') === this.get('index');
  }),

  /**
   * Set the value and data property based on what is set.
   * If value is set, the data is set to be the same.
   * If data and key are set, the value is set to be data.get(key)
   *
   * @method setValueBasedOnKey
   * @private
   */
  setValueBasedOnKey: Em.on('init', function() {
    //Array of primitive values are the items. So value is already set.
    //Setting data same as value
    if(this.get('value')) {
      this.set('data', this.get('value'));
    } else {
      //Array of objects are the items. So need to get actual value.
      var key = 'data.' + this.get('key');
      this.set('value', this.get(key));
    }
  }),

  /**
   * Registers this option with the BmOptionsComponent instance.
   *
   * @method registerWithOptions
   */
  registerWithOptions: Em.on('willInsertElement', function() {
    this.get('options').registerOption(this);
  }),

  /**
   * Remove this option with the BmOptionsComponent instance.
   *
   * @method unregisterWithOptions
   */
  unregisterWithOptions: Em.on('willDestroyElement', function() {
    this.get('options').unregisterOption(this);
  }),

  /**
   * Observe the passed in selected value in the BmSelect component and update
   * references and selections.
   *
   * @method selectFromSelectValue
   */
  selectFromSelectValue: function() {
    //Ignore if already selected
    if(this.get('isSelected')) { return; }

    if(this.get('select.value') === this.get('value')) {
      this.selectOption();
    }
  }.observes('select.value').on('willInsertElement'),

  /**
   * Select an option. Bound to click.
   *
   * @method selectOption
   */
  selectOption: Em.on('click', function() {
    if(!this.get('isDisabled')) {
      this.get('select').selectOption(this);
    } else {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  })

});
