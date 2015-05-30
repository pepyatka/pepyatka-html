define(["config",
        "app/app",
        "ember",
        "lodash",
        "components/Pagination"], function(config, App, Ember, _) {
  "use strict";

  // "Abstract" generic controller for timelines
  App.TimelineGenericController = Ember.Controller.extend(App.Pagination, {
    selectFeedsOnCreate: true,
    attachFilesOnCreate: true,

    // NOTE: this code doesn't work reliably, see
    // https://github.com/emberjs/ember.js/issues/10343
    //postSortProperties: ['createdAt:desc'],
    //posts: Ember.computed.sort('model.posts', 'postSortProperties'),

    posts: function() {
      return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        sortProperties: ['updatedAt'],
        sortAscending: false,
        content: this.get('model.posts')
      })
    }.property('model.posts.[]'),

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
        || (_.contains(this.get('model.subscribers'), this.get('session.currentUser.id'))
            && this.get('model.user.isGroup'))
    }.property('model.user.id', 'session.currentUser.id'),

    isSubscribed: function() {
      var currentUser = this.get('session.currentUser')
      if (!currentUser) { return false }

      return currentUser.get('subscriptions').isAny('id', this.get('model.id'))
    }.property('session.currentUser.id', 'session.currentUser.subscriptions.@each', 'model.id'),

    isAdmin: function() {
      var adminIds = this.get('model.user.administratorIds')
      var currentUserId = this.get('session.currentUser.id')

      return adminIds && adminIds.indexOf(currentUserId) !== -1
    }.property('session.currentUser.id'),

    isAttachmentsVisible: false,

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
            this.store.unloadRecord(user)
            this.store.pushPayload('user', response)
            this.get('session').set('currentUser', this.store.getById('user', response.users.id))
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
            this.store.unloadRecord(user)
            this.store.pushPayload('user', response)
            this.get('session').set('currentUser', this.store.getById('user', response.users.id))
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

        // Save it to the backend
        var that = this
        post.save()
          .then(function(post) {
            var object = that.get('model.posts').findProperty('id', post.get('id'))
            console.log(object)
            if (!object) {
              that.get('model.posts').addObject(post)
            }
          })
      }
    }
  })
})
