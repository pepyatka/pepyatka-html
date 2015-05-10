define(["app/app",
        "components/TransitionalRoute"], function(App) {
  "use strict";

  App.TimelineSubscriptionsRoute = Ember.Route.extend(App.TransitionalRoute, {
    actions: {
      error: function (error) {
        this.transitionTo('not-found')
      }
    },

    model: function(params) {
      return this.store.findQuery('subscription', params.username)
    }
  })
})
