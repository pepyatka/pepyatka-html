define(["app/app", "ember"], function(App, Ember) {
  "use strict";

  App.CreatePostView = Ember.TextArea.extend(Ember.TargetActionSupport, {
    classNames: ['edit-post-area'],
    valueBinding: 'parentView.controller.body',
    action: function() {
      if (!(this.get('parentView.controller.isUploadingAttachment')
           || Ember.isBlank(this.get('value'))))
        return 'create'
    }.property('parentView.controller.isUploadingAttachment'),
    viewName: 'createPost',

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
