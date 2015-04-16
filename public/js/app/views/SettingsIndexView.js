define(["app/app",
        "text!templates/settingsIndexTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.SettingsIndexView = Ember.View.extend({
    templateName: 'settings-index',
    template: Ember.Handlebars.compile(tpl)
  })
})
