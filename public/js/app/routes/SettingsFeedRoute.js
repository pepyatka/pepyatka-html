define(["app/app",
        "components/TransitionalRoute"], function(App) {
  "use strict";

  App.SettingsFeedRoute = Ember.Route.extend(App.TransitionalRoute, {
    beforeModel: function() {
      this._super.apply(this, arguments)
      if (!this.get('session.currentUser'))
        return this.transitionTo('session.new')
    },

    model: function(params) {
      return this.store.findOneQuery('user', params.username)
    }
  })
})
