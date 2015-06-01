define(["app/app",
        "components/TransitionalRoute",
        "components/AuthorizableRoute"], function(App) {
  "use strict";

  App.GroupsHomeRoute = Ember.Route.extend(App.TransitionalRoute,
                                           App.AuthorizableRoute, {
  })
})
