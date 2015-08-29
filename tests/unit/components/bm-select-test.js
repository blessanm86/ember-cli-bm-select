// import { test, moduleForComponent } from 'ember-qunit';
// import startApp from '../../helpers/start-app';
// import Ember from 'ember';

// var App;

// moduleForComponent('bm-select', 'BmSelectComponent', {
//   needs: [
//     'component:bm-selected', 
//     'component:bm-options',
//     'component:bm-option'
//   ],

//   setup: function() {
//     App = startApp();
//   },
//   teardown: function() {
//     Ember.run(App, 'destroy');
//   }
// });

// test('is a bm-select tag', function() {
//   //var value = 'India';
//   //var countriesArr = ['France', 'Germany', 'India', 'China'];
//   //var countriesObj = [{name:'France'}, {name:'Germany'}, {name:'India'}, {name:'China'}];
//   var context = Ember.ObjectController.create({
//       title: 'BM Ember Select Box',
//       countriesArr: ['France', 'Germany', 'India', 'China'],
//       countriesObj: [{name:'France'}, {name:'Germany'}, {name:'India'}, {name:'China'}],
//       selectedCountry: 'India'
//   });
  
  

//   var component = this.subject({
//     context: context,
//     value: context.get('selectedCountry'),
//     action: 'countryChanged',
//     template: Ember.Handlebars.compile(
//       '{{#bm-selected}}' +
//           '{{selectedCountry}}' +
//       '{{/bm-selected}}' +
                
//       '{{#bm-options}}' +                    
//         '{{#each item in countriesObj}}' +
//           '{{#bm-option data=item key="name"}}' +
//             '{{item.name}}' +
//           '{{/bm-option}}' +
//         '{{/each}}' +
//       '{{/bm-options}}'
//     )
//   });

//   //Renders the component. After that its cached.
//   this.$();

//   equal('bm-select', this.$().prop('tagName').toLowerCase());
// });

