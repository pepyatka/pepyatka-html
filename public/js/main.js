(function(root){
  require(["config"], function(config) {
    requirejs.config(config);

    require(["globals"], function(globals) {
      require(["App"], function(App){
        var app_name = config.app_name;
        root[app_name] = App

        var token = window.localStorage.getItem('token');
        if (token)
          App.properties.set('authToken', token)

        $.ajax({
          url: config.host + "/v2/whoami",
          context: this,
          success: function(data) {
            var user = data.user
            App.properties.userId = user.id
            App.properties.username = user.username
            App.properties.screenName = user.info ? user.info.screenName : user.username;

            // Now we are good to initialize Ember application
            App.advanceReadiness()

            if (data.token)
              App.properties.set('authToken', data.token)
          }
        })
      });
    });
  })
})(this);
