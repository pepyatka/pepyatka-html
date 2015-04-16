define(["app/app",
        "text!templates/settingsFeedTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.SettingsFeedView = Ember.View.extend({
    templateName: 'settings-feed',
    template: Ember.Handlebars.compile(tpl)
  })
})
