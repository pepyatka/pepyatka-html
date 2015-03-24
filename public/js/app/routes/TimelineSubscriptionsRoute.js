define(["app/app"], function(App) {
  "use strict";

  App.TimelineSubscriptionsRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.findQuery('subscription', params.username)
    }
  })
})
