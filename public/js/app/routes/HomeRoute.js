define(["app/app"], function(App) {
  "use strict";

  App.HomeRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('timeline', 'home');
    }
  });
})
