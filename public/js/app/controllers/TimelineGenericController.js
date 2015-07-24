define(["config",
        "app/app",
        "ember",
        "lodash",
        "mixins/Pagination",
        "controllers/ApplicationController"], function(config, App, Ember, _) {
  "use strict";

  // "Abstract" generic controller for timelines
  App.TimelineGenericController = App.ApplicationController.extend(App.Pagination, {
    selectFeedsOnCreate: true,
    attachFilesOnCreate: true,

    title: function() {
      return ''
    }.property(),

    // NOTE: this code doesn't work reliably, see
    // https://github.com/emberjs/ember.js/issues/10343
    //postSortProperties: ['createdAt:desc'],
    //posts: Ember.computed.sort('model.posts', 'postSortProperties'),

    // 'attachments' should be an instance property (set on init), not a prototype property
    setupAttachments: function() {
      this.set('attachments', []);
    }.on('init'),

    didRequestRange: function(options) {
      this.transitionToRoute({ queryParams: { offset: options.offset } })
    },

    myFeed: function() {
      return (this.get('model.user.id') == this.get('session.currentUser.id')
              && this.get('model.user.isUser'))
        || (this.get('isSubscribed') && this.get('model.user.isGroup'))
    }.property('model.user.id', 'session.currentUser.id', 'isSubscribed'),

    isSubscribed: function() {
      var currentUser = this.get('session.currentUser')
      if (!currentUser) { return false }

      return (this.get('model.subscribers').isAny('id', currentUser.get('id')))
    }.property('model.subscribers', 'session.currentUser.id'),

    isBanned: function() {
      var currentUser = this.get('session.currentUser')
      if (!currentUser) { return false }

      var userId = this.get('model.user.id')
      return _.filter(currentUser.get('banIds'), function(feedId) {
        return feedId === userId
      }).length > 0
    }.property('model.user.id', 'session.currentUser.banIds.[]'),

    isAdmin: function() {
      var adminIds = this.get('model.user.administratorIds')
      var currentUserId = this.get('session.currentUser.id')

      return adminIds && adminIds.indexOf(currentUserId) !== -1
    }.property('session.currentUser.id'),

    isUploadingAttachment: function() {
      return this.get('attachments').isAny('id', null)
    }.property('attachments.[]'),

    isAttachmentsVisible: false,
    isSendToVisible: false,

    actions: {
      showAttachments: function() {
        this.toggleProperty('isAttachmentsVisible')
      },

      subscribe: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/subscribe',
          type: 'post',
          context: this
        })
          .then(function(response) {
            var user = this.store.recordForId('user', response.users.id)
            this.store.pushPayload('user', response)
            var subscriberResponse = response
            subscriberResponse.subscribers = subscriberResponse.users
            this.store.pushPayload('subscriber', subscriberResponse)
            var subscriber = this.store.recordForId('subscriber', response.users.id)

            this.get('session').set('currentUser', this.store.getById('user', response.users.id))
            this.incrementProperty('model.user.statistics.subscribers')
            this.get('model.subscribers').addObject(subscriber)
          })
      },

      unsubscribe: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/unsubscribe',
          type: 'post',
          context: this
        })
          .then(function(response) {
            var user = this.store.recordForId('user', response.users.id)
            this.store.pushPayload('user', response)
            var subscriberResponse = response
            subscriberResponse.subscribers = subscriberResponse.users
            this.store.pushPayload('subscriber', subscriberResponse)
            var subscriber = this.store.recordForId('subscriber', response.users.id)

            this.get('session').set('currentUser', this.store.getById('user', response.users.id))
            this.decrementProperty('model.user.statistics.subscribers')
            this.get('model.subscribers').removeObject(subscriber)
          })
      },

      addAttachment: function(file) {
        // Create an attachment record
        var attachment = this.store.createRecord('attachment', {
          file: file
        })

        // Add a throbber (placeholder object, to show uploading progress)
        var attachmentList = this.get('attachments')
        var throbber = this.store.createRecord('attachment', { thumbnailUrl: '/img/throbber-100.gif' })
        var throbberIndex = attachmentList.length
        attachmentList.pushObject(throbber)

        // Save the attachment record to the backend
        attachment.save()
          .then(function(attachment) {
            // Replace the throbber with a real record
            attachmentList.replace(throbberIndex, 1, [ attachment ])
          })
          .catch(function(e) {
            console.log('upload failed')
            attachmentList.removeAt(throbberIndex, 1)
          })
      },

      create: function() {
        // Allow/disallow selecting feeds
        var feeds
        if (this.get('selectFeedsOnCreate')) {
          feeds = Ember.$('#sendToSelect').val()
        } else {
          feeds = this.get('model.user.username')
        }

        // Create a post record
        var post = this.store.createRecord('post', {
          body: this.get('body'),
          feeds: feeds
        })

        // Attach the attachments (without throbbers, if any)
        var attachmentList = this.get('attachments')
          .filter(function(item) {
            return !!item.id
          })
        post.get('attachments').pushObjects(attachmentList)

        // Clear the form
        this.set('body', '')
        this.set('attachments', [])
        this.set('isAttachmentsVisible', false)
        this.set('isSendToVisible', false)

        // Save it to the backend
        var that = this
        post.save()
          .then(function(post) {
            var object = that.get('model.posts').findProperty('id', post.get('id'))
            if (!object) {
              that.get('model.posts').unshiftObject(post)
            } else {
              post.get('attachments.canonicalState').forEach(function(attachment) {
                if (attachment) {
                  var attachmentObject = object.get('attachments').findProperty('id', attachment.get('id'))
                  if (!attachmentObject) {
                    object.get('attachments').pushObject(attachment)
                  }
                }
              })
            }
          })
      },

      sendRequest: function() {
        var user = this.get('model.user')
        var currentUser = this.get('session.currentUser')

        currentUser.sendRequest(user)
          .then(function() {
          }.bind(this))
      },

      ban: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/ban',
          type: 'post',
          context: this
        })
          .then(function(response) {
            this.get('session.currentUser.banIds').addObject(this.get('model.user.id'))
          })
      },

      unban: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/unban',
          type: 'post',
          context: this
        })
          .then(function(response) {
            this.get('session.currentUser.banIds').removeObject(this.get('model.user.id'))
          })
      }
    }
  })
})
