import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/auth.callback.tsx");const $$splitComponentImporter = () => import("/src/routes/auth.callback.tsx?tsr-split=component");
import { lazyRouteComponent } from "/node_modules/.vite/deps/@tanstack_react-router.js?v=bb9d3c39";
import { createFileRoute } from "/node_modules/.vite/deps/@tanstack_react-router.js?v=bb9d3c39";
export const Route = createFileRoute("/auth/callback")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (Route && newModule && newModule.Route) {
      (function handleRouteUpdate(oldRoute, newRoute) {
        newRoute._path = oldRoute._path;
        newRoute._id = oldRoute._id;
        newRoute._fullPath = oldRoute._fullPath;
        newRoute._to = oldRoute._to;
        newRoute.children = oldRoute.children;
        newRoute.parentRoute = oldRoute.parentRoute;
        const router = window.__TSR_ROUTER__;
        router.routesById[newRoute.id] = newRoute;
        router.routesByPath[newRoute.fullPath] = newRoute;
        router.processedTree.matchCache.clear();
        router.processedTree.flatCache?.clear();
        router.processedTree.singleCache.clear();
        router.resolvePathCache.clear();
        walkReplaceSegmentTree(newRoute, router.processedTree.segmentTree);
        const filter = (m) => m.routeId === oldRoute.id;
        if (router.state.matches.find(filter) || router.state.pendingMatches?.find(filter)) {
          router.invalidate({
            filter
          });
        }
        function walkReplaceSegmentTree(route, node) {
          if (node.route?.id === route.id) node.route = route;
          if (node.index) walkReplaceSegmentTree(route, node.index);
          node.static?.forEach((child) => walkReplaceSegmentTree(route, child));
          node.staticInsensitive?.forEach((child) => walkReplaceSegmentTree(route, child));
          node.dynamic?.forEach((child) => walkReplaceSegmentTree(route, child));
          node.optional?.forEach((child) => walkReplaceSegmentTree(route, child));
          node.wildcard?.forEach((child) => walkReplaceSegmentTree(route, child));
        }
      })(Route, newModule.Route);
    }
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSx1QkFBdUI7QUFHekIsYUFBTUMsUUFBUUQsZ0JBQWdCLGdCQUFnQixFQUFFO0FBQUEsRUFDckRFLFdBQVNDLG1CQUFBQywwQkFBQTtBQUNYLENBQUM7QUFBRSxJQUFBQyxZQUFBQyxLQUFBO0FBQUFELGNBQUFDLElBQUFDLE9BQUFDLGVBQUE7QUFBQSxRQUFBUCxTQUFBTyx1QkFBQVAsT0FBQTtBQUFBLGdCQUFBUSxrQkFBQUMsVUFBQUMsVUFBQTtBQUFBQSxpQkFBQUMsUUFBQUYsU0FBQUU7QUFBQUQsaUJBQUFFLE1BQUFILFNBQUFHO0FBQUFGLGlCQUFBRyxZQUFBSixTQUFBSTtBQUFBSCxpQkFBQUksTUFBQUwsU0FBQUs7QUFBQUosaUJBQUFLLFdBQUFOLFNBQUFNO0FBQUFMLGlCQUFBTSxjQUFBUCxTQUFBTztBQUFBLGNBQUFDLFNBQUFDLE9BQUFDO0FBQUFGLGVBQUFHLFdBQUFWLFNBQUFXLEVBQUEsSUFBQVg7QUFBQU8sZUFBQUssYUFBQVosU0FBQWEsUUFBQSxJQUFBYjtBQUFBTyxlQUFBTyxjQUFBQyxXQUFBQyxNQUFBO0FBQUFULGVBQUFPLGNBQUFHLFdBQUFELE1BQUE7QUFBQVQsZUFBQU8sY0FBQUksWUFBQUYsTUFBQTtBQUFBVCxlQUFBWSxpQkFBQUgsTUFBQTtBQUFBSSwrQkFBQXBCLFVBQUFPLE9BQUFPLGNBQUFPLFdBQUE7QUFBQSxjQUFBQyxTQUFBQyxTQUFBQyxZQUFBekIsU0FBQVk7QUFBQSxZQUFBSixPQUFBa0IsTUFBQUMsUUFBQUMsS0FBQUwsTUFBQSxLQUFBZixPQUFBa0IsTUFBQUcsZ0JBQUFELEtBQUFMLE1BQUE7QUFBQWYsaUJBQUFzQixXQUFBO0FBQUEsWUFBQVA7QUFBQUEsVUFBQTtBQUFBO0FBQUEsaUJBQUFGLHVCQUFBVSxPQUFBQyxNQUFBO0FBQUEsY0FBQUEsS0FBQUQsT0FBQW5CLE9BQUFtQixNQUFBbkIsR0FBQW9CLE1BQUFEO0FBQUEsY0FBQUMsS0FBQUMsTUFBQVosd0JBQUFVLE9BQUFDLEtBQUFDLEtBQUE7QUFBQUQsZUFBQUUsUUFBQUMsUUFBQUMsV0FBQWYsdUJBQUFVLE9BQUFLLEtBQUE7QUFBQUosZUFBQUssbUJBQUFGLFFBQUFDLFdBQUFmLHVCQUFBVSxPQUFBSyxLQUFBO0FBQUFKLGVBQUFNLFNBQUFILFFBQUFDLFdBQUFmLHVCQUFBVSxPQUFBSyxLQUFBO0FBQUFKLGVBQUFPLFVBQUFKLFFBQUFDLFdBQUFmLHVCQUFBVSxPQUFBSyxLQUFBO0FBQUFKLGVBQUFRLFVBQUFMLFFBQUFDLFdBQUFmLHVCQUFBVSxPQUFBSyxLQUFBO0FBQUE7QUFBQSxTQUFBN0MsT0FBQU8sVUFBQVAsS0FBQTtBQUFBO0FBQUE7QUFBQSIsIm5hbWVzIjpbImNyZWF0ZUZpbGVSb3V0ZSIsIlJvdXRlIiwiY29tcG9uZW50IiwibGF6eVJvdXRlQ29tcG9uZW50IiwiJCRzcGxpdENvbXBvbmVudEltcG9ydGVyIiwiaW1wb3J0IiwiaG90IiwiYWNjZXB0IiwibmV3TW9kdWxlIiwiaGFuZGxlUm91dGVVcGRhdGUiLCJvbGRSb3V0ZSIsIm5ld1JvdXRlIiwiX3BhdGgiLCJfaWQiLCJfZnVsbFBhdGgiLCJfdG8iLCJjaGlsZHJlbiIsInBhcmVudFJvdXRlIiwicm91dGVyIiwid2luZG93IiwiX19UU1JfUk9VVEVSX18iLCJyb3V0ZXNCeUlkIiwiaWQiLCJyb3V0ZXNCeVBhdGgiLCJmdWxsUGF0aCIsInByb2Nlc3NlZFRyZWUiLCJtYXRjaENhY2hlIiwiY2xlYXIiLCJmbGF0Q2FjaGUiLCJzaW5nbGVDYWNoZSIsInJlc29sdmVQYXRoQ2FjaGUiLCJ3YWxrUmVwbGFjZVNlZ21lbnRUcmVlIiwic2VnbWVudFRyZWUiLCJmaWx0ZXIiLCJtIiwicm91dGVJZCIsInN0YXRlIiwibWF0Y2hlcyIsImZpbmQiLCJwZW5kaW5nTWF0Y2hlcyIsImludmFsaWRhdGUiLCJyb3V0ZSIsIm5vZGUiLCJpbmRleCIsInN0YXRpYyIsImZvckVhY2giLCJjaGlsZCIsInN0YXRpY0luc2Vuc2l0aXZlIiwiZHluYW1pYyIsIm9wdGlvbmFsIiwid2lsZGNhcmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiYXV0aC5jYWxsYmFjay50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRmlsZVJvdXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCBDYWxsYmFjayBmcm9tIFwiQC9saWIvYXV0aC9jYWxsYmFja1wiO1xuXG5leHBvcnQgY29uc3QgUm91dGUgPSBjcmVhdGVGaWxlUm91dGUoXCIvYXV0aC9jYWxsYmFja1wiKSh7XG4gIGNvbXBvbmVudDogQ2FsbGJhY2ssXG59KTtcbiJdLCJmaWxlIjoiL1VzZXJzL3dpbGxpL0Rlc2t0b3AvT2FzaXovb2FzaXovZnJvbnRlbmQvc3JjL3JvdXRlcy9hdXRoLmNhbGxiYWNrLnRzeCJ9