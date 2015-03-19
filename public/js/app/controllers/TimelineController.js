define(["app/app",
        "ember"], function(App, Ember) {
  App.TimelineController = Ember.Controller.extend({
    posts: function() {
      return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        sortProperties: ['createdAt'],
        sortAscending: false,
        content: this.get('content.posts')
      })
    }.property('content.posts'),

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
