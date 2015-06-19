define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.GroupsHomeController = Ember.Controller.extend({
    showAllGroups: false,

    title: function() {
      return 'Groups'
    }.property(),

    groups: function() {
      if (this.get('showAllGroups'))
        return this.get('session.currentUser.groups')
      else
        return this.get('session.currentUser.groups').slice(0, 6)
    }.property('session.currentUser.groups', 'showAllGroups'),

    actions: {
      toggleAllGroups: function() {
        this.toggleProperty('showAllGroups')
      }
    }
  })
})
