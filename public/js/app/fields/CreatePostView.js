define(["app/app"], function(App) {
  "use strict";

  App.CreatePostView = Ember.TextArea.extend({
    classNames: ['edit-post-area'],
    valueBinding: 'parentView.controller.body',

    click: function() {
      var view = this.get('parentView.sendTo')
      if (view)
        view.set('isVisible', true)
    }
  })
})
