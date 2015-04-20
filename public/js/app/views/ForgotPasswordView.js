define(["app/app",
        "text!templates/forgotPasswordTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.ForgotPasswordView = App.UnauthorizedView.extend({
    templateName: 'forgot-password',
    template: Ember.Handlebars.compile(tpl)
  })
})
