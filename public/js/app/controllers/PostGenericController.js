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

    isLiked: function() {
      return this.get('model.likes').isAny('id', this.get('session.currentUser.id'))
    }.property('model.likes', 'session.currentUser.id'),

    hasOmittedComments: function() {
      return this.get('model.omittedComments') > 0
        || this.get('isLoadingComments') === true
    }.property('model.omittedComments', 'isLoadingComments'),

    omittedComments: function() {
      if (this.get('isLoadingComments')) {
        return this.get('omittedCommentsOld')
      } else {
        if (this.get('model.omittedComments') > 0)
          return this.get('model.omittedComments') + this.get('model.comments.length') - 2
      }
    }.property('model.omittedComments', 'model.comments.length', 'isLoadingComments'),

    hasOmittedLikes: function() {
      return this.get('maxLikes') != 'all' &&
        (this.get('model.omittedLikes') != 0 ||
         this.get('model.likes.length') > 4)
        || this.get('isLoadingLikes') === true
    }.property('maxLikes', 'model.omittedLikes', 'model.likes.length', 'isLoadingLikes'),

    omittedLikes: function() {
      var likes = this.get('model.likes')
      return likes.get('length') + this.get('model.omittedLikes') - 3
    }.property('model.omittedLikes', 'model.likes', 'model.likes.length'),

    isEdit: false,
    maxComments: 2,
    maxLikes: 4,
    isLoadingLikes: false,
    isLoadingComments: false,

    body: Ember.computed.oneWay('model.body'),

    firstComments: function() {
      return this.get('model.comments').slice(0, 1)
    }.property('model.comments', 'model.comments.length'),

    lastComments: function() {
      return this.get('model.comments').slice(this.get('model.comments.length') - 1, this.get('model.comments.length'))
    }.property('model.comments', 'model.comments.length'),

    firstLikes: function() {
      var likes = this.get('model.likes')
      var omittedLikes = this.get('model.omittedLikes') || 0
      if (likes.get('length') < 5 && omittedLikes == 0)
        return likes
      else
        return likes.slice(0, 3)
    }.property('model.likes', 'model.likes.length', 'model.omittedLikes'),

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEdit')
      },

      showAllComments: function() {
        var that = this

        // NOTE: we are setting omittedCommentsOld because for UX we
        // are going to show spinner for extra 0.25s, however new data
        // will be already loaded at that time, so we must show old
        // data to simulate loading process
        this.set('omittedCommentsOld', this.get('omittedComments'))
        this.set('isLoadingComments', true)
        this.set('maxComments', 'all')
        this.store.findOneQuery('post', this.get('model.id'), {
          maxComments: this.get('maxComments'),
          maxLikes: this.get('maxLikes')
        }).then(function() {
          Ember.run.later(function() {
            that.set('isLoadingComments', false)
          }, 250)
        })
      },

      showAllLikes: function() {
        var that = this

        this.set('isLoadingLikes', true)
        this.set('maxLikes', 'all')
        this.store.findOneQuery('post', this.get('model.id'), {
          maxComments: this.get('maxComments'),
          maxLikes: this.get('maxLikes')
        }).then(function() {
          Ember.run.later(function() {
            that.set('isLoadingLikes', false)
          }, 250)
        })
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
        var post = this.get('model')

        post.destroyRecord()
          .then(function(post) {
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
