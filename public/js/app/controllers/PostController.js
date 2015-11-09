define(["app/app",
        "controllers/PostGenericController",
        "mixins/DynamicTime"], function(App) {
  "use strict";

  App.PostController = App.PostGenericController.extend(App.DynamicTime, {
    maxComments: 'all',

    isUploadingAttachment: function() {
      var post = this.get('model')
      return post.get('attachments').isAny('id', null)
    }.property('model.attachments.[]'),

    // 'uploadErrors' should be an instance property (set on init), not a prototype property
    setupUploadErrors: function() {
      this.set('uploadErrors', []);
    }.on('init'),

    // Remove attachment on edit-post
    removeAttachment: function(attachmentId) {
      var post = this.get('model')

      post.get('attachments').map(function(item) {
        if (item.id === attachmentId) {
          item.set('editStatus', 'removed')
        }
      })
    },

    actions: {
      // Add attachment on edit-post
      addAttachment: function(file) {
        // Create an attachment record
        var attachment = this.store.createRecord('attachment', {
          file: file
        })

        // Add a throbber (placeholder object, to show uploading progress)
        var post = this.get('model')
        var attachmentList = post.get('attachments')
        var uploadErrors = this.get('uploadErrors')
        var throbber = this.store.createRecord('attachment', { fileName: file.name })
        var throbberIndex = attachmentList.length
        attachmentList.pushObject(throbber)

        // Save the attachment record to the backend
        attachment.save()
          .then(function(attachment) {
            // Replace the throbber with a real record
            attachment.set('editStatus', 'added')
            attachmentList.replace(throbberIndex, 1, [ attachment ])
          })
          .catch(function(e) {
            var errorDetails = 'Unspecified error'
            if (e.responseJSON && e.responseJSON.message) {
              errorDetails = e.responseJSON.message
            }
            uploadErrors.pushObject({
              fileName: file.name,
              message: 'Upload failed: ' + errorDetails
            })
            console.log('Upload failed: ' + errorDetails)

            attachmentList.removeAt(throbberIndex, 1)
          })
      },

      // Clear uploadErrors on create-post
      clearUploadErrors: function() {
        this.set('uploadErrors', [])
      },

      startEdit: function() {
        this.set('isEdit', true)
      },

      cancelEdit: function() {
        var post = this.get('model')

        // Revert "added" attachments (i.e., remove them from list)
        var attachmentList = post.get('attachments').filter(function(item) {
          return item.get('editStatus') !== 'added'
        })
        post.set('attachments', attachmentList)

        // Revert "removed" attachments (i.e., reset their status)
        post.get('attachments').map(function(item) {
          item.set('editStatus', null)
        })

        // Switch UI back from edit mode
        this.set('isEdit', false)
      },

      update: function() {
        var post = this.get('model')

        // First, remove attachments that were marked as "removed"
        var attachmentList = post.get('attachments').filter(function(item) {
          return item.get('editStatus') !== 'removed'
        })
        post.set('attachments', attachmentList)

        // Second, reset editStatus for "added" attachments
        post.get('attachments').map(function(item) {
          item.set('editStatus', null)
        })

        // Then, invoke "generic" update()
        this._super.apply(this, arguments)
      },

      destroy: function() {
        var that = this
        var post = this.get('model')

        post.destroyRecord()
          .then(function(post) {
            // NOTE: why we need to manually remove deleted post from
            // all timelines? is it because server does not send
            // timelineId or something in post json?
            that.store.all('timeline').forEach(function(timeline) {
              var oldPost = timeline.get('posts').findProperty('id', post.get('id'))
              timeline.get('posts').removeObject(oldPost)
            })
            that.transitionToRoute('timeline.home')
          })
      }
    }
  })
})
