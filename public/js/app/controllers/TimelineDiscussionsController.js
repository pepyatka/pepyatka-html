define(["app/app",
        "ember",
        "components/Pagination"], function(App, Ember) {
  "use strict";

  App.TimelineDiscussionsController = Ember.Controller.extend(App.Pagination, {
    postSortProperties: ['createdAt:desc'],
    posts: Ember.computed.sort('model.posts', 'postSortProperties'),

    didRequestRange: function(options) {
      this.transitionToRoute({ queryParams: { offset: options.offset } })
    },

    actions: {
      create: function() {
        var post = this.store.createRecord('post', {
          body: this.get('body'),
          feeds: Ember.$('#sendToSelect').val()
        })

        this.set('body', '')
        post.save()
          .then(function(post) {
            this.get('content.posts').pushObject(post)
          }.bind(this))
      }
    }
  })
})
