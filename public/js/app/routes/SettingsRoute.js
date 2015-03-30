define(["app/app"], function(App) {
  "use strict";

  App.SettingsRoute = Ember.Route.extend({
    model: function() {
      return this.get('session.currentUser')
    }
  })
})
