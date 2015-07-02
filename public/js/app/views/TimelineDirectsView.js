define(["app/app",
        "text!templates/timelineDirectsTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.TimelineDirectsView = App.AuthorizedView.extend({
    templateName: 'timeline/directs',
    template: Ember.Handlebars.compile(tpl)
  })
})
