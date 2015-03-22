define([
  "app/app",
  "app/router",

  "adapters/ApplicationAdapter",
  "adapters/SubscriberAdapter",
  "adapters/TimelineAdapter",

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
  "controllers/PostCommentController",
  "controllers/SessionNewController",
  "controllers/SessionDestroyController",
  "controllers/TimelineController",
  "controllers/TimelineCommentsController",
  "controllers/TimelineIndexController",
  "controllers/TimelineLikesController",
  "controllers/TimelinePostController",
  "controllers/TimelineSubscribersController",
  "controllers/UsersNewController",

  "routes/HomeRoute",
  "routes/SessionNewRoute",
  "routes/SessionDestroyRoute",
  "routes/TimelineCommentsRoute",
  "routes/TimelineIndexRoute",
  "routes/TimelineLikesRoute",
  "routes/TimelineSubscribersRoute",
  "routes/UsersNewRoute",

  "views/ApplicationView",
  "views/HomeView",
  "views/PostCommentView",
  "views/SessionNewView",
  "views/TimelineCommentsView",
  "views/TimelineIndexView",
  "views/TimelineLikesView",
  "views/TimelinePostView",
  "views/TimelineSubscribersView",
  "views/UsersNewView"
], function(App) {
  "use strict";

  return App
})
