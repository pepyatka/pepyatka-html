define(["config",
  "app/app",
  "ember"], function(config, App, Ember) {
  "use strict";

  // "Abstract" generic controller for settings pages
  App.SettingsGenericController = Ember.Controller.extend({
    uploadProfilePicture: function(url) {
      var that = this

      var picture = this.get('newProfilePicture')
      if (!picture) return

      var data = new FormData()
      data.append('file', picture)

      Ember.$.ajax({
        url: config.host + url,
        type: 'post',
        data: data,
        processData: false,
        contentType: false,
        context: this
      })
        .then(function (res) {
          // TODO[yole] update model, avoid full page refresh
          window.location.reload(true)
        }, function (err) {
          if (err.responseJSON.err)
            this.set('profilePicErrors', err.responseJSON.err)
        })
    },

    themes: ["helvetica", "fresh"],

    actions: {
      previewProfilePicture: function (newFile) {
        this.set('newProfilePicture', newFile)
      },

      themeSelect: function(theme) {
        document.cookie = "theme=" + theme;
        Ember.$('link#theme-css').attr("href", "/css/themes/" + theme + "/app.css");
      }
    }
  })
})
