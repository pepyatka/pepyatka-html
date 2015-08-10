define(["app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(App) {
  "use strict";

  App.SettingsIndexRoute = Ember.Route.extend(App.TransitionalRoute, App.AuthorizableRoute, {
    model: function() {
      return this.get('session.currentUser')
    },

    setupController: function(controller, model) {
      controller.set('model', model)

      controller.set('errors', null)
      controller.set('message', null)
    }
  })
})
