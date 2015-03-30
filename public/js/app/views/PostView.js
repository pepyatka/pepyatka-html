define(["app/app",
        "text!templates/postTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.PostView = Ember.View.extend({
    templateName: 'post',
    template: Ember.Handlebars.compile(tpl),

    isEdit: false,
    isFormVisible: false,

    isOwner: function() {
      if (this.get('controller.session.signedIn'))
        return false

      var userId = this.get('controller.session.currentUser.id')
      var ownerId = this.get('controller.content.createdBy')
      return userId == ownerId
    }.property('controller.content.createdBy'),

    actions: {
      toggleEditability: function() {
        var value = !this.get('isEdit')
        this.set('isEdit', value)
      },

      toggleCommentForm: function() {
        this.toggleProperty('isFormVisible')

        if (!this.get('isFormVisible'))
          this.set('controller.newComment', '')
      }
    }
  })
})
