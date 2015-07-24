define(["app/app",
        "text!templates/requestsIndexTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.RequestsIndexView = App.AuthorizedView.extend({
    templateName: 'requests.index',
    template: Ember.Handlebars.compile(tpl)
  })
})
