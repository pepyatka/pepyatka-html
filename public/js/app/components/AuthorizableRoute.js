define(["app/app",
        "ember",
        "config",
        "auth_storage"], function(App, Ember, config, auth_storage) {
  "use strict";

  App.AuthorizableRoute = Ember.Mixin.create({
    beforeModel: function() {
      var p = this.get('session.promise')
      if (!this.get('session.currentUser') && !p)
        return this.transitionTo('session.new')
      else
        return p
    }

  })
})
