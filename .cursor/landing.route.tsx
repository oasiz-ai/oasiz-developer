import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/routes/landing/route.tsx");const $$splitComponentImporter = () => import("/src/routes/landing/route.tsx?tsr-split=component");
import { lazyRouteComponent } from "/node_modules/.vite/deps/@tanstack_react-router.js?v=bb9d3c39";
import { createFileRoute, redirect } from "/node_modules/.vite/deps/@tanstack_react-router.js?v=bb9d3c39";
import { getSyncCachedSession, getCachedSession } from "/src/routes/__root.tsx";
export const Route = createFileRoute("/landing")({
  validateSearch: (search) => ({
    status: typeof search.status === "string" ? search.status : void 0
  }),
  beforeLoad: async ({
    location
  }) => {
    const handleAuthRedirect = (cohort) => {
      if (cohort > 0) {
        throw redirect({
          to: "/",
          search: {
            mode: void 0,
            category: void 0,
            subscription: void 0,
            payment_setup: void 0,
            session_id: void 0
          }
        });
      }
      const currentStatus = location.search?.status;
      if (currentStatus !== "waitlist") {
        throw redirect({
          to: "/landing",
          search: {
            status: "waitlist"
          },
          replace: true
        });
      }
    };
    const cached = getSyncCachedSession();
    if (cached) {
      const user2 = cached.data?.user;
      if (!cached.error && user2) {
        const rawCohort = Number(user2.cohort ?? 0);
        const cohort = Number.isFinite(rawCohort) ? rawCohort : 0;
        handleAuthRedirect(cohort);
      }
      return;
    }
    const session = await getCachedSession();
    const user = session.data?.user;
    if (!session.error && user) {
      const rawCohort = Number(user.cohort ?? 0);
      const cohort = Number.isFinite(rawCohort) ? rawCohort : 0;
      handleAuthRedirect(cohort);
    }
  },
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

//# sourceMappingURL=data:application/json;base64,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QXNCLFdBQUE7QUFBQSxZQUFBUDtBQUFBQSxVQUFBO0FBQUE7QUFBQSxpQkFBQUYsdUJBQUFVLE9BQUFDLE1BQUE7QUFBQSxjQUFBQSxLQUFBRCxPQUFBbkIsT0FBQW1CLE1BQUFuQixHQUFBb0IsTUFBQUQ7QUFBQSxjQUFBQyxLQUFBQyxNQUFBWix3QkFBQVUsT0FBQUMsS0FBQUMsS0FBQTtBQUFBRCxlQUFBRSxRQUFBQyxRQUFBQyxXQUFBZix1QkFBQVUsT0FBQUssS0FBQTtBQUFBSixlQUFBSyxtQkFBQUYsUUFBQUMsV0FBQWYsdUJBQUFVLE9BQUFLLEtBQUE7QUFBQUosZUFBQU0sU0FBQUgsUUFBQUMsV0FBQWYsdUJBQUFVLE9BQUFLLEtBQUE7QUFBQUosZUFBQU8sVUFBQUosUUFBQUMsV0FBQWYsdUJBQUFVLE9BQUFLLEtBQUE7QUFBQUosZUFBQVEsVUFBQUwsUUFBQUMsV0FBQWYsdUJBQUFVLE9BQUFLLEtBQUE7QUFBQTtBQUFBLFNBQUFyRSxPQUFBK0IsVUFBQS9CLEtBQUE7QUFBQTtBQUFBO0FBQUEiLCJuYW1lcyI6WyJjcmVhdGVGaWxlUm91dGUiLCJyZWRpcmVjdCIsImdldFN5bmNDYWNoZWRTZXNzaW9uIiwiZ2V0Q2FjaGVkU2Vzc2lvbiIsIlJvdXRlIiwidmFsaWRhdGVTZWFyY2giLCJzZWFyY2giLCJzdGF0dXMiLCJ1bmRlZmluZWQiLCJiZWZvcmVMb2FkIiwibG9jYXRpb24iLCJoYW5kbGVBdXRoUmVkaXJlY3QiLCJjb2hvcnQiLCJ0byIsIm1vZGUiLCJjYXRlZ29yeSIsInN1YnNjcmlwdGlvbiIsInBheW1lbnRfc2V0dXAiLCJzZXNzaW9uX2lkIiwiY3VycmVudFN0YXR1cyIsInJlcGxhY2UiLCJjYWNoZWQiLCJ1c2VyIiwiZGF0YSIsImVycm9yIiwicmF3Q29ob3J0IiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJzZXNzaW9uIiwiY29tcG9uZW50IiwibGF6eVJvdXRlQ29tcG9uZW50IiwiJCRzcGxpdENvbXBvbmVudEltcG9ydGVyIiwiaW1wb3J0IiwiaG90IiwiYWNjZXB0IiwibmV3TW9kdWxlIiwiaGFuZGxlUm91dGVVcGRhdGUiLCJvbGRSb3V0ZSIsIm5ld1JvdXRlIiwiX3BhdGgiLCJfaWQiLCJfZnVsbFBhdGgiLCJfdG8iLCJjaGlsZHJlbiIsInBhcmVudFJvdXRlIiwicm91dGVyIiwid2luZG93IiwiX19UU1JfUk9VVEVSX18iLCJyb3V0ZXNCeUlkIiwiaWQiLCJyb3V0ZXNCeVBhdGgiLCJmdWxsUGF0aCIsInByb2Nlc3NlZFRyZWUiLCJtYXRjaENhY2hlIiwiY2xlYXIiLCJmbGF0Q2FjaGUiLCJzaW5nbGVDYWNoZSIsInJlc29sdmVQYXRoQ2FjaGUiLCJ3YWxrUmVwbGFjZVNlZ21lbnRUcmVlIiwic2VnbWVudFRyZWUiLCJmaWx0ZXIiLCJtIiwicm91dGVJZCIsInN0YXRlIiwibWF0Y2hlcyIsImZpbmQiLCJwZW5kaW5nTWF0Y2hlcyIsImludmFsaWRhdGUiLCJyb3V0ZSIsIm5vZGUiLCJpbmRleCIsInN0YXRpYyIsImZvckVhY2giLCJjaGlsZCIsInN0YXRpY0luc2Vuc2l0aXZlIiwiZHluYW1pYyIsIm9wdGlvbmFsIiwid2lsZGNhcmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsicm91dGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUZpbGVSb3V0ZSwgcmVkaXJlY3QgfSBmcm9tIFwiQHRhbnN0YWNrL3JlYWN0LXJvdXRlclwiO1xuaW1wb3J0IHsgTGFuZGluZ1BhZ2UgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9MYW5kaW5nUGFnZVwiO1xuaW1wb3J0IHsgZ2V0U3luY0NhY2hlZFNlc3Npb24sIGdldENhY2hlZFNlc3Npb24gfSBmcm9tIFwiQC9yb3V0ZXMvX19yb290XCI7XG5cbnR5cGUgTGFuZGluZ1NlYXJjaCA9IHtcbiAgc3RhdHVzPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IGNvbnN0IFJvdXRlID0gY3JlYXRlRmlsZVJvdXRlKFwiL2xhbmRpbmdcIikoe1xuICB2YWxpZGF0ZVNlYXJjaDogKHNlYXJjaDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBMYW5kaW5nU2VhcmNoID0+ICh7XG4gICAgc3RhdHVzOiB0eXBlb2Ygc2VhcmNoLnN0YXR1cyA9PT0gXCJzdHJpbmdcIiA/IHNlYXJjaC5zdGF0dXMgOiB1bmRlZmluZWQsXG4gIH0pLFxuICBiZWZvcmVMb2FkOiBhc3luYyAoeyBsb2NhdGlvbiB9KSA9PiB7XG4gICAgLy8gSGVscGVyOiBnaXZlbiBhIGNvaG9ydCBudW1iZXIsIHJlZGlyZWN0IGF1dGhlbnRpY2F0ZWQgdXNlcnMgYXBwcm9wcmlhdGVseVxuICAgIGNvbnN0IGhhbmRsZUF1dGhSZWRpcmVjdCA9IChjb2hvcnQ6IG51bWJlcikgPT4ge1xuICAgICAgLy8gQWN0aXZlIHVzZXJzIChjb2hvcnQgPiAwKSDihpIgZ28gdG8gaG9tZVxuICAgICAgaWYgKGNvaG9ydCA+IDApIHtcbiAgICAgICAgdGhyb3cgcmVkaXJlY3Qoe1xuICAgICAgICAgIHRvOiBcIi9cIixcbiAgICAgICAgICBzZWFyY2g6IHtcbiAgICAgICAgICAgIG1vZGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNhdGVnb3J5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdWJzY3JpcHRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHBheW1lbnRfc2V0dXA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNlc3Npb25faWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIFdhaXRsaXN0ZWQgKGNvaG9ydCAwKSBvciBwZW5kaW5nIHJlZ2lzdHJhdGlvbiAoY29ob3J0IC0xKSDihpIgc2hvdyB3YWl0bGlzdFxuICAgICAgY29uc3QgY3VycmVudFN0YXR1cyA9IChsb2NhdGlvbi5zZWFyY2ggYXMgTGFuZGluZ1NlYXJjaCB8IHVuZGVmaW5lZClcbiAgICAgICAgPy5zdGF0dXM7XG4gICAgICBpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJ3YWl0bGlzdFwiKSB7XG4gICAgICAgIHRocm93IHJlZGlyZWN0KHtcbiAgICAgICAgICB0bzogXCIvbGFuZGluZ1wiLFxuICAgICAgICAgIHNlYXJjaDogeyBzdGF0dXM6IFwid2FpdGxpc3RcIiB9LFxuICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBUcnkgc3luYyBjYWNoZSBmaXJzdCAoaW5zdGFudCB3aGVuIGNhY2hlIGlzIHdhcm0pXG4gICAgY29uc3QgY2FjaGVkID0gZ2V0U3luY0NhY2hlZFNlc3Npb24oKTtcbiAgICBpZiAoY2FjaGVkKSB7XG4gICAgICBjb25zdCB1c2VyID0gY2FjaGVkLmRhdGE/LnVzZXIgYXNcbiAgICAgICAgfCB7IGNvaG9ydD86IG51bWJlciB8IHN0cmluZyB9XG4gICAgICAgIHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKCFjYWNoZWQuZXJyb3IgJiYgdXNlcikge1xuICAgICAgICBjb25zdCByYXdDb2hvcnQgPSBOdW1iZXIodXNlci5jb2hvcnQgPz8gMCk7XG4gICAgICAgIGNvbnN0IGNvaG9ydCA9IE51bWJlci5pc0Zpbml0ZShyYXdDb2hvcnQpID8gcmF3Q29ob3J0IDogMDtcbiAgICAgICAgaGFuZGxlQXV0aFJlZGlyZWN0KGNvaG9ydCk7XG4gICAgICB9XG4gICAgICByZXR1cm47IC8vIElOU1RBTlQgLSBubyBhd2FpdCBuZWVkZWRcbiAgICB9XG5cbiAgICAvLyBObyBjYWNoZSAtIG11c3QgYXdhaXQgZm9yIHJlZGlyZWN0IGxvZ2ljLlxuICAgIC8vIFVzZSB0aGUgc2hhcmVkIGdldENhY2hlZFNlc3Npb24gc28gdGhlIHJvb3QgYmVmb3JlTG9hZCBjYW4gcmV1c2VcbiAgICAvLyB0aGlzIHJlc3VsdCB3aGVuIHdlIHJlZGlyZWN0IHRvIFwiL1wiIChhdm9pZHMgYSBzZWNvbmQgbmV0d29yayBjYWxsKS5cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0Q2FjaGVkU2Vzc2lvbigpO1xuICAgIGNvbnN0IHVzZXIgPSBzZXNzaW9uLmRhdGE/LnVzZXIgYXMgeyBjb2hvcnQ/OiBudW1iZXIgfCBzdHJpbmcgfSB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXNlc3Npb24uZXJyb3IgJiYgdXNlcikge1xuICAgICAgY29uc3QgcmF3Q29ob3J0ID0gTnVtYmVyKHVzZXIuY29ob3J0ID8/IDApO1xuICAgICAgY29uc3QgY29ob3J0ID0gTnVtYmVyLmlzRmluaXRlKHJhd0NvaG9ydCkgPyByYXdDb2hvcnQgOiAwO1xuICAgICAgaGFuZGxlQXV0aFJlZGlyZWN0KGNvaG9ydCk7XG4gICAgfVxuICAgIC8vIElmIG5vIHNlc3Npb24gb3IgdXNlciwgYWxsb3cgbGFuZGluZyBwYWdlIHRvIHNob3cgKGZvciBzaWduLWluKVxuICB9LFxuICBjb21wb25lbnQ6IExhbmRpbmdQYWdlLFxufSk7XG4iXSwiZmlsZSI6Ii9Vc2Vycy93aWxsaS9EZXNrdG9wL09hc2l6L29hc2l6L2Zyb250ZW5kL3NyYy9yb3V0ZXMvbGFuZGluZy9yb3V0ZS50c3gifQ==