define(["app/app",
        "text!templates/usersNewTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.UsersNewView = App.UnauthorizedView.extend({
    templateName: 'signup',
    template: Ember.Handlebars.compile(tpl)
  })
})
