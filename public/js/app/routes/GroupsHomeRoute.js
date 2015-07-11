define(["app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(App) {
  "use strict";

  App.GroupsHomeRoute = Ember.Route.extend(App.TransitionalRoute,
                                           App.AuthorizableRoute, {
  })
})
