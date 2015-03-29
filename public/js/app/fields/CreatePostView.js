define(["app/app"], function(App) {
  "use strict";

  App.CreatePostView = Ember.TextArea.extend({
    classNames: ['editarea'],
    valueBinding: 'body',

    click: function() {
      var view = this.get('parentView.sendTo')
      if (view)
        view.set('isVisible', true)
    }
  })
})
