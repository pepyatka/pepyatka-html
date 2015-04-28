define(["app/app",
        "text!templates/notFoundTemplate.handlebars",
        "views/UnauthorizedView"], function(App, tpl) {
  "use strict";

  App.NotFoundView = App.UnauthorizedView.extend({
    templateName: 'not-found',
    template: Ember.Handlebars.compile(tpl)
  })
})
