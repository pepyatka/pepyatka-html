define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  // "Abstract" generic controller for posts
  App.PostGenericController = App.ApplicationController.extend({
    // The `offset` param isn't used in this controller explicitly,
    // but we need a default value to omit "?offset=0" in the post's URL.
    // See item #2 in http://guides.emberjs.com/v1.12.0/routing/query-params/#toc_default-values-and-deserialization
    queryParams: ['offset'],
    offset: 0,

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

    hasSurplusAttachments: false,
    areAttachmentsExpanded: false,

    hasOmittedComments: function() {
      return this.get('model.omittedComments') > 0
        || this.get('isLoadingComments') === true
    }.property('model.omittedComments', 'isLoadingComments'),

    omittedComments: function() {
      if (this.get('isLoadingComments')) {
        return this.get('model.omittedComments')
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
    isFormVisible: false,
    maxComments: 2,
    maxLikes: 4,
    isLoadingLikes: false,
    isLoadingComments: false,

    body: Ember.computed.oneWay('model.body'),

    firstComments: function() {
      return this.get('model.comments').slice(0, 1)
    }.property('model.comments', 'model.comments.length'),

    lastComments: function() {
      var len = this.get('model.comments.length')
      if (len < 2)
        return this.get('model.comments').slice(len - 1, len)

      var lastTwo = this.get('model.comments').slice(len - 2, len)
      if (lastTwo[1].get('isRealtime') === true && len > 2) {
        return lastTwo
      }
      return [lastTwo[1]]
    }.property('model.comments', 'model.comments.length'),

    allLikes: function() {
      var user_id = this.get('session.currentUser.id')
      var likes = this.get('model.likes').toArray().sort(function(a, b) {
        if (a.id == user_id) return -1
        if (b.id == user_id) return 1
      });

      return likes
    }.property('model.likes', 'session.currentUser.id'),

    firstLikes: function() {
      var likes = this.get('allLikes')
      var omittedLikes = this.get('model.omittedLikes') || 0

      if (likes.get('length') < 5 && omittedLikes == 0) {
        return likes
      } else {
        var items = likes.slice(0, 3)
        if (((items.length === 3) ||
             (items.length < 3 && this.get('omittedLikes') === 0))
           && this.get('omittedLikes') !== 1)
          return items

        // we do not have enough information to render likes, need to
        // request server for this
        var that = this
        var oldUpdatedAt = this.get('model.updatedAt')

        this.set('isLoadingLikes', true)
        Ember.run.later(function() {
          that.store.findOneQuery('post', that.get('model.id'), {
            maxComments: that.get('maxComments'),
            maxLikes: 'all'
          }).then(function(post) {
            post.set('updatedAt', oldUpdatedAt)
            that.set('isLoadingLikes', false)
          })
        }, 250)

        return items
      }
    }.property('model.omittedLikes', 'allLikes'),

    actions: {
      toggleCommentForm: function() {
        this.toggleProperty('isFormVisible')

        if (!this.get('isFormVisible'))
          this.set('newComment', '')
      },

      toggleEditability: function() {
        this.toggleProperty('isEdit')
      },

      toggleSurplusAttachments: function() {
        this.toggleProperty('areAttachmentsExpanded')
      },

      showAllComments: function() {
        var that = this
        var oldUpdatedAt = this.get('model.updatedAt')

        this.set('isLoadingComments', true)
        this.set('maxComments', 'all')
        Ember.run.later(function() {
          that.store.findOneQuery('post', that.get('model.id'), {
            maxComments: that.get('maxComments'),
            maxLikes: that.get('maxLikes')
          }).then(function(post) {
            post.set('updatedAt', oldUpdatedAt)
            that.set('isLoadingComments', false)
          })
        }, 250)
      },

      showAllLikes: function() {
        var that = this
        var oldUpdatedAt = this.get('model.updatedAt')

        this.set('isLoadingLikes', true)
        this.set('maxLikes', 'all')
        Ember.run.later(function() {
          that.store.findOneQuery('post', that.get('model.id'), {
            maxComments: that.get('maxComments'),
            maxLikes: that.get('maxLikes')
          }).then(function(post) {
            post.set('updatedAt', oldUpdatedAt)
            that.set('isLoadingLikes', false)
          })
        }, 250)
      },

      create: function() {
        var comment = this.store.createRecord('comment', {
          body: this.get('newComment'),
          postId: this.get('content.id')
        })

        this.set('newComment', '')
        comment.save()
          .then(function(comment) {
            this.set('isFormVisible', false)
            comment.set('isRealtime', true)
            var object = this.get('content.comments').findProperty('id', comment.get('id'))
            if (!object) {
              this.get('content.comments').pushObject(comment)
            }
          }.bind(this))
      },

      update: function() {
        var post = this.get('model')
        var oldUpdatedAt = this.get('model.updatedAt')
        var body = this.get('body')

        post.set('body', body)
        post.save()
          .then(function(post) {
            post.set('updatedAt', oldUpdatedAt)
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
            this.get('content.likes').addObject(user)
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
