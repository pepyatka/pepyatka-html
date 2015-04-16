define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  "use strict";

  App.GroupsNewController = Ember.Controller.extend({
    errors: null,

    actions: {
      create: function() {
        this.set('errors', null)

        var group = this.store.createRecord('group', {
          username: this.get('username'),
          screenName: this.get('screenName') })

        group.save()
          .then(function(result) {
            this.transitionToRoute('timeline.index', this.get('username'))
          }, function(err) {
            this.set('errors', JSON.parse(err.responseText).err)
          })
      }
    }
  })
})
