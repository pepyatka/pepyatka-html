define(["config",
        "app/app",
        "ember"], function(config, App, Ember) {
  // TODO: this document
  // http://emberjs.com/api/data/classes/DS.RESTAdapter.html#toc_headers-customization
  // describes how we can set headers in RESTAdapter and so make
  // App.Session slimer
  App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: config.host,
    namespace: 'v1'
  })
})
