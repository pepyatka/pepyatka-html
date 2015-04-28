define(["app/app",
        "text!templates/homeTemplate.handlebars",
        "views/UnauthorizedView"], function(App, tpl) {
  "use strict";

  App.HomeView = App.UnauthorizedView.extend({
    templateName: 'home',
    template: Ember.Handlebars.compile(tpl)
  })
})
