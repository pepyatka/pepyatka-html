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
  "controllers/TimelineIndexController",
  "controllers/TimelineLikesController",
  "controllers/TimelinePostController",
  "controllers/UsersNewController",

  "routes/HomeRoute",
  "routes/SessionNewRoute",
  "routes/SessionDestroyRoute",
  "routes/TimelineIndexRoute",
  "routes/TimelineLikesRoute",
  "routes/UsersNewRoute",

  "views/ApplicationView",
  "views/HomeView",
  "views/SessionNewView",
  "views/TimelinePostView",
  "views/TimelineIndexView",
  "views/TimelineLikesView",
  "views/UsersNewView"
], function(App) {
  "use strict";

  return App
})
