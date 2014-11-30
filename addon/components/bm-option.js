import Em from 'ember';

export default Em.Component.extend({
    
    tagName: 'bm-option',

    attributeBindings: [
        'role',
        'ariaChecked:aria-checked',
        'tabindex',
        'value',
        'data',
        'key'
    ],

    role: 'option',

    ariaChecked: function() {
        return this.get('isSelected')+'';
    }.property('isSelected'),

    tabindex: function() {
        return this.get('isFocused')? 0 : -1;
    }.property('isFocused'),

    value: null,

    data: null,

    key: '',

    select: Em.computed.alias('parentView.parentView'),

    options: Em.computed.alias('parentView'),

    index: function() {
        return this.get('options.options').indexOf(this);
    }.property('options.options.@each'),

    isSelected: function() {
        return this.get('select.selectedOption') === this;
    }.property('select.selectedOption'),

    isFocused: function() {
        return this.get('options.focusIndex') === this.get('index');
    }.property('options.focusIndex'),

    setValueBasedOnKey: function() {
        //Array of primitive values are the items. So value is already set.
        if(this.get('value')) return;

        //Array of objects are the items. So need to get actual value.
        var key = 'data.' + this.get('key');
        this.set('value', this.get(key));
    }.on('init'),

    registerWithOptions: function() {
        this.get('options').registerOption(this);
    }.on('willInsertElement'),

    unregisterWithOptions: function() {
        this.get('options').unregisterOption(this);
    }.on('willDestroyElement'),

    selectFromSelectValue: function() {
        //Ignore if already selected
        if(this.get('isSelected')) return;
    
        if(this.get('select.value') == this.get('value')) {
            this.selectOption();
        }
    }.observes('select.value').on('didInsertElement'),

    selectOption: function() {
        this.get('select').selectOption(this);
    }.on('click')

});