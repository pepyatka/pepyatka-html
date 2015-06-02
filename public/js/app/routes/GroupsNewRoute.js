define(["app/app",
        "components/TransitionalRoute",
        "components/AuthorizableRoute"], function(App) {
  "use strict";

  App.GroupsNewRoute = Ember.Route.extend(App.TransitionalRoute,
                                          App.AuthorizableRoute, {
  })
})
