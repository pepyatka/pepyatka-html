define(["app/app",
        "components/TransitionalRoute"], function(App) {
  "use strict";

  App.NotFoundRoute = Ember.Route.extend(App.TransitionalRoute, {
  })
})
