var Events = (function () {
    var instance;
 
    function createInstance() {
        return {
            _globalEventListeners: {},

            addGlobalEventListener: function(eventName, handler, context) { // context is optional
                if (!this._globalEventListeners[eventName]) {
                    this._globalEventListeners[eventName] = [];
                }
                this._globalEventListeners[eventName].push({handler: handler, context: context});
            },

            fireGlobalEvent: function(eventName, data) {
                var eventListeners = this._globalEventListeners[eventName];
                if (eventListeners && eventListeners.length > 0) {
                    for (var i = 0; i < eventListeners.length; i++) {
                        if (eventListeners[i].context) {
                            eventListeners[i].handler.call(eventListeners[i].context, data);
                        }
                        else {
                            eventListeners[i].handler(data);
                        }
                    }
                }
                else {
                    console.log("No event listeners present for event: " + eventName);
                }
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

module.exports = Events;
