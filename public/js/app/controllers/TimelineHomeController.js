define(["app/app",
        "ember",
        "components/Pagination"], function(App, Ember) {
  "use strict";

  App.TimelineHomeController = Ember.Controller.extend(App.Pagination, {
    // NOTE: this code doesn't work reliably, see
    // https://github.com/emberjs/ember.js/issues/10343
    // postSortProperties: ['createdAt:desc'],
    // allPosts: Ember.computed.sort('model.posts', 'postSortProperties'),

    allPosts: function() {
      return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        sortProperties: ['createdAt'],
        sortAscending: false,
        content: this.get('model.posts')
      })
    }.property('model.posts'),

    attachments: [],

    posts: function() {
      var posts = this.get('allPosts')
      return posts.filter(function (post) { return !post.get('isHidden') })
    }.property('allPosts.@each.isHidden'),

    hiddenPosts: function() {
      var posts = this.get('allPosts')
      return posts.filter(function (post) { return post.get('isHidden') })
    }.property('allPosts.@each.isHidden'),

    hasHiddenPosts: function() {
      return this.get('hiddenPosts').length > 0
    }.property('hiddenPosts.@each'),

    didRequestRange: function(options) {
      this.transitionToRoute({ queryParams: { offset: options.offset } })
    },

    actions: {
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
        // Create a post record
        var post = this.store.createRecord('post', {
          body: this.get('body'),
          feeds: Ember.$('#sendToSelect').val()
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
