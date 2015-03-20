define(["app/app",
        "text!templates/timelineLikesTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelineLikesView = Ember.View.extend({
    templateName: 'timeline/likes',
    template: Ember.Handlebars.compile(tpl)
  })
})
