define(["app/app",
        "text!templates/hiddenPostsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.HiddenPostsComponent = Ember.Component.extend({
    templateName: 'hidden-posts',
    template: Ember.Handlebars.compile(tpl)
  })
})
