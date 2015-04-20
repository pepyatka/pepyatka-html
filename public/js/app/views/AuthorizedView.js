define(["app/app",
        "text!layouts/authorizedLayout.handlebars"], function(App, tpl) {
  "use strict";

  App.AuthorizedView = Ember.View.extend({
    layout: Ember.Handlebars.compile(tpl)
  })
})
