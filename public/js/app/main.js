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

  "controllers/ApplicationController",
  "controllers/SessionNewController",
  "controllers/SessionDestroyController",
  "controllers/TimelineController",
  "controllers/TimelinePostController",
  "controllers/UsersNewController",

  "routes/HomeRoute",
  "routes/SessionNewRoute",
  "routes/SessionDestroyRoute",
  "routes/TimelineRoute",
  "routes/UsersNewRoute",

  "views/ApplicationView",
  "views/HomeView",
  "views/SessionNewView",
  "views/TimelinePostView",
  "views/TimelineView",
  "views/UsersNewView"
], function(App) {
  "use strict";

  return App
})
