# ember-cli-bm-select

[![Build Status](https://travis-ci.org/blessenm/ember-cli-bm-select.svg)](https://travis-ci.org/blessenm/ember-cli-bm-select)

bm-select is an ember addon component that provides the functionality of a select box.
It allows you to specify templates for both the options and the selected option. It supports keyboard navigation and WAI-ARIA guidelines.

## Demo
http://blessanmathew.com/ember-cli-bm-select

## Installation

```
npm install ember-cli-bm-select --save-dev
```

## Usage

You know are given 4 components which needed to be used together for the addon to work

* bm-select
* bm-selected
* bm-options
* bm-option


```
{{#bm-select value=selectedCountry action="countrySelected"}}
  {{#bm-selected}}
    {{selectedCountry}}
  {{/bm-selected}}

  {{#bm-options}}
    {{#each item in countriesObj}}
      {{#bm-option data=item key="name"}}
        {{item.name}}
      {{/bm-option}}
    {{/each}}
  {{/bm-options}}
{{/bm-select}}
```

1. __bm-select__
   It is the parent component. It can take 2 options - value and action.
   * `value (required)` The value of the selected option. Must be a primitive type like string or integer.
   * `action (optional)` The name of the action which will be triggered when the selection has changed.

2. __bm-selected__
   This component should be a direct child of `bm-select`. It should be used as a block component where you specify how the selected value should be rendered once the selection is made. The template data use to render is taken from the controller used by bm-select.

3. __bm-options__
   This component should be a direct child of `bm-select`.

4. __bm-option__
   This component should be a direct child of 'bm-options'. This should be used as a block component where you specify how the option should be rendered. The template data comes from the parent context. This componenets take 3 options - value, data and key. __Either the value or data,key pair should be specified for the component__.
   * `value (optional)` - The value of the option. Must be a primitive type like string or integer.
   * `data (optional)` - A object that contains the data for the option in which one proerty will hold the value for the option. Must be an object.
   * `key (optional)` - This is the key on the data object in which the value can be accessed.
   When data,key combination is given, the value will be taken like value = data.get(key); Must be a string.

###Keyboard Support
You can interact with the component using the keyboard. Once the component has focus you can use the down arrow or enter button to open the options dropdown.

While the dropdown is open you can use the up and down arrow key to move focus between the different options.

While focus is on an option, you can press enter to select that option.

You can press the escape button to close the dropdown.

##Issues Or Contributions

* Post issues/enhancements in the github issue tracker.
*  My email is blessenm@gmail.com
*  Pull requests are welcome.
*  [__Follow Me On Twitter__](https://twitter.com/blessenm86 "Follow Me On Twitter")
*  [__LinkedIn Pofile__](http://in.linkedin.com/pub/blessan-mathew/24/605/730 "LinkedIn Profie")
*  [__Stack Overflow Pofile__](http://stackoverflow.com/users/548568/blessenm "Stack Overflow Pofile")
