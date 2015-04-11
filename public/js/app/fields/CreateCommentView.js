define(["app/app", "ember"], function(App, Ember) {
  "use strict";

  App.CreateCommentView = Ember.TextArea.extend({
    classNames: ['edit-comment-area'],
    valueBinding: 'parentView.controller.newComment',

    becomeFocused: function() {
      this.$().focus()
    }.on('didInsertElement')
  })
})
