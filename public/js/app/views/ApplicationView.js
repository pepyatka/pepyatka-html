define(["app/app",
        "text!templates/applicationTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.ApplicationView = Ember.View.extend({
    templateName: 'application',
    template: Ember.Handlebars.compile(tpl)
  });
});
