define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  // TODO: this document
  // http://emberjs.com/api/data/classes/DS.RESTAdapter.html#toc_headers-customization
  // describes how we can set headers in RESTAdapter and so make
  // App.Session slimer
  App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: config.host,
    namespace: 'v1',
    shouldBackgroundReloadRecord: function (store, snapshot) {
      return false;
    },
    queryRecord: function(store, type, id, query) {
      var that = this
      // TODO: any ways to fetch URL with "s" from type class?
      var url = [type.modelName + "s", id].join('/')

      return new Ember.RSVP.Promise(function(resolve, reject) {
        // TODO: why host and namespace is not inhereted?
        jQuery.getJSON(that.host + "/" + that.namespace + "/" + url, query).then(function(data) {
          Ember.run(null, resolve, data)
        }, function(jqXHR) {
          jqXHR.then = null // tame jQuery's ill mannered promises
          Ember.run(null, reject, jqXHR)
        })
      })
    }
  })
})
