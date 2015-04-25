define(["app/app"], function(App) {
  "use strict";

  App.TimelineSubscribersRoute = Ember.Route.extend({
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
