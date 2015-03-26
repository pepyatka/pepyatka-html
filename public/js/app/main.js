define([
  "app/app",
  "app/router",

  "adapters/ApplicationAdapter",
  "adapters/SubscriberAdapter",
  "adapters/SubscriptionAdapter",
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
  "controllers/PostController",
  "controllers/PostCommentController",
  "controllers/PubSubController",
  "controllers/SessionNewController",
  "controllers/SessionDestroyController",
  "controllers/TimelineCommentsController",
  "controllers/TimelineIndexController",
  "controllers/TimelineHomeController",
  "controllers/TimelineLikesController",
  "controllers/TimelinePostController",
  "controllers/TimelineSubscribersController",
  "controllers/TimelineSubscriptionsController",
  "controllers/UsersNewController",

  "routes/HomeRoute",
  "routes/PostRoute",
  "routes/SessionNewRoute",
  "routes/SessionDestroyRoute",
  "routes/TimelineCommentsRoute",
  "routes/TimelineIndexRoute",
  "routes/TimelineHomeRoute",
  "routes/TimelineLikesRoute",
  "routes/TimelineSubscribersRoute",
  "routes/TimelineSubscriptionsRoute",
  "routes/UsersNewRoute",

  "views/ApplicationView",
  "views/HomeView",
  "views/PostView",
  "views/PostsView",
  "views/PostCommentView",
  "views/ProfileLinksView",
  "views/SessionNewView",
  "views/SubmitPostView",
  "views/TimelineCommentsView",
  "views/TimelineIndexView",
  "views/TimelineHomeView",
  "views/TimelineLikesView",
  "views/TimelinePostView",
  "views/TimelineSubscribersView",
  "views/TimelineSubscriptionsView",
  "views/UsersNewView"
], function(App) {
  "use strict";

  return App
})
