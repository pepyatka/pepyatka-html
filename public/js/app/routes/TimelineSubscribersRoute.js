define(["app/app",
        "components/TransitionalRoute"], function(App) {
  "use strict";

  App.TimelineSubscribersRoute = Ember.Route.extend(App.TransitionalRoute, {
    actions: {
      error: function (error) {
        this.transitionTo('not-found')
      }
    },

    model: function(params) {
      return this.store.findQuery('subscriber', params.username)
    }
  })
})
