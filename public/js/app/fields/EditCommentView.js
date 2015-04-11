define(["app/app", "ember"], function(App, Ember) {
  "use strict";

  App.EditCommentView = Ember.TextArea.extend({
    classNames: ['edit-comment-area'],
    valueBinding: 'parentView.controller.body',

    becomeFocused: function() {
      this.$().focus()
    }.on('didInsertElement')
  })
})
