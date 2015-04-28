define(["app/app",
        "text!templates/settingsIndexTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.SettingsIndexView = App.AuthorizedView.extend({
    templateName: 'settings-index',
    template: Ember.Handlebars.compile(tpl)
  })
})
