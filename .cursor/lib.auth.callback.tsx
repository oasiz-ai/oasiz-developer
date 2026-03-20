import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/lib/auth/callback.tsx");import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/willi/Desktop/Oasiz/oasiz/frontend/src/lib/auth/callback.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport2_react from "/node_modules/.vite/deps/react.js?v=bb9d3c39"; const React = ((m) => m?.__esModule ? m : {	...typeof m === "object" && !Array.isArray(m) || typeof m === "function" ? m : {},	default: m})(__vite__cjsImport2_react);
import { useNavigate } from "/node_modules/.vite/deps/@tanstack_react-router.js?v=bb9d3c39";
export default function Callback() {
  _s();
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate({ to: "/", search: { mode: void 0, category: void 0 } });
  }, [navigate]);
  return null;
}
_s(Callback, "0pNeyzXk/ByIxyERsdaIrG6js9s=", false, function() {
  return [useNavigate];
});
_c = Callback;
var _c;
$RefreshReg$(_c, "Callback");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/willi/Desktop/Oasiz/oasiz/frontend/src/lib/auth/callback.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/willi/Desktop/Oasiz/oasiz/frontend/src/lib/auth/callback.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFlBQVlBLFdBQVc7QUFDdkIsU0FBU0MsbUJBQW1CO0FBRTVCLHdCQUF3QkMsV0FBVztBQUFBQyxLQUFBO0FBQ2pDLFFBQU1DLFdBQVdILFlBQVk7QUFDN0JELFFBQU1LLFVBQVUsTUFBTTtBQUNwQkQsYUFBUyxFQUFFRSxJQUFJLEtBQUtDLFFBQVEsRUFBRUMsTUFBTUMsUUFBV0MsVUFBVUQsT0FBVSxFQUFFLENBQUM7QUFBQSxFQUN4RSxHQUFHLENBQUNMLFFBQVEsQ0FBQztBQUNiLFNBQU87QUFDVDtBQUFDRCxHQU51QkQsVUFBUTtBQUFBLFVBQ2JELFdBQVc7QUFBQTtBQUFBVSxLQUROVDtBQUFRLElBQUFTO0FBQUFDLGFBQUFELElBQUEiLCJuYW1lcyI6WyJSZWFjdCIsInVzZU5hdmlnYXRlIiwiQ2FsbGJhY2siLCJfcyIsIm5hdmlnYXRlIiwidXNlRWZmZWN0IiwidG8iLCJzZWFyY2giLCJtb2RlIiwidW5kZWZpbmVkIiwiY2F0ZWdvcnkiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJjYWxsYmFjay50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gXCJAdGFuc3RhY2svcmVhY3Qtcm91dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhbGxiYWNrKCkge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbmF2aWdhdGUoeyB0bzogXCIvXCIsIHNlYXJjaDogeyBtb2RlOiB1bmRlZmluZWQsIGNhdGVnb3J5OiB1bmRlZmluZWQgfSB9KTtcbiAgfSwgW25hdmlnYXRlXSk7XG4gIHJldHVybiBudWxsO1xufVxuIl0sImZpbGUiOiIvVXNlcnMvd2lsbGkvRGVza3RvcC9PYXNpei9vYXNpei9mcm9udGVuZC9zcmMvbGliL2F1dGgvY2FsbGJhY2sudHN4In0=