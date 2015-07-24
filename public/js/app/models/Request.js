define(["lodash",
        "app/app"], function(_, App) {
  "use strict";

  App.Request = DS.Model.extend({
    username: DS.attr('string'),
    screenName: DS.attr('string'),
    profilePictureLargeUrl: DS.attr('string'),
    profilePictureMediumUrl: DS.attr('string'),

    profilePictureLarge: function() {
      var url = this.get('profilePictureLargeUrl')
      if (_.isEmpty(url)) {
        return '/img/default-userpic-75.png'
      }
      return url
    }.property('profilePictureLargeUrl'),

    profilePictureMedium: function() {
      var url = this.get('profilePictureMediumUrl')
      if (_.isEmpty(url)) {
        return '/img/default-userpic-48.png'
      }
      return url
    }.property('profilePictureMediumUrl')
  })
})
