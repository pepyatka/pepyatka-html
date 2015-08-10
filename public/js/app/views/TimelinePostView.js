define(["app/app",
        "text!templates/timelinePostTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.TimelinePostComponent = Ember.Component.extend({
    templateName: 'timeline-post',
    template: Ember.Handlebars.compile(tpl),

    isOwner: function() {
      if (!this.get('controller.session.currentUsed'))
        return false

      var userId = this.get('controller.session.currentUser.id')
      var ownerId = this.get('content.model.createdBy.id')
      return userId == ownerId
    }.property('content.model.createdBy'),

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

    // Scroll to the top of the post on collapsing attachments
    scrollToPostTop: function() {
      var areAttachmentsExpanded = this.get('controller.areAttachmentsExpanded')

      // Only scroll on collapsing
      if (!areAttachmentsExpanded) {
        var bodyGetter = Ember.$(window)
        var bodySetter = Ember.$('html, body')
        var post = this.$()

        if (post) {
          var currentScrollPosition = bodyGetter.scrollTop()
          var postPosition = post.offset().top

          // Only scroll if top of the post is outside the viewport
          if (postPosition < currentScrollPosition) {
            bodySetter.animate({ scrollTop: postPosition })
          }
        }
      }
    }.observes('controller.areAttachmentsExpanded'),

    // Prevent (compensate) viewport scrolling when new posts are coming somewhere in the top
    postAddedAtTheTop: function() {
      Ember.run.scheduleOnce('afterRender', this, function() {
        var bodyGetter = Ember.$(window)
        var bodySetter = Ember.$('html, body')
        var newPost = this.$()

        var currentScrollPosition = bodyGetter.scrollTop()
        var topPostPosition = newPost.closest('.posts').offset().top

        if (currentScrollPosition > topPostPosition) {
          var newPostHeight = newPost.height()
          bodySetter.scrollTop(currentScrollPosition + newPostHeight)
        }
      })
    }.on('didInsertElement')
  })
})
