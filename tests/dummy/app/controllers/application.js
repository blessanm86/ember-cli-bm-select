import Em from "ember";

export default Em.Controller.extend({
    country: '',

    actions: {
        countryChanged: function(data, value) {
            this.set('country', value);
        }
    }
});
