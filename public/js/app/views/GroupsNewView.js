define(["app/app",
        "text!templates/groupsNewTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.GroupsNewView = App.AuthorizedView.extend({
    templateName: 'groups-new',
    template: Ember.Handlebars.compile(tpl)
  })
})
