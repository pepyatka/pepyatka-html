define(["app/app"], function(App) {
  "use strict";

  App.SettingsRoute = Ember.Route.extend({
    beforeModel: function() {
      if (!this.get('session.currentUser'))
        return this.transitionTo('session.new')
    },

    model: function() {
      return this.get('session.currentUser')
    }
  })
})
