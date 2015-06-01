require(['linkify'], function(linkify) {
  $.fn.anchorTextUrls = function() {
    // Test a text node's contents for URLs and split and rebuild it with an achor
    var testAndTag = function(el) {
      linkify.find(el.nodeValue).forEach(function(linkifyUrl) {
        // Clone the text node to hold the "tail end" of the split
        // node
        var url = linkifyUrl.value
        var tail = $(el).clone()[0]

        // Substring the nodeValue attribute of the text nodes based
        // on the match boundaries
        el.nodeValue = el.nodeValue.substring(0, el.nodeValue.indexOf(url))
        tail.nodeValue = tail.nodeValue.substring(tail.nodeValue.indexOf(url) + url.length)

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

        // Rebuild the DOM inserting the new anchor element between
        // the split text nodes
        $(el)
          .after(tail)
          .after($("<a></a>")
                 .attr("title", url)
                 .attr("href", linkifyUrl.href)
                 .attr("target", "_blank")
                 .html(name))

        // Recurse on the new tail node to check for more URLs
        testAndTag(tail)
      })

      // Behave like a function
      return false
    }

    // For each element selected by jQuery
    this.each(function() {
      // Select all descendant nodes of the element and pick out only
      // text nodes
      var textNodes = $(this).add("*", this).contents().filter(function() {
        return this.nodeType == 3
      })

      // Take action on each text node
      $.each(textNodes, function(i, el) {
        testAndTag(el)
      })
    })
  }
})
