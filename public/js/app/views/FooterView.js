define(["app/app",
        "text!templates/footerTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.FooterViewComponent = Ember.Component.extend({
    templateName: 'footer-view',
    template: Ember.Handlebars.compile(tpl),
  })
})
