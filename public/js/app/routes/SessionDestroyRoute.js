define(["app/app",
        "components/TransitionalRoute",
        "components/AuthorizableRoute"], function(App) {
  "use strict";

  App.SessionDestroyRoute = Ember.Route.extend(App.TransitionalRoute,
                                               App.AuthorizableRoute, {
    setupController: function(controller, model) {
      controller.send('logout')
    }
  })
})
