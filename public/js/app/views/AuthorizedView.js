define(["app/app",
        "text!layouts/authorizedLayout.handlebars",
        "text!layouts/unauthorizedLayout.handlebars"],
       function(App, authTemplate, unauthTemplate) {
  "use strict";

  App.AuthorizedView = Ember.View.extend({
    layout: function() {
      var user = this.get('controller.session.currentUser')
      var template = user ? authTemplate : unauthTemplate
      return Ember.Handlebars.compile(template)
    }.property('controller.session.currentUser.id')
  })
})
