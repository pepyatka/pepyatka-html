define(["app/app",
        "ember"], function(App, Ember) {
  "use strict";

  App.AuthorizableRoute = Ember.Mixin.create({
    beforeModel: function() {
      this._super.apply(this, arguments)
      if (!this.get('session.currentUser'))
        return this.transitionTo('session.new')
    }
  })
})
