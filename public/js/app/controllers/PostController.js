define(["app/app"], function(App) {
  App.PostController = Ember.ObjectController.extend({
    actions: {
      update: function(attrs) {
        // FIXME: the only way to fetch context after insertNewLine action
        if (attrs.constructor === App.EditPostField)
          attrs = { body: attrs.value }

        var postId = this.get('id')

        App.Post.update(postId, attrs)
      },

      like: function() {
        var postId = this.get('content.id')
        App.Post.like(postId)
      },

      unlike: function() {
        var postId = this.get('content.id')
        App.Post.unlike(postId)
      },

      kill: function() {
        var postId = this.get('content.id')
        App.Post.kill(postId)
      },

      hide: function() {
        var postId = this.get('content.id')
        App.Post.hide(postId)
      },

      unhide: function() {
        var postId = this.get('content.id')
        App.Post.unhide(postId)
      }
    },

    isRiverOfNews: function() {
      var pc = this.parentController
      if (pc != null && pc.constructor.toString() == "App.TimelineController") {
        return pc.get("content.name") == "River of news"
      }
      return false
    },

    canHide: function() {
      return this.isRiverOfNews() && !this.get('content.isHidden')
    }.property(),

    canUnhide: function() {
      return this.isRiverOfNews() && this.get('content.isHidden')
    }.property()
  })
});
