define(["app/app",
        "text!templates/postTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.PostView = Ember.View.extend({
    templateName: 'post',
    template: Ember.Handlebars.compile(tpl),

    isEdit: false,
    isFormVisible: false,

    actions: {
      toggleEditability: function() {
        var value = !this.get('isEdit')
        this.set('isEdit', value)
      },

      toggleCommentForm: function() {
        this.toggleProperty('isFormVisible')

        if (!this.get('isFormVisible'))
          this.set('controller.newComment', '')
      }
    }
  })
})
