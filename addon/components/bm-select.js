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

    isOpen: false,

    role: 'listbox',

    ariaMultiselectable: 'false',

    ariaExpanded: function() {
        return this.get('isOpen')+'';
    }.property('isOpen'),

    tabindex: 0,

    value: null,

    options: null,

    selectedOption: null,

    registerOptions: function(options) {
        this.set('options', options);
    },

    selectOption: function(item) {
        this.set('selectedOption', item);
        this.set('value', item.get('value'));
        this.sendAction('action', item.get('data'), item.get('value'));
    },

    toggleOptions: function() {
        if(this.get('isOpen')) {
            this.closeOptions();
        } else {
            this.openOptions();
        }
    }.on('click'),

    openOptions: function() {
        this.set('isOpen', true);
        this.get('options').focusItemAt(this.get('options.selectedIndex'));
    },

    closeOptions: function() {
        this.set('isOpen', false);
        this.set('options.focusIndex', -1);
    },

    navigateOnKeyDown: function(event) {
        switch(event.keyCode) {
            //esc
            case 27:
                this.closeOptions();
                break;

            //up-arrow
            case 38:
                if(this.get('isOpen')) {
                    this.get('options').setPreviousItemFocus(this.get('selectedOption'));
                }
                break;

            //down-arrow
            case 40:
                if(this.get('isOpen')) {
                    this.get('options').setNextItemFocus(this.get('selectedOption'));
                } else {
                    this.openOptions();
                }
                break;

            //enter
            case 13:
                if(this.get('isOpen')) {
                    var index = this.get('options.focusIndex');
                    this.get('options.options').objectAt(index).selectOption();
                    this.closeOptions();
                } else {
                    this.openOptions();
                }
                break;
        }

        event.preventDefault();
    }.on('keyDown')

});