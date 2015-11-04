"use strict"

define(["config"], function(config) {
  return {
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

    isLocalStorageSupported: function() {
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

      return '';
    },

    setCookie: function(cname, cvalue, exdays, cdomain, path) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))

      var cookie = cname + '=' + cvalue + '; '
      + 'expires=' + d.toUTCString() + '; '
      + 'domain=' + cdomain + '; '
      + ((path != undefined) ? ('path=' + path + '; '):'')

      document.cookie = cookie
    },

    getStoredToken: function () {
      var token;

      // Migrate token from localStorage to cookie
      // (we'll leave this in prod for a couple of weeks until everyone seamlessly have a cookie)
      if (this.isLocalStorageSupported()) {
        token = window.localStorage.getItem('authToken')
        window.localStorage.removeItem('authToken')
      }
      if (token) {
        this.storeToken(token)
        return token
      } else {
        return this.getCookie(config.auth.tokenPrefix + 'authToken')
      }
    },

    storeToken: function(token) {
      this.setCookie(
        config.auth.tokenPrefix + 'authToken',
        token,
        365,
        config.auth.cookieDomain,
        '/'
      )
    },

    getWhoamiCache: function() {
      if (this.isLocalStorageSupported()) {
        var data = window.localStorage.getItem('whoamiCache')
        if (data) {
          if (!data.hasOwnProperty('users'))
            return false
          return JSON.parse(data)
        }
      }
      return false
    },

    setWhoamiCache: function(data) {
      if (this.isLocalStorageSupported()) {
        window.localStorage.setItem('whoamiCache', JSON.stringify(data))
      }
    }
  }
})
