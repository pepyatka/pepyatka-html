define(["app/app",
        "ember",
        "autosize"], function(App, Ember, autosize) {
  "use strict";

  App.EditCommentView = Ember.TextArea.extend(Ember.TargetActionSupport, {
    classNames: ['edit-comment-area'],
    rows: '1',
    attributeBindings: ['rows'],
    valueBinding: 'parentView.comment.body',
    action: 'update',

    keyPress: function (e) {
      if (e.which === 13) {
        return false
      }
    },

    becomeFocused: function() {
      this.$().focus()
      autosize(this.$())
    }.on('didInsertElement')
  })
})
