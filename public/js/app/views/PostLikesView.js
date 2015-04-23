define(["app/app",
        "text!templates/postLikesTemplate.handlebars"], function(App, tpl) {
   "use strict";

  App.PostLikesView = Ember.View.extend({
    templateName: 'post-likes',
    template: Ember.Handlebars.compile(tpl),

    hidden: true,

    isHidden: function() {
      return this.get('hidden') && this.get('likes.length') > 4
    }.property('likes.length', 'hidden'),

    shownLikes: function() {
      return this.get('likes').filter(function(item, index) {
        if (index < 3) { return true }
      })
    }.property('likes'),

    hiddenLikes: function() {
      return this.get('likes').filter(function(item, index) {
        if (index >= 3) { return true }
      })
    }.property('likes'),

    actions: {
      toggleHidden: function() {
        this.toggleProperty('hidden')
      }
    }
  })
})
