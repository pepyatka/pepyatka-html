define(["app/app",
        "components/TransitionalRoute",
        "components/AuthorizableRoute"], function(App) {
  "use strict";

  App.SettingsRoute = Ember.Route.extend(App.TransitionalRoute,
                                         App.AuthorizableRoute, {
    beforeModel: function() {
      this._super.apply(this, arguments)
      if (!this.get('session.currentUser'))
        return this.transitionTo('session.new')
    },

    model: function() {
      return this.get('session.currentUser')
    }
  })
})
