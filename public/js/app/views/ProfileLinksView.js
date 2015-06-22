define(["app/app",
        "text!templates/profileLinksTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.ProfileLinksView = Ember.View.extend({
    templateName: 'profileLinks',
    template: Ember.Handlebars.compile(tpl),

    isOwner: function() {
      if (!this.get('controller.session.signedIn'))
        return false

      var userId = this.get('controller.session.currentUser.id')
      var ownerId = this.get('controller.model.user.id')
      return userId == ownerId
    }.property('controller.model.user.id', 'controller.session.currentUser.id'),

    isTimelineIndex: function() {
      return this.get('parentView.templateName') === 'timeline/index'
    }.property('parentView.templateName')
  })
})
