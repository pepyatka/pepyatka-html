define(["app/app",
        "text!templates/postTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.PostView = App.AuthorizedView.extend({
    templateName: 'post',
    template: Ember.Handlebars.compile(tpl),

    isOwner: function() {
      if (!this.get('controller.session.signedIn'))
        return false

      var userId = this.get('controller.session.currentUser.id')
      var ownerId = this.get('controller.content.createdBy.id')
      return userId == ownerId
    }.property('controller.content.createdBy'),

    actions: {
      focusCommentForm: function() {
        this.$('.edit-comment-area').focus()
      }
    }
  })
})
