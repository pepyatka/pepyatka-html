define(["app/app", "ember"], function(App, Ember) {
  "use strict";

  App.EditCommentView = Ember.TextArea.extend(Ember.TargetActionSupport, {
    classNames: ['edit-comment-area'],
    valueBinding: 'parentView.controller.body',
    action: 'update',

    becomeFocused: function() {
      this.$().focus()
    }.on('didInsertElement')
  })
})
