define(["app/app",
        "ember",
        "autosize"], function(App, Ember, autosize) {
  "use strict";

  App.CreatePostView = Ember.TextArea.extend(Ember.TargetActionSupport, {
    classNames: ['edit-post-area'],
    rows: '2',
    attributeBindings: ['rows'],
    valueBinding: 'parentView.controller.body',
    disabledBinding: 'parentView.controller.isSendingComment',

    viewName: 'createPost',

    action: function() {
      if (!(this.get('parentView.controller.isUploadingAttachment')
           || Ember.isBlank(this.get('value'))))
        return 'create'
    }.property('parentView.controller.isUploadingAttachment'),

    keyPress: function (e) {
      if (e.which === 13) {
        return false
      }
    },

    click: function() {
      var view = this.get('parentView')
      if (view.get('sendTo')) {
        view.set('controller.isSendToVisible', true)
      }
      autosize(this.$())
    }
  })
})
