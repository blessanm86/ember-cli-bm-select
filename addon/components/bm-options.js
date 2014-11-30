import Em from 'ember';

export default Em.Component.extend({
    
    tagName: 'bm-options',

    attributeBindings: [
        'ariaHidden:aria-hidden'
    ],

    ariaHidden: function() {
        return !this.get('isVisible')+'';
    }.property('isVisible'),

    isVisible: Em.computed.alias('parentView.isOpen'),

    select: Em.computed.alias('parentView'),

    selectedOption: Em.computed.alias('parentView.selectedOption'),

    options: [],

    focusIndex: -2,

    selectedIndex: function() {
        return this.get('options').indexOf(this.get('selectedOption'));
    }.property('selected'),

    registerWithSelect: function() {
        this.get('select').registerOptions(this);
    }.on('didInsertElement'),

    registerOption: function(item) {
        this.get('options').addObject(item);
    },

    unregisterOption: function(item) {
        this.get('options').removeObject(item);
    },

    setPreviousItemFocus: function() {
        var index = this.get('focusIndex') - 1;
        if (index == -1) { index = this.get('options.length') - 1; }
        this.focusItemAt(index);
    },

    setNextItemFocus: function() {
        var index = this.get('focusIndex') + 1;
        if (index == this.get('options.length')) { index = 0; }
        this.focusItemAt(index);
    },

    focusItemAt: function(index) {
        this.set('focusIndex', index);
        Ember.run.schedule('afterRender', this, function() {
            this.get('options').objectAt(index).$().focus();
        });
    }

});