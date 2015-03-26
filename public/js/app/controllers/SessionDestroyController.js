define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.SessionDestroyController = Ember.Controller.extend({
    resourceUrl: config.host + '/v1/session',

    actions: {
      logout: function() {
        App.Session.reset()

        this.transitionToRoute('session.new')
      }
    }
  })
})
