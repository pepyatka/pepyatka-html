define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.PostController = Ember.Controller.extend({
    commentSortProperties: ['createdAt:asc'],
    comments: Ember.computed.sort('content.comments', 'commentSortProperties'),

    body: Ember.computed.oneWay('model.body'),

    actions: {
      update: function() {
        var post = this.get('model')
        var body = this.get('body')

        post.set('body', body)
        post.save()
          .then(function(newComment) {
          }.bind(this))
      },

      create: function() {
        var comment = this.store.createRecord('comment', {
          body: this.get('newComment'),
          postId: this.get('content.id')
        })

        this.set('newComment', '')
        comment.save()
          .then(function(comment) {
          }.bind(this))
      },

      like: function() {
        var post = this.get('model')

        post.like()
          .then(function() {
            var user = this.get('session.currentUser')
            this.get('content.likes').pushObject(user)
          }.bind(this))
      },

      unlike: function() {
        var post = this.get('model')

        post.unlike()
          .then(function() {
            var like = this.get('content.likes').findProperty('id', this.get('session.currentUser.id'))
            this.get('content.likes').removeObject(like)
          }.bind(this))
      }
    }
  })
})
