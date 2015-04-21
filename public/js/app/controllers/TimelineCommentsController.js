define(["app/app",
        "ember",
        "components/Pagination"], function(App, Ember) {
  "use strict";

  App.TimelineCommentsController = Ember.Controller.extend(App.Pagination, {
    posts: function() {
      return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
        sortProperties: ['createdAt'],
        sortAscending: false,
        content: this.get('model.posts')
      })
    }.property('model.posts'),

    didRequestRange: function(options) {
      this.transitionToRoute({ queryParams: { offset: options.offset } })
    },

    actions: {
      create: function() {
        var post = this.store.createRecord('post', {
          body: this.get('body')
        })

        this.set('body', '')
        post.save()
      }
    }
  })
})
