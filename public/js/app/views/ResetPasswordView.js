define(["app/app",
        "text!templates/resetPasswordTemplate.handlebars",
        "views/UnauthorizedView"], function(App, tpl) {
  "use strict";

  App.ResetPasswordView = App.UnauthorizedView.extend({
    templateName: 'reset-password',
    template: Ember.Handlebars.compile(tpl)
  })
})
