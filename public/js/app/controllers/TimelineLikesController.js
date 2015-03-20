define(["app/app",
        "ember"], function(App, Ember) {
  App.TimelineLikesController = Ember.Controller.extend({
    postSortProperties: ['createdAt:desc'],
    posts: Ember.computed.sort('model.posts', 'postSortProperties'),
  })
})
