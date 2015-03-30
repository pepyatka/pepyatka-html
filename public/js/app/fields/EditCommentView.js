define(["app/app", "ember"], function(App, Ember) {
  "use strict";

  App.EditCommentView = Ember.TextArea.extend({
    classNames: ['editarea'],
    valueBinding: 'parentView.controller.body',

    becomeFocused: function() {
      this.$().focus()
    }.on('didInsertElement')
  })
})
