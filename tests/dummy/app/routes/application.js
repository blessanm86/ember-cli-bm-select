import Em from "ember";

export default Em.Route.extend({
    model: function() {
        return {
            title: 'BM Ember Select Box',
            countriesArr: Em.A(['France', 'Germany', 'India', 'China']),
            countriesObj: Em.A([{name:'France'}, {name:'Germany'}, {name:'India'}, {name:'China', disabled: true}])
        };
    },
    setupController: function(controller, model) {
        this._super(controller, model);
        controller.set('selectedCountry', Em.get(model, 'countriesObj.2.name'));
    }
});
