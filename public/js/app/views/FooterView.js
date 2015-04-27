define(["app/app",
        "text!templates/footerTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.FooterView = Ember.View.extend({
    templateName: 'footer',
    template: Ember.Handlebars.compile(tpl),
  })
})
