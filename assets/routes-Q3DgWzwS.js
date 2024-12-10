const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-D_Hs-RaH.js","assets/index-Bs2EL0Mm.js","assets/index-DAbXUXm9.css","assets/use-llm-Kc_COJca.js","assets/ApplicationPage-DJJPRMNP.js","assets/index-BQH3pFhd.js","assets/copy-ALodIprG.js","assets/createLucideIcon-DZXM6zSt.js","assets/refresh-ccw-m-iSj44n.js","assets/volume-2-D2EG3p1s.js"])))=>i.map(i=>d[i]);
import { r as reactExports, R as React, a as ReactDOM, u as useLayoutEffect2, c as createContextScope$2, b as useControllableState, j as jsxRuntimeExports, P as Primitive, d as composeEventHandlers, e as Presence, f as useComposedRefs, g as cn, h as cva, S as Slot, i as useCallbackRef$1, D as DismissableLayer, k as createContext2, l as Portal$3, L as LazyIcon, m as reactDomExports, n as Slottable, o as Root$6, p as useTranslation, q as motion, s as useSessionState, t as useAppState, v as create, w as useModal, x as useToast, y as getRepository, z as createCollection, A as composeRefs, B as dispatchDiscreteCustomEvent, C as SessionTypeEnum, _ as __vitePreload, E as DefaultLoader, F as logDebug, __tla as __tla_0 } from "./index-Bs2EL0Mm.js";
let TooltipContent, Anchor2, Button, Content2$1, Root$5, Content$2, FocusScope, Group, useSize, Item, Input, Dialog, Label, DialogContent, DialogHeader, Overlay, Portal, DialogTitle, Root, Separator, Trigger$3, DialogDescription, DialogFooter, Badge, buttonVariants, TooltipProvider, Tooltip, TooltipTrigger, createRovingFocusGroupScope, Separator$1, Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, offset$1, Title2, Description2, Action, Cancel, Portal2$1, Root2$1, Sub, Close, Title, Description, shift$1, limitShift$1, size$1, arrow$2, routes, flip$1, computePosition, autoUpdate, Root$4, Provider, Root3$1, Trigger$1, Portal$1, Content2$3, Group2, RadioGroup2, Content2, SubTrigger2, SubContent2, Portal2, Item2, CheckboxItem2, ItemIndicator2, RadioItem2, Label2, Separator2, Root2, Trigger, Sub2, Overlay2, Content2$2, Item2$1, createMenuScope, CheckboxItem, RadioGroup, RadioItem, ItemIndicator, Arrow2, SubTrigger, SubContent, useId, Root3, createPopperScope, Anchor, hideOthers, ReactRemoveScroll, useFocusGuards, Content, Arrow, Root2$2, useDirection, Root$3, Portal$2, Content$1, Label$1, createCollapsibleScope;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function _extends$2() {
    _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$2.apply(this, arguments);
  }
  var Action$1;
  (function(Action2) {
    Action2["Pop"] = "POP";
    Action2["Push"] = "PUSH";
    Action2["Replace"] = "REPLACE";
  })(Action$1 || (Action$1 = {}));
  const PopStateEventType = "popstate";
  function createBrowserHistory(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    function createBrowserLocation(window2, globalHistory) {
      let { pathname, search, hash } = window2.location;
      return createLocation("", {
        pathname,
        search,
        hash
      }, globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
    }
    function createBrowserHref(window2, to) {
      return typeof to === "string" ? to : createPath(to);
    }
    return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options2);
  }
  function invariant(value, message) {
    if (value === false || value === null || typeof value === "undefined") {
      throw new Error(message);
    }
  }
  function warning(cond, message) {
    if (!cond) {
      if (typeof console !== "undefined") console.warn(message);
      try {
        throw new Error(message);
      } catch (e) {
      }
    }
  }
  function createKey() {
    return Math.random().toString(36).substr(2, 8);
  }
  function getHistoryState(location, index2) {
    return {
      usr: location.state,
      key: location.key,
      idx: index2
    };
  }
  function createLocation(current, to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = _extends$2({
      pathname: typeof current === "string" ? current : current.pathname,
      search: "",
      hash: ""
    }, typeof to === "string" ? parsePath(to) : to, {
      state,
      key: to && to.key || key || createKey()
    });
    return location;
  }
  function createPath(_ref) {
    let { pathname = "/", search = "", hash = "" } = _ref;
    if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
    if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
    return pathname;
  }
  function parsePath(path) {
    let parsedPath = {};
    if (path) {
      let hashIndex = path.indexOf("#");
      if (hashIndex >= 0) {
        parsedPath.hash = path.substr(hashIndex);
        path = path.substr(0, hashIndex);
      }
      let searchIndex = path.indexOf("?");
      if (searchIndex >= 0) {
        parsedPath.search = path.substr(searchIndex);
        path = path.substr(0, searchIndex);
      }
      if (path) {
        parsedPath.pathname = path;
      }
    }
    return parsedPath;
  }
  function getUrlBasedHistory(getLocation, createHref, validateLocation, options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    let { window: window2 = document.defaultView, v5Compat = false } = options2;
    let globalHistory = window2.history;
    let action = Action$1.Pop;
    let listener = null;
    let index2 = getIndex();
    if (index2 == null) {
      index2 = 0;
      globalHistory.replaceState(_extends$2({}, globalHistory.state, {
        idx: index2
      }), "");
    }
    function getIndex() {
      let state = globalHistory.state || {
        idx: null
      };
      return state.idx;
    }
    function handlePop() {
      action = Action$1.Pop;
      let nextIndex = getIndex();
      let delta = nextIndex == null ? null : nextIndex - index2;
      index2 = nextIndex;
      if (listener) {
        listener({
          action,
          location: history.location,
          delta
        });
      }
    }
    function push(to, state) {
      action = Action$1.Push;
      let location = createLocation(history.location, to, state);
      index2 = getIndex() + 1;
      let historyState = getHistoryState(location, index2);
      let url = history.createHref(location);
      try {
        globalHistory.pushState(historyState, "", url);
      } catch (error) {
        if (error instanceof DOMException && error.name === "DataCloneError") {
          throw error;
        }
        window2.location.assign(url);
      }
      if (v5Compat && listener) {
        listener({
          action,
          location: history.location,
          delta: 1
        });
      }
    }
    function replace(to, state) {
      action = Action$1.Replace;
      let location = createLocation(history.location, to, state);
      index2 = getIndex();
      let historyState = getHistoryState(location, index2);
      let url = history.createHref(location);
      globalHistory.replaceState(historyState, "", url);
      if (v5Compat && listener) {
        listener({
          action,
          location: history.location,
          delta: 0
        });
      }
    }
    function createURL(to) {
      let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
      let href = typeof to === "string" ? to : createPath(to);
      href = href.replace(/ $/, "%20");
      invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
      return new URL(href, base);
    }
    let history = {
      get action() {
        return action;
      },
      get location() {
        return getLocation(window2, globalHistory);
      },
      listen(fn) {
        if (listener) {
          throw new Error("A history only accepts one active listener");
        }
        window2.addEventListener(PopStateEventType, handlePop);
        listener = fn;
        return () => {
          window2.removeEventListener(PopStateEventType, handlePop);
          listener = null;
        };
      },
      createHref(to) {
        return createHref(window2, to);
      },
      createURL,
      encodeLocation(to) {
        let url = createURL(to);
        return {
          pathname: url.pathname,
          search: url.search,
          hash: url.hash
        };
      },
      push,
      replace,
      go(n) {
        return globalHistory.go(n);
      }
    };
    return history;
  }
  var ResultType;
  (function(ResultType2) {
    ResultType2["data"] = "data";
    ResultType2["deferred"] = "deferred";
    ResultType2["redirect"] = "redirect";
    ResultType2["error"] = "error";
  })(ResultType || (ResultType = {}));
  const immutableRouteKeys = /* @__PURE__ */ new Set([
    "lazy",
    "caseSensitive",
    "path",
    "id",
    "index",
    "children"
  ]);
  function isIndexRoute(route) {
    return route.index === true;
  }
  function convertRoutesToDataRoutes(routes2, mapRouteProperties2, parentPath, manifest) {
    if (parentPath === void 0) {
      parentPath = [];
    }
    if (manifest === void 0) {
      manifest = {};
    }
    return routes2.map((route, index2) => {
      let treePath = [
        ...parentPath,
        String(index2)
      ];
      let id = typeof route.id === "string" ? route.id : treePath.join("-");
      invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
      invariant(!manifest[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`);
      if (isIndexRoute(route)) {
        let indexRoute = _extends$2({}, route, mapRouteProperties2(route), {
          id
        });
        manifest[id] = indexRoute;
        return indexRoute;
      } else {
        let pathOrLayoutRoute = _extends$2({}, route, mapRouteProperties2(route), {
          id,
          children: void 0
        });
        manifest[id] = pathOrLayoutRoute;
        if (route.children) {
          pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties2, treePath, manifest);
        }
        return pathOrLayoutRoute;
      }
    });
  }
  function matchRoutes(routes2, locationArg, basename) {
    if (basename === void 0) {
      basename = "/";
    }
    return matchRoutesImpl(routes2, locationArg, basename, false);
  }
  function matchRoutesImpl(routes2, locationArg, basename, allowPartial) {
    let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    let pathname = stripBasename(location.pathname || "/", basename);
    if (pathname == null) {
      return null;
    }
    let branches = flattenRoutes(routes2);
    rankRouteBranches(branches);
    let matches = null;
    for (let i = 0; matches == null && i < branches.length; ++i) {
      let decoded = decodePath(pathname);
      matches = matchRouteBranch(branches[i], decoded, allowPartial);
    }
    return matches;
  }
  function convertRouteMatchToUiMatch(match, loaderData) {
    let { route, pathname, params } = match;
    return {
      id: route.id,
      pathname,
      params,
      data: loaderData[route.id],
      handle: route.handle
    };
  }
  function flattenRoutes(routes2, branches, parentsMeta, parentPath) {
    if (branches === void 0) {
      branches = [];
    }
    if (parentsMeta === void 0) {
      parentsMeta = [];
    }
    if (parentPath === void 0) {
      parentPath = "";
    }
    let flattenRoute = (route, index2, relativePath) => {
      let meta = {
        relativePath: relativePath === void 0 ? route.path || "" : relativePath,
        caseSensitive: route.caseSensitive === true,
        childrenIndex: index2,
        route
      };
      if (meta.relativePath.startsWith("/")) {
        invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
        meta.relativePath = meta.relativePath.slice(parentPath.length);
      }
      let path = joinPaths([
        parentPath,
        meta.relativePath
      ]);
      let routesMeta = parentsMeta.concat(meta);
      if (route.children && route.children.length > 0) {
        invariant(route.index !== true, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".'));
        flattenRoutes(route.children, branches, routesMeta, path);
      }
      if (route.path == null && !route.index) {
        return;
      }
      branches.push({
        path,
        score: computeScore(path, route.index),
        routesMeta
      });
    };
    routes2.forEach((route, index2) => {
      var _route$path;
      if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
        flattenRoute(route, index2);
      } else {
        for (let exploded of explodeOptionalSegments(route.path)) {
          flattenRoute(route, index2, exploded);
        }
      }
    });
    return branches;
  }
  function explodeOptionalSegments(path) {
    let segments = path.split("/");
    if (segments.length === 0) return [];
    let [first, ...rest] = segments;
    let isOptional = first.endsWith("?");
    let required = first.replace(/\?$/, "");
    if (rest.length === 0) {
      return isOptional ? [
        required,
        ""
      ] : [
        required
      ];
    }
    let restExploded = explodeOptionalSegments(rest.join("/"));
    let result = [];
    result.push(...restExploded.map((subpath) => subpath === "" ? required : [
      required,
      subpath
    ].join("/")));
    if (isOptional) {
      result.push(...restExploded);
    }
    return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
  }
  function rankRouteBranches(branches) {
    branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
  }
  const paramRe = /^:[\w-]+$/;
  const dynamicSegmentValue = 3;
  const indexRouteValue = 2;
  const emptySegmentValue = 1;
  const staticSegmentValue = 10;
  const splatPenalty = -2;
  const isSplat = (s) => s === "*";
  function computeScore(path, index2) {
    let segments = path.split("/");
    let initialScore = segments.length;
    if (segments.some(isSplat)) {
      initialScore += splatPenalty;
    }
    if (index2) {
      initialScore += indexRouteValue;
    }
    return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
  }
  function compareIndexes(a, b) {
    let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
    return siblings ? a[a.length - 1] - b[b.length - 1] : 0;
  }
  function matchRouteBranch(branch, pathname, allowPartial) {
    if (allowPartial === void 0) {
      allowPartial = false;
    }
    let { routesMeta } = branch;
    let matchedParams = {};
    let matchedPathname = "/";
    let matches = [];
    for (let i = 0; i < routesMeta.length; ++i) {
      let meta = routesMeta[i];
      let end = i === routesMeta.length - 1;
      let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
      let match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end
      }, remainingPathname);
      let route = meta.route;
      if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
        match = matchPath({
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end: false
        }, remainingPathname);
      }
      if (!match) {
        return null;
      }
      Object.assign(matchedParams, match.params);
      matches.push({
        params: matchedParams,
        pathname: joinPaths([
          matchedPathname,
          match.pathname
        ]),
        pathnameBase: normalizePathname(joinPaths([
          matchedPathname,
          match.pathnameBase
        ])),
        route
      });
      if (match.pathnameBase !== "/") {
        matchedPathname = joinPaths([
          matchedPathname,
          match.pathnameBase
        ]);
      }
    }
    return matches;
  }
  function matchPath(pattern, pathname) {
    if (typeof pattern === "string") {
      pattern = {
        path: pattern,
        caseSensitive: false,
        end: true
      };
    }
    let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
    let match = pathname.match(matcher);
    if (!match) return null;
    let matchedPathname = match[0];
    let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
    let captureGroups = match.slice(1);
    let params = compiledParams.reduce((memo, _ref, index2) => {
      let { paramName, isOptional } = _ref;
      if (paramName === "*") {
        let splatValue = captureGroups[index2] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      const value = captureGroups[index2];
      if (isOptional && !value) {
        memo[paramName] = void 0;
      } else {
        memo[paramName] = (value || "").replace(/%2F/g, "/");
      }
      return memo;
    }, {});
    return {
      params,
      pathname: matchedPathname,
      pathnameBase,
      pattern
    };
  }
  function compilePath(path, caseSensitive, end) {
    if (caseSensitive === void 0) {
      caseSensitive = false;
    }
    if (end === void 0) {
      end = true;
    }
    warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
    let params = [];
    let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
      params.push({
        paramName,
        isOptional: isOptional != null
      });
      return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
    });
    if (path.endsWith("*")) {
      params.push({
        paramName: "*"
      });
      regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
    } else if (end) {
      regexpSource += "\\/*$";
    } else if (path !== "" && path !== "/") {
      regexpSource += "(?:(?=\\/|$))";
    } else ;
    let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
    return [
      matcher,
      params
    ];
  }
  function decodePath(value) {
    try {
      return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
    } catch (error) {
      warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
      return value;
    }
  }
  function stripBasename(pathname, basename) {
    if (basename === "/") return pathname;
    if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
      return null;
    }
    let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
    let nextChar = pathname.charAt(startIndex);
    if (nextChar && nextChar !== "/") {
      return null;
    }
    return pathname.slice(startIndex) || "/";
  }
  function resolvePath(to, fromPathname) {
    if (fromPathname === void 0) {
      fromPathname = "/";
    }
    let { pathname: toPathname, search = "", hash = "" } = typeof to === "string" ? parsePath(to) : to;
    let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
    return {
      pathname,
      search: normalizeSearch(search),
      hash: normalizeHash(hash)
    };
  }
  function resolvePathname(relativePath, fromPathname) {
    let segments = fromPathname.replace(/\/+$/, "").split("/");
    let relativeSegments = relativePath.split("/");
    relativeSegments.forEach((segment) => {
      if (segment === "..") {
        if (segments.length > 1) segments.pop();
      } else if (segment !== ".") {
        segments.push(segment);
      }
    });
    return segments.length > 1 ? segments.join("/") : "/";
  }
  function getInvalidPathError(char, field, dest, path) {
    return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
  }
  function getPathContributingMatches(matches) {
    return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
  }
  function getResolveToMatches(matches, v7_relativeSplatPath) {
    let pathMatches = getPathContributingMatches(matches);
    if (v7_relativeSplatPath) {
      return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
    }
    return pathMatches.map((match) => match.pathnameBase);
  }
  function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
    if (isPathRelative === void 0) {
      isPathRelative = false;
    }
    let to;
    if (typeof toArg === "string") {
      to = parsePath(toArg);
    } else {
      to = _extends$2({}, toArg);
      invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
      invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
      invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
    }
    let isEmptyPath = toArg === "" || to.pathname === "";
    let toPathname = isEmptyPath ? "/" : to.pathname;
    let from;
    if (toPathname == null) {
      from = locationPathname;
    } else {
      let routePathnameIndex = routePathnames.length - 1;
      if (!isPathRelative && toPathname.startsWith("..")) {
        let toSegments = toPathname.split("/");
        while (toSegments[0] === "..") {
          toSegments.shift();
          routePathnameIndex -= 1;
        }
        to.pathname = toSegments.join("/");
      }
      from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
    }
    let path = resolvePath(to, from);
    let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
    let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
    if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
      path.pathname += "/";
    }
    return path;
  }
  const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
  const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
  const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
  const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
  class ErrorResponseImpl {
    constructor(status, statusText, data2, internal) {
      if (internal === void 0) {
        internal = false;
      }
      this.status = status;
      this.statusText = statusText || "";
      this.internal = internal;
      if (data2 instanceof Error) {
        this.data = data2.toString();
        this.error = data2;
      } else {
        this.data = data2;
      }
    }
  }
  function isRouteErrorResponse(error) {
    return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
  }
  const validMutationMethodsArr = [
    "post",
    "put",
    "patch",
    "delete"
  ];
  const validMutationMethods = new Set(validMutationMethodsArr);
  const validRequestMethodsArr = [
    "get",
    ...validMutationMethodsArr
  ];
  const validRequestMethods = new Set(validRequestMethodsArr);
  const redirectStatusCodes = /* @__PURE__ */ new Set([
    301,
    302,
    303,
    307,
    308
  ]);
  const redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([
    307,
    308
  ]);
  const IDLE_NAVIGATION = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
  const IDLE_FETCHER = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
  const IDLE_BLOCKER = {
    state: "unblocked",
    proceed: void 0,
    reset: void 0,
    location: void 0
  };
  const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
  const defaultMapRouteProperties = (route) => ({
    hasErrorBoundary: Boolean(route.hasErrorBoundary)
  });
  const TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
  function createRouter(init) {
    const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
    const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
    const isServer = !isBrowser;
    invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
    let mapRouteProperties2;
    if (init.mapRouteProperties) {
      mapRouteProperties2 = init.mapRouteProperties;
    } else if (init.detectErrorBoundary) {
      let detectErrorBoundary = init.detectErrorBoundary;
      mapRouteProperties2 = (route) => ({
        hasErrorBoundary: detectErrorBoundary(route)
      });
    } else {
      mapRouteProperties2 = defaultMapRouteProperties;
    }
    let manifest = {};
    let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties2, void 0, manifest);
    let inFlightDataRoutes;
    let basename = init.basename || "/";
    let dataStrategyImpl = init.unstable_dataStrategy || defaultDataStrategy;
    let patchRoutesOnNavigationImpl = init.unstable_patchRoutesOnNavigation;
    let future = _extends$2({
      v7_fetcherPersist: false,
      v7_normalizeFormMethod: false,
      v7_partialHydration: false,
      v7_prependBasename: false,
      v7_relativeSplatPath: false,
      v7_skipActionErrorRevalidation: false
    }, init.future);
    let unlistenHistory = null;
    let subscribers = /* @__PURE__ */ new Set();
    let discoveredRoutesMaxSize = 1e3;
    let discoveredRoutes = /* @__PURE__ */ new Set();
    let savedScrollPositions = null;
    let getScrollRestorationKey = null;
    let getScrollPosition = null;
    let initialScrollRestored = init.hydrationData != null;
    let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
    let initialErrors = null;
    if (initialMatches == null && !patchRoutesOnNavigationImpl) {
      let error = getInternalRouterError(404, {
        pathname: init.history.location.pathname
      });
      let { matches, route } = getShortCircuitMatches(dataRoutes);
      initialMatches = matches;
      initialErrors = {
        [route.id]: error
      };
    }
    if (initialMatches && !init.hydrationData) {
      let fogOfWar = checkFogOfWar(initialMatches, dataRoutes, init.history.location.pathname);
      if (fogOfWar.active) {
        initialMatches = null;
      }
    }
    let initialized;
    if (!initialMatches) {
      initialized = false;
      initialMatches = [];
      if (future.v7_partialHydration) {
        let fogOfWar = checkFogOfWar(null, dataRoutes, init.history.location.pathname);
        if (fogOfWar.active && fogOfWar.matches) {
          initialMatches = fogOfWar.matches;
        }
      }
    } else if (initialMatches.some((m) => m.route.lazy)) {
      initialized = false;
    } else if (!initialMatches.some((m) => m.route.loader)) {
      initialized = true;
    } else if (future.v7_partialHydration) {
      let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
      let errors = init.hydrationData ? init.hydrationData.errors : null;
      let isRouteInitialized = (m) => {
        if (!m.route.loader) {
          return true;
        }
        if (typeof m.route.loader === "function" && m.route.loader.hydrate === true) {
          return false;
        }
        return loaderData && loaderData[m.route.id] !== void 0 || errors && errors[m.route.id] !== void 0;
      };
      if (errors) {
        let idx = initialMatches.findIndex((m) => errors[m.route.id] !== void 0);
        initialized = initialMatches.slice(0, idx + 1).every(isRouteInitialized);
      } else {
        initialized = initialMatches.every(isRouteInitialized);
      }
    } else {
      initialized = init.hydrationData != null;
    }
    let router2;
    let state = {
      historyAction: init.history.action,
      location: init.history.location,
      matches: initialMatches,
      initialized,
      navigation: IDLE_NAVIGATION,
      restoreScrollPosition: init.hydrationData != null ? false : null,
      preventScrollReset: false,
      revalidation: "idle",
      loaderData: init.hydrationData && init.hydrationData.loaderData || {},
      actionData: init.hydrationData && init.hydrationData.actionData || null,
      errors: init.hydrationData && init.hydrationData.errors || initialErrors,
      fetchers: /* @__PURE__ */ new Map(),
      blockers: /* @__PURE__ */ new Map()
    };
    let pendingAction = Action$1.Pop;
    let pendingPreventScrollReset = false;
    let pendingNavigationController;
    let pendingViewTransitionEnabled = false;
    let appliedViewTransitions = /* @__PURE__ */ new Map();
    let removePageHideEventListener = null;
    let isUninterruptedRevalidation = false;
    let isRevalidationRequired = false;
    let cancelledDeferredRoutes = [];
    let cancelledFetcherLoads = /* @__PURE__ */ new Set();
    let fetchControllers = /* @__PURE__ */ new Map();
    let incrementingLoadId = 0;
    let pendingNavigationLoadId = -1;
    let fetchReloadIds = /* @__PURE__ */ new Map();
    let fetchRedirectIds = /* @__PURE__ */ new Set();
    let fetchLoadMatches = /* @__PURE__ */ new Map();
    let activeFetchers = /* @__PURE__ */ new Map();
    let deletedFetchers = /* @__PURE__ */ new Set();
    let activeDeferreds = /* @__PURE__ */ new Map();
    let blockerFunctions = /* @__PURE__ */ new Map();
    let pendingPatchRoutes = /* @__PURE__ */ new Map();
    let ignoreNextHistoryUpdate = false;
    function initialize() {
      unlistenHistory = init.history.listen((_ref) => {
        let { action: historyAction, location, delta } = _ref;
        if (ignoreNextHistoryUpdate) {
          ignoreNextHistoryUpdate = false;
          return;
        }
        warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
        let blockerKey = shouldBlockNavigation({
          currentLocation: state.location,
          nextLocation: location,
          historyAction
        });
        if (blockerKey && delta != null) {
          ignoreNextHistoryUpdate = true;
          init.history.go(delta * -1);
          updateBlocker(blockerKey, {
            state: "blocked",
            location,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location
              });
              init.history.go(delta);
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({
                blockers
              });
            }
          });
          return;
        }
        return startNavigation(historyAction, location);
      });
      if (isBrowser) {
        restoreAppliedTransitions(routerWindow, appliedViewTransitions);
        let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
        routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
        removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
      }
      if (!state.initialized) {
        startNavigation(Action$1.Pop, state.location, {
          initialHydration: true
        });
      }
      return router2;
    }
    function dispose() {
      if (unlistenHistory) {
        unlistenHistory();
      }
      if (removePageHideEventListener) {
        removePageHideEventListener();
      }
      subscribers.clear();
      pendingNavigationController && pendingNavigationController.abort();
      state.fetchers.forEach((_, key) => deleteFetcher(key));
      state.blockers.forEach((_, key) => deleteBlocker(key));
    }
    function subscribe(fn) {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    }
    function updateState(newState, opts) {
      if (opts === void 0) {
        opts = {};
      }
      state = _extends$2({}, state, newState);
      let completedFetchers = [];
      let deletedFetchersKeys = [];
      if (future.v7_fetcherPersist) {
        state.fetchers.forEach((fetcher, key) => {
          if (fetcher.state === "idle") {
            if (deletedFetchers.has(key)) {
              deletedFetchersKeys.push(key);
            } else {
              completedFetchers.push(key);
            }
          }
        });
      }
      [
        ...subscribers
      ].forEach((subscriber) => subscriber(state, {
        deletedFetchers: deletedFetchersKeys,
        unstable_viewTransitionOpts: opts.viewTransitionOpts,
        unstable_flushSync: opts.flushSync === true
      }));
      if (future.v7_fetcherPersist) {
        completedFetchers.forEach((key) => state.fetchers.delete(key));
        deletedFetchersKeys.forEach((key) => deleteFetcher(key));
      }
    }
    function completeNavigation(location, newState, _temp) {
      var _location$state, _location$state2;
      let { flushSync } = _temp === void 0 ? {} : _temp;
      let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
      let actionData;
      if (newState.actionData) {
        if (Object.keys(newState.actionData).length > 0) {
          actionData = newState.actionData;
        } else {
          actionData = null;
        }
      } else if (isActionReload) {
        actionData = state.actionData;
      } else {
        actionData = null;
      }
      let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
      let blockers = state.blockers;
      if (blockers.size > 0) {
        blockers = new Map(blockers);
        blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
      }
      let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
      if (inFlightDataRoutes) {
        dataRoutes = inFlightDataRoutes;
        inFlightDataRoutes = void 0;
      }
      if (isUninterruptedRevalidation) ;
      else if (pendingAction === Action$1.Pop) ;
      else if (pendingAction === Action$1.Push) {
        init.history.push(location, location.state);
      } else if (pendingAction === Action$1.Replace) {
        init.history.replace(location, location.state);
      }
      let viewTransitionOpts;
      if (pendingAction === Action$1.Pop) {
        let priorPaths = appliedViewTransitions.get(state.location.pathname);
        if (priorPaths && priorPaths.has(location.pathname)) {
          viewTransitionOpts = {
            currentLocation: state.location,
            nextLocation: location
          };
        } else if (appliedViewTransitions.has(location.pathname)) {
          viewTransitionOpts = {
            currentLocation: location,
            nextLocation: state.location
          };
        }
      } else if (pendingViewTransitionEnabled) {
        let toPaths = appliedViewTransitions.get(state.location.pathname);
        if (toPaths) {
          toPaths.add(location.pathname);
        } else {
          toPaths = /* @__PURE__ */ new Set([
            location.pathname
          ]);
          appliedViewTransitions.set(state.location.pathname, toPaths);
        }
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      }
      updateState(_extends$2({}, newState, {
        actionData,
        loaderData,
        historyAction: pendingAction,
        location,
        initialized: true,
        navigation: IDLE_NAVIGATION,
        revalidation: "idle",
        restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
        preventScrollReset,
        blockers
      }), {
        viewTransitionOpts,
        flushSync: flushSync === true
      });
      pendingAction = Action$1.Pop;
      pendingPreventScrollReset = false;
      pendingViewTransitionEnabled = false;
      isUninterruptedRevalidation = false;
      isRevalidationRequired = false;
      cancelledDeferredRoutes = [];
    }
    async function navigate(to, opts) {
      if (typeof to === "number") {
        init.history.go(to);
        return;
      }
      let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
      let { path, submission, error } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
      let currentLocation = state.location;
      let nextLocation = createLocation(state.location, path, opts && opts.state);
      nextLocation = _extends$2({}, nextLocation, init.history.encodeLocation(nextLocation));
      let userReplace = opts && opts.replace != null ? opts.replace : void 0;
      let historyAction = Action$1.Push;
      if (userReplace === true) {
        historyAction = Action$1.Replace;
      } else if (userReplace === false) ;
      else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
        historyAction = Action$1.Replace;
      }
      let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
      let flushSync = (opts && opts.unstable_flushSync) === true;
      let blockerKey = shouldBlockNavigation({
        currentLocation,
        nextLocation,
        historyAction
      });
      if (blockerKey) {
        updateBlocker(blockerKey, {
          state: "blocked",
          location: nextLocation,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location: nextLocation
            });
            navigate(to, opts);
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER);
            updateState({
              blockers
            });
          }
        });
        return;
      }
      return await startNavigation(historyAction, nextLocation, {
        submission,
        pendingError: error,
        preventScrollReset,
        replace: opts && opts.replace,
        enableViewTransition: opts && opts.unstable_viewTransition,
        flushSync
      });
    }
    function revalidate() {
      interruptActiveLoads();
      updateState({
        revalidation: "loading"
      });
      if (state.navigation.state === "submitting") {
        return;
      }
      if (state.navigation.state === "idle") {
        startNavigation(state.historyAction, state.location, {
          startUninterruptedRevalidation: true
        });
        return;
      }
      startNavigation(pendingAction || state.historyAction, state.navigation.location, {
        overrideNavigation: state.navigation
      });
    }
    async function startNavigation(historyAction, location, opts) {
      pendingNavigationController && pendingNavigationController.abort();
      pendingNavigationController = null;
      pendingAction = historyAction;
      isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
      saveScrollPosition(state.location, state.matches);
      pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
      pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let loadingNavigation = opts && opts.overrideNavigation;
      let matches = matchRoutes(routesToUse, location, basename);
      let flushSync = (opts && opts.flushSync) === true;
      let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
      if (fogOfWar.active && fogOfWar.matches) {
        matches = fogOfWar.matches;
      }
      if (!matches) {
        let { error, notFoundMatches, route } = handleNavigational404(location.pathname);
        completeNavigation(location, {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        }, {
          flushSync
        });
        return;
      }
      if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
        completeNavigation(location, {
          matches
        }, {
          flushSync
        });
        return;
      }
      pendingNavigationController = new AbortController();
      let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
      let pendingActionResult;
      if (opts && opts.pendingError) {
        pendingActionResult = [
          findNearestBoundary(matches).route.id,
          {
            type: ResultType.error,
            error: opts.pendingError
          }
        ];
      } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
        let actionResult = await handleAction(request, location, opts.submission, matches, fogOfWar.active, {
          replace: opts.replace,
          flushSync
        });
        if (actionResult.shortCircuited) {
          return;
        }
        if (actionResult.pendingActionResult) {
          let [routeId, result] = actionResult.pendingActionResult;
          if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
            pendingNavigationController = null;
            completeNavigation(location, {
              matches: actionResult.matches,
              loaderData: {},
              errors: {
                [routeId]: result.error
              }
            });
            return;
          }
        }
        matches = actionResult.matches || matches;
        pendingActionResult = actionResult.pendingActionResult;
        loadingNavigation = getLoadingNavigation(location, opts.submission);
        flushSync = false;
        fogOfWar.active = false;
        request = createClientSideRequest(init.history, request.url, request.signal);
      }
      let { shortCircuited, matches: updatedMatches, loaderData, errors } = await handleLoaders(request, location, matches, fogOfWar.active, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult);
      if (shortCircuited) {
        return;
      }
      pendingNavigationController = null;
      completeNavigation(location, _extends$2({
        matches: updatedMatches || matches
      }, getActionDataForCommit(pendingActionResult), {
        loaderData,
        errors
      }));
    }
    async function handleAction(request, location, submission, matches, isFogOfWar, opts) {
      if (opts === void 0) {
        opts = {};
      }
      interruptActiveLoads();
      let navigation = getSubmittingNavigation(location, submission);
      updateState({
        navigation
      }, {
        flushSync: opts.flushSync === true
      });
      if (isFogOfWar) {
        let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
        if (discoverResult.type === "aborted") {
          return {
            shortCircuited: true
          };
        } else if (discoverResult.type === "error") {
          let { boundaryId, error } = handleDiscoverRouteError(location.pathname, discoverResult);
          return {
            matches: discoverResult.partialMatches,
            pendingActionResult: [
              boundaryId,
              {
                type: ResultType.error,
                error
              }
            ]
          };
        } else if (!discoverResult.matches) {
          let { notFoundMatches, error, route } = handleNavigational404(location.pathname);
          return {
            matches: notFoundMatches,
            pendingActionResult: [
              route.id,
              {
                type: ResultType.error,
                error
              }
            ]
          };
        } else {
          matches = discoverResult.matches;
        }
      }
      let result;
      let actionMatch = getTargetMatch(matches, location);
      if (!actionMatch.route.action && !actionMatch.route.lazy) {
        result = {
          type: ResultType.error,
          error: getInternalRouterError(405, {
            method: request.method,
            pathname: location.pathname,
            routeId: actionMatch.route.id
          })
        };
      } else {
        let results = await callDataStrategy("action", request, [
          actionMatch
        ], matches);
        result = results[0];
        if (request.signal.aborted) {
          return {
            shortCircuited: true
          };
        }
      }
      if (isRedirectResult(result)) {
        let replace;
        if (opts && opts.replace != null) {
          replace = opts.replace;
        } else {
          let location2 = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
          replace = location2 === state.location.pathname + state.location.search;
        }
        await startRedirectNavigation(request, result, {
          submission,
          replace
        });
        return {
          shortCircuited: true
        };
      }
      if (isDeferredResult(result)) {
        throw getInternalRouterError(400, {
          type: "defer-action"
        });
      }
      if (isErrorResult(result)) {
        let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
        if ((opts && opts.replace) !== true) {
          pendingAction = Action$1.Push;
        }
        return {
          matches,
          pendingActionResult: [
            boundaryMatch.route.id,
            result
          ]
        };
      }
      return {
        matches,
        pendingActionResult: [
          actionMatch.route.id,
          result
        ]
      };
    }
    async function handleLoaders(request, location, matches, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionResult) {
      let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
      let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
      let shouldUpdateNavigationState = !isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration);
      if (isFogOfWar) {
        if (shouldUpdateNavigationState) {
          let actionData = getUpdatedActionData(pendingActionResult);
          updateState(_extends$2({
            navigation: loadingNavigation
          }, actionData !== void 0 ? {
            actionData
          } : {}), {
            flushSync
          });
        }
        let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
        if (discoverResult.type === "aborted") {
          return {
            shortCircuited: true
          };
        } else if (discoverResult.type === "error") {
          let { boundaryId, error } = handleDiscoverRouteError(location.pathname, discoverResult);
          return {
            matches: discoverResult.partialMatches,
            loaderData: {},
            errors: {
              [boundaryId]: error
            }
          };
        } else if (!discoverResult.matches) {
          let { error, notFoundMatches, route } = handleNavigational404(location.pathname);
          return {
            matches: notFoundMatches,
            loaderData: {},
            errors: {
              [route.id]: error
            }
          };
        } else {
          matches = discoverResult.matches;
        }
      }
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
      cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId));
      pendingNavigationLoadId = ++incrementingLoadId;
      if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
        let updatedFetchers2 = markFetchRedirectsDone();
        completeNavigation(location, _extends$2({
          matches,
          loaderData: {},
          errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
            [pendingActionResult[0]]: pendingActionResult[1].error
          } : null
        }, getActionDataForCommit(pendingActionResult), updatedFetchers2 ? {
          fetchers: new Map(state.fetchers)
        } : {}), {
          flushSync
        });
        return {
          shortCircuited: true
        };
      }
      if (shouldUpdateNavigationState) {
        let updates = {};
        if (!isFogOfWar) {
          updates.navigation = loadingNavigation;
          let actionData = getUpdatedActionData(pendingActionResult);
          if (actionData !== void 0) {
            updates.actionData = actionData;
          }
        }
        if (revalidatingFetchers.length > 0) {
          updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
        }
        updateState(updates, {
          flushSync
        });
      }
      revalidatingFetchers.forEach((rf) => {
        if (fetchControllers.has(rf.key)) {
          abortFetcher(rf.key);
        }
        if (rf.controller) {
          fetchControllers.set(rf.key, rf.controller);
        }
      });
      let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
      if (pendingNavigationController) {
        pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
      }
      let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
      if (pendingNavigationController) {
        pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
      }
      revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
      let redirect = findRedirect([
        ...loaderResults,
        ...fetcherResults
      ]);
      if (redirect) {
        if (redirect.idx >= matchesToLoad.length) {
          let fetcherKey = revalidatingFetchers[redirect.idx - matchesToLoad.length].key;
          fetchRedirectIds.add(fetcherKey);
        }
        await startRedirectNavigation(request, redirect.result, {
          replace
        });
        return {
          shortCircuited: true
        };
      }
      let { loaderData, errors } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
      activeDeferreds.forEach((deferredData, routeId) => {
        deferredData.subscribe((aborted) => {
          if (aborted || deferredData.done) {
            activeDeferreds.delete(routeId);
          }
        });
      });
      if (future.v7_partialHydration && initialHydration && state.errors) {
        Object.entries(state.errors).filter((_ref2) => {
          let [id] = _ref2;
          return !matchesToLoad.some((m) => m.route.id === id);
        }).forEach((_ref3) => {
          let [routeId, error] = _ref3;
          errors = Object.assign(errors || {}, {
            [routeId]: error
          });
        });
      }
      let updatedFetchers = markFetchRedirectsDone();
      let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
      let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
      return _extends$2({
        matches,
        loaderData,
        errors
      }, shouldUpdateFetchers ? {
        fetchers: new Map(state.fetchers)
      } : {});
    }
    function getUpdatedActionData(pendingActionResult) {
      if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
        return {
          [pendingActionResult[0]]: pendingActionResult[1].data
        };
      } else if (state.actionData) {
        if (Object.keys(state.actionData).length === 0) {
          return null;
        } else {
          return state.actionData;
        }
      }
    }
    function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
      revalidatingFetchers.forEach((rf) => {
        let fetcher = state.fetchers.get(rf.key);
        let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      return new Map(state.fetchers);
    }
    function fetch(key, routeId, href, opts) {
      if (isServer) {
        throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
      }
      if (fetchControllers.has(key)) abortFetcher(key);
      let flushSync = (opts && opts.unstable_flushSync) === true;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
      let matches = matchRoutes(routesToUse, normalizedPath, basename);
      let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
      if (fogOfWar.active && fogOfWar.matches) {
        matches = fogOfWar.matches;
      }
      if (!matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: normalizedPath
        }), {
          flushSync
        });
        return;
      }
      let { path, submission, error } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
      if (error) {
        setFetcherError(key, routeId, error, {
          flushSync
        });
        return;
      }
      let match = getTargetMatch(matches, path);
      pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
      if (submission && isMutationMethod(submission.formMethod)) {
        handleFetcherAction(key, routeId, path, match, matches, fogOfWar.active, flushSync, submission);
        return;
      }
      fetchLoadMatches.set(key, {
        routeId,
        path
      });
      handleFetcherLoader(key, routeId, path, match, matches, fogOfWar.active, flushSync, submission);
    }
    async function handleFetcherAction(key, routeId, path, match, requestMatches, isFogOfWar, flushSync, submission) {
      interruptActiveLoads();
      fetchLoadMatches.delete(key);
      function detectAndHandle405Error(m) {
        if (!m.route.action && !m.route.lazy) {
          let error = getInternalRouterError(405, {
            method: submission.formMethod,
            pathname: path,
            routeId
          });
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return true;
        }
        return false;
      }
      if (!isFogOfWar && detectAndHandle405Error(match)) {
        return;
      }
      let existingFetcher = state.fetchers.get(key);
      updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
        flushSync
      });
      let abortController = new AbortController();
      let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
      if (isFogOfWar) {
        let discoverResult = await discoverRoutes(requestMatches, path, fetchRequest.signal);
        if (discoverResult.type === "aborted") {
          return;
        } else if (discoverResult.type === "error") {
          let { error } = handleDiscoverRouteError(path, discoverResult);
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return;
        } else if (!discoverResult.matches) {
          setFetcherError(key, routeId, getInternalRouterError(404, {
            pathname: path
          }), {
            flushSync
          });
          return;
        } else {
          requestMatches = discoverResult.matches;
          match = getTargetMatch(requestMatches, path);
          if (detectAndHandle405Error(match)) {
            return;
          }
        }
      }
      fetchControllers.set(key, abortController);
      let originatingLoadId = incrementingLoadId;
      let actionResults = await callDataStrategy("action", fetchRequest, [
        match
      ], requestMatches);
      let actionResult = actionResults[0];
      if (fetchRequest.signal.aborted) {
        if (fetchControllers.get(key) === abortController) {
          fetchControllers.delete(key);
        }
        return;
      }
      if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
        if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        }
      } else {
        if (isRedirectResult(actionResult)) {
          fetchControllers.delete(key);
          if (pendingNavigationLoadId > originatingLoadId) {
            updateFetcherState(key, getDoneFetcher(void 0));
            return;
          } else {
            fetchRedirectIds.add(key);
            updateFetcherState(key, getLoadingFetcher(submission));
            return startRedirectNavigation(fetchRequest, actionResult, {
              fetcherSubmission: submission
            });
          }
        }
        if (isErrorResult(actionResult)) {
          setFetcherError(key, routeId, actionResult.error);
          return;
        }
      }
      if (isDeferredResult(actionResult)) {
        throw getInternalRouterError(400, {
          type: "defer-action"
        });
      }
      let nextLocation = state.navigation.location || state.location;
      let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
      invariant(matches, "Didn't find any matches after fetcher action");
      let loadId = ++incrementingLoadId;
      fetchReloadIds.set(key, loadId);
      let loadFetcher = getLoadingFetcher(submission, actionResult.data);
      state.fetchers.set(key, loadFetcher);
      let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [
        match.route.id,
        actionResult
      ]);
      revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
        let staleKey = rf.key;
        let existingFetcher2 = state.fetchers.get(staleKey);
        let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
        state.fetchers.set(staleKey, revalidatingFetcher);
        if (fetchControllers.has(staleKey)) {
          abortFetcher(staleKey);
        }
        if (rf.controller) {
          fetchControllers.set(staleKey, rf.controller);
        }
      });
      updateState({
        fetchers: new Map(state.fetchers)
      });
      let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
      abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
      let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
      if (abortController.signal.aborted) {
        return;
      }
      abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
      fetchReloadIds.delete(key);
      fetchControllers.delete(key);
      revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
      let redirect = findRedirect([
        ...loaderResults,
        ...fetcherResults
      ]);
      if (redirect) {
        if (redirect.idx >= matchesToLoad.length) {
          let fetcherKey = revalidatingFetchers[redirect.idx - matchesToLoad.length].key;
          fetchRedirectIds.add(fetcherKey);
        }
        return startRedirectNavigation(revalidationRequest, redirect.result);
      }
      let { loaderData, errors } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
      if (state.fetchers.has(key)) {
        let doneFetcher = getDoneFetcher(actionResult.data);
        state.fetchers.set(key, doneFetcher);
      }
      abortStaleFetchLoads(loadId);
      if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
        invariant(pendingAction, "Expected pending action");
        pendingNavigationController && pendingNavigationController.abort();
        completeNavigation(state.navigation.location, {
          matches,
          loaderData,
          errors,
          fetchers: new Map(state.fetchers)
        });
      } else {
        updateState({
          errors,
          loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
          fetchers: new Map(state.fetchers)
        });
        isRevalidationRequired = false;
      }
    }
    async function handleFetcherLoader(key, routeId, path, match, matches, isFogOfWar, flushSync, submission) {
      let existingFetcher = state.fetchers.get(key);
      updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
        flushSync
      });
      let abortController = new AbortController();
      let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
      if (isFogOfWar) {
        let discoverResult = await discoverRoutes(matches, path, fetchRequest.signal);
        if (discoverResult.type === "aborted") {
          return;
        } else if (discoverResult.type === "error") {
          let { error } = handleDiscoverRouteError(path, discoverResult);
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return;
        } else if (!discoverResult.matches) {
          setFetcherError(key, routeId, getInternalRouterError(404, {
            pathname: path
          }), {
            flushSync
          });
          return;
        } else {
          matches = discoverResult.matches;
          match = getTargetMatch(matches, path);
        }
      }
      fetchControllers.set(key, abortController);
      let originatingLoadId = incrementingLoadId;
      let results = await callDataStrategy("loader", fetchRequest, [
        match
      ], matches);
      let result = results[0];
      if (isDeferredResult(result)) {
        result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
      }
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      if (fetchRequest.signal.aborted) {
        return;
      }
      if (deletedFetchers.has(key)) {
        updateFetcherState(key, getDoneFetcher(void 0));
        return;
      }
      if (isRedirectResult(result)) {
        if (pendingNavigationLoadId > originatingLoadId) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        } else {
          fetchRedirectIds.add(key);
          await startRedirectNavigation(fetchRequest, result);
          return;
        }
      }
      if (isErrorResult(result)) {
        setFetcherError(key, routeId, result.error);
        return;
      }
      invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
      updateFetcherState(key, getDoneFetcher(result.data));
    }
    async function startRedirectNavigation(request, redirect, _temp2) {
      let { submission, fetcherSubmission, replace } = _temp2 === void 0 ? {} : _temp2;
      if (redirect.response.headers.has("X-Remix-Revalidate")) {
        isRevalidationRequired = true;
      }
      let location = redirect.response.headers.get("Location");
      invariant(location, "Expected a Location header on the redirect Response");
      location = normalizeRedirectLocation(location, new URL(request.url), basename);
      let redirectLocation = createLocation(state.location, location, {
        _isRedirect: true
      });
      if (isBrowser) {
        let isDocumentReload = false;
        if (redirect.response.headers.has("X-Remix-Reload-Document")) {
          isDocumentReload = true;
        } else if (ABSOLUTE_URL_REGEX.test(location)) {
          const url = init.history.createURL(location);
          isDocumentReload = url.origin !== routerWindow.location.origin || stripBasename(url.pathname, basename) == null;
        }
        if (isDocumentReload) {
          if (replace) {
            routerWindow.location.replace(location);
          } else {
            routerWindow.location.assign(location);
          }
          return;
        }
      }
      pendingNavigationController = null;
      let redirectHistoryAction = replace === true || redirect.response.headers.has("X-Remix-Replace") ? Action$1.Replace : Action$1.Push;
      let { formMethod, formAction, formEncType } = state.navigation;
      if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
        submission = getSubmissionFromNavigation(state.navigation);
      }
      let activeSubmission = submission || fetcherSubmission;
      if (redirectPreserveMethodStatusCodes.has(redirect.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
        await startNavigation(redirectHistoryAction, redirectLocation, {
          submission: _extends$2({}, activeSubmission, {
            formAction: location
          }),
          preventScrollReset: pendingPreventScrollReset
        });
      } else {
        let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
        await startNavigation(redirectHistoryAction, redirectLocation, {
          overrideNavigation,
          fetcherSubmission,
          preventScrollReset: pendingPreventScrollReset
        });
      }
    }
    async function callDataStrategy(type, request, matchesToLoad, matches) {
      try {
        let results = await callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties2);
        return await Promise.all(results.map((result, i) => {
          if (isRedirectHandlerResult(result)) {
            let response = result.result;
            return {
              type: ResultType.redirect,
              response: normalizeRelativeRoutingRedirectResponse(response, request, matchesToLoad[i].route.id, matches, basename, future.v7_relativeSplatPath)
            };
          }
          return convertHandlerResultToDataResult(result);
        }));
      } catch (e) {
        return matchesToLoad.map(() => ({
          type: ResultType.error,
          error: e
        }));
      }
    }
    async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
      let [loaderResults, ...fetcherResults] = await Promise.all([
        matchesToLoad.length ? callDataStrategy("loader", request, matchesToLoad, matches) : [],
        ...fetchersToLoad.map((f) => {
          if (f.matches && f.match && f.controller) {
            let fetcherRequest = createClientSideRequest(init.history, f.path, f.controller.signal);
            return callDataStrategy("loader", fetcherRequest, [
              f.match
            ], f.matches).then((r) => r[0]);
          } else {
            return Promise.resolve({
              type: ResultType.error,
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            });
          }
        })
      ]);
      await Promise.all([
        resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData),
        resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, fetchersToLoad.map((f) => f.controller ? f.controller.signal : null), true)
      ]);
      return {
        loaderResults,
        fetcherResults
      };
    }
    function interruptActiveLoads() {
      isRevalidationRequired = true;
      cancelledDeferredRoutes.push(...cancelActiveDeferreds());
      fetchLoadMatches.forEach((_, key) => {
        if (fetchControllers.has(key)) {
          cancelledFetcherLoads.add(key);
          abortFetcher(key);
        }
      });
    }
    function updateFetcherState(key, fetcher, opts) {
      if (opts === void 0) {
        opts = {};
      }
      state.fetchers.set(key, fetcher);
      updateState({
        fetchers: new Map(state.fetchers)
      }, {
        flushSync: (opts && opts.flushSync) === true
      });
    }
    function setFetcherError(key, routeId, error, opts) {
      if (opts === void 0) {
        opts = {};
      }
      let boundaryMatch = findNearestBoundary(state.matches, routeId);
      deleteFetcher(key);
      updateState({
        errors: {
          [boundaryMatch.route.id]: error
        },
        fetchers: new Map(state.fetchers)
      }, {
        flushSync: (opts && opts.flushSync) === true
      });
    }
    function getFetcher(key) {
      if (future.v7_fetcherPersist) {
        activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
        if (deletedFetchers.has(key)) {
          deletedFetchers.delete(key);
        }
      }
      return state.fetchers.get(key) || IDLE_FETCHER;
    }
    function deleteFetcher(key) {
      let fetcher = state.fetchers.get(key);
      if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
        abortFetcher(key);
      }
      fetchLoadMatches.delete(key);
      fetchReloadIds.delete(key);
      fetchRedirectIds.delete(key);
      deletedFetchers.delete(key);
      cancelledFetcherLoads.delete(key);
      state.fetchers.delete(key);
    }
    function deleteFetcherAndUpdateState(key) {
      if (future.v7_fetcherPersist) {
        let count2 = (activeFetchers.get(key) || 0) - 1;
        if (count2 <= 0) {
          activeFetchers.delete(key);
          deletedFetchers.add(key);
        } else {
          activeFetchers.set(key, count2);
        }
      } else {
        deleteFetcher(key);
      }
      updateState({
        fetchers: new Map(state.fetchers)
      });
    }
    function abortFetcher(key) {
      let controller = fetchControllers.get(key);
      invariant(controller, "Expected fetch controller: " + key);
      controller.abort();
      fetchControllers.delete(key);
    }
    function markFetchersDone(keys) {
      for (let key of keys) {
        let fetcher = getFetcher(key);
        let doneFetcher = getDoneFetcher(fetcher.data);
        state.fetchers.set(key, doneFetcher);
      }
    }
    function markFetchRedirectsDone() {
      let doneKeys = [];
      let updatedFetchers = false;
      for (let key of fetchRedirectIds) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          fetchRedirectIds.delete(key);
          doneKeys.push(key);
          updatedFetchers = true;
        }
      }
      markFetchersDone(doneKeys);
      return updatedFetchers;
    }
    function abortStaleFetchLoads(landedId) {
      let yeetedKeys = [];
      for (let [key, id] of fetchReloadIds) {
        if (id < landedId) {
          let fetcher = state.fetchers.get(key);
          invariant(fetcher, "Expected fetcher: " + key);
          if (fetcher.state === "loading") {
            abortFetcher(key);
            fetchReloadIds.delete(key);
            yeetedKeys.push(key);
          }
        }
      }
      markFetchersDone(yeetedKeys);
      return yeetedKeys.length > 0;
    }
    function getBlocker(key, fn) {
      let blocker = state.blockers.get(key) || IDLE_BLOCKER;
      if (blockerFunctions.get(key) !== fn) {
        blockerFunctions.set(key, fn);
      }
      return blocker;
    }
    function deleteBlocker(key) {
      state.blockers.delete(key);
      blockerFunctions.delete(key);
    }
    function updateBlocker(key, newBlocker) {
      let blocker = state.blockers.get(key) || IDLE_BLOCKER;
      invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
      let blockers = new Map(state.blockers);
      blockers.set(key, newBlocker);
      updateState({
        blockers
      });
    }
    function shouldBlockNavigation(_ref4) {
      let { currentLocation, nextLocation, historyAction } = _ref4;
      if (blockerFunctions.size === 0) {
        return;
      }
      if (blockerFunctions.size > 1) {
        warning(false, "A router only supports one blocker at a time");
      }
      let entries = Array.from(blockerFunctions.entries());
      let [blockerKey, blockerFunction] = entries[entries.length - 1];
      let blocker = state.blockers.get(blockerKey);
      if (blocker && blocker.state === "proceeding") {
        return;
      }
      if (blockerFunction({
        currentLocation,
        nextLocation,
        historyAction
      })) {
        return blockerKey;
      }
    }
    function handleNavigational404(pathname) {
      let error = getInternalRouterError(404, {
        pathname
      });
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let { matches, route } = getShortCircuitMatches(routesToUse);
      cancelActiveDeferreds();
      return {
        notFoundMatches: matches,
        route,
        error
      };
    }
    function handleDiscoverRouteError(pathname, discoverResult) {
      return {
        boundaryId: findNearestBoundary(discoverResult.partialMatches).route.id,
        error: getInternalRouterError(400, {
          type: "route-discovery",
          pathname,
          message: discoverResult.error != null && "message" in discoverResult.error ? discoverResult.error : String(discoverResult.error)
        })
      };
    }
    function cancelActiveDeferreds(predicate) {
      let cancelledRouteIds = [];
      activeDeferreds.forEach((dfd, routeId) => {
        if (!predicate || predicate(routeId)) {
          dfd.cancel();
          cancelledRouteIds.push(routeId);
          activeDeferreds.delete(routeId);
        }
      });
      return cancelledRouteIds;
    }
    function enableScrollRestoration(positions, getPosition, getKey) {
      savedScrollPositions = positions;
      getScrollPosition = getPosition;
      getScrollRestorationKey = getKey || null;
      if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
        initialScrollRestored = true;
        let y = getSavedScrollPosition(state.location, state.matches);
        if (y != null) {
          updateState({
            restoreScrollPosition: y
          });
        }
      }
      return () => {
        savedScrollPositions = null;
        getScrollPosition = null;
        getScrollRestorationKey = null;
      };
    }
    function getScrollKey(location, matches) {
      if (getScrollRestorationKey) {
        let key = getScrollRestorationKey(location, matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData)));
        return key || location.key;
      }
      return location.key;
    }
    function saveScrollPosition(location, matches) {
      if (savedScrollPositions && getScrollPosition) {
        let key = getScrollKey(location, matches);
        savedScrollPositions[key] = getScrollPosition();
      }
    }
    function getSavedScrollPosition(location, matches) {
      if (savedScrollPositions) {
        let key = getScrollKey(location, matches);
        let y = savedScrollPositions[key];
        if (typeof y === "number") {
          return y;
        }
      }
      return null;
    }
    function checkFogOfWar(matches, routesToUse, pathname) {
      if (patchRoutesOnNavigationImpl) {
        if (discoveredRoutes.has(pathname)) {
          return {
            active: false,
            matches
          };
        }
        if (!matches) {
          let fogMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
          return {
            active: true,
            matches: fogMatches || []
          };
        } else {
          if (Object.keys(matches[0].params).length > 0) {
            let partialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
            return {
              active: true,
              matches: partialMatches
            };
          }
        }
      }
      return {
        active: false,
        matches: null
      };
    }
    async function discoverRoutes(matches, pathname, signal) {
      let partialMatches = matches;
      while (true) {
        let isNonHMR = inFlightDataRoutes == null;
        let routesToUse = inFlightDataRoutes || dataRoutes;
        try {
          await loadLazyRouteChildren(patchRoutesOnNavigationImpl, pathname, partialMatches, routesToUse, manifest, mapRouteProperties2, pendingPatchRoutes, signal);
        } catch (e) {
          return {
            type: "error",
            error: e,
            partialMatches
          };
        } finally {
          if (isNonHMR) {
            dataRoutes = [
              ...dataRoutes
            ];
          }
        }
        if (signal.aborted) {
          return {
            type: "aborted"
          };
        }
        let newMatches = matchRoutes(routesToUse, pathname, basename);
        if (newMatches) {
          addToFifoQueue(pathname, discoveredRoutes);
          return {
            type: "success",
            matches: newMatches
          };
        }
        let newPartialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
        if (!newPartialMatches || partialMatches.length === newPartialMatches.length && partialMatches.every((m, i) => m.route.id === newPartialMatches[i].route.id)) {
          addToFifoQueue(pathname, discoveredRoutes);
          return {
            type: "success",
            matches: null
          };
        }
        partialMatches = newPartialMatches;
      }
    }
    function addToFifoQueue(path, queue) {
      if (queue.size >= discoveredRoutesMaxSize) {
        let first = queue.values().next().value;
        queue.delete(first);
      }
      queue.add(path);
    }
    function _internalSetRoutes(newRoutes) {
      manifest = {};
      inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties2, void 0, manifest);
    }
    function patchRoutes(routeId, children) {
      let isNonHMR = inFlightDataRoutes == null;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties2);
      if (isNonHMR) {
        dataRoutes = [
          ...dataRoutes
        ];
        updateState({});
      }
    }
    router2 = {
      get basename() {
        return basename;
      },
      get future() {
        return future;
      },
      get state() {
        return state;
      },
      get routes() {
        return dataRoutes;
      },
      get window() {
        return routerWindow;
      },
      initialize,
      subscribe,
      enableScrollRestoration,
      navigate,
      fetch,
      revalidate,
      createHref: (to) => init.history.createHref(to),
      encodeLocation: (to) => init.history.encodeLocation(to),
      getFetcher,
      deleteFetcher: deleteFetcherAndUpdateState,
      dispose,
      getBlocker,
      deleteBlocker,
      patchRoutes,
      _internalFetchControllers: fetchControllers,
      _internalActiveDeferreds: activeDeferreds,
      _internalSetRoutes
    };
    return router2;
  }
  function isSubmissionNavigation(opts) {
    return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
  }
  function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
    let contextualMatches;
    let activeRouteMatch;
    if (fromRouteId) {
      contextualMatches = [];
      for (let match of matches) {
        contextualMatches.push(match);
        if (match.route.id === fromRouteId) {
          activeRouteMatch = match;
          break;
        }
      }
    } else {
      contextualMatches = matches;
      activeRouteMatch = matches[matches.length - 1];
    }
    let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
    if (to == null) {
      path.search = location.search;
      path.hash = location.hash;
    }
    if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    }
    if (prependBasename && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([
        basename,
        path.pathname
      ]);
    }
    return createPath(path);
  }
  function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
    if (!opts || !isSubmissionNavigation(opts)) {
      return {
        path
      };
    }
    if (opts.formMethod && !isValidMethod(opts.formMethod)) {
      return {
        path,
        error: getInternalRouterError(405, {
          method: opts.formMethod
        })
      };
    }
    let getInvalidBodyError = () => ({
      path,
      error: getInternalRouterError(400, {
        type: "invalid-body"
      })
    });
    let rawFormMethod = opts.formMethod || "get";
    let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
    let formAction = stripHashFromPath(path);
    if (opts.body !== void 0) {
      if (opts.formEncType === "text/plain") {
        if (!isMutationMethod(formMethod)) {
          return getInvalidBodyError();
        }
        let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? Array.from(opts.body.entries()).reduce((acc, _ref5) => {
          let [name, value] = _ref5;
          return "" + acc + name + "=" + value + "\n";
        }, "") : String(opts.body);
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json: void 0,
            text
          }
        };
      } else if (opts.formEncType === "application/json") {
        if (!isMutationMethod(formMethod)) {
          return getInvalidBodyError();
        }
        try {
          let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
          return {
            path,
            submission: {
              formMethod,
              formAction,
              formEncType: opts.formEncType,
              formData: void 0,
              json,
              text: void 0
            }
          };
        } catch (e) {
          return getInvalidBodyError();
        }
      }
    }
    invariant(typeof FormData === "function", "FormData is not available in this environment");
    let searchParams;
    let formData;
    if (opts.formData) {
      searchParams = convertFormDataToSearchParams(opts.formData);
      formData = opts.formData;
    } else if (opts.body instanceof FormData) {
      searchParams = convertFormDataToSearchParams(opts.body);
      formData = opts.body;
    } else if (opts.body instanceof URLSearchParams) {
      searchParams = opts.body;
      formData = convertSearchParamsToFormData(searchParams);
    } else if (opts.body == null) {
      searchParams = new URLSearchParams();
      formData = new FormData();
    } else {
      try {
        searchParams = new URLSearchParams(opts.body);
        formData = convertSearchParamsToFormData(searchParams);
      } catch (e) {
        return getInvalidBodyError();
      }
    }
    let submission = {
      formMethod,
      formAction,
      formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
      formData,
      json: void 0,
      text: void 0
    };
    if (isMutationMethod(submission.formMethod)) {
      return {
        path,
        submission
      };
    }
    let parsedPath = parsePath(path);
    if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
      searchParams.append("index", "");
    }
    parsedPath.search = "?" + searchParams;
    return {
      path: createPath(parsedPath),
      submission
    };
  }
  function getLoaderMatchesUntilBoundary(matches, boundaryId) {
    let boundaryMatches = matches;
    if (boundaryId) {
      let index2 = matches.findIndex((m) => m.route.id === boundaryId);
      if (index2 >= 0) {
        boundaryMatches = matches.slice(0, index2);
      }
    }
    return boundaryMatches;
  }
  function getMatchesToLoad(history, state, matches, submission, location, isInitialLoad, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
    let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
    let currentUrl = history.createURL(state.location);
    let nextUrl = history.createURL(location);
    let boundaryId = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[0] : void 0;
    let boundaryMatches = boundaryId ? getLoaderMatchesUntilBoundary(matches, boundaryId) : matches;
    let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
    let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
    let navigationMatches = boundaryMatches.filter((match, index2) => {
      let { route } = match;
      if (route.lazy) {
        return true;
      }
      if (route.loader == null) {
        return false;
      }
      if (isInitialLoad) {
        if (typeof route.loader !== "function" || route.loader.hydrate) {
          return true;
        }
        return state.loaderData[route.id] === void 0 && (!state.errors || state.errors[route.id] === void 0);
      }
      if (isNewLoader(state.loaderData, state.matches[index2], match) || cancelledDeferredRoutes.some((id) => id === match.route.id)) {
        return true;
      }
      let currentRouteMatch = state.matches[index2];
      let nextRouteMatch = match;
      return shouldRevalidateLoader(match, _extends$2({
        currentUrl,
        currentParams: currentRouteMatch.params,
        nextUrl,
        nextParams: nextRouteMatch.params
      }, submission, {
        actionResult,
        actionStatus,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
      }));
    });
    let revalidatingFetchers = [];
    fetchLoadMatches.forEach((f, key) => {
      if (isInitialLoad || !matches.some((m) => m.route.id === f.routeId) || deletedFetchers.has(key)) {
        return;
      }
      let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
      if (!fetcherMatches) {
        revalidatingFetchers.push({
          key,
          routeId: f.routeId,
          path: f.path,
          matches: null,
          match: null,
          controller: null
        });
        return;
      }
      let fetcher = state.fetchers.get(key);
      let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
      let shouldRevalidate = false;
      if (fetchRedirectIds.has(key)) {
        shouldRevalidate = false;
      } else if (cancelledFetcherLoads.has(key)) {
        cancelledFetcherLoads.delete(key);
        shouldRevalidate = true;
      } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
        shouldRevalidate = isRevalidationRequired;
      } else {
        shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends$2({
          currentUrl,
          currentParams: state.matches[state.matches.length - 1].params,
          nextUrl,
          nextParams: matches[matches.length - 1].params
        }, submission, {
          actionResult,
          actionStatus,
          defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
        }));
      }
      if (shouldRevalidate) {
        revalidatingFetchers.push({
          key,
          routeId: f.routeId,
          path: f.path,
          matches: fetcherMatches,
          match: fetcherMatch,
          controller: new AbortController()
        });
      }
    });
    return [
      navigationMatches,
      revalidatingFetchers
    ];
  }
  function isNewLoader(currentLoaderData, currentMatch, match) {
    let isNew = !currentMatch || match.route.id !== currentMatch.route.id;
    let isMissingData = currentLoaderData[match.route.id] === void 0;
    return isNew || isMissingData;
  }
  function isNewRouteInstance(currentMatch, match) {
    let currentPath = currentMatch.route.path;
    return currentMatch.pathname !== match.pathname || currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"];
  }
  function shouldRevalidateLoader(loaderMatch, arg) {
    if (loaderMatch.route.shouldRevalidate) {
      let routeChoice = loaderMatch.route.shouldRevalidate(arg);
      if (typeof routeChoice === "boolean") {
        return routeChoice;
      }
    }
    return arg.defaultShouldRevalidate;
  }
  async function loadLazyRouteChildren(patchRoutesOnNavigationImpl, path, matches, routes2, manifest, mapRouteProperties2, pendingRouteChildren, signal) {
    let key = [
      path,
      ...matches.map((m) => m.route.id)
    ].join("-");
    try {
      let pending = pendingRouteChildren.get(key);
      if (!pending) {
        pending = patchRoutesOnNavigationImpl({
          path,
          matches,
          patch: (routeId, children) => {
            if (!signal.aborted) {
              patchRoutesImpl(routeId, children, routes2, manifest, mapRouteProperties2);
            }
          }
        });
        pendingRouteChildren.set(key, pending);
      }
      if (pending && isPromise(pending)) {
        await pending;
      }
    } finally {
      pendingRouteChildren.delete(key);
    }
  }
  function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties2) {
    if (routeId) {
      var _route$children;
      let route = manifest[routeId];
      invariant(route, "No route found to patch children into: routeId = " + routeId);
      let dataChildren = convertRoutesToDataRoutes(children, mapRouteProperties2, [
        routeId,
        "patch",
        String(((_route$children = route.children) == null ? void 0 : _route$children.length) || "0")
      ], manifest);
      if (route.children) {
        route.children.push(...dataChildren);
      } else {
        route.children = dataChildren;
      }
    } else {
      let dataChildren = convertRoutesToDataRoutes(children, mapRouteProperties2, [
        "patch",
        String(routesToUse.length || "0")
      ], manifest);
      routesToUse.push(...dataChildren);
    }
  }
  async function loadLazyRouteModule(route, mapRouteProperties2, manifest) {
    if (!route.lazy) {
      return;
    }
    let lazyRoute = await route.lazy();
    if (!route.lazy) {
      return;
    }
    let routeToUpdate = manifest[route.id];
    invariant(routeToUpdate, "No route found in manifest");
    let routeUpdates = {};
    for (let lazyRouteProperty in lazyRoute) {
      let staticRouteValue = routeToUpdate[lazyRouteProperty];
      let isPropertyStaticallyDefined = staticRouteValue !== void 0 && lazyRouteProperty !== "hasErrorBoundary";
      warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.'));
      if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
        routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
      }
    }
    Object.assign(routeToUpdate, routeUpdates);
    Object.assign(routeToUpdate, _extends$2({}, mapRouteProperties2(routeToUpdate), {
      lazy: void 0
    }));
  }
  function defaultDataStrategy(opts) {
    return Promise.all(opts.matches.map((m) => m.resolve()));
  }
  async function callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties2, requestContext) {
    let routeIdsToLoad = matchesToLoad.reduce((acc, m) => acc.add(m.route.id), /* @__PURE__ */ new Set());
    let loadedMatches = /* @__PURE__ */ new Set();
    let results = await dataStrategyImpl({
      matches: matches.map((match) => {
        let shouldLoad = routeIdsToLoad.has(match.route.id);
        let resolve = (handlerOverride) => {
          loadedMatches.add(match.route.id);
          return shouldLoad ? callLoaderOrAction(type, request, match, manifest, mapRouteProperties2, handlerOverride, requestContext) : Promise.resolve({
            type: ResultType.data,
            result: void 0
          });
        };
        return _extends$2({}, match, {
          shouldLoad,
          resolve
        });
      }),
      request,
      params: matches[0].params,
      context: requestContext
    });
    matches.forEach((m) => invariant(loadedMatches.has(m.route.id), '`match.resolve()` was not called for route id "' + m.route.id + '". You must call `match.resolve()` on every match passed to `dataStrategy` to ensure all routes are properly loaded.'));
    return results.filter((_, i) => routeIdsToLoad.has(matches[i].route.id));
  }
  async function callLoaderOrAction(type, request, match, manifest, mapRouteProperties2, handlerOverride, staticContext) {
    let result;
    let onReject;
    let runHandler = (handler) => {
      let reject;
      let abortPromise = new Promise((_, r) => reject = r);
      onReject = () => reject();
      request.signal.addEventListener("abort", onReject);
      let actualHandler = (ctx) => {
        if (typeof handler !== "function") {
          return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ('"' + type + '" [routeId: ' + match.route.id + "]")));
        }
        return handler({
          request,
          params: match.params,
          context: staticContext
        }, ...ctx !== void 0 ? [
          ctx
        ] : []);
      };
      let handlerPromise;
      if (handlerOverride) {
        handlerPromise = handlerOverride((ctx) => actualHandler(ctx));
      } else {
        handlerPromise = (async () => {
          try {
            let val = await actualHandler();
            return {
              type: "data",
              result: val
            };
          } catch (e) {
            return {
              type: "error",
              result: e
            };
          }
        })();
      }
      return Promise.race([
        handlerPromise,
        abortPromise
      ]);
    };
    try {
      let handler = match.route[type];
      if (match.route.lazy) {
        if (handler) {
          let handlerError;
          let [value] = await Promise.all([
            runHandler(handler).catch((e) => {
              handlerError = e;
            }),
            loadLazyRouteModule(match.route, mapRouteProperties2, manifest)
          ]);
          if (handlerError !== void 0) {
            throw handlerError;
          }
          result = value;
        } else {
          await loadLazyRouteModule(match.route, mapRouteProperties2, manifest);
          handler = match.route[type];
          if (handler) {
            result = await runHandler(handler);
          } else if (type === "action") {
            let url = new URL(request.url);
            let pathname = url.pathname + url.search;
            throw getInternalRouterError(405, {
              method: request.method,
              pathname,
              routeId: match.route.id
            });
          } else {
            return {
              type: ResultType.data,
              result: void 0
            };
          }
        }
      } else if (!handler) {
        let url = new URL(request.url);
        let pathname = url.pathname + url.search;
        throw getInternalRouterError(404, {
          pathname
        });
      } else {
        result = await runHandler(handler);
      }
      invariant(result.result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
    } catch (e) {
      return {
        type: ResultType.error,
        result: e
      };
    } finally {
      if (onReject) {
        request.signal.removeEventListener("abort", onReject);
      }
    }
    return result;
  }
  async function convertHandlerResultToDataResult(handlerResult) {
    let { result, type } = handlerResult;
    if (isResponse(result)) {
      let data2;
      try {
        let contentType = result.headers.get("Content-Type");
        if (contentType && /\bapplication\/json\b/.test(contentType)) {
          if (result.body == null) {
            data2 = null;
          } else {
            data2 = await result.json();
          }
        } else {
          data2 = await result.text();
        }
      } catch (e) {
        return {
          type: ResultType.error,
          error: e
        };
      }
      if (type === ResultType.error) {
        return {
          type: ResultType.error,
          error: new ErrorResponseImpl(result.status, result.statusText, data2),
          statusCode: result.status,
          headers: result.headers
        };
      }
      return {
        type: ResultType.data,
        data: data2,
        statusCode: result.status,
        headers: result.headers
      };
    }
    if (type === ResultType.error) {
      if (isDataWithResponseInit(result)) {
        var _result$init2;
        if (result.data instanceof Error) {
          var _result$init;
          return {
            type: ResultType.error,
            error: result.data,
            statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status
          };
        }
        result = new ErrorResponseImpl(((_result$init2 = result.init) == null ? void 0 : _result$init2.status) || 500, void 0, result.data);
      }
      return {
        type: ResultType.error,
        error: result,
        statusCode: isRouteErrorResponse(result) ? result.status : void 0
      };
    }
    if (isDeferredData(result)) {
      var _result$init3, _result$init4;
      return {
        type: ResultType.deferred,
        deferredData: result,
        statusCode: (_result$init3 = result.init) == null ? void 0 : _result$init3.status,
        headers: ((_result$init4 = result.init) == null ? void 0 : _result$init4.headers) && new Headers(result.init.headers)
      };
    }
    if (isDataWithResponseInit(result)) {
      var _result$init5, _result$init6;
      return {
        type: ResultType.data,
        data: result.data,
        statusCode: (_result$init5 = result.init) == null ? void 0 : _result$init5.status,
        headers: (_result$init6 = result.init) != null && _result$init6.headers ? new Headers(result.init.headers) : void 0
      };
    }
    return {
      type: ResultType.data,
      data: result
    };
  }
  function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
    let location = response.headers.get("Location");
    invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
    if (!ABSOLUTE_URL_REGEX.test(location)) {
      let trimmedMatches = matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1);
      location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
      response.headers.set("Location", location);
    }
    return response;
  }
  function normalizeRedirectLocation(location, currentUrl, basename) {
    if (ABSOLUTE_URL_REGEX.test(location)) {
      let normalizedLocation = location;
      let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
      let isSameBasename = stripBasename(url.pathname, basename) != null;
      if (url.origin === currentUrl.origin && isSameBasename) {
        return url.pathname + url.search + url.hash;
      }
    }
    return location;
  }
  function createClientSideRequest(history, location, signal, submission) {
    let url = history.createURL(stripHashFromPath(location)).toString();
    let init = {
      signal
    };
    if (submission && isMutationMethod(submission.formMethod)) {
      let { formMethod, formEncType } = submission;
      init.method = formMethod.toUpperCase();
      if (formEncType === "application/json") {
        init.headers = new Headers({
          "Content-Type": formEncType
        });
        init.body = JSON.stringify(submission.json);
      } else if (formEncType === "text/plain") {
        init.body = submission.text;
      } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
        init.body = convertFormDataToSearchParams(submission.formData);
      } else {
        init.body = submission.formData;
      }
    }
    return new Request(url, init);
  }
  function convertFormDataToSearchParams(formData) {
    let searchParams = new URLSearchParams();
    for (let [key, value] of formData.entries()) {
      searchParams.append(key, typeof value === "string" ? value : value.name);
    }
    return searchParams;
  }
  function convertSearchParamsToFormData(searchParams) {
    let formData = new FormData();
    for (let [key, value] of searchParams.entries()) {
      formData.append(key, value);
    }
    return formData;
  }
  function processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
    let loaderData = {};
    let errors = null;
    let statusCode;
    let foundError = false;
    let loaderHeaders = {};
    let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
    results.forEach((result, index2) => {
      let id = matchesToLoad[index2].route.id;
      invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
      if (isErrorResult(result)) {
        let error = result.error;
        if (pendingError !== void 0) {
          error = pendingError;
          pendingError = void 0;
        }
        errors = errors || {};
        {
          let boundaryMatch = findNearestBoundary(matches, id);
          if (errors[boundaryMatch.route.id] == null) {
            errors[boundaryMatch.route.id] = error;
          }
        }
        loaderData[id] = void 0;
        if (!foundError) {
          foundError = true;
          statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      } else {
        if (isDeferredResult(result)) {
          activeDeferreds.set(id, result.deferredData);
          loaderData[id] = result.deferredData.data;
          if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
            statusCode = result.statusCode;
          }
          if (result.headers) {
            loaderHeaders[id] = result.headers;
          }
        } else {
          loaderData[id] = result.data;
          if (result.statusCode && result.statusCode !== 200 && !foundError) {
            statusCode = result.statusCode;
          }
          if (result.headers) {
            loaderHeaders[id] = result.headers;
          }
        }
      }
    });
    if (pendingError !== void 0 && pendingActionResult) {
      errors = {
        [pendingActionResult[0]]: pendingError
      };
      loaderData[pendingActionResult[0]] = void 0;
    }
    return {
      loaderData,
      errors,
      statusCode: statusCode || 200,
      loaderHeaders
    };
  }
  function processLoaderData(state, matches, matchesToLoad, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
    let { loaderData, errors } = processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds);
    for (let index2 = 0; index2 < revalidatingFetchers.length; index2++) {
      let { key, match, controller } = revalidatingFetchers[index2];
      invariant(fetcherResults !== void 0 && fetcherResults[index2] !== void 0, "Did not find corresponding fetcher result");
      let result = fetcherResults[index2];
      if (controller && controller.signal.aborted) {
        continue;
      } else if (isErrorResult(result)) {
        let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
        if (!(errors && errors[boundaryMatch.route.id])) {
          errors = _extends$2({}, errors, {
            [boundaryMatch.route.id]: result.error
          });
        }
        state.fetchers.delete(key);
      } else if (isRedirectResult(result)) {
        invariant(false, "Unhandled fetcher revalidation redirect");
      } else if (isDeferredResult(result)) {
        invariant(false, "Unhandled fetcher deferred data");
      } else {
        let doneFetcher = getDoneFetcher(result.data);
        state.fetchers.set(key, doneFetcher);
      }
    }
    return {
      loaderData,
      errors
    };
  }
  function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
    let mergedLoaderData = _extends$2({}, newLoaderData);
    for (let match of matches) {
      let id = match.route.id;
      if (newLoaderData.hasOwnProperty(id)) {
        if (newLoaderData[id] !== void 0) {
          mergedLoaderData[id] = newLoaderData[id];
        }
      } else if (loaderData[id] !== void 0 && match.route.loader) {
        mergedLoaderData[id] = loaderData[id];
      }
      if (errors && errors.hasOwnProperty(id)) {
        break;
      }
    }
    return mergedLoaderData;
  }
  function getActionDataForCommit(pendingActionResult) {
    if (!pendingActionResult) {
      return {};
    }
    return isErrorResult(pendingActionResult[1]) ? {
      actionData: {}
    } : {
      actionData: {
        [pendingActionResult[0]]: pendingActionResult[1].data
      }
    };
  }
  function findNearestBoundary(matches, routeId) {
    let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [
      ...matches
    ];
    return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
  }
  function getShortCircuitMatches(routes2) {
    let route = routes2.length === 1 ? routes2[0] : routes2.find((r) => r.index || !r.path || r.path === "/") || {
      id: "__shim-error-route__"
    };
    return {
      matches: [
        {
          params: {},
          pathname: "",
          pathnameBase: "",
          route
        }
      ],
      route
    };
  }
  function getInternalRouterError(status, _temp5) {
    let { pathname, routeId, method, type, message } = _temp5 === void 0 ? {} : _temp5;
    let statusText = "Unknown Server Error";
    let errorMessage = "Unknown @remix-run/router error";
    if (status === 400) {
      statusText = "Bad Request";
      if (type === "route-discovery") {
        errorMessage = 'Unable to match URL "' + pathname + '" - the `unstable_patchRoutesOnNavigation()` ' + ("function threw the following error:\n" + message);
      } else if (method && pathname && routeId) {
        errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request.";
      } else if (type === "defer-action") {
        errorMessage = "defer() is not supported in actions";
      } else if (type === "invalid-body") {
        errorMessage = "Unable to encode submission body";
      }
    } else if (status === 403) {
      statusText = "Forbidden";
      errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"';
    } else if (status === 404) {
      statusText = "Not Found";
      errorMessage = 'No route matches URL "' + pathname + '"';
    } else if (status === 405) {
      statusText = "Method Not Allowed";
      if (method && pathname && routeId) {
        errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request.";
      } else if (method) {
        errorMessage = 'Invalid request method "' + method.toUpperCase() + '"';
      }
    }
    return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
  }
  function findRedirect(results) {
    for (let i = results.length - 1; i >= 0; i--) {
      let result = results[i];
      if (isRedirectResult(result)) {
        return {
          result,
          idx: i
        };
      }
    }
  }
  function stripHashFromPath(path) {
    let parsedPath = typeof path === "string" ? parsePath(path) : path;
    return createPath(_extends$2({}, parsedPath, {
      hash: ""
    }));
  }
  function isHashChangeOnly(a, b) {
    if (a.pathname !== b.pathname || a.search !== b.search) {
      return false;
    }
    if (a.hash === "") {
      return b.hash !== "";
    } else if (a.hash === b.hash) {
      return true;
    } else if (b.hash !== "") {
      return true;
    }
    return false;
  }
  function isPromise(val) {
    return typeof val === "object" && val != null && "then" in val;
  }
  function isRedirectHandlerResult(result) {
    return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
  }
  function isDeferredResult(result) {
    return result.type === ResultType.deferred;
  }
  function isErrorResult(result) {
    return result.type === ResultType.error;
  }
  function isRedirectResult(result) {
    return (result && result.type) === ResultType.redirect;
  }
  function isDataWithResponseInit(value) {
    return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
  }
  function isDeferredData(value) {
    let deferred = value;
    return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
  }
  function isResponse(value) {
    return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
  }
  function isValidMethod(method) {
    return validRequestMethods.has(method.toLowerCase());
  }
  function isMutationMethod(method) {
    return validMutationMethods.has(method.toLowerCase());
  }
  async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
    for (let index2 = 0; index2 < results.length; index2++) {
      let result = results[index2];
      let match = matchesToLoad[index2];
      if (!match) {
        continue;
      }
      let currentMatch = currentMatches.find((m) => m.route.id === match.route.id);
      let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
      if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
        let signal = signals[index2];
        invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
        await resolveDeferredData(result, signal, isFetcher).then((result2) => {
          if (result2) {
            results[index2] = result2 || results[index2];
          }
        });
      }
    }
  }
  async function resolveDeferredData(result, signal, unwrap) {
    if (unwrap === void 0) {
      unwrap = false;
    }
    let aborted = await result.deferredData.resolveData(signal);
    if (aborted) {
      return;
    }
    if (unwrap) {
      try {
        return {
          type: ResultType.data,
          data: result.deferredData.unwrappedData
        };
      } catch (e) {
        return {
          type: ResultType.error,
          error: e
        };
      }
    }
    return {
      type: ResultType.data,
      data: result.deferredData.data
    };
  }
  function hasNakedIndexQuery(search) {
    return new URLSearchParams(search).getAll("index").some((v) => v === "");
  }
  function getTargetMatch(matches, location) {
    let search = typeof location === "string" ? parsePath(location).search : location.search;
    if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
      return matches[matches.length - 1];
    }
    let pathMatches = getPathContributingMatches(matches);
    return pathMatches[pathMatches.length - 1];
  }
  function getSubmissionFromNavigation(navigation) {
    let { formMethod, formAction, formEncType, text, formData, json } = navigation;
    if (!formMethod || !formAction || !formEncType) {
      return;
    }
    if (text != null) {
      return {
        formMethod,
        formAction,
        formEncType,
        formData: void 0,
        json: void 0,
        text
      };
    } else if (formData != null) {
      return {
        formMethod,
        formAction,
        formEncType,
        formData,
        json: void 0,
        text: void 0
      };
    } else if (json !== void 0) {
      return {
        formMethod,
        formAction,
        formEncType,
        formData: void 0,
        json,
        text: void 0
      };
    }
  }
  function getLoadingNavigation(location, submission) {
    if (submission) {
      let navigation = {
        state: "loading",
        location,
        formMethod: submission.formMethod,
        formAction: submission.formAction,
        formEncType: submission.formEncType,
        formData: submission.formData,
        json: submission.json,
        text: submission.text
      };
      return navigation;
    } else {
      let navigation = {
        state: "loading",
        location,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
      };
      return navigation;
    }
  }
  function getSubmittingNavigation(location, submission) {
    let navigation = {
      state: "submitting",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  }
  function getLoadingFetcher(submission, data2) {
    if (submission) {
      let fetcher = {
        state: "loading",
        formMethod: submission.formMethod,
        formAction: submission.formAction,
        formEncType: submission.formEncType,
        formData: submission.formData,
        json: submission.json,
        text: submission.text,
        data: data2
      };
      return fetcher;
    } else {
      let fetcher = {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: data2
      };
      return fetcher;
    }
  }
  function getSubmittingFetcher(submission, existingFetcher) {
    let fetcher = {
      state: "submitting",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data: existingFetcher ? existingFetcher.data : void 0
    };
    return fetcher;
  }
  function getDoneFetcher(data2) {
    let fetcher = {
      state: "idle",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      data: data2
    };
    return fetcher;
  }
  function restoreAppliedTransitions(_window, transitions) {
    try {
      let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
      if (sessionPositions) {
        let json = JSON.parse(sessionPositions);
        for (let [k, v] of Object.entries(json || {})) {
          if (v && Array.isArray(v)) {
            transitions.set(k, new Set(v || []));
          }
        }
      }
    } catch (e) {
    }
  }
  function persistAppliedTransitions(_window, transitions) {
    if (transitions.size > 0) {
      let json = {};
      for (let [k, v] of transitions) {
        json[k] = [
          ...v
        ];
      }
      try {
        _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json));
      } catch (error) {
        warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
      }
    }
  }
  function _extends$1() {
    _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$1.apply(this, arguments);
  }
  const DataRouterContext = reactExports.createContext(null);
  const DataRouterStateContext = reactExports.createContext(null);
  const NavigationContext = reactExports.createContext(null);
  const LocationContext = reactExports.createContext(null);
  const RouteContext = reactExports.createContext({
    outlet: null,
    matches: [],
    isDataRoute: false
  });
  const RouteErrorContext = reactExports.createContext(null);
  function useInRouterContext() {
    return reactExports.useContext(LocationContext) != null;
  }
  function useLocation() {
    !useInRouterContext() ? invariant(false) : void 0;
    return reactExports.useContext(LocationContext).location;
  }
  function useIsomorphicLayoutEffect$1(cb) {
    let isStatic = reactExports.useContext(NavigationContext).static;
    if (!isStatic) {
      reactExports.useLayoutEffect(cb);
    }
  }
  function useNavigate() {
    let { isDataRoute } = reactExports.useContext(RouteContext);
    return isDataRoute ? useNavigateStable() : useNavigateUnstable();
  }
  function useNavigateUnstable() {
    !useInRouterContext() ? invariant(false) : void 0;
    let dataRouterContext = reactExports.useContext(DataRouterContext);
    let { basename, future, navigator } = reactExports.useContext(NavigationContext);
    let { matches } = reactExports.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
    let activeRef = reactExports.useRef(false);
    useIsomorphicLayoutEffect$1(() => {
      activeRef.current = true;
    });
    let navigate = reactExports.useCallback(function(to, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      if (!activeRef.current) return;
      if (typeof to === "number") {
        navigator.go(to);
        return;
      }
      let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options2.relative === "path");
      if (dataRouterContext == null && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([
          basename,
          path.pathname
        ]);
      }
      (!!options2.replace ? navigator.replace : navigator.push)(path, options2.state, options2);
    }, [
      basename,
      navigator,
      routePathnamesJson,
      locationPathname,
      dataRouterContext
    ]);
    return navigate;
  }
  const OutletContext = reactExports.createContext(null);
  function useOutlet(context) {
    let outlet = reactExports.useContext(RouteContext).outlet;
    if (outlet) {
      return reactExports.createElement(OutletContext.Provider, {
        value: context
      }, outlet);
    }
    return outlet;
  }
  function useParams() {
    let { matches } = reactExports.useContext(RouteContext);
    let routeMatch = matches[matches.length - 1];
    return routeMatch ? routeMatch.params : {};
  }
  function useRoutesImpl(routes2, locationArg, dataRouterState, future) {
    !useInRouterContext() ? invariant(false) : void 0;
    let { navigator } = reactExports.useContext(NavigationContext);
    let { matches: parentMatches } = reactExports.useContext(RouteContext);
    let routeMatch = parentMatches[parentMatches.length - 1];
    let parentParams = routeMatch ? routeMatch.params : {};
    routeMatch ? routeMatch.pathname : "/";
    let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
    routeMatch && routeMatch.route;
    let locationFromContext = useLocation();
    let location;
    {
      location = locationFromContext;
    }
    let pathname = location.pathname || "/";
    let remainingPathname = pathname;
    if (parentPathnameBase !== "/") {
      let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
      let segments = pathname.replace(/^\//, "").split("/");
      remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
    }
    let matches = matchRoutes(routes2, {
      pathname: remainingPathname
    });
    let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
      params: Object.assign({}, parentParams, match.params),
      pathname: joinPaths([
        parentPathnameBase,
        navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
      ]),
      pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
        parentPathnameBase,
        navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
      ])
    })), parentMatches, dataRouterState, future);
    return renderedMatches;
  }
  function DefaultErrorComponent() {
    let error = useRouteError();
    let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
    let stack = error instanceof Error ? error.stack : null;
    let lightgrey = "rgba(200,200,200, 0.5)";
    let preStyles = {
      padding: "0.5rem",
      backgroundColor: lightgrey
    };
    let devInfo = null;
    return reactExports.createElement(reactExports.Fragment, null, reactExports.createElement("h2", null, "Unexpected Application Error!"), reactExports.createElement("h3", {
      style: {
        fontStyle: "italic"
      }
    }, message), stack ? reactExports.createElement("pre", {
      style: preStyles
    }, stack) : null, devInfo);
  }
  const defaultErrorElement = reactExports.createElement(DefaultErrorComponent, null);
  class RenderErrorBoundary extends reactExports.Component {
    constructor(props) {
      super(props);
      this.state = {
        location: props.location,
        revalidation: props.revalidation,
        error: props.error
      };
    }
    static getDerivedStateFromError(error) {
      return {
        error
      };
    }
    static getDerivedStateFromProps(props, state) {
      if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
        return {
          error: props.error,
          location: props.location,
          revalidation: props.revalidation
        };
      }
      return {
        error: props.error !== void 0 ? props.error : state.error,
        location: state.location,
        revalidation: props.revalidation || state.revalidation
      };
    }
    componentDidCatch(error, errorInfo) {
      console.error("React Router caught the following error during render", error, errorInfo);
    }
    render() {
      return this.state.error !== void 0 ? reactExports.createElement(RouteContext.Provider, {
        value: this.props.routeContext
      }, reactExports.createElement(RouteErrorContext.Provider, {
        value: this.state.error,
        children: this.props.component
      })) : this.props.children;
    }
  }
  function RenderedRoute(_ref) {
    let { routeContext, match, children } = _ref;
    let dataRouterContext = reactExports.useContext(DataRouterContext);
    if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
      dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
    }
    return reactExports.createElement(RouteContext.Provider, {
      value: routeContext
    }, children);
  }
  function _renderMatches(matches, parentMatches, dataRouterState, future) {
    var _dataRouterState;
    if (parentMatches === void 0) {
      parentMatches = [];
    }
    if (dataRouterState === void 0) {
      dataRouterState = null;
    }
    if (future === void 0) {
      future = null;
    }
    if (matches == null) {
      var _future;
      if (!dataRouterState) {
        return null;
      }
      if (dataRouterState.errors) {
        matches = dataRouterState.matches;
      } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
        matches = dataRouterState.matches;
      } else {
        return null;
      }
    }
    let renderedMatches = matches;
    let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
    if (errors != null) {
      let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0);
      !(errorIndex >= 0) ? invariant(false) : void 0;
      renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
    }
    let renderFallback = false;
    let fallbackIndex = -1;
    if (dataRouterState && future && future.v7_partialHydration) {
      for (let i = 0; i < renderedMatches.length; i++) {
        let match = renderedMatches[i];
        if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
          fallbackIndex = i;
        }
        if (match.route.id) {
          let { loaderData, errors: errors2 } = dataRouterState;
          let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
          if (match.route.lazy || needsToRunLoader) {
            renderFallback = true;
            if (fallbackIndex >= 0) {
              renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
            } else {
              renderedMatches = [
                renderedMatches[0]
              ];
            }
            break;
          }
        }
      }
    }
    return renderedMatches.reduceRight((outlet, match, index2) => {
      let error;
      let shouldRenderHydrateFallback = false;
      let errorElement = null;
      let hydrateFallbackElement = null;
      if (dataRouterState) {
        error = errors && match.route.id ? errors[match.route.id] : void 0;
        errorElement = match.route.errorElement || defaultErrorElement;
        if (renderFallback) {
          if (fallbackIndex < 0 && index2 === 0) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = null;
          } else if (fallbackIndex === index2) {
            shouldRenderHydrateFallback = true;
            hydrateFallbackElement = match.route.hydrateFallbackElement || null;
          }
        }
      }
      let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
      let getChildren = () => {
        let children;
        if (error) {
          children = errorElement;
        } else if (shouldRenderHydrateFallback) {
          children = hydrateFallbackElement;
        } else if (match.route.Component) {
          children = reactExports.createElement(match.route.Component, null);
        } else if (match.route.element) {
          children = match.route.element;
        } else {
          children = outlet;
        }
        return reactExports.createElement(RenderedRoute, {
          match,
          routeContext: {
            outlet,
            matches: matches2,
            isDataRoute: dataRouterState != null
          },
          children
        });
      };
      return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? reactExports.createElement(RenderErrorBoundary, {
        location: dataRouterState.location,
        revalidation: dataRouterState.revalidation,
        component: errorElement,
        error,
        children: getChildren(),
        routeContext: {
          outlet: null,
          matches: matches2,
          isDataRoute: true
        }
      }) : getChildren();
    }, null);
  }
  var DataRouterHook$1 = function(DataRouterHook2) {
    DataRouterHook2["UseBlocker"] = "useBlocker";
    DataRouterHook2["UseRevalidator"] = "useRevalidator";
    DataRouterHook2["UseNavigateStable"] = "useNavigate";
    return DataRouterHook2;
  }(DataRouterHook$1 || {});
  var DataRouterStateHook$1 = function(DataRouterStateHook2) {
    DataRouterStateHook2["UseBlocker"] = "useBlocker";
    DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
    DataRouterStateHook2["UseActionData"] = "useActionData";
    DataRouterStateHook2["UseRouteError"] = "useRouteError";
    DataRouterStateHook2["UseNavigation"] = "useNavigation";
    DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
    DataRouterStateHook2["UseMatches"] = "useMatches";
    DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
    DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
    DataRouterStateHook2["UseRouteId"] = "useRouteId";
    return DataRouterStateHook2;
  }(DataRouterStateHook$1 || {});
  function useDataRouterContext(hookName) {
    let ctx = reactExports.useContext(DataRouterContext);
    !ctx ? invariant(false) : void 0;
    return ctx;
  }
  function useDataRouterState(hookName) {
    let state = reactExports.useContext(DataRouterStateContext);
    !state ? invariant(false) : void 0;
    return state;
  }
  function useRouteContext(hookName) {
    let route = reactExports.useContext(RouteContext);
    !route ? invariant(false) : void 0;
    return route;
  }
  function useCurrentRouteId(hookName) {
    let route = useRouteContext();
    let thisRoute = route.matches[route.matches.length - 1];
    !thisRoute.route.id ? invariant(false) : void 0;
    return thisRoute.route.id;
  }
  function useRouteError() {
    var _state$errors;
    let error = reactExports.useContext(RouteErrorContext);
    let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
    let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
    if (error !== void 0) {
      return error;
    }
    return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
  }
  function useNavigateStable() {
    let { router: router2 } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
    let id = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
    let activeRef = reactExports.useRef(false);
    useIsomorphicLayoutEffect$1(() => {
      activeRef.current = true;
    });
    let navigate = reactExports.useCallback(function(to, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      if (!activeRef.current) return;
      if (typeof to === "number") {
        router2.navigate(to);
      } else {
        router2.navigate(to, _extends$1({
          fromRouteId: id
        }, options2));
      }
    }, [
      router2,
      id
    ]);
    return navigate;
  }
  function Navigate(_ref4) {
    let { to, replace: replace2, state, relative } = _ref4;
    !useInRouterContext() ? invariant(false) : void 0;
    let { future, static: isStatic } = reactExports.useContext(NavigationContext);
    let { matches } = reactExports.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let navigate = useNavigate();
    let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
    let jsonPath = JSON.stringify(path);
    reactExports.useEffect(() => navigate(JSON.parse(jsonPath), {
      replace: replace2,
      state,
      relative
    }), [
      navigate,
      jsonPath,
      relative,
      replace2,
      state
    ]);
    return null;
  }
  function Outlet(props) {
    return useOutlet(props.context);
  }
  function Route(_props) {
    invariant(false);
  }
  function Router(_ref5) {
    let { basename: basenameProp = "/", children = null, location: locationProp, navigationType = Action$1.Pop, navigator, static: staticProp = false, future } = _ref5;
    !!useInRouterContext() ? invariant(false) : void 0;
    let basename = basenameProp.replace(/^\/*/, "/");
    let navigationContext = reactExports.useMemo(() => ({
      basename,
      navigator,
      static: staticProp,
      future: _extends$1({
        v7_relativeSplatPath: false
      }, future)
    }), [
      basename,
      future,
      navigator,
      staticProp
    ]);
    if (typeof locationProp === "string") {
      locationProp = parsePath(locationProp);
    }
    let { pathname = "/", search = "", hash = "", state = null, key = "default" } = locationProp;
    let locationContext = reactExports.useMemo(() => {
      let trailingPathname = stripBasename(pathname, basename);
      if (trailingPathname == null) {
        return null;
      }
      return {
        location: {
          pathname: trailingPathname,
          search,
          hash,
          state,
          key
        },
        navigationType
      };
    }, [
      basename,
      pathname,
      search,
      hash,
      state,
      key,
      navigationType
    ]);
    if (locationContext == null) {
      return null;
    }
    return reactExports.createElement(NavigationContext.Provider, {
      value: navigationContext
    }, reactExports.createElement(LocationContext.Provider, {
      children,
      value: locationContext
    }));
  }
  new Promise(() => {
  });
  function createRoutesFromChildren(children, parentPath) {
    if (parentPath === void 0) {
      parentPath = [];
    }
    let routes2 = [];
    reactExports.Children.forEach(children, (element, index2) => {
      if (!reactExports.isValidElement(element)) {
        return;
      }
      let treePath = [
        ...parentPath,
        index2
      ];
      if (element.type === reactExports.Fragment) {
        routes2.push.apply(routes2, createRoutesFromChildren(element.props.children, treePath));
        return;
      }
      !(element.type === Route) ? invariant(false) : void 0;
      !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
      let route = {
        id: element.props.id || treePath.join("-"),
        caseSensitive: element.props.caseSensitive,
        element: element.props.element,
        Component: element.props.Component,
        index: element.props.index,
        path: element.props.path,
        loader: element.props.loader,
        action: element.props.action,
        errorElement: element.props.errorElement,
        ErrorBoundary: element.props.ErrorBoundary,
        hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
        shouldRevalidate: element.props.shouldRevalidate,
        handle: element.props.handle,
        lazy: element.props.lazy
      };
      if (element.props.children) {
        route.children = createRoutesFromChildren(element.props.children, treePath);
      }
      routes2.push(route);
    });
    return routes2;
  }
  function mapRouteProperties(route) {
    let updates = {
      hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
    };
    if (route.Component) {
      Object.assign(updates, {
        element: reactExports.createElement(route.Component),
        Component: void 0
      });
    }
    if (route.HydrateFallback) {
      Object.assign(updates, {
        hydrateFallbackElement: reactExports.createElement(route.HydrateFallback),
        HydrateFallback: void 0
      });
    }
    if (route.ErrorBoundary) {
      Object.assign(updates, {
        errorElement: reactExports.createElement(route.ErrorBoundary),
        ErrorBoundary: void 0
      });
    }
    return updates;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  const REACT_ROUTER_VERSION = "6";
  try {
    window.__reactRouterVersion = REACT_ROUTER_VERSION;
  } catch (e) {
  }
  function createBrowserRouter(routes2, opts) {
    return createRouter({
      basename: opts == null ? void 0 : opts.basename,
      future: _extends({}, opts == null ? void 0 : opts.future, {
        v7_prependBasename: true
      }),
      history: createBrowserHistory({
        window: opts == null ? void 0 : opts.window
      }),
      hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
      routes: routes2,
      mapRouteProperties,
      unstable_dataStrategy: opts == null ? void 0 : opts.unstable_dataStrategy,
      unstable_patchRoutesOnNavigation: opts == null ? void 0 : opts.unstable_patchRoutesOnNavigation,
      window: opts == null ? void 0 : opts.window
    }).initialize();
  }
  function parseHydrationData() {
    var _window;
    let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
    if (state && state.errors) {
      state = _extends({}, state, {
        errors: deserializeErrors(state.errors)
      });
    }
    return state;
  }
  function deserializeErrors(errors) {
    if (!errors) return null;
    let entries = Object.entries(errors);
    let serialized = {};
    for (let [key, val] of entries) {
      if (val && val.__type === "RouteErrorResponse") {
        serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
      } else if (val && val.__type === "Error") {
        if (val.__subType) {
          let ErrorConstructor = window[val.__subType];
          if (typeof ErrorConstructor === "function") {
            try {
              let error = new ErrorConstructor(val.message);
              error.stack = "";
              serialized[key] = error;
            } catch (e) {
            }
          }
        }
        if (serialized[key] == null) {
          let error = new Error(val.message);
          error.stack = "";
          serialized[key] = error;
        }
      } else {
        serialized[key] = val;
      }
    }
    return serialized;
  }
  const ViewTransitionContext = reactExports.createContext({
    isTransitioning: false
  });
  const FetchersContext = reactExports.createContext(/* @__PURE__ */ new Map());
  const START_TRANSITION = "startTransition";
  const startTransitionImpl = React[START_TRANSITION];
  const FLUSH_SYNC = "flushSync";
  const flushSyncImpl = ReactDOM[FLUSH_SYNC];
  function startTransitionSafe(cb) {
    if (startTransitionImpl) {
      startTransitionImpl(cb);
    } else {
      cb();
    }
  }
  function flushSyncSafe(cb) {
    if (flushSyncImpl) {
      flushSyncImpl(cb);
    } else {
      cb();
    }
  }
  class Deferred {
    constructor() {
      this.status = "pending";
      this.promise = new Promise((resolve, reject) => {
        this.resolve = (value) => {
          if (this.status === "pending") {
            this.status = "resolved";
            resolve(value);
          }
        };
        this.reject = (reason) => {
          if (this.status === "pending") {
            this.status = "rejected";
            reject(reason);
          }
        };
      });
    }
  }
  function RouterProvider(_ref) {
    let { fallbackElement, router: router2, future } = _ref;
    let [state, setStateImpl] = reactExports.useState(router2.state);
    let [pendingState, setPendingState] = reactExports.useState();
    let [vtContext, setVtContext] = reactExports.useState({
      isTransitioning: false
    });
    let [renderDfd, setRenderDfd] = reactExports.useState();
    let [transition, setTransition] = reactExports.useState();
    let [interruption, setInterruption] = reactExports.useState();
    let fetcherData = reactExports.useRef(/* @__PURE__ */ new Map());
    let { v7_startTransition } = future || {};
    let optInStartTransition = reactExports.useCallback((cb) => {
      if (v7_startTransition) {
        startTransitionSafe(cb);
      } else {
        cb();
      }
    }, [
      v7_startTransition
    ]);
    let setState = reactExports.useCallback((newState, _ref2) => {
      let { deletedFetchers, unstable_flushSync: flushSync, unstable_viewTransitionOpts: viewTransitionOpts } = _ref2;
      deletedFetchers.forEach((key) => fetcherData.current.delete(key));
      newState.fetchers.forEach((fetcher, key) => {
        if (fetcher.data !== void 0) {
          fetcherData.current.set(key, fetcher.data);
        }
      });
      let isViewTransitionUnavailable = router2.window == null || router2.window.document == null || typeof router2.window.document.startViewTransition !== "function";
      if (!viewTransitionOpts || isViewTransitionUnavailable) {
        if (flushSync) {
          flushSyncSafe(() => setStateImpl(newState));
        } else {
          optInStartTransition(() => setStateImpl(newState));
        }
        return;
      }
      if (flushSync) {
        flushSyncSafe(() => {
          if (transition) {
            renderDfd && renderDfd.resolve();
            transition.skipTransition();
          }
          setVtContext({
            isTransitioning: true,
            flushSync: true,
            currentLocation: viewTransitionOpts.currentLocation,
            nextLocation: viewTransitionOpts.nextLocation
          });
        });
        let t = router2.window.document.startViewTransition(() => {
          flushSyncSafe(() => setStateImpl(newState));
        });
        t.finished.finally(() => {
          flushSyncSafe(() => {
            setRenderDfd(void 0);
            setTransition(void 0);
            setPendingState(void 0);
            setVtContext({
              isTransitioning: false
            });
          });
        });
        flushSyncSafe(() => setTransition(t));
        return;
      }
      if (transition) {
        renderDfd && renderDfd.resolve();
        transition.skipTransition();
        setInterruption({
          state: newState,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      } else {
        setPendingState(newState);
        setVtContext({
          isTransitioning: true,
          flushSync: false,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      }
    }, [
      router2.window,
      transition,
      renderDfd,
      fetcherData,
      optInStartTransition
    ]);
    reactExports.useLayoutEffect(() => router2.subscribe(setState), [
      router2,
      setState
    ]);
    reactExports.useEffect(() => {
      if (vtContext.isTransitioning && !vtContext.flushSync) {
        setRenderDfd(new Deferred());
      }
    }, [
      vtContext
    ]);
    reactExports.useEffect(() => {
      if (renderDfd && pendingState && router2.window) {
        let newState = pendingState;
        let renderPromise = renderDfd.promise;
        let transition2 = router2.window.document.startViewTransition(async () => {
          optInStartTransition(() => setStateImpl(newState));
          await renderPromise;
        });
        transition2.finished.finally(() => {
          setRenderDfd(void 0);
          setTransition(void 0);
          setPendingState(void 0);
          setVtContext({
            isTransitioning: false
          });
        });
        setTransition(transition2);
      }
    }, [
      optInStartTransition,
      pendingState,
      renderDfd,
      router2.window
    ]);
    reactExports.useEffect(() => {
      if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
        renderDfd.resolve();
      }
    }, [
      renderDfd,
      transition,
      state.location,
      pendingState
    ]);
    reactExports.useEffect(() => {
      if (!vtContext.isTransitioning && interruption) {
        setPendingState(interruption.state);
        setVtContext({
          isTransitioning: true,
          flushSync: false,
          currentLocation: interruption.currentLocation,
          nextLocation: interruption.nextLocation
        });
        setInterruption(void 0);
      }
    }, [
      vtContext.isTransitioning,
      interruption
    ]);
    reactExports.useEffect(() => {
    }, []);
    let navigator = reactExports.useMemo(() => {
      return {
        createHref: router2.createHref,
        encodeLocation: router2.encodeLocation,
        go: (n) => router2.navigate(n),
        push: (to, state2, opts) => router2.navigate(to, {
          state: state2,
          preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
        }),
        replace: (to, state2, opts) => router2.navigate(to, {
          replace: true,
          state: state2,
          preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
        })
      };
    }, [
      router2
    ]);
    let basename = router2.basename || "/";
    let dataRouterContext = reactExports.useMemo(() => ({
      router: router2,
      navigator,
      static: false,
      basename
    }), [
      router2,
      navigator,
      basename
    ]);
    let routerFuture = reactExports.useMemo(() => ({
      v7_relativeSplatPath: router2.future.v7_relativeSplatPath
    }), [
      router2.future.v7_relativeSplatPath
    ]);
    return reactExports.createElement(reactExports.Fragment, null, reactExports.createElement(DataRouterContext.Provider, {
      value: dataRouterContext
    }, reactExports.createElement(DataRouterStateContext.Provider, {
      value: state
    }, reactExports.createElement(FetchersContext.Provider, {
      value: fetcherData.current
    }, reactExports.createElement(ViewTransitionContext.Provider, {
      value: vtContext
    }, reactExports.createElement(Router, {
      basename,
      location: state.location,
      navigationType: state.historyAction,
      navigator,
      future: routerFuture
    }, state.initialized || router2.future.v7_partialHydration ? reactExports.createElement(MemoizedDataRoutes, {
      routes: router2.routes,
      future: router2.future,
      state
    }) : fallbackElement))))), null);
  }
  const MemoizedDataRoutes = reactExports.memo(DataRoutes);
  function DataRoutes(_ref3) {
    let { routes: routes2, future, state } = _ref3;
    return useRoutesImpl(routes2, void 0, state, future);
  }
  var DataRouterHook;
  (function(DataRouterHook2) {
    DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
    DataRouterHook2["UseSubmit"] = "useSubmit";
    DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
    DataRouterHook2["UseFetcher"] = "useFetcher";
    DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
  })(DataRouterHook || (DataRouterHook = {}));
  var DataRouterStateHook;
  (function(DataRouterStateHook2) {
    DataRouterStateHook2["UseFetcher"] = "useFetcher";
    DataRouterStateHook2["UseFetchers"] = "useFetchers";
    DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
  })(DataRouterStateHook || (DataRouterStateHook = {}));
  var useReactId = React["useId".toString()] || (() => void 0);
  var count$1 = 0;
  useId = function(deterministicId) {
    const [id, setId] = reactExports.useState(useReactId());
    useLayoutEffect2(() => {
      setId((reactId) => reactId ?? String(count$1++));
    }, [
      deterministicId
    ]);
    return id ? `radix-${id}` : "";
  };
  var COLLAPSIBLE_NAME = "Collapsible";
  let createCollapsibleContext;
  [createCollapsibleContext, createCollapsibleScope] = createContextScope$2(COLLAPSIBLE_NAME);
  var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
  var Collapsible$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange
    });
    return jsxRuntimeExports.jsx(CollapsibleProvider, {
      scope: __scopeCollapsible,
      disabled,
      contentId: useId(),
      open,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [
        setOpen
      ]),
      children: jsxRuntimeExports.jsx(Primitive.div, {
        "data-state": getState$1(open),
        "data-disabled": disabled ? "" : void 0,
        ...collapsibleProps,
        ref: forwardedRef
      })
    });
  });
  Collapsible$1.displayName = COLLAPSIBLE_NAME;
  var TRIGGER_NAME$4 = "CollapsibleTrigger";
  var CollapsibleTrigger$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$4, __scopeCollapsible);
    return jsxRuntimeExports.jsx(Primitive.button, {
      type: "button",
      "aria-controls": context.contentId,
      "aria-expanded": context.open || false,
      "data-state": getState$1(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      disabled: context.disabled,
      ...triggerProps,
      ref: forwardedRef,
      onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
    });
  });
  CollapsibleTrigger$1.displayName = TRIGGER_NAME$4;
  var CONTENT_NAME$6 = "CollapsibleContent";
  var CollapsibleContent$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$6, props.__scopeCollapsible);
    return jsxRuntimeExports.jsx(Presence, {
      present: forceMount || context.open,
      children: ({ present }) => jsxRuntimeExports.jsx(CollapsibleContentImpl, {
        ...contentProps,
        ref: forwardedRef,
        present
      })
    });
  });
  CollapsibleContent$1.displayName = CONTENT_NAME$6;
  var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeCollapsible, present, children, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$6, __scopeCollapsible);
    const [isPresent, setIsPresent] = reactExports.useState(present);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const heightRef = reactExports.useRef(0);
    const height = heightRef.current;
    const widthRef = reactExports.useRef(0);
    const width = widthRef.current;
    const isOpen = context.open || isPresent;
    const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
    const originalStylesRef = reactExports.useRef();
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    useLayoutEffect2(() => {
      const node = ref.current;
      if (node) {
        originalStylesRef.current = originalStylesRef.current || {
          transitionDuration: node.style.transitionDuration,
          animationName: node.style.animationName
        };
        node.style.transitionDuration = "0s";
        node.style.animationName = "none";
        const rect = node.getBoundingClientRect();
        heightRef.current = rect.height;
        widthRef.current = rect.width;
        if (!isMountAnimationPreventedRef.current) {
          node.style.transitionDuration = originalStylesRef.current.transitionDuration;
          node.style.animationName = originalStylesRef.current.animationName;
        }
        setIsPresent(present);
      }
    }, [
      context.open,
      present
    ]);
    return jsxRuntimeExports.jsx(Primitive.div, {
      "data-state": getState$1(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    });
  });
  function getState$1(open) {
    return open ? "open" : "closed";
  }
  Root$5 = Collapsible$1;
  Trigger$3 = CollapsibleTrigger$1;
  Content$2 = CollapsibleContent$1;
  const Collapsible = Root$5;
  const CollapsibleTrigger = CollapsibleTrigger$1;
  const CollapsibleContent = CollapsibleContent$1;
  const MOBILE_BREAKPOINT = 768;
  function useIsMobile() {
    const [isMobile, setIsMobile] = reactExports.useState(void 0);
    reactExports.useEffect(() => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };
      mql.addEventListener("change", onChange);
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      return () => mql.removeEventListener("change", onChange);
    }, []);
    return !!isMobile;
  }
  buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  });
  Button = reactExports.forwardRef(({ className, variant, size: size2, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return jsxRuntimeExports.jsx(Comp, {
      className: cn(buttonVariants({
        variant,
        size: size2,
        className
      })),
      ref,
      ...props
    });
  });
  Button.displayName = "Button";
  Input = reactExports.forwardRef(({ className, type, ...props }, ref) => {
    return jsxRuntimeExports.jsx("input", {
      type,
      className: cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
      ref,
      ...props
    });
  });
  Input.displayName = "Input";
  var NAME$2 = "Separator";
  var DEFAULT_ORIENTATION = "horizontal";
  var ORIENTATIONS = [
    "horizontal",
    "vertical"
  ];
  var Separator$2 = reactExports.forwardRef((props, forwardedRef) => {
    const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
    const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
    const ariaOrientation = orientation === "vertical" ? orientation : void 0;
    const semanticProps = decorative ? {
      role: "none"
    } : {
      "aria-orientation": ariaOrientation,
      role: "separator"
    };
    return jsxRuntimeExports.jsx(Primitive.div, {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    });
  });
  Separator$2.displayName = NAME$2;
  function isValidOrientation(orientation) {
    return ORIENTATIONS.includes(orientation);
  }
  Root$4 = Separator$2;
  Separator$1 = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => jsxRuntimeExports.jsx(Root$4, {
    ref,
    decorative,
    orientation,
    className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
    ...props
  }));
  Separator$1.displayName = Root$4.displayName;
  var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
  var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
  var EVENT_OPTIONS$1 = {
    bubbles: false,
    cancelable: true
  };
  var FOCUS_SCOPE_NAME = "FocusScope";
  FocusScope = reactExports.forwardRef((props, forwardedRef) => {
    const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
    const [container, setContainer] = reactExports.useState(null);
    const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
    const lastFocusedElementRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
    const focusScope = reactExports.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    reactExports.useEffect(() => {
      if (trapped) {
        let handleFocusIn2 = function(event) {
          if (focusScope.paused || !container) return;
          const target = event.target;
          if (container.contains(target)) {
            lastFocusedElementRef.current = target;
          } else {
            focus(lastFocusedElementRef.current, {
              select: true
            });
          }
        }, handleFocusOut2 = function(event) {
          if (focusScope.paused || !container) return;
          const relatedTarget = event.relatedTarget;
          if (relatedTarget === null) return;
          if (!container.contains(relatedTarget)) {
            focus(lastFocusedElementRef.current, {
              select: true
            });
          }
        }, handleMutations2 = function(mutations) {
          const focusedElement = document.activeElement;
          if (focusedElement !== document.body) return;
          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0) focus(container);
          }
        };
        document.addEventListener("focusin", handleFocusIn2);
        document.addEventListener("focusout", handleFocusOut2);
        const mutationObserver = new MutationObserver(handleMutations2);
        if (container) mutationObserver.observe(container, {
          childList: true,
          subtree: true
        });
        return () => {
          document.removeEventListener("focusin", handleFocusIn2);
          document.removeEventListener("focusout", handleFocusOut2);
          mutationObserver.disconnect();
        };
      }
    }, [
      trapped,
      container,
      focusScope.paused
    ]);
    reactExports.useEffect(() => {
      if (container) {
        focusScopesStack.add(focusScope);
        const previouslyFocusedElement = document.activeElement;
        const hasFocusedCandidate = container.contains(previouslyFocusedElement);
        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS$1);
          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          container.dispatchEvent(mountEvent);
          if (!mountEvent.defaultPrevented) {
            focusFirst$2(removeLinks(getTabbableCandidates(container)), {
              select: true
            });
            if (document.activeElement === previouslyFocusedElement) {
              focus(container);
            }
          }
        }
        return () => {
          container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          setTimeout(() => {
            const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS$1);
            container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
            container.dispatchEvent(unmountEvent);
            if (!unmountEvent.defaultPrevented) {
              focus(previouslyFocusedElement ?? document.body, {
                select: true
              });
            }
            container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
            focusScopesStack.remove(focusScope);
          }, 0);
        };
      }
    }, [
      container,
      onMountAutoFocus,
      onUnmountAutoFocus,
      focusScope
    ]);
    const handleKeyDown = reactExports.useCallback((event) => {
      if (!loop && !trapped) return;
      if (focusScope.paused) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = document.activeElement;
      if (isTabKey && focusedElement) {
        const container2 = event.currentTarget;
        const [first, last] = getTabbableEdges(container2);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container2) event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) focus(first, {
              select: true
            });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) focus(last, {
              select: true
            });
          }
        }
      }
    }, [
      loop,
      trapped,
      focusScope.paused
    ]);
    return jsxRuntimeExports.jsx(Primitive.div, {
      tabIndex: -1,
      ...scopeProps,
      ref: composedRefs,
      onKeyDown: handleKeyDown
    });
  });
  FocusScope.displayName = FOCUS_SCOPE_NAME;
  function focusFirst$2(candidates, { select = false } = {}) {
    const previouslyFocusedElement = document.activeElement;
    for (const candidate of candidates) {
      focus(candidate, {
        select
      });
      if (document.activeElement !== previouslyFocusedElement) return;
    }
  }
  function getTabbableEdges(container) {
    const candidates = getTabbableCandidates(container);
    const first = findVisible(candidates, container);
    const last = findVisible(candidates.reverse(), container);
    return [
      first,
      last
    ];
  }
  function getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
        if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
        return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }
  function findVisible(elements, container) {
    for (const element of elements) {
      if (!isHidden(element, {
        upTo: container
      })) return element;
    }
  }
  function isHidden(node, { upTo }) {
    if (getComputedStyle(node).visibility === "hidden") return true;
    while (node) {
      if (upTo !== void 0 && node === upTo) return false;
      if (getComputedStyle(node).display === "none") return true;
      node = node.parentElement;
    }
    return false;
  }
  function isSelectableInput(element) {
    return element instanceof HTMLInputElement && "select" in element;
  }
  function focus(element, { select = false } = {}) {
    if (element && element.focus) {
      const previouslyFocusedElement = document.activeElement;
      element.focus({
        preventScroll: true
      });
      if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
    }
  }
  var focusScopesStack = createFocusScopesStack();
  function createFocusScopesStack() {
    let stack = [];
    return {
      add(focusScope) {
        const activeFocusScope = stack[0];
        if (focusScope !== activeFocusScope) {
          activeFocusScope == null ? void 0 : activeFocusScope.pause();
        }
        stack = arrayRemove(stack, focusScope);
        stack.unshift(focusScope);
      },
      remove(focusScope) {
        var _a;
        stack = arrayRemove(stack, focusScope);
        (_a = stack[0]) == null ? void 0 : _a.resume();
      }
    };
  }
  function arrayRemove(array, item) {
    const updatedArray = [
      ...array
    ];
    const index2 = updatedArray.indexOf(item);
    if (index2 !== -1) {
      updatedArray.splice(index2, 1);
    }
    return updatedArray;
  }
  function removeLinks(items) {
    return items.filter((item) => item.tagName !== "A");
  }
  var count = 0;
  useFocusGuards = function() {
    reactExports.useEffect(() => {
      const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
      document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
      document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
      count++;
      return () => {
        if (count === 1) {
          document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
        }
        count--;
      };
    }, []);
  };
  function createFocusGuard() {
    const element = document.createElement("span");
    element.setAttribute("data-radix-focus-guard", "");
    element.tabIndex = 0;
    element.style.outline = "none";
    element.style.opacity = "0";
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    return element;
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  var zeroRightClassName = "right-scroll-bar-position";
  var fullWidthClassName = "width-before-scroll-bar";
  var noScrollbarsClassName = "with-scroll-bars-hidden";
  var removedBarSizeVariable = "--removed-body-scroll-bar-size";
  function assignRef(ref, value) {
    if (typeof ref === "function") {
      ref(value);
    } else if (ref) {
      ref.current = value;
    }
    return ref;
  }
  function useCallbackRef(initialValue, callback) {
    var ref = reactExports.useState(function() {
      return {
        value: initialValue,
        callback,
        facade: {
          get current() {
            return ref.value;
          },
          set current(value) {
            var last = ref.value;
            if (last !== value) {
              ref.value = value;
              ref.callback(value, last);
            }
          }
        }
      };
    })[0];
    ref.callback = callback;
    return ref.facade;
  }
  var useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
  var currentValues = /* @__PURE__ */ new WeakMap();
  function useMergeRefs(refs, defaultValue) {
    var callbackRef = useCallbackRef(null, function(newValue) {
      return refs.forEach(function(ref) {
        return assignRef(ref, newValue);
      });
    });
    useIsomorphicLayoutEffect(function() {
      var oldValue = currentValues.get(callbackRef);
      if (oldValue) {
        var prevRefs_1 = new Set(oldValue);
        var nextRefs_1 = new Set(refs);
        var current_1 = callbackRef.current;
        prevRefs_1.forEach(function(ref) {
          if (!nextRefs_1.has(ref)) {
            assignRef(ref, null);
          }
        });
        nextRefs_1.forEach(function(ref) {
          if (!prevRefs_1.has(ref)) {
            assignRef(ref, current_1);
          }
        });
      }
      currentValues.set(callbackRef, refs);
    }, [
      refs
    ]);
    return callbackRef;
  }
  function ItoI(a) {
    return a;
  }
  function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) {
      middleware = ItoI;
    }
    var buffer = [];
    var assigned = false;
    var medium = {
      read: function() {
        if (assigned) {
          throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        }
        if (buffer.length) {
          return buffer[buffer.length - 1];
        }
        return defaults;
      },
      useMedium: function(data2) {
        var item = middleware(data2, assigned);
        buffer.push(item);
        return function() {
          buffer = buffer.filter(function(x) {
            return x !== item;
          });
        };
      },
      assignSyncMedium: function(cb) {
        assigned = true;
        while (buffer.length) {
          var cbs = buffer;
          buffer = [];
          cbs.forEach(cb);
        }
        buffer = {
          push: function(x) {
            return cb(x);
          },
          filter: function() {
            return buffer;
          }
        };
      },
      assignMedium: function(cb) {
        assigned = true;
        var pendingQueue = [];
        if (buffer.length) {
          var cbs = buffer;
          buffer = [];
          cbs.forEach(cb);
          pendingQueue = buffer;
        }
        var executeQueue = function() {
          var cbs2 = pendingQueue;
          pendingQueue = [];
          cbs2.forEach(cb);
        };
        var cycle = function() {
          return Promise.resolve().then(executeQueue);
        };
        cycle();
        buffer = {
          push: function(x) {
            pendingQueue.push(x);
            cycle();
          },
          filter: function(filter) {
            pendingQueue = pendingQueue.filter(filter);
            return buffer;
          }
        };
      }
    };
    return medium;
  }
  function createSidecarMedium(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    var medium = innerCreateMedium(null);
    medium.options = __assign({
      async: true,
      ssr: false
    }, options2);
    return medium;
  }
  var SideCar$1 = function(_a) {
    var sideCar = _a.sideCar, rest = __rest(_a, [
      "sideCar"
    ]);
    if (!sideCar) {
      throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    }
    var Target = sideCar.read();
    if (!Target) {
      throw new Error("Sidecar medium not found");
    }
    return reactExports.createElement(Target, __assign({}, rest));
  };
  SideCar$1.isSideCarExport = true;
  function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar$1;
  }
  var effectCar = createSidecarMedium();
  var nothing = function() {
    return;
  };
  var RemoveScroll = reactExports.forwardRef(function(props, parentRef) {
    var ref = reactExports.useRef(null);
    var _a = reactExports.useState({
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing
    }), callbacks = _a[0], setCallbacks = _a[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, [
      "forwardProps",
      "children",
      "className",
      "removeScrollBar",
      "enabled",
      "shards",
      "sideCar",
      "noIsolation",
      "inert",
      "allowPinchZoom",
      "as",
      "gapMode"
    ]);
    var SideCar2 = sideCar;
    var containerRef = useMergeRefs([
      ref,
      parentRef
    ]);
    var containerProps = __assign(__assign({}, rest), callbacks);
    return reactExports.createElement(reactExports.Fragment, null, enabled && reactExports.createElement(SideCar2, {
      sideCar: effectCar,
      removeScrollBar,
      shards,
      noIsolation,
      inert,
      setCallbacks,
      allowPinchZoom: !!allowPinchZoom,
      lockRef: ref,
      gapMode
    }), forwardProps ? reactExports.cloneElement(reactExports.Children.only(children), __assign(__assign({}, containerProps), {
      ref: containerRef
    })) : reactExports.createElement(Container, __assign({}, containerProps, {
      className,
      ref: containerRef
    }), children));
  });
  RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  RemoveScroll.classNames = {
    fullWidth: fullWidthClassName,
    zeroRight: zeroRightClassName
  };
  var getNonce = function() {
    if (typeof __webpack_nonce__ !== "undefined") {
      return __webpack_nonce__;
    }
    return void 0;
  };
  function makeStyleTag() {
    if (!document) return null;
    var tag = document.createElement("style");
    tag.type = "text/css";
    var nonce = getNonce();
    if (nonce) {
      tag.setAttribute("nonce", nonce);
    }
    return tag;
  }
  function injectStyles(tag, css) {
    if (tag.styleSheet) {
      tag.styleSheet.cssText = css;
    } else {
      tag.appendChild(document.createTextNode(css));
    }
  }
  function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(tag);
  }
  var stylesheetSingleton = function() {
    var counter = 0;
    var stylesheet = null;
    return {
      add: function(style) {
        if (counter == 0) {
          if (stylesheet = makeStyleTag()) {
            injectStyles(stylesheet, style);
            insertStyleTag(stylesheet);
          }
        }
        counter++;
      },
      remove: function() {
        counter--;
        if (!counter && stylesheet) {
          stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
          stylesheet = null;
        }
      }
    };
  };
  var styleHookSingleton = function() {
    var sheet = stylesheetSingleton();
    return function(styles, isDynamic) {
      reactExports.useEffect(function() {
        sheet.add(styles);
        return function() {
          sheet.remove();
        };
      }, [
        styles && isDynamic
      ]);
    };
  };
  var styleSingleton = function() {
    var useStyle = styleHookSingleton();
    var Sheet2 = function(_a) {
      var styles = _a.styles, dynamic = _a.dynamic;
      useStyle(styles, dynamic);
      return null;
    };
    return Sheet2;
  };
  var zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  };
  var parse = function(x) {
    return parseInt(x || "", 10) || 0;
  };
  var getOffset = function(gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
    var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
    var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
    return [
      parse(left),
      parse(top),
      parse(right)
    ];
  };
  var getGapWidth = function(gapMode) {
    if (gapMode === void 0) {
      gapMode = "margin";
    }
    if (typeof window === "undefined") {
      return zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
      left: offsets[0],
      top: offsets[1],
      right: offsets[2],
      gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
    };
  };
  var Style = styleSingleton();
  var lockAttribute = "data-scroll-locked";
  var getStyles = function(_a, allowRelative, gapMode, important) {
    var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
    if (gapMode === void 0) {
      gapMode = "margin";
    }
    return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
      allowRelative && "position: relative ".concat(important, ";"),
      gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
      gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
    ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
  };
  var getCurrentUseCounter = function() {
    var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
    return isFinite(counter) ? counter : 0;
  };
  var useLockAttribute = function() {
    reactExports.useEffect(function() {
      document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
      return function() {
        var newCounter = getCurrentUseCounter() - 1;
        if (newCounter <= 0) {
          document.body.removeAttribute(lockAttribute);
        } else {
          document.body.setAttribute(lockAttribute, newCounter.toString());
        }
      };
    }, []);
  };
  var RemoveScrollBar = function(_a) {
    var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
    useLockAttribute();
    var gap = reactExports.useMemo(function() {
      return getGapWidth(gapMode);
    }, [
      gapMode
    ]);
    return reactExports.createElement(Style, {
      styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "")
    });
  };
  var passiveSupported = false;
  if (typeof window !== "undefined") {
    try {
      var options = Object.defineProperty({}, "passive", {
        get: function() {
          passiveSupported = true;
          return true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (err) {
      passiveSupported = false;
    }
  }
  var nonPassive = passiveSupported ? {
    passive: false
  } : false;
  var alwaysContainsScroll = function(node) {
    return node.tagName === "TEXTAREA";
  };
  var elementCanBeScrolled = function(node, overflow) {
    if (!(node instanceof Element)) {
      return false;
    }
    var styles = window.getComputedStyle(node);
    return styles[overflow] !== "hidden" && !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible");
  };
  var elementCouldBeVScrolled = function(node) {
    return elementCanBeScrolled(node, "overflowY");
  };
  var elementCouldBeHScrolled = function(node) {
    return elementCanBeScrolled(node, "overflowX");
  };
  var locationCouldBeScrolled = function(axis, node) {
    var ownerDocument = node.ownerDocument;
    var current = node;
    do {
      if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
        current = current.host;
      }
      var isScrollable = elementCouldBeScrolled(axis, current);
      if (isScrollable) {
        var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
        if (scrollHeight > clientHeight) {
          return true;
        }
      }
      current = current.parentNode;
    } while (current && current !== ownerDocument.body);
    return false;
  };
  var getVScrollVariables = function(_a) {
    var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
    return [
      scrollTop,
      scrollHeight,
      clientHeight
    ];
  };
  var getHScrollVariables = function(_a) {
    var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
    return [
      scrollLeft,
      scrollWidth,
      clientWidth
    ];
  };
  var elementCouldBeScrolled = function(axis, node) {
    return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
  };
  var getScrollVariables = function(axis, node) {
    return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
  };
  var getDirectionFactor = function(axis, direction) {
    return axis === "h" && direction === "rtl" ? -1 : 1;
  };
  var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
      var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
      var elementScroll = scroll_1 - capacity - directionFactor * position;
      if (position || elementScroll) {
        if (elementCouldBeScrolled(axis, target)) {
          availableScroll += elementScroll;
          availableScrollTop += position;
        }
      }
      if (target instanceof ShadowRoot) {
        target = target.host;
      } else {
        target = target.parentNode;
      }
    } while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
    if (isDeltaPositive && (Math.abs(availableScroll) < 1 || !noOverscroll)) {
      shouldCancelScroll = true;
    } else if (!isDeltaPositive && (Math.abs(availableScrollTop) < 1 || !noOverscroll)) {
      shouldCancelScroll = true;
    }
    return shouldCancelScroll;
  };
  var getTouchXY = function(event) {
    return "changedTouches" in event ? [
      event.changedTouches[0].clientX,
      event.changedTouches[0].clientY
    ] : [
      0,
      0
    ];
  };
  var getDeltaXY = function(event) {
    return [
      event.deltaX,
      event.deltaY
    ];
  };
  var extractRef = function(ref) {
    return ref && "current" in ref ? ref.current : ref;
  };
  var deltaCompare = function(x, y) {
    return x[0] === y[0] && x[1] === y[1];
  };
  var generateStyle = function(id) {
    return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
  };
  var idCounter = 0;
  var lockStack = [];
  function RemoveScrollSideCar(props) {
    var shouldPreventQueue = reactExports.useRef([]);
    var touchStartRef = reactExports.useRef([
      0,
      0
    ]);
    var activeAxis = reactExports.useRef();
    var id = reactExports.useState(idCounter++)[0];
    var Style2 = reactExports.useState(styleSingleton)[0];
    var lastProps = reactExports.useRef(props);
    reactExports.useEffect(function() {
      lastProps.current = props;
    }, [
      props
    ]);
    reactExports.useEffect(function() {
      if (props.inert) {
        document.body.classList.add("block-interactivity-".concat(id));
        var allow_1 = __spreadArray([
          props.lockRef.current
        ], (props.shards || []).map(extractRef), true).filter(Boolean);
        allow_1.forEach(function(el) {
          return el.classList.add("allow-interactivity-".concat(id));
        });
        return function() {
          document.body.classList.remove("block-interactivity-".concat(id));
          allow_1.forEach(function(el) {
            return el.classList.remove("allow-interactivity-".concat(id));
          });
        };
      }
      return;
    }, [
      props.inert,
      props.lockRef.current,
      props.shards
    ]);
    var shouldCancelEvent = reactExports.useCallback(function(event, parent) {
      if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
        return !lastProps.current.allowPinchZoom;
      }
      var touch = getTouchXY(event);
      var touchStart = touchStartRef.current;
      var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
      var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
      var currentAxis;
      var target = event.target;
      var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
      if ("touches" in event && moveDirection === "h" && target.type === "range") {
        return false;
      }
      var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
      if (!canBeScrolledInMainDirection) {
        return true;
      }
      if (canBeScrolledInMainDirection) {
        currentAxis = moveDirection;
      } else {
        currentAxis = moveDirection === "v" ? "h" : "v";
        canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
      }
      if (!canBeScrolledInMainDirection) {
        return false;
      }
      if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
        activeAxis.current = currentAxis;
      }
      if (!currentAxis) {
        return true;
      }
      var cancelingAxis = activeAxis.current || currentAxis;
      return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
    }, []);
    var shouldPrevent = reactExports.useCallback(function(_event) {
      var event = _event;
      if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
        return;
      }
      var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
      var sourceEvent = shouldPreventQueue.current.filter(function(e) {
        return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
      })[0];
      if (sourceEvent && sourceEvent.should) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }
      if (!sourceEvent) {
        var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
          return node.contains(event.target);
        });
        var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
        if (shouldStop) {
          if (event.cancelable) {
            event.preventDefault();
          }
        }
      }
    }, []);
    var shouldCancel = reactExports.useCallback(function(name, delta, target, should) {
      var event = {
        name,
        delta,
        target,
        should,
        shadowParent: getOutermostShadowParent(target)
      };
      shouldPreventQueue.current.push(event);
      setTimeout(function() {
        shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
          return e !== event;
        });
      }, 1);
    }, []);
    var scrollTouchStart = reactExports.useCallback(function(event) {
      touchStartRef.current = getTouchXY(event);
      activeAxis.current = void 0;
    }, []);
    var scrollWheel = reactExports.useCallback(function(event) {
      shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = reactExports.useCallback(function(event) {
      shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    reactExports.useEffect(function() {
      lockStack.push(Style2);
      props.setCallbacks({
        onScrollCapture: scrollWheel,
        onWheelCapture: scrollWheel,
        onTouchMoveCapture: scrollTouchMove
      });
      document.addEventListener("wheel", shouldPrevent, nonPassive);
      document.addEventListener("touchmove", shouldPrevent, nonPassive);
      document.addEventListener("touchstart", scrollTouchStart, nonPassive);
      return function() {
        lockStack = lockStack.filter(function(inst) {
          return inst !== Style2;
        });
        document.removeEventListener("wheel", shouldPrevent, nonPassive);
        document.removeEventListener("touchmove", shouldPrevent, nonPassive);
        document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
      };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return reactExports.createElement(reactExports.Fragment, null, inert ? reactExports.createElement(Style2, {
      styles: generateStyle(id)
    }) : null, removeScrollBar ? reactExports.createElement(RemoveScrollBar, {
      gapMode: props.gapMode
    }) : null);
  }
  function getOutermostShadowParent(node) {
    var shadowParent = null;
    while (node !== null) {
      if (node instanceof ShadowRoot) {
        shadowParent = node.host;
        node = node.host;
      }
      node = node.parentNode;
    }
    return shadowParent;
  }
  const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
  ReactRemoveScroll = reactExports.forwardRef(function(props, ref) {
    return reactExports.createElement(RemoveScroll, __assign({}, props, {
      ref,
      sideCar: SideCar
    }));
  });
  ReactRemoveScroll.classNames = RemoveScroll.classNames;
  var getDefaultParent = function(originalTarget) {
    if (typeof document === "undefined") {
      return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
  };
  var counterMap = /* @__PURE__ */ new WeakMap();
  var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
  var markerMap = {};
  var lockCount = 0;
  var unwrapHost = function(node) {
    return node && (node.host || unwrapHost(node.parentNode));
  };
  var correctTargets = function(parent, targets) {
    return targets.map(function(target) {
      if (parent.contains(target)) {
        return target;
      }
      var correctedTarget = unwrapHost(target);
      if (correctedTarget && parent.contains(correctedTarget)) {
        return correctedTarget;
      }
      console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
      return null;
    }).filter(function(x) {
      return Boolean(x);
    });
  };
  var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [
      originalTarget
    ]);
    if (!markerMap[markerName]) {
      markerMap[markerName] = /* @__PURE__ */ new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = /* @__PURE__ */ new Set();
    var elementsToStop = new Set(targets);
    var keep = function(el) {
      if (!el || elementsToKeep.has(el)) {
        return;
      }
      elementsToKeep.add(el);
      keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function(parent) {
      if (!parent || elementsToStop.has(parent)) {
        return;
      }
      Array.prototype.forEach.call(parent.children, function(node) {
        if (elementsToKeep.has(node)) {
          deep(node);
        } else {
          try {
            var attr = node.getAttribute(controlAttribute);
            var alreadyHidden = attr !== null && attr !== "false";
            var counterValue = (counterMap.get(node) || 0) + 1;
            var markerValue = (markerCounter.get(node) || 0) + 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            hiddenNodes.push(node);
            if (counterValue === 1 && alreadyHidden) {
              uncontrolledNodes.set(node, true);
            }
            if (markerValue === 1) {
              node.setAttribute(markerName, "true");
            }
            if (!alreadyHidden) {
              node.setAttribute(controlAttribute, "true");
            }
          } catch (e) {
            console.error("aria-hidden: cannot operate on ", node, e);
          }
        }
      });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function() {
      hiddenNodes.forEach(function(node) {
        var counterValue = counterMap.get(node) - 1;
        var markerValue = markerCounter.get(node) - 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        if (!counterValue) {
          if (!uncontrolledNodes.has(node)) {
            node.removeAttribute(controlAttribute);
          }
          uncontrolledNodes.delete(node);
        }
        if (!markerValue) {
          node.removeAttribute(markerName);
        }
      });
      lockCount--;
      if (!lockCount) {
        counterMap = /* @__PURE__ */ new WeakMap();
        counterMap = /* @__PURE__ */ new WeakMap();
        uncontrolledNodes = /* @__PURE__ */ new WeakMap();
        markerMap = {};
      }
    };
  };
  hideOthers = function(originalTarget, parentNode, markerName) {
    if (markerName === void 0) {
      markerName = "data-aria-hidden";
    }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [
      originalTarget
    ]);
    var activeParentNode = getDefaultParent(originalTarget);
    if (!activeParentNode) {
      return function() {
        return null;
      };
    }
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live]")));
    return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
  };
  var DIALOG_NAME = "Dialog";
  var [createDialogContext, createDialogScope] = createContextScope$2(DIALOG_NAME);
  var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
  var Dialog$1 = (props) => {
    const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
    const triggerRef = reactExports.useRef(null);
    const contentRef = reactExports.useRef(null);
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange
    });
    return jsxRuntimeExports.jsx(DialogProvider, {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [
        setOpen
      ]),
      modal,
      children
    });
  };
  Dialog$1.displayName = DIALOG_NAME;
  var TRIGGER_NAME$3 = "DialogTrigger";
  var DialogTrigger = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME$3, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return jsxRuntimeExports.jsx(Primitive.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": context.open,
      "aria-controls": context.contentId,
      "data-state": getState(context.open),
      ...triggerProps,
      ref: composedTriggerRef,
      onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
    });
  });
  DialogTrigger.displayName = TRIGGER_NAME$3;
  var PORTAL_NAME$4 = "DialogPortal";
  var [PortalProvider$2, usePortalContext$2] = createDialogContext(PORTAL_NAME$4, {
    forceMount: void 0
  });
  var DialogPortal$1 = (props) => {
    const { __scopeDialog, forceMount, children, container } = props;
    const context = useDialogContext(PORTAL_NAME$4, __scopeDialog);
    return jsxRuntimeExports.jsx(PortalProvider$2, {
      scope: __scopeDialog,
      forceMount,
      children: reactExports.Children.map(children, (child) => jsxRuntimeExports.jsx(Presence, {
        present: forceMount || context.open,
        children: jsxRuntimeExports.jsx(Portal$3, {
          asChild: true,
          container,
          children: child
        })
      }))
    });
  };
  DialogPortal$1.displayName = PORTAL_NAME$4;
  var OVERLAY_NAME$1 = "DialogOverlay";
  var DialogOverlay$1 = reactExports.forwardRef((props, forwardedRef) => {
    const portalContext = usePortalContext$2(OVERLAY_NAME$1, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME$1, props.__scopeDialog);
    return context.modal ? jsxRuntimeExports.jsx(Presence, {
      present: forceMount || context.open,
      children: jsxRuntimeExports.jsx(DialogOverlayImpl, {
        ...overlayProps,
        ref: forwardedRef
      })
    }) : null;
  });
  DialogOverlay$1.displayName = OVERLAY_NAME$1;
  var DialogOverlayImpl = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME$1, __scopeDialog);
    return jsxRuntimeExports.jsx(ReactRemoveScroll, {
      as: Slot,
      allowPinchZoom: true,
      shards: [
        context.contentRef
      ],
      children: jsxRuntimeExports.jsx(Primitive.div, {
        "data-state": getState(context.open),
        ...overlayProps,
        ref: forwardedRef,
        style: {
          pointerEvents: "auto",
          ...overlayProps.style
        }
      })
    });
  });
  var CONTENT_NAME$5 = "DialogContent";
  var DialogContent$1 = reactExports.forwardRef((props, forwardedRef) => {
    const portalContext = usePortalContext$2(CONTENT_NAME$5, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$5, props.__scopeDialog);
    return jsxRuntimeExports.jsx(Presence, {
      present: forceMount || context.open,
      children: context.modal ? jsxRuntimeExports.jsx(DialogContentModal, {
        ...contentProps,
        ref: forwardedRef
      }) : jsxRuntimeExports.jsx(DialogContentNonModal, {
        ...contentProps,
        ref: forwardedRef
      })
    });
  });
  DialogContent$1.displayName = CONTENT_NAME$5;
  var DialogContentModal = reactExports.forwardRef((props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$5, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return jsxRuntimeExports.jsx(DialogContentImpl, {
      ...props,
      ref: composedRefs,
      trapFocus: context.open,
      disableOutsidePointerEvents: true,
      onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
        var _a;
        event.preventDefault();
        (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
      }),
      onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
        const originalEvent = event.detail.originalEvent;
        const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
        if (isRightClick) event.preventDefault();
      }),
      onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault())
    });
  });
  var DialogContentNonModal = reactExports.forwardRef((props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$5, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return jsxRuntimeExports.jsx(DialogContentImpl, {
      ...props,
      ref: forwardedRef,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (event) => {
        var _a, _b;
        (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented) {
          if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
          event.preventDefault();
        }
        hasInteractedOutsideRef.current = false;
        hasPointerDownOutsideRef.current = false;
      },
      onInteractOutside: (event) => {
        var _a, _b;
        (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented) {
          hasInteractedOutsideRef.current = true;
          if (event.detail.originalEvent.type === "pointerdown") {
            hasPointerDownOutsideRef.current = true;
          }
        }
        const target = event.target;
        const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
        if (targetIsTrigger) event.preventDefault();
        if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
          event.preventDefault();
        }
      }
    });
  });
  var DialogContentImpl = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$5, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        jsxRuntimeExports.jsx(FocusScope, {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: jsxRuntimeExports.jsx(DismissableLayer, {
            role: "dialog",
            id: context.contentId,
            "aria-describedby": context.descriptionId,
            "aria-labelledby": context.titleId,
            "data-state": getState(context.open),
            ...contentProps,
            ref: composedRefs,
            onDismiss: () => context.onOpenChange(false)
          })
        }),
        jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
          children: [
            jsxRuntimeExports.jsx(TitleWarning, {
              titleId: context.titleId
            }),
            jsxRuntimeExports.jsx(DescriptionWarning$1, {
              contentRef,
              descriptionId: context.descriptionId
            })
          ]
        })
      ]
    });
  });
  var TITLE_NAME$1 = "DialogTitle";
  var DialogTitle$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME$1, __scopeDialog);
    return jsxRuntimeExports.jsx(Primitive.h2, {
      id: context.titleId,
      ...titleProps,
      ref: forwardedRef
    });
  });
  DialogTitle$1.displayName = TITLE_NAME$1;
  var DESCRIPTION_NAME$1 = "DialogDescription";
  var DialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME$1, __scopeDialog);
    return jsxRuntimeExports.jsx(Primitive.p, {
      id: context.descriptionId,
      ...descriptionProps,
      ref: forwardedRef
    });
  });
  DialogDescription$1.displayName = DESCRIPTION_NAME$1;
  var CLOSE_NAME = "DialogClose";
  var DialogClose = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return jsxRuntimeExports.jsx(Primitive.button, {
      type: "button",
      ...closeProps,
      ref: forwardedRef,
      onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
    });
  });
  DialogClose.displayName = CLOSE_NAME;
  function getState(open) {
    return open ? "open" : "closed";
  }
  var TITLE_WARNING_NAME = "DialogTitleWarning";
  var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
    contentName: CONTENT_NAME$5,
    titleName: TITLE_NAME$1,
    docsSlug: "dialog"
  });
  var TitleWarning = ({ titleId }) => {
    const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
    const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
    reactExports.useEffect(() => {
      if (titleId) {
        const hasTitle = document.getElementById(titleId);
        if (!hasTitle) console.error(MESSAGE);
      }
    }, [
      MESSAGE,
      titleId
    ]);
    return null;
  };
  var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
  var DescriptionWarning$1 = ({ contentRef, descriptionId }) => {
    const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
    const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
    reactExports.useEffect(() => {
      var _a;
      const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
      if (descriptionId && describedById) {
        const hasDescription = document.getElementById(descriptionId);
        if (!hasDescription) console.warn(MESSAGE);
      }
    }, [
      MESSAGE,
      contentRef,
      descriptionId
    ]);
    return null;
  };
  Root$3 = Dialog$1;
  var Trigger$2 = DialogTrigger;
  Portal$2 = DialogPortal$1;
  Overlay = DialogOverlay$1;
  Content$1 = DialogContent$1;
  Title = DialogTitle$1;
  Description = DialogDescription$1;
  Close = DialogClose;
  const Sheet = Root$3;
  const SheetPortal = Portal$2;
  const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Overlay, {
    className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
    ...props,
    ref
  }));
  SheetOverlay.displayName = Overlay.displayName;
  const sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  });
  const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => jsxRuntimeExports.jsxs(SheetPortal, {
    children: [
      jsxRuntimeExports.jsx(SheetOverlay, {}),
      jsxRuntimeExports.jsxs(Content$1, {
        ref,
        className: cn(sheetVariants({
          side
        }), className),
        ...props,
        children: [
          children,
          jsxRuntimeExports.jsxs(Close, {
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
            children: [
              jsxRuntimeExports.jsx(LazyIcon, {
                name: "x",
                className: "h-4 w-4"
              }),
              jsxRuntimeExports.jsx("span", {
                className: "sr-only",
                children: "Close"
              })
            ]
          })
        ]
      })
    ]
  }));
  SheetContent.displayName = Content$1.displayName;
  const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Title, {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }));
  SheetTitle.displayName = Title.displayName;
  const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Description, {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }));
  SheetDescription.displayName = Description.displayName;
  function Skeleton({ className, ...props }) {
    return jsxRuntimeExports.jsx("div", {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    });
  }
  const sides = [
    "top",
    "right",
    "bottom",
    "left"
  ];
  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createCoords = (v) => ({
    x: v,
    y: v
  });
  const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  const oppositeAlignmentMap = {
    start: "end",
    end: "start"
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  function getSideAxis(placement) {
    return [
      "top",
      "bottom"
    ].includes(getSide(placement)) ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [
      mainAlignmentSide,
      getOppositePlacement(mainAlignmentSide)
    ];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [
      getOppositeAlignmentPlacement(placement),
      oppositePlacement,
      getOppositeAlignmentPlacement(oppositePlacement)
    ];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
  }
  function getSideList(side, isStart, rtl) {
    const lr = [
      "left",
      "right"
    ];
    const rl = [
      "right",
      "left"
    ];
    const tb = [
      "top",
      "bottom"
    ];
    const bt = [
      "bottom",
      "top"
    ];
    switch (side) {
      case "top":
      case "bottom":
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case "left":
      case "right":
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const { x, y, width, height } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let { reference, floating } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case "start":
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case "end":
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }
  const computePosition$1 = async (reference, floating, config) => {
    const { placement = "bottom", strategy = "absolute", middleware = [], platform: platform2 } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const { name, fn } = validMiddleware[i];
      const { x: nextX, y: nextY, data: data2, reset } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platform2,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data2
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  async function detectOverflow(state, options2) {
    var _await$platform$isEle;
    if (options2 === void 0) {
      options2 = {};
    }
    const { x, y, platform: platform2, rects, elements, strategy } = state;
    const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options2, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  const arrow$3 = (options2) => ({
    name: "arrow",
    options: options2,
    async fn(state) {
      const { x, y, placement, rects, platform: platform2, elements, middlewareData } = state;
      const { element, padding = 0 } = evaluate(options2, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getPaddingObject(padding);
      const coords = {
        x,
        y
      };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = await platform2.getDimensions(element);
      const isYAxis = axis === "y";
      const minProp = isYAxis ? "top" : "left";
      const maxProp = isYAxis ? "bottom" : "right";
      const clientProp = isYAxis ? "clientHeight" : "clientWidth";
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
      if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
      const min$1 = minPadding;
      const max2 = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset2 = clamp(min$1, center, max2);
      const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: offset2,
          centerOffset: center - offset2 - alignmentOffset,
          ...shouldAddOffset && {
            alignmentOffset
          }
        },
        reset: shouldAddOffset
      };
    }
  });
  const flip$2 = function(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    return {
      name: "flip",
      options: options2,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const { placement, middlewareData, rects, initialPlacement, platform: platform2, elements } = state;
        const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options2, state);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [
          getOppositePlacement(initialPlacement)
        ] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [
          initialPlacement,
          ...fallbackPlacements
        ];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [
          ...overflowsData,
          {
            placement,
            overflows
          }
        ];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis || currentSideAxis === "y";
                  }
                  return true;
                }).map((d) => [
                  d.placement,
                  d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)
                ]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  function isAnySideFullyClipped(overflow) {
    return sides.some((side) => overflow[side] >= 0);
  }
  const hide$2 = function(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    return {
      name: "hide",
      options: options2,
      async fn(state) {
        const { rects } = state;
        const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options2, state);
        switch (strategy) {
          case "referenceHidden": {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: "reference"
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case "escaped": {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default: {
            return {};
          }
        }
      }
    };
  };
  async function convertValueToCoords(state, options2) {
    const { placement, platform: platform2, elements } = state;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = [
      "left",
      "top"
    ].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options2, state);
    let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  const offset$2 = function(options2) {
    if (options2 === void 0) {
      options2 = 0;
    }
    return {
      name: "offset",
      options: options2,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const { x, y, placement, middlewareData } = state;
        const diffCoords = await convertValueToCoords(state, options2);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };
  const shift$2 = function(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    return {
      name: "shift",
      options: options2,
      async fn(state) {
        const { x, y, placement } = state;
        const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = {
          fn: (_ref) => {
            let { x: x2, y: y2 } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        }, ...detectOverflowOptions } = evaluate(options2, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === "y" ? "top" : "left";
          const maxSide = mainAxis === "y" ? "bottom" : "right";
          const min2 = mainAxisCoord + overflow[minSide];
          const max2 = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min2, mainAxisCoord, max2);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === "y" ? "top" : "left";
          const maxSide = crossAxis === "y" ? "bottom" : "right";
          const min2 = crossAxisCoord + overflow[minSide];
          const max2 = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min2, crossAxisCoord, max2);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }
    };
  };
  const limitShift$2 = function(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    return {
      options: options2,
      fn(state) {
        const { x, y, placement, rects, middlewareData } = state;
        const { offset: offset2 = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options2, state);
        const coords = {
          x,
          y
        };
        const crossAxis = getSideAxis(placement);
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = evaluate(offset2, state);
        const computedOffset = typeof rawOffset === "number" ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...rawOffset
        };
        if (checkMainAxis) {
          const len = mainAxis === "y" ? "height" : "width";
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          const len = mainAxis === "y" ? "width" : "height";
          const isOriginSide = [
            "top",
            "left"
          ].includes(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
    };
  };
  const size$2 = function(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    return {
      name: "size",
      options: options2,
      async fn(state) {
        const { placement, rects, platform: platform2, elements } = state;
        const { apply = () => {
        }, ...detectOverflowOptions } = evaluate(options2, state);
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isYAxis = getSideAxis(placement) === "y";
        const { width, height } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === "top" || side === "bottom") {
          heightSide = side;
          widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
        } else {
          widthSide = side;
          heightSide = alignment === "end" ? "top" : "bottom";
        }
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        const maximumClippingWidth = width - overflow.left - overflow.right;
        const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
        const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if (isYAxis) {
          availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
        } else {
          availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isYAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform2.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && ![
      "inline",
      "contents"
    ].includes(display);
  }
  function isTableElement(element) {
    return [
      "table",
      "td",
      "th"
    ].includes(getNodeName(element));
  }
  function isTopLayer(element) {
    return [
      ":popover-open",
      ":modal"
    ].some((selector) => {
      try {
        return element.matches(selector);
      } catch (e) {
        return false;
      }
    });
  }
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
    return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || [
      "transform",
      "perspective",
      "filter"
    ].some((value) => (css.willChange || "").includes(value)) || [
      "paint",
      "layout",
      "strict",
      "content"
    ].some((value) => (css.contain || "").includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === "undefined" || !CSS.supports) return false;
    return CSS.supports("-webkit-backdrop-filter", "none");
  }
  function isLastTraversableNode(node) {
    return [
      "html",
      "body",
      "#document"
    ].includes(getNodeName(node));
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }
  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const { width, height, $ } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;
    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }
  const noOffsets = createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle$1(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let { elements, rect, offsetParent, strategy } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
  }
  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }
  function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === "rtl") {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport") {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        ...clippingAncestor,
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === "fixed") {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && [
        "absolute",
        "fixed"
      ].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let { element, boundary, rootBoundary, strategy } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [
      ...elementClippingAncestors,
      rootBoundary
    ];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }
  function getDimensions(element) {
    const { width, height } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    const x = rect.left + scroll.scrollLeft - offsets.x;
    const y = rect.top + scroll.scrollTop - offsets.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element) {
    return getComputedStyle$1(element).position === "static";
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    return element.offsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }
  const getElementRects = async function(data2) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data2.floating);
    return {
      reference: getRectRelativeToOffsetParent(data2.reference, await getOffsetParentFn(data2.floating), data2.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };
  function isRTL(element) {
    return getComputedStyle$1(element).direction === "rtl";
  }
  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const { left, top, width, height } = element.getBoundingClientRect();
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options2 = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 1e3);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options2,
          root: root.ownerDocument
        });
      } catch (e) {
        io = new IntersectionObserver(handleObserve, options2);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }
  autoUpdate = function(reference, floating, update, options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options2;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [
      ...referenceEl ? getOverflowAncestors(referenceEl) : [],
      ...getOverflowAncestors(floating)
    ] : [];
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.addEventListener("scroll", update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener("resize", update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver((_ref) => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      var _resizeObserver2;
      ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.removeEventListener("scroll", update);
        ancestorResize && ancestor.removeEventListener("resize", update);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  };
  offset$1 = offset$2;
  shift$1 = shift$2;
  flip$1 = flip$2;
  size$1 = size$2;
  const hide$1 = hide$2;
  arrow$2 = arrow$3;
  limitShift$1 = limitShift$2;
  computePosition = (reference, floating, options2) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = {
      platform,
      ...options2
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };
  var index = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (typeof a === "function" && a.toString() === b.toString()) {
      return true;
    }
    let length;
    let i;
    let keys;
    if (a && b && typeof a === "object") {
      if (Array.isArray(a)) {
        length = a.length;
        if (length !== b.length) return false;
        for (i = length; i-- !== 0; ) {
          if (!deepEqual(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (!{}.hasOwnProperty.call(b, keys[i])) {
          return false;
        }
      }
      for (i = length; i-- !== 0; ) {
        const key = keys[i];
        if (key === "_owner" && a.$$typeof) {
          continue;
        }
        if (!deepEqual(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    return a !== a && b !== b;
  }
  function getDPR(element) {
    if (typeof window === "undefined") {
      return 1;
    }
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }
  function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
  }
  function useLatestRef(value) {
    const ref = reactExports.useRef(value);
    index(() => {
      ref.current = value;
    });
    return ref;
  }
  function useFloating(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    const { placement = "bottom", strategy = "absolute", middleware = [], platform: platform2, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options2;
    const [data2, setData] = reactExports.useState({
      x: 0,
      y: 0,
      strategy,
      placement,
      middlewareData: {},
      isPositioned: false
    });
    const [latestMiddleware, setLatestMiddleware] = reactExports.useState(middleware);
    if (!deepEqual(latestMiddleware, middleware)) {
      setLatestMiddleware(middleware);
    }
    const [_reference, _setReference] = reactExports.useState(null);
    const [_floating, _setFloating] = reactExports.useState(null);
    const setReference = reactExports.useCallback((node) => {
      if (node !== referenceRef.current) {
        referenceRef.current = node;
        _setReference(node);
      }
    }, []);
    const setFloating = reactExports.useCallback((node) => {
      if (node !== floatingRef.current) {
        floatingRef.current = node;
        _setFloating(node);
      }
    }, []);
    const referenceEl = externalReference || _reference;
    const floatingEl = externalFloating || _floating;
    const referenceRef = reactExports.useRef(null);
    const floatingRef = reactExports.useRef(null);
    const dataRef = reactExports.useRef(data2);
    const hasWhileElementsMounted = whileElementsMounted != null;
    const whileElementsMountedRef = useLatestRef(whileElementsMounted);
    const platformRef = useLatestRef(platform2);
    const update = reactExports.useCallback(() => {
      if (!referenceRef.current || !floatingRef.current) {
        return;
      }
      const config = {
        placement,
        strategy,
        middleware: latestMiddleware
      };
      if (platformRef.current) {
        config.platform = platformRef.current;
      }
      computePosition(referenceRef.current, floatingRef.current, config).then((data3) => {
        const fullData = {
          ...data3,
          isPositioned: true
        };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          reactDomExports.flushSync(() => {
            setData(fullData);
          });
        }
      });
    }, [
      latestMiddleware,
      placement,
      strategy,
      platformRef
    ]);
    index(() => {
      if (open === false && dataRef.current.isPositioned) {
        dataRef.current.isPositioned = false;
        setData((data3) => ({
          ...data3,
          isPositioned: false
        }));
      }
    }, [
      open
    ]);
    const isMountedRef = reactExports.useRef(false);
    index(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    index(() => {
      if (referenceEl) referenceRef.current = referenceEl;
      if (floatingEl) floatingRef.current = floatingEl;
      if (referenceEl && floatingEl) {
        if (whileElementsMountedRef.current) {
          return whileElementsMountedRef.current(referenceEl, floatingEl, update);
        }
        update();
      }
    }, [
      referenceEl,
      floatingEl,
      update,
      whileElementsMountedRef,
      hasWhileElementsMounted
    ]);
    const refs = reactExports.useMemo(() => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating
    }), [
      setReference,
      setFloating
    ]);
    const elements = reactExports.useMemo(() => ({
      reference: referenceEl,
      floating: floatingEl
    }), [
      referenceEl,
      floatingEl
    ]);
    const floatingStyles = reactExports.useMemo(() => {
      const initialStyles = {
        position: strategy,
        left: 0,
        top: 0
      };
      if (!elements.floating) {
        return initialStyles;
      }
      const x = roundByDPR(elements.floating, data2.x);
      const y = roundByDPR(elements.floating, data2.y);
      if (transform) {
        return {
          ...initialStyles,
          transform: "translate(" + x + "px, " + y + "px)",
          ...getDPR(elements.floating) >= 1.5 && {
            willChange: "transform"
          }
        };
      }
      return {
        position: strategy,
        left: x,
        top: y
      };
    }, [
      strategy,
      transform,
      elements.floating,
      data2.x,
      data2.y
    ]);
    return reactExports.useMemo(() => ({
      ...data2,
      update,
      refs,
      elements,
      floatingStyles
    }), [
      data2,
      update,
      refs,
      elements,
      floatingStyles
    ]);
  }
  const arrow$1 = (options2) => {
    function isRef(value) {
      return {}.hasOwnProperty.call(value, "current");
    }
    return {
      name: "arrow",
      options: options2,
      fn(state) {
        const { element, padding } = typeof options2 === "function" ? options2(state) : options2;
        if (element && isRef(element)) {
          if (element.current != null) {
            return arrow$2({
              element: element.current,
              padding
            }).fn(state);
          }
          return {};
        }
        if (element) {
          return arrow$2({
            element,
            padding
          }).fn(state);
        }
        return {};
      }
    };
  };
  const offset = (options2, deps) => ({
    ...offset$1(options2),
    options: [
      options2,
      deps
    ]
  });
  const shift = (options2, deps) => ({
    ...shift$1(options2),
    options: [
      options2,
      deps
    ]
  });
  const limitShift = (options2, deps) => ({
    ...limitShift$1(options2),
    options: [
      options2,
      deps
    ]
  });
  const flip = (options2, deps) => ({
    ...flip$1(options2),
    options: [
      options2,
      deps
    ]
  });
  const size = (options2, deps) => ({
    ...size$1(options2),
    options: [
      options2,
      deps
    ]
  });
  const hide = (options2, deps) => ({
    ...hide$1(options2),
    options: [
      options2,
      deps
    ]
  });
  const arrow = (options2, deps) => ({
    ...arrow$1(options2),
    options: [
      options2,
      deps
    ]
  });
  var NAME$1 = "Arrow";
  var Arrow$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, width = 10, height = 5, ...arrowProps } = props;
    return jsxRuntimeExports.jsx(Primitive.svg, {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : jsxRuntimeExports.jsx("polygon", {
        points: "0,0 30,0 15,10"
      })
    });
  });
  Arrow$1.displayName = NAME$1;
  var Root$2 = Arrow$1;
  function createContextScope$1(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
      const BaseContext = reactExports.createContext(defaultContext);
      const index2 = defaultContexts.length;
      defaultContexts = [
        ...defaultContexts,
        defaultContext
      ];
      function Provider2(props) {
        const { scope, children, ...context } = props;
        const Context = (scope == null ? void 0 : scope[scopeName][index2]) || BaseContext;
        const value = reactExports.useMemo(() => context, Object.values(context));
        return jsxRuntimeExports.jsx(Context.Provider, {
          value,
          children
        });
      }
      function useContext2(consumerName, scope) {
        const Context = (scope == null ? void 0 : scope[scopeName][index2]) || BaseContext;
        const context = reactExports.useContext(Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
      }
      Provider2.displayName = rootComponentName + "Provider";
      return [
        Provider2,
        useContext2
      ];
    }
    const createScope = () => {
      const scopeContexts = defaultContexts.map((defaultContext) => {
        return reactExports.createContext(defaultContext);
      });
      return function useScope(scope) {
        const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
        return reactExports.useMemo(() => ({
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts
          }
        }), [
          scope,
          contexts
        ]);
      };
    };
    createScope.scopeName = scopeName;
    return [
      createContext3,
      composeContextScopes$1(createScope, ...createContextScopeDeps)
    ];
  }
  function composeContextScopes$1(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = () => {
      const scopeHooks = scopes.map((createScope2) => ({
        useScope: createScope2(),
        scopeName: createScope2.scopeName
      }));
      return function useComposedScopes(overrideScopes) {
        const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return {
            ...nextScopes2,
            ...currentScope
          };
        }, {});
        return reactExports.useMemo(() => ({
          [`__scope${baseScope.scopeName}`]: nextScopes
        }), [
          nextScopes
        ]);
      };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
  }
  useSize = function(element) {
    const [size2, setSize] = reactExports.useState(void 0);
    useLayoutEffect2(() => {
      if (element) {
        setSize({
          width: element.offsetWidth,
          height: element.offsetHeight
        });
        const resizeObserver = new ResizeObserver((entries) => {
          if (!Array.isArray(entries)) {
            return;
          }
          if (!entries.length) {
            return;
          }
          const entry = entries[0];
          let width;
          let height;
          if ("borderBoxSize" in entry) {
            const borderSizeEntry = entry["borderBoxSize"];
            const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
            width = borderSize["inlineSize"];
            height = borderSize["blockSize"];
          } else {
            width = element.offsetWidth;
            height = element.offsetHeight;
          }
          setSize({
            width,
            height
          });
        });
        resizeObserver.observe(element, {
          box: "border-box"
        });
        return () => resizeObserver.unobserve(element);
      } else {
        setSize(void 0);
      }
    }, [
      element
    ]);
    return size2;
  };
  var POPPER_NAME = "Popper";
  let createPopperContext;
  [createPopperContext, createPopperScope] = createContextScope$1(POPPER_NAME);
  var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
  var Popper = (props) => {
    const { __scopePopper, children } = props;
    const [anchor, setAnchor] = reactExports.useState(null);
    return jsxRuntimeExports.jsx(PopperProvider, {
      scope: __scopePopper,
      anchor,
      onAnchorChange: setAnchor,
      children
    });
  };
  Popper.displayName = POPPER_NAME;
  var ANCHOR_NAME$1 = "PopperAnchor";
  var PopperAnchor = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext(ANCHOR_NAME$1, __scopePopper);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    reactExports.useEffect(() => {
      context.onAnchorChange((virtualRef == null ? void 0 : virtualRef.current) || ref.current);
    });
    return virtualRef ? null : jsxRuntimeExports.jsx(Primitive.div, {
      ...anchorProps,
      ref: composedRefs
    });
  });
  PopperAnchor.displayName = ANCHOR_NAME$1;
  var CONTENT_NAME$4 = "PopperContent";
  var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$4);
  var PopperContent = reactExports.forwardRef((props, forwardedRef) => {
    var _a, _b, _c, _d, _e, _f;
    const { __scopePopper, side = "bottom", sideOffset = 0, align = "center", alignOffset = 0, arrowPadding = 0, avoidCollisions = true, collisionBoundary = [], collisionPadding: collisionPaddingProp = 0, sticky = "partial", hideWhenDetached = false, updatePositionStrategy = "optimized", onPlaced, ...contentProps } = props;
    const context = usePopperContext(CONTENT_NAME$4, __scopePopper);
    const [content, setContent] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [arrow$12, setArrow] = reactExports.useState(null);
    const arrowSize = useSize(arrow$12);
    const arrowWidth = (arrowSize == null ? void 0 : arrowSize.width) ?? 0;
    const arrowHeight = (arrowSize == null ? void 0 : arrowSize.height) ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...collisionPaddingProp
    };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [
      collisionBoundary
    ];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset({
          mainAxis: sideOffset + arrowHeight,
          alignmentAxis: alignOffset
        }),
        avoidCollisions && shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip({
          ...detectOverflowOptions
        }),
        size({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow$12 && arrow({
          element: arrow$12,
          padding: arrowPadding
        }),
        transformOrigin({
          arrowWidth,
          arrowHeight
        }),
        hideWhenDetached && hide({
          strategy: "referenceHidden",
          ...detectOverflowOptions
        })
      ]
    });
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const handlePlaced = useCallbackRef$1(onPlaced);
    useLayoutEffect2(() => {
      if (isPositioned) {
        handlePlaced == null ? void 0 : handlePlaced();
      }
    }, [
      isPositioned,
      handlePlaced
    ]);
    const arrowX = (_a = middlewareData.arrow) == null ? void 0 : _a.x;
    const arrowY = (_b = middlewareData.arrow) == null ? void 0 : _b.y;
    const cannotCenterArrow = ((_c = middlewareData.arrow) == null ? void 0 : _c.centerOffset) !== 0;
    const [contentZIndex, setContentZIndex] = reactExports.useState();
    useLayoutEffect2(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [
      content
    ]);
    return jsxRuntimeExports.jsx("div", {
      ref: refs.setFloating,
      "data-radix-popper-content-wrapper": "",
      style: {
        ...floatingStyles,
        transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: contentZIndex,
        ["--radix-popper-transform-origin"]: [
          (_d = middlewareData.transformOrigin) == null ? void 0 : _d.x,
          (_e = middlewareData.transformOrigin) == null ? void 0 : _e.y
        ].join(" "),
        ...((_f = middlewareData.hide) == null ? void 0 : _f.referenceHidden) && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      },
      dir: props.dir,
      children: jsxRuntimeExports.jsx(PopperContentProvider, {
        scope: __scopePopper,
        placedSide,
        onArrowChange: setArrow,
        arrowX,
        arrowY,
        shouldHideArrow: cannotCenterArrow,
        children: jsxRuntimeExports.jsx(Primitive.div, {
          "data-side": placedSide,
          "data-align": placedAlign,
          ...contentProps,
          ref: composedRefs,
          style: {
            ...contentProps.style,
            animation: !isPositioned ? "none" : void 0
          }
        })
      })
    });
  });
  PopperContent.displayName = CONTENT_NAME$4;
  var ARROW_NAME$3 = "PopperArrow";
  var OPPOSITE_SIDE = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  };
  var PopperArrow = reactExports.forwardRef(function PopperArrow2(props, forwardedRef) {
    const { __scopePopper, ...arrowProps } = props;
    const contentContext = useContentContext(ARROW_NAME$3, __scopePopper);
    const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
    return jsxRuntimeExports.jsx("span", {
      ref: contentContext.onArrowChange,
      style: {
        position: "absolute",
        left: contentContext.arrowX,
        top: contentContext.arrowY,
        [baseSide]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0"
        }[contentContext.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: `rotate(180deg)`,
          left: "translateY(50%) rotate(-90deg) translateX(50%)"
        }[contentContext.placedSide],
        visibility: contentContext.shouldHideArrow ? "hidden" : void 0
      },
      children: jsxRuntimeExports.jsx(Root$2, {
        ...arrowProps,
        ref: forwardedRef,
        style: {
          ...arrowProps.style,
          display: "block"
        }
      })
    });
  });
  PopperArrow.displayName = ARROW_NAME$3;
  function isNotNull(value) {
    return value !== null;
  }
  var transformOrigin = (options2) => ({
    name: "transformOrigin",
    options: options2,
    fn(data2) {
      var _a, _b, _c;
      const { placement, rects, middlewareData } = data2;
      const cannotCenterArrow = ((_a = middlewareData.arrow) == null ? void 0 : _a.centerOffset) !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options2.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options2.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[placedAlign];
      const arrowXCenter = (((_b = middlewareData.arrow) == null ? void 0 : _b.x) ?? 0) + arrowWidth / 2;
      const arrowYCenter = (((_c = middlewareData.arrow) == null ? void 0 : _c.y) ?? 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return {
        data: {
          x,
          y
        }
      };
    }
  });
  function getSideAndAlignFromPlacement(placement) {
    const [side, align = "center"] = placement.split("-");
    return [
      side,
      align
    ];
  }
  Root2$2 = Popper;
  Anchor = PopperAnchor;
  Content = PopperContent;
  Arrow = PopperArrow;
  var [createTooltipContext, createTooltipScope] = createContextScope$2("Tooltip", [
    createPopperScope
  ]);
  var usePopperScope$1 = createPopperScope();
  var PROVIDER_NAME = "TooltipProvider";
  var DEFAULT_DELAY_DURATION = 700;
  var TOOLTIP_OPEN = "tooltip.open";
  var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
  var TooltipProvider$1 = (props) => {
    const { __scopeTooltip, delayDuration = DEFAULT_DELAY_DURATION, skipDelayDuration = 300, disableHoverableContent = false, children } = props;
    const [isOpenDelayed, setIsOpenDelayed] = reactExports.useState(true);
    const isPointerInTransitRef = reactExports.useRef(false);
    const skipDelayTimerRef = reactExports.useRef(0);
    reactExports.useEffect(() => {
      const skipDelayTimer = skipDelayTimerRef.current;
      return () => window.clearTimeout(skipDelayTimer);
    }, []);
    return jsxRuntimeExports.jsx(TooltipProviderContextProvider, {
      scope: __scopeTooltip,
      isOpenDelayed,
      delayDuration,
      onOpen: reactExports.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        setIsOpenDelayed(false);
      }, []),
      onClose: reactExports.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(() => setIsOpenDelayed(true), skipDelayDuration);
      }, [
        skipDelayDuration
      ]),
      isPointerInTransitRef,
      onPointerInTransitChange: reactExports.useCallback((inTransit) => {
        isPointerInTransitRef.current = inTransit;
      }, []),
      disableHoverableContent,
      children
    });
  };
  TooltipProvider$1.displayName = PROVIDER_NAME;
  var TOOLTIP_NAME = "Tooltip";
  var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
  var Tooltip$1 = (props) => {
    const { __scopeTooltip, children, open: openProp, defaultOpen = false, onOpenChange, disableHoverableContent: disableHoverableContentProp, delayDuration: delayDurationProp } = props;
    const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
    const popperScope = usePopperScope$1(__scopeTooltip);
    const [trigger, setTrigger] = reactExports.useState(null);
    const contentId = useId();
    const openTimerRef = reactExports.useRef(0);
    const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
    const delayDuration = delayDurationProp ?? providerContext.delayDuration;
    const wasOpenDelayedRef = reactExports.useRef(false);
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: (open2) => {
        if (open2) {
          providerContext.onOpen();
          document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
        } else {
          providerContext.onClose();
        }
        onOpenChange == null ? void 0 : onOpenChange(open2);
      }
    });
    const stateAttribute = reactExports.useMemo(() => {
      return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
    }, [
      open
    ]);
    const handleOpen = reactExports.useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = 0;
      wasOpenDelayedRef.current = false;
      setOpen(true);
    }, [
      setOpen
    ]);
    const handleClose = reactExports.useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = 0;
      setOpen(false);
    }, [
      setOpen
    ]);
    const handleDelayedOpen = reactExports.useCallback(() => {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = window.setTimeout(() => {
        wasOpenDelayedRef.current = true;
        setOpen(true);
        openTimerRef.current = 0;
      }, delayDuration);
    }, [
      delayDuration,
      setOpen
    ]);
    reactExports.useEffect(() => {
      return () => {
        if (openTimerRef.current) {
          window.clearTimeout(openTimerRef.current);
          openTimerRef.current = 0;
        }
      };
    }, []);
    return jsxRuntimeExports.jsx(Root2$2, {
      ...popperScope,
      children: jsxRuntimeExports.jsx(TooltipContextProvider, {
        scope: __scopeTooltip,
        contentId,
        open,
        stateAttribute,
        trigger,
        onTriggerChange: setTrigger,
        onTriggerEnter: reactExports.useCallback(() => {
          if (providerContext.isOpenDelayed) handleDelayedOpen();
          else handleOpen();
        }, [
          providerContext.isOpenDelayed,
          handleDelayedOpen,
          handleOpen
        ]),
        onTriggerLeave: reactExports.useCallback(() => {
          if (disableHoverableContent) {
            handleClose();
          } else {
            window.clearTimeout(openTimerRef.current);
            openTimerRef.current = 0;
          }
        }, [
          handleClose,
          disableHoverableContent
        ]),
        onOpen: handleOpen,
        onClose: handleClose,
        disableHoverableContent,
        children
      })
    });
  };
  Tooltip$1.displayName = TOOLTIP_NAME;
  var TRIGGER_NAME$2 = "TooltipTrigger";
  var TooltipTrigger$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeTooltip, ...triggerProps } = props;
    const context = useTooltipContext(TRIGGER_NAME$2, __scopeTooltip);
    const providerContext = useTooltipProviderContext(TRIGGER_NAME$2, __scopeTooltip);
    const popperScope = usePopperScope$1(__scopeTooltip);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onTriggerChange);
    const isPointerDownRef = reactExports.useRef(false);
    const hasPointerMoveOpenedRef = reactExports.useRef(false);
    const handlePointerUp = reactExports.useCallback(() => isPointerDownRef.current = false, []);
    reactExports.useEffect(() => {
      return () => document.removeEventListener("pointerup", handlePointerUp);
    }, [
      handlePointerUp
    ]);
    return jsxRuntimeExports.jsx(Anchor, {
      asChild: true,
      ...popperScope,
      children: jsxRuntimeExports.jsx(Primitive.button, {
        "aria-describedby": context.open ? context.contentId : void 0,
        "data-state": context.stateAttribute,
        ...triggerProps,
        ref: composedRefs,
        onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
          if (event.pointerType === "touch") return;
          if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
            context.onTriggerEnter();
            hasPointerMoveOpenedRef.current = true;
          }
        }),
        onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
          context.onTriggerLeave();
          hasPointerMoveOpenedRef.current = false;
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, () => {
          isPointerDownRef.current = true;
          document.addEventListener("pointerup", handlePointerUp, {
            once: true
          });
        }),
        onFocus: composeEventHandlers(props.onFocus, () => {
          if (!isPointerDownRef.current) context.onOpen();
        }),
        onBlur: composeEventHandlers(props.onBlur, context.onClose),
        onClick: composeEventHandlers(props.onClick, context.onClose)
      })
    });
  });
  TooltipTrigger$1.displayName = TRIGGER_NAME$2;
  var PORTAL_NAME$3 = "TooltipPortal";
  var [PortalProvider$1, usePortalContext$1] = createTooltipContext(PORTAL_NAME$3, {
    forceMount: void 0
  });
  var TooltipPortal = (props) => {
    const { __scopeTooltip, forceMount, children, container } = props;
    const context = useTooltipContext(PORTAL_NAME$3, __scopeTooltip);
    return jsxRuntimeExports.jsx(PortalProvider$1, {
      scope: __scopeTooltip,
      forceMount,
      children: jsxRuntimeExports.jsx(Presence, {
        present: forceMount || context.open,
        children: jsxRuntimeExports.jsx(Portal$3, {
          asChild: true,
          container,
          children
        })
      })
    });
  };
  TooltipPortal.displayName = PORTAL_NAME$3;
  var CONTENT_NAME$3 = "TooltipContent";
  var TooltipContent$1 = reactExports.forwardRef((props, forwardedRef) => {
    const portalContext = usePortalContext$1(CONTENT_NAME$3, props.__scopeTooltip);
    const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME$3, props.__scopeTooltip);
    return jsxRuntimeExports.jsx(Presence, {
      present: forceMount || context.open,
      children: context.disableHoverableContent ? jsxRuntimeExports.jsx(TooltipContentImpl, {
        side,
        ...contentProps,
        ref: forwardedRef
      }) : jsxRuntimeExports.jsx(TooltipContentHoverable, {
        side,
        ...contentProps,
        ref: forwardedRef
      })
    });
  });
  var TooltipContentHoverable = reactExports.forwardRef((props, forwardedRef) => {
    const context = useTooltipContext(CONTENT_NAME$3, props.__scopeTooltip);
    const providerContext = useTooltipProviderContext(CONTENT_NAME$3, props.__scopeTooltip);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const [pointerGraceArea, setPointerGraceArea] = reactExports.useState(null);
    const { trigger, onClose } = context;
    const content = ref.current;
    const { onPointerInTransitChange } = providerContext;
    const handleRemoveGraceArea = reactExports.useCallback(() => {
      setPointerGraceArea(null);
      onPointerInTransitChange(false);
    }, [
      onPointerInTransitChange
    ]);
    const handleCreateGraceArea = reactExports.useCallback((event, hoverTarget) => {
      const currentTarget = event.currentTarget;
      const exitPoint = {
        x: event.clientX,
        y: event.clientY
      };
      const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
      const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
      const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
      const graceArea = getHull([
        ...paddedExitPoints,
        ...hoverTargetPoints
      ]);
      setPointerGraceArea(graceArea);
      onPointerInTransitChange(true);
    }, [
      onPointerInTransitChange
    ]);
    reactExports.useEffect(() => {
      return () => handleRemoveGraceArea();
    }, [
      handleRemoveGraceArea
    ]);
    reactExports.useEffect(() => {
      if (trigger && content) {
        const handleTriggerLeave = (event) => handleCreateGraceArea(event, content);
        const handleContentLeave = (event) => handleCreateGraceArea(event, trigger);
        trigger.addEventListener("pointerleave", handleTriggerLeave);
        content.addEventListener("pointerleave", handleContentLeave);
        return () => {
          trigger.removeEventListener("pointerleave", handleTriggerLeave);
          content.removeEventListener("pointerleave", handleContentLeave);
        };
      }
    }, [
      trigger,
      content,
      handleCreateGraceArea,
      handleRemoveGraceArea
    ]);
    reactExports.useEffect(() => {
      if (pointerGraceArea) {
        const handleTrackPointerGrace = (event) => {
          const target = event.target;
          const pointerPosition = {
            x: event.clientX,
            y: event.clientY
          };
          const hasEnteredTarget = (trigger == null ? void 0 : trigger.contains(target)) || (content == null ? void 0 : content.contains(target));
          const isPointerOutsideGraceArea = !isPointInPolygon$1(pointerPosition, pointerGraceArea);
          if (hasEnteredTarget) {
            handleRemoveGraceArea();
          } else if (isPointerOutsideGraceArea) {
            handleRemoveGraceArea();
            onClose();
          }
        };
        document.addEventListener("pointermove", handleTrackPointerGrace);
        return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
      }
    }, [
      trigger,
      content,
      pointerGraceArea,
      onClose,
      handleRemoveGraceArea
    ]);
    return jsxRuntimeExports.jsx(TooltipContentImpl, {
      ...props,
      ref: composedRefs
    });
  });
  var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(TOOLTIP_NAME, {
    isInside: false
  });
  var TooltipContentImpl = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeTooltip, children, "aria-label": ariaLabel, onEscapeKeyDown, onPointerDownOutside, ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME$3, __scopeTooltip);
    const popperScope = usePopperScope$1(__scopeTooltip);
    const { onClose } = context;
    reactExports.useEffect(() => {
      document.addEventListener(TOOLTIP_OPEN, onClose);
      return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
    }, [
      onClose
    ]);
    reactExports.useEffect(() => {
      if (context.trigger) {
        const handleScroll2 = (event) => {
          const target = event.target;
          if (target == null ? void 0 : target.contains(context.trigger)) onClose();
        };
        window.addEventListener("scroll", handleScroll2, {
          capture: true
        });
        return () => window.removeEventListener("scroll", handleScroll2, {
          capture: true
        });
      }
    }, [
      context.trigger,
      onClose
    ]);
    return jsxRuntimeExports.jsx(DismissableLayer, {
      asChild: true,
      disableOutsidePointerEvents: false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside: (event) => event.preventDefault(),
      onDismiss: onClose,
      children: jsxRuntimeExports.jsxs(Content, {
        "data-state": context.stateAttribute,
        ...popperScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...contentProps.style,
          ...{
            "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
          }
        },
        children: [
          jsxRuntimeExports.jsx(Slottable, {
            children
          }),
          jsxRuntimeExports.jsx(VisuallyHiddenContentContextProvider, {
            scope: __scopeTooltip,
            isInside: true,
            children: jsxRuntimeExports.jsx(Root$6, {
              id: context.contentId,
              role: "tooltip",
              children: ariaLabel || children
            })
          })
        ]
      })
    });
  });
  TooltipContent$1.displayName = CONTENT_NAME$3;
  var ARROW_NAME$2 = "TooltipArrow";
  var TooltipArrow = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeTooltip, ...arrowProps } = props;
    const popperScope = usePopperScope$1(__scopeTooltip);
    const visuallyHiddenContentContext = useVisuallyHiddenContentContext(ARROW_NAME$2, __scopeTooltip);
    return visuallyHiddenContentContext.isInside ? null : jsxRuntimeExports.jsx(Arrow, {
      ...popperScope,
      ...arrowProps,
      ref: forwardedRef
    });
  });
  TooltipArrow.displayName = ARROW_NAME$2;
  function getExitSideFromRect(point, rect) {
    const top = Math.abs(rect.top - point.y);
    const bottom = Math.abs(rect.bottom - point.y);
    const right = Math.abs(rect.right - point.x);
    const left = Math.abs(rect.left - point.x);
    switch (Math.min(top, bottom, right, left)) {
      case left:
        return "left";
      case right:
        return "right";
      case top:
        return "top";
      case bottom:
        return "bottom";
      default:
        throw new Error("unreachable");
    }
  }
  function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
    const paddedExitPoints = [];
    switch (exitSide) {
      case "top":
        paddedExitPoints.push({
          x: exitPoint.x - padding,
          y: exitPoint.y + padding
        }, {
          x: exitPoint.x + padding,
          y: exitPoint.y + padding
        });
        break;
      case "bottom":
        paddedExitPoints.push({
          x: exitPoint.x - padding,
          y: exitPoint.y - padding
        }, {
          x: exitPoint.x + padding,
          y: exitPoint.y - padding
        });
        break;
      case "left":
        paddedExitPoints.push({
          x: exitPoint.x + padding,
          y: exitPoint.y - padding
        }, {
          x: exitPoint.x + padding,
          y: exitPoint.y + padding
        });
        break;
      case "right":
        paddedExitPoints.push({
          x: exitPoint.x - padding,
          y: exitPoint.y - padding
        }, {
          x: exitPoint.x - padding,
          y: exitPoint.y + padding
        });
        break;
    }
    return paddedExitPoints;
  }
  function getPointsFromRect(rect) {
    const { top, right, bottom, left } = rect;
    return [
      {
        x: left,
        y: top
      },
      {
        x: right,
        y: top
      },
      {
        x: right,
        y: bottom
      },
      {
        x: left,
        y: bottom
      }
    ];
  }
  function isPointInPolygon$1(point, polygon) {
    const { x, y } = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;
      const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
  function getHull(points) {
    const newPoints = points.slice();
    newPoints.sort((a, b) => {
      if (a.x < b.x) return -1;
      else if (a.x > b.x) return 1;
      else if (a.y < b.y) return -1;
      else if (a.y > b.y) return 1;
      else return 0;
    });
    return getHullPresorted(newPoints);
  }
  function getHullPresorted(points) {
    if (points.length <= 1) return points.slice();
    const upperHull = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      while (upperHull.length >= 2) {
        const q = upperHull[upperHull.length - 1];
        const r = upperHull[upperHull.length - 2];
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
        else break;
      }
      upperHull.push(p);
    }
    upperHull.pop();
    const lowerHull = [];
    for (let i = points.length - 1; i >= 0; i--) {
      const p = points[i];
      while (lowerHull.length >= 2) {
        const q = lowerHull[lowerHull.length - 1];
        const r = lowerHull[lowerHull.length - 2];
        if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
        else break;
      }
      lowerHull.push(p);
    }
    lowerHull.pop();
    if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
      return upperHull;
    } else {
      return upperHull.concat(lowerHull);
    }
  }
  Provider = TooltipProvider$1;
  Root3$1 = Tooltip$1;
  Trigger$1 = TooltipTrigger$1;
  Portal$1 = TooltipPortal;
  Content2$3 = TooltipContent$1;
  TooltipProvider = Provider;
  Tooltip = Root3$1;
  TooltipTrigger = Trigger$1;
  TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => jsxRuntimeExports.jsx(Content2$3, {
    ref,
    sideOffset,
    className: cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
    ...props
  }));
  TooltipContent.displayName = Content2$3.displayName;
  const SIDEBAR_COOKIE_NAME = "sidebar:state";
  const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
  const SIDEBAR_WIDTH = "16rem";
  const SIDEBAR_WIDTH_MOBILE = "18rem";
  const SIDEBAR_WIDTH_ICON = "3rem";
  const SIDEBAR_KEYBOARD_SHORTCUT = "b";
  const SidebarContext = reactExports.createContext(null);
  function useSidebar() {
    const context = reactExports.useContext(SidebarContext);
    if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
  }
  SidebarProvider = reactExports.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = reactExports.useState(false);
    const [_open, _setOpen] = reactExports.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = reactExports.useCallback((value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }, [
      setOpenProp,
      open
    ]);
    const toggleSidebar = reactExports.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [
      isMobile,
      setOpen,
      setOpenMobile
    ]);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [
      toggleSidebar
    ]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = reactExports.useMemo(() => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }), [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    ]);
    return jsxRuntimeExports.jsx(SidebarContext.Provider, {
      value: contextValue,
      children: jsxRuntimeExports.jsx(TooltipProvider, {
        delayDuration: 0,
        children: jsxRuntimeExports.jsx("div", {
          style: {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style
          },
          className: cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className),
          ref,
          ...props,
          children
        })
      })
    });
  });
  SidebarProvider.displayName = "SidebarProvider";
  Sidebar = reactExports.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return jsxRuntimeExports.jsx("div", {
        className: cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className),
        ref,
        ...props,
        children
      });
    }
    if (isMobile) {
      return jsxRuntimeExports.jsx(Sheet, {
        open: openMobile,
        onOpenChange: setOpenMobile,
        ...props,
        children: jsxRuntimeExports.jsx(SheetContent, {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: jsxRuntimeExports.jsx("div", {
            className: "flex h-full w-full flex-col",
            children
          })
        })
      });
    }
    return jsxRuntimeExports.jsxs("div", {
      ref,
      className: "group peer hidden md:block text-sidebar-foreground",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      children: [
        jsxRuntimeExports.jsx("div", {
          className: cn("duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]")
        }),
        jsxRuntimeExports.jsx("div", {
          className: cn("duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
          ...props,
          children: jsxRuntimeExports.jsx("div", {
            "data-sidebar": "sidebar",
            className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
            children
          })
        })
      ]
    });
  });
  Sidebar.displayName = "Sidebar";
  const SidebarTrigger = reactExports.forwardRef(({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return jsxRuntimeExports.jsx(Button, {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      },
      ...props,
      children: jsxRuntimeExports.jsx(LazyIcon, {
        size: 32,
        name: "panel-left"
      })
    });
  });
  SidebarTrigger.displayName = "SidebarTrigger";
  const SidebarRail = reactExports.forwardRef(({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return jsxRuntimeExports.jsx("button", {
      ref,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
      ...props
    });
  });
  SidebarRail.displayName = "SidebarRail";
  SidebarInset = reactExports.forwardRef(({ className, ...props }, ref) => {
    return jsxRuntimeExports.jsx("main", {
      ref,
      className: cn("relative flex min-h-svh flex-1 flex-col bg-background", "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className),
      ...props
    });
  });
  SidebarInset.displayName = "SidebarInset";
  const SidebarInput = reactExports.forwardRef(({ className, ...props }, ref) => {
    return jsxRuntimeExports.jsx(Input, {
      ref,
      "data-sidebar": "input",
      className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
      ...props
    });
  });
  SidebarInput.displayName = "SidebarInput";
  const SidebarHeader = reactExports.forwardRef(({ className, ...props }, ref) => {
    return jsxRuntimeExports.jsx("div", {
      ref,
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    });
  });
  SidebarHeader.displayName = "SidebarHeader";
  const SidebarFooter = reactExports.forwardRef(({ className, ...props }, ref) => {
    return jsxRuntimeExports.jsx("div", {
      ref,
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    });
  });
  SidebarFooter.displayName = "SidebarFooter";
  const SidebarSeparator = reactExports.forwardRef(({ className, ...props }, ref) => {
    return jsxRuntimeExports.jsx(Separator$1, {
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    });
  });
  SidebarSeparator.displayName = "SidebarSeparator";
  SidebarContent = reactExports.forwardRef(({ className, ...props }, ref) => {
    return jsxRuntimeExports.jsx("div", {
      ref,
      "data-sidebar": "content",
      className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
      ...props
    });
  });
  SidebarContent.displayName = "SidebarContent";
  SidebarGroup = reactExports.forwardRef(({ className, ...props }, ref) => {
    return jsxRuntimeExports.jsx("div", {
      ref,
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    });
  });
  SidebarGroup.displayName = "SidebarGroup";
  const SidebarGroupLabel = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return jsxRuntimeExports.jsx(Comp, {
      ref,
      "data-sidebar": "group-label",
      className: cn("duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
      ...props
    });
  });
  SidebarGroupLabel.displayName = "SidebarGroupLabel";
  const SidebarGroupAction = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return jsxRuntimeExports.jsx(Comp, {
      ref,
      "data-sidebar": "group-action",
      className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className),
      ...props
    });
  });
  SidebarGroupAction.displayName = "SidebarGroupAction";
  const SidebarGroupContent = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx("div", {
    ref,
    "data-sidebar": "group-content",
    className: cn("w-full text-sm", className),
    ...props
  }));
  SidebarGroupContent.displayName = "SidebarGroupContent";
  SidebarMenu = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx("ul", {
    ref,
    "data-sidebar": "menu",
    className: cn("flex w-full min-w-0 flex-col gap-1", className),
    ...props
  }));
  SidebarMenu.displayName = "SidebarMenu";
  SidebarMenuItem = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx("li", {
    ref,
    "data-sidebar": "menu-item",
    className: cn("group/menu-item relative", className),
    ...props
  }));
  SidebarMenuItem.displayName = "SidebarMenuItem";
  const sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  });
  SidebarMenuButton = reactExports.forwardRef(({ asChild = false, isActive = false, variant = "default", size: size2 = "default", tooltip, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = jsxRuntimeExports.jsx(Comp, {
      ref,
      "data-sidebar": "menu-button",
      "data-size": size2,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({
        variant,
        size: size2
      }), className),
      ...props
    });
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return jsxRuntimeExports.jsxs(Tooltip, {
      children: [
        jsxRuntimeExports.jsx(TooltipTrigger, {
          asChild: true,
          children: button
        }),
        jsxRuntimeExports.jsx(TooltipContent, {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        })
      ]
    });
  });
  SidebarMenuButton.displayName = "SidebarMenuButton";
  const SidebarMenuAction = reactExports.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return jsxRuntimeExports.jsx(Comp, {
      ref,
      "data-sidebar": "menu-action",
      className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className),
      ...props
    });
  });
  SidebarMenuAction.displayName = "SidebarMenuAction";
  const SidebarMenuBadge = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx("div", {
    ref,
    "data-sidebar": "menu-badge",
    className: cn("absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className),
    ...props
  }));
  SidebarMenuBadge.displayName = "SidebarMenuBadge";
  const SidebarMenuSkeleton = reactExports.forwardRef(({ className, showIcon = false, ...props }, ref) => {
    const width = reactExports.useMemo(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);
    return jsxRuntimeExports.jsxs("div", {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("rounded-md h-8 flex gap-2 px-2 items-center", className),
      ...props,
      children: [
        showIcon && jsxRuntimeExports.jsx(Skeleton, {
          className: "size-4 rounded-md",
          "data-sidebar": "menu-skeleton-icon"
        }),
        jsxRuntimeExports.jsx(Skeleton, {
          className: "h-4 flex-1 max-w-[--skeleton-width]",
          "data-sidebar": "menu-skeleton-text",
          style: {
            "--skeleton-width": width
          }
        })
      ]
    });
  });
  SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
  const SidebarMenuSub = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx("ul", {
    ref,
    "data-sidebar": "menu-sub",
    className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className),
    ...props
  }));
  SidebarMenuSub.displayName = "SidebarMenuSub";
  const SidebarMenuSubItem = reactExports.forwardRef(({ ...props }, ref) => jsxRuntimeExports.jsx("li", {
    ref,
    ...props
  }));
  SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
  const SidebarMenuSubButton = reactExports.forwardRef(({ asChild = false, size: size2 = "md", isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return jsxRuntimeExports.jsx(Comp, {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size2,
      "data-active": isActive,
      className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size2 === "sm" && "text-xs", size2 === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
      ...props
    });
  });
  SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
  function NavDocuments({ items }) {
    const { t } = useTranslation("documents");
    return jsxRuntimeExports.jsxs(SidebarGroup, {
      children: [
        jsxRuntimeExports.jsx(SidebarGroupLabel, {
          children: jsxRuntimeExports.jsx("div", {
            className: "text-sm",
            children: t("title")
          })
        }),
        jsxRuntimeExports.jsx(SidebarMenu, {
          children: items.map((item) => {
            var _a;
            return jsxRuntimeExports.jsx(Collapsible, {
              asChild: true,
              defaultOpen: item.isActive,
              className: "group/collapsible",
              children: jsxRuntimeExports.jsxs(SidebarMenuItem, {
                children: [
                  jsxRuntimeExports.jsx(CollapsibleTrigger, {
                    asChild: true,
                    children: jsxRuntimeExports.jsxs(SidebarMenuButton, {
                      className: "cursor-pointer",
                      tooltip: t(item.title),
                      children: [
                        item.icon,
                        jsxRuntimeExports.jsx("span", {
                          children: t(item.title)
                        }),
                        jsxRuntimeExports.jsx(LazyIcon, {
                          name: "chevron-right",
                          className: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        })
                      ]
                    })
                  }),
                  jsxRuntimeExports.jsx(CollapsibleContent, {
                    children: jsxRuntimeExports.jsx(SidebarMenuSub, {
                      children: (_a = item.items) == null ? void 0 : _a.map((subItem) => jsxRuntimeExports.jsx(SidebarMenuSubItem, {
                        className: "cursor-pointer",
                        children: jsxRuntimeExports.jsx(SidebarMenuSubButton, {
                          asChild: true,
                          children: jsxRuntimeExports.jsx("span", {
                            children: t(subItem.title)
                          })
                        })
                      }, t(subItem.title)))
                    })
                  })
                ]
              })
            }, item.title);
          })
        })
      ]
    });
  }
  const APP_ROUTES = {
    application: "/application/:applicationId?",
    whiteboard: "/whiteboard/:sessionId?"
  };
  const getRouteURL = (route, params) => {
    const url = APP_ROUTES[route];
    if (!params) {
      return url.replace(/\/:[^/]+/g, "");
    }
    return Object.keys(params || {}).reduce((acc, key) => acc.replace(`:${key}`, (params == null ? void 0 : params[key]) || ""), url);
  };
  const SparklesText = reactExports.memo(({ text, colors = {
    first: "#9E7AFF",
    second: "#FE8BBB"
  }, className, sparklesCount = 10, ...props }) => {
    const [sparkles, setSparkles] = reactExports.useState([]);
    reactExports.useEffect(() => {
      const generateStar = () => {
        const starX = `${Math.random() * 100}%`;
        const starY = `${Math.random() * 100}%`;
        const color = Math.random() > 0.5 ? colors.first : colors.second;
        const delay = Math.random() * 2;
        const scale = Math.random() * 1 + 0.3;
        const lifespan = Math.random() * 10 + 5;
        const id = `${starX}-${starY}-${Date.now()}`;
        return {
          id,
          x: starX,
          y: starY,
          color,
          delay,
          scale,
          lifespan
        };
      };
      const initializeStars = () => {
        const newSparkles = Array.from({
          length: sparklesCount
        }, generateStar);
        setSparkles(newSparkles);
      };
      const updateStars = () => {
        setSparkles((currentSparkles) => currentSparkles.map((star) => {
          if (star.lifespan <= 0) {
            return generateStar();
          } else {
            return {
              ...star,
              lifespan: star.lifespan - 0.1
            };
          }
        }));
      };
      initializeStars();
      const interval = setInterval(updateStars, 100);
      return () => clearInterval(interval);
    }, [
      colors.first,
      colors.second
    ]);
    return jsxRuntimeExports.jsx("div", {
      className: cn("text-6xl font-bold", className),
      ...props,
      style: {
        "--sparkles-first-color": `${colors.first}`,
        "--sparkles-second-color": `${colors.second}`
      },
      children: jsxRuntimeExports.jsxs("span", {
        className: "relative inline-block",
        children: [
          sparkles.map((sparkle) => jsxRuntimeExports.jsx(Sparkle, {
            ...sparkle
          }, sparkle.id)),
          jsxRuntimeExports.jsx("strong", {
            children: text
          })
        ]
      })
    });
  }, (pre, next) => pre.text === next.text);
  const Sparkle = ({ id, x, y, color, delay, scale }) => {
    return jsxRuntimeExports.jsx(motion.svg, {
      className: "pointer-events-none absolute z-20",
      initial: {
        opacity: 0,
        left: x,
        top: y
      },
      animate: {
        opacity: [
          0,
          1,
          0
        ],
        scale: [
          0,
          scale,
          0
        ],
        rotate: [
          75,
          120,
          150
        ]
      },
      transition: {
        duration: 0.8,
        repeat: Infinity,
        delay
      },
      width: "21",
      height: "21",
      viewBox: "0 0 21 21",
      children: jsxRuntimeExports.jsx("path", {
        d: "M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z",
        fill: color
      })
    }, id);
  };
  function NewSessionButton({ className, onClick }) {
    const { t } = useTranslation("sidebar");
    return jsxRuntimeExports.jsxs(SidebarMenuButton, {
      className: cn(className, "tw-w-full"),
      onClick,
      children: [
        jsxRuntimeExports.jsx(LazyIcon, {
          name: "frame"
        }),
        jsxRuntimeExports.jsx(SparklesText, {
          text: t("new_session"),
          className: "text-sm",
          sparklesCount: 3
        })
      ]
    });
  }
  const useCreateSession = () => {
    const [loading, setLoading] = reactExports.useState(false);
    const setCurrentSession = useSessionState((state) => state.setCurrentSession);
    const createSessionFuncion = useSessionState((state) => state.createSession);
    const setSelectedSessionId = useAppState((state) => state.setSelectedSessionId);
    const createSession = reactExports.useCallback(async (data2) => {
      try {
        setLoading(true);
        const session = await createSessionFuncion(data2);
        setCurrentSession(session);
        setSelectedSessionId(session.id);
      } finally {
        setLoading(false);
      }
    }, [
      createSessionFuncion,
      setCurrentSession,
      setSelectedSessionId
    ]);
    return {
      loading,
      createSession
    };
  };
  Dialog = Root$3;
  const DialogPortal = Portal$2;
  const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Overlay, {
    ref,
    className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
    ...props
  }));
  DialogOverlay.displayName = Overlay.displayName;
  DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => jsxRuntimeExports.jsxs(DialogPortal, {
    children: [
      jsxRuntimeExports.jsx(DialogOverlay, {}),
      jsxRuntimeExports.jsxs(Content$1, {
        ref,
        className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
        ...props,
        children: [
          children,
          jsxRuntimeExports.jsxs(Close, {
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            children: [
              jsxRuntimeExports.jsx(LazyIcon, {
                name: "x",
                className: "h-4 w-4"
              }),
              jsxRuntimeExports.jsx("span", {
                className: "sr-only",
                children: "Close"
              })
            ]
          })
        ]
      })
    ]
  }));
  DialogContent.displayName = Content$1.displayName;
  DialogHeader = ({ className, ...props }) => jsxRuntimeExports.jsx("div", {
    className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
    ...props
  });
  DialogHeader.displayName = "DialogHeader";
  DialogFooter = ({ className, ...props }) => jsxRuntimeExports.jsx("div", {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  });
  DialogFooter.displayName = "DialogFooter";
  DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Title, {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }));
  DialogTitle.displayName = Title.displayName;
  DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Description, {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }));
  DialogDescription.displayName = Description.displayName;
  var NAME = "Label";
  var Label$2 = reactExports.forwardRef((props, forwardedRef) => {
    return jsxRuntimeExports.jsx(Primitive.label, {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    });
  });
  Label$2.displayName = NAME;
  var Root$1 = Label$2;
  const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
  Label$1 = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Root$1, {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }));
  Label$1.displayName = Root$1.displayName;
  const CreateSessionDialog = create(() => {
    const currentModal = useModal();
    const { t } = useTranslation("dialogs");
    const [name, setName] = reactExports.useState("");
    const { toast } = useToast();
    const { loading, createSession } = useCreateSession();
    const handleChangeName = (e) => {
      setName(e.target.value);
    };
    const handleSubmit = async () => {
      try {
        await createSession({
          name
        });
        currentModal.hide();
      } catch {
        toast({
          variant: "destructive",
          description: t("create_session.errors.create_failed")
        });
      }
    };
    return jsxRuntimeExports.jsx(Dialog, {
      open: currentModal.visible,
      onOpenChange: currentModal.hide,
      children: jsxRuntimeExports.jsxs(DialogContent, {
        className: "sm:max-w-[425px]",
        children: [
          jsxRuntimeExports.jsxs(DialogHeader, {
            children: [
              jsxRuntimeExports.jsx(DialogTitle, {
                children: t("create_session.title")
              }),
              jsxRuntimeExports.jsx(DialogDescription, {
                children: t("create_session.description")
              })
            ]
          }),
          jsxRuntimeExports.jsx("div", {
            className: "grid gap-4 py-4",
            children: jsxRuntimeExports.jsxs("div", {
              className: "flex flex-col space-y-1.5",
              children: [
                jsxRuntimeExports.jsx(Label$1, {
                  className: "mb-2",
                  htmlFor: "name",
                  children: t("create_session.name")
                }),
                jsxRuntimeExports.jsx(Input, {
                  onChange: handleChangeName,
                  id: "name",
                  value: name,
                  placeholder: t("create_session.name_placeholder")
                })
              ]
            })
          }),
          jsxRuntimeExports.jsx(DialogFooter, {
            children: jsxRuntimeExports.jsx(Button, {
              onClick: handleSubmit,
              disabled: loading || !name,
              type: "submit",
              children: t("create_session.create")
            })
          })
        ]
      })
    });
  });
  const useDeleteSession = () => {
    const [loading, setLoading] = reactExports.useState(false);
    const deleteSessionFunc = useSessionState((state) => state.deleteSession);
    const deleteSession = reactExports.useCallback(async (id) => {
      try {
        setLoading(true);
        await deleteSessionFunc(id);
        await Promise.all([
          getRepository("FlowEdge").find({
            select: [
              "id"
            ],
            where: {
              session_id: id
            }
          }).then((edges) => {
            return Promise.all(edges.map((edge) => getRepository("FlowEdge").delete(edge.id)));
          }),
          getRepository("FlowNode").find({
            select: [
              "id"
            ],
            where: {
              session_id: id
            }
          }).then((nodes) => {
            return Promise.all(nodes.map((node) => getRepository("FlowNode").delete(node.id)));
          })
        ]);
      } finally {
        setLoading(false);
      }
    }, [
      deleteSessionFunc
    ]);
    return {
      loading,
      deleteSession
    };
  };
  var ROOT_NAME = "AlertDialog";
  var [createAlertDialogContext, createAlertDialogScope] = createContextScope$2(ROOT_NAME, [
    createDialogScope
  ]);
  var useDialogScope = createDialogScope();
  var AlertDialog$1 = (props) => {
    const { __scopeAlertDialog, ...alertDialogProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return jsxRuntimeExports.jsx(Root$3, {
      ...dialogScope,
      ...alertDialogProps,
      modal: true
    });
  };
  AlertDialog$1.displayName = ROOT_NAME;
  var TRIGGER_NAME$1 = "AlertDialogTrigger";
  var AlertDialogTrigger = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return jsxRuntimeExports.jsx(Trigger$2, {
      ...dialogScope,
      ...triggerProps,
      ref: forwardedRef
    });
  });
  AlertDialogTrigger.displayName = TRIGGER_NAME$1;
  var PORTAL_NAME$2 = "AlertDialogPortal";
  var AlertDialogPortal$1 = (props) => {
    const { __scopeAlertDialog, ...portalProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return jsxRuntimeExports.jsx(Portal$2, {
      ...dialogScope,
      ...portalProps
    });
  };
  AlertDialogPortal$1.displayName = PORTAL_NAME$2;
  var OVERLAY_NAME = "AlertDialogOverlay";
  var AlertDialogOverlay$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return jsxRuntimeExports.jsx(Overlay, {
      ...dialogScope,
      ...overlayProps,
      ref: forwardedRef
    });
  });
  AlertDialogOverlay$1.displayName = OVERLAY_NAME;
  var CONTENT_NAME$2 = "AlertDialogContent";
  var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME$2);
  var AlertDialogContent$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return jsxRuntimeExports.jsx(WarningProvider, {
      contentName: CONTENT_NAME$2,
      titleName: TITLE_NAME,
      docsSlug: "alert-dialog",
      children: jsxRuntimeExports.jsx(AlertDialogContentProvider, {
        scope: __scopeAlertDialog,
        cancelRef,
        children: jsxRuntimeExports.jsxs(Content$1, {
          role: "alertdialog",
          ...dialogScope,
          ...contentProps,
          ref: composedRefs,
          onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
            var _a;
            event.preventDefault();
            (_a = cancelRef.current) == null ? void 0 : _a.focus({
              preventScroll: true
            });
          }),
          onPointerDownOutside: (event) => event.preventDefault(),
          onInteractOutside: (event) => event.preventDefault(),
          children: [
            jsxRuntimeExports.jsx(Slottable, {
              children
            }),
            jsxRuntimeExports.jsx(DescriptionWarning, {
              contentRef
            })
          ]
        })
      })
    });
  });
  AlertDialogContent$1.displayName = CONTENT_NAME$2;
  var TITLE_NAME = "AlertDialogTitle";
  var AlertDialogTitle$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return jsxRuntimeExports.jsx(Title, {
      ...dialogScope,
      ...titleProps,
      ref: forwardedRef
    });
  });
  AlertDialogTitle$1.displayName = TITLE_NAME;
  var DESCRIPTION_NAME = "AlertDialogDescription";
  var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAlertDialog, ...descriptionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return jsxRuntimeExports.jsx(Description, {
      ...dialogScope,
      ...descriptionProps,
      ref: forwardedRef
    });
  });
  AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
  var ACTION_NAME = "AlertDialogAction";
  var AlertDialogAction$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return jsxRuntimeExports.jsx(Close, {
      ...dialogScope,
      ...actionProps,
      ref: forwardedRef
    });
  });
  AlertDialogAction$1.displayName = ACTION_NAME;
  var CANCEL_NAME = "AlertDialogCancel";
  var AlertDialogCancel$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return jsxRuntimeExports.jsx(Close, {
      ...dialogScope,
      ...cancelProps,
      ref
    });
  });
  AlertDialogCancel$1.displayName = CANCEL_NAME;
  var DescriptionWarning = ({ contentRef }) => {
    const MESSAGE = `\`${CONTENT_NAME$2}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME$2}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME$2}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
    reactExports.useEffect(() => {
      var _a;
      const hasDescription = document.getElementById((_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby"));
      if (!hasDescription) console.warn(MESSAGE);
    }, [
      MESSAGE,
      contentRef
    ]);
    return null;
  };
  Root2$1 = AlertDialog$1;
  Portal2$1 = AlertDialogPortal$1;
  Overlay2 = AlertDialogOverlay$1;
  Content2$2 = AlertDialogContent$1;
  Action = AlertDialogAction$1;
  Cancel = AlertDialogCancel$1;
  Title2 = AlertDialogTitle$1;
  Description2 = AlertDialogDescription$1;
  const AlertDialog = Root2$1;
  const AlertDialogPortal = Portal2$1;
  const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Overlay2, {
    className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
    ...props,
    ref
  }));
  AlertDialogOverlay.displayName = Overlay2.displayName;
  const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsxs(AlertDialogPortal, {
    children: [
      jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
      jsxRuntimeExports.jsx(Content2$2, {
        ref,
        className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
        ...props
      })
    ]
  }));
  AlertDialogContent.displayName = Content2$2.displayName;
  const AlertDialogHeader = ({ className, ...props }) => jsxRuntimeExports.jsx("div", {
    className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
    ...props
  });
  AlertDialogHeader.displayName = "AlertDialogHeader";
  const AlertDialogFooter = ({ className, ...props }) => jsxRuntimeExports.jsx("div", {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  });
  AlertDialogFooter.displayName = "AlertDialogFooter";
  const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Title2, {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }));
  AlertDialogTitle.displayName = Title2.displayName;
  const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Description2, {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }));
  AlertDialogDescription.displayName = Description2.displayName;
  const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Action, {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }));
  AlertDialogAction.displayName = Action.displayName;
  const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Cancel, {
    ref,
    className: cn(buttonVariants({
      variant: "outline"
    }), "mt-2 sm:mt-0", className),
    ...props
  }));
  AlertDialogCancel.displayName = Cancel.displayName;
  const DeleteSessionDialog = create(({ id }) => {
    const { t } = useTranslation("dialogs");
    const currentModal = useModal();
    const { toast } = useToast();
    const { deleteSession } = useDeleteSession();
    const handleSubmit = async () => {
      try {
        await deleteSession(id);
        currentModal.hide();
      } catch {
        toast({
          variant: "destructive",
          description: t("delete_session.errors.delete_failed")
        });
      }
    };
    return jsxRuntimeExports.jsx(AlertDialog, {
      open: currentModal.visible,
      onOpenChange: currentModal.hide,
      children: jsxRuntimeExports.jsxs(AlertDialogContent, {
        children: [
          jsxRuntimeExports.jsxs(AlertDialogHeader, {
            children: [
              jsxRuntimeExports.jsx(AlertDialogTitle, {
                children: t("delete_session.title")
              }),
              jsxRuntimeExports.jsx(AlertDialogDescription, {
                children: t("delete_session.description")
              })
            ]
          }),
          jsxRuntimeExports.jsxs(AlertDialogFooter, {
            children: [
              jsxRuntimeExports.jsx(AlertDialogCancel, {
                onClick: currentModal.hide,
                children: t("delete_session.cancel")
              }),
              jsxRuntimeExports.jsx(AlertDialogAction, {
                onClick: handleSubmit,
                children: t("delete_session.delete")
              })
            ]
          })
        ]
      })
    });
  });
  function NavSessions({ sessions, currentSession, setCurrentSession }) {
    const { t } = useTranslation("sidebar");
    const navigate = useNavigate();
    const createSessionDialog = useModal(CreateSessionDialog);
    const deleteSessionDialog = useModal(DeleteSessionDialog);
    const handleNewSession = reactExports.useCallback(() => {
      createSessionDialog.show({});
    }, [
      createSessionDialog
    ]);
    const handleDeleteSession = reactExports.useCallback((e, id) => {
      deleteSessionDialog.show({
        id
      });
      e.preventDefault();
    }, [
      deleteSessionDialog
    ]);
    const handleSetCurrentSession = (session) => {
      setCurrentSession(session);
      navigate(getRouteURL("whiteboard", {
        sessionId: session.id
      }));
    };
    return jsxRuntimeExports.jsxs(SidebarGroup, {
      className: "group-data-[collapsible=icon]:hidden",
      children: [
        jsxRuntimeExports.jsx(SidebarGroupLabel, {
          children: jsxRuntimeExports.jsx("div", {
            className: "text-sm",
            children: t("sessions")
          })
        }),
        jsxRuntimeExports.jsxs(SidebarMenu, {
          children: [
            jsxRuntimeExports.jsx(SidebarMenuItem, {
              children: jsxRuntimeExports.jsx(NewSessionButton, {
                onClick: handleNewSession,
                className: "w-full"
              })
            }),
            sessions.map((item) => jsxRuntimeExports.jsx(SidebarMenuItem, {
              className: "cursor-pointer",
              children: jsxRuntimeExports.jsx(SidebarMenuButton, {
                asChild: true,
                onClick: () => handleSetCurrentSession(item),
                children: jsxRuntimeExports.jsxs("div", {
                  className: "flex flex-row justify-between items-center",
                  children: [
                    jsxRuntimeExports.jsxs("div", {
                      className: "flex gap-2",
                      children: [
                        (currentSession == null ? void 0 : currentSession.id) === item.id ? jsxRuntimeExports.jsx(LazyIcon, {
                          size: 16,
                          color: "green",
                          name: "check"
                        }) : jsxRuntimeExports.jsx(LazyIcon, {
                          size: 16,
                          name: "chevron-right"
                        }),
                        jsxRuntimeExports.jsx("span", {
                          children: item.name
                        })
                      ]
                    }),
                    jsxRuntimeExports.jsx(LazyIcon, {
                      onClick: (e) => handleDeleteSession(e, item.id),
                      size: 16,
                      name: "trash-2"
                    })
                  ]
                })
              })
            }, item.id)),
            (sessions == null ? void 0 : sessions.length) ? jsxRuntimeExports.jsx(SidebarMenuItem, {
              children: jsxRuntimeExports.jsxs(SidebarMenuButton, {
                className: "text-sidebar-foreground/70",
                children: [
                  jsxRuntimeExports.jsx(LazyIcon, {
                    name: "ellipsis",
                    className: "text-sidebar-foreground/70"
                  }),
                  jsxRuntimeExports.jsx("span", {
                    children: t("more_session")
                  })
                ]
              })
            }) : null
          ]
        })
      ]
    });
  }
  var DirectionContext = reactExports.createContext(void 0);
  useDirection = function(localDir) {
    const globalDir = reactExports.useContext(DirectionContext);
    return localDir || globalDir || "ltr";
  };
  function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
      const BaseContext = reactExports.createContext(defaultContext);
      const index2 = defaultContexts.length;
      defaultContexts = [
        ...defaultContexts,
        defaultContext
      ];
      function Provider2(props) {
        const { scope, children, ...context } = props;
        const Context = (scope == null ? void 0 : scope[scopeName][index2]) || BaseContext;
        const value = reactExports.useMemo(() => context, Object.values(context));
        return jsxRuntimeExports.jsx(Context.Provider, {
          value,
          children
        });
      }
      function useContext2(consumerName, scope) {
        const Context = (scope == null ? void 0 : scope[scopeName][index2]) || BaseContext;
        const context = reactExports.useContext(Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
      }
      Provider2.displayName = rootComponentName + "Provider";
      return [
        Provider2,
        useContext2
      ];
    }
    const createScope = () => {
      const scopeContexts = defaultContexts.map((defaultContext) => {
        return reactExports.createContext(defaultContext);
      });
      return function useScope(scope) {
        const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
        return reactExports.useMemo(() => ({
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts
          }
        }), [
          scope,
          contexts
        ]);
      };
    };
    createScope.scopeName = scopeName;
    return [
      createContext3,
      composeContextScopes(createScope, ...createContextScopeDeps)
    ];
  }
  function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = () => {
      const scopeHooks = scopes.map((createScope2) => ({
        useScope: createScope2(),
        scopeName: createScope2.scopeName
      }));
      return function useComposedScopes(overrideScopes) {
        const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return {
            ...nextScopes2,
            ...currentScope
          };
        }, {});
        return reactExports.useMemo(() => ({
          [`__scope${baseScope.scopeName}`]: nextScopes
        }), [
          nextScopes
        ]);
      };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
  }
  var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
  var EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
  };
  var GROUP_NAME$2 = "RovingFocusGroup";
  var [Collection$1, useCollection$1, createCollectionScope$1] = createCollection(GROUP_NAME$2);
  let createRovingFocusGroupContext;
  [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME$2, [
    createCollectionScope$1
  ]);
  var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME$2);
  var RovingFocusGroup = reactExports.forwardRef((props, forwardedRef) => {
    return jsxRuntimeExports.jsx(Collection$1.Provider, {
      scope: props.__scopeRovingFocusGroup,
      children: jsxRuntimeExports.jsx(Collection$1.Slot, {
        scope: props.__scopeRovingFocusGroup,
        children: jsxRuntimeExports.jsx(RovingFocusGroupImpl, {
          ...props,
          ref: forwardedRef
        })
      })
    });
  });
  RovingFocusGroup.displayName = GROUP_NAME$2;
  var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const direction = useDirection(dir);
    const [currentTabStopId = null, setCurrentTabStopId] = useControllableState({
      prop: currentTabStopIdProp,
      defaultProp: defaultCurrentTabStopId,
      onChange: onCurrentTabStopIdChange
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
    const handleEntryFocus = useCallbackRef$1(onEntryFocus);
    const getItems = useCollection$1(__scopeRovingFocusGroup);
    const isClickFocusRef = reactExports.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
    reactExports.useEffect(() => {
      const node = ref.current;
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
      }
    }, [
      handleEntryFocus
    ]);
    return jsxRuntimeExports.jsx(RovingFocusProvider, {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [
        setCurrentTabStopId
      ]),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
      onFocusableItemRemove: reactExports.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
      children: jsxRuntimeExports.jsx(Primitive.div, {
        tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
        "data-orientation": orientation,
        ...groupProps,
        ref: composedRefs,
        style: {
          outline: "none",
          ...props.style
        },
        onMouseDown: composeEventHandlers(props.onMouseDown, () => {
          isClickFocusRef.current = true;
        }),
        onFocus: composeEventHandlers(props.onFocus, (event) => {
          const isKeyboardFocus = !isClickFocusRef.current;
          if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
            event.currentTarget.dispatchEvent(entryFocusEvent);
            if (!entryFocusEvent.defaultPrevented) {
              const items = getItems().filter((item) => item.focusable);
              const activeItem = items.find((item) => item.active);
              const currentItem = items.find((item) => item.id === currentTabStopId);
              const candidateItems = [
                activeItem,
                currentItem,
                ...items
              ].filter(Boolean);
              const candidateNodes = candidateItems.map((item) => item.ref.current);
              focusFirst$1(candidateNodes, preventScrollOnEntryFocus);
            }
          }
          isClickFocusRef.current = false;
        }),
        onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
      })
    });
  });
  var ITEM_NAME$2 = "RovingFocusGroupItem";
  var RovingFocusGroupItem = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, ...itemProps } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME$2, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection$1(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [
      focusable,
      onFocusableItemAdd,
      onFocusableItemRemove
    ]);
    return jsxRuntimeExports.jsx(Collection$1.ItemSlot, {
      scope: __scopeRovingFocusGroup,
      id,
      focusable,
      active,
      children: jsxRuntimeExports.jsx(Primitive.span, {
        tabIndex: isCurrentTabStop ? 0 : -1,
        "data-orientation": context.orientation,
        ...itemProps,
        ref: forwardedRef,
        onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
          if (!focusable) event.preventDefault();
          else context.onItemFocus(id);
        }),
        onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          if (event.key === "Tab" && event.shiftKey) {
            context.onItemShiftTab();
            return;
          }
          if (event.target !== event.currentTarget) return;
          const focusIntent = getFocusIntent(event, context.orientation, context.dir);
          if (focusIntent !== void 0) {
            if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
            event.preventDefault();
            const items = getItems().filter((item) => item.focusable);
            let candidateNodes = items.map((item) => item.ref.current);
            if (focusIntent === "last") candidateNodes.reverse();
            else if (focusIntent === "prev" || focusIntent === "next") {
              if (focusIntent === "prev") candidateNodes.reverse();
              const currentIndex = candidateNodes.indexOf(event.currentTarget);
              candidateNodes = context.loop ? wrapArray$1(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
            }
            setTimeout(() => focusFirst$1(candidateNodes));
          }
        })
      })
    });
  });
  RovingFocusGroupItem.displayName = ITEM_NAME$2;
  var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
  };
  function getDirectionAwareKey(key, dir) {
    if (dir !== "rtl") return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
  }
  function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === "vertical" && [
      "ArrowLeft",
      "ArrowRight"
    ].includes(key)) return void 0;
    if (orientation === "horizontal" && [
      "ArrowUp",
      "ArrowDown"
    ].includes(key)) return void 0;
    return MAP_KEY_TO_FOCUS_INTENT[key];
  }
  function focusFirst$1(candidates, preventScroll = false) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
      candidate.focus({
        preventScroll
      });
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
  }
  function wrapArray$1(array, startIndex) {
    return array.map((_, index2) => array[(startIndex + index2) % array.length]);
  }
  Root = RovingFocusGroup;
  Item = RovingFocusGroupItem;
  var SELECTION_KEYS = [
    "Enter",
    " "
  ];
  var FIRST_KEYS = [
    "ArrowDown",
    "PageUp",
    "Home"
  ];
  var LAST_KEYS = [
    "ArrowUp",
    "PageDown",
    "End"
  ];
  var FIRST_LAST_KEYS = [
    ...FIRST_KEYS,
    ...LAST_KEYS
  ];
  var SUB_OPEN_KEYS = {
    ltr: [
      ...SELECTION_KEYS,
      "ArrowRight"
    ],
    rtl: [
      ...SELECTION_KEYS,
      "ArrowLeft"
    ]
  };
  var SUB_CLOSE_KEYS = {
    ltr: [
      "ArrowLeft"
    ],
    rtl: [
      "ArrowRight"
    ]
  };
  var MENU_NAME = "Menu";
  var [Collection, useCollection, createCollectionScope] = createCollection(MENU_NAME);
  let createMenuContext;
  [createMenuContext, createMenuScope] = createContextScope$2(MENU_NAME, [
    createCollectionScope,
    createPopperScope,
    createRovingFocusGroupScope
  ]);
  var usePopperScope = createPopperScope();
  var useRovingFocusGroupScope = createRovingFocusGroupScope();
  var [MenuProvider, useMenuContext] = createMenuContext(MENU_NAME);
  var [MenuRootProvider, useMenuRootContext] = createMenuContext(MENU_NAME);
  var Menu = (props) => {
    const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
    const popperScope = usePopperScope(__scopeMenu);
    const [content, setContent] = reactExports.useState(null);
    const isUsingKeyboardRef = reactExports.useRef(false);
    const handleOpenChange = useCallbackRef$1(onOpenChange);
    const direction = useDirection(dir);
    reactExports.useEffect(() => {
      const handleKeyDown = () => {
        isUsingKeyboardRef.current = true;
        document.addEventListener("pointerdown", handlePointer, {
          capture: true,
          once: true
        });
        document.addEventListener("pointermove", handlePointer, {
          capture: true,
          once: true
        });
      };
      const handlePointer = () => isUsingKeyboardRef.current = false;
      document.addEventListener("keydown", handleKeyDown, {
        capture: true
      });
      return () => {
        document.removeEventListener("keydown", handleKeyDown, {
          capture: true
        });
        document.removeEventListener("pointerdown", handlePointer, {
          capture: true
        });
        document.removeEventListener("pointermove", handlePointer, {
          capture: true
        });
      };
    }, []);
    return jsxRuntimeExports.jsx(Root2$2, {
      ...popperScope,
      children: jsxRuntimeExports.jsx(MenuProvider, {
        scope: __scopeMenu,
        open,
        onOpenChange: handleOpenChange,
        content,
        onContentChange: setContent,
        children: jsxRuntimeExports.jsx(MenuRootProvider, {
          scope: __scopeMenu,
          onClose: reactExports.useCallback(() => handleOpenChange(false), [
            handleOpenChange
          ]),
          isUsingKeyboardRef,
          dir: direction,
          modal,
          children
        })
      })
    });
  };
  Menu.displayName = MENU_NAME;
  var ANCHOR_NAME = "MenuAnchor";
  var MenuAnchor = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeMenu, ...anchorProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return jsxRuntimeExports.jsx(Anchor, {
      ...popperScope,
      ...anchorProps,
      ref: forwardedRef
    });
  });
  MenuAnchor.displayName = ANCHOR_NAME;
  var PORTAL_NAME$1 = "MenuPortal";
  var [PortalProvider, usePortalContext] = createMenuContext(PORTAL_NAME$1, {
    forceMount: void 0
  });
  var MenuPortal = (props) => {
    const { __scopeMenu, forceMount, children, container } = props;
    const context = useMenuContext(PORTAL_NAME$1, __scopeMenu);
    return jsxRuntimeExports.jsx(PortalProvider, {
      scope: __scopeMenu,
      forceMount,
      children: jsxRuntimeExports.jsx(Presence, {
        present: forceMount || context.open,
        children: jsxRuntimeExports.jsx(Portal$3, {
          asChild: true,
          container,
          children
        })
      })
    });
  };
  MenuPortal.displayName = PORTAL_NAME$1;
  var CONTENT_NAME$1 = "MenuContent";
  var [MenuContentProvider, useMenuContentContext] = createMenuContext(CONTENT_NAME$1);
  var MenuContent = reactExports.forwardRef((props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
    return jsxRuntimeExports.jsx(Collection.Provider, {
      scope: props.__scopeMenu,
      children: jsxRuntimeExports.jsx(Presence, {
        present: forceMount || context.open,
        children: jsxRuntimeExports.jsx(Collection.Slot, {
          scope: props.__scopeMenu,
          children: rootContext.modal ? jsxRuntimeExports.jsx(MenuRootContentModal, {
            ...contentProps,
            ref: forwardedRef
          }) : jsxRuntimeExports.jsx(MenuRootContentNonModal, {
            ...contentProps,
            ref: forwardedRef
          })
        })
      })
    });
  });
  var MenuRootContentModal = reactExports.forwardRef((props, forwardedRef) => {
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    reactExports.useEffect(() => {
      const content = ref.current;
      if (content) return hideOthers(content);
    }, []);
    return jsxRuntimeExports.jsx(MenuContentImpl, {
      ...props,
      ref: composedRefs,
      trapFocus: context.open,
      disableOutsidePointerEvents: context.open,
      disableOutsideScroll: true,
      onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault(), {
        checkForDefaultPrevented: false
      }),
      onDismiss: () => context.onOpenChange(false)
    });
  });
  var MenuRootContentNonModal = reactExports.forwardRef((props, forwardedRef) => {
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    return jsxRuntimeExports.jsx(MenuContentImpl, {
      ...props,
      ref: forwardedRef,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      disableOutsideScroll: false,
      onDismiss: () => context.onOpenChange(false)
    });
  });
  var MenuContentImpl = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeMenu, loop = false, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEntryFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, disableOutsideScroll, ...contentProps } = props;
    const context = useMenuContext(CONTENT_NAME$1, __scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, __scopeMenu);
    const popperScope = usePopperScope(__scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const getItems = useCollection(__scopeMenu);
    const [currentItemId, setCurrentItemId] = reactExports.useState(null);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef, context.onContentChange);
    const timerRef = reactExports.useRef(0);
    const searchRef = reactExports.useRef("");
    const pointerGraceTimerRef = reactExports.useRef(0);
    const pointerGraceIntentRef = reactExports.useRef(null);
    const pointerDirRef = reactExports.useRef("right");
    const lastPointerXRef = reactExports.useRef(0);
    const ScrollLockWrapper = disableOutsideScroll ? ReactRemoveScroll : reactExports.Fragment;
    const scrollLockWrapperProps = disableOutsideScroll ? {
      as: Slot,
      allowPinchZoom: true
    } : void 0;
    const handleTypeaheadSearch = (key) => {
      var _a, _b;
      const search = searchRef.current + key;
      const items = getItems().filter((item) => !item.disabled);
      const currentItem = document.activeElement;
      const currentMatch = (_a = items.find((item) => item.ref.current === currentItem)) == null ? void 0 : _a.textValue;
      const values = items.map((item) => item.textValue);
      const nextMatch = getNextMatch(values, search, currentMatch);
      const newItem = (_b = items.find((item) => item.textValue === nextMatch)) == null ? void 0 : _b.ref.current;
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
      if (newItem) {
        setTimeout(() => newItem.focus());
      }
    };
    reactExports.useEffect(() => {
      return () => window.clearTimeout(timerRef.current);
    }, []);
    useFocusGuards();
    const isPointerMovingToSubmenu = reactExports.useCallback((event) => {
      var _a, _b;
      const isMovingTowards = pointerDirRef.current === ((_a = pointerGraceIntentRef.current) == null ? void 0 : _a.side);
      return isMovingTowards && isPointerInGraceArea(event, (_b = pointerGraceIntentRef.current) == null ? void 0 : _b.area);
    }, []);
    return jsxRuntimeExports.jsx(MenuContentProvider, {
      scope: __scopeMenu,
      searchRef,
      onItemEnter: reactExports.useCallback((event) => {
        if (isPointerMovingToSubmenu(event)) event.preventDefault();
      }, [
        isPointerMovingToSubmenu
      ]),
      onItemLeave: reactExports.useCallback((event) => {
        var _a;
        if (isPointerMovingToSubmenu(event)) return;
        (_a = contentRef.current) == null ? void 0 : _a.focus();
        setCurrentItemId(null);
      }, [
        isPointerMovingToSubmenu
      ]),
      onTriggerLeave: reactExports.useCallback((event) => {
        if (isPointerMovingToSubmenu(event)) event.preventDefault();
      }, [
        isPointerMovingToSubmenu
      ]),
      pointerGraceTimerRef,
      onPointerGraceIntentChange: reactExports.useCallback((intent) => {
        pointerGraceIntentRef.current = intent;
      }, []),
      children: jsxRuntimeExports.jsx(ScrollLockWrapper, {
        ...scrollLockWrapperProps,
        children: jsxRuntimeExports.jsx(FocusScope, {
          asChild: true,
          trapped: trapFocus,
          onMountAutoFocus: composeEventHandlers(onOpenAutoFocus, (event) => {
            var _a;
            event.preventDefault();
            (_a = contentRef.current) == null ? void 0 : _a.focus({
              preventScroll: true
            });
          }),
          onUnmountAutoFocus: onCloseAutoFocus,
          children: jsxRuntimeExports.jsx(DismissableLayer, {
            asChild: true,
            disableOutsidePointerEvents,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onInteractOutside,
            onDismiss,
            children: jsxRuntimeExports.jsx(Root, {
              asChild: true,
              ...rovingFocusGroupScope,
              dir: rootContext.dir,
              orientation: "vertical",
              loop,
              currentTabStopId: currentItemId,
              onCurrentTabStopIdChange: setCurrentItemId,
              onEntryFocus: composeEventHandlers(onEntryFocus, (event) => {
                if (!rootContext.isUsingKeyboardRef.current) event.preventDefault();
              }),
              preventScrollOnEntryFocus: true,
              children: jsxRuntimeExports.jsx(Content, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": getOpenState(context.open),
                "data-radix-menu-content": "",
                dir: rootContext.dir,
                ...popperScope,
                ...contentProps,
                ref: composedRefs,
                style: {
                  outline: "none",
                  ...contentProps.style
                },
                onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                  const target = event.target;
                  const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
                  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                  const isCharacterKey = event.key.length === 1;
                  if (isKeyDownInside) {
                    if (event.key === "Tab") event.preventDefault();
                    if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key);
                  }
                  const content = contentRef.current;
                  if (event.target !== content) return;
                  if (!FIRST_LAST_KEYS.includes(event.key)) return;
                  event.preventDefault();
                  const items = getItems().filter((item) => !item.disabled);
                  const candidateNodes = items.map((item) => item.ref.current);
                  if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                  focusFirst(candidateNodes);
                }),
                onBlur: composeEventHandlers(props.onBlur, (event) => {
                  if (!event.currentTarget.contains(event.target)) {
                    window.clearTimeout(timerRef.current);
                    searchRef.current = "";
                  }
                }),
                onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
                  const target = event.target;
                  const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
                  if (event.currentTarget.contains(target) && pointerXHasChanged) {
                    const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
                    pointerDirRef.current = newDir;
                    lastPointerXRef.current = event.clientX;
                  }
                }))
              })
            })
          })
        })
      })
    });
  });
  MenuContent.displayName = CONTENT_NAME$1;
  var GROUP_NAME$1 = "MenuGroup";
  var MenuGroup = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeMenu, ...groupProps } = props;
    return jsxRuntimeExports.jsx(Primitive.div, {
      role: "group",
      ...groupProps,
      ref: forwardedRef
    });
  });
  MenuGroup.displayName = GROUP_NAME$1;
  var LABEL_NAME$1 = "MenuLabel";
  var MenuLabel = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeMenu, ...labelProps } = props;
    return jsxRuntimeExports.jsx(Primitive.div, {
      ...labelProps,
      ref: forwardedRef
    });
  });
  MenuLabel.displayName = LABEL_NAME$1;
  var ITEM_NAME$1 = "MenuItem";
  var ITEM_SELECT = "menu.itemSelect";
  var MenuItem = reactExports.forwardRef((props, forwardedRef) => {
    const { disabled = false, onSelect, ...itemProps } = props;
    const ref = reactExports.useRef(null);
    const rootContext = useMenuRootContext(ITEM_NAME$1, props.__scopeMenu);
    const contentContext = useMenuContentContext(ITEM_NAME$1, props.__scopeMenu);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const isPointerDownRef = reactExports.useRef(false);
    const handleSelect = () => {
      const menuItem = ref.current;
      if (!disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
          bubbles: true,
          cancelable: true
        });
        menuItem.addEventListener(ITEM_SELECT, (event) => onSelect == null ? void 0 : onSelect(event), {
          once: true
        });
        dispatchDiscreteCustomEvent(menuItem, itemSelectEvent);
        if (itemSelectEvent.defaultPrevented) {
          isPointerDownRef.current = false;
        } else {
          rootContext.onClose();
        }
      }
    };
    return jsxRuntimeExports.jsx(MenuItemImpl, {
      ...itemProps,
      ref: composedRefs,
      disabled,
      onClick: composeEventHandlers(props.onClick, handleSelect),
      onPointerDown: (event) => {
        var _a;
        (_a = props.onPointerDown) == null ? void 0 : _a.call(props, event);
        isPointerDownRef.current = true;
      },
      onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
        var _a;
        if (!isPointerDownRef.current) (_a = event.currentTarget) == null ? void 0 : _a.click();
      }),
      onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
        const isTypingAhead = contentContext.searchRef.current !== "";
        if (disabled || isTypingAhead && event.key === " ") return;
        if (SELECTION_KEYS.includes(event.key)) {
          event.currentTarget.click();
          event.preventDefault();
        }
      })
    });
  });
  MenuItem.displayName = ITEM_NAME$1;
  var MenuItemImpl = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
    const contentContext = useMenuContentContext(ITEM_NAME$1, __scopeMenu);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const [isFocused, setIsFocused] = reactExports.useState(false);
    const [textContent, setTextContent] = reactExports.useState("");
    reactExports.useEffect(() => {
      const menuItem = ref.current;
      if (menuItem) {
        setTextContent((menuItem.textContent ?? "").trim());
      }
    }, [
      itemProps.children
    ]);
    return jsxRuntimeExports.jsx(Collection.ItemSlot, {
      scope: __scopeMenu,
      disabled,
      textValue: textValue ?? textContent,
      children: jsxRuntimeExports.jsx(Item, {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        children: jsxRuntimeExports.jsx(Primitive.div, {
          role: "menuitem",
          "data-highlighted": isFocused ? "" : void 0,
          "aria-disabled": disabled || void 0,
          "data-disabled": disabled ? "" : void 0,
          ...itemProps,
          ref: composedRefs,
          onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
            if (disabled) {
              contentContext.onItemLeave(event);
            } else {
              contentContext.onItemEnter(event);
              if (!event.defaultPrevented) {
                const item = event.currentTarget;
                item.focus({
                  preventScroll: true
                });
              }
            }
          })),
          onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => contentContext.onItemLeave(event))),
          onFocus: composeEventHandlers(props.onFocus, () => setIsFocused(true)),
          onBlur: composeEventHandlers(props.onBlur, () => setIsFocused(false))
        })
      })
    });
  });
  var CHECKBOX_ITEM_NAME$1 = "MenuCheckboxItem";
  var MenuCheckboxItem = reactExports.forwardRef((props, forwardedRef) => {
    const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
    return jsxRuntimeExports.jsx(ItemIndicatorProvider, {
      scope: props.__scopeMenu,
      checked,
      children: jsxRuntimeExports.jsx(MenuItem, {
        role: "menuitemcheckbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        ...checkboxItemProps,
        ref: forwardedRef,
        "data-state": getCheckedState(checked),
        onSelect: composeEventHandlers(checkboxItemProps.onSelect, () => onCheckedChange == null ? void 0 : onCheckedChange(isIndeterminate(checked) ? true : !checked), {
          checkForDefaultPrevented: false
        })
      })
    });
  });
  MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME$1;
  var RADIO_GROUP_NAME$1 = "MenuRadioGroup";
  var [RadioGroupProvider, useRadioGroupContext] = createMenuContext(RADIO_GROUP_NAME$1, {
    value: void 0,
    onValueChange: () => {
    }
  });
  var MenuRadioGroup = reactExports.forwardRef((props, forwardedRef) => {
    const { value, onValueChange, ...groupProps } = props;
    const handleValueChange = useCallbackRef$1(onValueChange);
    return jsxRuntimeExports.jsx(RadioGroupProvider, {
      scope: props.__scopeMenu,
      value,
      onValueChange: handleValueChange,
      children: jsxRuntimeExports.jsx(MenuGroup, {
        ...groupProps,
        ref: forwardedRef
      })
    });
  });
  MenuRadioGroup.displayName = RADIO_GROUP_NAME$1;
  var RADIO_ITEM_NAME$1 = "MenuRadioItem";
  var MenuRadioItem = reactExports.forwardRef((props, forwardedRef) => {
    const { value, ...radioItemProps } = props;
    const context = useRadioGroupContext(RADIO_ITEM_NAME$1, props.__scopeMenu);
    const checked = value === context.value;
    return jsxRuntimeExports.jsx(ItemIndicatorProvider, {
      scope: props.__scopeMenu,
      checked,
      children: jsxRuntimeExports.jsx(MenuItem, {
        role: "menuitemradio",
        "aria-checked": checked,
        ...radioItemProps,
        ref: forwardedRef,
        "data-state": getCheckedState(checked),
        onSelect: composeEventHandlers(radioItemProps.onSelect, () => {
          var _a;
          return (_a = context.onValueChange) == null ? void 0 : _a.call(context, value);
        }, {
          checkForDefaultPrevented: false
        })
      })
    });
  });
  MenuRadioItem.displayName = RADIO_ITEM_NAME$1;
  var ITEM_INDICATOR_NAME = "MenuItemIndicator";
  var [ItemIndicatorProvider, useItemIndicatorContext] = createMenuContext(ITEM_INDICATOR_NAME, {
    checked: false
  });
  var MenuItemIndicator = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
    const indicatorContext = useItemIndicatorContext(ITEM_INDICATOR_NAME, __scopeMenu);
    return jsxRuntimeExports.jsx(Presence, {
      present: forceMount || isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true,
      children: jsxRuntimeExports.jsx(Primitive.span, {
        ...itemIndicatorProps,
        ref: forwardedRef,
        "data-state": getCheckedState(indicatorContext.checked)
      })
    });
  });
  MenuItemIndicator.displayName = ITEM_INDICATOR_NAME;
  var SEPARATOR_NAME$1 = "MenuSeparator";
  var MenuSeparator = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeMenu, ...separatorProps } = props;
    return jsxRuntimeExports.jsx(Primitive.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...separatorProps,
      ref: forwardedRef
    });
  });
  MenuSeparator.displayName = SEPARATOR_NAME$1;
  var ARROW_NAME$1 = "MenuArrow";
  var MenuArrow = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeMenu, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeMenu);
    return jsxRuntimeExports.jsx(Arrow, {
      ...popperScope,
      ...arrowProps,
      ref: forwardedRef
    });
  });
  MenuArrow.displayName = ARROW_NAME$1;
  var SUB_NAME = "MenuSub";
  var [MenuSubProvider, useMenuSubContext] = createMenuContext(SUB_NAME);
  var MenuSub = (props) => {
    const { __scopeMenu, children, open = false, onOpenChange } = props;
    const parentMenuContext = useMenuContext(SUB_NAME, __scopeMenu);
    const popperScope = usePopperScope(__scopeMenu);
    const [trigger, setTrigger] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const handleOpenChange = useCallbackRef$1(onOpenChange);
    reactExports.useEffect(() => {
      if (parentMenuContext.open === false) handleOpenChange(false);
      return () => handleOpenChange(false);
    }, [
      parentMenuContext.open,
      handleOpenChange
    ]);
    return jsxRuntimeExports.jsx(Root2$2, {
      ...popperScope,
      children: jsxRuntimeExports.jsx(MenuProvider, {
        scope: __scopeMenu,
        open,
        onOpenChange: handleOpenChange,
        content,
        onContentChange: setContent,
        children: jsxRuntimeExports.jsx(MenuSubProvider, {
          scope: __scopeMenu,
          contentId: useId(),
          triggerId: useId(),
          trigger,
          onTriggerChange: setTrigger,
          children
        })
      })
    });
  };
  MenuSub.displayName = SUB_NAME;
  var SUB_TRIGGER_NAME$1 = "MenuSubTrigger";
  var MenuSubTrigger = reactExports.forwardRef((props, forwardedRef) => {
    const context = useMenuContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const subContext = useMenuSubContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const contentContext = useMenuContentContext(SUB_TRIGGER_NAME$1, props.__scopeMenu);
    const openTimerRef = reactExports.useRef(null);
    const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
    const scope = {
      __scopeMenu: props.__scopeMenu
    };
    const clearOpenTimer = reactExports.useCallback(() => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }, []);
    reactExports.useEffect(() => clearOpenTimer, [
      clearOpenTimer
    ]);
    reactExports.useEffect(() => {
      const pointerGraceTimer = pointerGraceTimerRef.current;
      return () => {
        window.clearTimeout(pointerGraceTimer);
        onPointerGraceIntentChange(null);
      };
    }, [
      pointerGraceTimerRef,
      onPointerGraceIntentChange
    ]);
    return jsxRuntimeExports.jsx(MenuAnchor, {
      asChild: true,
      ...scope,
      children: jsxRuntimeExports.jsx(MenuItemImpl, {
        id: subContext.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": subContext.contentId,
        "data-state": getOpenState(context.open),
        ...props,
        ref: composeRefs(forwardedRef, subContext.onTriggerChange),
        onClick: (event) => {
          var _a;
          (_a = props.onClick) == null ? void 0 : _a.call(props, event);
          if (props.disabled || event.defaultPrevented) return;
          event.currentTarget.focus();
          if (!context.open) context.onOpenChange(true);
        },
        onPointerMove: composeEventHandlers(props.onPointerMove, whenMouse((event) => {
          contentContext.onItemEnter(event);
          if (event.defaultPrevented) return;
          if (!props.disabled && !context.open && !openTimerRef.current) {
            contentContext.onPointerGraceIntentChange(null);
            openTimerRef.current = window.setTimeout(() => {
              context.onOpenChange(true);
              clearOpenTimer();
            }, 100);
          }
        })),
        onPointerLeave: composeEventHandlers(props.onPointerLeave, whenMouse((event) => {
          var _a, _b;
          clearOpenTimer();
          const contentRect = (_a = context.content) == null ? void 0 : _a.getBoundingClientRect();
          if (contentRect) {
            const side = (_b = context.content) == null ? void 0 : _b.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            contentContext.onPointerGraceIntentChange({
              area: [
                {
                  x: event.clientX + bleed,
                  y: event.clientY
                },
                {
                  x: contentNearEdge,
                  y: contentRect.top
                },
                {
                  x: contentFarEdge,
                  y: contentRect.top
                },
                {
                  x: contentFarEdge,
                  y: contentRect.bottom
                },
                {
                  x: contentNearEdge,
                  y: contentRect.bottom
                }
              ],
              side
            });
            window.clearTimeout(pointerGraceTimerRef.current);
            pointerGraceTimerRef.current = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
          } else {
            contentContext.onTriggerLeave(event);
            if (event.defaultPrevented) return;
            contentContext.onPointerGraceIntentChange(null);
          }
        })),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          var _a;
          const isTypingAhead = contentContext.searchRef.current !== "";
          if (props.disabled || isTypingAhead && event.key === " ") return;
          if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
            context.onOpenChange(true);
            (_a = context.content) == null ? void 0 : _a.focus();
            event.preventDefault();
          }
        })
      })
    });
  });
  MenuSubTrigger.displayName = SUB_TRIGGER_NAME$1;
  var SUB_CONTENT_NAME$1 = "MenuSubContent";
  var MenuSubContent = reactExports.forwardRef((props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeMenu);
    const { forceMount = portalContext.forceMount, ...subContentProps } = props;
    const context = useMenuContext(CONTENT_NAME$1, props.__scopeMenu);
    const rootContext = useMenuRootContext(CONTENT_NAME$1, props.__scopeMenu);
    const subContext = useMenuSubContext(SUB_CONTENT_NAME$1, props.__scopeMenu);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    return jsxRuntimeExports.jsx(Collection.Provider, {
      scope: props.__scopeMenu,
      children: jsxRuntimeExports.jsx(Presence, {
        present: forceMount || context.open,
        children: jsxRuntimeExports.jsx(Collection.Slot, {
          scope: props.__scopeMenu,
          children: jsxRuntimeExports.jsx(MenuContentImpl, {
            id: subContext.contentId,
            "aria-labelledby": subContext.triggerId,
            ...subContentProps,
            ref: composedRefs,
            align: "start",
            side: rootContext.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: false,
            disableOutsideScroll: false,
            trapFocus: false,
            onOpenAutoFocus: (event) => {
              var _a;
              if (rootContext.isUsingKeyboardRef.current) (_a = ref.current) == null ? void 0 : _a.focus();
              event.preventDefault();
            },
            onCloseAutoFocus: (event) => event.preventDefault(),
            onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => {
              if (event.target !== subContext.trigger) context.onOpenChange(false);
            }),
            onEscapeKeyDown: composeEventHandlers(props.onEscapeKeyDown, (event) => {
              rootContext.onClose();
              event.preventDefault();
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              var _a;
              const isKeyDownInside = event.currentTarget.contains(event.target);
              const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
              if (isKeyDownInside && isCloseKey) {
                context.onOpenChange(false);
                (_a = subContext.trigger) == null ? void 0 : _a.focus();
                event.preventDefault();
              }
            })
          })
        })
      })
    });
  });
  MenuSubContent.displayName = SUB_CONTENT_NAME$1;
  function getOpenState(open) {
    return open ? "open" : "closed";
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function focusFirst(candidates) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
      candidate.focus();
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
  }
  function wrapArray(array, startIndex) {
    return array.map((_, index2) => array[(startIndex + index2) % array.length]);
  }
  function getNextMatch(values, search, currentMatch) {
    const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
    const normalizedSearch = isRepeated ? search[0] : search;
    const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
    let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
    const excludeCurrentMatch = normalizedSearch.length === 1;
    if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
    const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
    return nextMatch !== currentMatch ? nextMatch : void 0;
  }
  function isPointInPolygon(point, polygon) {
    const { x, y } = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;
      const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
  function isPointerInGraceArea(event, area) {
    if (!area) return false;
    const cursorPos = {
      x: event.clientX,
      y: event.clientY
    };
    return isPointInPolygon(cursorPos, area);
  }
  function whenMouse(handler) {
    return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
  }
  Root3 = Menu;
  Anchor2 = MenuAnchor;
  Portal = MenuPortal;
  Content2$1 = MenuContent;
  Group = MenuGroup;
  Label = MenuLabel;
  Item2$1 = MenuItem;
  CheckboxItem = MenuCheckboxItem;
  RadioGroup = MenuRadioGroup;
  RadioItem = MenuRadioItem;
  ItemIndicator = MenuItemIndicator;
  Separator = MenuSeparator;
  Arrow2 = MenuArrow;
  Sub = MenuSub;
  SubTrigger = MenuSubTrigger;
  SubContent = MenuSubContent;
  var DROPDOWN_MENU_NAME = "DropdownMenu";
  var [createDropdownMenuContext, createDropdownMenuScope] = createContextScope$2(DROPDOWN_MENU_NAME, [
    createMenuScope
  ]);
  var useMenuScope = createMenuScope();
  var [DropdownMenuProvider, useDropdownMenuContext] = createDropdownMenuContext(DROPDOWN_MENU_NAME);
  var DropdownMenu$1 = (props) => {
    const { __scopeDropdownMenu, children, dir, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const triggerRef = reactExports.useRef(null);
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange
    });
    return jsxRuntimeExports.jsx(DropdownMenuProvider, {
      scope: __scopeDropdownMenu,
      triggerId: useId(),
      triggerRef,
      contentId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [
        setOpen
      ]),
      modal,
      children: jsxRuntimeExports.jsx(Root3, {
        ...menuScope,
        open,
        onOpenChange: setOpen,
        dir,
        modal,
        children
      })
    });
  };
  DropdownMenu$1.displayName = DROPDOWN_MENU_NAME;
  var TRIGGER_NAME = "DropdownMenuTrigger";
  var DropdownMenuTrigger$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
    const context = useDropdownMenuContext(TRIGGER_NAME, __scopeDropdownMenu);
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(Anchor2, {
      asChild: true,
      ...menuScope,
      children: jsxRuntimeExports.jsx(Primitive.button, {
        type: "button",
        id: context.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.contentId : void 0,
        "data-state": context.open ? "open" : "closed",
        "data-disabled": disabled ? "" : void 0,
        disabled,
        ...triggerProps,
        ref: composeRefs(forwardedRef, context.triggerRef),
        onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
          if (!disabled && event.button === 0 && event.ctrlKey === false) {
            context.onOpenToggle();
            if (!context.open) event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
          if (disabled) return;
          if ([
            "Enter",
            " "
          ].includes(event.key)) context.onOpenToggle();
          if (event.key === "ArrowDown") context.onOpenChange(true);
          if ([
            "Enter",
            " ",
            "ArrowDown"
          ].includes(event.key)) event.preventDefault();
        })
      })
    });
  });
  DropdownMenuTrigger$1.displayName = TRIGGER_NAME;
  var PORTAL_NAME = "DropdownMenuPortal";
  var DropdownMenuPortal = (props) => {
    const { __scopeDropdownMenu, ...portalProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(Portal, {
      ...menuScope,
      ...portalProps
    });
  };
  DropdownMenuPortal.displayName = PORTAL_NAME;
  var CONTENT_NAME = "DropdownMenuContent";
  var DropdownMenuContent$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...contentProps } = props;
    const context = useDropdownMenuContext(CONTENT_NAME, __scopeDropdownMenu);
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    return jsxRuntimeExports.jsx(Content2$1, {
      id: context.contentId,
      "aria-labelledby": context.triggerId,
      ...menuScope,
      ...contentProps,
      ref: forwardedRef,
      onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
        var _a;
        if (!hasInteractedOutsideRef.current) (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        hasInteractedOutsideRef.current = false;
        event.preventDefault();
      }),
      onInteractOutside: composeEventHandlers(props.onInteractOutside, (event) => {
        const originalEvent = event.detail.originalEvent;
        const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
        if (!context.modal || isRightClick) hasInteractedOutsideRef.current = true;
      }),
      style: {
        ...props.style,
        ...{
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    });
  });
  DropdownMenuContent$1.displayName = CONTENT_NAME;
  var GROUP_NAME = "DropdownMenuGroup";
  var DropdownMenuGroup$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...groupProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(Group, {
      ...menuScope,
      ...groupProps,
      ref: forwardedRef
    });
  });
  DropdownMenuGroup$1.displayName = GROUP_NAME;
  var LABEL_NAME = "DropdownMenuLabel";
  var DropdownMenuLabel$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...labelProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(Label, {
      ...menuScope,
      ...labelProps,
      ref: forwardedRef
    });
  });
  DropdownMenuLabel$1.displayName = LABEL_NAME;
  var ITEM_NAME = "DropdownMenuItem";
  var DropdownMenuItem$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...itemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(Item2$1, {
      ...menuScope,
      ...itemProps,
      ref: forwardedRef
    });
  });
  DropdownMenuItem$1.displayName = ITEM_NAME;
  var CHECKBOX_ITEM_NAME = "DropdownMenuCheckboxItem";
  var DropdownMenuCheckboxItem$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...checkboxItemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(CheckboxItem, {
      ...menuScope,
      ...checkboxItemProps,
      ref: forwardedRef
    });
  });
  DropdownMenuCheckboxItem$1.displayName = CHECKBOX_ITEM_NAME;
  var RADIO_GROUP_NAME = "DropdownMenuRadioGroup";
  var DropdownMenuRadioGroup = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...radioGroupProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(RadioGroup, {
      ...menuScope,
      ...radioGroupProps,
      ref: forwardedRef
    });
  });
  DropdownMenuRadioGroup.displayName = RADIO_GROUP_NAME;
  var RADIO_ITEM_NAME = "DropdownMenuRadioItem";
  var DropdownMenuRadioItem$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...radioItemProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(RadioItem, {
      ...menuScope,
      ...radioItemProps,
      ref: forwardedRef
    });
  });
  DropdownMenuRadioItem$1.displayName = RADIO_ITEM_NAME;
  var INDICATOR_NAME = "DropdownMenuItemIndicator";
  var DropdownMenuItemIndicator = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(ItemIndicator, {
      ...menuScope,
      ...itemIndicatorProps,
      ref: forwardedRef
    });
  });
  DropdownMenuItemIndicator.displayName = INDICATOR_NAME;
  var SEPARATOR_NAME = "DropdownMenuSeparator";
  var DropdownMenuSeparator$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...separatorProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(Separator, {
      ...menuScope,
      ...separatorProps,
      ref: forwardedRef
    });
  });
  DropdownMenuSeparator$1.displayName = SEPARATOR_NAME;
  var ARROW_NAME = "DropdownMenuArrow";
  var DropdownMenuArrow = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...arrowProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(Arrow2, {
      ...menuScope,
      ...arrowProps,
      ref: forwardedRef
    });
  });
  DropdownMenuArrow.displayName = ARROW_NAME;
  var DropdownMenuSub = (props) => {
    const { __scopeDropdownMenu, children, open: openProp, onOpenChange, defaultOpen } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange
    });
    return jsxRuntimeExports.jsx(Sub, {
      ...menuScope,
      open,
      onOpenChange: setOpen,
      children
    });
  };
  var SUB_TRIGGER_NAME = "DropdownMenuSubTrigger";
  var DropdownMenuSubTrigger$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...subTriggerProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(SubTrigger, {
      ...menuScope,
      ...subTriggerProps,
      ref: forwardedRef
    });
  });
  DropdownMenuSubTrigger$1.displayName = SUB_TRIGGER_NAME;
  var SUB_CONTENT_NAME = "DropdownMenuSubContent";
  var DropdownMenuSubContent$1 = reactExports.forwardRef((props, forwardedRef) => {
    const { __scopeDropdownMenu, ...subContentProps } = props;
    const menuScope = useMenuScope(__scopeDropdownMenu);
    return jsxRuntimeExports.jsx(SubContent, {
      ...menuScope,
      ...subContentProps,
      ref: forwardedRef,
      style: {
        ...props.style,
        ...{
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    });
  });
  DropdownMenuSubContent$1.displayName = SUB_CONTENT_NAME;
  Root2 = DropdownMenu$1;
  Trigger = DropdownMenuTrigger$1;
  Portal2 = DropdownMenuPortal;
  Content2 = DropdownMenuContent$1;
  Group2 = DropdownMenuGroup$1;
  Label2 = DropdownMenuLabel$1;
  Item2 = DropdownMenuItem$1;
  CheckboxItem2 = DropdownMenuCheckboxItem$1;
  RadioGroup2 = DropdownMenuRadioGroup;
  RadioItem2 = DropdownMenuRadioItem$1;
  ItemIndicator2 = DropdownMenuItemIndicator;
  Separator2 = DropdownMenuSeparator$1;
  Sub2 = DropdownMenuSub;
  SubTrigger2 = DropdownMenuSubTrigger$1;
  SubContent2 = DropdownMenuSubContent$1;
  const DropdownMenu = Root2;
  const DropdownMenuTrigger = Trigger;
  const DropdownMenuGroup = Group2;
  const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => jsxRuntimeExports.jsxs(SubTrigger2, {
    ref,
    className: cn("flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
    ...props,
    children: [
      children,
      jsxRuntimeExports.jsx(LazyIcon, {
        name: "chevron-right",
        className: "ml-auto"
      })
    ]
  }));
  DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
  const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(SubContent2, {
    ref,
    className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
    ...props
  }));
  DropdownMenuSubContent.displayName = SubContent2.displayName;
  const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => jsxRuntimeExports.jsx(Portal2, {
    children: jsxRuntimeExports.jsx(Content2, {
      ref,
      sideOffset,
      className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
      ...props
    })
  }));
  DropdownMenuContent.displayName = Content2.displayName;
  const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => jsxRuntimeExports.jsx(Item2, {
    ref,
    className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
    ...props
  }));
  DropdownMenuItem.displayName = Item2.displayName;
  const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => jsxRuntimeExports.jsxs(CheckboxItem2, {
    ref,
    className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
    checked,
    ...props,
    children: [
      jsxRuntimeExports.jsx("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: jsxRuntimeExports.jsx(ItemIndicator2, {
          children: jsxRuntimeExports.jsx(LazyIcon, {
            name: "check",
            className: "h-4 w-4"
          })
        })
      }),
      children
    ]
  }));
  DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
  const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => jsxRuntimeExports.jsxs(RadioItem2, {
    ref,
    className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
    ...props,
    children: [
      jsxRuntimeExports.jsx("span", {
        className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: jsxRuntimeExports.jsx(ItemIndicator2, {
          children: jsxRuntimeExports.jsx(LazyIcon, {
            name: "circle",
            className: "h-4 w-4"
          })
        })
      }),
      children
    ]
  }));
  DropdownMenuRadioItem.displayName = RadioItem2.displayName;
  const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => jsxRuntimeExports.jsx(Label2, {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }));
  DropdownMenuLabel.displayName = Label2.displayName;
  const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx(Separator2, {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }));
  DropdownMenuSeparator.displayName = Separator2.displayName;
  function NavUser() {
    const { t } = useTranslation("sidebar");
    const { isMobile } = useSidebar();
    return jsxRuntimeExports.jsx(SidebarMenu, {
      children: jsxRuntimeExports.jsx(SidebarMenuItem, {
        children: jsxRuntimeExports.jsxs(DropdownMenu, {
          children: [
            jsxRuntimeExports.jsx(DropdownMenuTrigger, {
              asChild: true,
              children: jsxRuntimeExports.jsxs(SidebarMenuButton, {
                size: "lg",
                className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                children: [
                  jsxRuntimeExports.jsx("div", {
                    children: jsxRuntimeExports.jsx(LazyIcon, {
                      name: "settings",
                      size: 28,
                      className: "pr-2"
                    })
                  }),
                  jsxRuntimeExports.jsx(LazyIcon, {
                    name: "chevrons-up-down",
                    className: "ml-auto size-4"
                  })
                ]
              })
            }),
            jsxRuntimeExports.jsx(DropdownMenuContent, {
              className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
              side: isMobile ? "bottom" : "right",
              align: "end",
              sideOffset: 4,
              children: jsxRuntimeExports.jsx(DropdownMenuGroup, {
                children: jsxRuntimeExports.jsxs(DropdownMenuItem, {
                  children: [
                    jsxRuntimeExports.jsx(LazyIcon, {
                      name: "sparkles"
                    }),
                    t("contact")
                  ]
                })
              })
            })
          ]
        })
      })
    });
  }
  const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  });
  Badge = function({ className, variant, ...props }) {
    return jsxRuntimeExports.jsx("div", {
      className: cn(badgeVariants({
        variant
      }), className),
      ...props
    });
  };
  function NavStandaloneApp({ applications, currentSession, setCurrentSession }) {
    const { t } = useTranslation("sidebar");
    const navigate = useNavigate();
    const deleteSessionDialog = useModal(DeleteSessionDialog);
    const handleDeleteSession = reactExports.useCallback((e, id) => {
      deleteSessionDialog.show({
        id
      });
      e.preventDefault();
    }, [
      deleteSessionDialog
    ]);
    const handleSetCurrentSession = (session) => {
      setCurrentSession(session);
      navigate(getRouteURL("application", {
        applicationId: session.id
      }));
    };
    const renderBadge = (session) => {
      switch (session.main_source_type) {
        case "Thread":
          return jsxRuntimeExports.jsx(Badge, {
            className: "ml-1",
            color: "blue",
            children: t("application_types.chat")
          });
        default:
          return null;
      }
    };
    return jsxRuntimeExports.jsxs(SidebarGroup, {
      className: "group-data-[collapsible=icon]:hidden pt-0",
      children: [
        jsxRuntimeExports.jsx(SidebarGroupLabel, {
          children: jsxRuntimeExports.jsx("div", {
            className: "text-sm",
            children: t("applications")
          })
        }),
        jsxRuntimeExports.jsxs(SidebarMenu, {
          children: [
            applications == null ? void 0 : applications.map((item) => jsxRuntimeExports.jsx(SidebarMenuItem, {
              className: "cursor-pointer",
              children: jsxRuntimeExports.jsx(SidebarMenuButton, {
                asChild: true,
                onClick: () => handleSetCurrentSession(item),
                children: jsxRuntimeExports.jsxs("div", {
                  className: "flex flex-row justify-between items-center !h-auto",
                  children: [
                    jsxRuntimeExports.jsxs("div", {
                      className: "flex gap-2",
                      children: [
                        (currentSession == null ? void 0 : currentSession.id) === item.id ? jsxRuntimeExports.jsx(LazyIcon, {
                          size: 16,
                          color: "green",
                          name: "check"
                        }) : jsxRuntimeExports.jsx(LazyIcon, {
                          size: 16,
                          name: "chevron-right"
                        }),
                        jsxRuntimeExports.jsxs("span", {
                          children: [
                            item.name,
                            renderBadge(item)
                          ]
                        })
                      ]
                    }),
                    jsxRuntimeExports.jsx(LazyIcon, {
                      onClick: (e) => handleDeleteSession(e, item.id),
                      size: 16,
                      name: "trash-2"
                    })
                  ]
                })
              })
            }, item.id)),
            applications ? jsxRuntimeExports.jsx(SidebarMenuItem, {
              children: jsxRuntimeExports.jsxs(SidebarMenuButton, {
                className: "text-sidebar-foreground/70",
                children: [
                  jsxRuntimeExports.jsx(LazyIcon, {
                    name: "ellipsis",
                    className: "text-sidebar-foreground/70"
                  }),
                  jsxRuntimeExports.jsx("span", {
                    children: t("more_session")
                  })
                ]
              })
            }) : null
          ]
        })
      ]
    });
  }
  const data = {
    navMain: [
      {
        title: "playground.title",
        icon: jsxRuntimeExports.jsx(LazyIcon, {
          name: "square-terminal"
        }),
        isActive: true,
        items: [
          {
            title: "playground.drag_and_drop"
          },
          {
            title: "playground.node_connections"
          },
          {
            title: "playground.delete_nodes"
          }
        ]
      },
      {
        title: "model.title",
        url: "#",
        icon: jsxRuntimeExports.jsx(LazyIcon, {
          name: "bot"
        }),
        items: [
          {
            title: "model.llm"
          },
          {
            title: "model.embedding"
          }
        ]
      },
      {
        title: "tutorial.title",
        icon: jsxRuntimeExports.jsx(LazyIcon, {
          name: "book-open"
        }),
        items: [
          {
            title: "tutorial.get_started"
          },
          {
            title: "tutorial.chat_with_llm"
          },
          {
            title: "tutorial.ai_structured_output"
          },
          {
            title: "tutorial.tool_calling"
          },
          {
            title: "tutorial.few_shot_example"
          },
          {
            title: "tutorial.vector_database"
          }
        ]
      },
      {
        title: "application.title",
        icon: jsxRuntimeExports.jsx(LazyIcon, {
          name: "settings-2"
        }),
        items: [
          {
            title: "application.changelog"
          }
        ]
      }
    ]
  };
  function AppSidebar({ sessions, applications, currentSession, setCurrentSession, ...props }) {
    return jsxRuntimeExports.jsxs(Sidebar, {
      collapsible: "icon",
      ...props,
      children: [
        jsxRuntimeExports.jsx("div", {
          className: "h-1"
        }),
        jsxRuntimeExports.jsxs(SidebarContent, {
          children: [
            jsxRuntimeExports.jsx(NavSessions, {
              sessions: sessions || [],
              currentSession,
              setCurrentSession
            }),
            jsxRuntimeExports.jsx(NavStandaloneApp, {
              applications: applications || [],
              currentSession,
              setCurrentSession
            }),
            jsxRuntimeExports.jsx(NavDocuments, {
              items: data.navMain
            })
          ]
        }),
        jsxRuntimeExports.jsx(SidebarFooter, {
          children: jsxRuntimeExports.jsx(NavUser, {})
        }),
        jsxRuntimeExports.jsx(SidebarRail, {})
      ]
    });
  }
  function MainLayout() {
    const { t } = useTranslation("common");
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const setTheme = useAppState((state) => state.setTheme);
    const theme = useAppState((state) => state.theme);
    const currentSession = useSessionState((state) => state.currentSession);
    const sessions = useSessionState((state) => state.sessions);
    const applications = useSessionState((state) => state.applications);
    const setCurrentSession = useSessionState((state) => state.setCurrentSession);
    reactExports.useEffect(() => {
      if (!(currentSession == null ? void 0 : currentSession.id)) {
        return;
      }
      if (location.pathname.includes(getRouteURL("whiteboard"))) {
        if (!params.sessionId) {
          navigate(getRouteURL("whiteboard", {
            sessionId: currentSession == null ? void 0 : currentSession.id
          }));
        } else if (params.sessionId && params.sessionId !== (currentSession == null ? void 0 : currentSession.id)) {
          setCurrentSession(params.sessionId);
        }
      } else if (location.pathname.includes(getRouteURL("application"))) {
        if (!params.applicationId) {
          navigate(getRouteURL("application", {
            applicationId: currentSession == null ? void 0 : currentSession.id
          }));
        } else if (params.applicationId && params.applicationId !== (currentSession == null ? void 0 : currentSession.id)) {
          setCurrentSession(params.applicationId);
        }
      }
    }, [
      currentSession == null ? void 0 : currentSession.id,
      location.pathname,
      navigate,
      params.applicationId,
      params.sessionId,
      setCurrentSession
    ]);
    reactExports.useEffect(() => {
      setCurrentSession(params.sessionId || params.applicationId).then((item) => {
        if (item.type === SessionTypeEnum.StandaloneApp && window.location.pathname.includes(getRouteURL("whiteboard"))) {
          navigate(getRouteURL("application", {
            applicationId: item.id
          }));
        } else if (item.type === SessionTypeEnum.Whiteboard && window.location.pathname.includes(getRouteURL("application"))) {
          navigate(getRouteURL("whiteboard", {
            sessionId: item.id
          }));
        }
      });
    }, [
      navigate,
      params.applicationId,
      params.sessionId,
      setCurrentSession
    ]);
    const handleChangeTheme = reactExports.useCallback(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, [
      theme,
      setTheme
    ]);
    return jsxRuntimeExports.jsxs(SidebarProvider, {
      defaultOpen: false,
      children: [
        jsxRuntimeExports.jsx(AppSidebar, {
          sessions,
          applications,
          currentSession,
          setCurrentSession
        }),
        jsxRuntimeExports.jsxs(SidebarInset, {
          className: "max-h-screen overflow-hidden",
          children: [
            jsxRuntimeExports.jsxs("header", {
              className: "flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear justify-between",
              children: [
                jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center gap-2 px-4",
                  children: [
                    jsxRuntimeExports.jsx(SidebarTrigger, {}),
                    jsxRuntimeExports.jsx(Label$1, {
                      children: t("whiteboard")
                    })
                  ]
                }),
                jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center gap-2 px-4",
                  children: [
                    jsxRuntimeExports.jsx(Button, {
                      onClick: handleChangeTheme,
                      variant: "link",
                      children: jsxRuntimeExports.jsx(LazyIcon, {
                        size: 18,
                        name: theme === "dark" ? "moon" : "sun"
                      })
                    }),
                    jsxRuntimeExports.jsx("a", {
                      referrerPolicy: "no-referrer",
                      target: "_blank",
                      href: "https://github.com/zrg-team/NoLLMChat",
                      children: jsxRuntimeExports.jsx(LazyIcon, {
                        size: 18,
                        name: "github"
                      })
                    })
                  ]
                })
              ]
            }),
            jsxRuntimeExports.jsx(Separator$1, {
              className: "shrink-0"
            }),
            jsxRuntimeExports.jsx("div", {
              className: "flex flex-1 flex-col p-0 m-0 overflow-y-auto",
              children: jsxRuntimeExports.jsx(Outlet, {})
            })
          ]
        })
      ]
    });
  }
  const HomePage = reactExports.lazy(() => __vitePreload(() => import("./HomePage-D_Hs-RaH.js").then(async (m) => {
    await m.__tla;
    return m;
  }).then((n) => n.M), true ? __vite__mapDeps([0,1,2,3]) : void 0));
  const ApplicationPage = reactExports.lazy(() => __vitePreload(() => import("./ApplicationPage-DJJPRMNP.js").then(async (m) => {
    await m.__tla;
    return m;
  }), true ? __vite__mapDeps([4,1,2,5,3,6,7,8,9]) : void 0));
  const router = createBrowserRouter(createRoutesFromChildren(jsxRuntimeExports.jsxs(Route, {
    Component: MainLayout,
    children: [
      jsxRuntimeExports.jsx(Route, {
        path: APP_ROUTES.application,
        element: jsxRuntimeExports.jsx(reactExports.Suspense, {
          fallback: jsxRuntimeExports.jsx(DefaultLoader, {
            flickeringGrid: true,
            typing: false
          }),
          children: jsxRuntimeExports.jsx(ApplicationPage, {})
        })
      }),
      jsxRuntimeExports.jsx(Route, {
        path: APP_ROUTES.whiteboard,
        element: jsxRuntimeExports.jsx(reactExports.Suspense, {
          fallback: jsxRuntimeExports.jsx(DefaultLoader, {
            flickeringGrid: true,
            typing: false
          }),
          children: jsxRuntimeExports.jsx(HomePage, {})
        })
      }),
      jsxRuntimeExports.jsx(Route, {
        path: "*",
        element: jsxRuntimeExports.jsx(Navigate, {
          to: getRouteURL("whiteboard")
        })
      })
    ]
  })), {
    basename: "/NoLLMChat/"
  });
  const AppRoute = reactExports.memo(() => {
    logDebug("[BASE_URL]", "/NoLLMChat/", router.basename);
    reactExports.useEffect(() => {
      if (!window.location.pathname.includes("/NoLLMChat/")) {
        window.location.href = `${"/NoLLMChat/"}${getRouteURL("whiteboard")}`.replace("//", "/");
      }
    }, []);
    return jsxRuntimeExports.jsx(RouterProvider, {
      router
    });
  });
  routes = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: AppRoute
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  TooltipContent as $,
  Anchor2 as A,
  Button as B,
  Content2$1 as C,
  Root$5 as D,
  Content$2 as E,
  FocusScope as F,
  Group as G,
  useSize as H,
  Item as I,
  Input as J,
  Dialog as K,
  Label as L,
  DialogContent as M,
  DialogHeader as N,
  Overlay as O,
  Portal as P,
  DialogTitle as Q,
  Root as R,
  Separator as S,
  Trigger$3 as T,
  DialogDescription as U,
  DialogFooter as V,
  Badge as W,
  buttonVariants as X,
  TooltipProvider as Y,
  Tooltip as Z,
  TooltipTrigger as _,
  __tla,
  createRovingFocusGroupScope as a,
  Separator$1 as a0,
  Sidebar as a1,
  SidebarContent as a2,
  SidebarGroup as a3,
  SidebarMenu as a4,
  SidebarMenuItem as a5,
  SidebarMenuButton as a6,
  SidebarProvider as a7,
  SidebarInset as a8,
  offset$1 as a9,
  Title2 as aA,
  Description2 as aB,
  Action as aC,
  Cancel as aD,
  Portal2$1 as aE,
  Root2$1 as aF,
  Sub as aG,
  Close as aH,
  Title as aI,
  Description as aJ,
  shift$1 as aK,
  limitShift$1 as aL,
  size$1 as aM,
  arrow$2 as aN,
  routes as aO,
  flip$1 as aa,
  computePosition as ab,
  autoUpdate as ac,
  Root$4 as ad,
  Provider as ae,
  Root3$1 as af,
  Trigger$1 as ag,
  Portal$1 as ah,
  Content2$3 as ai,
  Group2 as aj,
  RadioGroup2 as ak,
  Content2 as al,
  SubTrigger2 as am,
  SubContent2 as an,
  Portal2 as ao,
  Item2 as ap,
  CheckboxItem2 as aq,
  ItemIndicator2 as ar,
  RadioItem2 as as,
  Label2 as at,
  Separator2 as au,
  Root2 as av,
  Trigger as aw,
  Sub2 as ax,
  Overlay2 as ay,
  Content2$2 as az,
  Item2$1 as b,
  createMenuScope as c,
  CheckboxItem as d,
  RadioGroup as e,
  RadioItem as f,
  ItemIndicator as g,
  Arrow2 as h,
  SubTrigger as i,
  SubContent as j,
  useId as k,
  Root3 as l,
  createPopperScope as m,
  Anchor as n,
  hideOthers as o,
  ReactRemoveScroll as p,
  useFocusGuards as q,
  Content as r,
  Arrow as s,
  Root2$2 as t,
  useDirection as u,
  Root$3 as v,
  Portal$2 as w,
  Content$1 as x,
  Label$1 as y,
  createCollapsibleScope as z
};
