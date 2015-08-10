define(["app/app",
        "ember"], function(App, Ember) {
  "use strict";

  App.TransitionalRoute = Ember.Mixin.create({
    beforeModel: function() {
      this._super.apply(this, arguments)
      this.addThrobber()
    },

    afterModel: function() {
      this._super.apply(this, arguments)
      this.removeThrobber()
    },

    addThrobber: function() {
      Ember.$('body').addClass('transition-active')
    },

    removeThrobber: function() {
      window.scrollTo(0,0)
      Ember.$('body').removeClass('transition-active transition-static')
    }
  })
})
