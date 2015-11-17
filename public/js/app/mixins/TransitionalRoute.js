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
      Ember.run.schedule('afterRender', this, function() {
        this.setScrollPosition()
      })
    },

    addThrobber: function() {
      Ember.$('body').addClass('transition-active')
    },

    removeThrobber: function() {
      Ember.$('body').removeClass('transition-active transition-static')
    },

    setScrollPosition: function() {
      var scrollPosition = 0;

      if (window.location.hash) {
        var domElement = Ember.$(window.location.hash)
        if (domElement && domElement.offset() && domElement.offset().top) {
          scrollPosition = domElement.offset().top
        }
      }

      window.scrollTo(0, scrollPosition)
    }
  })
})
