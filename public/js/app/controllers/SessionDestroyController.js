define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.SessionDestroyController = App.ApplicationController.extend({
    resourceUrl: config.host + '/v1/session',

    actions: {
      logout: function() {
        App.Session.reset()

        this.transitionToRoute('session.new')
      }
    }
  })
})
