define(["app/app"], function(App) {
  "use strict";

  App.TimelineSubscribersRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('subscriber', params.username)
    }
  })
})
