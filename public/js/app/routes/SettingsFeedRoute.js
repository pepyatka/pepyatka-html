define(["app/app",
        "mixins/TransitionalRoute",
        "mixins/AuthorizableRoute"], function(App) {
  "use strict";

  App.SettingsFeedRoute = Ember.Route.extend(App.TransitionalRoute, App.AuthorizableRoute, {
    model: function(params) {
      return this.store.findOneQuery('user', params.username)
    },

    setupController: function(controller, model) {
      controller.set('model', model)

      controller.set('errors', null)
      controller.set('message', null)
    }
  })
})
