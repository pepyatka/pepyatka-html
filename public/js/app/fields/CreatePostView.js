define(["app/app"], function(App) {
  "use strict";

  App.CreatePostView = Ember.TextArea.extend(Ember.TargetActionSupport, {
    classNames: ['edit-post-area'],
    valueBinding: 'parentView.controller.body',
    action: 'create',

    keyPress: function (e) {
      if (e.which === 13) {
        return false
      }
    },

    click: function() {
      var view = this.get('parentView')
      if (view.get('sendTo'))
        view.set('controller.isSendToVisible', true)
    }
  })
})
