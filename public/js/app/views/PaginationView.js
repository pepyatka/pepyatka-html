define(["app/app",
        "text!templates/paginationTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.PaginationViewComponent = Ember.Component.extend({
    templateName: 'pagination',
    template: Ember.Handlebars.compile(tpl)
  })
})
