define(["app/app"], function(App) {
  "use strict";

  App.TimelineHomeRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('timeline', 'home')
    }
  })
})
