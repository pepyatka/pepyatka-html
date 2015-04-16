define(["app/app"], function(App) {
  "use strict";

  App.SettingsFeedRoute = Ember.Route.extend({
    beforeModel: function() {
      if (!this.get('session.currentUser'))
        return this.transitionTo('session.new')
    },

    model: function(params) {
      return this.store.findOneQuery('user', params.username)
    }
  })
})
