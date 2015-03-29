define(["app/app",
        "text!templates/sendToTemplate.handlebars",
        "select2"], function(App, tpl, select2) {
  "use strict";

  App.SendToView = Ember.View.extend({
    templateName: 'send-to',
    template: Ember.Handlebars.compile(tpl),
    viewName: 'sendTo',

    isEnabled: false,
    isVisible: false,
    showToggler: true,

    didInsertElement: function() {
      var field = this.$("#sendToSelect")
      field.select2()
      field.select2('enable', this.get('isEnabled'))
    },

    actions: {
      toggleEditability: function() {
        var value = !this.get('isEnabled')
        this.set('isEnabled', value)
        this.$('#sendToSelect').select2('enable', value)

        this.set('showToggler', !value)
      }
    }
  })
})
