define(["app/app",
        "text!templates/postCommentTemplate.handlebars"], function(App, tpl) {
   "use strict";

  App.PostCommentView = Ember.View.extend({
    templateName: 'post-comment',
    template: Ember.Handlebars.compile(tpl),

    isOwner: function() {
      if (!this.get('controller.session.signedIn'))
        return false

      var userId = this.get('controller.session.currentUser.id')
      var ownerId = this.get('content.model.createdBy.id')
      return userId == ownerId
    }.property('content.model.createdBy')
  })
})
