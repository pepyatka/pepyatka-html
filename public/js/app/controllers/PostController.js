define(["app/app",
        "controllers/PostGenericController",
        "mixins/DynamicTime"], function(App) {
  "use strict";

  App.PostController = App.PostGenericController.extend(App.DynamicTime, {
    maxComments: 'all',

    actions: {
      destroy: function() {
        var that = this
        var post = this.get('model')

        post.destroyRecord()
          .then(function(post) {
            // NOTE: why we need to manually remove deleted post from
            // all timelines? is it because server does not send
            // timelineId or something in post json?
            that.store.all('timeline').forEach(function(timeline) {
              var oldPost = timeline.get('posts').findProperty('id', post.get('id'))
              timeline.get('posts').removeObject(oldPost)
            })
            that.transitionToRoute('timeline.home')
          })
      }
    }
  })
})
