define(["app/app",
        "text!templates/resetPasswordTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.ResetPasswordView = Ember.View.extend({
    templateName: 'reset-password',
    template: Ember.Handlebars.compile(tpl)
  })
})
