define(["app/app",
        "text!templates/hiddenPostsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.HiddenPostsView = Ember.View.extend({
    templateName: 'hidden-posts',
    template: Ember.Handlebars.compile(tpl)
  })
})
