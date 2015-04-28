define(["app/app",
        "text!templates/timelineLikesTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.TimelineLikesView = App.AuthorizedView.extend({
    templateName: 'timeline/likes',
    template: Ember.Handlebars.compile(tpl)
  })
})
