define(["app/app",
        "text!templates/timelineTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelineView = Ember.View.extend({
    templateName: 'timeline',
    template: Ember.Handlebars.compile(tpl)
  })
})
