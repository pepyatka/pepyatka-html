define(["app/app",
        "text!templates/xHiddenPostTemplate.handlebars",
        "ember"], function(App, tpl, Ember) {
  "use strict";

  App.XHiddenPostComponent = Ember.Component.extend({
    templateName: 'x-hidden-post',
    template: Ember.Handlebars.compile(tpl)
  })
})
