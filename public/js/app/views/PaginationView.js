define(["app/app",
        "text!templates/paginationTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.PaginationView = Ember.View.extend({
    templateName: 'pagination',
    template: Ember.Handlebars.compile(tpl)
  })
})
