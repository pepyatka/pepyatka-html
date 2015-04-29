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
    }.property('model.posts'),

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

    actions: {
      subscribe: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/subscribe',
          type: 'post',
          context: this
        })
          .then(function() {
            this.transitionToRoute('timeline.home')
          })
      },

      unsubscribe: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/unsubscribe',
          type: 'post',
          context: this
        })
          .then(function() {
            this.transitionToRoute('timeline.home')
          })
      },

      addAttachment: function(file) {
        // Create an attachment record
        var attachment = this.store.createRecord('attachment', {
          file: file
        })

        // Save it to the backend
        attachment.save()
          .then(function(attachment) {
            this.get('attachments').pushObject(attachment)
          }.bind(this))
      },

      create: function() {
        // Allow/disallow selecting feeds
        var feeds;
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

        // Attach the attachments
        post.get('attachments').pushObjects(this.get('attachments'))

        // Clear the form
        this.set('body', '')
        this.set('attachments', [])

        // Save it to the backend
        post.save()
      }
    }
  })
})
