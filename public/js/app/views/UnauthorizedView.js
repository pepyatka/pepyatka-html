define(["app/app",
        "text!layouts/unauthorizedLayout.handlebars"], function(App, tpl) {
  "use strict";

  App.UnauthorizedView = Ember.View.extend({
    layout: Ember.Handlebars.compile(tpl)
  })
})
