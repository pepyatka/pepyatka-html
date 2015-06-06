define(["app/app",
        "components/TransitionalRoute",
        "components/AuthorizableRoute"], function(App) {
  "use strict";

  App.SettingsFeedRoute = Ember.Route.extend(App.TransitionalRoute,
                                             App.AuthorizableRoute, {
    beforeModel: function() {
      this._super.apply(this, arguments)
      if (!this.get('session.currentUser'))
        return this.transitionTo('session.new')
    },

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
