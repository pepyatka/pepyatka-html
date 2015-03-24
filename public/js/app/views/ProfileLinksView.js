define(["app/app",
        "text!templates/profileLinksTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.ProfileLinksView = Ember.View.extend({
    templateName: 'profileLinks',
    template: Ember.Handlebars.compile(tpl)
  })
})
