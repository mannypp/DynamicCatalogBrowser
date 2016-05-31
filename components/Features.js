var Features = (function () {
    var instance;
 
    function createInstance() {
        return {
            _features: [],

            getFeatures: function() {
                return this._features;
            },

            addFeature: function(newFeature) {
                this.getFeatures().push(newFeature);
            },

            addFeatures: function(newFeatures) {
                this._features = this.getFeatures().concat(newFeatures);
            },

            hasFeature: function(feature) {
                return this.getFeatures().indexOf(feature) > -1;
            }
        };
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = Features;
