define(["app/app",
        "ember",
        "autosize"], function(App, Ember, autosize) {
  "use strict";

  App.CreateCommentView = Ember.TextArea.extend(Ember.TargetActionSupport, {
    classNames: ['edit-comment-area'],
    rows: '1',
    attributeBindings: ['rows'],
    valueBinding: 'parentView.controller.newComment',
    action: 'create',

    keyPress: function (e) {
      if (e.which === 13) {
        return false
      }
    },

    becomeFocused: function() {
      if (this.get('parentView.templateName') != 'post') {
        this.$().focus()
      }
      autosize(this.$())
    }.on('didInsertElement')
  })
})
