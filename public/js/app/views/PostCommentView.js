define(["app/app",
        "text!templates/postCommentTemplate.handlebars"], function(App, tpl) {
   "use strict";

  App.PostCommentView = Ember.View.extend({
    templateName: 'post-comment',
    template: Ember.Handlebars.compile(tpl),

    isEdit: false,

    actions: {
      toggleEditability: function() {
        this.toggleProperty('isEdit')
      }
    }
  })
})
