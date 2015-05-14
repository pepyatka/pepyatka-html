define(["app/app",
        "components/TransitionalRoute"], function(App) {
  "use strict";

  App.SessionDestroyRoute = Ember.Route.extend(App.TransitionalRoute, {
    setupController: function(controller, model) {
      controller.send('logout')
    }
  })
})
