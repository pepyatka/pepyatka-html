define(["app/app",
        "text!templates/postLikesTemplate.handlebars"], function(App, tpl) {
   "use strict";

  App.PostLikesComponent = Ember.Component.extend({
    templateName: 'post-likes',
    template: Ember.Handlebars.compile(tpl),

    allLikes: function(user) {
      var userId = this.get('user.id')
      var likes = this.get('likes').toArray().sort(function(a, b) {
        if (a.id == user_id) return -1
        if (b.id == user_id) return 1
      });

      return likes
    }.property('likes')
  })
})
