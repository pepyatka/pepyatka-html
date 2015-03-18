define(["app/app"], function(App) {
  "use strict";

  App.TimelineRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('timeline', 'home')
    }
  })
})
