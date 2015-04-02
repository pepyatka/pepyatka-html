define(["app/app",
        "ember",
        "components/Pagination"], function(App, Ember) {
  "use strict";

  App.TimelineHomeController = Ember.Controller.extend(App.Pagination, {
    postSortProperties: ['createdAt:desc'],
    allPosts: Ember.computed.sort('model.posts', 'postSortProperties'),

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
      create: function() {
        var post = this.store.createRecord('post', {
          body: this.get('body')
        })

        this.set('body', '')
        post.save()
          .then(function(post) {
            this.get('content.posts').pushObject(post)
          }.bind(this))
      }
    }
  })
})
