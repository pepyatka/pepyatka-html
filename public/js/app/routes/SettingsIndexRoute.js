define(["config",
        "app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(config, App) {
  "use strict";

  App.SettingsIndexRoute = Ember.Route.extend(App.TransitionalRoute, App.AuthorizableRoute, {
    model: function() {
      return this.get('session.currentUser')
    },

    afterModel: function(model) {
      this._super.apply(this, arguments)

      var title =
        'Settings - ' +
        config.siteName

      $(document).attr('title', title)
    },

    setupController: function(controller, model) {
      controller.set('model', model)

      controller.set('errors', null)
      controller.set('message', null)
    }
  })
})
