define(["app/app",
        "text!templates/postCommentTemplate.handlebars"], function(App, tpl) {
   "use strict";

  App.PostCommentView = Ember.View.extend({
    templateName: 'post-comment',
    template: Ember.Handlebars.compile(tpl),

    isEdit: false,

    isOwner: function() {
      var userId = this.get('controller.session.currentUser')
      if (userId) userId = userId.id
      var ownerId = this.get('content.model.createdBy')
      return userId == ownerId
    }.property('content.model.createdBy'),

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEdit')
      }
    }
  })
})
