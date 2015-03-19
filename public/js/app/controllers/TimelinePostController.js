define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  App.TimelinePostController = Ember.Controller.extend({
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
      },

      like: function() {
        Ember.$.ajax({
          url: config.host + '/v1/posts/' + this.get('content.id') + '/like',
          type: 'post',
          context: this
        })
          .then(function() {
            var user = this.get('session.currentUser')
            this.get('content.likes').pushObject(user)
          })
      },

      unlike: function() {
        Ember.$.ajax({
          url: config.host + '/v1/posts/' + this.get('content.id') + '/unlike',
          type: 'post',
          context: this
        })
          .then(function() {
            var like = this.get('content.likes').findProperty('id', this.get('session.currentUser.id'))
            this.get('content.likes').removeObject(like)
          })
      }
    }
  })
})
