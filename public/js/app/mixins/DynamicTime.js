define(["app/app",
        "ember",
        "moment"], function(App, Ember, moment) {
  "use strict";

  App.DynamicTime = Ember.Mixin.create({
    pulseBinding: 'clock.pulse',

    createdAgo: function() {
      var createdAt = this.get('createdAt')
      if (createdAt) {
        return moment(createdAt).fromNowOrNow()
      }
    }.property('pulse'),

    createdAtISO: function() {
      var createdAt = this.get('createdAt')
      if (createdAt) {
        return moment(createdAt).format()
      }
    }.property('pulse')
  })
})
