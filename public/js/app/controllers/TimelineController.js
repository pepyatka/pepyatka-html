define(["app/app",
        "ember"], function(App, Ember) {
  App.TimelineController = Ember.Controller.extend({
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
