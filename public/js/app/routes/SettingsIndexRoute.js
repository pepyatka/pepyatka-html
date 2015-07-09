define(["app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(App) {
  "use strict";

  App.SettingsIndexRoute = Ember.Route.extend(App.TransitionalRoute,
                                         App.AuthorizableRoute, {
    beforeModel: function() {
      this._super.apply(this, arguments)
      if (!this.get('session.currentUser'))
        return this.transitionTo('session.new')
    },

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
