import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_API_URL": "http://localhost:3001", "VITE_LAUNCHDARKLY_CLIENT_ID": "68b1f8b932aaac0a83180cab", "VITE_MIXPANEL_TOKEN": "96daca5ad616478bb472df3d04814f36", "VITE_PLAYROOM_GAME_ID": "BeQVGjqLvQ8r9BqqwaEg", "VITE_SENTRY_DSN": "https://1bef8eafd13bd21b7eb8ec1e055de76e@o4509924614864896.ingest.us.sentry.io/4509924630724608"};import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=bb9d3c39"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
if (false) {
  const noop = () => {
  };
  console.log = noop;
  console.error = noop;
  console.warn = noop;
  console.info = noop;
  console.debug = noop;
  console.trace = noop;
  console.time = noop;
  console.timeEnd = noop;
}
import { LDProvider } from "/node_modules/.vite/deps/launchdarkly-react-client-sdk.js?v=bb9d3c39";
import __vite__cjsImport2_react from "/node_modules/.vite/deps/react.js?v=bb9d3c39"; const StrictMode = __vite__cjsImport2_react["StrictMode"];
import __vite__cjsImport3_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=bb9d3c39"; const createRoot = __vite__cjsImport3_reactDom_client["createRoot"];
import { RouterProvider, createRouter } from "/node_modules/.vite/deps/@tanstack_react-router.js?v=bb9d3c39";
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=bb9d3c39";
import { AUTH_INVALID_EVENT } from "/src/lib/auth/events.ts";
import { routeTree } from "/src/routeTree.gen.ts?t=1774022285698";
import "/src/styles.css";
import reportWebVitals from "/src/reportWebVitals.ts";
import "/src/custom-cursor.css";
import "/@fs/Users/willi/Desktop/Oasiz/oasiz/node_modules/.bun/@fortawesome+fontawesome-free@7.1.0/node_modules/@fortawesome/fontawesome-free/css/all.min.css";
function isSameOriginApiRequest(input) {
  if (typeof window === "undefined") return false;
  try {
    const rawUrl = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const resolved = new URL(rawUrl, window.location.origin);
    return resolved.origin === window.location.origin && resolved.pathname.startsWith("/api/");
  } catch {
    return false;
  }
}
function installAuthInvalidFetchInterceptor() {
  if (typeof window === "undefined") return;
  const win = window;
  if (win.__oasizFetchAuthHookInstalled) return;
  win.__oasizFetchAuthHookInstalled = true;
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const response = await originalFetch(input, init);
    if (response.status === 401 && isSameOriginApiRequest(input)) {
      if (!win.__oasizAuthInvalidDispatched) {
        win.__oasizAuthInvalidDispatched = true;
        window.dispatchEvent(new CustomEvent(AUTH_INVALID_EVENT));
        setTimeout(() => {
          win.__oasizAuthInvalidDispatched = false;
        }, 300);
      }
    }
    return response;
  };
}
installAuthInvalidFetchInterceptor();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60,
      // 1 minute
      refetchOnWindowFocus: false
    }
  }
});
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  defaultPendingMs: 0,
  // Show new route immediately (instant transitions)
  defaultPendingMinMs: 0,
  // No minimum wait time
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0
});
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    /* @__PURE__ */ jsxDEV(StrictMode, { children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxDEV(
      LDProvider,
      {
        clientSideID: import.meta.env.VITE_LAUNCHDARKLY_CLIENT_ID || "",
        children: /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
          fileName: "/Users/willi/Desktop/Oasiz/oasiz/frontend/src/main.tsx",
          lineNumber: 121,
          columnNumber: 11
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/Users/willi/Desktop/Oasiz/oasiz/frontend/src/main.tsx",
        lineNumber: 118,
        columnNumber: 9
      },
      void 0
    ) }, void 0, false, {
      fileName: "/Users/willi/Desktop/Oasiz/oasiz/frontend/src/main.tsx",
      lineNumber: 117,
      columnNumber: 7
    }, void 0) }, void 0, false, {
      fileName: "/Users/willi/Desktop/Oasiz/oasiz/frontend/src/main.tsx",
      lineNumber: 116,
      columnNumber: 5
    }, void 0)
  );
}
reportWebVitals();

