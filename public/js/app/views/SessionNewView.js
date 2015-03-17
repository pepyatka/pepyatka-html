define(["app/app",
        "text!templates/sessionNewTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.SessionNewView = Ember.View.extend({
    templateName: 'signin',
    template: Ember.Handlebars.compile(tpl)
  })
})
