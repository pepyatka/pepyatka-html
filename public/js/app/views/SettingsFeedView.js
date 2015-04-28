define(["app/app",
        "text!templates/settingsFeedTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.SettingsFeedView = App.AuthorizedView.extend({
    templateName: 'settings-feed',
    template: Ember.Handlebars.compile(tpl)
  })
})