//# sourceMappingURL=data:application/json;base64,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O0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQStCO0FBQUE7QUFBQSxNQUhqQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJQSxLQUxGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFNQSxLQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFRQTtBQUFBLEVBQ0Y7QUFDRjtBQUtBL0MsZ0JBQWdCIiwibmFtZXMiOlsicHJvY2VzcyIsIm5vb3AiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJ3YXJuIiwiaW5mbyIsImRlYnVnIiwidHJhY2UiLCJ0aW1lIiwidGltZUVuZCIsIkxEUHJvdmlkZXIiLCJTdHJpY3RNb2RlIiwiY3JlYXRlUm9vdCIsIlJvdXRlclByb3ZpZGVyIiwiY3JlYXRlUm91dGVyIiwiUXVlcnlDbGllbnQiLCJRdWVyeUNsaWVudFByb3ZpZGVyIiwiQVVUSF9JTlZBTElEX0VWRU5UIiwicm91dGVUcmVlIiwicmVwb3J0V2ViVml0YWxzIiwiaXNTYW1lT3JpZ2luQXBpUmVxdWVzdCIsImlucHV0Iiwid2luZG93IiwicmF3VXJsIiwiVVJMIiwidG9TdHJpbmciLCJ1cmwiLCJyZXNvbHZlZCIsImxvY2F0aW9uIiwib3JpZ2luIiwicGF0aG5hbWUiLCJzdGFydHNXaXRoIiwiaW5zdGFsbEF1dGhJbnZhbGlkRmV0Y2hJbnRlcmNlcHRvciIsIndpbiIsIl9fb2FzaXpGZXRjaEF1dGhIb29rSW5zdGFsbGVkIiwib3JpZ2luYWxGZXRjaCIsImZldGNoIiwiYmluZCIsImluaXQiLCJyZXNwb25zZSIsInN0YXR1cyIsIl9fb2FzaXpBdXRoSW52YWxpZERpc3BhdGNoZWQiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJzZXRUaW1lb3V0IiwicXVlcnlDbGllbnQiLCJkZWZhdWx0T3B0aW9ucyIsInF1ZXJpZXMiLCJzdGFsZVRpbWUiLCJyZWZldGNoT25XaW5kb3dGb2N1cyIsInJvdXRlciIsImNvbnRleHQiLCJkZWZhdWx0UHJlbG9hZCIsImRlZmF1bHRQZW5kaW5nTXMiLCJkZWZhdWx0UGVuZGluZ01pbk1zIiwic2Nyb2xsUmVzdG9yYXRpb24iLCJkZWZhdWx0U3RydWN0dXJhbFNoYXJpbmciLCJkZWZhdWx0UHJlbG9hZFN0YWxlVGltZSIsInJvb3RFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsInJvb3QiLCJyZW5kZXIiLCJpbXBvcnQiLCJlbnYiLCJWSVRFX0xBVU5DSERBUktMWV9DTElFTlRfSUQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsibWFpbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gT3ZlcnJpZGUgY29uc29sZSBtZXRob2RzIHRvIGhpZGUgYWxsIGxvZ3MgKG9ubHkgaW4gcHJvZHVjdGlvbilcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuICBjb25zb2xlLmxvZyA9IG5vb3A7XG4gIGNvbnNvbGUuZXJyb3IgPSBub29wO1xuICBjb25zb2xlLndhcm4gPSBub29wO1xuICBjb25zb2xlLmluZm8gPSBub29wO1xuICBjb25zb2xlLmRlYnVnID0gbm9vcDtcbiAgY29uc29sZS50cmFjZSA9IG5vb3A7XG4gIGNvbnNvbGUudGltZSA9IG5vb3A7XG4gIGNvbnNvbGUudGltZUVuZCA9IG5vb3A7XG59XG5cbmltcG9ydCB7IExEUHJvdmlkZXIgfSBmcm9tIFwibGF1bmNoZGFya2x5LXJlYWN0LWNsaWVudC1zZGtcIjtcblxuaW1wb3J0IHsgU3RyaWN0TW9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgeyBSb3V0ZXJQcm92aWRlciwgY3JlYXRlUm91dGVyIH0gZnJvbSBcIkB0YW5zdGFjay9yZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCB7IFF1ZXJ5Q2xpZW50LCBRdWVyeUNsaWVudFByb3ZpZGVyIH0gZnJvbSBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiO1xuaW1wb3J0IHsgQVVUSF9JTlZBTElEX0VWRU5UIH0gZnJvbSBcIi4vbGliL2F1dGgvZXZlbnRzXCI7XG5cbi8vIEltcG9ydCB0aGUgZ2VuZXJhdGVkIHJvdXRlIHRyZWVcbmltcG9ydCB7IHJvdXRlVHJlZSB9IGZyb20gXCIuL3JvdXRlVHJlZS5nZW5cIjtcblxuaW1wb3J0IFwiLi9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgcmVwb3J0V2ViVml0YWxzIGZyb20gXCIuL3JlcG9ydFdlYlZpdGFscy50c1wiO1xuaW1wb3J0IFwiLi9jdXN0b20tY3Vyc29yLmNzc1wiO1xuaW1wb3J0IFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5taW4uY3NzXCI7XG5cbnR5cGUgT2FzaXpXaW5kb3cgPSBXaW5kb3cgJiB7XG4gIF9fb2FzaXpGZXRjaEF1dGhIb29rSW5zdGFsbGVkPzogYm9vbGVhbjtcbiAgX19vYXNpekF1dGhJbnZhbGlkRGlzcGF0Y2hlZD86IGJvb2xlYW47XG59O1xuXG5mdW5jdGlvbiBpc1NhbWVPcmlnaW5BcGlSZXF1ZXN0KGlucHV0OiBSZXF1ZXN0SW5mbyB8IFVSTCk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmF3VXJsID1cbiAgICAgIHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IGlucHV0XG4gICAgICAgIDogaW5wdXQgaW5zdGFuY2VvZiBVUkxcbiAgICAgICAgICA/IGlucHV0LnRvU3RyaW5nKClcbiAgICAgICAgICA6IGlucHV0LnVybDtcbiAgICBjb25zdCByZXNvbHZlZCA9IG5ldyBVUkwocmF3VXJsLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICByZXR1cm4gKFxuICAgICAgcmVzb2x2ZWQub3JpZ2luID09PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICYmXG4gICAgICByZXNvbHZlZC5wYXRobmFtZS5zdGFydHNXaXRoKFwiL2FwaS9cIilcbiAgICApO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zdGFsbEF1dGhJbnZhbGlkRmV0Y2hJbnRlcmNlcHRvcigpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgY29uc3Qgd2luID0gd2luZG93IGFzIE9hc2l6V2luZG93O1xuICBpZiAod2luLl9fb2FzaXpGZXRjaEF1dGhIb29rSW5zdGFsbGVkKSByZXR1cm47XG4gIHdpbi5fX29hc2l6RmV0Y2hBdXRoSG9va0luc3RhbGxlZCA9IHRydWU7XG5cbiAgY29uc3Qgb3JpZ2luYWxGZXRjaCA9IHdpbmRvdy5mZXRjaC5iaW5kKHdpbmRvdyk7XG4gIHdpbmRvdy5mZXRjaCA9IGFzeW5jIChpbnB1dCwgaW5pdCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb3JpZ2luYWxGZXRjaChpbnB1dCwgaW5pdCk7XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgJiYgaXNTYW1lT3JpZ2luQXBpUmVxdWVzdChpbnB1dCkpIHtcbiAgICAgIGlmICghd2luLl9fb2FzaXpBdXRoSW52YWxpZERpc3BhdGNoZWQpIHtcbiAgICAgICAgd2luLl9fb2FzaXpBdXRoSW52YWxpZERpc3BhdGNoZWQgPSB0cnVlO1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoQVVUSF9JTlZBTElEX0VWRU5UKSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdpbi5fX29hc2l6QXV0aEludmFsaWREaXNwYXRjaGVkID0gZmFsc2U7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9O1xufVxuXG5pbnN0YWxsQXV0aEludmFsaWRGZXRjaEludGVyY2VwdG9yKCk7XG5cbi8vIENyZWF0ZSBhIHNpbmdsZSBRdWVyeUNsaWVudCBmb3IgdGhlIGFwcCBhbmQgcHJvdmlkZSB0byByb3V0ZXIgY29udGV4dFxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoe1xuICBkZWZhdWx0T3B0aW9uczoge1xuICAgIHF1ZXJpZXM6IHtcbiAgICAgIHN0YWxlVGltZTogMTAwMCAqIDYwLCAvLyAxIG1pbnV0ZVxuICAgICAgcmVmZXRjaE9uV2luZG93Rm9jdXM6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG59KTtcblxuLy8gQ3JlYXRlIGEgbmV3IHJvdXRlciBpbnN0YW5jZVxuY29uc3Qgcm91dGVyID0gY3JlYXRlUm91dGVyKHtcbiAgcm91dGVUcmVlLFxuICBjb250ZXh0OiB7IHF1ZXJ5Q2xpZW50IH0sXG4gIGRlZmF1bHRQcmVsb2FkOiBcImludGVudFwiLFxuICBkZWZhdWx0UGVuZGluZ01zOiAwLCAvLyBTaG93IG5ldyByb3V0ZSBpbW1lZGlhdGVseSAoaW5zdGFudCB0cmFuc2l0aW9ucylcbiAgZGVmYXVsdFBlbmRpbmdNaW5NczogMCwgLy8gTm8gbWluaW11bSB3YWl0IHRpbWVcbiAgc2Nyb2xsUmVzdG9yYXRpb246IHRydWUsXG4gIGRlZmF1bHRTdHJ1Y3R1cmFsU2hhcmluZzogdHJ1ZSxcbiAgZGVmYXVsdFByZWxvYWRTdGFsZVRpbWU6IDAsXG59KTtcblxuLy8gUmVnaXN0ZXIgdGhlIHJvdXRlciBpbnN0YW5jZSBmb3IgdHlwZSBzYWZldHlcbmRlY2xhcmUgbW9kdWxlIFwiQHRhbnN0YWNrL3JlYWN0LXJvdXRlclwiIHtcbiAgaW50ZXJmYWNlIFJlZ2lzdGVyIHtcbiAgICByb3V0ZXI6IHR5cGVvZiByb3V0ZXI7XG4gIH1cbn1cblxuLy8gUmVuZGVyIHRoZSBhcHBcbmNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIik7XG5pZiAocm9vdEVsZW1lbnQgJiYgIXJvb3RFbGVtZW50LmlubmVySFRNTCkge1xuICAvLyBDdXN0b20gY3Vyc29yIENTUyBpcyBhcHBsaWVkIGdsb2JhbGx5IHZpYSBjdXN0b20tY3Vyc29yLmNzc1xuICBjb25zdCByb290ID0gY3JlYXRlUm9vdChyb290RWxlbWVudCk7XG4gIHJvb3QucmVuZGVyKFxuICAgIDxTdHJpY3RNb2RlPlxuICAgICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICAgIDxMRFByb3ZpZGVyXG4gICAgICAgICAgY2xpZW50U2lkZUlEPXtpbXBvcnQubWV0YS5lbnYuVklURV9MQVVOQ0hEQVJLTFlfQ0xJRU5UX0lEIHx8IFwiXCJ9XG4gICAgICAgID5cbiAgICAgICAgICA8Um91dGVyUHJvdmlkZXIgcm91dGVyPXtyb3V0ZXJ9IC8+XG4gICAgICAgIDwvTERQcm92aWRlcj5cbiAgICAgIDwvUXVlcnlDbGllbnRQcm92aWRlcj5cbiAgICA8L1N0cmljdE1vZGU+LFxuICApO1xufVxuXG4vLyBJZiB5b3Ugd2FudCB0byBzdGFydCBtZWFzdXJpbmcgcGVyZm9ybWFuY2UgaW4geW91ciBhcHAsIHBhc3MgYSBmdW5jdGlvblxuLy8gdG8gbG9nIHJlc3VsdHMgKGZvciBleGFtcGxlOiByZXBvcnRXZWJWaXRhbHMoY29uc29sZS5sb2cpKVxuLy8gb3Igc2VuZCB0byBhbiBhbmFseXRpY3MgZW5kcG9pbnQuIExlYXJuIG1vcmU6IGh0dHBzOi8vYml0Lmx5L0NSQS12aXRhbHNcbnJlcG9ydFdlYlZpdGFscygpO1xuIl0sImZpbGUiOiIvVXNlcnMvd2lsbGkvRGVza3RvcC9PYXNpei9vYXNpei9mcm9udGVuZC9zcmMvbWFpbi50c3gifQ==