define(["app/app", "ember"], function(App, Ember) {
  "use strict";

  App.CreateCommentView = Ember.TextArea.extend({
    classNames: ['editarea'],
    valueBinding: 'parentView.controller.newComment'
  })
})
