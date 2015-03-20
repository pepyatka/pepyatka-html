define(["app/app",
        "ember"], function(App, Ember) {
  App.TimelineIndexController = Ember.Controller.extend({
    postSortProperties: ['createdAt:desc'],
    posts: Ember.computed.sort('model.posts', 'postSortProperties'),
  })
})
