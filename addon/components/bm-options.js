import Em from 'ember';

export default Em.Component.extend({

  tagName: 'bm-options',

  attributeBindings: [
    'ariaHidden:aria-hidden'
  ],

  /**
   * Tells screenreaders whether this component is visible.
   *
   * @property 'ariaHidden'
   * @type String
   * @private
   */
  ariaHidden: Em.computed('isVisible', function() {
    return !this.get('isVisible')+'';
  }),

  /**
   * This flag is set to true/false based on whether the dropdown is
   * opened/closed.
   *
   * @property isVisible
   * @type Boolean
   */
  isVisible: Em.computed.alias('parentView.isOpen'),

  /**
   * Reference to the BmSelectComponent instance.
   *
   * @property select
   * @type BmSelect
   */
  select: Em.computed.alias('parentView'),

  /**
   * Reference to the selected BmOptionComponent instance.
   *
   * @property selectedOption
   * @type BmOption
   */
  selectedOption: Em.computed.alias('parentView.selectedOption'),

  /**
   * Storage for all BmOption components, facilitating keyboard navigation.
   *
   * @property options
   * @type ArrayProxy
   */
  options: null,

  /**
   * Tracks the index of the focussed option so we can move between previous/next.
   *
   * @property focusIndex
   * @type Number
   */
  focusIndex: -2,

  /**
   * Reference to the selected BmOptionComponent instance's index.
   *
   * @property selectedIndex
   * @type Number
   */
  selectedIndex: Em.computed('selectedOption', function() {
    return this.get('options').indexOf(this.get('selectedOption'));
  }),

  /**
   * Creates the options ArrayProxy on init (otherwise would be shared by every
   * instance)
   *
   * @private
   */
  setDefaults: Em.on('init', function() {
    this.set('options', Em.ArrayProxy.create({content: Em.A()}));
  }),

  /**
   * Registers this options with the BmSelectComponent instance.
   *
   * @method registerWithSelect
   */
  registerWithSelect: Em.on('willInsertElement', function() {
    this.get('select').registerOptions(this);
  }),

  /**
   * Register the BmOptionComponent instance.
   *
   * @method registerOption
   */
  registerOption: function(item) {
    this.get('options').addObject(item);
  },

  /**
   * Remove the BmOptionComponent instance.
   *
   * @method unregisterOption
   */
  unregisterOption: function(item) {
    this.get('options').removeObject(item);
  },

  /**
   * Sets the focus to the previous item based on the current focus index.
   *
   * @method setPreviousItemFocus
   */
  setPreviousItemFocus: function() {
    var index = this.get('focusIndex') - 1;
    if (index === -1) { index = this.get('options.length') - 1; }
    this.focusItemAt(index);
  },

  /**
   * Sets the focus to the next item based on the current focus index.
   *
   * @method setNextItemFocus
   */
  setNextItemFocus: function() {
    var index = this.get('focusIndex') + 1;
    if (index === this.get('options.length')) { index = 0; }
    this.focusItemAt(index);
  },

  /**
   * Sets the focus to the option at the passed in index.
   *
   * @method focusItemAt
   */
  focusItemAt: function(index) {
    if(index === -1) { index = 0; }
    this.set('focusIndex', index);
    Em.run.schedule('afterRender', this, function() {
      this.get('options').objectAt(index).$().focus();
    });
  }

});
