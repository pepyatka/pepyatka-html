define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  App.PostCommentController = Ember.Controller.extend({
    body: Ember.computed.oneWay('model.body'),

    actions: {
      update: function() {
        var comment = this.get('model')
        var body = this.get('body', '')

        comment.set('body', body)
        comment.save()
          .then(function(newComment) {
          }.bind(this))
      }
    }
  })
})
