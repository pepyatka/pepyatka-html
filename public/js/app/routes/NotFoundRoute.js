define(["app/app",
        "mixins/TransitionalRoute"], function(App) {
  "use strict";

  App.NotFoundRoute = Ember.Route.extend(App.TransitionalRoute, {
  })
})
