define(["app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(App) {
  "use strict";

  App.GroupsNewRoute = Ember.Route.extend(App.TransitionalRoute, App.AuthorizableRoute, {
  })
})
