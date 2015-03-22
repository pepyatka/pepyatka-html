define(["app/app",
        "text!templates/postTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.PostView = Ember.View.extend({
    templateName: 'post',
    template: Ember.Handlebars.compile(tpl)
  })
})
