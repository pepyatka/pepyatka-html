require(['moment'], function(moment) {
  moment.fn.fromNowOrNow = function (a) {
    if (Math.abs(moment().diff(this)) < 25000) { // 25 seconds
      // before or after now
      return 'just now'
    }

    return this.fromNow(a)
  }
})
