"use strict"

define({
  _isLocalStorageSupported: null,
  checkIfLocalStorageSupported: function() {
    var supported = ('localStorage' in window && window.localStorage !== null)

    if (!supported) {
      return false
    }

    var testKey = 'test'

    try {
      window.localStorage.setItem(testKey, '1')
      window.localStorage.removeItem(testKey)

      return true
    } catch (error) {
      return false
    }
  },
  isLocalStorageSupported: function(){
    if (this._isLocalStorageSupported === null) {
      this._isLocalStorageSupported = this.checkIfLocalStorageSupported()
    }

    return this._isLocalStorageSupported
  },

  getCookie: function(cname) {
    var name = cname + "="
    var ca = document.cookie.split(';')

    for (var i=0; i<ca.length; i++) {
      var c = ca[i]

      while (c.charAt(0)==' ')
        c = c.substring(1);

      if (c.indexOf(name) == 0)
        return c.substring(name.length,c.length);
    }

    return "";
  },
  setCookie: function(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))

    var expires = "expires=" + d.toUTCString()

    document.cookie = cname + "=" + cvalue + "; " + expires
  },

  getStoredToken: function () {
    if (this.isLocalStorageSupported()) {
      return window.localStorage.getItem('authToken')
    } else {
      return this.getCookie('authToken')
    }
  },

  storeToken: function(token) {
    if (this.isLocalStorageSupported()) {
      window.localStorage.setItem('authToken', token)
    } else {
      this.setCookie('authToken', token, 365)
    }
  }
})
