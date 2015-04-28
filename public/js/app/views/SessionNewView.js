define(["app/app",
        "text!templates/sessionNewTemplate.handlebars",
        "views/UnauthorizedView"], function(App, tpl) {
  "use strict";

  App.SessionNewView = App.UnauthorizedView.extend({
    templateName: 'signin',
    template: Ember.Handlebars.compile(tpl)
  })
})
