define(["app/app",
        "text!templates/sendToTemplate.handlebars",
        "select2"], function(App, tpl, select2) {
  "use strict";

  App.SendToView = Ember.View.extend({
    templateName: 'send-to',
    template: Ember.Handlebars.compile(tpl),

    didInsertElement: function() {
      this.$("#sendToSelect").select2()
    }
  })
})
