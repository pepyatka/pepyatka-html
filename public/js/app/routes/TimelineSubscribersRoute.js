define(["app/app",
        "mixins/CustomErrorRoute"], function(App) {
  "use strict";

  App.TimelineSubscribersRoute = Ember.Route.extend(App.CustomErrorRoute, {
    model: function(params) {
      return this.store.findQuery('subscriber', params.username)
    }
  })
})
