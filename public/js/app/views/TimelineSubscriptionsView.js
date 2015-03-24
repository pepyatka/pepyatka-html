define(["app/app",
        "text!templates/timelineSubscriptionsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelineSubscriptionsView = Ember.View.extend({
    templateName: 'timeline/subscriptions',
    template: Ember.Handlebars.compile(tpl)
  })
})
