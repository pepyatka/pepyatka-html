define(["app/app",
        "text!templates/timelinePostTemplate.handlebars"], function(App, tpl) {
  App.TimelinePostView = Ember.View.extend({
    templateName: 'timeline-post',
    template: Ember.Handlebars.compile(tpl)
  })
})
