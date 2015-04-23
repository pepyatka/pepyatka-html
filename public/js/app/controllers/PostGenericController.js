define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  // "Abstract" generic controller for posts
  App.PostGenericController = Ember.Controller.extend({
    // NOTE: this code doesn't work reliably, see
    // https://github.com/emberjs/ember.js/issues/10343
    //commentSortProperties: ['createdAt:asc'],
    //comments: Ember.computed.sort('content.comments', 'commentSortProperties'),

    comments: function() {
      return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        sortProperties: ['createdAt'],
        sortAscending: true,
        content: this.get('content.comments')
      })
    }.property('model.posts'),

    isEdit: false,

    body: Ember.computed.oneWay('model.body'),

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEdit')
      },

      create: function() {
        var comment = this.store.createRecord('comment', {
          body: this.get('newComment'),
          postId: this.get('content.id')
        })

        this.set('newComment', '')
        comment.save()
          .then(function(comment) {
            var object = this.get('content.comments').findProperty('id', comment.get('id'))
            if (!object) {
              this.get('content.comments').pushObject(comment)
            }
          }.bind(this))
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

      destroy: function() {
        var comment = this.get('model')

        comment.destroyRecord()
          .then(function(comment) {
          })
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
