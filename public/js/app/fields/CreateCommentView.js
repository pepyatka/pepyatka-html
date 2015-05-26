define(["app/app", "ember"], function(App, Ember) {
  "use strict";

  App.CreateCommentView = Ember.TextArea.extend(Ember.TargetActionSupport, {
    classNames: ['edit-comment-area'],
    valueBinding: 'parentView.controller.newComment',
    action: 'create',

    becomeFocused: function() {
      if (this.get('parentView.templateName') != 'post')
        this.$().focus()
    }.on('didInsertElement')
  })
})
