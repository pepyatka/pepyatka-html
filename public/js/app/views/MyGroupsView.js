define(["app/app",
        "text!templates/myGroupsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.MyGroupsView = Ember.View.extend({
    templateName: 'myGroups',
    template: Ember.Handlebars.compile(tpl)
  })
})

