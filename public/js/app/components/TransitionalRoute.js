define(["app/app",
        "ember"], function(App, Ember) {
  "use strict";

  App.TransitionalRoute = Ember.Mixin.create({

    beforeModel: function() {
      this._super()
      Ember.$('body').addClass('transition-active')
    },

    afterModel: function() {
      this._super()
      window.scrollTo(0,0)
      Ember.$('body').removeClass('transition-active transition-static')
    }

  })
})
