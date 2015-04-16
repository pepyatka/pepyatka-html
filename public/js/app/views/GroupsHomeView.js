define(["app/app",
        "text!templates/groupsHomeTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.GroupsHomeView = Ember.View.extend({
    templateName: 'groups-home',
    template: Ember.Handlebars.compile(tpl)
  })
})
