define(["app/app",
        "text!templates/timelinePostTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelinePostView = Ember.View.extend({
    templateName: 'timeline-post',
    template: Ember.Handlebars.compile(tpl),

    isFormVisible: false,

    isOwner: function() {
      if (!this.get('controller.session.signedIn'))
        return false

      var userId = this.get('controller.session.currentUser.id')
      var ownerId = this.get('content.model.createdBy.id')
      return userId == ownerId
    }.property('content.model.createdBy'),

    actions: {
      toggleCommentForm: function() {
        this.toggleProperty('isFormVisible')

        if (!this.get('isFormVisible'))
          this.set('controller.newComment', '')
      }
    }
  })
})
