define(["app/app",
        "text!templates/settingsTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.SettingsView = Ember.View.extend({
    templateName: 'settings',
    template: Ember.Handlebars.compile(tpl)
  })
})
