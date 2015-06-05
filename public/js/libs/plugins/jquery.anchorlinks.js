require(['linkify'], function(linkify) {
  $.fn.anchorTextUrls = function() {
    // Test a text node's contents for URLs and split and rebuild it
    // with an achor
    $(this).linkify({
      format: function(value, type) {
        var url = value
        var name = url
        var shorten = false

        // shorten url if it's nested more than 2 levels, e.g. http://google.com/a/b
        if (name.split('/').length > 4 && name.split('/')[4].length > 1) {
          name = name.split('/').slice(0, 4).join('/')
          shorten = true
        }

        // shorten url after ? symbol e.g. http://google.com/a?123
        if (name.split('?').length > 1 && name.split('?')[1].length > 2) {
          name = name.split('?')[0]
          shorten = true
        }

        // shorten url after # symbol e.g. http://google.com/a#123
        if (name.split('#').length > 1 && name.split('#')[1].length > 2) {
          name = name.split('#')[0]
          shorten = true
        }

        // shorten url if it's longer than 7 symbols e.g. http://google.com/12345678
        if (name.split('/').length == 4 &&
            name.split('/')[3].length > 7) {
          name = name.split('/').slice(0, 3).join('/') + '/' + name.split('/')[3].slice(0, 7)
          shorten = true
        }

        if (shorten)
          name = name + "&hellip;"

        return name
      }
    })
  }
})
