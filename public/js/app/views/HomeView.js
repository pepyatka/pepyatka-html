define(["app/app",
        "text!templates/homeTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.HomeView = App.UnauthorizedView.extend({
    templateName: 'home',
    template: Ember.Handlebars.compile(tpl)
  })
})
