define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.TimelinePostController = Ember.Controller.extend({
    commentSortProperties: ['createdAt:asc'],
    comments: Ember.computed.sort('content.comments', 'commentSortProperties'),

    isEdit: false,

    body: Ember.computed.oneWay('model.body'),

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEdit')
      },

      destroy: function() {
        var comment = this.get('model')

        comment.destroyRecord()
          .then(function(comment) {
          })
      },

      update: function() {
        var post = this.get('model')
        var body = this.get('body')

        post.set('body', body)
        post.save()
          .then(function(newComment) {
            this.set('isEdit', false)
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
            if (!this.store.recordIsLoaded('comment', comment.id)) {
              this.get('content.comments').pushObject(comment)
            }
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
      },

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
