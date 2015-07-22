define(["app/app",
        "text!templates/postTemplate.handlebars",
        "views/AuthorizedView"], function(App, tpl) {
  "use strict";

  App.PostView = App.AuthorizedView.extend({
    templateName: 'post',
    template: Ember.Handlebars.compile(tpl),

    isOwner: function() {
      if (!this.get('controller.session.signedIn'))
        return false

      var userId = this.get('controller.session.currentUser.id')
      var ownerId = this.get('controller.content.createdBy.id')
      return userId == ownerId
    }.property('controller.content.createdBy'),

    hideSurplusAttachments: function() {
      var that = this
      Ember.run.scheduleOnce('afterRender', this, function() {
        var container = this.$().find('.attachments .image-attachments')
        var nodes = container.find('.attachment')

        if (nodes.size() === 0) {
          return
        }

        container.loadedAttachments = 0

        container.find('img').on('load', function() {
          // This event fires for every image, but we need to process each post only once
          // (delegation isn't supported for 'load' event)
          container.loadedAttachments++
          if (container.loadedAttachments === nodes.size()) {

            // Find how many attachments are on the first row
            var quantity = 1
            var firstRowOffset = nodes[0].offsetTop + nodes[0].offsetHeight / 2
            var anotherOffset = 0
            for (var i = 1; i < nodes.size(); i++) {
              anotherOffset = nodes[i].offsetTop + nodes[i].offsetHeight / 2
              if (anotherOffset > firstRowOffset) {
                break
              }
              quantity++
            }

            // Hide surplus
            if (nodes.size() > quantity) {
              that.set('controller.hasSurplusAttachments', true)
              nodes.slice(quantity).addClass('surplus')
            }
          }
        })
      })
    }.on('didInsertElement'),

    actions: {
      focusCommentForm: function() {
        this.$('.edit-comment-area').focus()
      }
    }
  })
})
