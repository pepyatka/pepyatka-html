define(["app/app",
        "text!templates/postLikesTemplate.handlebars"], function(App, tpl) {
   "use strict";

  App.PostLikesView = Ember.View.extend({
    templateName: 'post-likes',
    template: Ember.Handlebars.compile(tpl)
  })
})
