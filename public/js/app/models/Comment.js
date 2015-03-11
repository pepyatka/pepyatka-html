define(["config",
        "app/app"], function(config, App) {
  App.Comment = Ember.Object.extend({
    // TODO: this is a bound helper
    // TODO: DRY w/Post
    createdAgo: function() {
      if (this.get('createdAt')) {
        return moment(this.get('createdAt')).fromNow();
      }
    }.property('createdAt')
  });

  App.Comment.reopenClass({
    resourceUrl: config.host + '/v1/comments',

    submit: function(attrs) {
      $.ajax({
        url: this.resourceUrl,
        type: 'post',
        data: { body: attrs.body, postId: attrs.postId },
        success: function(response) {
          console.log(response)
        }
      })
    },

    update: function(commentId, attrs) {
      $.ajax({
        url: this.resourceUrl + '/' + commentId,
        type: 'post',
        data: { body: attrs.body, '_method': 'patch' },
        success: function(response) {
          console.log(response)
        }
      })
    },

    kill: function(commentId) {
      $.ajax({
        url: this.resourceUrl + '/' + commentId,
        type: 'post',
        data: { '_method': 'delete' },
        success: function(response) {
          console.log(response)
        }
      })
    }
  })
});
