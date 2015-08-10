define(["app/app",
        "text!templates/xVisiblePostTemplate.handlebars",
        "ember"], function(App, tpl, Ember) {
  "use strict";

  App.XVisiblePostComponent = Ember.Component.extend({
    templateName: 'x-visible-post',
    template: Ember.Handlebars.compile(tpl)
  })
})
