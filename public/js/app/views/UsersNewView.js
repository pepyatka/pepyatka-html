define(["app/app",
        "text!templates/usersNewTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.UsersNewView = Ember.View.extend({
    templateName: 'signup',
    template: Ember.Handlebars.compile(tpl)
  })
})
