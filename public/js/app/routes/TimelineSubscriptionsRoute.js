define(["app/app",
        "components/CustomErrorRoute"], function(App) {
  "use strict";

  App.TimelineSubscriptionsRoute = Ember.Route.extend(App.CustomErrorRoute, {
    model: function(params) {
      return this.store.findQuery('subscription', params.username)
    }
  })
})
