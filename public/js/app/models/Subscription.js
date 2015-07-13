define(["app/app"], function(App) {
  "use strict";

  App.Subscription = DS.Model.extend({
    name: DS.attr('string'),
    user: DS.belongsTo('subscriber', {async:false}),

    isPosts: function() {
      return this.get('name') === 'Posts'
    }.property('name'),

    isDirect: function() {
      return this.get('name') === 'Directs'
    }.property('name')
  })
})
