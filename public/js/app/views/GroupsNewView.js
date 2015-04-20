define(["app/app",
        "text!templates/groupsNewTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.GroupsNewView = App.AuthorizedView.extend({
    templateName: 'groups-new',
    template: Ember.Handlebars.compile(tpl)
  })
})
