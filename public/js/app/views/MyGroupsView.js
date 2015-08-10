define(["app/app",
        "text!templates/myGroupsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.MyGroupsComponent = Ember.Component.extend({
    templateName: 'my-groups',
    template: Ember.Handlebars.compile(tpl)
  })
})

