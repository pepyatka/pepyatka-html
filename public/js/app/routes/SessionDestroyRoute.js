define(["app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(App) {
  "use strict";

  App.SessionDestroyRoute = Ember.Route.extend(App.TransitionalRoute,
                                               App.AuthorizableRoute, {
    setupController: function(controller, model) {
      controller.send('logout')
    }
  })
})
