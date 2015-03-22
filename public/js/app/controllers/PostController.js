define(["app/app",
        "ember"], function(App, Ember) {
  App.PostController = Ember.Controller.extend({
    commentSortProperties: ['createdAt:asc'],
    comments: Ember.computed.sort('content.comments', 'commentSortProperties'),

    actions: {
      create: function() {
        var comment = this.store.createRecord('comment', {
          body: this.get('newComment'),
          post: this.get('content')
        })

        this.set('newComment', '')
        comment.save()
          .then(function(comment) {
            this.get('content.comments').pushObject(comment)
          }.bind(this))
      }
    }
  })
})
