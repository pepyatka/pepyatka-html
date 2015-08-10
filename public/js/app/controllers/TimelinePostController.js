define(["app/app",
        "controllers/PostGenericController",
        "mixins/DynamicTime"], function(App) {
  "use strict";

  App.TimelinePostController = App.PostGenericController.extend(App.DynamicTime, {
    actions: {
      hide: function() {
        var post = this.get('model')

        post.hide()
          .then(function() {
          })
      },

      unhide: function() {
        var post = this.get('model')

        post.unhide()
          .then(function() {
          })
      }
    }
  })
})
