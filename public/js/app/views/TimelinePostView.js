define(["app/app",
        "text!templates/timelinePostTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelinePostView = Ember.View.extend({
    templateName: 'timeline-post',
    template: Ember.Handlebars.compile(tpl),

    isEdit: false,

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEdit')
      }
    }
  })
})
