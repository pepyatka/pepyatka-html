define(["app/app",
        "text!templates/timelineSubscribersTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.TimelineSubscribersView = App.AuthorizedView.extend({
    templateName: 'timeline/subscribers',
    template: Ember.Handlebars.compile(tpl),

    isOwner: function() {
      var currentUser = this.get('controller.session.currentUser')
      if (!currentUser) { return false }

      var administrators = currentUser.get('administrators').toArray()
      var username = this.get('controller.content.query')
      return (administrators.isAny('username', username)) ||
        currentUser.get('username') === username
    }.property('controller.session.currentUser')
  })
})
