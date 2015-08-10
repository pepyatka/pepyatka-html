define(["app/app",
        "text!templates/postsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.PostsViewComponent = Ember.Component.extend({
    templateName: 'posts',
    template: Ember.Handlebars.compile(tpl)
  })
})
