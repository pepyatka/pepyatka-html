define(["app/app",
        "text!templates/forgotPasswordTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.ForgotPasswordView = Ember.View.extend({
    templateName: 'forgot-password',
    template: Ember.Handlebars.compile(tpl)
  })
})
