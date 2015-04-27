define(["app/app",
        "ember",
        "controllers/TimelineGenericController"], function(App, Ember) {
  "use strict";

  // Timeline on homepage
  App.TimelineHomeController = App.TimelineGenericController.extend({
    // NOTE: this code doesn't work reliably, see
    // https://github.com/emberjs/ember.js/issues/10343
    // postSortProperties: ['createdAt:desc'],
    // allPosts: Ember.computed.sort('model.posts', 'postSortProperties'),

    allPosts: function() {
      return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        sortProperties: ['updatedAt'],
        sortAscending: false,
        content: this.get('model.posts')
      })
    }.property('model.posts'),

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
    }.property('hiddenPosts.@each')
  })
})
