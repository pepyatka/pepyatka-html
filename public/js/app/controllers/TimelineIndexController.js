define(["config",
        "app/app",
        "ember",
        "components/Pagination"], function(config, App, Ember) {
  "use strict";

  App.TimelineIndexController = Ember.Controller.extend(App.Pagination, {
    postSortProperties: ['createdAt:desc'],
    posts: Ember.computed.sort('model.posts', 'postSortProperties'),

    didRequestRange: function(options) {
      this.transitionToRoute({ queryParams: { offset: options.offset } })
    },

    actions: {
      create: function() {
        var post = this.store.createRecord('post', {
          body: this.get('body'),
          feeds: this.get('model.user.username')
        })

        this.set('body', '')
        post.save()
      },

      subscribe: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/subscribe',
          type: 'post',
          context: this
        })
          .then(function() {
            this.transitionToRoute('home')
          })
      },

      unsubscribe: function() {
        var user = this.get('model.user')
        Ember.$.ajax({
          url: config.host + '/v1/users/' + user.get('username') + '/unsubscribe',
          type: 'post',
          context: this
        })
          .then(function() {
            this.transitionToRoute('home')
          })
      }
    }
  })
})
