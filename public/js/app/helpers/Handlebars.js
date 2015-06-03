define(["app/app", "ember"], function(App, Ember) {
  Ember.Handlebars.registerBoundHelper('prettifyText', function(content) {
    var text = $('<span/>').text(content)

    // wrap anchor tags around links in post text
    text.anchorTextUrls()

    // please read
    // https://github.com/kswedberg/jquery-expander/issues/24
    // text.expander({
    //   slicePoint: 350,
    //   expandPrefix: '&hellip; ',
    //   preserveWords: true,
    //   expandText: 'more&hellip;',
    //   userCollapseText: '',
    //   collapseTimer: 0,
    //   expandEffect: 'fadeIn',
    //   collapseEffect: 'fadeOut'
    // })

    var html = text.html()

    // make links from @login
    var parts = html.split(/(<.*?>)/g), i
    for (i = 0; i < parts.length; i += 4) {
      parts[i] = parts[i].replace(/\B@([a-z0-9]+)/g, function(u) {
        return '<a href="/' + u.substr(1) + '">' + u + '</a>'
      })
    }
    html = parts.join("")

    return new Ember.Handlebars.SafeString(html)
  })

  Ember.Handlebars.registerBoundHelper('ifpositive', function(property, options) {
    var context = (options.contexts && options.contexts[0]) || this
    var val = Ember.get(context, property)
    if (val > 0)
      return options.fn(this)
    return options.inverse(this)
  })

  Ember.Handlebars.registerBoundHelper('isLast', function(index, options) {
    return index === options.hash.length - 1
  });

  Ember.Handlebars.registerBoundHelper('isFirst', function(index) {
    return index === 0
  });

})
