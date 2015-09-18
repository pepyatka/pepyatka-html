define(["app/app",
        "text!templates/bookmarkletTemplate.handlebars"], function(App, tpl) {
  "use strict";

  App.BookmarkletView = Ember.View.extend({
    templateName: 'bookmarklet',
    template: Ember.Handlebars.compile(tpl),

    selectYoutubeThumbnail: function() {
      var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)[?=&+%\w.-]*/i;
      var m = document.referrer.match(re)
      if (m && m[1]) {
        location.hash = 'https://i.ytimg.com/vi/' + m[1] + '/hqdefault.jpg'
      }
    }.on('didInsertElement')
  })
})
