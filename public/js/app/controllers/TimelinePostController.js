define(["app/app",
        "controllers/PostGenericController"], function(App) {
  "use strict";

  App.TimelinePostController = App.PostGenericController.extend({
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
