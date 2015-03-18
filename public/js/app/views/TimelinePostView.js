define(["app/app",
        "text!templates/timelinePostTemplate.handlebars"], function(App, tpl) {
  App.TimelinePostView = Ember.View.extend({
    templateName: 'timeline_post',
    template: Ember.Handlebars.compile(tpl)
  })
})
