define(["app/app",
        "ember"], function(App, Ember) {
  App.TimelineCommentsController = Ember.Controller.extend({
    postSortProperties: ['createdAt:desc'],
    posts: Ember.computed.sort('model.posts', 'postSortProperties'),
  })
})
