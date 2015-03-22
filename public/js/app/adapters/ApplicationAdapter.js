define(["app/app",
        "ember"], function(App, Ember) {
  // TODO: this document
  // http://emberjs.com/api/data/classes/DS.RESTAdapter.html#toc_headers-customization
  // describes how we can set headers in RESTAdapter and so make
  // App.Session slimer
  App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'v1'
  })
})
