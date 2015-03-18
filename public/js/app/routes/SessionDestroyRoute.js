define(["app/app"], function(App) {
  "use strict";

  App.SessionDestroyRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      controller.send('logout')
    }
  })
})
