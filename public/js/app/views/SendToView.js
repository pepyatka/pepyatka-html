define(["app/app",
        "text!templates/sendToTemplate.handlebars",
        "select2"], function(App, tpl, select2) {
  "use strict";

  App.SendToView = Ember.View.extend({
    templateName: 'send-to',
    template: Ember.Handlebars.compile(tpl),
    viewName: 'sendTo',

    isEnabled: false,
    showToggler: true,

    isVisible: function() {
      return this.get('controller.isSendToVisible')
    }.property('controller.isSendToVisible'),

    resetField: function() {
      if (this.get('isVisible') === true &&
          this.get('showMyFeedOption') === true) {
        var field = this.$("#sendToSelect")
        field.select2('val', this.get('controller.session.currentUser.username'))
      }
    }.observes('isVisible'),

    didInsertElement: function() {
      var field = this.$("#sendToSelect")
      field.select2()
      field.select2('enable', this.get('isEnabled'))
    },

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEnabled')

        var value = this.get('isEnabled')
        this.$('#sendToSelect').select2('enable', value)
        this.set('showToggler', !value)
      }
    }
  })
})
