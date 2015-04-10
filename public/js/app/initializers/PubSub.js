define(["config",
        "app/app",
        "socket.io"], function(config, App, io) {
  "use strict";

  Ember.Application.initializer({
    name: 'pubsub',
    after: "store",

    initialize: function(container, application) {
      App.PubSubController = Ember.Object.extend({
        subscribedTo: {},

        disconnect: function(data) {
          this.reconnect()
        },

        init: function() {
          this._super()

          this.set('socket', io.connect(config.host + '/'))

          this.get('socket').on('newPost', this.newPost.bind(this))
          this.get('socket').on('updatePost', this.updatePost.bind(this))
          this.get('socket').on('destroyPost', this.destroyPost.bind(this))
          this.get('socket').on('hidePost', this.hidePost.bind(this))
          this.get('socket').on('unhidePost', this.unhidePost.bind(this))

          this.get('socket').on('newComment', this.newComment.bind(this))
          this.get('socket').on('updateComment', this.updateComment.bind(this))
          this.get('socket').on('destroyComment', this.destroyComment.bind(this))

          this.get('socket').on('newLike', this.newLike.bind(this))
          this.get('socket').on('removeLike', this.removeLike.bind(this))

          this.get('socket').on('disconnect', this.disconnect.bind(this))
        },

        monitor: function() {
          var channel = this.get('channel')
          if (channel.constructor === App.Timeline)
            this.subscribe('timeline', channel.get('id'))
          else if (channel.constructor === App.Post)
            this.subscribe('post', channel.get('id'))
          else if (channel.constructor === Ember.ArrayProxy) {
            channel.get('content').forEach(function(post) {
              this.subscribe('post', post.get('id'))
            }, this)}
        }.observes('channel.id', 'channel.content.length'),

        subscribe: function(channel, ids) {
          if (!ids) return

          var subscribedTo = {}
          var that = this
          if (!$.isArray(ids))
            ids = [ids]

          if (this.subscribedTo[channel]) {
            ids.forEach(function(id) {
              var indexOfThisId = that.subscribedTo[channel].indexOf(id)
              if (indexOfThisId == -1) {
                that.subscribedTo[channel].push(id)
              }
            })
          } else {
            this.subscribedTo[channel] = ids
          }

          subscribedTo[channel] = ids
          this.socket.emit('subscribe', subscribedTo)
        },

        unsubscribe: function(channel, ids) {
          var unsubscribedTo = {}
          var that = this

          if (channel && ids) {
            if (this.subscribedTo[channel]) {
              if (!$.isArray(ids)) {
                ids = [ids]
              }
              ids.forEach(function(id) {
                var indexOfThisId = that.subscribedTo[channel].indexOf(id)
                if (indexOfThisId != -1) {
                  unsubscribedTo[channel].push(id)
                  that.subscribedTo[channel].splice(indexOfThisId, 1)
                }
              })
            }
          } else if(channel && !ids) {
            unsubscribedTo[channel] = this.subscribedTo[channel]
          } else if (!channel) {
            unsubscribedTo = this.subscribedTo
          }

          this.subscribedTo = {}
          this.socket.emit('unsubscribe', unsubscribedTo)
        },

        reconnect: function() {
          var subscribedTo = this.get('subscribedTo')
          this.unsubscribe()
          this.get('socket').emit('subscribe', subscribedTo)
        },

        isFirstPage: function() {
          var pageStart = this.currentController().get('pageStart')
          return pageStart === 0 ||
            pageStart === undefined
        },

        currentController: function() {
          var currentHandlerInfos = container.lookup('router:main').router.currentHandlerInfos
          var controller = currentHandlerInfos[currentHandlerInfos.length - 1].handler.controller

          return controller
        },

        newPost: function(data) {
          if (!this.isFirstPage())
            return
        },

        updatePost: function(data) {
        },

        hidePost: function(data) {
        },

        unhidePost: function(data) {
        },

        destroyPost: function(data) {
        },

        newComment: function(data) {
          var that = this

          if (!this.isFirstPage())
            return

          var post = this.store.getById('post', data.comments.postId)

          if (post) {
            if (!this.store.recordIsLoaded('comment', data.comments.id)) {
              this.store.pushPayload('comment', data)
              var comment = this.store.getById('comment', data.comments.id)

              post.get('comments').pushObject(comment)
            }
          } else {
            this.store.find('post', data.comments.postId)
              .then(function(post) {
                that.currentController().get('posts').addObject(post)
              })
          }
        },

        updateComment: function(data) {
          var commentId = data.comments.id

          if (this.store.recordIsLoaded('comment', commentId)) {
            var comment = this.store.getById('comment', commentId)
            comment.set('body', data.comments.body)
          }
        },

        destroyComment: function(data) {
          var comment = this.store.getById('comment', data.commentId)

          if (!comment.get('isDeleted')) {
            this.store.unloadRecord(comment)

            var post = this.store.getById('post', data.postId)
            comment = post.get('comments').findProperty('id', comment.get('id'))
            post.get('comments').removeObject(comment)
          }
        },

        newLike: function(data) {
          var that = this
          var userId = data.users.id

          if (!this.store.recordIsLoaded('user', userId)) {
            this.store.pushPayload('user', data)
          }

          var post = this.store.getById('post', data.meta.postId)

          if (post) {
            var user = this.store.getById('user', userId)
            post.get('likes').addObject(user)
          } else {
            this.store.find('post', data.meta.postId)
              .then(function(post) {
                that.currentController().get('posts').addObject(post)
              })
          }
        },

        removeLike: function(data) {
          var post = this.store.getById('post', data.meta.postId)

          if (post) {
            var user = post.get('likes').findProperty('id', data.meta.userId)
            post.get('likes').removeObject(user)
          }
        }
      })
    }
  })
})
