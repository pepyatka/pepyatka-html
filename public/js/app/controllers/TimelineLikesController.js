define(["app/app",
        "ember"], function(App, Ember) {
  App.TimelineLikesController = Ember.Controller.extend({
    postSortProperties: ['createdAt:desc'],
    posts: Ember.computed.sort('model.posts', 'postSortProperties'),

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
