define(["app/app",
        "text!templates/timelineHomeTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelineHomeView = Ember.View.extend({
    templateName: 'timeline/home',
    template: Ember.Handlebars.compile(tpl)
  })
})
