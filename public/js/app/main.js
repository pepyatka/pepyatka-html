define([
  "app/app",
  "app/router",

  "initializers/AjaxPrefilter",
  "initializers/Session",

  "models/Attachment",
  "models/Comment",
  "models/Group",
  "models/Post",
  "models/Subscriber",
  "models/Subscription",
  "models/Timeline",
  "models/User",

  "controllers/SessionNewController",
  "controllers/UsersNewController",

  "routes/HomeRoute",
  "routes/SessionNewRoute",
  "routes/UsersNewRoute",

  "views/ApplicationView",
  "views/HomeView",
  "views/SessionNewView",
  "views/TimelinePostView",
  "views/UsersNewView"
], function(App) {
  "use strict";

  return App
})
