define(["app/app",
        "text!templates/bookmarkletTemplate.handlebars",
        "views/UnauthorizedView"], function(App, tpl) {
  "use strict";

  App.BookmarkletView = Ember.View.extend({
    templateName: 'bookmarklet',
    template: Ember.Handlebars.compile(tpl)
  })
})
