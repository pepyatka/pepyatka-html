define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.GroupsHomeController = Ember.Controller.extend({
    showAllGroups: false,

    groups: function() {
      if (this.get('showAllGroups'))
        return this.get('session.currentUser.groups')
      else
        return this.get('session.currentUser.groups').slice(0, 3)
    }.property('session.currentUser.group', 'showAllGroups'),

    actions: {
      toggleAllGroups: function() {
        this.toggleProperty('showAllGroups')
      }
    }
  })
})
