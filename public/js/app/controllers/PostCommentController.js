define(["config",
        "app/app",
        "ember",
        "controllers/ApplicationController"], function(config, App, Ember) {
  "use strict";

  App.PostCommentController = App.ApplicationController.extend({
    body: Ember.computed.oneWay('model.body'),

    isEdit: false,

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEdit')
      },

      update: function() {
        var comment = this.get('model')
        var body = this.get('body', '')

        comment.set('body', body)
        comment.save()
          .then(function(newComment) {
            this.set('isEdit', false)
          }.bind(this))
      },

      destroy: function() {
        var comment = this.get('model')
        comment.destroyRecord()
          .then(function(comment) {
          })
      }
    }
  })
})
