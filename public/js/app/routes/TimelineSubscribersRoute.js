define(["app/app"], function(App) {
  "use strict";

  App.TimelineSubscribersRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.findQuery('subscriber', params.username)
    }
  })
})
