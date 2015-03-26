define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.TimelinePostController = Ember.Controller.extend({
    commentSortProperties: ['createdAt:asc'],
    comments: Ember.computed.sort('content.comments', 'commentSortProperties'),

    body: Ember.computed.oneWay('model.body'),

    actions: {
      destroy: function() {
        var comment = this.get('model')
        comment.destroyRecord()
          .then(function(comment) {
          })
      },

      update: function() {
        var post = this.get('model')
        var body = this.get('body', '')

        post.set('body', body)
        post.save()
          .then(function(newComment) {
          }.bind(this))
      },

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
