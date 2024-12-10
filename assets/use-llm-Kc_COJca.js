import { r as reactExports, M as MotionConfigContext, j as jsxRuntimeExports, G as useConstant, au as PresenceContext, I as useIsomorphicLayoutEffect$1, av as LayoutGroupContext, al as getDefaultExportFromCjs, a1 as React, m as reactDomExports, aw as commonjsGlobal, ax as Buffer$1$1, ay as require$$0, az as Buffer$7, aA as process$1, Y as FlowNodeTypeEnum, aB as DEFAULT_EMBEDDING_MODEL, y as getRepository, a4 as logWarn, s as useSessionState, as as nanoid, g as cn, L as LazyIcon, p as useTranslation, h as cva, q as motion, $ as useLocalLLMState, __tla as __tla_0 } from "./index-Bs2EL0Mm.js";
import { W as Badge, __tla as __tla_1 } from "./routes-Q3DgWzwS.js";
let _defineProperty, Alert, isObject$6, isFunction$4, toString_1, _Set, FlowNodePlaceholderTypeEnum, _setToArray, Handle, In, _SetCache, _cacheHas, LLMStatusEnum, _baseIteratee, _Symbol, isArguments_1, Position, _arrayPush, RECOMMENDATION_LOCAL_LLMS, keys_1, Textarea, isArrayLike_1, isSymbol_1, _arrayMap, _baseGet, _baseUnary, identity_1, _baseGetTag, color, eq_1, _isIndex, isObject_1, _root, _baseIsEqual, _getPrototype, _arraySome, _baseAssignValue, memoize$2, NodeResizer, isBufferExports, _getAllKeys, _getAllKeysIn, _castPath, _toKey, isFunction_1, isTypedArray_1, useSyncExternalStoreExports, _basePickBy, hasIn_1, useSyncExternalStoreExports$1, Panel, useStore, useStoreApi, useNodes, ViewportPortal, SYSTEM_NODE_IDS, DISABLED_DELETE_NODE_TYPES, deepmerge$1, applyNodeChanges, index, PanOnScrollMode, Background, BackgroundVariant, Controls, MiniMap, findFlowNodesWithSource, global, _assignValue, keysIn_1, _getSymbols, _getSymbolsIn, _Uint8Array, _isPrototype, _getTag, _nodeUtilExports, _Stack, interpolateRgb, constant$1, interpolateString, defaultFlowState, LLMProviderEnum, getFlowStateActions, LLMModelTypeEnum, interpolateNumber, LLMIcon, LLMInfo, useReactFlow, useHandleConnections, filterUserConnections, AlertTitle, AlertDescription, AIInput, mustache, shimExports, useLocalLLM, useInternalNode, omitBy$1, isUndefined$1, isArray_1, isObjectLike_1, get$2;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  LLMStatusEnum = ((LLMStatusEnum2) => {
    LLMStatusEnum2["Started"] = "started";
    LLMStatusEnum2["Downloading"] = "downloading";
    LLMStatusEnum2["Downloaded"] = "downloaded";
    LLMStatusEnum2["Loading"] = "loading";
    LLMStatusEnum2["Loaded"] = "loaded";
    return LLMStatusEnum2;
  })(LLMStatusEnum || {});
  LLMModelTypeEnum = ((LLMModelTypeEnum2) => {
    LLMModelTypeEnum2["LLM"] = "LLM";
    LLMModelTypeEnum2["embedding"] = "embedding";
    LLMModelTypeEnum2["VLM"] = "VLM";
    return LLMModelTypeEnum2;
  })(LLMModelTypeEnum || {});
  LLMProviderEnum = ((LLMProviderEnum2) => {
    LLMProviderEnum2["WebLLM"] = "WebLLM";
    LLMProviderEnum2["OpenAI"] = "OpenAI";
    return LLMProviderEnum2;
  })(LLMProviderEnum || {});
  FlowNodePlaceholderTypeEnum = ((FlowNodePlaceholderTypeEnum2) => {
    FlowNodePlaceholderTypeEnum2["VECTOR_DATABASE_RETREIVER"] = "VECTOR_DATABASE_RETREIVER";
    return FlowNodePlaceholderTypeEnum2;
  })(FlowNodePlaceholderTypeEnum || {});
  class PopChildMeasure extends reactExports.Component {
    getSnapshotBeforeUpdate(prevProps) {
      const element = this.props.childRef.current;
      if (element && prevProps.isPresent && !this.props.isPresent) {
        const size = this.props.sizeRef.current;
        size.height = element.offsetHeight || 0;
        size.width = element.offsetWidth || 0;
        size.top = element.offsetTop;
        size.left = element.offsetLeft;
      }
      return null;
    }
    componentDidUpdate() {
    }
    render() {
      return this.props.children;
    }
  }
  function PopChild({ children: children2, isPresent }) {
    const id2 = reactExports.useId();
    const ref = reactExports.useRef(null);
    const size = reactExports.useRef({
      width: 0,
      height: 0,
      top: 0,
      left: 0
    });
    const { nonce } = reactExports.useContext(MotionConfigContext);
    reactExports.useInsertionEffect(() => {
      const { width, height, top, left } = size.current;
      if (isPresent || !ref.current || !width || !height) return;
      ref.current.dataset.motionPopId = id2;
      const style2 = document.createElement("style");
      if (nonce) style2.nonce = nonce;
      document.head.appendChild(style2);
      if (style2.sheet) {
        style2.sheet.insertRule(`
          [data-motion-pop-id="${id2}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `);
      }
      return () => {
        document.head.removeChild(style2);
      };
    }, [
      isPresent
    ]);
    return jsxRuntimeExports.jsx(PopChildMeasure, {
      isPresent,
      childRef: ref,
      sizeRef: size,
      children: reactExports.cloneElement(children2, {
        ref
      })
    });
  }
  const PresenceChild = ({ children: children2, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode }) => {
    const presenceChildren = useConstant(newChildrenMap);
    const id2 = reactExports.useId();
    const memoizedOnExitComplete = reactExports.useCallback((childId) => {
      presenceChildren.set(childId, true);
      for (const isComplete of presenceChildren.values()) {
        if (!isComplete) return;
      }
      onExitComplete && onExitComplete();
    }, [
      presenceChildren,
      onExitComplete
    ]);
    const context = reactExports.useMemo(() => ({
      id: id2,
      initial,
      isPresent,
      custom,
      onExitComplete: memoizedOnExitComplete,
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    }), presenceAffectsLayout ? [
      Math.random(),
      memoizedOnExitComplete
    ] : [
      isPresent,
      memoizedOnExitComplete
    ]);
    reactExports.useMemo(() => {
      presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
    }, [
      isPresent
    ]);
    reactExports.useEffect(() => {
      !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
    }, [
      isPresent
    ]);
    if (mode === "popLayout") {
      children2 = jsxRuntimeExports.jsx(PopChild, {
        isPresent,
        children: children2
      });
    }
    return jsxRuntimeExports.jsx(PresenceContext.Provider, {
      value: context,
      children: children2
    });
  };
  function newChildrenMap() {
    return /* @__PURE__ */ new Map();
  }
  const getChildKey = (child) => child.key || "";
  function onlyElements(children2) {
    const filtered = [];
    reactExports.Children.forEach(children2, (child) => {
      if (reactExports.isValidElement(child)) filtered.push(child);
    });
    return filtered;
  }
  const AnimatePresence = ({ children: children2, exitBeforeEnter, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync" }) => {
    const presentChildren = reactExports.useMemo(() => onlyElements(children2), [
      children2
    ]);
    const presentKeys = presentChildren.map(getChildKey);
    const isInitialRender = reactExports.useRef(true);
    const pendingPresentChildren = reactExports.useRef(presentChildren);
    const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
    const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
    const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
    useIsomorphicLayoutEffect$1(() => {
      isInitialRender.current = false;
      pendingPresentChildren.current = presentChildren;
      for (let i = 0; i < renderedChildren.length; i++) {
        const key = getChildKey(renderedChildren[i]);
        if (!presentKeys.includes(key)) {
          if (exitComplete.get(key) !== true) {
            exitComplete.set(key, false);
          }
        } else {
          exitComplete.delete(key);
        }
      }
    }, [
      renderedChildren,
      presentKeys.length,
      presentKeys.join("-")
    ]);
    const exitingChildren = [];
    if (presentChildren !== diffedChildren) {
      let nextChildren = [
        ...presentChildren
      ];
      for (let i = 0; i < renderedChildren.length; i++) {
        const child = renderedChildren[i];
        const key = getChildKey(child);
        if (!presentKeys.includes(key)) {
          nextChildren.splice(i, 0, child);
          exitingChildren.push(child);
        }
      }
      if (mode === "wait" && exitingChildren.length) {
        nextChildren = exitingChildren;
      }
      setRenderedChildren(onlyElements(nextChildren));
      setDiffedChildren(presentChildren);
      return;
    }
    const { forceRender } = reactExports.useContext(LayoutGroupContext);
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
      children: renderedChildren.map((child) => {
        const key = getChildKey(child);
        const isPresent = presentChildren === renderedChildren || presentKeys.includes(key);
        const onExit = () => {
          if (exitComplete.has(key)) {
            exitComplete.set(key, true);
          } else {
            return;
          }
          let isEveryExitComplete = true;
          exitComplete.forEach((isExitComplete) => {
            if (!isExitComplete) isEveryExitComplete = false;
          });
          if (isEveryExitComplete) {
            forceRender === null || forceRender === void 0 ? void 0 : forceRender();
            setRenderedChildren(pendingPresentChildren.current);
            onExitComplete && onExitComplete();
          }
        };
        return jsxRuntimeExports.jsx(PresenceChild, {
          isPresent,
          initial: !isInitialRender.current || initial ? void 0 : false,
          custom: isPresent ? void 0 : custom,
          presenceAffectsLayout,
          mode,
          onExitComplete: isPresent ? void 0 : onExit,
          children: child
        }, key);
      })
    });
  };
  function cc(names) {
    if (typeof names === "string" || typeof names === "number") return "" + names;
    let out = "";
    if (Array.isArray(names)) {
      for (let i = 0, tmp; i < names.length; i++) {
        if ((tmp = cc(names[i])) !== "") {
          out += (out && " ") + tmp;
        }
      }
    } else {
      for (let k2 in names) {
        if (names[k2]) out += (out && " ") + k2;
      }
    }
    return out;
  }
  var noop = {
    value: () => {
    }
  };
  function dispatch() {
    for (var i = 0, n2 = arguments.length, _ = {}, t2; i < n2; ++i) {
      if (!(t2 = arguments[i] + "") || t2 in _ || /[\s.]/.test(t2)) throw new Error("illegal type: " + t2);
      _[t2] = [];
    }
    return new Dispatch(_);
  }
  function Dispatch(_) {
    this._ = _;
  }
  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t2) {
      var name = "", i = t2.indexOf(".");
      if (i >= 0) name = t2.slice(i + 1), t2 = t2.slice(0, i);
      if (t2 && !types.hasOwnProperty(t2)) throw new Error("unknown type: " + t2);
      return {
        type: t2,
        name
      };
    });
  }
  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._, T = parseTypenames$1(typename + "", _), t2, i = -1, n2 = T.length;
      if (arguments.length < 2) {
        while (++i < n2) if ((t2 = (typename = T[i]).type) && (t2 = get$4(_[t2], typename.name))) return t2;
        return;
      }
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n2) {
        if (t2 = (typename = T[i]).type) _[t2] = set$1(_[t2], typename.name, callback);
        else if (callback == null) for (t2 in _) _[t2] = set$1(_[t2], typename.name, null);
      }
      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t2 in _) copy[t2] = _[t2].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n2 = arguments.length - 2) > 0) for (var args = new Array(n2), i = 0, n2, t2; i < n2; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t2 = this._[type], i = 0, n2 = t2.length; i < n2; ++i) t2[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t2 = this._[type], i = 0, n2 = t2.length; i < n2; ++i) t2[i].value.apply(that, args);
    }
  };
  function get$4(type, name) {
    for (var i = 0, n2 = type.length, c; i < n2; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }
  function set$1(type, name, callback) {
    for (var i = 0, n2 = type.length; i < n2; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({
      name,
      value: callback
    });
    return type;
  }
  var xhtml = "http://www.w3.org/1999/xhtml";
  const namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {
      space: namespaces[prefix],
      local: name
    } : name;
  }
  function creatorInherit(name) {
    return function() {
      var document2 = this.ownerDocument, uri = this.namespaceURI;
      return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
    };
  }
  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }
  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }
  function none() {
  }
  function selector(selector2) {
    return selector2 == null ? none : function() {
      return this.querySelector(selector2);
    };
  }
  function selection_select(select2) {
    if (typeof select2 !== "function") select2 = selector(select2);
    for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, subgroup = subgroups[j] = new Array(n2), node, subnode, i = 0; i < n2; ++i) {
        if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }
    return new Selection$1(subgroups, this._parents);
  }
  function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }
  function empty() {
    return [];
  }
  function selectorAll(selector2) {
    return selector2 == null ? empty : function() {
      return this.querySelectorAll(selector2);
    };
  }
  function arrayAll(select2) {
    return function() {
      return array(select2.apply(this, arguments));
    };
  }
  function selection_selectAll(select2) {
    if (typeof select2 === "function") select2 = arrayAll(select2);
    else select2 = selectorAll(select2);
    for (var groups = this._groups, m2 = groups.length, subgroups = [], parents = [], j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, node, i = 0; i < n2; ++i) {
        if (node = group[i]) {
          subgroups.push(select2.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }
    return new Selection$1(subgroups, parents);
  }
  function matcher(selector2) {
    return function() {
      return this.matches(selector2);
    };
  }
  function childMatcher(selector2) {
    return function(node) {
      return node.matches(selector2);
    };
  }
  var find = Array.prototype.find;
  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }
  function childFirst() {
    return this.firstElementChild;
  }
  function selection_selectChild(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
  }
  var filter = Array.prototype.filter;
  function children() {
    return Array.from(this.children);
  }
  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }
  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }
  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);
    for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n2; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }
    return new Selection$1(subgroups, this._parents);
  }
  function sparse(update) {
    return new Array(update.length);
  }
  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }
  function EnterNode(parent, datum2) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum2;
  }
  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector2) {
      return this._parent.querySelector(selector2);
    },
    querySelectorAll: function(selector2) {
      return this._parent.querySelectorAll(selector2);
    }
  };
  function constant$3(x) {
    return function() {
      return x;
    };
  }
  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0, node, groupLength = group.length, dataLength = data.length;
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }
  function bindKey(parent, group, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
        exit[i] = node;
      }
    }
  }
  function datum(node) {
    return node.__data__;
  }
  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
    if (typeof value !== "function") value = constant$3(value);
    for (var m2 = groups.length, update = new Array(m2), enter = new Array(m2), exit = new Array(m2), j = 0; j < m2; ++j) {
      var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
          previous._next = next || null;
        }
      }
    }
    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }
  function arraylike(data) {
    return typeof data === "object" && "length" in data ? data : Array.from(data);
  }
  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }
  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter) enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update) update = update.selection();
    }
    if (onexit == null) exit.remove();
    else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }
  function selection_merge(context) {
    var selection2 = context.selection ? context.selection() : context;
    for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m2; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n2 = group0.length, merge = merges[j] = new Array(n2), node, i = 0; i < n2; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Selection$1(merges, this._parents);
  }
  function selection_order() {
    for (var groups = this._groups, j = -1, m2 = groups.length; ++j < m2; ) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  }
  function selection_sort(compare) {
    if (!compare) compare = ascending;
    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }
    for (var groups = this._groups, m2 = groups.length, sortgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, sortgroup = sortgroups[j] = new Array(n2), node, i = 0; i < n2; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }
    return new Selection$1(sortgroups, this._parents).order();
  }
  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }
  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }
  function selection_nodes() {
    return Array.from(this);
  }
  function selection_node() {
    for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
      for (var group = groups[j], i = 0, n2 = group.length; i < n2; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }
    return null;
  }
  function selection_size() {
    let size = 0;
    for (const node of this) ++size;
    return size;
  }
  function selection_empty() {
    return !this.node();
  }
  function selection_each(callback) {
    for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
      for (var group = groups[j], i = 0, n2 = group.length, node; i < n2; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }
    return this;
  }
  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }
  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }
  function attrFunction$1(name, value) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (v2 == null) this.removeAttribute(name);
      else this.setAttribute(name, v2);
    };
  }
  function attrFunctionNS$1(fullname, value) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (v2 == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v2);
    };
  }
  function selection_attr(name, value) {
    var fullname = namespace(name);
    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
  }
  function defaultView(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
  }
  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }
  function styleFunction$1(name, value, priority) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (v2 == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v2, priority);
    };
  }
  function selection_style(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }
  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }
  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }
  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }
  function propertyFunction(name, value) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (v2 == null) delete this[name];
      else this[name] = v2;
    };
  }
  function selection_property(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }
  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }
  function classList(node) {
    return node.classList || new ClassList(node);
  }
  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }
  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };
  function classedAdd(node, names) {
    var list = classList(node), i = -1, n2 = names.length;
    while (++i < n2) list.add(names[i]);
  }
  function classedRemove(node, names) {
    var list = classList(node), i = -1, n2 = names.length;
    while (++i < n2) list.remove(names[i]);
  }
  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }
  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }
  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }
  function selection_classed(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n2 = names.length;
      while (++i < n2) if (!list.contains(names[i])) return false;
      return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }
  function textRemove() {
    this.textContent = "";
  }
  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction$1(value) {
    return function() {
      var v2 = value.apply(this, arguments);
      this.textContent = v2 == null ? "" : v2;
    };
  }
  function selection_text(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
  }
  function htmlRemove() {
    this.innerHTML = "";
  }
  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }
  function htmlFunction(value) {
    return function() {
      var v2 = value.apply(this, arguments);
      this.innerHTML = v2 == null ? "" : v2;
    };
  }
  function selection_html(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }
  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }
  function selection_raise() {
    return this.each(raise);
  }
  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function selection_lower() {
    return this.each(lower);
  }
  function selection_append(name) {
    var create2 = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create2.apply(this, arguments));
    });
  }
  function constantNull() {
    return null;
  }
  function selection_insert(name, before) {
    var create2 = typeof name === "function" ? name : creator(name), select2 = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
    });
  }
  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }
  function selection_remove() {
    return this.each(remove);
  }
  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }
  function selection_datum(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }
  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }
  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t2) {
      var name = "", i = t2.indexOf(".");
      if (i >= 0) name = t2.slice(i + 1), t2 = t2.slice(0, i);
      return {
        type: t2,
        name
      };
    });
  }
  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m2 = on.length, o; j < m2; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }
  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m2 = on.length; j < m2; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {
        type: typename.type,
        name: typename.name,
        value,
        listener,
        options
      };
      if (!on) this.__on = [
        o
      ];
      else on.push(o);
    };
  }
  function selection_on(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n2 = typenames.length, t2;
    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m2 = on.length, o; j < m2; ++j) {
        for (i = 0, o = on[j]; i < n2; ++i) {
          if ((t2 = typenames[i]).type === o.type && t2.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }
    on = value ? onAdd : onRemove;
    for (i = 0; i < n2; ++i) this.each(on(typenames[i], value, options));
    return this;
  }
  function dispatchEvent(node, type, params) {
    var window2 = defaultView(node), event = window2.CustomEvent;
    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window2.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }
    node.dispatchEvent(event);
  }
  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }
  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }
  function selection_dispatch(type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
  }
  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
      for (var group = groups[j], i = 0, n2 = group.length, node; i < n2; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }
  var root$9 = [
    null
  ];
  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }
  function selection() {
    return new Selection$1([
      [
        document.documentElement
      ]
    ], root$9);
  }
  function selection_selection() {
    return this;
  }
  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };
  function select(selector2) {
    return typeof selector2 === "string" ? new Selection$1([
      [
        document.querySelector(selector2)
      ]
    ], [
      document.documentElement
    ]) : new Selection$1([
      [
        selector2
      ]
    ], root$9);
  }
  function sourceEvent(event) {
    let sourceEvent2;
    while (sourceEvent2 = event.sourceEvent) event = sourceEvent2;
    return event;
  }
  function pointer(event, node) {
    event = sourceEvent(event);
    if (node === void 0) node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [
          point.x,
          point.y
        ];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [
          event.clientX - rect.left - node.clientLeft,
          event.clientY - rect.top - node.clientTop
        ];
      }
    }
    return [
      event.pageX,
      event.pageY
    ];
  }
  const nonpassive = {
    passive: false
  };
  const nonpassivecapture = {
    capture: true,
    passive: false
  };
  function nopropagation$1(event) {
    event.stopImmediatePropagation();
  }
  function noevent$1(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  function dragDisable(view) {
    var root2 = view.document.documentElement, selection2 = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
    if ("onselectstart" in root2) {
      selection2.on("selectstart.drag", noevent$1, nonpassivecapture);
    } else {
      root2.__noselect = root2.style.MozUserSelect;
      root2.style.MozUserSelect = "none";
    }
  }
  function yesdrag(view, noclick) {
    var root2 = view.document.documentElement, selection2 = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection2.on("click.drag", noevent$1, nonpassivecapture);
      setTimeout(function() {
        selection2.on("click.drag", null);
      }, 0);
    }
    if ("onselectstart" in root2) {
      selection2.on("selectstart.drag", null);
    } else {
      root2.style.MozUserSelect = root2.__noselect;
      delete root2.__noselect;
    }
  }
  const constant$2 = (x) => () => x;
  function DragEvent(type, { sourceEvent: sourceEvent2, subject, target, identifier, active, x, y, dx, dy, dispatch: dispatch2 }) {
    Object.defineProperties(this, {
      type: {
        value: type,
        enumerable: true,
        configurable: true
      },
      sourceEvent: {
        value: sourceEvent2,
        enumerable: true,
        configurable: true
      },
      subject: {
        value: subject,
        enumerable: true,
        configurable: true
      },
      target: {
        value: target,
        enumerable: true,
        configurable: true
      },
      identifier: {
        value: identifier,
        enumerable: true,
        configurable: true
      },
      active: {
        value: active,
        enumerable: true,
        configurable: true
      },
      x: {
        value: x,
        enumerable: true,
        configurable: true
      },
      y: {
        value: y,
        enumerable: true,
        configurable: true
      },
      dx: {
        value: dx,
        enumerable: true,
        configurable: true
      },
      dy: {
        value: dy,
        enumerable: true,
        configurable: true
      },
      _: {
        value: dispatch2
      }
    });
  }
  DragEvent.prototype.on = function() {
    var value = this._.on.apply(this._, arguments);
    return value === this._ ? this : value;
  };
  function defaultFilter$1(event) {
    return !event.ctrlKey && !event.button;
  }
  function defaultContainer() {
    return this.parentNode;
  }
  function defaultSubject(event, d) {
    return d == null ? {
      x: event.x,
      y: event.y
    } : d;
  }
  function defaultTouchable$1() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function drag() {
    var filter2 = defaultFilter$1, container = defaultContainer, subject = defaultSubject, touchable = defaultTouchable$1, gestures = {}, listeners = dispatch("start", "drag", "end"), active = 0, mousedownx, mousedowny, mousemoving, touchending, clickDistance2 = 0;
    function drag2(selection2) {
      selection2.on("mousedown.drag", mousedowned).filter(touchable).on("touchstart.drag", touchstarted).on("touchmove.drag", touchmoved, nonpassive).on("touchend.drag touchcancel.drag", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    function mousedowned(event, d) {
      if (touchending || !filter2.call(this, event, d)) return;
      var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
      if (!gesture) return;
      select(event.view).on("mousemove.drag", mousemoved, nonpassivecapture).on("mouseup.drag", mouseupped, nonpassivecapture);
      dragDisable(event.view);
      nopropagation$1(event);
      mousemoving = false;
      mousedownx = event.clientX;
      mousedowny = event.clientY;
      gesture("start", event);
    }
    function mousemoved(event) {
      noevent$1(event);
      if (!mousemoving) {
        var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
        mousemoving = dx * dx + dy * dy > clickDistance2;
      }
      gestures.mouse("drag", event);
    }
    function mouseupped(event) {
      select(event.view).on("mousemove.drag mouseup.drag", null);
      yesdrag(event.view, mousemoving);
      noevent$1(event);
      gestures.mouse("end", event);
    }
    function touchstarted(event, d) {
      if (!filter2.call(this, event, d)) return;
      var touches = event.changedTouches, c = container.call(this, event, d), n2 = touches.length, i, gesture;
      for (i = 0; i < n2; ++i) {
        if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
          nopropagation$1(event);
          gesture("start", event, touches[i]);
        }
      }
    }
    function touchmoved(event) {
      var touches = event.changedTouches, n2 = touches.length, i, gesture;
      for (i = 0; i < n2; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          noevent$1(event);
          gesture("drag", event, touches[i]);
        }
      }
    }
    function touchended(event) {
      var touches = event.changedTouches, n2 = touches.length, i, gesture;
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() {
        touchending = null;
      }, 500);
      for (i = 0; i < n2; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          nopropagation$1(event);
          gesture("end", event, touches[i]);
        }
      }
    }
    function beforestart(that, container2, event, d, identifier, touch) {
      var dispatch2 = listeners.copy(), p2 = pointer(touch || event, container2), dx, dy, s;
      if ((s = subject.call(that, new DragEvent("beforestart", {
        sourceEvent: event,
        target: drag2,
        identifier,
        active,
        x: p2[0],
        y: p2[1],
        dx: 0,
        dy: 0,
        dispatch: dispatch2
      }), d)) == null) return;
      dx = s.x - p2[0] || 0;
      dy = s.y - p2[1] || 0;
      return function gesture(type, event2, touch2) {
        var p0 = p2, n2;
        switch (type) {
          case "start":
            gestures[identifier] = gesture, n2 = active++;
            break;
          case "end":
            delete gestures[identifier], --active;
          case "drag":
            p2 = pointer(touch2 || event2, container2), n2 = active;
            break;
        }
        dispatch2.call(type, that, new DragEvent(type, {
          sourceEvent: event2,
          subject: s,
          target: drag2,
          identifier,
          active: n2,
          x: p2[0] + dx,
          y: p2[1] + dy,
          dx: p2[0] - p0[0],
          dy: p2[1] - p0[1],
          dispatch: dispatch2
        }), d);
      };
    }
    drag2.filter = function(_) {
      return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant$2(!!_), drag2) : filter2;
    };
    drag2.container = function(_) {
      return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag2) : container;
    };
    drag2.subject = function(_) {
      return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag2) : subject;
    };
    drag2.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$2(!!_), drag2) : touchable;
    };
    drag2.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? drag2 : value;
    };
    drag2.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, drag2) : Math.sqrt(clickDistance2);
    };
    return drag2;
  }
  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }
  function Color() {
  }
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  define(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  color = function(format) {
    var m2, l2;
    format = (format + "").trim().toLowerCase();
    return (m2 = reHex.exec(format)) ? (l2 = m2[1].length, m2 = parseInt(m2[1], 16), l2 === 6 ? rgbn(m2) : l2 === 3 ? new Rgb(m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, (m2 & 15) << 4 | m2 & 15, 1) : l2 === 8 ? rgba(m2 >> 24 & 255, m2 >> 16 & 255, m2 >> 8 & 255, (m2 & 255) / 255) : l2 === 4 ? rgba(m2 >> 12 & 15 | m2 >> 8 & 240, m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, ((m2 & 15) << 4 | m2 & 15) / 255) : null) : (m2 = reRgbInteger.exec(format)) ? new Rgb(m2[1], m2[2], m2[3], 1) : (m2 = reRgbPercent.exec(format)) ? new Rgb(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, 1) : (m2 = reRgbaInteger.exec(format)) ? rgba(m2[1], m2[2], m2[3], m2[4]) : (m2 = reRgbaPercent.exec(format)) ? rgba(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, m2[4]) : (m2 = reHslPercent.exec(format)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, 1) : (m2 = reHslaPercent.exec(format)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, m2[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  };
  function rgbn(n2) {
    return new Rgb(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255, 1);
  }
  function rgba(r2, g, b, a) {
    if (a <= 0) r2 = g = b = NaN;
    return new Rgb(r2, g, b, a);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r2, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r2) : new Rgb(r2, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r2, g, b, opacity) {
    this.r = +r2;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Rgb, rgb, extend(Color, {
    brighter(k2) {
      k2 = k2 == null ? brighter : Math.pow(brighter, k2);
      return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
    },
    darker(k2) {
      k2 = k2 == null ? darker : Math.pow(darker, k2);
      return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex,
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }
  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }
  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }
  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h2, s, l2, a) {
    if (a <= 0) h2 = s = l2 = NaN;
    else if (l2 <= 0 || l2 >= 1) h2 = s = NaN;
    else if (s <= 0) h2 = NaN;
    return new Hsl(h2, s, l2, a);
  }
  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r2 = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r2, g, b), max = Math.max(r2, g, b), h2 = NaN, s = max - min, l2 = (max + min) / 2;
    if (s) {
      if (r2 === max) h2 = (g - b) / s + (g < b) * 6;
      else if (g === max) h2 = (b - r2) / s + 2;
      else h2 = (r2 - g) / s + 4;
      s /= l2 < 0.5 ? max + min : 2 - max - min;
      h2 *= 60;
    } else {
      s = l2 > 0 && l2 < 1 ? 0 : h2;
    }
    return new Hsl(h2, s, l2, o.opacity);
  }
  function hsl(h2, s, l2, opacity) {
    return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s, l2, opacity == null ? 1 : opacity);
  }
  function Hsl(h2, s, l2, opacity) {
    this.h = +h2;
    this.s = +s;
    this.l = +l2;
    this.opacity = +opacity;
  }
  define(Hsl, hsl, extend(Color, {
    brighter(k2) {
      k2 = k2 == null ? brighter : Math.pow(brighter, k2);
      return new Hsl(this.h, this.s, this.l * k2, this.opacity);
    },
    darker(k2) {
      k2 = k2 == null ? darker : Math.pow(darker, k2);
      return new Hsl(this.h, this.s, this.l * k2, this.opacity);
    },
    rgb() {
      var h2 = this.h % 360 + (this.h < 0) * 360, s = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l2 = this.l, m2 = l2 + (l2 < 0.5 ? l2 : 1 - l2) * s, m1 = 2 * l2 - m2;
      return new Rgb(hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m2), hsl2rgb(h2, m1, m2), hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m2), this.opacity);
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));
  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }
  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }
  function hsl2rgb(h2, m1, m2) {
    return (h2 < 60 ? m1 + (m2 - m1) * h2 / 60 : h2 < 180 ? m2 : h2 < 240 ? m1 + (m2 - m1) * (240 - h2) / 60 : m1) * 255;
  }
  constant$1 = (x) => () => x;
  function linear(a, d) {
    return function(t2) {
      return a + t2 * d;
    };
  }
  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t2) {
      return Math.pow(a + t2 * b, y);
    };
  }
  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
  }
  interpolateRgb = function rgbGamma(y) {
    var color2 = gamma(y);
    function rgb$1(start2, end) {
      var r2 = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
      return function(t2) {
        start2.r = r2(t2);
        start2.g = g(t2);
        start2.b = b(t2);
        start2.opacity = opacity(t2);
        return start2 + "";
      };
    }
    rgb$1.gamma = rgbGamma;
    return rgb$1;
  }(1);
  interpolateNumber = function(a, b) {
    return a = +a, b = +b, function(t2) {
      return a * (1 - t2) + b * t2;
    };
  };
  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
  function zero(b) {
    return function() {
      return b;
    };
  }
  function one(b) {
    return function(t2) {
      return b(t2) + "";
    };
  }
  interpolateString = function(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q2 = [];
    a = a + "", b = b + "";
    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs;
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i]) s[i] += bm;
        else s[++i] = bm;
      } else {
        s[++i] = null;
        q2.push({
          i,
          x: interpolateNumber(am, bm)
        });
      }
      bi = reB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    return s.length < 2 ? q2[0] ? one(q2[0].x) : zero(b) : (b = q2.length, function(t2) {
      for (var i2 = 0, o; i2 < b; ++i2) s[(o = q2[i2]).i] = o.x(t2);
      return s.join("");
    });
  };
  var degrees = 180 / Math.PI;
  var identity$4 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function decompose(a, b, c, d, e2, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e2,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX,
      scaleY
    };
  }
  var svgNode;
  function parseCss(value) {
    const m2 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m2.isIdentity ? identity$4 : decompose(m2.a, m2.b, m2.c, m2.d, m2.e, m2.f);
  }
  function parseSvg(value) {
    if (value == null) return identity$4;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$4;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }
  function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }
    function translate(xa, ya, xb, yb, s, q2) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q2.push({
          i: i - 4,
          x: interpolateNumber(xa, xb)
        }, {
          i: i - 2,
          x: interpolateNumber(ya, yb)
        });
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }
    function rotate(a, b, s, q2) {
      if (a !== b) {
        if (a - b > 180) b += 360;
        else if (b - a > 180) a += 360;
        q2.push({
          i: s.push(pop(s) + "rotate(", null, degParen) - 2,
          x: interpolateNumber(a, b)
        });
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }
    function skewX(a, b, s, q2) {
      if (a !== b) {
        q2.push({
          i: s.push(pop(s) + "skewX(", null, degParen) - 2,
          x: interpolateNumber(a, b)
        });
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }
    function scale(xa, ya, xb, yb, s, q2) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q2.push({
          i: i - 4,
          x: interpolateNumber(xa, xb)
        }, {
          i: i - 2,
          x: interpolateNumber(ya, yb)
        });
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }
    return function(a, b) {
      var s = [], q2 = [];
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q2);
      rotate(a.rotate, b.rotate, s, q2);
      skewX(a.skewX, b.skewX, s, q2);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q2);
      a = b = null;
      return function(t2) {
        var i = -1, n2 = q2.length, o;
        while (++i < n2) s[(o = q2[i]).i] = o.x(t2);
        return s.join("");
      };
    };
  }
  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
  var epsilon2 = 1e-12;
  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }
  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }
  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }
  const interpolateZoom = function zoomRho(rho, rho2, rho4) {
    function zoom2(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t2) {
          return [
            ux0 + t2 * dx,
            uy0 + t2 * dy,
            w0 * Math.exp(rho * t2 * S)
          ];
        };
      } else {
        var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t2) {
          var s = t2 * S, coshr0 = cosh(r0), u2 = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u2 * dx,
            uy0 + u2 * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }
      i.duration = S * 1e3 * rho / Math.SQRT2;
      return i;
    }
    zoom2.rho = function(_) {
      var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
      return zoomRho(_1, _2, _4);
    };
    return zoom2;
  }(Math.SQRT2, 2, 4);
  var frame = 0, timeout$1 = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    setTimeout(f, 17);
  };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }
  function clearNow() {
    clockNow = 0;
  }
  function Timer() {
    this._call = this._time = this._next = null;
  }
  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };
  function timer(callback, delay, time) {
    var t2 = new Timer();
    t2.restart(callback, delay, time);
    return t2;
  }
  function timerFlush() {
    now();
    ++frame;
    var t2 = taskHead, e2;
    while (t2) {
      if ((e2 = clockNow - t2._time) >= 0) t2._call.call(void 0, e2);
      t2 = t2._next;
    }
    --frame;
  }
  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }
  function poke() {
    var now2 = clock.now(), delay = now2 - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
  }
  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }
  function sleep(time) {
    if (frame) return;
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow;
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }
  function timeout(callback, delay, time) {
    var t2 = new Timer();
    delay = delay == null ? 0 : +delay;
    t2.restart((elapsed) => {
      t2.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t2;
  }
  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];
  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;
  function schedule(node, name, id2, index2, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id2 in schedules) return;
    create(node, id2, {
      name,
      index: index2,
      group,
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }
  function init(node, id2) {
    var schedule2 = get$3(node, id2);
    if (schedule2.state > CREATED) throw new Error("too late; already scheduled");
    return schedule2;
  }
  function set(node, id2) {
    var schedule2 = get$3(node, id2);
    if (schedule2.state > STARTED) throw new Error("too late; already running");
    return schedule2;
  }
  function get$3(node, id2) {
    var schedule2 = node.__transition;
    if (!schedule2 || !(schedule2 = schedule2[id2])) throw new Error("transition not found");
    return schedule2;
  }
  function create(node, id2, self2) {
    var schedules = node.__transition, tween;
    schedules[id2] = self2;
    self2.timer = timer(schedule2, 0, self2.time);
    function schedule2(elapsed) {
      self2.state = SCHEDULED;
      self2.timer.restart(start2, self2.delay, self2.time);
      if (self2.delay <= elapsed) start2(elapsed - self2.delay);
    }
    function start2(elapsed) {
      var i, j, n2, o;
      if (self2.state !== SCHEDULED) return stop();
      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self2.name) continue;
        if (o.state === STARTED) return timeout(start2);
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        } else if (+i < id2) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }
      timeout(function() {
        if (self2.state === STARTED) {
          self2.state = RUNNING;
          self2.timer.restart(tick, self2.delay, self2.time);
          tick(elapsed);
        }
      });
      self2.state = STARTING;
      self2.on.call("start", node, node.__data__, self2.index, self2.group);
      if (self2.state !== STARTING) return;
      self2.state = STARTED;
      tween = new Array(n2 = self2.tween.length);
      for (i = 0, j = -1; i < n2; ++i) {
        if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }
    function tick(elapsed) {
      var t2 = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n2 = tween.length;
      while (++i < n2) {
        tween[i].call(node, t2);
      }
      if (self2.state === ENDING) {
        self2.on.call("end", node, node.__data__, self2.index, self2.group);
        stop();
      }
    }
    function stop() {
      self2.state = ENDED;
      self2.timer.stop();
      delete schedules[id2];
      for (var i in schedules) return;
      delete node.__transition;
    }
  }
  function interrupt(node, name) {
    var schedules = node.__transition, schedule2, active, empty2 = true, i;
    if (!schedules) return;
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule2 = schedules[i]).name !== name) {
        empty2 = false;
        continue;
      }
      active = schedule2.state > STARTING && schedule2.state < ENDING;
      schedule2.state = ENDED;
      schedule2.timer.stop();
      schedule2.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule2.index, schedule2.group);
      delete schedules[i];
    }
    if (empty2) delete node.__transition;
  }
  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }
  function tweenRemove(id2, name) {
    var tween0, tween1;
    return function() {
      var schedule2 = set(this, id2), tween = schedule2.tween;
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n2 = tween1.length; i < n2; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }
      schedule2.tween = tween1;
    };
  }
  function tweenFunction(id2, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error();
    return function() {
      var schedule2 = set(this, id2), tween = schedule2.tween;
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t2 = {
          name,
          value
        }, i = 0, n2 = tween1.length; i < n2; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t2;
            break;
          }
        }
        if (i === n2) tween1.push(t2);
      }
      schedule2.tween = tween1;
    };
  }
  function transition_tween(name, value) {
    var id2 = this._id;
    name += "";
    if (arguments.length < 2) {
      var tween = get$3(this.node(), id2).tween;
      for (var i = 0, n2 = tween.length, t2; i < n2; ++i) {
        if ((t2 = tween[i]).name === name) {
          return t2.value;
        }
      }
      return null;
    }
    return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
  }
  function tweenValue(transition, name, value) {
    var id2 = transition._id;
    transition.each(function() {
      var schedule2 = set(this, id2);
      (schedule2.value || (schedule2.value = {}))[name] = value.apply(this, arguments);
    });
    return function(node) {
      return get$3(node, id2).value[name];
    };
  }
  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber : b instanceof color ? interpolateRgb : (c = color(b)) ? (b = c, interpolateRgb) : interpolateString)(a, b);
  }
  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant(name, interpolate2, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
    };
  }
  function attrConstantNS(fullname, interpolate2, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
    };
  }
  function attrFunction(name, interpolate2, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
    };
  }
  function attrFunctionNS(fullname, interpolate2, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
    };
  }
  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }
  function attrInterpolate(name, i) {
    return function(t2) {
      this.setAttribute(name, i.call(this, t2));
    };
  }
  function attrInterpolateNS(fullname, i) {
    return function(t2) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t2));
    };
  }
  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error();
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }
  function delayFunction(id2, value) {
    return function() {
      init(this, id2).delay = +value.apply(this, arguments);
    };
  }
  function delayConstant(id2, value) {
    return value = +value, function() {
      init(this, id2).delay = value;
    };
  }
  function transition_delay(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get$3(this.node(), id2).delay;
  }
  function durationFunction(id2, value) {
    return function() {
      set(this, id2).duration = +value.apply(this, arguments);
    };
  }
  function durationConstant(id2, value) {
    return value = +value, function() {
      set(this, id2).duration = value;
    };
  }
  function transition_duration(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get$3(this.node(), id2).duration;
  }
  function easeConstant(id2, value) {
    if (typeof value !== "function") throw new Error();
    return function() {
      set(this, id2).ease = value;
    };
  }
  function transition_ease(value) {
    var id2 = this._id;
    return arguments.length ? this.each(easeConstant(id2, value)) : get$3(this.node(), id2).ease;
  }
  function easeVarying(id2, value) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (typeof v2 !== "function") throw new Error();
      set(this, id2).ease = v2;
    };
  }
  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error();
    return this.each(easeVarying(this._id, value));
  }
  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);
    for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n2; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }
    return new Transition(subgroups, this._parents, this._name, this._id);
  }
  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error();
    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m2; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n2 = group0.length, merge = merges[j] = new Array(n2), node, i = 0; i < n2; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Transition(merges, this._parents, this._name, this._id);
  }
  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t2) {
      var i = t2.indexOf(".");
      if (i >= 0) t2 = t2.slice(0, i);
      return !t2 || t2 === "start";
    });
  }
  function onFunction(id2, name, listener) {
    var on0, on1, sit = start(name) ? init : set;
    return function() {
      var schedule2 = sit(this, id2), on = schedule2.on;
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
      schedule2.on = on1;
    };
  }
  function transition_on(name, listener) {
    var id2 = this._id;
    return arguments.length < 2 ? get$3(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
  }
  function removeFunction(id2) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id2) return;
      if (parent) parent.removeChild(this);
    };
  }
  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }
  function transition_select(select2) {
    var name = this._name, id2 = this._id;
    if (typeof select2 !== "function") select2 = selector(select2);
    for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, subgroup = subgroups[j] = new Array(n2), node, subnode, i = 0; i < n2; ++i) {
        if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id2, i, subgroup, get$3(node, id2));
        }
      }
    }
    return new Transition(subgroups, this._parents, name, id2);
  }
  function transition_selectAll(select2) {
    var name = this._name, id2 = this._id;
    if (typeof select2 !== "function") select2 = selectorAll(select2);
    for (var groups = this._groups, m2 = groups.length, subgroups = [], parents = [], j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, node, i = 0; i < n2; ++i) {
        if (node = group[i]) {
          for (var children2 = select2.call(node, node.__data__, i, group), child, inherit2 = get$3(node, id2), k2 = 0, l2 = children2.length; k2 < l2; ++k2) {
            if (child = children2[k2]) {
              schedule(child, name, id2, k2, children2, inherit2);
            }
          }
          subgroups.push(children2);
          parents.push(node);
        }
      }
    }
    return new Transition(subgroups, parents, name, id2);
  }
  var Selection = selection.prototype.constructor;
  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }
  function styleNull(name, interpolate2) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, string10 = string1);
    };
  }
  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant(name, interpolate2, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
    };
  }
  function styleFunction(name, interpolate2, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
    };
  }
  function styleMaybeRemove(id2, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
    return function() {
      var schedule2 = set(this, id2), on = schedule2.on, listener = schedule2.value[key] == null ? remove2 || (remove2 = styleRemove(name)) : void 0;
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
      schedule2.on = on1;
    };
  }
  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
  }
  function styleInterpolate(name, i, priority) {
    return function(t2) {
      this.style.setProperty(name, i.call(this, t2), priority);
    };
  }
  function styleTween(name, value, priority) {
    var t2, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t2 = (i0 = i) && styleInterpolate(name, i, priority);
      return t2;
    }
    tween._value = value;
    return tween;
  }
  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error();
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }
  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }
  function transition_text(value) {
    return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
  }
  function textInterpolate(i) {
    return function(t2) {
      this.textContent = i.call(this, t2);
    };
  }
  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error();
    return this.tween(key, textTween(value));
  }
  function transition_transition() {
    var name = this._name, id0 = this._id, id1 = newId();
    for (var groups = this._groups, m2 = groups.length, j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, node, i = 0; i < n2; ++i) {
        if (node = group[i]) {
          var inherit2 = get$3(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit2.time + inherit2.delay + inherit2.duration,
            delay: 0,
            duration: inherit2.duration,
            ease: inherit2.ease
          });
        }
      }
    }
    return new Transition(groups, this._parents, name, id1);
  }
  function transition_end() {
    var on0, on1, that = this, id2 = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {
        value: reject
      }, end = {
        value: function() {
          if (--size === 0) resolve();
        }
      };
      that.each(function() {
        var schedule2 = set(this, id2), on = schedule2.on;
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }
        schedule2.on = on1;
      });
      if (size === 0) resolve();
    });
  }
  var id = 0;
  function Transition(groups, parents, name, id2) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id2;
  }
  function newId() {
    return ++id;
  }
  var selection_prototype = selection.prototype;
  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };
  function cubicInOut(t2) {
    return ((t2 *= 2) <= 1 ? t2 * t2 * t2 : (t2 -= 2) * t2 * t2 + 2) / 2;
  }
  var defaultTiming = {
    time: null,
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };
  function inherit(node, id2) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id2])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id2} not found`);
      }
    }
    return timing;
  }
  function selection_transition(name) {
    var id2, timing;
    if (name instanceof Transition) {
      id2 = name._id, name = name._name;
    } else {
      id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }
    for (var groups = this._groups, m2 = groups.length, j = 0; j < m2; ++j) {
      for (var group = groups[j], n2 = group.length, node, i = 0; i < n2; ++i) {
        if (node = group[i]) {
          schedule(node, name, id2, i, group, timing || inherit(node, id2));
        }
      }
    }
    return new Transition(groups, this._parents, name, id2);
  }
  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;
  const constant = (x) => () => x;
  function ZoomEvent(type, { sourceEvent: sourceEvent2, target, transform: transform2, dispatch: dispatch2 }) {
    Object.defineProperties(this, {
      type: {
        value: type,
        enumerable: true,
        configurable: true
      },
      sourceEvent: {
        value: sourceEvent2,
        enumerable: true,
        configurable: true
      },
      target: {
        value: target,
        enumerable: true,
        configurable: true
      },
      transform: {
        value: transform2,
        enumerable: true,
        configurable: true
      },
      _: {
        value: dispatch2
      }
    });
  }
  function Transform(k2, x, y) {
    this.k = k2;
    this.x = x;
    this.y = y;
  }
  Transform.prototype = {
    constructor: Transform,
    scale: function(k2) {
      return k2 === 1 ? this : new Transform(this.k * k2, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [
        point[0] * this.k + this.x,
        point[1] * this.k + this.y
      ];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [
        (location[0] - this.x) / this.k,
        (location[1] - this.y) / this.k
      ];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };
  var identity$3 = new Transform(1, 0, 0);
  transform.prototype = Transform.prototype;
  function transform(node) {
    while (!node.__zoom) if (!(node = node.parentNode)) return identity$3;
    return node.__zoom;
  }
  function nopropagation(event) {
    event.stopImmediatePropagation();
  }
  function noevent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  function defaultFilter(event) {
    return (!event.ctrlKey || event.type === "wheel") && !event.button;
  }
  function defaultExtent() {
    var e2 = this;
    if (e2 instanceof SVGElement) {
      e2 = e2.ownerSVGElement || e2;
      if (e2.hasAttribute("viewBox")) {
        e2 = e2.viewBox.baseVal;
        return [
          [
            e2.x,
            e2.y
          ],
          [
            e2.x + e2.width,
            e2.y + e2.height
          ]
        ];
      }
      return [
        [
          0,
          0
        ],
        [
          e2.width.baseVal.value,
          e2.height.baseVal.value
        ]
      ];
    }
    return [
      [
        0,
        0
      ],
      [
        e2.clientWidth,
        e2.clientHeight
      ]
    ];
  }
  function defaultTransform() {
    return this.__zoom || identity$3;
  }
  function defaultWheelDelta(event) {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
  }
  function defaultTouchable() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function defaultConstrain(transform2, extent, translateExtent) {
    var dx0 = transform2.invertX(extent[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent[1][1]) - translateExtent[1][1];
    return transform2.translate(dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1), dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1));
  }
  function zoom() {
    var filter2 = defaultFilter, extent = defaultExtent, constrain = defaultConstrain, wheelDelta2 = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [
      0,
      Infinity
    ], translateExtent = [
      [
        -Infinity,
        -Infinity
      ],
      [
        Infinity,
        Infinity
      ]
    ], duration = 250, interpolate2 = interpolateZoom, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
    function zoom2(selection2) {
      selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled, {
        passive: false
      }).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }
    zoom2.transform = function(collection, transform2, point, event) {
      var selection2 = collection.selection ? collection.selection() : collection;
      selection2.property("__zoom", defaultTransform);
      if (collection !== selection2) {
        schedule2(collection, transform2, point, event);
      } else {
        selection2.interrupt().each(function() {
          gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
        });
      }
    };
    zoom2.scaleBy = function(selection2, k2, p2, event) {
      zoom2.scaleTo(selection2, function() {
        var k0 = this.__zoom.k, k1 = typeof k2 === "function" ? k2.apply(this, arguments) : k2;
        return k0 * k1;
      }, p2, event);
    };
    zoom2.scaleTo = function(selection2, k2, p2, event) {
      zoom2.transform(selection2, function() {
        var e2 = extent.apply(this, arguments), t0 = this.__zoom, p0 = p2 == null ? centroid(e2) : typeof p2 === "function" ? p2.apply(this, arguments) : p2, p1 = t0.invert(p0), k1 = typeof k2 === "function" ? k2.apply(this, arguments) : k2;
        return constrain(translate(scale(t0, k1), p0, p1), e2, translateExtent);
      }, p2, event);
    };
    zoom2.translateBy = function(selection2, x, y, event) {
      zoom2.transform(selection2, function() {
        return constrain(this.__zoom.translate(typeof x === "function" ? x.apply(this, arguments) : x, typeof y === "function" ? y.apply(this, arguments) : y), extent.apply(this, arguments), translateExtent);
      }, null, event);
    };
    zoom2.translateTo = function(selection2, x, y, p2, event) {
      zoom2.transform(selection2, function() {
        var e2 = extent.apply(this, arguments), t2 = this.__zoom, p0 = p2 == null ? centroid(e2) : typeof p2 === "function" ? p2.apply(this, arguments) : p2;
        return constrain(identity$3.translate(p0[0], p0[1]).scale(t2.k).translate(typeof x === "function" ? -x.apply(this, arguments) : -x, typeof y === "function" ? -y.apply(this, arguments) : -y), e2, translateExtent);
      }, p2, event);
    };
    function scale(transform2, k2) {
      k2 = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k2));
      return k2 === transform2.k ? transform2 : new Transform(k2, transform2.x, transform2.y);
    }
    function translate(transform2, p0, p1) {
      var x = p0[0] - p1[0] * transform2.k, y = p0[1] - p1[1] * transform2.k;
      return x === transform2.x && y === transform2.y ? transform2 : new Transform(transform2.k, x, y);
    }
    function centroid(extent2) {
      return [
        (+extent2[0][0] + +extent2[1][0]) / 2,
        (+extent2[0][1] + +extent2[1][1]) / 2
      ];
    }
    function schedule2(transition, transform2, point, event) {
      transition.on("start.zoom", function() {
        gesture(this, arguments).event(event).start();
      }).on("interrupt.zoom end.zoom", function() {
        gesture(this, arguments).event(event).end();
      }).tween("zoom", function() {
        var that = this, args = arguments, g = gesture(that, args).event(event), e2 = extent.apply(that, args), p2 = point == null ? centroid(e2) : typeof point === "function" ? point.apply(that, args) : point, w2 = Math.max(e2[1][0] - e2[0][0], e2[1][1] - e2[0][1]), a = that.__zoom, b = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate2(a.invert(p2).concat(w2 / a.k), b.invert(p2).concat(w2 / b.k));
        return function(t2) {
          if (t2 === 1) t2 = b;
          else {
            var l2 = i(t2), k2 = w2 / l2[2];
            t2 = new Transform(k2, p2[0] - l2[0] * k2, p2[1] - l2[1] * k2);
          }
          g.zoom(null, t2);
        };
      });
    }
    function gesture(that, args, clean) {
      return !clean && that.__zooming || new Gesture(that, args);
    }
    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.active = 0;
      this.sourceEvent = null;
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }
    Gesture.prototype = {
      event: function(event) {
        if (event) this.sourceEvent = event;
        return this;
      },
      start: function() {
        if (++this.active === 1) {
          this.that.__zooming = this;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform2) {
        if (this.mouse && key !== "mouse") this.mouse[1] = transform2.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch") this.touch0[1] = transform2.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch") this.touch1[1] = transform2.invert(this.touch1[0]);
        this.that.__zoom = transform2;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          delete this.that.__zooming;
          this.emit("end");
        }
        return this;
      },
      emit: function(type) {
        var d = select(this.that).datum();
        listeners.call(type, this.that, new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom2,
          type,
          transform: this.that.__zoom,
          dispatch: listeners
        }), d);
      }
    };
    function wheeled(event, ...args) {
      if (!filter2.apply(this, arguments)) return;
      var g = gesture(this, args).event(event), t2 = this.__zoom, k2 = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t2.k * Math.pow(2, wheelDelta2.apply(this, arguments)))), p2 = pointer(event);
      if (g.wheel) {
        if (g.mouse[0][0] !== p2[0] || g.mouse[0][1] !== p2[1]) {
          g.mouse[1] = t2.invert(g.mouse[0] = p2);
        }
        clearTimeout(g.wheel);
      } else if (t2.k === k2) return;
      else {
        g.mouse = [
          p2,
          t2.invert(p2)
        ];
        interrupt(this);
        g.start();
      }
      noevent(event);
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate(scale(t2, k2), g.mouse[0], g.mouse[1]), g.extent, translateExtent));
      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }
    function mousedowned(event, ...args) {
      if (touchending || !filter2.apply(this, arguments)) return;
      var currentTarget = event.currentTarget, g = gesture(this, args, true).event(event), v2 = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p2 = pointer(event, currentTarget), x0 = event.clientX, y0 = event.clientY;
      dragDisable(event.view);
      nopropagation(event);
      g.mouse = [
        p2,
        this.__zoom.invert(p2)
      ];
      interrupt(this);
      g.start();
      function mousemoved(event2) {
        noevent(event2);
        if (!g.moved) {
          var dx = event2.clientX - x0, dy = event2.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.event(event2).zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event2, currentTarget), g.mouse[1]), g.extent, translateExtent));
      }
      function mouseupped(event2) {
        v2.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event2.view, g.moved);
        noevent(event2);
        g.event(event2).end();
      }
    }
    function dblclicked(event, ...args) {
      if (!filter2.apply(this, arguments)) return;
      var t0 = this.__zoom, p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p0), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);
      noevent(event);
      if (duration > 0) select(this).transition().duration(duration).call(schedule2, t1, p0, event);
      else select(this).call(zoom2.transform, t1, p0, event);
    }
    function touchstarted(event, ...args) {
      if (!filter2.apply(this, arguments)) return;
      var touches = event.touches, n2 = touches.length, g = gesture(this, args, event.changedTouches.length === n2).event(event), started, i, t2, p2;
      nopropagation(event);
      for (i = 0; i < n2; ++i) {
        t2 = touches[i], p2 = pointer(t2, this);
        p2 = [
          p2,
          this.__zoom.invert(p2),
          t2.identifier
        ];
        if (!g.touch0) g.touch0 = p2, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p2[2]) g.touch1 = p2, g.taps = 0;
      }
      if (touchstarting) touchstarting = clearTimeout(touchstarting);
      if (started) {
        if (g.taps < 2) touchfirst = p2[0], touchstarting = setTimeout(function() {
          touchstarting = null;
        }, touchDelay);
        interrupt(this);
        g.start();
      }
    }
    function touchmoved(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event), touches = event.changedTouches, n2 = touches.length, i, t2, p2, l2;
      noevent(event);
      for (i = 0; i < n2; ++i) {
        t2 = touches[i], p2 = pointer(t2, this);
        if (g.touch0 && g.touch0[2] === t2.identifier) g.touch0[0] = p2;
        else if (g.touch1 && g.touch1[2] === t2.identifier) g.touch1[0] = p2;
      }
      t2 = g.that.__zoom;
      if (g.touch1) {
        var p0 = g.touch0[0], l0 = g.touch0[1], p1 = g.touch1[0], l1 = g.touch1[1], dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
        t2 = scale(t2, Math.sqrt(dp / dl));
        p2 = [
          (p0[0] + p1[0]) / 2,
          (p0[1] + p1[1]) / 2
        ];
        l2 = [
          (l0[0] + l1[0]) / 2,
          (l0[1] + l1[1]) / 2
        ];
      } else if (g.touch0) p2 = g.touch0[0], l2 = g.touch0[1];
      else return;
      g.zoom("touch", constrain(translate(t2, p2, l2), g.extent, translateExtent));
    }
    function touchended(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event), touches = event.changedTouches, n2 = touches.length, i, t2;
      nopropagation(event);
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() {
        touchending = null;
      }, touchDelay);
      for (i = 0; i < n2; ++i) {
        t2 = touches[i];
        if (g.touch0 && g.touch0[2] === t2.identifier) delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t2.identifier) delete g.touch1;
      }
      if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
      if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else {
        g.end();
        if (g.taps === 2) {
          t2 = pointer(t2, this);
          if (Math.hypot(touchfirst[0] - t2[0], touchfirst[1] - t2[1]) < tapDistance) {
            var p2 = select(this).on("dblclick.zoom");
            if (p2) p2.apply(this, arguments);
          }
        }
      }
    }
    zoom2.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta2 = typeof _ === "function" ? _ : constant(+_), zoom2) : wheelDelta2;
    };
    zoom2.filter = function(_) {
      return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant(!!_), zoom2) : filter2;
    };
    zoom2.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom2) : touchable;
    };
    zoom2.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant([
        [
          +_[0][0],
          +_[0][1]
        ],
        [
          +_[1][0],
          +_[1][1]
        ]
      ]), zoom2) : extent;
    };
    zoom2.scaleExtent = function(_) {
      return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom2) : [
        scaleExtent[0],
        scaleExtent[1]
      ];
    };
    zoom2.translateExtent = function(_) {
      return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom2) : [
        [
          translateExtent[0][0],
          translateExtent[0][1]
        ],
        [
          translateExtent[1][0],
          translateExtent[1][1]
        ]
      ];
    };
    zoom2.constrain = function(_) {
      return arguments.length ? (constrain = _, zoom2) : constrain;
    };
    zoom2.duration = function(_) {
      return arguments.length ? (duration = +_, zoom2) : duration;
    };
    zoom2.interpolate = function(_) {
      return arguments.length ? (interpolate2 = _, zoom2) : interpolate2;
    };
    zoom2.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom2 : value;
    };
    zoom2.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom2) : Math.sqrt(clickDistance2);
    };
    zoom2.tapDistance = function(_) {
      return arguments.length ? (tapDistance = +_, zoom2) : tapDistance;
    };
    return zoom2;
  }
  const errorMessages = {
    error001: () => "[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001",
    error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
    error003: (nodeType) => `Node type "${nodeType}" not found. Using fallback type "default".`,
    error004: () => "The React Flow parent container needs a width and a height to render the graph.",
    error005: () => "Only child nodes can use a parent extent.",
    error006: () => "Can't create edge. An edge needs a source and a target.",
    error007: (id2) => `The old edge with id=${id2} does not exist.`,
    error009: (type) => `Marker type "${type}" doesn't exist.`,
    error008: (handleType, { id: id2, sourceHandle, targetHandle }) => `Couldn't create edge for ${handleType} handle id: "${handleType === "source" ? sourceHandle : targetHandle}", edge id: ${id2}.`,
    error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
    error011: (edgeType) => `Edge type "${edgeType}" not found. Using fallback type "default".`,
    error012: (id2) => `Node with id "${id2}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
    error013: (lib = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${lib}/dist/style.css' or base.css to make sure everything is working properly.`
  };
  const infiniteExtent = [
    [
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    ],
    [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY
    ]
  ];
  const elementSelectionKeys = [
    "Enter",
    " ",
    "Escape"
  ];
  var ConnectionMode;
  (function(ConnectionMode2) {
    ConnectionMode2["Strict"] = "strict";
    ConnectionMode2["Loose"] = "loose";
  })(ConnectionMode || (ConnectionMode = {}));
  (function(PanOnScrollMode2) {
    PanOnScrollMode2["Free"] = "free";
    PanOnScrollMode2["Vertical"] = "vertical";
    PanOnScrollMode2["Horizontal"] = "horizontal";
  })(PanOnScrollMode || (PanOnScrollMode = {}));
  var SelectionMode;
  (function(SelectionMode2) {
    SelectionMode2["Partial"] = "partial";
    SelectionMode2["Full"] = "full";
  })(SelectionMode || (SelectionMode = {}));
  const initialConnection = {
    inProgress: false,
    isValid: null,
    from: null,
    fromHandle: null,
    fromPosition: null,
    fromNode: null,
    to: null,
    toHandle: null,
    toPosition: null,
    toNode: null
  };
  var ConnectionLineType;
  (function(ConnectionLineType2) {
    ConnectionLineType2["Bezier"] = "default";
    ConnectionLineType2["Straight"] = "straight";
    ConnectionLineType2["Step"] = "step";
    ConnectionLineType2["SmoothStep"] = "smoothstep";
    ConnectionLineType2["SimpleBezier"] = "simplebezier";
  })(ConnectionLineType || (ConnectionLineType = {}));
  var MarkerType;
  (function(MarkerType2) {
    MarkerType2["Arrow"] = "arrow";
    MarkerType2["ArrowClosed"] = "arrowclosed";
  })(MarkerType || (MarkerType = {}));
  (function(Position2) {
    Position2["Left"] = "left";
    Position2["Top"] = "top";
    Position2["Right"] = "right";
    Position2["Bottom"] = "bottom";
  })(Position || (Position = {}));
  const oppositePosition = {
    [Position.Left]: Position.Right,
    [Position.Right]: Position.Left,
    [Position.Top]: Position.Bottom,
    [Position.Bottom]: Position.Top
  };
  function areConnectionMapsEqual(a, b) {
    if (!a && !b) {
      return true;
    }
    if (!a || !b || a.size !== b.size) {
      return false;
    }
    if (!a.size && !b.size) {
      return true;
    }
    for (const key of a.keys()) {
      if (!b.has(key)) {
        return false;
      }
    }
    return true;
  }
  function handleConnectionChange(a, b, cb) {
    if (!cb) {
      return;
    }
    const diff = [];
    a.forEach((connection, key) => {
      if (!(b == null ? void 0 : b.has(key))) {
        diff.push(connection);
      }
    });
    if (diff.length) {
      cb(diff);
    }
  }
  function getConnectionStatus(isValid) {
    return isValid === null ? null : isValid ? "valid" : "invalid";
  }
  const isEdgeBase = (element) => "id" in element && "source" in element && "target" in element;
  const isNodeBase = (element) => "id" in element && "position" in element && !("source" in element) && !("target" in element);
  const isInternalNodeBase = (element) => "id" in element && "internals" in element && !("source" in element) && !("target" in element);
  const getNodePositionWithOrigin = (node, nodeOrigin = [
    0,
    0
  ]) => {
    const { width, height } = getNodeDimensions(node);
    const origin = node.origin ?? nodeOrigin;
    const offsetX = width * origin[0];
    const offsetY = height * origin[1];
    return {
      x: node.position.x - offsetX,
      y: node.position.y - offsetY
    };
  };
  const getNodesBounds = (nodes, params = {
    nodeOrigin: [
      0,
      0
    ],
    nodeLookup: void 0
  }) => {
    if (nodes.length === 0) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
    const box = nodes.reduce((currBox, nodeOrId) => {
      const isId = typeof nodeOrId === "string";
      let currentNode = !params.nodeLookup && !isId ? nodeOrId : void 0;
      if (params.nodeLookup) {
        currentNode = isId ? params.nodeLookup.get(nodeOrId) : !isInternalNodeBase(nodeOrId) ? params.nodeLookup.get(nodeOrId.id) : nodeOrId;
      }
      const nodeBox = currentNode ? nodeToBox(currentNode, params.nodeOrigin) : {
        x: 0,
        y: 0,
        x2: 0,
        y2: 0
      };
      return getBoundsOfBoxes(currBox, nodeBox);
    }, {
      x: Infinity,
      y: Infinity,
      x2: -Infinity,
      y2: -Infinity
    });
    return boxToRect(box);
  };
  const getInternalNodesBounds = (nodeLookup, params = {}) => {
    if (nodeLookup.size === 0) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
    let box = {
      x: Infinity,
      y: Infinity,
      x2: -Infinity,
      y2: -Infinity
    };
    nodeLookup.forEach((node) => {
      if (params.filter === void 0 || params.filter(node)) {
        const nodeBox = nodeToBox(node);
        box = getBoundsOfBoxes(box, nodeBox);
      }
    });
    return boxToRect(box);
  };
  const getNodesInside = (nodes, rect, [tx, ty, tScale] = [
    0,
    0,
    1
  ], partially = false, excludeNonSelectableNodes = false) => {
    const paneRect = {
      ...pointToRendererPoint(rect, [
        tx,
        ty,
        tScale
      ]),
      width: rect.width / tScale,
      height: rect.height / tScale
    };
    const visibleNodes = [];
    for (const node of nodes.values()) {
      const { measured, selectable = true, hidden = false } = node;
      if (excludeNonSelectableNodes && !selectable || hidden) {
        continue;
      }
      const width = measured.width ?? node.width ?? node.initialWidth ?? null;
      const height = measured.height ?? node.height ?? node.initialHeight ?? null;
      const overlappingArea = getOverlappingArea(paneRect, nodeToRect(node));
      const area = (width ?? 0) * (height ?? 0);
      const partiallyVisible = partially && overlappingArea > 0;
      const forceInitialRender = !node.internals.handleBounds;
      const isVisible = forceInitialRender || partiallyVisible || overlappingArea >= area;
      if (isVisible || node.dragging) {
        visibleNodes.push(node);
      }
    }
    return visibleNodes;
  };
  const getConnectedEdges = (nodes, edges) => {
    const nodeIds = /* @__PURE__ */ new Set();
    nodes.forEach((node) => {
      nodeIds.add(node.id);
    });
    return edges.filter((edge) => nodeIds.has(edge.source) || nodeIds.has(edge.target));
  };
  function getFitViewNodes(nodeLookup, options) {
    const fitViewNodes = /* @__PURE__ */ new Map();
    const optionNodeIds = (options == null ? void 0 : options.nodes) ? new Set(options.nodes.map((node) => node.id)) : null;
    nodeLookup.forEach((n2) => {
      const isVisible = n2.measured.width && n2.measured.height && ((options == null ? void 0 : options.includeHiddenNodes) || !n2.hidden);
      if (isVisible && (!optionNodeIds || optionNodeIds.has(n2.id))) {
        fitViewNodes.set(n2.id, n2);
      }
    });
    return fitViewNodes;
  }
  async function fitView({ nodes, width, height, panZoom, minZoom, maxZoom }, options) {
    if (nodes.size === 0) {
      return Promise.resolve(false);
    }
    const bounds = getInternalNodesBounds(nodes);
    const viewport = getViewportForBounds(bounds, width, height, (options == null ? void 0 : options.minZoom) ?? minZoom, (options == null ? void 0 : options.maxZoom) ?? maxZoom, (options == null ? void 0 : options.padding) ?? 0.1);
    await panZoom.setViewport(viewport, {
      duration: options == null ? void 0 : options.duration
    });
    return Promise.resolve(true);
  }
  function calculateNodePosition({ nodeId, nextPosition, nodeLookup, nodeOrigin = [
    0,
    0
  ], nodeExtent, onError }) {
    const node = nodeLookup.get(nodeId);
    const parentNode = node.parentId ? nodeLookup.get(node.parentId) : void 0;
    const { x: parentX, y: parentY } = parentNode ? parentNode.internals.positionAbsolute : {
      x: 0,
      y: 0
    };
    const origin = node.origin ?? nodeOrigin;
    let extent = nodeExtent;
    if (node.extent === "parent" && !node.expandParent) {
      if (!parentNode) {
        onError == null ? void 0 : onError("005", errorMessages["error005"]());
      } else {
        const parentWidth = parentNode.measured.width;
        const parentHeight = parentNode.measured.height;
        if (parentWidth && parentHeight) {
          extent = [
            [
              parentX,
              parentY
            ],
            [
              parentX + parentWidth,
              parentY + parentHeight
            ]
          ];
        }
      }
    } else if (parentNode && isCoordinateExtent(node.extent)) {
      extent = [
        [
          node.extent[0][0] + parentX,
          node.extent[0][1] + parentY
        ],
        [
          node.extent[1][0] + parentX,
          node.extent[1][1] + parentY
        ]
      ];
    }
    const positionAbsolute = isCoordinateExtent(extent) ? clampPosition(nextPosition, extent, node.measured) : nextPosition;
    return {
      position: {
        x: positionAbsolute.x - parentX + node.measured.width * origin[0],
        y: positionAbsolute.y - parentY + node.measured.height * origin[1]
      },
      positionAbsolute
    };
  }
  async function getElementsToRemove({ nodesToRemove = [], edgesToRemove = [], nodes, edges, onBeforeDelete }) {
    const nodeIds = new Set(nodesToRemove.map((node) => node.id));
    const matchingNodes = [];
    for (const node of nodes) {
      if (node.deletable === false) {
        continue;
      }
      const isIncluded = nodeIds.has(node.id);
      const parentHit = !isIncluded && node.parentId && matchingNodes.find((n2) => n2.id === node.parentId);
      if (isIncluded || parentHit) {
        matchingNodes.push(node);
      }
    }
    const edgeIds = new Set(edgesToRemove.map((edge) => edge.id));
    const deletableEdges = edges.filter((edge) => edge.deletable !== false);
    const connectedEdges = getConnectedEdges(matchingNodes, deletableEdges);
    const matchingEdges = connectedEdges;
    for (const edge of deletableEdges) {
      const isIncluded = edgeIds.has(edge.id);
      if (isIncluded && !matchingEdges.find((e2) => e2.id === edge.id)) {
        matchingEdges.push(edge);
      }
    }
    if (!onBeforeDelete) {
      return {
        edges: matchingEdges,
        nodes: matchingNodes
      };
    }
    const onBeforeDeleteResult = await onBeforeDelete({
      nodes: matchingNodes,
      edges: matchingEdges
    });
    if (typeof onBeforeDeleteResult === "boolean") {
      return onBeforeDeleteResult ? {
        edges: matchingEdges,
        nodes: matchingNodes
      } : {
        edges: [],
        nodes: []
      };
    }
    return onBeforeDeleteResult;
  }
  const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);
  const clampPosition = (position = {
    x: 0,
    y: 0
  }, extent, dimensions) => ({
    x: clamp(position.x, extent[0][0], extent[1][0] - ((dimensions == null ? void 0 : dimensions.width) ?? 0)),
    y: clamp(position.y, extent[0][1], extent[1][1] - ((dimensions == null ? void 0 : dimensions.height) ?? 0))
  });
  function clampPositionToParent(childPosition, childDimensions, parent) {
    const { width: parentWidth, height: parentHeight } = getNodeDimensions(parent);
    const { x: parentX, y: parentY } = parent.internals.positionAbsolute;
    return clampPosition(childPosition, [
      [
        parentX,
        parentY
      ],
      [
        parentX + parentWidth,
        parentY + parentHeight
      ]
    ], childDimensions);
  }
  const calcAutoPanVelocity = (value, min, max) => {
    if (value < min) {
      return clamp(Math.abs(value - min), 1, min) / min;
    } else if (value > max) {
      return -clamp(Math.abs(value - max), 1, min) / min;
    }
    return 0;
  };
  const calcAutoPan = (pos, bounds, speed = 15, distance2 = 40) => {
    const xMovement = calcAutoPanVelocity(pos.x, distance2, bounds.width - distance2) * speed;
    const yMovement = calcAutoPanVelocity(pos.y, distance2, bounds.height - distance2) * speed;
    return [
      xMovement,
      yMovement
    ];
  };
  const getBoundsOfBoxes = (box1, box2) => ({
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2)
  });
  const rectToBox = ({ x, y, width, height }) => ({
    x,
    y,
    x2: x + width,
    y2: y + height
  });
  const boxToRect = ({ x, y, x2, y2 }) => ({
    x,
    y,
    width: x2 - x,
    height: y2 - y
  });
  const nodeToRect = (node, nodeOrigin = [
    0,
    0
  ]) => {
    var _a, _b;
    const { x, y } = isInternalNodeBase(node) ? node.internals.positionAbsolute : getNodePositionWithOrigin(node, nodeOrigin);
    return {
      x,
      y,
      width: ((_a = node.measured) == null ? void 0 : _a.width) ?? node.width ?? node.initialWidth ?? 0,
      height: ((_b = node.measured) == null ? void 0 : _b.height) ?? node.height ?? node.initialHeight ?? 0
    };
  };
  const nodeToBox = (node, nodeOrigin = [
    0,
    0
  ]) => {
    var _a, _b;
    const { x, y } = isInternalNodeBase(node) ? node.internals.positionAbsolute : getNodePositionWithOrigin(node, nodeOrigin);
    return {
      x,
      y,
      x2: x + (((_a = node.measured) == null ? void 0 : _a.width) ?? node.width ?? node.initialWidth ?? 0),
      y2: y + (((_b = node.measured) == null ? void 0 : _b.height) ?? node.height ?? node.initialHeight ?? 0)
    };
  };
  const getBoundsOfRects = (rect1, rect2) => boxToRect(getBoundsOfBoxes(rectToBox(rect1), rectToBox(rect2)));
  const getOverlappingArea = (rectA, rectB) => {
    const xOverlap = Math.max(0, Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x));
    const yOverlap = Math.max(0, Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y));
    return Math.ceil(xOverlap * yOverlap);
  };
  const isRectObject = (obj) => isNumeric(obj.width) && isNumeric(obj.height) && isNumeric(obj.x) && isNumeric(obj.y);
  const isNumeric = (n2) => !isNaN(n2) && isFinite(n2);
  const devWarn = (id2, message) => {
  };
  const snapPosition = (position, snapGrid = [
    1,
    1
  ]) => {
    return {
      x: snapGrid[0] * Math.round(position.x / snapGrid[0]),
      y: snapGrid[1] * Math.round(position.y / snapGrid[1])
    };
  };
  const pointToRendererPoint = ({ x, y }, [tx, ty, tScale], snapToGrid = false, snapGrid = [
    1,
    1
  ]) => {
    const position = {
      x: (x - tx) / tScale,
      y: (y - ty) / tScale
    };
    return snapToGrid ? snapPosition(position, snapGrid) : position;
  };
  const rendererPointToPoint = ({ x, y }, [tx, ty, tScale]) => {
    return {
      x: x * tScale + tx,
      y: y * tScale + ty
    };
  };
  const getViewportForBounds = (bounds, width, height, minZoom, maxZoom, padding) => {
    const xZoom = width / (bounds.width * (1 + padding));
    const yZoom = height / (bounds.height * (1 + padding));
    const zoom2 = Math.min(xZoom, yZoom);
    const clampedZoom = clamp(zoom2, minZoom, maxZoom);
    const boundsCenterX = bounds.x + bounds.width / 2;
    const boundsCenterY = bounds.y + bounds.height / 2;
    const x = width / 2 - boundsCenterX * clampedZoom;
    const y = height / 2 - boundsCenterY * clampedZoom;
    return {
      x,
      y,
      zoom: clampedZoom
    };
  };
  const isMacOs = () => {
    var _a;
    return typeof navigator !== "undefined" && ((_a = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : _a.indexOf("Mac")) >= 0;
  };
  function isCoordinateExtent(extent) {
    return extent !== void 0 && extent !== "parent";
  }
  function getNodeDimensions(node) {
    var _a, _b;
    return {
      width: ((_a = node.measured) == null ? void 0 : _a.width) ?? node.width ?? node.initialWidth ?? 0,
      height: ((_b = node.measured) == null ? void 0 : _b.height) ?? node.height ?? node.initialHeight ?? 0
    };
  }
  function nodeHasDimensions(node) {
    var _a, _b;
    return (((_a = node.measured) == null ? void 0 : _a.width) ?? node.width ?? node.initialWidth) !== void 0 && (((_b = node.measured) == null ? void 0 : _b.height) ?? node.height ?? node.initialHeight) !== void 0;
  }
  function evaluateAbsolutePosition(position, dimensions = {
    width: 0,
    height: 0
  }, parentId, nodeLookup, nodeOrigin) {
    const positionAbsolute = {
      ...position
    };
    const parent = nodeLookup.get(parentId);
    if (parent) {
      const origin = parent.origin || nodeOrigin;
      positionAbsolute.x += parent.internals.positionAbsolute.x - (dimensions.width ?? 0) * origin[0];
      positionAbsolute.y += parent.internals.positionAbsolute.y - (dimensions.height ?? 0) * origin[1];
    }
    return positionAbsolute;
  }
  function getPointerPosition(event, { snapGrid = [
    0,
    0
  ], snapToGrid = false, transform: transform2, containerBounds }) {
    const { x, y } = getEventPosition(event);
    const pointerPos = pointToRendererPoint({
      x: x - ((containerBounds == null ? void 0 : containerBounds.left) ?? 0),
      y: y - ((containerBounds == null ? void 0 : containerBounds.top) ?? 0)
    }, transform2);
    const { x: xSnapped, y: ySnapped } = snapToGrid ? snapPosition(pointerPos, snapGrid) : pointerPos;
    return {
      xSnapped,
      ySnapped,
      ...pointerPos
    };
  }
  const getDimensions = (node) => ({
    width: node.offsetWidth,
    height: node.offsetHeight
  });
  const getHostForElement = (element) => {
    var _a;
    return ((_a = element.getRootNode) == null ? void 0 : _a.call(element)) || (window == null ? void 0 : window.document);
  };
  const inputTags = [
    "INPUT",
    "SELECT",
    "TEXTAREA"
  ];
  function isInputDOMNode(event) {
    var _a, _b;
    const target = ((_b = (_a = event.composedPath) == null ? void 0 : _a.call(event)) == null ? void 0 : _b[0]) || event.target;
    const isInput = inputTags.includes(target == null ? void 0 : target.nodeName) || (target == null ? void 0 : target.hasAttribute("contenteditable"));
    return isInput || !!(target == null ? void 0 : target.closest(".nokey"));
  }
  const isMouseEvent = (event) => "clientX" in event;
  const getEventPosition = (event, bounds) => {
    var _a, _b;
    const isMouse = isMouseEvent(event);
    const evtX = isMouse ? event.clientX : (_a = event.touches) == null ? void 0 : _a[0].clientX;
    const evtY = isMouse ? event.clientY : (_b = event.touches) == null ? void 0 : _b[0].clientY;
    return {
      x: evtX - ((bounds == null ? void 0 : bounds.left) ?? 0),
      y: evtY - ((bounds == null ? void 0 : bounds.top) ?? 0)
    };
  };
  const getHandleBounds = (type, nodeElement, nodeBounds, zoom2, nodeId) => {
    const handles = nodeElement.querySelectorAll(`.${type}`);
    if (!handles || !handles.length) {
      return null;
    }
    return Array.from(handles).map((handle) => {
      const handleBounds = handle.getBoundingClientRect();
      return {
        id: handle.getAttribute("data-handleid"),
        type,
        nodeId,
        position: handle.getAttribute("data-handlepos"),
        x: (handleBounds.left - nodeBounds.left) / zoom2,
        y: (handleBounds.top - nodeBounds.top) / zoom2,
        ...getDimensions(handle)
      };
    });
  };
  function getBezierEdgeCenter({ sourceX, sourceY, targetX, targetY, sourceControlX, sourceControlY, targetControlX, targetControlY }) {
    const centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
    const centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
    const offsetX = Math.abs(centerX - sourceX);
    const offsetY = Math.abs(centerY - sourceY);
    return [
      centerX,
      centerY,
      offsetX,
      offsetY
    ];
  }
  function calculateControlOffset(distance2, curvature) {
    if (distance2 >= 0) {
      return 0.5 * distance2;
    }
    return curvature * 25 * Math.sqrt(-distance2);
  }
  function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
    switch (pos) {
      case Position.Left:
        return [
          x1 - calculateControlOffset(x1 - x2, c),
          y1
        ];
      case Position.Right:
        return [
          x1 + calculateControlOffset(x2 - x1, c),
          y1
        ];
      case Position.Top:
        return [
          x1,
          y1 - calculateControlOffset(y1 - y2, c)
        ];
      case Position.Bottom:
        return [
          x1,
          y1 + calculateControlOffset(y2 - y1, c)
        ];
    }
  }
  function getBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25 }) {
    const [sourceControlX, sourceControlY] = getControlWithCurvature({
      pos: sourcePosition,
      x1: sourceX,
      y1: sourceY,
      x2: targetX,
      y2: targetY,
      c: curvature
    });
    const [targetControlX, targetControlY] = getControlWithCurvature({
      pos: targetPosition,
      x1: targetX,
      y1: targetY,
      x2: sourceX,
      y2: sourceY,
      c: curvature
    });
    const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourceControlX,
      sourceControlY,
      targetControlX,
      targetControlY
    });
    return [
      `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
      labelX,
      labelY,
      offsetX,
      offsetY
    ];
  }
  function getEdgeCenter({ sourceX, sourceY, targetX, targetY }) {
    const xOffset = Math.abs(targetX - sourceX) / 2;
    const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
    const yOffset = Math.abs(targetY - sourceY) / 2;
    const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
    return [
      centerX,
      centerY,
      xOffset,
      yOffset
    ];
  }
  function getElevatedEdgeZIndex({ sourceNode, targetNode, selected: selected2 = false, zIndex = 0, elevateOnSelect = false }) {
    if (!elevateOnSelect) {
      return zIndex;
    }
    const edgeOrConnectedNodeSelected = selected2 || targetNode.selected || sourceNode.selected;
    const selectedZIndex = Math.max(sourceNode.internals.z || 0, targetNode.internals.z || 0, 1e3);
    return zIndex + (edgeOrConnectedNodeSelected ? selectedZIndex : 0);
  }
  function isEdgeVisible({ sourceNode, targetNode, width, height, transform: transform2 }) {
    const edgeBox = getBoundsOfBoxes(nodeToBox(sourceNode), nodeToBox(targetNode));
    if (edgeBox.x === edgeBox.x2) {
      edgeBox.x2 += 1;
    }
    if (edgeBox.y === edgeBox.y2) {
      edgeBox.y2 += 1;
    }
    const viewRect = {
      x: -transform2[0] / transform2[2],
      y: -transform2[1] / transform2[2],
      width: width / transform2[2],
      height: height / transform2[2]
    };
    return getOverlappingArea(viewRect, boxToRect(edgeBox)) > 0;
  }
  const getEdgeId = ({ source, sourceHandle, target, targetHandle }) => `xy-edge__${source}${sourceHandle || ""}-${target}${targetHandle || ""}`;
  const connectionExists = (edge, edges) => {
    return edges.some((el) => el.source === edge.source && el.target === edge.target && (el.sourceHandle === edge.sourceHandle || !el.sourceHandle && !edge.sourceHandle) && (el.targetHandle === edge.targetHandle || !el.targetHandle && !edge.targetHandle));
  };
  const addEdge = (edgeParams, edges) => {
    if (!edgeParams.source || !edgeParams.target) {
      return edges;
    }
    let edge;
    if (isEdgeBase(edgeParams)) {
      edge = {
        ...edgeParams
      };
    } else {
      edge = {
        ...edgeParams,
        id: getEdgeId(edgeParams)
      };
    }
    if (connectionExists(edge, edges)) {
      return edges;
    }
    if (edge.sourceHandle === null) {
      delete edge.sourceHandle;
    }
    if (edge.targetHandle === null) {
      delete edge.targetHandle;
    }
    return edges.concat(edge);
  };
  function getStraightPath({ sourceX, sourceY, targetX, targetY }) {
    const [labelX, labelY, offsetX, offsetY] = getEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY
    });
    return [
      `M ${sourceX},${sourceY}L ${targetX},${targetY}`,
      labelX,
      labelY,
      offsetX,
      offsetY
    ];
  }
  const handleDirections = {
    [Position.Left]: {
      x: -1,
      y: 0
    },
    [Position.Right]: {
      x: 1,
      y: 0
    },
    [Position.Top]: {
      x: 0,
      y: -1
    },
    [Position.Bottom]: {
      x: 0,
      y: 1
    }
  };
  const getDirection = ({ source, sourcePosition = Position.Bottom, target }) => {
    if (sourcePosition === Position.Left || sourcePosition === Position.Right) {
      return source.x < target.x ? {
        x: 1,
        y: 0
      } : {
        x: -1,
        y: 0
      };
    }
    return source.y < target.y ? {
      x: 0,
      y: 1
    } : {
      x: 0,
      y: -1
    };
  };
  const distance = (a, b) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  function getPoints({ source, sourcePosition = Position.Bottom, target, targetPosition = Position.Top, center, offset }) {
    const sourceDir = handleDirections[sourcePosition];
    const targetDir = handleDirections[targetPosition];
    const sourceGapped = {
      x: source.x + sourceDir.x * offset,
      y: source.y + sourceDir.y * offset
    };
    const targetGapped = {
      x: target.x + targetDir.x * offset,
      y: target.y + targetDir.y * offset
    };
    const dir = getDirection({
      source: sourceGapped,
      sourcePosition,
      target: targetGapped
    });
    const dirAccessor = dir.x !== 0 ? "x" : "y";
    const currDir = dir[dirAccessor];
    let points = [];
    let centerX, centerY;
    const sourceGapOffset = {
      x: 0,
      y: 0
    };
    const targetGapOffset = {
      x: 0,
      y: 0
    };
    const [defaultCenterX, defaultCenterY, defaultOffsetX, defaultOffsetY] = getEdgeCenter({
      sourceX: source.x,
      sourceY: source.y,
      targetX: target.x,
      targetY: target.y
    });
    if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
      centerX = center.x ?? defaultCenterX;
      centerY = center.y ?? defaultCenterY;
      const verticalSplit = [
        {
          x: centerX,
          y: sourceGapped.y
        },
        {
          x: centerX,
          y: targetGapped.y
        }
      ];
      const horizontalSplit = [
        {
          x: sourceGapped.x,
          y: centerY
        },
        {
          x: targetGapped.x,
          y: centerY
        }
      ];
      if (sourceDir[dirAccessor] === currDir) {
        points = dirAccessor === "x" ? verticalSplit : horizontalSplit;
      } else {
        points = dirAccessor === "x" ? horizontalSplit : verticalSplit;
      }
    } else {
      const sourceTarget = [
        {
          x: sourceGapped.x,
          y: targetGapped.y
        }
      ];
      const targetSource = [
        {
          x: targetGapped.x,
          y: sourceGapped.y
        }
      ];
      if (dirAccessor === "x") {
        points = sourceDir.x === currDir ? targetSource : sourceTarget;
      } else {
        points = sourceDir.y === currDir ? sourceTarget : targetSource;
      }
      if (sourcePosition === targetPosition) {
        const diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
        if (diff <= offset) {
          const gapOffset = Math.min(offset - 1, offset - diff);
          if (sourceDir[dirAccessor] === currDir) {
            sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
          } else {
            targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
          }
        }
      }
      if (sourcePosition !== targetPosition) {
        const dirAccessorOpposite = dirAccessor === "x" ? "y" : "x";
        const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
        const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
        const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
        const flipSourceTarget = sourceDir[dirAccessor] === 1 && (!isSameDir && sourceGtTargetOppo || isSameDir && sourceLtTargetOppo) || sourceDir[dirAccessor] !== 1 && (!isSameDir && sourceLtTargetOppo || isSameDir && sourceGtTargetOppo);
        if (flipSourceTarget) {
          points = dirAccessor === "x" ? sourceTarget : targetSource;
        }
      }
      const sourceGapPoint = {
        x: sourceGapped.x + sourceGapOffset.x,
        y: sourceGapped.y + sourceGapOffset.y
      };
      const targetGapPoint = {
        x: targetGapped.x + targetGapOffset.x,
        y: targetGapped.y + targetGapOffset.y
      };
      const maxXDistance = Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x));
      const maxYDistance = Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y));
      if (maxXDistance >= maxYDistance) {
        centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
        centerY = points[0].y;
      } else {
        centerX = points[0].x;
        centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
      }
    }
    const pathPoints = [
      source,
      {
        x: sourceGapped.x + sourceGapOffset.x,
        y: sourceGapped.y + sourceGapOffset.y
      },
      ...points,
      {
        x: targetGapped.x + targetGapOffset.x,
        y: targetGapped.y + targetGapOffset.y
      },
      target
    ];
    return [
      pathPoints,
      centerX,
      centerY,
      defaultOffsetX,
      defaultOffsetY
    ];
  }
  function getBend(a, b, c, size) {
    const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
    const { x, y } = b;
    if (a.x === x && x === c.x || a.y === y && y === c.y) {
      return `L${x} ${y}`;
    }
    if (a.y === y) {
      const xDir2 = a.x < c.x ? -1 : 1;
      const yDir2 = a.y < c.y ? 1 : -1;
      return `L ${x + bendSize * xDir2},${y}Q ${x},${y} ${x},${y + bendSize * yDir2}`;
    }
    const xDir = a.x < c.x ? 1 : -1;
    const yDir = a.y < c.y ? -1 : 1;
    return `L ${x},${y + bendSize * yDir}Q ${x},${y} ${x + bendSize * xDir},${y}`;
  }
  function getSmoothStepPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, borderRadius = 5, centerX, centerY, offset = 20 }) {
    const [points, labelX, labelY, offsetX, offsetY] = getPoints({
      source: {
        x: sourceX,
        y: sourceY
      },
      sourcePosition,
      target: {
        x: targetX,
        y: targetY
      },
      targetPosition,
      center: {
        x: centerX,
        y: centerY
      },
      offset
    });
    const path = points.reduce((res, p2, i) => {
      let segment = "";
      if (i > 0 && i < points.length - 1) {
        segment = getBend(points[i - 1], p2, points[i + 1], borderRadius);
      } else {
        segment = `${i === 0 ? "M" : "L"}${p2.x} ${p2.y}`;
      }
      res += segment;
      return res;
    }, "");
    return [
      path,
      labelX,
      labelY,
      offsetX,
      offsetY
    ];
  }
  function isNodeInitialized(node) {
    var _a;
    return node && !!(node.internals.handleBounds || ((_a = node.handles) == null ? void 0 : _a.length)) && !!(node.measured.width || node.width || node.initialWidth);
  }
  function getEdgePosition(params) {
    var _a;
    const { sourceNode, targetNode } = params;
    if (!isNodeInitialized(sourceNode) || !isNodeInitialized(targetNode)) {
      return null;
    }
    const sourceHandleBounds = sourceNode.internals.handleBounds || toHandleBounds(sourceNode.handles);
    const targetHandleBounds = targetNode.internals.handleBounds || toHandleBounds(targetNode.handles);
    const sourceHandle = getHandle$1((sourceHandleBounds == null ? void 0 : sourceHandleBounds.source) ?? [], params.sourceHandle);
    const targetHandle = getHandle$1(params.connectionMode === ConnectionMode.Strict ? (targetHandleBounds == null ? void 0 : targetHandleBounds.target) ?? [] : ((targetHandleBounds == null ? void 0 : targetHandleBounds.target) ?? []).concat((targetHandleBounds == null ? void 0 : targetHandleBounds.source) ?? []), params.targetHandle);
    if (!sourceHandle || !targetHandle) {
      (_a = params.onError) == null ? void 0 : _a.call(params, "008", errorMessages["error008"](!sourceHandle ? "source" : "target", {
        id: params.id,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle
      }));
      return null;
    }
    const sourcePosition = (sourceHandle == null ? void 0 : sourceHandle.position) || Position.Bottom;
    const targetPosition = (targetHandle == null ? void 0 : targetHandle.position) || Position.Top;
    const source = getHandlePosition(sourceNode, sourceHandle, sourcePosition);
    const target = getHandlePosition(targetNode, targetHandle, targetPosition);
    return {
      sourceX: source.x,
      sourceY: source.y,
      targetX: target.x,
      targetY: target.y,
      sourcePosition,
      targetPosition
    };
  }
  function toHandleBounds(handles) {
    if (!handles) {
      return null;
    }
    const source = [];
    const target = [];
    for (const handle of handles) {
      handle.width = handle.width ?? 1;
      handle.height = handle.height ?? 1;
      if (handle.type === "source") {
        source.push(handle);
      } else if (handle.type === "target") {
        target.push(handle);
      }
    }
    return {
      source,
      target
    };
  }
  function getHandlePosition(node, handle, fallbackPosition = Position.Left, center = false) {
    const x = ((handle == null ? void 0 : handle.x) ?? 0) + node.internals.positionAbsolute.x;
    const y = ((handle == null ? void 0 : handle.y) ?? 0) + node.internals.positionAbsolute.y;
    const { width, height } = handle ?? getNodeDimensions(node);
    if (center) {
      return {
        x: x + width / 2,
        y: y + height / 2
      };
    }
    const position = (handle == null ? void 0 : handle.position) ?? fallbackPosition;
    switch (position) {
      case Position.Top:
        return {
          x: x + width / 2,
          y
        };
      case Position.Right:
        return {
          x: x + width,
          y: y + height / 2
        };
      case Position.Bottom:
        return {
          x: x + width / 2,
          y: y + height
        };
      case Position.Left:
        return {
          x,
          y: y + height / 2
        };
    }
  }
  function getHandle$1(bounds, handleId) {
    if (!bounds) {
      return null;
    }
    return (!handleId ? bounds[0] : bounds.find((d) => d.id === handleId)) || null;
  }
  function getMarkerId(marker, id2) {
    if (!marker) {
      return "";
    }
    if (typeof marker === "string") {
      return marker;
    }
    const idPrefix = id2 ? `${id2}__` : "";
    return `${idPrefix}${Object.keys(marker).sort().map((key) => `${key}=${marker[key]}`).join("&")}`;
  }
  function createMarkerIds(edges, { id: id2, defaultColor, defaultMarkerStart, defaultMarkerEnd }) {
    const ids = /* @__PURE__ */ new Set();
    return edges.reduce((markers, edge) => {
      [
        edge.markerStart || defaultMarkerStart,
        edge.markerEnd || defaultMarkerEnd
      ].forEach((marker) => {
        if (marker && typeof marker === "object") {
          const markerId = getMarkerId(marker, id2);
          if (!ids.has(markerId)) {
            markers.push({
              id: markerId,
              color: marker.color || defaultColor,
              ...marker
            });
            ids.add(markerId);
          }
        }
      });
      return markers;
    }, []).sort((a, b) => a.id.localeCompare(b.id));
  }
  const defaultOptions = {
    nodeOrigin: [
      0,
      0
    ],
    nodeExtent: infiniteExtent,
    elevateNodesOnSelect: true,
    defaults: {}
  };
  const adoptUserNodesDefaultOptions = {
    ...defaultOptions,
    checkEquality: true
  };
  function mergeObjects(base, incoming) {
    const result = {
      ...base
    };
    for (const key in incoming) {
      if (incoming[key] !== void 0) {
        result[key] = incoming[key];
      }
    }
    return result;
  }
  function updateAbsolutePositions(nodeLookup, parentLookup, options) {
    const _options = mergeObjects(defaultOptions, options);
    for (const node of nodeLookup.values()) {
      if (node.parentId) {
        updateChildNode(node, nodeLookup, parentLookup, _options);
      } else {
        const positionWithOrigin = getNodePositionWithOrigin(node, _options.nodeOrigin);
        const extent = isCoordinateExtent(node.extent) ? node.extent : _options.nodeExtent;
        const clampedPosition = clampPosition(positionWithOrigin, extent, getNodeDimensions(node));
        node.internals.positionAbsolute = clampedPosition;
      }
    }
  }
  function adoptUserNodes(nodes, nodeLookup, parentLookup, options) {
    var _a, _b;
    const _options = mergeObjects(adoptUserNodesDefaultOptions, options);
    const tmpLookup = new Map(nodeLookup);
    const selectedNodeZ = (_options == null ? void 0 : _options.elevateNodesOnSelect) ? 1e3 : 0;
    nodeLookup.clear();
    parentLookup.clear();
    for (const userNode of nodes) {
      let internalNode = tmpLookup.get(userNode.id);
      if (_options.checkEquality && userNode === (internalNode == null ? void 0 : internalNode.internals.userNode)) {
        nodeLookup.set(userNode.id, internalNode);
      } else {
        const positionWithOrigin = getNodePositionWithOrigin(userNode, _options.nodeOrigin);
        const extent = isCoordinateExtent(userNode.extent) ? userNode.extent : _options.nodeExtent;
        const clampedPosition = clampPosition(positionWithOrigin, extent, getNodeDimensions(userNode));
        internalNode = {
          ..._options.defaults,
          ...userNode,
          measured: {
            width: (_a = userNode.measured) == null ? void 0 : _a.width,
            height: (_b = userNode.measured) == null ? void 0 : _b.height
          },
          internals: {
            positionAbsolute: clampedPosition,
            handleBounds: !userNode.measured ? void 0 : internalNode == null ? void 0 : internalNode.internals.handleBounds,
            z: calculateZ(userNode, selectedNodeZ),
            userNode
          }
        };
        nodeLookup.set(userNode.id, internalNode);
      }
      if (userNode.parentId) {
        updateChildNode(internalNode, nodeLookup, parentLookup, options);
      }
    }
  }
  function updateParentLookup(node, parentLookup) {
    if (!node.parentId) {
      return;
    }
    const childNodes = parentLookup.get(node.parentId);
    if (childNodes) {
      childNodes.set(node.id, node);
    } else {
      parentLookup.set(node.parentId, /* @__PURE__ */ new Map([
        [
          node.id,
          node
        ]
      ]));
    }
  }
  function updateChildNode(node, nodeLookup, parentLookup, options) {
    const { elevateNodesOnSelect, nodeOrigin, nodeExtent } = mergeObjects(defaultOptions, options);
    const parentId = node.parentId;
    const parentNode = nodeLookup.get(parentId);
    if (!parentNode) {
      console.warn(`Parent node ${parentId} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
      return;
    }
    updateParentLookup(node, parentLookup);
    const selectedNodeZ = elevateNodesOnSelect ? 1e3 : 0;
    const { x, y, z } = calculateChildXYZ(node, parentNode, nodeOrigin, nodeExtent, selectedNodeZ);
    const { positionAbsolute } = node.internals;
    const positionChanged = x !== positionAbsolute.x || y !== positionAbsolute.y;
    if (positionChanged || z !== node.internals.z) {
      node.internals = {
        ...node.internals,
        positionAbsolute: positionChanged ? {
          x,
          y
        } : positionAbsolute,
        z
      };
    }
  }
  function calculateZ(node, selectedNodeZ) {
    return (isNumeric(node.zIndex) ? node.zIndex : 0) + (node.selected ? selectedNodeZ : 0);
  }
  function calculateChildXYZ(childNode, parentNode, nodeOrigin, nodeExtent, selectedNodeZ) {
    const { x: parentX, y: parentY } = parentNode.internals.positionAbsolute;
    const childDimensions = getNodeDimensions(childNode);
    const positionWithOrigin = getNodePositionWithOrigin(childNode, nodeOrigin);
    const clampedPosition = isCoordinateExtent(childNode.extent) ? clampPosition(positionWithOrigin, childNode.extent, childDimensions) : positionWithOrigin;
    let absolutePosition = clampPosition({
      x: parentX + clampedPosition.x,
      y: parentY + clampedPosition.y
    }, nodeExtent, childDimensions);
    if (childNode.extent === "parent") {
      absolutePosition = clampPositionToParent(absolutePosition, childDimensions, parentNode);
    }
    const childZ = calculateZ(childNode, selectedNodeZ);
    const parentZ = parentNode.internals.z ?? 0;
    return {
      x: absolutePosition.x,
      y: absolutePosition.y,
      z: parentZ > childZ ? parentZ : childZ
    };
  }
  function handleExpandParent(children2, nodeLookup, parentLookup, nodeOrigin = [
    0,
    0
  ]) {
    var _a;
    const changes = [];
    const parentExpansions = /* @__PURE__ */ new Map();
    for (const child of children2) {
      const parent = nodeLookup.get(child.parentId);
      if (!parent) {
        continue;
      }
      const parentRect = ((_a = parentExpansions.get(child.parentId)) == null ? void 0 : _a.expandedRect) ?? nodeToRect(parent);
      const expandedRect = getBoundsOfRects(parentRect, child.rect);
      parentExpansions.set(child.parentId, {
        expandedRect,
        parent
      });
    }
    if (parentExpansions.size > 0) {
      parentExpansions.forEach(({ expandedRect, parent }, parentId) => {
        var _a2;
        const positionAbsolute = parent.internals.positionAbsolute;
        const dimensions = getNodeDimensions(parent);
        const origin = parent.origin ?? nodeOrigin;
        const xChange = expandedRect.x < positionAbsolute.x ? Math.round(Math.abs(positionAbsolute.x - expandedRect.x)) : 0;
        const yChange = expandedRect.y < positionAbsolute.y ? Math.round(Math.abs(positionAbsolute.y - expandedRect.y)) : 0;
        const newWidth = Math.max(dimensions.width, Math.round(expandedRect.width));
        const newHeight = Math.max(dimensions.height, Math.round(expandedRect.height));
        const widthChange = (newWidth - dimensions.width) * origin[0];
        const heightChange = (newHeight - dimensions.height) * origin[1];
        if (xChange > 0 || yChange > 0 || widthChange || heightChange) {
          changes.push({
            id: parentId,
            type: "position",
            position: {
              x: parent.position.x - xChange + widthChange,
              y: parent.position.y - yChange + heightChange
            }
          });
          (_a2 = parentLookup.get(parentId)) == null ? void 0 : _a2.forEach((childNode) => {
            if (!children2.some((child) => child.id === childNode.id)) {
              changes.push({
                id: childNode.id,
                type: "position",
                position: {
                  x: childNode.position.x + xChange,
                  y: childNode.position.y + yChange
                }
              });
            }
          });
        }
        if (dimensions.width < expandedRect.width || dimensions.height < expandedRect.height || xChange || yChange) {
          changes.push({
            id: parentId,
            type: "dimensions",
            setAttributes: true,
            dimensions: {
              width: newWidth + (xChange ? origin[0] * xChange - widthChange : 0),
              height: newHeight + (yChange ? origin[1] * yChange - heightChange : 0)
            }
          });
        }
      });
    }
    return changes;
  }
  function updateNodeInternals(updates, nodeLookup, parentLookup, domNode, nodeOrigin, nodeExtent) {
    const viewportNode = domNode == null ? void 0 : domNode.querySelector(".xyflow__viewport");
    let updatedInternals = false;
    if (!viewportNode) {
      return {
        changes: [],
        updatedInternals
      };
    }
    const changes = [];
    const style2 = window.getComputedStyle(viewportNode);
    const { m22: zoom2 } = new window.DOMMatrixReadOnly(style2.transform);
    const parentExpandChildren = [];
    for (const update of updates.values()) {
      const node = nodeLookup.get(update.id);
      if (!node) {
        continue;
      }
      if (node.hidden) {
        node.internals = {
          ...node.internals,
          handleBounds: void 0
        };
        updatedInternals = true;
      } else {
        const dimensions = getDimensions(update.nodeElement);
        const dimensionChanged = node.measured.width !== dimensions.width || node.measured.height !== dimensions.height;
        const doUpdate = !!(dimensions.width && dimensions.height && (dimensionChanged || !node.internals.handleBounds || update.force));
        if (doUpdate) {
          const nodeBounds = update.nodeElement.getBoundingClientRect();
          const extent = isCoordinateExtent(node.extent) ? node.extent : nodeExtent;
          let { positionAbsolute } = node.internals;
          if (node.parentId && node.extent === "parent") {
            positionAbsolute = clampPositionToParent(positionAbsolute, dimensions, nodeLookup.get(node.parentId));
          } else if (extent) {
            positionAbsolute = clampPosition(positionAbsolute, extent, dimensions);
          }
          node.measured = dimensions;
          node.internals = {
            ...node.internals,
            positionAbsolute,
            handleBounds: {
              source: getHandleBounds("source", update.nodeElement, nodeBounds, zoom2, node.id),
              target: getHandleBounds("target", update.nodeElement, nodeBounds, zoom2, node.id)
            }
          };
          if (node.parentId) {
            updateChildNode(node, nodeLookup, parentLookup, {
              nodeOrigin
            });
          }
          updatedInternals = true;
          if (dimensionChanged) {
            changes.push({
              id: node.id,
              type: "dimensions",
              dimensions
            });
            if (node.expandParent && node.parentId) {
              parentExpandChildren.push({
                id: node.id,
                parentId: node.parentId,
                rect: nodeToRect(node, nodeOrigin)
              });
            }
          }
        }
      }
    }
    if (parentExpandChildren.length > 0) {
      const parentExpandChanges = handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, nodeOrigin);
      changes.push(...parentExpandChanges);
    }
    return {
      changes,
      updatedInternals
    };
  }
  async function panBy({ delta, panZoom, transform: transform2, translateExtent, width, height }) {
    if (!panZoom || !delta.x && !delta.y) {
      return Promise.resolve(false);
    }
    const nextViewport = await panZoom.setViewportConstrained({
      x: transform2[0] + delta.x,
      y: transform2[1] + delta.y,
      zoom: transform2[2]
    }, [
      [
        0,
        0
      ],
      [
        width,
        height
      ]
    ], translateExtent);
    const transformChanged = !!nextViewport && (nextViewport.x !== transform2[0] || nextViewport.y !== transform2[1] || nextViewport.k !== transform2[2]);
    return Promise.resolve(transformChanged);
  }
  function updateConnectionLookup(connectionLookup, edgeLookup, edges) {
    connectionLookup.clear();
    edgeLookup.clear();
    for (const edge of edges) {
      const { source, target, sourceHandle = null, targetHandle = null } = edge;
      const sourceKey = `${source}-source-${sourceHandle}`;
      const targetKey = `${target}-target-${targetHandle}`;
      const prevSource = connectionLookup.get(sourceKey) || /* @__PURE__ */ new Map();
      const prevTarget = connectionLookup.get(targetKey) || /* @__PURE__ */ new Map();
      const connection = {
        edgeId: edge.id,
        source,
        target,
        sourceHandle,
        targetHandle
      };
      edgeLookup.set(edge.id, edge);
      connectionLookup.set(sourceKey, prevSource.set(`${target}-${targetHandle}`, connection));
      connectionLookup.set(targetKey, prevTarget.set(`${source}-${sourceHandle}`, connection));
    }
  }
  function isParentSelected(node, nodeLookup) {
    if (!node.parentId) {
      return false;
    }
    const parentNode = nodeLookup.get(node.parentId);
    if (!parentNode) {
      return false;
    }
    if (parentNode.selected) {
      return true;
    }
    return isParentSelected(parentNode, nodeLookup);
  }
  function hasSelector(target, selector2, domNode) {
    let current = target;
    do {
      if (current == null ? void 0 : current.matches(selector2)) return true;
      if (current === domNode) return false;
      current = current.parentElement;
    } while (current);
    return false;
  }
  function getDragItems(nodeLookup, nodesDraggable, mousePos, nodeId) {
    const dragItems = /* @__PURE__ */ new Map();
    for (const [id2, node] of nodeLookup) {
      if ((node.selected || node.id === nodeId) && (!node.parentId || !isParentSelected(node, nodeLookup)) && (node.draggable || nodesDraggable && typeof node.draggable === "undefined")) {
        const internalNode = nodeLookup.get(id2);
        if (internalNode) {
          dragItems.set(id2, {
            id: id2,
            position: internalNode.position || {
              x: 0,
              y: 0
            },
            distance: {
              x: mousePos.x - internalNode.internals.positionAbsolute.x,
              y: mousePos.y - internalNode.internals.positionAbsolute.y
            },
            extent: internalNode.extent,
            parentId: internalNode.parentId,
            origin: internalNode.origin,
            expandParent: internalNode.expandParent,
            internals: {
              positionAbsolute: internalNode.internals.positionAbsolute || {
                x: 0,
                y: 0
              }
            },
            measured: {
              width: internalNode.measured.width ?? 0,
              height: internalNode.measured.height ?? 0
            }
          });
        }
      }
    }
    return dragItems;
  }
  function getEventHandlerParams({ nodeId, dragItems, nodeLookup, dragging = true }) {
    var _a, _b, _c;
    const nodesFromDragItems = [];
    for (const [id2, dragItem] of dragItems) {
      const node2 = (_a = nodeLookup.get(id2)) == null ? void 0 : _a.internals.userNode;
      if (node2) {
        nodesFromDragItems.push({
          ...node2,
          position: dragItem.position,
          dragging
        });
      }
    }
    if (!nodeId) {
      return [
        nodesFromDragItems[0],
        nodesFromDragItems
      ];
    }
    const node = (_b = nodeLookup.get(nodeId)) == null ? void 0 : _b.internals.userNode;
    return [
      !node ? nodesFromDragItems[0] : {
        ...node,
        position: ((_c = dragItems.get(nodeId)) == null ? void 0 : _c.position) || node.position,
        dragging
      },
      nodesFromDragItems
    ];
  }
  function XYDrag({ onNodeMouseDown, getStoreItems, onDragStart, onDrag, onDragStop }) {
    let lastPos = {
      x: null,
      y: null
    };
    let autoPanId = 0;
    let dragItems = /* @__PURE__ */ new Map();
    let autoPanStarted = false;
    let mousePosition = {
      x: 0,
      y: 0
    };
    let containerBounds = null;
    let dragStarted = false;
    let d3Selection = null;
    let abortDrag = false;
    function update({ noDragClassName, handleSelector, domNode, isSelectable, nodeId, nodeClickDistance = 0 }) {
      d3Selection = select(domNode);
      function updateNodes({ x, y }, dragEvent) {
        const { nodeLookup, nodeExtent, snapGrid, snapToGrid, nodeOrigin, onNodeDrag, onSelectionDrag, onError, updateNodePositions } = getStoreItems();
        lastPos = {
          x,
          y
        };
        let hasChange = false;
        let nodesBox = {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        };
        if (dragItems.size > 1 && nodeExtent) {
          const rect = getInternalNodesBounds(dragItems);
          nodesBox = rectToBox(rect);
        }
        for (const [id2, dragItem] of dragItems) {
          if (!nodeLookup.has(id2)) {
            continue;
          }
          let nextPosition = {
            x: x - dragItem.distance.x,
            y: y - dragItem.distance.y
          };
          if (snapToGrid) {
            nextPosition = snapPosition(nextPosition, snapGrid);
          }
          let adjustedNodeExtent = [
            [
              nodeExtent[0][0],
              nodeExtent[0][1]
            ],
            [
              nodeExtent[1][0],
              nodeExtent[1][1]
            ]
          ];
          if (dragItems.size > 1 && nodeExtent && !dragItem.extent) {
            const { positionAbsolute: positionAbsolute2 } = dragItem.internals;
            const x1 = positionAbsolute2.x - nodesBox.x + nodeExtent[0][0];
            const x2 = positionAbsolute2.x + dragItem.measured.width - nodesBox.x2 + nodeExtent[1][0];
            const y1 = positionAbsolute2.y - nodesBox.y + nodeExtent[0][1];
            const y2 = positionAbsolute2.y + dragItem.measured.height - nodesBox.y2 + nodeExtent[1][1];
            adjustedNodeExtent = [
              [
                x1,
                y1
              ],
              [
                x2,
                y2
              ]
            ];
          }
          const { position, positionAbsolute } = calculateNodePosition({
            nodeId: id2,
            nextPosition,
            nodeLookup,
            nodeExtent: adjustedNodeExtent,
            nodeOrigin,
            onError
          });
          hasChange = hasChange || dragItem.position.x !== position.x || dragItem.position.y !== position.y;
          dragItem.position = position;
          dragItem.internals.positionAbsolute = positionAbsolute;
        }
        if (!hasChange) {
          return;
        }
        updateNodePositions(dragItems, true);
        if (dragEvent && (onDrag || onNodeDrag || !nodeId && onSelectionDrag)) {
          const [currentNode, currentNodes] = getEventHandlerParams({
            nodeId,
            dragItems,
            nodeLookup
          });
          onDrag == null ? void 0 : onDrag(dragEvent, dragItems, currentNode, currentNodes);
          onNodeDrag == null ? void 0 : onNodeDrag(dragEvent, currentNode, currentNodes);
          if (!nodeId) {
            onSelectionDrag == null ? void 0 : onSelectionDrag(dragEvent, currentNodes);
          }
        }
      }
      async function autoPan() {
        if (!containerBounds) {
          return;
        }
        const { transform: transform2, panBy: panBy2, autoPanSpeed } = getStoreItems();
        const [xMovement, yMovement] = calcAutoPan(mousePosition, containerBounds, autoPanSpeed);
        if (xMovement !== 0 || yMovement !== 0) {
          lastPos.x = (lastPos.x ?? 0) - xMovement / transform2[2];
          lastPos.y = (lastPos.y ?? 0) - yMovement / transform2[2];
          if (await panBy2({
            x: xMovement,
            y: yMovement
          })) {
            updateNodes(lastPos, null);
          }
        }
        autoPanId = requestAnimationFrame(autoPan);
      }
      function startDrag(event) {
        var _a;
        const { nodeLookup, multiSelectionActive, nodesDraggable, transform: transform2, snapGrid, snapToGrid, selectNodesOnDrag, onNodeDragStart, onSelectionDragStart, unselectNodesAndEdges } = getStoreItems();
        dragStarted = true;
        if ((!selectNodesOnDrag || !isSelectable) && !multiSelectionActive && nodeId) {
          if (!((_a = nodeLookup.get(nodeId)) == null ? void 0 : _a.selected)) {
            unselectNodesAndEdges();
          }
        }
        if (isSelectable && selectNodesOnDrag && nodeId) {
          onNodeMouseDown == null ? void 0 : onNodeMouseDown(nodeId);
        }
        const pointerPos = getPointerPosition(event.sourceEvent, {
          transform: transform2,
          snapGrid,
          snapToGrid,
          containerBounds
        });
        lastPos = pointerPos;
        dragItems = getDragItems(nodeLookup, nodesDraggable, pointerPos, nodeId);
        if (dragItems.size > 0 && (onDragStart || onNodeDragStart || !nodeId && onSelectionDragStart)) {
          const [currentNode, currentNodes] = getEventHandlerParams({
            nodeId,
            dragItems,
            nodeLookup
          });
          onDragStart == null ? void 0 : onDragStart(event.sourceEvent, dragItems, currentNode, currentNodes);
          onNodeDragStart == null ? void 0 : onNodeDragStart(event.sourceEvent, currentNode, currentNodes);
          if (!nodeId) {
            onSelectionDragStart == null ? void 0 : onSelectionDragStart(event.sourceEvent, currentNodes);
          }
        }
      }
      const d3DragInstance = drag().clickDistance(nodeClickDistance).on("start", (event) => {
        const { domNode: domNode2, nodeDragThreshold, transform: transform2, snapGrid, snapToGrid } = getStoreItems();
        containerBounds = (domNode2 == null ? void 0 : domNode2.getBoundingClientRect()) || null;
        abortDrag = false;
        if (nodeDragThreshold === 0) {
          startDrag(event);
        }
        const pointerPos = getPointerPosition(event.sourceEvent, {
          transform: transform2,
          snapGrid,
          snapToGrid,
          containerBounds
        });
        lastPos = pointerPos;
        mousePosition = getEventPosition(event.sourceEvent, containerBounds);
      }).on("drag", (event) => {
        const { autoPanOnNodeDrag, transform: transform2, snapGrid, snapToGrid, nodeDragThreshold, nodeLookup } = getStoreItems();
        const pointerPos = getPointerPosition(event.sourceEvent, {
          transform: transform2,
          snapGrid,
          snapToGrid,
          containerBounds
        });
        if (event.sourceEvent.type === "touchmove" && event.sourceEvent.touches.length > 1 || nodeId && !nodeLookup.has(nodeId)) {
          abortDrag = true;
        }
        if (abortDrag) {
          return;
        }
        if (!autoPanStarted && autoPanOnNodeDrag && dragStarted) {
          autoPanStarted = true;
          autoPan();
        }
        if (!dragStarted) {
          const x = pointerPos.xSnapped - (lastPos.x ?? 0);
          const y = pointerPos.ySnapped - (lastPos.y ?? 0);
          const distance2 = Math.sqrt(x * x + y * y);
          if (distance2 > nodeDragThreshold) {
            startDrag(event);
          }
        }
        if ((lastPos.x !== pointerPos.xSnapped || lastPos.y !== pointerPos.ySnapped) && dragItems && dragStarted) {
          mousePosition = getEventPosition(event.sourceEvent, containerBounds);
          updateNodes(pointerPos, event.sourceEvent);
        }
      }).on("end", (event) => {
        if (!dragStarted || abortDrag) {
          return;
        }
        autoPanStarted = false;
        dragStarted = false;
        cancelAnimationFrame(autoPanId);
        if (dragItems.size > 0) {
          const { nodeLookup, updateNodePositions, onNodeDragStop, onSelectionDragStop } = getStoreItems();
          updateNodePositions(dragItems, false);
          if (onDragStop || onNodeDragStop || !nodeId && onSelectionDragStop) {
            const [currentNode, currentNodes] = getEventHandlerParams({
              nodeId,
              dragItems,
              nodeLookup,
              dragging: false
            });
            onDragStop == null ? void 0 : onDragStop(event.sourceEvent, dragItems, currentNode, currentNodes);
            onNodeDragStop == null ? void 0 : onNodeDragStop(event.sourceEvent, currentNode, currentNodes);
            if (!nodeId) {
              onSelectionDragStop == null ? void 0 : onSelectionDragStop(event.sourceEvent, currentNodes);
            }
          }
        }
      }).filter((event) => {
        const target = event.target;
        const isDraggable = !event.button && (!noDragClassName || !hasSelector(target, `.${noDragClassName}`, domNode)) && (!handleSelector || hasSelector(target, handleSelector, domNode));
        return isDraggable;
      });
      d3Selection.call(d3DragInstance);
    }
    function destroy() {
      d3Selection == null ? void 0 : d3Selection.on(".drag", null);
    }
    return {
      update,
      destroy
    };
  }
  function getNodesWithinDistance(position, nodeLookup, distance2) {
    const nodes = [];
    const rect = {
      x: position.x - distance2,
      y: position.y - distance2,
      width: distance2 * 2,
      height: distance2 * 2
    };
    for (const node of nodeLookup.values()) {
      if (getOverlappingArea(rect, nodeToRect(node)) > 0) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  const ADDITIONAL_DISTANCE = 250;
  function getClosestHandle(position, connectionRadius, nodeLookup, fromHandle) {
    var _a, _b;
    let closestHandles = [];
    let minDistance = Infinity;
    const closeNodes = getNodesWithinDistance(position, nodeLookup, connectionRadius + ADDITIONAL_DISTANCE);
    for (const node of closeNodes) {
      const allHandles = [
        ...((_a = node.internals.handleBounds) == null ? void 0 : _a.source) ?? [],
        ...((_b = node.internals.handleBounds) == null ? void 0 : _b.target) ?? []
      ];
      for (const handle of allHandles) {
        if (fromHandle.nodeId === handle.nodeId && fromHandle.type === handle.type && fromHandle.id === handle.id) {
          continue;
        }
        const { x, y } = getHandlePosition(node, handle, handle.position, true);
        const distance2 = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2));
        if (distance2 > connectionRadius) {
          continue;
        }
        if (distance2 < minDistance) {
          closestHandles = [
            {
              ...handle,
              x,
              y
            }
          ];
          minDistance = distance2;
        } else if (distance2 === minDistance) {
          closestHandles.push({
            ...handle,
            x,
            y
          });
        }
      }
    }
    if (!closestHandles.length) {
      return null;
    }
    if (closestHandles.length > 1) {
      const oppositeHandleType = fromHandle.type === "source" ? "target" : "source";
      return closestHandles.find((handle) => handle.type === oppositeHandleType) ?? closestHandles[0];
    }
    return closestHandles[0];
  }
  function getHandle(nodeId, handleType, handleId, nodeLookup, connectionMode, withAbsolutePosition = false) {
    var _a, _b, _c;
    const node = nodeLookup.get(nodeId);
    if (!node) {
      return null;
    }
    const handles = connectionMode === "strict" ? (_a = node.internals.handleBounds) == null ? void 0 : _a[handleType] : [
      ...((_b = node.internals.handleBounds) == null ? void 0 : _b.source) ?? [],
      ...((_c = node.internals.handleBounds) == null ? void 0 : _c.target) ?? []
    ];
    const handle = (handleId ? handles == null ? void 0 : handles.find((h2) => h2.id === handleId) : handles == null ? void 0 : handles[0]) ?? null;
    return handle && withAbsolutePosition ? {
      ...handle,
      ...getHandlePosition(node, handle, handle.position, true)
    } : handle;
  }
  function getHandleType(edgeUpdaterType, handleDomNode) {
    if (edgeUpdaterType) {
      return edgeUpdaterType;
    } else if (handleDomNode == null ? void 0 : handleDomNode.classList.contains("target")) {
      return "target";
    } else if (handleDomNode == null ? void 0 : handleDomNode.classList.contains("source")) {
      return "source";
    }
    return null;
  }
  function isConnectionValid(isInsideConnectionRadius, isHandleValid) {
    let isValid = null;
    if (isHandleValid) {
      isValid = true;
    } else if (isInsideConnectionRadius && !isHandleValid) {
      isValid = false;
    }
    return isValid;
  }
  const alwaysValid = () => true;
  function onPointerDown(event, { connectionMode, connectionRadius, handleId, nodeId, edgeUpdaterType, isTarget, domNode, nodeLookup, lib, autoPanOnConnect, flowId, panBy: panBy2, cancelConnection, onConnectStart, onConnect, onConnectEnd, isValidConnection = alwaysValid, onReconnectEnd, updateConnection, getTransform, getFromHandle, autoPanSpeed }) {
    const doc = getHostForElement(event.target);
    let autoPanId = 0;
    let closestHandle;
    const { x, y } = getEventPosition(event);
    const clickedHandle = doc == null ? void 0 : doc.elementFromPoint(x, y);
    const handleType = getHandleType(edgeUpdaterType, clickedHandle);
    const containerBounds = domNode == null ? void 0 : domNode.getBoundingClientRect();
    if (!containerBounds || !handleType) {
      return;
    }
    const fromHandleInternal = getHandle(nodeId, handleType, handleId, nodeLookup, connectionMode);
    if (!fromHandleInternal) {
      return;
    }
    let position = getEventPosition(event, containerBounds);
    let autoPanStarted = false;
    let connection = null;
    let isValid = false;
    let handleDomNode = null;
    function autoPan() {
      if (!autoPanOnConnect || !containerBounds) {
        return;
      }
      const [x2, y2] = calcAutoPan(position, containerBounds, autoPanSpeed);
      panBy2({
        x: x2,
        y: y2
      });
      autoPanId = requestAnimationFrame(autoPan);
    }
    const fromHandle = {
      ...fromHandleInternal,
      nodeId,
      type: handleType,
      position: fromHandleInternal.position
    };
    const fromNodeInternal = nodeLookup.get(nodeId);
    const from = getHandlePosition(fromNodeInternal, fromHandle, Position.Left, true);
    const newConnection = {
      inProgress: true,
      isValid: null,
      from,
      fromHandle,
      fromPosition: fromHandle.position,
      fromNode: fromNodeInternal,
      to: position,
      toHandle: null,
      toPosition: oppositePosition[fromHandle.position],
      toNode: null
    };
    updateConnection(newConnection);
    let previousConnection = newConnection;
    onConnectStart == null ? void 0 : onConnectStart(event, {
      nodeId,
      handleId,
      handleType
    });
    function onPointerMove(event2) {
      if (!getFromHandle() || !fromHandle) {
        onPointerUp(event2);
        return;
      }
      const transform2 = getTransform();
      position = getEventPosition(event2, containerBounds);
      closestHandle = getClosestHandle(pointToRendererPoint(position, transform2, false, [
        1,
        1
      ]), connectionRadius, nodeLookup, fromHandle);
      if (!autoPanStarted) {
        autoPan();
        autoPanStarted = true;
      }
      const result = isValidHandle(event2, {
        handle: closestHandle,
        connectionMode,
        fromNodeId: nodeId,
        fromHandleId: handleId,
        fromType: isTarget ? "target" : "source",
        isValidConnection,
        doc,
        lib,
        flowId,
        nodeLookup
      });
      handleDomNode = result.handleDomNode;
      connection = result.connection;
      isValid = isConnectionValid(!!closestHandle, result.isValid);
      const newConnection2 = {
        ...previousConnection,
        isValid,
        to: closestHandle && isValid ? rendererPointToPoint({
          x: closestHandle.x,
          y: closestHandle.y
        }, transform2) : position,
        toHandle: result.toHandle,
        toPosition: isValid && result.toHandle ? result.toHandle.position : oppositePosition[fromHandle.position],
        toNode: result.toHandle ? nodeLookup.get(result.toHandle.nodeId) : null
      };
      if (isValid && closestHandle && previousConnection.toHandle && newConnection2.toHandle && previousConnection.toHandle.type === newConnection2.toHandle.type && previousConnection.toHandle.nodeId === newConnection2.toHandle.nodeId && previousConnection.toHandle.id === newConnection2.toHandle.id && previousConnection.to.x === newConnection2.to.x && previousConnection.to.y === newConnection2.to.y) {
        return;
      }
      updateConnection(newConnection2);
      previousConnection = newConnection2;
    }
    function onPointerUp(event2) {
      if ((closestHandle || handleDomNode) && connection && isValid) {
        onConnect == null ? void 0 : onConnect(connection);
      }
      const { inProgress, ...connectionState } = previousConnection;
      const finalConnectionState = {
        ...connectionState,
        toPosition: previousConnection.toHandle ? previousConnection.toPosition : null
      };
      onConnectEnd == null ? void 0 : onConnectEnd(event2, finalConnectionState);
      if (edgeUpdaterType) {
        onReconnectEnd == null ? void 0 : onReconnectEnd(event2, finalConnectionState);
      }
      cancelConnection();
      cancelAnimationFrame(autoPanId);
      autoPanStarted = false;
      isValid = false;
      connection = null;
      handleDomNode = null;
      doc.removeEventListener("mousemove", onPointerMove);
      doc.removeEventListener("mouseup", onPointerUp);
      doc.removeEventListener("touchmove", onPointerMove);
      doc.removeEventListener("touchend", onPointerUp);
    }
    doc.addEventListener("mousemove", onPointerMove);
    doc.addEventListener("mouseup", onPointerUp);
    doc.addEventListener("touchmove", onPointerMove);
    doc.addEventListener("touchend", onPointerUp);
  }
  function isValidHandle(event, { handle, connectionMode, fromNodeId, fromHandleId, fromType, doc, lib, flowId, isValidConnection = alwaysValid, nodeLookup }) {
    const isTarget = fromType === "target";
    const handleDomNode = handle ? doc.querySelector(`.${lib}-flow__handle[data-id="${flowId}-${handle == null ? void 0 : handle.nodeId}-${handle == null ? void 0 : handle.id}-${handle == null ? void 0 : handle.type}"]`) : null;
    const { x, y } = getEventPosition(event);
    const handleBelow = doc.elementFromPoint(x, y);
    const handleToCheck = (handleBelow == null ? void 0 : handleBelow.classList.contains(`${lib}-flow__handle`)) ? handleBelow : handleDomNode;
    const result = {
      handleDomNode: handleToCheck,
      isValid: false,
      connection: null,
      toHandle: null
    };
    if (handleToCheck) {
      const handleType = getHandleType(void 0, handleToCheck);
      const handleNodeId = handleToCheck.getAttribute("data-nodeid");
      const handleId = handleToCheck.getAttribute("data-handleid");
      const connectable = handleToCheck.classList.contains("connectable");
      const connectableEnd = handleToCheck.classList.contains("connectableend");
      if (!handleNodeId || !handleType) {
        return result;
      }
      const connection = {
        source: isTarget ? handleNodeId : fromNodeId,
        sourceHandle: isTarget ? handleId : fromHandleId,
        target: isTarget ? fromNodeId : handleNodeId,
        targetHandle: isTarget ? fromHandleId : handleId
      };
      result.connection = connection;
      const isConnectable = connectable && connectableEnd;
      const isValid = isConnectable && (connectionMode === ConnectionMode.Strict ? isTarget && handleType === "source" || !isTarget && handleType === "target" : handleNodeId !== fromNodeId || handleId !== fromHandleId);
      result.isValid = isValid && isValidConnection(connection);
      result.toHandle = getHandle(handleNodeId, handleType, handleId, nodeLookup, connectionMode, false);
    }
    return result;
  }
  const XYHandle = {
    onPointerDown,
    isValid: isValidHandle
  };
  function XYMinimap({ domNode, panZoom, getTransform, getViewScale }) {
    const selection2 = select(domNode);
    function update({ translateExtent, width, height, zoomStep = 10, pannable = true, zoomable = true, inversePan = false }) {
      const zoomHandler = (event) => {
        const transform2 = getTransform();
        if (event.sourceEvent.type !== "wheel" || !panZoom) {
          return;
        }
        const pinchDelta = -event.sourceEvent.deltaY * (event.sourceEvent.deltaMode === 1 ? 0.05 : event.sourceEvent.deltaMode ? 1 : 2e-3) * zoomStep;
        const nextZoom = transform2[2] * Math.pow(2, pinchDelta);
        panZoom.scaleTo(nextZoom);
      };
      let panStart = [
        0,
        0
      ];
      const panStartHandler = (event) => {
        if (event.sourceEvent.type === "mousedown" || event.sourceEvent.type === "touchstart") {
          panStart = [
            event.sourceEvent.clientX ?? event.sourceEvent.touches[0].clientX,
            event.sourceEvent.clientY ?? event.sourceEvent.touches[0].clientY
          ];
        }
      };
      const panHandler = (event) => {
        const transform2 = getTransform();
        if (event.sourceEvent.type !== "mousemove" && event.sourceEvent.type !== "touchmove" || !panZoom) {
          return;
        }
        const panCurrent = [
          event.sourceEvent.clientX ?? event.sourceEvent.touches[0].clientX,
          event.sourceEvent.clientY ?? event.sourceEvent.touches[0].clientY
        ];
        const panDelta = [
          panCurrent[0] - panStart[0],
          panCurrent[1] - panStart[1]
        ];
        panStart = panCurrent;
        const moveScale = getViewScale() * Math.max(transform2[2], Math.log(transform2[2])) * (inversePan ? -1 : 1);
        const position = {
          x: transform2[0] - panDelta[0] * moveScale,
          y: transform2[1] - panDelta[1] * moveScale
        };
        const extent = [
          [
            0,
            0
          ],
          [
            width,
            height
          ]
        ];
        panZoom.setViewportConstrained({
          x: position.x,
          y: position.y,
          zoom: transform2[2]
        }, extent, translateExtent);
      };
      const zoomAndPanHandler = zoom().on("start", panStartHandler).on("zoom", pannable ? panHandler : null).on("zoom.wheel", zoomable ? zoomHandler : null);
      selection2.call(zoomAndPanHandler, {});
    }
    function destroy() {
      selection2.on("zoom", null);
    }
    return {
      update,
      destroy,
      pointer
    };
  }
  const viewChanged = (prevViewport, eventViewport) => prevViewport.x !== eventViewport.x || prevViewport.y !== eventViewport.y || prevViewport.zoom !== eventViewport.k;
  const transformToViewport = (transform2) => ({
    x: transform2.x,
    y: transform2.y,
    zoom: transform2.k
  });
  const viewportToTransform = ({ x, y, zoom: zoom2 }) => identity$3.translate(x, y).scale(zoom2);
  const isWrappedWithClass = (event, className) => event.target.closest(`.${className}`);
  const isRightClickPan = (panOnDrag, usedButton) => usedButton === 2 && Array.isArray(panOnDrag) && panOnDrag.includes(2);
  const getD3Transition = (selection2, duration = 0, onEnd = () => {
  }) => {
    const hasDuration = typeof duration === "number" && duration > 0;
    if (!hasDuration) {
      onEnd();
    }
    return hasDuration ? selection2.transition().duration(duration).on("end", onEnd) : selection2;
  };
  const wheelDelta = (event) => {
    const factor = event.ctrlKey && isMacOs() ? 10 : 1;
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * factor;
  };
  function createPanOnScrollHandler({ zoomPanValues, noWheelClassName, d3Selection, d3Zoom, panOnScrollMode, panOnScrollSpeed, zoomOnPinch, onPanZoomStart, onPanZoom, onPanZoomEnd }) {
    return (event) => {
      if (isWrappedWithClass(event, noWheelClassName)) {
        return false;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      const currentZoom = d3Selection.property("__zoom").k || 1;
      if (event.ctrlKey && zoomOnPinch) {
        const point = pointer(event);
        const pinchDelta = wheelDelta(event);
        const zoom2 = currentZoom * Math.pow(2, pinchDelta);
        d3Zoom.scaleTo(d3Selection, zoom2, point, event);
        return;
      }
      const deltaNormalize = event.deltaMode === 1 ? 20 : 1;
      let deltaX = panOnScrollMode === PanOnScrollMode.Vertical ? 0 : event.deltaX * deltaNormalize;
      let deltaY = panOnScrollMode === PanOnScrollMode.Horizontal ? 0 : event.deltaY * deltaNormalize;
      if (!isMacOs() && event.shiftKey && panOnScrollMode !== PanOnScrollMode.Vertical) {
        deltaX = event.deltaY * deltaNormalize;
        deltaY = 0;
      }
      d3Zoom.translateBy(d3Selection, -(deltaX / currentZoom) * panOnScrollSpeed, -(deltaY / currentZoom) * panOnScrollSpeed, {
        internal: true
      });
      const nextViewport = transformToViewport(d3Selection.property("__zoom"));
      clearTimeout(zoomPanValues.panScrollTimeout);
      if (!zoomPanValues.isPanScrolling) {
        zoomPanValues.isPanScrolling = true;
        onPanZoomStart == null ? void 0 : onPanZoomStart(event, nextViewport);
      }
      if (zoomPanValues.isPanScrolling) {
        onPanZoom == null ? void 0 : onPanZoom(event, nextViewport);
        zoomPanValues.panScrollTimeout = setTimeout(() => {
          onPanZoomEnd == null ? void 0 : onPanZoomEnd(event, nextViewport);
          zoomPanValues.isPanScrolling = false;
        }, 150);
      }
    };
  }
  function createZoomOnScrollHandler({ noWheelClassName, preventScrolling, d3ZoomHandler }) {
    return function(event, d) {
      const preventZoom = !preventScrolling && event.type === "wheel" && !event.ctrlKey;
      if (preventZoom || isWrappedWithClass(event, noWheelClassName)) {
        return null;
      }
      event.preventDefault();
      d3ZoomHandler.call(this, event, d);
    };
  }
  function createPanZoomStartHandler({ zoomPanValues, onDraggingChange, onPanZoomStart }) {
    return (event) => {
      var _a, _b, _c;
      if ((_a = event.sourceEvent) == null ? void 0 : _a.internal) {
        return;
      }
      const viewport = transformToViewport(event.transform);
      zoomPanValues.mouseButton = ((_b = event.sourceEvent) == null ? void 0 : _b.button) || 0;
      zoomPanValues.isZoomingOrPanning = true;
      zoomPanValues.prevViewport = viewport;
      if (((_c = event.sourceEvent) == null ? void 0 : _c.type) === "mousedown") {
        onDraggingChange(true);
      }
      if (onPanZoomStart) {
        onPanZoomStart == null ? void 0 : onPanZoomStart(event.sourceEvent, viewport);
      }
    };
  }
  function createPanZoomHandler({ zoomPanValues, panOnDrag, onPaneContextMenu, onTransformChange, onPanZoom }) {
    return (event) => {
      var _a, _b;
      zoomPanValues.usedRightMouseButton = !!(onPaneContextMenu && isRightClickPan(panOnDrag, zoomPanValues.mouseButton ?? 0));
      if (!((_a = event.sourceEvent) == null ? void 0 : _a.sync)) {
        onTransformChange([
          event.transform.x,
          event.transform.y,
          event.transform.k
        ]);
      }
      if (onPanZoom && !((_b = event.sourceEvent) == null ? void 0 : _b.internal)) {
        onPanZoom == null ? void 0 : onPanZoom(event.sourceEvent, transformToViewport(event.transform));
      }
    };
  }
  function createPanZoomEndHandler({ zoomPanValues, panOnDrag, panOnScroll, onDraggingChange, onPanZoomEnd, onPaneContextMenu }) {
    return (event) => {
      var _a;
      if ((_a = event.sourceEvent) == null ? void 0 : _a.internal) {
        return;
      }
      zoomPanValues.isZoomingOrPanning = false;
      if (onPaneContextMenu && isRightClickPan(panOnDrag, zoomPanValues.mouseButton ?? 0) && !zoomPanValues.usedRightMouseButton && event.sourceEvent) {
        onPaneContextMenu(event.sourceEvent);
      }
      zoomPanValues.usedRightMouseButton = false;
      onDraggingChange(false);
      if (onPanZoomEnd && viewChanged(zoomPanValues.prevViewport, event.transform)) {
        const viewport = transformToViewport(event.transform);
        zoomPanValues.prevViewport = viewport;
        clearTimeout(zoomPanValues.timerId);
        zoomPanValues.timerId = setTimeout(() => {
          onPanZoomEnd == null ? void 0 : onPanZoomEnd(event.sourceEvent, viewport);
        }, panOnScroll ? 150 : 0);
      }
    };
  }
  function createFilter({ zoomActivationKeyPressed, zoomOnScroll, zoomOnPinch, panOnDrag, panOnScroll, zoomOnDoubleClick, userSelectionActive, noWheelClassName, noPanClassName, lib }) {
    return (event) => {
      var _a;
      const zoomScroll = zoomActivationKeyPressed || zoomOnScroll;
      const pinchZoom = zoomOnPinch && event.ctrlKey;
      if (event.button === 1 && event.type === "mousedown" && (isWrappedWithClass(event, `${lib}-flow__node`) || isWrappedWithClass(event, `${lib}-flow__edge`))) {
        return true;
      }
      if (!panOnDrag && !zoomScroll && !panOnScroll && !zoomOnDoubleClick && !zoomOnPinch) {
        return false;
      }
      if (userSelectionActive) {
        return false;
      }
      if (isWrappedWithClass(event, noWheelClassName) && event.type === "wheel") {
        return false;
      }
      if (isWrappedWithClass(event, noPanClassName) && (event.type !== "wheel" || panOnScroll && event.type === "wheel" && !zoomActivationKeyPressed)) {
        return false;
      }
      if (!zoomOnPinch && event.ctrlKey && event.type === "wheel") {
        return false;
      }
      if (!zoomOnPinch && event.type === "touchstart" && ((_a = event.touches) == null ? void 0 : _a.length) > 1) {
        event.preventDefault();
        return false;
      }
      if (!zoomScroll && !panOnScroll && !pinchZoom && event.type === "wheel") {
        return false;
      }
      if (!panOnDrag && (event.type === "mousedown" || event.type === "touchstart")) {
        return false;
      }
      if (Array.isArray(panOnDrag) && !panOnDrag.includes(event.button) && event.type === "mousedown") {
        return false;
      }
      const buttonAllowed = Array.isArray(panOnDrag) && panOnDrag.includes(event.button) || !event.button || event.button <= 1;
      return (!event.ctrlKey || event.type === "wheel") && buttonAllowed;
    };
  }
  function XYPanZoom({ domNode, minZoom, maxZoom, paneClickDistance, translateExtent, viewport, onPanZoom, onPanZoomStart, onPanZoomEnd, onDraggingChange }) {
    const zoomPanValues = {
      isZoomingOrPanning: false,
      usedRightMouseButton: false,
      prevViewport: {
        x: 0,
        y: 0,
        zoom: 0
      },
      mouseButton: 0,
      timerId: void 0,
      panScrollTimeout: void 0,
      isPanScrolling: false
    };
    const bbox = domNode.getBoundingClientRect();
    const d3ZoomInstance = zoom().clickDistance(!isNumeric(paneClickDistance) || paneClickDistance < 0 ? 0 : paneClickDistance).scaleExtent([
      minZoom,
      maxZoom
    ]).translateExtent(translateExtent);
    const d3Selection = select(domNode).call(d3ZoomInstance);
    setViewportConstrained({
      x: viewport.x,
      y: viewport.y,
      zoom: clamp(viewport.zoom, minZoom, maxZoom)
    }, [
      [
        0,
        0
      ],
      [
        bbox.width,
        bbox.height
      ]
    ], translateExtent);
    const d3ZoomHandler = d3Selection.on("wheel.zoom");
    const d3DblClickZoomHandler = d3Selection.on("dblclick.zoom");
    d3ZoomInstance.wheelDelta(wheelDelta);
    function setTransform(transform2, options) {
      if (d3Selection) {
        return new Promise((resolve) => {
          d3ZoomInstance == null ? void 0 : d3ZoomInstance.transform(getD3Transition(d3Selection, options == null ? void 0 : options.duration, () => resolve(true)), transform2);
        });
      }
      return Promise.resolve(false);
    }
    function update({ noWheelClassName, noPanClassName, onPaneContextMenu, userSelectionActive, panOnScroll, panOnDrag, panOnScrollMode, panOnScrollSpeed, preventScrolling, zoomOnPinch, zoomOnScroll, zoomOnDoubleClick, zoomActivationKeyPressed, lib, onTransformChange }) {
      if (userSelectionActive && !zoomPanValues.isZoomingOrPanning) {
        destroy();
      }
      const isPanOnScroll = panOnScroll && !zoomActivationKeyPressed && !userSelectionActive;
      const wheelHandler = isPanOnScroll ? createPanOnScrollHandler({
        zoomPanValues,
        noWheelClassName,
        d3Selection,
        d3Zoom: d3ZoomInstance,
        panOnScrollMode,
        panOnScrollSpeed,
        zoomOnPinch,
        onPanZoomStart,
        onPanZoom,
        onPanZoomEnd
      }) : createZoomOnScrollHandler({
        noWheelClassName,
        preventScrolling,
        d3ZoomHandler
      });
      d3Selection.on("wheel.zoom", wheelHandler, {
        passive: false
      });
      if (!userSelectionActive) {
        const startHandler = createPanZoomStartHandler({
          zoomPanValues,
          onDraggingChange,
          onPanZoomStart
        });
        d3ZoomInstance.on("start", startHandler);
        const panZoomHandler = createPanZoomHandler({
          zoomPanValues,
          panOnDrag,
          onPaneContextMenu: !!onPaneContextMenu,
          onPanZoom,
          onTransformChange
        });
        d3ZoomInstance.on("zoom", panZoomHandler);
        const panZoomEndHandler = createPanZoomEndHandler({
          zoomPanValues,
          panOnDrag,
          panOnScroll,
          onPaneContextMenu,
          onPanZoomEnd,
          onDraggingChange
        });
        d3ZoomInstance.on("end", panZoomEndHandler);
      }
      const filter2 = createFilter({
        zoomActivationKeyPressed,
        panOnDrag,
        zoomOnScroll,
        panOnScroll,
        zoomOnDoubleClick,
        zoomOnPinch,
        userSelectionActive,
        noPanClassName,
        noWheelClassName,
        lib
      });
      d3ZoomInstance.filter(filter2);
      if (zoomOnDoubleClick) {
        d3Selection.on("dblclick.zoom", d3DblClickZoomHandler);
      } else {
        d3Selection.on("dblclick.zoom", null);
      }
    }
    function destroy() {
      d3ZoomInstance.on("zoom", null);
    }
    async function setViewportConstrained(viewport2, extent, translateExtent2) {
      const nextTransform = viewportToTransform(viewport2);
      const contrainedTransform = d3ZoomInstance == null ? void 0 : d3ZoomInstance.constrain()(nextTransform, extent, translateExtent2);
      if (contrainedTransform) {
        await setTransform(contrainedTransform);
      }
      return new Promise((resolve) => resolve(contrainedTransform));
    }
    async function setViewport(viewport2, options) {
      const nextTransform = viewportToTransform(viewport2);
      await setTransform(nextTransform, options);
      return new Promise((resolve) => resolve(nextTransform));
    }
    function syncViewport(viewport2) {
      if (d3Selection) {
        const nextTransform = viewportToTransform(viewport2);
        const currentTransform = d3Selection.property("__zoom");
        if (currentTransform.k !== viewport2.zoom || currentTransform.x !== viewport2.x || currentTransform.y !== viewport2.y) {
          d3ZoomInstance == null ? void 0 : d3ZoomInstance.transform(d3Selection, nextTransform, null, {
            sync: true
          });
        }
      }
    }
    function getViewport() {
      const transform$1 = d3Selection ? transform(d3Selection.node()) : {
        x: 0,
        y: 0,
        k: 1
      };
      return {
        x: transform$1.x,
        y: transform$1.y,
        zoom: transform$1.k
      };
    }
    function scaleTo(zoom2, options) {
      if (d3Selection) {
        return new Promise((resolve) => {
          d3ZoomInstance == null ? void 0 : d3ZoomInstance.scaleTo(getD3Transition(d3Selection, options == null ? void 0 : options.duration, () => resolve(true)), zoom2);
        });
      }
      return Promise.resolve(false);
    }
    function scaleBy(factor, options) {
      if (d3Selection) {
        return new Promise((resolve) => {
          d3ZoomInstance == null ? void 0 : d3ZoomInstance.scaleBy(getD3Transition(d3Selection, options == null ? void 0 : options.duration, () => resolve(true)), factor);
        });
      }
      return Promise.resolve(false);
    }
    function setScaleExtent(scaleExtent) {
      d3ZoomInstance == null ? void 0 : d3ZoomInstance.scaleExtent(scaleExtent);
    }
    function setTranslateExtent(translateExtent2) {
      d3ZoomInstance == null ? void 0 : d3ZoomInstance.translateExtent(translateExtent2);
    }
    function setClickDistance(distance2) {
      const validDistance = !isNumeric(distance2) || distance2 < 0 ? 0 : distance2;
      d3ZoomInstance == null ? void 0 : d3ZoomInstance.clickDistance(validDistance);
    }
    return {
      update,
      destroy,
      setViewport,
      setViewportConstrained,
      getViewport,
      scaleTo,
      scaleBy,
      setScaleExtent,
      setTranslateExtent,
      syncViewport,
      setClickDistance
    };
  }
  var ResizeControlVariant;
  (function(ResizeControlVariant2) {
    ResizeControlVariant2["Line"] = "line";
    ResizeControlVariant2["Handle"] = "handle";
  })(ResizeControlVariant || (ResizeControlVariant = {}));
  const XY_RESIZER_HANDLE_POSITIONS = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right"
  ];
  const XY_RESIZER_LINE_POSITIONS = [
    "top",
    "right",
    "bottom",
    "left"
  ];
  function getResizeDirection({ width, prevWidth, height, prevHeight, affectsX, affectsY }) {
    const deltaWidth = width - prevWidth;
    const deltaHeight = height - prevHeight;
    const direction = [
      deltaWidth > 0 ? 1 : deltaWidth < 0 ? -1 : 0,
      deltaHeight > 0 ? 1 : deltaHeight < 0 ? -1 : 0
    ];
    if (deltaWidth && affectsX) {
      direction[0] = direction[0] * -1;
    }
    if (deltaHeight && affectsY) {
      direction[1] = direction[1] * -1;
    }
    return direction;
  }
  function getControlDirection(controlPosition) {
    const isHorizontal = controlPosition.includes("right") || controlPosition.includes("left");
    const isVertical = controlPosition.includes("bottom") || controlPosition.includes("top");
    const affectsX = controlPosition.includes("left");
    const affectsY = controlPosition.includes("top");
    return {
      isHorizontal,
      isVertical,
      affectsX,
      affectsY
    };
  }
  function getLowerExtentClamp(lowerExtent, lowerBound) {
    return Math.max(0, lowerBound - lowerExtent);
  }
  function getUpperExtentClamp(upperExtent, upperBound) {
    return Math.max(0, upperExtent - upperBound);
  }
  function getSizeClamp(size, minSize, maxSize) {
    return Math.max(0, minSize - size, size - maxSize);
  }
  function xor(a, b) {
    return a ? !b : b;
  }
  function getDimensionsAfterResize(startValues, controlDirection, pointerPosition, boundaries, keepAspectRatio, nodeOrigin, extent, childExtent) {
    let { affectsX, affectsY } = controlDirection;
    const { isHorizontal, isVertical } = controlDirection;
    const isDiagonal = isHorizontal && isVertical;
    const { xSnapped, ySnapped } = pointerPosition;
    const { minWidth, maxWidth, minHeight, maxHeight } = boundaries;
    const { x: startX, y: startY, width: startWidth, height: startHeight, aspectRatio } = startValues;
    let distX = Math.floor(isHorizontal ? xSnapped - startValues.pointerX : 0);
    let distY = Math.floor(isVertical ? ySnapped - startValues.pointerY : 0);
    const newWidth = startWidth + (affectsX ? -distX : distX);
    const newHeight = startHeight + (affectsY ? -distY : distY);
    const originOffsetX = -nodeOrigin[0] * startWidth;
    const originOffsetY = -nodeOrigin[1] * startHeight;
    let clampX = getSizeClamp(newWidth, minWidth, maxWidth);
    let clampY = getSizeClamp(newHeight, minHeight, maxHeight);
    if (extent) {
      let xExtentClamp = 0;
      let yExtentClamp = 0;
      if (affectsX && distX < 0) {
        xExtentClamp = getLowerExtentClamp(startX + distX + originOffsetX, extent[0][0]);
      } else if (!affectsX && distX > 0) {
        xExtentClamp = getUpperExtentClamp(startX + newWidth + originOffsetX, extent[1][0]);
      }
      if (affectsY && distY < 0) {
        yExtentClamp = getLowerExtentClamp(startY + distY + originOffsetY, extent[0][1]);
      } else if (!affectsY && distY > 0) {
        yExtentClamp = getUpperExtentClamp(startY + newHeight + originOffsetY, extent[1][1]);
      }
      clampX = Math.max(clampX, xExtentClamp);
      clampY = Math.max(clampY, yExtentClamp);
    }
    if (childExtent) {
      let xExtentClamp = 0;
      let yExtentClamp = 0;
      if (affectsX && distX > 0) {
        xExtentClamp = getUpperExtentClamp(startX + distX, childExtent[0][0]);
      } else if (!affectsX && distX < 0) {
        xExtentClamp = getLowerExtentClamp(startX + newWidth, childExtent[1][0]);
      }
      if (affectsY && distY > 0) {
        yExtentClamp = getUpperExtentClamp(startY + distY, childExtent[0][1]);
      } else if (!affectsY && distY < 0) {
        yExtentClamp = getLowerExtentClamp(startY + newHeight, childExtent[1][1]);
      }
      clampX = Math.max(clampX, xExtentClamp);
      clampY = Math.max(clampY, yExtentClamp);
    }
    if (keepAspectRatio) {
      if (isHorizontal) {
        const aspectHeightClamp = getSizeClamp(newWidth / aspectRatio, minHeight, maxHeight) * aspectRatio;
        clampX = Math.max(clampX, aspectHeightClamp);
        if (extent) {
          let aspectExtentClamp = 0;
          if (!affectsX && !affectsY || affectsX && !affectsY && isDiagonal) {
            aspectExtentClamp = getUpperExtentClamp(startY + originOffsetY + newWidth / aspectRatio, extent[1][1]) * aspectRatio;
          } else {
            aspectExtentClamp = getLowerExtentClamp(startY + originOffsetY + (affectsX ? distX : -distX) / aspectRatio, extent[0][1]) * aspectRatio;
          }
          clampX = Math.max(clampX, aspectExtentClamp);
        }
        if (childExtent) {
          let aspectExtentClamp = 0;
          if (!affectsX && !affectsY || affectsX && !affectsY && isDiagonal) {
            aspectExtentClamp = getLowerExtentClamp(startY + newWidth / aspectRatio, childExtent[1][1]) * aspectRatio;
          } else {
            aspectExtentClamp = getUpperExtentClamp(startY + (affectsX ? distX : -distX) / aspectRatio, childExtent[0][1]) * aspectRatio;
          }
          clampX = Math.max(clampX, aspectExtentClamp);
        }
      }
      if (isVertical) {
        const aspectWidthClamp = getSizeClamp(newHeight * aspectRatio, minWidth, maxWidth) / aspectRatio;
        clampY = Math.max(clampY, aspectWidthClamp);
        if (extent) {
          let aspectExtentClamp = 0;
          if (!affectsX && !affectsY || affectsY && !affectsX && isDiagonal) {
            aspectExtentClamp = getUpperExtentClamp(startX + newHeight * aspectRatio + originOffsetX, extent[1][0]) / aspectRatio;
          } else {
            aspectExtentClamp = getLowerExtentClamp(startX + (affectsY ? distY : -distY) * aspectRatio + originOffsetX, extent[0][0]) / aspectRatio;
          }
          clampY = Math.max(clampY, aspectExtentClamp);
        }
        if (childExtent) {
          let aspectExtentClamp = 0;
          if (!affectsX && !affectsY || affectsY && !affectsX && isDiagonal) {
            aspectExtentClamp = getLowerExtentClamp(startX + newHeight * aspectRatio, childExtent[1][0]) / aspectRatio;
          } else {
            aspectExtentClamp = getUpperExtentClamp(startX + (affectsY ? distY : -distY) * aspectRatio, childExtent[0][0]) / aspectRatio;
          }
          clampY = Math.max(clampY, aspectExtentClamp);
        }
      }
    }
    distY = distY + (distY < 0 ? clampY : -clampY);
    distX = distX + (distX < 0 ? clampX : -clampX);
    if (keepAspectRatio) {
      if (isDiagonal) {
        if (newWidth > newHeight * aspectRatio) {
          distY = (xor(affectsX, affectsY) ? -distX : distX) / aspectRatio;
        } else {
          distX = (xor(affectsX, affectsY) ? -distY : distY) * aspectRatio;
        }
      } else {
        if (isHorizontal) {
          distY = distX / aspectRatio;
          affectsY = affectsX;
        } else {
          distX = distY * aspectRatio;
          affectsX = affectsY;
        }
      }
    }
    const x = affectsX ? startX + distX : startX;
    const y = affectsY ? startY + distY : startY;
    return {
      width: startWidth + (affectsX ? -distX : distX),
      height: startHeight + (affectsY ? -distY : distY),
      x: nodeOrigin[0] * distX * (!affectsX ? 1 : -1) + x,
      y: nodeOrigin[1] * distY * (!affectsY ? 1 : -1) + y
    };
  }
  const initPrevValues$1 = {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };
  const initStartValues = {
    ...initPrevValues$1,
    pointerX: 0,
    pointerY: 0,
    aspectRatio: 1
  };
  function nodeToParentExtent(node) {
    return [
      [
        0,
        0
      ],
      [
        node.measured.width,
        node.measured.height
      ]
    ];
  }
  function nodeToChildExtent(child, parent, nodeOrigin) {
    const x = parent.position.x + child.position.x;
    const y = parent.position.y + child.position.y;
    const width = child.measured.width ?? 0;
    const height = child.measured.height ?? 0;
    const originOffsetX = nodeOrigin[0] * width;
    const originOffsetY = nodeOrigin[1] * height;
    return [
      [
        x - originOffsetX,
        y - originOffsetY
      ],
      [
        x + width - originOffsetX,
        y + height - originOffsetY
      ]
    ];
  }
  function XYResizer({ domNode, nodeId, getStoreItems, onChange, onEnd }) {
    const selection2 = select(domNode);
    function update({ controlPosition, boundaries, keepAspectRatio, onResizeStart, onResize, onResizeEnd, shouldResize }) {
      let prevValues = {
        ...initPrevValues$1
      };
      let startValues = {
        ...initStartValues
      };
      const controlDirection = getControlDirection(controlPosition);
      let node = void 0;
      let containerBounds = null;
      let childNodes = [];
      let parentNode = void 0;
      let parentExtent = void 0;
      let childExtent = void 0;
      const dragHandler = drag().on("start", (event) => {
        const { nodeLookup, transform: transform2, snapGrid, snapToGrid, nodeOrigin, paneDomNode } = getStoreItems();
        node = nodeLookup.get(nodeId);
        if (!node) {
          return;
        }
        containerBounds = (paneDomNode == null ? void 0 : paneDomNode.getBoundingClientRect()) ?? null;
        const { xSnapped, ySnapped } = getPointerPosition(event.sourceEvent, {
          transform: transform2,
          snapGrid,
          snapToGrid,
          containerBounds
        });
        prevValues = {
          width: node.measured.width ?? 0,
          height: node.measured.height ?? 0,
          x: node.position.x ?? 0,
          y: node.position.y ?? 0
        };
        startValues = {
          ...prevValues,
          pointerX: xSnapped,
          pointerY: ySnapped,
          aspectRatio: prevValues.width / prevValues.height
        };
        parentNode = void 0;
        if (node.parentId && (node.extent === "parent" || node.expandParent)) {
          parentNode = nodeLookup.get(node.parentId);
          parentExtent = parentNode && node.extent === "parent" ? nodeToParentExtent(parentNode) : void 0;
        }
        childNodes = [];
        childExtent = void 0;
        for (const [childId, child] of nodeLookup) {
          if (child.parentId === nodeId) {
            childNodes.push({
              id: childId,
              position: {
                ...child.position
              },
              extent: child.extent
            });
            if (child.extent === "parent" || child.expandParent) {
              const extent = nodeToChildExtent(child, node, child.origin ?? nodeOrigin);
              if (childExtent) {
                childExtent = [
                  [
                    Math.min(extent[0][0], childExtent[0][0]),
                    Math.min(extent[0][1], childExtent[0][1])
                  ],
                  [
                    Math.max(extent[1][0], childExtent[1][0]),
                    Math.max(extent[1][1], childExtent[1][1])
                  ]
                ];
              } else {
                childExtent = extent;
              }
            }
          }
        }
        onResizeStart == null ? void 0 : onResizeStart(event, {
          ...prevValues
        });
      }).on("drag", (event) => {
        const { transform: transform2, snapGrid, snapToGrid, nodeOrigin: storeNodeOrigin } = getStoreItems();
        const pointerPosition = getPointerPosition(event.sourceEvent, {
          transform: transform2,
          snapGrid,
          snapToGrid,
          containerBounds
        });
        const childChanges = [];
        if (!node) {
          return;
        }
        const { x: prevX, y: prevY, width: prevWidth, height: prevHeight } = prevValues;
        const change = {};
        const nodeOrigin = node.origin ?? storeNodeOrigin;
        const { width, height, x, y } = getDimensionsAfterResize(startValues, controlDirection, pointerPosition, boundaries, keepAspectRatio, nodeOrigin, parentExtent, childExtent);
        const isWidthChange = width !== prevWidth;
        const isHeightChange = height !== prevHeight;
        const isXPosChange = x !== prevX && isWidthChange;
        const isYPosChange = y !== prevY && isHeightChange;
        if (!isXPosChange && !isYPosChange && !isWidthChange && !isHeightChange) {
          return;
        }
        if (isXPosChange || isYPosChange || nodeOrigin[0] === 1 || nodeOrigin[1] === 1) {
          change.x = isXPosChange ? x : prevValues.x;
          change.y = isYPosChange ? y : prevValues.y;
          prevValues.x = change.x;
          prevValues.y = change.y;
          if (childNodes.length > 0) {
            const xChange = x - prevX;
            const yChange = y - prevY;
            for (const childNode of childNodes) {
              childNode.position = {
                x: childNode.position.x - xChange + nodeOrigin[0] * (width - prevWidth),
                y: childNode.position.y - yChange + nodeOrigin[1] * (height - prevHeight)
              };
              childChanges.push(childNode);
            }
          }
        }
        if (isWidthChange || isHeightChange) {
          change.width = isWidthChange ? width : prevValues.width;
          change.height = isHeightChange ? height : prevValues.height;
          prevValues.width = change.width;
          prevValues.height = change.height;
        }
        if (parentNode && node.expandParent) {
          const xLimit = nodeOrigin[0] * (change.width ?? 0);
          if (change.x && change.x < xLimit) {
            prevValues.x = xLimit;
            startValues.x = startValues.x - (change.x - xLimit);
          }
          const yLimit = nodeOrigin[1] * (change.height ?? 0);
          if (change.y && change.y < yLimit) {
            prevValues.y = yLimit;
            startValues.y = startValues.y - (change.y - yLimit);
          }
        }
        const direction = getResizeDirection({
          width: prevValues.width,
          prevWidth,
          height: prevValues.height,
          prevHeight,
          affectsX: controlDirection.affectsX,
          affectsY: controlDirection.affectsY
        });
        const nextValues = {
          ...prevValues,
          direction
        };
        const callResize = shouldResize == null ? void 0 : shouldResize(event, nextValues);
        if (callResize === false) {
          return;
        }
        onResize == null ? void 0 : onResize(event, nextValues);
        onChange(change, childChanges);
      }).on("end", (event) => {
        onResizeEnd == null ? void 0 : onResizeEnd(event, {
          ...prevValues
        });
        onEnd == null ? void 0 : onEnd();
      });
      selection2.call(dragHandler);
    }
    function destroy() {
      selection2.on(".drag", null);
    }
    return {
      update,
      destroy
    };
  }
  var withSelector = {
    exports: {}
  };
  var withSelector_production_min = {};
  var shim = {
    exports: {}
  };
  var useSyncExternalStoreShim_production_min = {};
  var e = reactExports;
  function h$1(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var k = "function" === typeof Object.is ? Object.is : h$1, l = e.useState, m = e.useEffect, n$1 = e.useLayoutEffect, p$1 = e.useDebugValue;
  function q$1(a, b) {
    var d = b(), f = l({
      inst: {
        value: d,
        getSnapshot: b
      }
    }), c = f[0].inst, g = f[1];
    n$1(function() {
      c.value = d;
      c.getSnapshot = b;
      r$1(c) && g({
        inst: c
      });
    }, [
      a,
      d,
      b
    ]);
    m(function() {
      r$1(c) && g({
        inst: c
      });
      return a(function() {
        r$1(c) && g({
          inst: c
        });
      });
    }, [
      a
    ]);
    p$1(d);
    return d;
  }
  function r$1(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var d = b();
      return !k(a, d);
    } catch (f) {
      return true;
    }
  }
  function t$1(a, b) {
    return b();
  }
  var u$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t$1 : q$1;
  useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e.useSyncExternalStore ? e.useSyncExternalStore : u$1;
  {
    shim.exports = useSyncExternalStoreShim_production_min;
  }
  shimExports = shim.exports;
  useSyncExternalStoreExports$1 = getDefaultExportFromCjs(shimExports);
  var h = reactExports, n = shimExports;
  function p(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var q = "function" === typeof Object.is ? Object.is : p, r = n.useSyncExternalStore, t = h.useRef, u = h.useEffect, v = h.useMemo, w = h.useDebugValue;
  withSelector_production_min.useSyncExternalStoreWithSelector = function(a, b, e2, l2, g) {
    var c = t(null);
    if (null === c.current) {
      var f = {
        hasValue: false,
        value: null
      };
      c.current = f;
    } else f = c.current;
    c = v(function() {
      function a2(a3) {
        if (!c2) {
          c2 = true;
          d2 = a3;
          a3 = l2(a3);
          if (void 0 !== g && f.hasValue) {
            var b2 = f.value;
            if (g(b2, a3)) return k2 = b2;
          }
          return k2 = a3;
        }
        b2 = k2;
        if (q(d2, a3)) return b2;
        var e3 = l2(a3);
        if (void 0 !== g && g(b2, e3)) return b2;
        d2 = a3;
        return k2 = e3;
      }
      var c2 = false, d2, k2, m2 = void 0 === e2 ? null : e2;
      return [
        function() {
          return a2(b());
        },
        null === m2 ? void 0 : function() {
          return a2(m2());
        }
      ];
    }, [
      b,
      e2,
      l2,
      g
    ]);
    var d = r(a, c[0], c[1]);
    u(function() {
      f.hasValue = true;
      f.value = d;
    }, [
      d
    ]);
    w(d);
    return d;
  };
  {
    withSelector.exports = withSelector_production_min;
  }
  var withSelectorExports = withSelector.exports;
  useSyncExternalStoreExports = getDefaultExportFromCjs(withSelectorExports);
  const __vite_import_meta_env__ = {
    "BASE_URL": "/NoLLMChat/",
    "DEV": false,
    "MODE": "production",
    "PROD": true,
    "SSR": false,
    "VITE_BASE_URL": "/NoLLMChat/"
  };
  const createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
        listeners.forEach((listener) => listener(state, previousState));
      }
    };
    const getState = () => state;
    const getInitialState2 = () => initialState;
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const destroy = () => {
      if ((__vite_import_meta_env__ ? "production" : void 0) !== "production") {
        console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.");
      }
      listeners.clear();
    };
    const api = {
      setState,
      getState,
      getInitialState: getInitialState2,
      subscribe,
      destroy
    };
    const initialState = state = createState(setState, getState, api);
    return api;
  };
  const createStore$1 = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
  const { useDebugValue } = React;
  const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
  const identity$2 = (arg) => arg;
  function useStoreWithEqualityFn(api, selector2 = identity$2, equalityFn) {
    const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector2, equalityFn);
    useDebugValue(slice);
    return slice;
  }
  const createWithEqualityFnImpl = (createState, defaultEqualityFn) => {
    const api = createStore$1(createState);
    const useBoundStoreWithEqualityFn = (selector2, equalityFn = defaultEqualityFn) => useStoreWithEqualityFn(api, selector2, equalityFn);
    Object.assign(useBoundStoreWithEqualityFn, api);
    return useBoundStoreWithEqualityFn;
  };
  const createWithEqualityFn = (createState, defaultEqualityFn) => createState ? createWithEqualityFnImpl(createState, defaultEqualityFn) : createWithEqualityFnImpl;
  function shallow$1(objA, objB) {
    if (Object.is(objA, objB)) {
      return true;
    }
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
      return false;
    }
    if (objA instanceof Map && objB instanceof Map) {
      if (objA.size !== objB.size) return false;
      for (const [key, value] of objA) {
        if (!Object.is(value, objB.get(key))) {
          return false;
        }
      }
      return true;
    }
    if (objA instanceof Set && objB instanceof Set) {
      if (objA.size !== objB.size) return false;
      for (const value of objA) {
        if (!objB.has(value)) {
          return false;
        }
      }
      return true;
    }
    const keysA = Object.keys(objA);
    if (keysA.length !== Object.keys(objB).length) {
      return false;
    }
    for (const keyA of keysA) {
      if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) {
        return false;
      }
    }
    return true;
  }
  const StoreContext = reactExports.createContext(null);
  const Provider$1 = StoreContext.Provider;
  const zustandErrorMessage = errorMessages["error001"]();
  useStore = function(selector2, equalityFn) {
    const store = reactExports.useContext(StoreContext);
    if (store === null) {
      throw new Error(zustandErrorMessage);
    }
    return useStoreWithEqualityFn(store, selector2, equalityFn);
  };
  useStoreApi = function() {
    const store = reactExports.useContext(StoreContext);
    if (store === null) {
      throw new Error(zustandErrorMessage);
    }
    return reactExports.useMemo(() => ({
      getState: store.getState,
      setState: store.setState,
      subscribe: store.subscribe
    }), [
      store
    ]);
  };
  const style = {
    display: "none"
  };
  const ariaLiveStyle = {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0px, 0px, 0px, 0px)",
    clipPath: "inset(100%)"
  };
  const ARIA_NODE_DESC_KEY = "react-flow__node-desc";
  const ARIA_EDGE_DESC_KEY = "react-flow__edge-desc";
  const ARIA_LIVE_MESSAGE = "react-flow__aria-live";
  const selector$o = (s) => s.ariaLiveMessage;
  function AriaLiveMessage({ rfId }) {
    const ariaLiveMessage = useStore(selector$o);
    return jsxRuntimeExports.jsx("div", {
      id: `${ARIA_LIVE_MESSAGE}-${rfId}`,
      "aria-live": "assertive",
      "aria-atomic": "true",
      style: ariaLiveStyle,
      children: ariaLiveMessage
    });
  }
  function A11yDescriptions({ rfId, disableKeyboardA11y }) {
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        jsxRuntimeExports.jsxs("div", {
          id: `${ARIA_NODE_DESC_KEY}-${rfId}`,
          style,
          children: [
            "Press enter or space to select a node.",
            !disableKeyboardA11y && "You can then use the arrow keys to move the node around.",
            " Press delete to remove it and escape to cancel.",
            " "
          ]
        }),
        jsxRuntimeExports.jsx("div", {
          id: `${ARIA_EDGE_DESC_KEY}-${rfId}`,
          style,
          children: "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel."
        }),
        !disableKeyboardA11y && jsxRuntimeExports.jsx(AriaLiveMessage, {
          rfId
        })
      ]
    });
  }
  const selector$n = (s) => s.userSelectionActive ? "none" : "all";
  Panel = function({ position = "top-left", children: children2, className, style: style2, ...rest }) {
    const pointerEvents = useStore(selector$n);
    const positionClasses = `${position}`.split("-");
    return jsxRuntimeExports.jsx("div", {
      className: cc([
        "react-flow__panel",
        className,
        ...positionClasses
      ]),
      style: {
        ...style2,
        pointerEvents
      },
      ...rest,
      children: children2
    });
  };
  function Attribution({ proOptions, position = "bottom-right" }) {
    if (proOptions == null ? void 0 : proOptions.hideAttribution) {
      return null;
    }
    return jsxRuntimeExports.jsx(Panel, {
      position,
      className: "react-flow__attribution",
      "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev",
      children: jsxRuntimeExports.jsx("a", {
        href: "https://reactflow.dev",
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "React Flow attribution",
        children: "React Flow"
      })
    });
  }
  const selector$m = (s) => {
    const selectedNodes = [];
    const selectedEdges = [];
    for (const [, node] of s.nodeLookup) {
      if (node.selected) {
        selectedNodes.push(node.internals.userNode);
      }
    }
    for (const [, edge] of s.edgeLookup) {
      if (edge.selected) {
        selectedEdges.push(edge);
      }
    }
    return {
      selectedNodes,
      selectedEdges
    };
  };
  const selectId = (obj) => obj.id;
  function areEqual(a, b) {
    return shallow$1(a.selectedNodes.map(selectId), b.selectedNodes.map(selectId)) && shallow$1(a.selectedEdges.map(selectId), b.selectedEdges.map(selectId));
  }
  function SelectionListenerInner({ onSelectionChange }) {
    const store = useStoreApi();
    const { selectedNodes, selectedEdges } = useStore(selector$m, areEqual);
    reactExports.useEffect(() => {
      const params = {
        nodes: selectedNodes,
        edges: selectedEdges
      };
      onSelectionChange == null ? void 0 : onSelectionChange(params);
      store.getState().onSelectionChangeHandlers.forEach((fn) => fn(params));
    }, [
      selectedNodes,
      selectedEdges,
      onSelectionChange
    ]);
    return null;
  }
  const changeSelector = (s) => !!s.onSelectionChangeHandlers;
  function SelectionListener({ onSelectionChange }) {
    const storeHasSelectionChangeHandlers = useStore(changeSelector);
    if (onSelectionChange || storeHasSelectionChangeHandlers) {
      return jsxRuntimeExports.jsx(SelectionListenerInner, {
        onSelectionChange
      });
    }
    return null;
  }
  const defaultNodeOrigin = [
    0,
    0
  ];
  const defaultViewport = {
    x: 0,
    y: 0,
    zoom: 1
  };
  const reactFlowFieldsToTrack = [
    "nodes",
    "edges",
    "defaultNodes",
    "defaultEdges",
    "onConnect",
    "onConnectStart",
    "onConnectEnd",
    "onClickConnectStart",
    "onClickConnectEnd",
    "nodesDraggable",
    "nodesConnectable",
    "nodesFocusable",
    "edgesFocusable",
    "edgesReconnectable",
    "elevateNodesOnSelect",
    "elevateEdgesOnSelect",
    "minZoom",
    "maxZoom",
    "nodeExtent",
    "onNodesChange",
    "onEdgesChange",
    "elementsSelectable",
    "connectionMode",
    "snapGrid",
    "snapToGrid",
    "translateExtent",
    "connectOnClick",
    "defaultEdgeOptions",
    "fitView",
    "fitViewOptions",
    "onNodesDelete",
    "onEdgesDelete",
    "onDelete",
    "onNodeDrag",
    "onNodeDragStart",
    "onNodeDragStop",
    "onSelectionDrag",
    "onSelectionDragStart",
    "onSelectionDragStop",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "noPanClassName",
    "nodeOrigin",
    "autoPanOnConnect",
    "autoPanOnNodeDrag",
    "onError",
    "connectionRadius",
    "isValidConnection",
    "selectNodesOnDrag",
    "nodeDragThreshold",
    "onBeforeDelete",
    "debug",
    "autoPanSpeed",
    "paneClickDistance"
  ];
  const fieldsToTrack = [
    ...reactFlowFieldsToTrack,
    "rfId"
  ];
  const selector$l = (s) => ({
    setNodes: s.setNodes,
    setEdges: s.setEdges,
    setMinZoom: s.setMinZoom,
    setMaxZoom: s.setMaxZoom,
    setTranslateExtent: s.setTranslateExtent,
    setNodeExtent: s.setNodeExtent,
    reset: s.reset,
    setDefaultNodesAndEdges: s.setDefaultNodesAndEdges,
    setPaneClickDistance: s.setPaneClickDistance
  });
  const initPrevValues = {
    translateExtent: infiniteExtent,
    nodeOrigin: defaultNodeOrigin,
    minZoom: 0.5,
    maxZoom: 2,
    elementsSelectable: true,
    noPanClassName: "nopan",
    rfId: "1",
    paneClickDistance: 0
  };
  function StoreUpdater(props) {
    const { setNodes, setEdges, setMinZoom, setMaxZoom, setTranslateExtent, setNodeExtent, reset, setDefaultNodesAndEdges, setPaneClickDistance } = useStore(selector$l, shallow$1);
    const store = useStoreApi();
    reactExports.useEffect(() => {
      setDefaultNodesAndEdges(props.defaultNodes, props.defaultEdges);
      return () => {
        previousFields.current = initPrevValues;
        reset();
      };
    }, []);
    const previousFields = reactExports.useRef(initPrevValues);
    reactExports.useEffect(() => {
      for (const fieldName of fieldsToTrack) {
        const fieldValue = props[fieldName];
        const previousFieldValue = previousFields.current[fieldName];
        if (fieldValue === previousFieldValue) continue;
        if (typeof props[fieldName] === "undefined") continue;
        if (fieldName === "nodes") setNodes(fieldValue);
        else if (fieldName === "edges") setEdges(fieldValue);
        else if (fieldName === "minZoom") setMinZoom(fieldValue);
        else if (fieldName === "maxZoom") setMaxZoom(fieldValue);
        else if (fieldName === "translateExtent") setTranslateExtent(fieldValue);
        else if (fieldName === "nodeExtent") setNodeExtent(fieldValue);
        else if (fieldName === "paneClickDistance") setPaneClickDistance(fieldValue);
        else if (fieldName === "fitView") store.setState({
          fitViewOnInit: fieldValue
        });
        else if (fieldName === "fitViewOptions") store.setState({
          fitViewOnInitOptions: fieldValue
        });
        else store.setState({
          [fieldName]: fieldValue
        });
      }
      previousFields.current = props;
    }, fieldsToTrack.map((fieldName) => props[fieldName]));
    return null;
  }
  function getMediaQuery() {
    if (typeof window === "undefined" || !window.matchMedia) {
      return null;
    }
    return window.matchMedia("(prefers-color-scheme: dark)");
  }
  function useColorModeClass(colorMode) {
    var _a;
    const [colorModeClass, setColorModeClass] = reactExports.useState(colorMode === "system" ? null : colorMode);
    reactExports.useEffect(() => {
      if (colorMode !== "system") {
        setColorModeClass(colorMode);
        return;
      }
      const mediaQuery = getMediaQuery();
      const updateColorModeClass = () => setColorModeClass((mediaQuery == null ? void 0 : mediaQuery.matches) ? "dark" : "light");
      updateColorModeClass();
      mediaQuery == null ? void 0 : mediaQuery.addEventListener("change", updateColorModeClass);
      return () => {
        mediaQuery == null ? void 0 : mediaQuery.removeEventListener("change", updateColorModeClass);
      };
    }, [
      colorMode
    ]);
    return colorModeClass !== null ? colorModeClass : ((_a = getMediaQuery()) == null ? void 0 : _a.matches) ? "dark" : "light";
  }
  const defaultDoc = typeof document !== "undefined" ? document : null;
  function useKeyPress(keyCode = null, options = {
    target: defaultDoc,
    actInsideInputWithModifier: true
  }) {
    const [keyPressed, setKeyPressed] = reactExports.useState(false);
    const modifierPressed = reactExports.useRef(false);
    const pressedKeys = reactExports.useRef(/* @__PURE__ */ new Set([]));
    const [keyCodes, keysToWatch] = reactExports.useMemo(() => {
      if (keyCode !== null) {
        const keyCodeArr = Array.isArray(keyCode) ? keyCode : [
          keyCode
        ];
        const keys2 = keyCodeArr.filter((kc) => typeof kc === "string").map((kc) => kc.replace("+", "\n").replace("\n\n", "\n+").split("\n"));
        const keysFlat = keys2.reduce((res, item) => res.concat(...item), []);
        return [
          keys2,
          keysFlat
        ];
      }
      return [
        [],
        []
      ];
    }, [
      keyCode
    ]);
    reactExports.useEffect(() => {
      const target = (options == null ? void 0 : options.target) || defaultDoc;
      if (keyCode !== null) {
        const downHandler = (event) => {
          modifierPressed.current = event.ctrlKey || event.metaKey || event.shiftKey;
          const preventAction = (!modifierPressed.current || modifierPressed.current && !options.actInsideInputWithModifier) && isInputDOMNode(event);
          if (preventAction) {
            return false;
          }
          const keyOrCode = useKeyOrCode(event.code, keysToWatch);
          pressedKeys.current.add(event[keyOrCode]);
          if (isMatchingKey(keyCodes, pressedKeys.current, false)) {
            event.preventDefault();
            setKeyPressed(true);
          }
        };
        const upHandler = (event) => {
          const preventAction = (!modifierPressed.current || modifierPressed.current && !options.actInsideInputWithModifier) && isInputDOMNode(event);
          if (preventAction) {
            return false;
          }
          const keyOrCode = useKeyOrCode(event.code, keysToWatch);
          if (isMatchingKey(keyCodes, pressedKeys.current, true)) {
            setKeyPressed(false);
            pressedKeys.current.clear();
          } else {
            pressedKeys.current.delete(event[keyOrCode]);
          }
          if (event.key === "Meta") {
            pressedKeys.current.clear();
          }
          modifierPressed.current = false;
        };
        const resetHandler = () => {
          pressedKeys.current.clear();
          setKeyPressed(false);
        };
        target == null ? void 0 : target.addEventListener("keydown", downHandler);
        target == null ? void 0 : target.addEventListener("keyup", upHandler);
        window.addEventListener("blur", resetHandler);
        window.addEventListener("contextmenu", resetHandler);
        return () => {
          target == null ? void 0 : target.removeEventListener("keydown", downHandler);
          target == null ? void 0 : target.removeEventListener("keyup", upHandler);
          window.removeEventListener("blur", resetHandler);
          window.removeEventListener("contextmenu", resetHandler);
        };
      }
    }, [
      keyCode,
      setKeyPressed
    ]);
    return keyPressed;
  }
  function isMatchingKey(keyCodes, pressedKeys, isUp) {
    return keyCodes.filter((keys2) => isUp || keys2.length === pressedKeys.size).some((keys2) => keys2.every((k2) => pressedKeys.has(k2)));
  }
  function useKeyOrCode(eventCode, keysToWatch) {
    return keysToWatch.includes(eventCode) ? "code" : "key";
  }
  const useViewportHelper = () => {
    const store = useStoreApi();
    return reactExports.useMemo(() => {
      return {
        zoomIn: (options) => {
          const { panZoom } = store.getState();
          return panZoom ? panZoom.scaleBy(1.2, {
            duration: options == null ? void 0 : options.duration
          }) : Promise.resolve(false);
        },
        zoomOut: (options) => {
          const { panZoom } = store.getState();
          return panZoom ? panZoom.scaleBy(1 / 1.2, {
            duration: options == null ? void 0 : options.duration
          }) : Promise.resolve(false);
        },
        zoomTo: (zoomLevel, options) => {
          const { panZoom } = store.getState();
          return panZoom ? panZoom.scaleTo(zoomLevel, {
            duration: options == null ? void 0 : options.duration
          }) : Promise.resolve(false);
        },
        getZoom: () => store.getState().transform[2],
        setViewport: async (viewport, options) => {
          const { transform: [tX, tY, tZoom], panZoom } = store.getState();
          if (!panZoom) {
            return Promise.resolve(false);
          }
          await panZoom.setViewport({
            x: viewport.x ?? tX,
            y: viewport.y ?? tY,
            zoom: viewport.zoom ?? tZoom
          }, {
            duration: options == null ? void 0 : options.duration
          });
          return Promise.resolve(true);
        },
        getViewport: () => {
          const [x, y, zoom2] = store.getState().transform;
          return {
            x,
            y,
            zoom: zoom2
          };
        },
        fitView: (options) => {
          const { nodeLookup, minZoom, maxZoom, panZoom, domNode } = store.getState();
          if (!panZoom || !domNode) {
            return Promise.resolve(false);
          }
          const fitViewNodes = getFitViewNodes(nodeLookup, options);
          const { width, height } = getDimensions(domNode);
          return fitView({
            nodes: fitViewNodes,
            width,
            height,
            minZoom,
            maxZoom,
            panZoom
          }, options);
        },
        setCenter: async (x, y, options) => {
          const { width, height, maxZoom, panZoom } = store.getState();
          const nextZoom = typeof (options == null ? void 0 : options.zoom) !== "undefined" ? options.zoom : maxZoom;
          const centerX = width / 2 - x * nextZoom;
          const centerY = height / 2 - y * nextZoom;
          if (!panZoom) {
            return Promise.resolve(false);
          }
          await panZoom.setViewport({
            x: centerX,
            y: centerY,
            zoom: nextZoom
          }, {
            duration: options == null ? void 0 : options.duration
          });
          return Promise.resolve(true);
        },
        fitBounds: async (bounds, options) => {
          const { width, height, minZoom, maxZoom, panZoom } = store.getState();
          const viewport = getViewportForBounds(bounds, width, height, minZoom, maxZoom, (options == null ? void 0 : options.padding) ?? 0.1);
          if (!panZoom) {
            return Promise.resolve(false);
          }
          await panZoom.setViewport(viewport, {
            duration: options == null ? void 0 : options.duration
          });
          return Promise.resolve(true);
        },
        screenToFlowPosition: (clientPosition, options = {
          snapToGrid: true
        }) => {
          const { transform: transform2, snapGrid, domNode } = store.getState();
          if (!domNode) {
            return clientPosition;
          }
          const { x: domX, y: domY } = domNode.getBoundingClientRect();
          const correctedPosition = {
            x: clientPosition.x - domX,
            y: clientPosition.y - domY
          };
          return pointToRendererPoint(correctedPosition, transform2, options.snapToGrid, snapGrid);
        },
        flowToScreenPosition: (flowPosition) => {
          const { transform: transform2, domNode } = store.getState();
          if (!domNode) {
            return flowPosition;
          }
          const { x: domX, y: domY } = domNode.getBoundingClientRect();
          const rendererPosition = rendererPointToPoint(flowPosition, transform2);
          return {
            x: rendererPosition.x + domX,
            y: rendererPosition.y + domY
          };
        }
      };
    }, []);
  };
  function applyChanges(changes, elements) {
    const updatedElements = [];
    const changesMap = /* @__PURE__ */ new Map();
    const addItemChanges = [];
    for (const change of changes) {
      if (change.type === "add") {
        addItemChanges.push(change);
        continue;
      } else if (change.type === "remove" || change.type === "replace") {
        changesMap.set(change.id, [
          change
        ]);
      } else {
        const elementChanges = changesMap.get(change.id);
        if (elementChanges) {
          elementChanges.push(change);
        } else {
          changesMap.set(change.id, [
            change
          ]);
        }
      }
    }
    for (const element of elements) {
      const changes2 = changesMap.get(element.id);
      if (!changes2) {
        updatedElements.push(element);
        continue;
      }
      if (changes2[0].type === "remove") {
        continue;
      }
      if (changes2[0].type === "replace") {
        updatedElements.push({
          ...changes2[0].item
        });
        continue;
      }
      const updatedElement = {
        ...element
      };
      for (const change of changes2) {
        applyChange(change, updatedElement);
      }
      updatedElements.push(updatedElement);
    }
    if (addItemChanges.length) {
      addItemChanges.forEach((change) => {
        if (change.index !== void 0) {
          updatedElements.splice(change.index, 0, {
            ...change.item
          });
        } else {
          updatedElements.push({
            ...change.item
          });
        }
      });
    }
    return updatedElements;
  }
  function applyChange(change, element) {
    switch (change.type) {
      case "select": {
        element.selected = change.selected;
        break;
      }
      case "position": {
        if (typeof change.position !== "undefined") {
          element.position = change.position;
        }
        if (typeof change.dragging !== "undefined") {
          element.dragging = change.dragging;
        }
        break;
      }
      case "dimensions": {
        if (typeof change.dimensions !== "undefined") {
          element.measured ?? (element.measured = {});
          element.measured.width = change.dimensions.width;
          element.measured.height = change.dimensions.height;
          if (change.setAttributes) {
            element.width = change.dimensions.width;
            element.height = change.dimensions.height;
          }
        }
        if (typeof change.resizing === "boolean") {
          element.resizing = change.resizing;
        }
        break;
      }
    }
  }
  applyNodeChanges = function(changes, nodes) {
    return applyChanges(changes, nodes);
  };
  function applyEdgeChanges(changes, edges) {
    return applyChanges(changes, edges);
  }
  function createSelectionChange(id2, selected2) {
    return {
      id: id2,
      type: "select",
      selected: selected2
    };
  }
  function getSelectionChanges(items, selectedIds = /* @__PURE__ */ new Set(), mutateItem = false) {
    const changes = [];
    for (const [id2, item] of items) {
      const willBeSelected = selectedIds.has(id2);
      if (!(item.selected === void 0 && !willBeSelected) && item.selected !== willBeSelected) {
        if (mutateItem) {
          item.selected = willBeSelected;
        }
        changes.push(createSelectionChange(item.id, willBeSelected));
      }
    }
    return changes;
  }
  function getElementsDiffChanges({ items = [], lookup }) {
    var _a;
    const changes = [];
    const itemsLookup = new Map(items.map((item) => [
      item.id,
      item
    ]));
    for (const [index2, item] of items.entries()) {
      const lookupItem = lookup.get(item.id);
      const storeItem = ((_a = lookupItem == null ? void 0 : lookupItem.internals) == null ? void 0 : _a.userNode) ?? lookupItem;
      if (storeItem !== void 0 && storeItem !== item) {
        changes.push({
          id: item.id,
          item,
          type: "replace"
        });
      }
      if (storeItem === void 0) {
        changes.push({
          item,
          type: "add",
          index: index2
        });
      }
    }
    for (const [id2] of lookup) {
      const nextNode = itemsLookup.get(id2);
      if (nextNode === void 0) {
        changes.push({
          id: id2,
          type: "remove"
        });
      }
    }
    return changes;
  }
  function elementToRemoveChange(item) {
    return {
      id: item.id,
      type: "remove"
    };
  }
  const isNode = (element) => isNodeBase(element);
  const isEdge = (element) => isEdgeBase(element);
  function fixedForwardRef(render) {
    return reactExports.forwardRef(render);
  }
  const useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
  function useQueue(runQueue) {
    const [serial, setSerial] = reactExports.useState(BigInt(0));
    const [queue] = reactExports.useState(() => createQueue(() => setSerial((n2) => n2 + BigInt(1))));
    useIsomorphicLayoutEffect(() => {
      const queueItems = queue.get();
      if (queueItems.length) {
        runQueue(queueItems);
        queue.reset();
      }
    }, [
      serial
    ]);
    return queue;
  }
  function createQueue(cb) {
    let queue = [];
    return {
      get: () => queue,
      reset: () => {
        queue = [];
      },
      push: (item) => {
        queue.push(item);
        cb();
      }
    };
  }
  const BatchContext = reactExports.createContext(null);
  function BatchProvider({ children: children2 }) {
    const store = useStoreApi();
    const nodeQueueHandler = reactExports.useCallback((queueItems) => {
      const { nodes = [], setNodes, hasDefaultNodes, onNodesChange, nodeLookup } = store.getState();
      let next = nodes;
      for (const payload of queueItems) {
        next = typeof payload === "function" ? payload(next) : payload;
      }
      if (hasDefaultNodes) {
        setNodes(next);
      } else if (onNodesChange) {
        onNodesChange(getElementsDiffChanges({
          items: next,
          lookup: nodeLookup
        }));
      }
    }, []);
    const nodeQueue = useQueue(nodeQueueHandler);
    const edgeQueueHandler = reactExports.useCallback((queueItems) => {
      const { edges = [], setEdges, hasDefaultEdges, onEdgesChange, edgeLookup } = store.getState();
      let next = edges;
      for (const payload of queueItems) {
        next = typeof payload === "function" ? payload(next) : payload;
      }
      if (hasDefaultEdges) {
        setEdges(next);
      } else if (onEdgesChange) {
        onEdgesChange(getElementsDiffChanges({
          items: next,
          lookup: edgeLookup
        }));
      }
    }, []);
    const edgeQueue = useQueue(edgeQueueHandler);
    const value = reactExports.useMemo(() => ({
      nodeQueue,
      edgeQueue
    }), []);
    return jsxRuntimeExports.jsx(BatchContext.Provider, {
      value,
      children: children2
    });
  }
  function useBatchContext() {
    const batchContext = reactExports.useContext(BatchContext);
    if (!batchContext) {
      throw new Error("useBatchContext must be used within a BatchProvider");
    }
    return batchContext;
  }
  const selector$k = (s) => !!s.panZoom;
  useReactFlow = function() {
    const viewportHelper = useViewportHelper();
    const store = useStoreApi();
    const batchContext = useBatchContext();
    const viewportInitialized = useStore(selector$k);
    const generalHelper = reactExports.useMemo(() => {
      const getInternalNode = (id2) => store.getState().nodeLookup.get(id2);
      const setNodes = (payload) => {
        batchContext.nodeQueue.push(payload);
      };
      const setEdges = (payload) => {
        batchContext.edgeQueue.push(payload);
      };
      const getNodeRect = (node) => {
        var _a, _b;
        const { nodeLookup, nodeOrigin } = store.getState();
        const nodeToUse = isNode(node) ? node : nodeLookup.get(node.id);
        const position = nodeToUse.parentId ? evaluateAbsolutePosition(nodeToUse.position, nodeToUse.measured, nodeToUse.parentId, nodeLookup, nodeOrigin) : nodeToUse.position;
        const nodeWithPosition = {
          id: nodeToUse.id,
          position,
          width: ((_a = nodeToUse.measured) == null ? void 0 : _a.width) ?? nodeToUse.width,
          height: ((_b = nodeToUse.measured) == null ? void 0 : _b.height) ?? nodeToUse.height,
          data: nodeToUse.data
        };
        return nodeToRect(nodeWithPosition);
      };
      const updateNode = (id2, nodeUpdate, options = {
        replace: false
      }) => {
        setNodes((prevNodes) => prevNodes.map((node) => {
          if (node.id === id2) {
            const nextNode = typeof nodeUpdate === "function" ? nodeUpdate(node) : nodeUpdate;
            return options.replace && isNode(nextNode) ? nextNode : {
              ...node,
              ...nextNode
            };
          }
          return node;
        }));
      };
      const updateEdge = (id2, edgeUpdate, options = {
        replace: false
      }) => {
        setEdges((prevEdges) => prevEdges.map((edge) => {
          if (edge.id === id2) {
            const nextEdge = typeof edgeUpdate === "function" ? edgeUpdate(edge) : edgeUpdate;
            return options.replace && isEdge(nextEdge) ? nextEdge : {
              ...edge,
              ...nextEdge
            };
          }
          return edge;
        }));
      };
      return {
        getNodes: () => store.getState().nodes.map((n2) => ({
          ...n2
        })),
        getNode: (id2) => {
          var _a;
          return (_a = getInternalNode(id2)) == null ? void 0 : _a.internals.userNode;
        },
        getInternalNode,
        getEdges: () => {
          const { edges = [] } = store.getState();
          return edges.map((e2) => ({
            ...e2
          }));
        },
        getEdge: (id2) => store.getState().edgeLookup.get(id2),
        setNodes,
        setEdges,
        addNodes: (payload) => {
          const newNodes = Array.isArray(payload) ? payload : [
            payload
          ];
          batchContext.nodeQueue.push((nodes) => [
            ...nodes,
            ...newNodes
          ]);
        },
        addEdges: (payload) => {
          const newEdges = Array.isArray(payload) ? payload : [
            payload
          ];
          batchContext.edgeQueue.push((edges) => [
            ...edges,
            ...newEdges
          ]);
        },
        toObject: () => {
          const { nodes = [], edges = [], transform: transform2 } = store.getState();
          const [x, y, zoom2] = transform2;
          return {
            nodes: nodes.map((n2) => ({
              ...n2
            })),
            edges: edges.map((e2) => ({
              ...e2
            })),
            viewport: {
              x,
              y,
              zoom: zoom2
            }
          };
        },
        deleteElements: async ({ nodes: nodesToRemove = [], edges: edgesToRemove = [] }) => {
          const { nodes, edges, onNodesDelete, onEdgesDelete, triggerNodeChanges, triggerEdgeChanges, onDelete, onBeforeDelete } = store.getState();
          const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
            nodesToRemove,
            edgesToRemove,
            nodes,
            edges,
            onBeforeDelete
          });
          const hasMatchingEdges = matchingEdges.length > 0;
          const hasMatchingNodes = matchingNodes.length > 0;
          if (hasMatchingEdges) {
            const edgeChanges = matchingEdges.map(elementToRemoveChange);
            onEdgesDelete == null ? void 0 : onEdgesDelete(matchingEdges);
            triggerEdgeChanges(edgeChanges);
          }
          if (hasMatchingNodes) {
            const nodeChanges = matchingNodes.map(elementToRemoveChange);
            onNodesDelete == null ? void 0 : onNodesDelete(matchingNodes);
            triggerNodeChanges(nodeChanges);
          }
          if (hasMatchingNodes || hasMatchingEdges) {
            onDelete == null ? void 0 : onDelete({
              nodes: matchingNodes,
              edges: matchingEdges
            });
          }
          return {
            deletedNodes: matchingNodes,
            deletedEdges: matchingEdges
          };
        },
        getIntersectingNodes: (nodeOrRect, partially = true, nodes) => {
          const isRect = isRectObject(nodeOrRect);
          const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
          const hasNodesOption = nodes !== void 0;
          if (!nodeRect) {
            return [];
          }
          return (nodes || store.getState().nodes).filter((n2) => {
            const internalNode = store.getState().nodeLookup.get(n2.id);
            if (internalNode && !isRect && (n2.id === nodeOrRect.id || !internalNode.internals.positionAbsolute)) {
              return false;
            }
            const currNodeRect = nodeToRect(hasNodesOption ? n2 : internalNode);
            const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
            const partiallyVisible = partially && overlappingArea > 0;
            return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
          });
        },
        isNodeIntersecting: (nodeOrRect, area, partially = true) => {
          const isRect = isRectObject(nodeOrRect);
          const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
          if (!nodeRect) {
            return false;
          }
          const overlappingArea = getOverlappingArea(nodeRect, area);
          const partiallyVisible = partially && overlappingArea > 0;
          return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
        },
        updateNode,
        updateNodeData: (id2, dataUpdate, options = {
          replace: false
        }) => {
          updateNode(id2, (node) => {
            const nextData = typeof dataUpdate === "function" ? dataUpdate(node) : dataUpdate;
            return options.replace ? {
              ...node,
              data: nextData
            } : {
              ...node,
              data: {
                ...node.data,
                ...nextData
              }
            };
          }, options);
        },
        updateEdge,
        updateEdgeData: (id2, dataUpdate, options = {
          replace: false
        }) => {
          updateEdge(id2, (edge) => {
            const nextData = typeof dataUpdate === "function" ? dataUpdate(edge) : dataUpdate;
            return options.replace ? {
              ...edge,
              data: nextData
            } : {
              ...edge,
              data: {
                ...edge.data,
                ...nextData
              }
            };
          }, options);
        },
        getNodesBounds: (nodes) => {
          const { nodeLookup, nodeOrigin } = store.getState();
          return getNodesBounds(nodes, {
            nodeLookup,
            nodeOrigin
          });
        },
        getHandleConnections: ({ type, id: id2, nodeId }) => {
          var _a;
          return Array.from(((_a = store.getState().connectionLookup.get(`${nodeId}-${type}-${id2 ?? null}`)) == null ? void 0 : _a.values()) ?? []);
        }
      };
    }, []);
    return reactExports.useMemo(() => {
      return {
        ...generalHelper,
        ...viewportHelper,
        viewportInitialized
      };
    }, [
      viewportInitialized
    ]);
  };
  const selected = (item) => item.selected;
  const deleteKeyOptions = {
    actInsideInputWithModifier: false
  };
  const win$1 = typeof window !== "undefined" ? window : void 0;
  function useGlobalKeyHandler({ deleteKeyCode, multiSelectionKeyCode }) {
    const store = useStoreApi();
    const { deleteElements } = useReactFlow();
    const deleteKeyPressed = useKeyPress(deleteKeyCode, deleteKeyOptions);
    const multiSelectionKeyPressed = useKeyPress(multiSelectionKeyCode, {
      target: win$1
    });
    reactExports.useEffect(() => {
      if (deleteKeyPressed) {
        const { edges, nodes } = store.getState();
        deleteElements({
          nodes: nodes.filter(selected),
          edges: edges.filter(selected)
        });
        store.setState({
          nodesSelectionActive: false
        });
      }
    }, [
      deleteKeyPressed
    ]);
    reactExports.useEffect(() => {
      store.setState({
        multiSelectionActive: multiSelectionKeyPressed
      });
    }, [
      multiSelectionKeyPressed
    ]);
  }
  function useResizeHandler(domNode) {
    const store = useStoreApi();
    reactExports.useEffect(() => {
      const updateDimensions = () => {
        var _a, _b;
        if (!domNode.current) {
          return false;
        }
        const size = getDimensions(domNode.current);
        if (size.height === 0 || size.width === 0) {
          (_b = (_a = store.getState()).onError) == null ? void 0 : _b.call(_a, "004", errorMessages["error004"]());
        }
        store.setState({
          width: size.width || 500,
          height: size.height || 500
        });
      };
      if (domNode.current) {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        const resizeObserver = new ResizeObserver(() => updateDimensions());
        resizeObserver.observe(domNode.current);
        return () => {
          window.removeEventListener("resize", updateDimensions);
          if (resizeObserver && domNode.current) {
            resizeObserver.unobserve(domNode.current);
          }
        };
      }
    }, []);
  }
  const containerStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  };
  const selector$j = (s) => ({
    userSelectionActive: s.userSelectionActive,
    lib: s.lib
  });
  function ZoomPane({ onPaneContextMenu, zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = 0.5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, defaultViewport: defaultViewport2, translateExtent, minZoom, maxZoom, zoomActivationKeyCode, preventScrolling = true, children: children2, noWheelClassName, noPanClassName, onViewportChange, isControlledViewport, paneClickDistance }) {
    const store = useStoreApi();
    const zoomPane = reactExports.useRef(null);
    const { userSelectionActive, lib } = useStore(selector$j, shallow$1);
    const zoomActivationKeyPressed = useKeyPress(zoomActivationKeyCode);
    const panZoom = reactExports.useRef();
    useResizeHandler(zoomPane);
    const onTransformChange = reactExports.useCallback((transform2) => {
      onViewportChange == null ? void 0 : onViewportChange({
        x: transform2[0],
        y: transform2[1],
        zoom: transform2[2]
      });
      if (!isControlledViewport) {
        store.setState({
          transform: transform2
        });
      }
    }, [
      onViewportChange,
      isControlledViewport
    ]);
    reactExports.useEffect(() => {
      if (zoomPane.current) {
        panZoom.current = XYPanZoom({
          domNode: zoomPane.current,
          minZoom,
          maxZoom,
          translateExtent,
          viewport: defaultViewport2,
          paneClickDistance,
          onDraggingChange: (paneDragging) => store.setState({
            paneDragging
          }),
          onPanZoomStart: (event, vp) => {
            const { onViewportChangeStart, onMoveStart } = store.getState();
            onMoveStart == null ? void 0 : onMoveStart(event, vp);
            onViewportChangeStart == null ? void 0 : onViewportChangeStart(vp);
          },
          onPanZoom: (event, vp) => {
            const { onViewportChange: onViewportChange2, onMove } = store.getState();
            onMove == null ? void 0 : onMove(event, vp);
            onViewportChange2 == null ? void 0 : onViewportChange2(vp);
          },
          onPanZoomEnd: (event, vp) => {
            const { onViewportChangeEnd, onMoveEnd } = store.getState();
            onMoveEnd == null ? void 0 : onMoveEnd(event, vp);
            onViewportChangeEnd == null ? void 0 : onViewportChangeEnd(vp);
          }
        });
        const { x, y, zoom: zoom2 } = panZoom.current.getViewport();
        store.setState({
          panZoom: panZoom.current,
          transform: [
            x,
            y,
            zoom2
          ],
          domNode: zoomPane.current.closest(".react-flow")
        });
        return () => {
          var _a;
          (_a = panZoom.current) == null ? void 0 : _a.destroy();
        };
      }
    }, []);
    reactExports.useEffect(() => {
      var _a;
      (_a = panZoom.current) == null ? void 0 : _a.update({
        onPaneContextMenu,
        zoomOnScroll,
        zoomOnPinch,
        panOnScroll,
        panOnScrollSpeed,
        panOnScrollMode,
        zoomOnDoubleClick,
        panOnDrag,
        zoomActivationKeyPressed,
        preventScrolling,
        noPanClassName,
        userSelectionActive,
        noWheelClassName,
        lib,
        onTransformChange
      });
    }, [
      onPaneContextMenu,
      zoomOnScroll,
      zoomOnPinch,
      panOnScroll,
      panOnScrollSpeed,
      panOnScrollMode,
      zoomOnDoubleClick,
      panOnDrag,
      zoomActivationKeyPressed,
      preventScrolling,
      noPanClassName,
      userSelectionActive,
      noWheelClassName,
      lib,
      onTransformChange
    ]);
    return jsxRuntimeExports.jsx("div", {
      className: "react-flow__renderer",
      ref: zoomPane,
      style: containerStyle,
      children: children2
    });
  }
  const selector$i = (s) => ({
    userSelectionActive: s.userSelectionActive,
    userSelectionRect: s.userSelectionRect
  });
  function UserSelection() {
    const { userSelectionActive, userSelectionRect } = useStore(selector$i, shallow$1);
    const isActive = userSelectionActive && userSelectionRect;
    if (!isActive) {
      return null;
    }
    return jsxRuntimeExports.jsx("div", {
      className: "react-flow__selection react-flow__container",
      style: {
        width: userSelectionRect.width,
        height: userSelectionRect.height,
        transform: `translate(${userSelectionRect.x}px, ${userSelectionRect.y}px)`
      }
    });
  }
  const wrapHandler = (handler, containerRef) => {
    return (event) => {
      if (event.target !== containerRef.current) {
        return;
      }
      handler == null ? void 0 : handler(event);
    };
  };
  const selector$h = (s) => ({
    userSelectionActive: s.userSelectionActive,
    elementsSelectable: s.elementsSelectable,
    dragging: s.paneDragging
  });
  function Pane({ isSelecting, selectionKeyPressed, selectionMode = SelectionMode.Full, panOnDrag, selectionOnDrag, onSelectionStart, onSelectionEnd, onPaneClick, onPaneContextMenu, onPaneScroll, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, children: children2 }) {
    const container = reactExports.useRef(null);
    const store = useStoreApi();
    const prevSelectedNodesCount = reactExports.useRef(0);
    const prevSelectedEdgesCount = reactExports.useRef(0);
    const containerBounds = reactExports.useRef();
    const edgeIdLookup = reactExports.useRef(/* @__PURE__ */ new Map());
    const { userSelectionActive, elementsSelectable, dragging } = useStore(selector$h, shallow$1);
    const hasActiveSelection = elementsSelectable && (isSelecting || userSelectionActive);
    const selectionInProgress = reactExports.useRef(false);
    const selectionStarted = reactExports.useRef(false);
    const resetUserSelection = () => {
      store.setState({
        userSelectionActive: false,
        userSelectionRect: null
      });
      prevSelectedNodesCount.current = 0;
      prevSelectedEdgesCount.current = 0;
    };
    const onClick = (event) => {
      if (selectionInProgress.current) {
        selectionInProgress.current = false;
        return;
      }
      onPaneClick == null ? void 0 : onPaneClick(event);
      store.getState().resetSelectedElements();
      store.setState({
        nodesSelectionActive: false
      });
    };
    const onContextMenu = (event) => {
      if (Array.isArray(panOnDrag) && (panOnDrag == null ? void 0 : panOnDrag.includes(2))) {
        event.preventDefault();
        return;
      }
      onPaneContextMenu == null ? void 0 : onPaneContextMenu(event);
    };
    const onWheel = onPaneScroll ? (event) => onPaneScroll(event) : void 0;
    const onPointerDown2 = (event) => {
      var _a, _b, _c, _d;
      const { resetSelectedElements, domNode, edgeLookup } = store.getState();
      containerBounds.current = domNode == null ? void 0 : domNode.getBoundingClientRect();
      if (!elementsSelectable || !isSelecting || event.button !== 0 || event.target !== container.current || !containerBounds.current) {
        return;
      }
      (_b = (_a = event.target) == null ? void 0 : _a.setPointerCapture) == null ? void 0 : _b.call(_a, event.pointerId);
      selectionStarted.current = true;
      selectionInProgress.current = false;
      edgeIdLookup.current = /* @__PURE__ */ new Map();
      for (const [id2, edge] of edgeLookup) {
        edgeIdLookup.current.set(edge.source, ((_c = edgeIdLookup.current.get(edge.source)) == null ? void 0 : _c.add(id2)) || /* @__PURE__ */ new Set([
          id2
        ]));
        edgeIdLookup.current.set(edge.target, ((_d = edgeIdLookup.current.get(edge.target)) == null ? void 0 : _d.add(id2)) || /* @__PURE__ */ new Set([
          id2
        ]));
      }
      const { x, y } = getEventPosition(event.nativeEvent, containerBounds.current);
      resetSelectedElements();
      store.setState({
        userSelectionRect: {
          width: 0,
          height: 0,
          startX: x,
          startY: y,
          x,
          y
        }
      });
      onSelectionStart == null ? void 0 : onSelectionStart(event);
    };
    const onPointerMove = (event) => {
      const { userSelectionRect, edgeLookup, transform: transform2, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = store.getState();
      if (!containerBounds.current || !userSelectionRect) {
        return;
      }
      selectionInProgress.current = true;
      const { x: mouseX, y: mouseY } = getEventPosition(event.nativeEvent, containerBounds.current);
      const { startX, startY } = userSelectionRect;
      const nextUserSelectRect = {
        startX,
        startY,
        x: mouseX < startX ? mouseX : startX,
        y: mouseY < startY ? mouseY : startY,
        width: Math.abs(mouseX - startX),
        height: Math.abs(mouseY - startY)
      };
      const selectedNodes = getNodesInside(nodeLookup, nextUserSelectRect, transform2, selectionMode === SelectionMode.Partial, true);
      const selectedEdgeIds = /* @__PURE__ */ new Set();
      const selectedNodeIds = /* @__PURE__ */ new Set();
      for (const selectedNode of selectedNodes) {
        selectedNodeIds.add(selectedNode.id);
        const edgeIds = edgeIdLookup.current.get(selectedNode.id);
        if (edgeIds) {
          for (const edgeId of edgeIds) {
            selectedEdgeIds.add(edgeId);
          }
        }
      }
      if (prevSelectedNodesCount.current !== selectedNodeIds.size) {
        prevSelectedNodesCount.current = selectedNodeIds.size;
        const changes = getSelectionChanges(nodeLookup, selectedNodeIds, true);
        triggerNodeChanges(changes);
      }
      if (prevSelectedEdgesCount.current !== selectedEdgeIds.size) {
        prevSelectedEdgesCount.current = selectedEdgeIds.size;
        const changes = getSelectionChanges(edgeLookup, selectedEdgeIds);
        triggerEdgeChanges(changes);
      }
      store.setState({
        userSelectionRect: nextUserSelectRect,
        userSelectionActive: true,
        nodesSelectionActive: false
      });
    };
    const onPointerUp = (event) => {
      var _a, _b;
      if (event.button !== 0 || !selectionStarted.current) {
        return;
      }
      (_b = (_a = event.target) == null ? void 0 : _a.releasePointerCapture) == null ? void 0 : _b.call(_a, event.pointerId);
      const { userSelectionRect } = store.getState();
      if (!userSelectionActive && userSelectionRect && event.target === container.current) {
        onClick == null ? void 0 : onClick(event);
      }
      if (prevSelectedNodesCount.current > 0) {
        store.setState({
          nodesSelectionActive: true
        });
      }
      resetUserSelection();
      onSelectionEnd == null ? void 0 : onSelectionEnd(event);
      if (selectionKeyPressed || selectionOnDrag) {
        selectionInProgress.current = false;
      }
      selectionStarted.current = false;
    };
    const draggable = panOnDrag === true || Array.isArray(panOnDrag) && panOnDrag.includes(0);
    return jsxRuntimeExports.jsxs("div", {
      className: cc([
        "react-flow__pane",
        {
          draggable,
          dragging,
          selection: isSelecting
        }
      ]),
      onClick: hasActiveSelection ? void 0 : wrapHandler(onClick, container),
      onContextMenu: wrapHandler(onContextMenu, container),
      onWheel: wrapHandler(onWheel, container),
      onPointerEnter: hasActiveSelection ? void 0 : onPaneMouseEnter,
      onPointerDown: hasActiveSelection ? onPointerDown2 : onPaneMouseMove,
      onPointerMove: hasActiveSelection ? onPointerMove : onPaneMouseMove,
      onPointerUp: hasActiveSelection ? onPointerUp : void 0,
      onPointerLeave: onPaneMouseLeave,
      ref: container,
      style: containerStyle,
      children: [
        children2,
        jsxRuntimeExports.jsx(UserSelection, {})
      ]
    });
  }
  function handleNodeClick({ id: id2, store, unselect = false, nodeRef }) {
    const { addSelectedNodes, unselectNodesAndEdges, multiSelectionActive, nodeLookup, onError } = store.getState();
    const node = nodeLookup.get(id2);
    if (!node) {
      onError == null ? void 0 : onError("012", errorMessages["error012"](id2));
      return;
    }
    store.setState({
      nodesSelectionActive: false
    });
    if (!node.selected) {
      addSelectedNodes([
        id2
      ]);
    } else if (unselect || node.selected && multiSelectionActive) {
      unselectNodesAndEdges({
        nodes: [
          node
        ],
        edges: []
      });
      requestAnimationFrame(() => {
        var _a;
        return (_a = nodeRef == null ? void 0 : nodeRef.current) == null ? void 0 : _a.blur();
      });
    }
  }
  function useDrag({ nodeRef, disabled = false, noDragClassName, handleSelector, nodeId, isSelectable, nodeClickDistance }) {
    const store = useStoreApi();
    const [dragging, setDragging] = reactExports.useState(false);
    const xyDrag = reactExports.useRef();
    reactExports.useEffect(() => {
      xyDrag.current = XYDrag({
        getStoreItems: () => store.getState(),
        onNodeMouseDown: (id2) => {
          handleNodeClick({
            id: id2,
            store,
            nodeRef
          });
        },
        onDragStart: () => {
          setDragging(true);
        },
        onDragStop: () => {
          setDragging(false);
        }
      });
    }, []);
    reactExports.useEffect(() => {
      var _a, _b;
      if (disabled) {
        (_a = xyDrag.current) == null ? void 0 : _a.destroy();
      } else if (nodeRef.current) {
        (_b = xyDrag.current) == null ? void 0 : _b.update({
          noDragClassName,
          handleSelector,
          domNode: nodeRef.current,
          isSelectable,
          nodeId,
          nodeClickDistance
        });
        return () => {
          var _a2;
          (_a2 = xyDrag.current) == null ? void 0 : _a2.destroy();
        };
      }
    }, [
      noDragClassName,
      handleSelector,
      disabled,
      isSelectable,
      nodeRef,
      nodeId
    ]);
    return dragging;
  }
  const selectedAndDraggable = (nodesDraggable) => (n2) => n2.selected && (n2.draggable || nodesDraggable && typeof n2.draggable === "undefined");
  function useMoveSelectedNodes() {
    const store = useStoreApi();
    const moveSelectedNodes = reactExports.useCallback((params) => {
      const { nodeExtent, snapToGrid, snapGrid, nodesDraggable, onError, updateNodePositions, nodeLookup, nodeOrigin } = store.getState();
      const nodeUpdates = /* @__PURE__ */ new Map();
      const isSelected = selectedAndDraggable(nodesDraggable);
      const xVelo = snapToGrid ? snapGrid[0] : 5;
      const yVelo = snapToGrid ? snapGrid[1] : 5;
      const xDiff = params.direction.x * xVelo * params.factor;
      const yDiff = params.direction.y * yVelo * params.factor;
      for (const [, node] of nodeLookup) {
        if (!isSelected(node)) {
          continue;
        }
        let nextPosition = {
          x: node.internals.positionAbsolute.x + xDiff,
          y: node.internals.positionAbsolute.y + yDiff
        };
        if (snapToGrid) {
          nextPosition = snapPosition(nextPosition, snapGrid);
        }
        const { position, positionAbsolute } = calculateNodePosition({
          nodeId: node.id,
          nextPosition,
          nodeLookup,
          nodeExtent,
          nodeOrigin,
          onError
        });
        node.position = position;
        node.internals.positionAbsolute = positionAbsolute;
        nodeUpdates.set(node.id, node);
      }
      updateNodePositions(nodeUpdates);
    }, []);
    return moveSelectedNodes;
  }
  const NodeIdContext = reactExports.createContext(null);
  const Provider = NodeIdContext.Provider;
  NodeIdContext.Consumer;
  const useNodeId = () => {
    const nodeId = reactExports.useContext(NodeIdContext);
    return nodeId;
  };
  const selector$g = (s) => ({
    connectOnClick: s.connectOnClick,
    noPanClassName: s.noPanClassName,
    rfId: s.rfId
  });
  const connectingSelector = (nodeId, handleId, type) => (state) => {
    const { connectionClickStartHandle: clickHandle, connectionMode, connection } = state;
    const { fromHandle, toHandle, isValid } = connection;
    const connectingTo = (toHandle == null ? void 0 : toHandle.nodeId) === nodeId && (toHandle == null ? void 0 : toHandle.id) === handleId && (toHandle == null ? void 0 : toHandle.type) === type;
    return {
      connectingFrom: (fromHandle == null ? void 0 : fromHandle.nodeId) === nodeId && (fromHandle == null ? void 0 : fromHandle.id) === handleId && (fromHandle == null ? void 0 : fromHandle.type) === type,
      connectingTo,
      clickConnecting: (clickHandle == null ? void 0 : clickHandle.nodeId) === nodeId && (clickHandle == null ? void 0 : clickHandle.id) === handleId && (clickHandle == null ? void 0 : clickHandle.type) === type,
      isPossibleEndHandle: connectionMode === ConnectionMode.Strict ? (fromHandle == null ? void 0 : fromHandle.type) !== type : nodeId !== (fromHandle == null ? void 0 : fromHandle.nodeId) || handleId !== (fromHandle == null ? void 0 : fromHandle.id),
      connectionInProcess: !!fromHandle,
      valid: connectingTo && isValid
    };
  };
  function HandleComponent({ type = "source", position = Position.Top, isValidConnection, isConnectable = true, isConnectableStart = true, isConnectableEnd = true, id: id2, onConnect, children: children2, className, onMouseDown, onTouchStart, ...rest }, ref) {
    var _a, _b;
    const handleId = id2 || null;
    const isTarget = type === "target";
    const store = useStoreApi();
    const nodeId = useNodeId();
    const { connectOnClick, noPanClassName, rfId } = useStore(selector$g, shallow$1);
    const { connectingFrom, connectingTo, clickConnecting, isPossibleEndHandle, connectionInProcess, valid } = useStore(connectingSelector(nodeId, handleId, type), shallow$1);
    if (!nodeId) {
      (_b = (_a = store.getState()).onError) == null ? void 0 : _b.call(_a, "010", errorMessages["error010"]());
    }
    const onConnectExtended = (params) => {
      const { defaultEdgeOptions, onConnect: onConnectAction, hasDefaultEdges } = store.getState();
      const edgeParams = {
        ...defaultEdgeOptions,
        ...params
      };
      if (hasDefaultEdges) {
        const { edges, setEdges } = store.getState();
        setEdges(addEdge(edgeParams, edges));
      }
      onConnectAction == null ? void 0 : onConnectAction(edgeParams);
      onConnect == null ? void 0 : onConnect(edgeParams);
    };
    const onPointerDown2 = (event) => {
      if (!nodeId) {
        return;
      }
      const isMouseTriggered = isMouseEvent(event.nativeEvent);
      if (isConnectableStart && (isMouseTriggered && event.button === 0 || !isMouseTriggered)) {
        const currentStore = store.getState();
        XYHandle.onPointerDown(event.nativeEvent, {
          autoPanOnConnect: currentStore.autoPanOnConnect,
          connectionMode: currentStore.connectionMode,
          connectionRadius: currentStore.connectionRadius,
          domNode: currentStore.domNode,
          nodeLookup: currentStore.nodeLookup,
          lib: currentStore.lib,
          isTarget,
          handleId,
          nodeId,
          flowId: currentStore.rfId,
          panBy: currentStore.panBy,
          cancelConnection: currentStore.cancelConnection,
          onConnectStart: currentStore.onConnectStart,
          onConnectEnd: currentStore.onConnectEnd,
          updateConnection: currentStore.updateConnection,
          onConnect: onConnectExtended,
          isValidConnection: isValidConnection || currentStore.isValidConnection,
          getTransform: () => store.getState().transform,
          getFromHandle: () => store.getState().connection.fromHandle,
          autoPanSpeed: currentStore.autoPanSpeed
        });
      }
      if (isMouseTriggered) {
        onMouseDown == null ? void 0 : onMouseDown(event);
      } else {
        onTouchStart == null ? void 0 : onTouchStart(event);
      }
    };
    const onClick = (event) => {
      const { onClickConnectStart, onClickConnectEnd, connectionClickStartHandle, connectionMode, isValidConnection: isValidConnectionStore, lib, rfId: flowId, nodeLookup, connection: connectionState } = store.getState();
      if (!nodeId || !connectionClickStartHandle && !isConnectableStart) {
        return;
      }
      if (!connectionClickStartHandle) {
        onClickConnectStart == null ? void 0 : onClickConnectStart(event.nativeEvent, {
          nodeId,
          handleId,
          handleType: type
        });
        store.setState({
          connectionClickStartHandle: {
            nodeId,
            type,
            id: handleId
          }
        });
        return;
      }
      const doc = getHostForElement(event.target);
      const isValidConnectionHandler = isValidConnection || isValidConnectionStore;
      const { connection, isValid } = XYHandle.isValid(event.nativeEvent, {
        handle: {
          nodeId,
          id: handleId,
          type
        },
        connectionMode,
        fromNodeId: connectionClickStartHandle.nodeId,
        fromHandleId: connectionClickStartHandle.id || null,
        fromType: connectionClickStartHandle.type,
        isValidConnection: isValidConnectionHandler,
        flowId,
        doc,
        lib,
        nodeLookup
      });
      if (isValid && connection) {
        onConnectExtended(connection);
      }
      const connectionClone = structuredClone(connectionState);
      delete connectionClone.inProgress;
      connectionClone.toPosition = connectionClone.toHandle ? connectionClone.toHandle.position : null;
      onClickConnectEnd == null ? void 0 : onClickConnectEnd(event, connectionClone);
      store.setState({
        connectionClickStartHandle: null
      });
    };
    return jsxRuntimeExports.jsx("div", {
      "data-handleid": handleId,
      "data-nodeid": nodeId,
      "data-handlepos": position,
      "data-id": `${rfId}-${nodeId}-${handleId}-${type}`,
      className: cc([
        "react-flow__handle",
        `react-flow__handle-${position}`,
        "nodrag",
        noPanClassName,
        className,
        {
          source: !isTarget,
          target: isTarget,
          connectable: isConnectable,
          connectablestart: isConnectableStart,
          connectableend: isConnectableEnd,
          clickconnecting: clickConnecting,
          connectingfrom: connectingFrom,
          connectingto: connectingTo,
          valid,
          connectionindicator: isConnectable && (!connectionInProcess || isPossibleEndHandle) && (connectionInProcess ? isConnectableEnd : isConnectableStart)
        }
      ]),
      onMouseDown: onPointerDown2,
      onTouchStart: onPointerDown2,
      onClick: connectOnClick ? onClick : void 0,
      ref,
      ...rest,
      children: children2
    });
  }
  Handle = reactExports.memo(fixedForwardRef(HandleComponent));
  function InputNode({ data, isConnectable, sourcePosition = Position.Bottom }) {
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        data == null ? void 0 : data.label,
        jsxRuntimeExports.jsx(Handle, {
          type: "source",
          position: sourcePosition,
          isConnectable
        })
      ]
    });
  }
  function DefaultNode({ data, isConnectable, targetPosition = Position.Top, sourcePosition = Position.Bottom }) {
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        jsxRuntimeExports.jsx(Handle, {
          type: "target",
          position: targetPosition,
          isConnectable
        }),
        data == null ? void 0 : data.label,
        jsxRuntimeExports.jsx(Handle, {
          type: "source",
          position: sourcePosition,
          isConnectable
        })
      ]
    });
  }
  function GroupNode() {
    return null;
  }
  function OutputNode({ data, isConnectable, targetPosition = Position.Top }) {
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        jsxRuntimeExports.jsx(Handle, {
          type: "target",
          position: targetPosition,
          isConnectable
        }),
        data == null ? void 0 : data.label
      ]
    });
  }
  const arrowKeyDiffs = {
    ArrowUp: {
      x: 0,
      y: -1
    },
    ArrowDown: {
      x: 0,
      y: 1
    },
    ArrowLeft: {
      x: -1,
      y: 0
    },
    ArrowRight: {
      x: 1,
      y: 0
    }
  };
  const builtinNodeTypes = {
    input: InputNode,
    default: DefaultNode,
    output: OutputNode,
    group: GroupNode
  };
  function getNodeInlineStyleDimensions(node) {
    var _a, _b, _c, _d;
    if (node.internals.handleBounds === void 0) {
      return {
        width: node.width ?? node.initialWidth ?? ((_a = node.style) == null ? void 0 : _a.width),
        height: node.height ?? node.initialHeight ?? ((_b = node.style) == null ? void 0 : _b.height)
      };
    }
    return {
      width: node.width ?? ((_c = node.style) == null ? void 0 : _c.width),
      height: node.height ?? ((_d = node.style) == null ? void 0 : _d.height)
    };
  }
  const selector$f = (s) => {
    const { width, height, x, y } = getInternalNodesBounds(s.nodeLookup, {
      filter: (node) => !!node.selected
    });
    return {
      width: isNumeric(width) ? width : null,
      height: isNumeric(height) ? height : null,
      userSelectionActive: s.userSelectionActive,
      transformString: `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]}) translate(${x}px,${y}px)`
    };
  };
  function NodesSelection({ onSelectionContextMenu, noPanClassName, disableKeyboardA11y }) {
    const store = useStoreApi();
    const { width, height, transformString, userSelectionActive } = useStore(selector$f, shallow$1);
    const moveSelectedNodes = useMoveSelectedNodes();
    const nodeRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      var _a;
      if (!disableKeyboardA11y) {
        (_a = nodeRef.current) == null ? void 0 : _a.focus({
          preventScroll: true
        });
      }
    }, [
      disableKeyboardA11y
    ]);
    useDrag({
      nodeRef
    });
    if (userSelectionActive || !width || !height) {
      return null;
    }
    const onContextMenu = onSelectionContextMenu ? (event) => {
      const selectedNodes = store.getState().nodes.filter((n2) => n2.selected);
      onSelectionContextMenu(event, selectedNodes);
    } : void 0;
    const onKeyDown = (event) => {
      if (Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
        moveSelectedNodes({
          direction: arrowKeyDiffs[event.key],
          factor: event.shiftKey ? 4 : 1
        });
      }
    };
    return jsxRuntimeExports.jsx("div", {
      className: cc([
        "react-flow__nodesselection",
        "react-flow__container",
        noPanClassName
      ]),
      style: {
        transform: transformString
      },
      children: jsxRuntimeExports.jsx("div", {
        ref: nodeRef,
        className: "react-flow__nodesselection-rect",
        onContextMenu,
        tabIndex: disableKeyboardA11y ? void 0 : -1,
        onKeyDown: disableKeyboardA11y ? void 0 : onKeyDown,
        style: {
          width,
          height
        }
      })
    });
  }
  const win = typeof window !== "undefined" ? window : void 0;
  const selector$e = (s) => {
    return {
      nodesSelectionActive: s.nodesSelectionActive,
      userSelectionActive: s.userSelectionActive
    };
  };
  function FlowRendererComponent({ children: children2, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneContextMenu, onPaneScroll, paneClickDistance, deleteKeyCode, selectionKeyCode, selectionOnDrag, selectionMode, onSelectionStart, onSelectionEnd, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, elementsSelectable, zoomOnScroll, zoomOnPinch, panOnScroll: _panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag: _panOnDrag, defaultViewport: defaultViewport2, translateExtent, minZoom, maxZoom, preventScrolling, onSelectionContextMenu, noWheelClassName, noPanClassName, disableKeyboardA11y, onViewportChange, isControlledViewport }) {
    const { nodesSelectionActive, userSelectionActive } = useStore(selector$e);
    const selectionKeyPressed = useKeyPress(selectionKeyCode, {
      target: win
    });
    const panActivationKeyPressed = useKeyPress(panActivationKeyCode, {
      target: win
    });
    const panOnDrag = panActivationKeyPressed || _panOnDrag;
    const panOnScroll = panActivationKeyPressed || _panOnScroll;
    const _selectionOnDrag = selectionOnDrag && panOnDrag !== true;
    const isSelecting = selectionKeyPressed || userSelectionActive || _selectionOnDrag;
    useGlobalKeyHandler({
      deleteKeyCode,
      multiSelectionKeyCode
    });
    return jsxRuntimeExports.jsx(ZoomPane, {
      onPaneContextMenu,
      elementsSelectable,
      zoomOnScroll,
      zoomOnPinch,
      panOnScroll,
      panOnScrollSpeed,
      panOnScrollMode,
      zoomOnDoubleClick,
      panOnDrag: !selectionKeyPressed && panOnDrag,
      defaultViewport: defaultViewport2,
      translateExtent,
      minZoom,
      maxZoom,
      zoomActivationKeyCode,
      preventScrolling,
      noWheelClassName,
      noPanClassName,
      onViewportChange,
      isControlledViewport,
      paneClickDistance,
      children: jsxRuntimeExports.jsxs(Pane, {
        onSelectionStart,
        onSelectionEnd,
        onPaneClick,
        onPaneMouseEnter,
        onPaneMouseMove,
        onPaneMouseLeave,
        onPaneContextMenu,
        onPaneScroll,
        panOnDrag,
        isSelecting: !!isSelecting,
        selectionMode,
        selectionKeyPressed,
        selectionOnDrag: _selectionOnDrag,
        children: [
          children2,
          nodesSelectionActive && jsxRuntimeExports.jsx(NodesSelection, {
            onSelectionContextMenu,
            noPanClassName,
            disableKeyboardA11y
          })
        ]
      })
    });
  }
  FlowRendererComponent.displayName = "FlowRenderer";
  const FlowRenderer = reactExports.memo(FlowRendererComponent);
  const selector$d = (onlyRenderVisible) => (s) => {
    return onlyRenderVisible ? getNodesInside(s.nodeLookup, {
      x: 0,
      y: 0,
      width: s.width,
      height: s.height
    }, s.transform, true).map((node) => node.id) : Array.from(s.nodeLookup.keys());
  };
  function useVisibleNodeIds(onlyRenderVisible) {
    const nodeIds = useStore(reactExports.useCallback(selector$d(onlyRenderVisible), [
      onlyRenderVisible
    ]), shallow$1);
    return nodeIds;
  }
  const selector$c = (s) => s.updateNodeInternals;
  function useResizeObserver() {
    const updateNodeInternals2 = useStore(selector$c);
    const [resizeObserver] = reactExports.useState(() => {
      if (typeof ResizeObserver === "undefined") {
        return null;
      }
      return new ResizeObserver((entries) => {
        const updates = /* @__PURE__ */ new Map();
        entries.forEach((entry) => {
          const id2 = entry.target.getAttribute("data-id");
          updates.set(id2, {
            id: id2,
            nodeElement: entry.target,
            force: true
          });
        });
        updateNodeInternals2(updates);
      });
    });
    reactExports.useEffect(() => {
      return () => {
        resizeObserver == null ? void 0 : resizeObserver.disconnect();
      };
    }, [
      resizeObserver
    ]);
    return resizeObserver;
  }
  function useNodeObserver({ node, nodeType, hasDimensions, resizeObserver }) {
    const store = useStoreApi();
    const nodeRef = reactExports.useRef(null);
    const observedNode = reactExports.useRef(null);
    const prevSourcePosition = reactExports.useRef(node.sourcePosition);
    const prevTargetPosition = reactExports.useRef(node.targetPosition);
    const prevType = reactExports.useRef(nodeType);
    const isInitialized = hasDimensions && !!node.internals.handleBounds;
    reactExports.useEffect(() => {
      if (nodeRef.current && !node.hidden && (!isInitialized || observedNode.current !== nodeRef.current)) {
        if (observedNode.current) {
          resizeObserver == null ? void 0 : resizeObserver.unobserve(observedNode.current);
        }
        resizeObserver == null ? void 0 : resizeObserver.observe(nodeRef.current);
        observedNode.current = nodeRef.current;
      }
    }, [
      isInitialized,
      node.hidden
    ]);
    reactExports.useEffect(() => {
      return () => {
        if (observedNode.current) {
          resizeObserver == null ? void 0 : resizeObserver.unobserve(observedNode.current);
          observedNode.current = null;
        }
      };
    }, []);
    reactExports.useEffect(() => {
      if (nodeRef.current) {
        const typeChanged = prevType.current !== nodeType;
        const sourcePosChanged = prevSourcePosition.current !== node.sourcePosition;
        const targetPosChanged = prevTargetPosition.current !== node.targetPosition;
        if (typeChanged || sourcePosChanged || targetPosChanged) {
          prevType.current = nodeType;
          prevSourcePosition.current = node.sourcePosition;
          prevTargetPosition.current = node.targetPosition;
          store.getState().updateNodeInternals(/* @__PURE__ */ new Map([
            [
              node.id,
              {
                id: node.id,
                nodeElement: nodeRef.current,
                force: true
              }
            ]
          ]));
        }
      }
    }, [
      node.id,
      nodeType,
      node.sourcePosition,
      node.targetPosition
    ]);
    return nodeRef;
  }
  function NodeWrapper({ id: id2, onClick, onMouseEnter, onMouseMove, onMouseLeave, onContextMenu, onDoubleClick, nodesDraggable, elementsSelectable, nodesConnectable, nodesFocusable, resizeObserver, noDragClassName, noPanClassName, disableKeyboardA11y, rfId, nodeTypes, nodeExtent, nodeClickDistance, onError }) {
    const { node, internals, isParent } = useStore((s) => {
      const node2 = s.nodeLookup.get(id2);
      const isParent2 = s.parentLookup.has(id2);
      return {
        node: node2,
        internals: node2.internals,
        isParent: isParent2
      };
    }, shallow$1);
    let nodeType = node.type || "default";
    let NodeComponent = (nodeTypes == null ? void 0 : nodeTypes[nodeType]) || builtinNodeTypes[nodeType];
    if (NodeComponent === void 0) {
      onError == null ? void 0 : onError("003", errorMessages["error003"](nodeType));
      nodeType = "default";
      NodeComponent = builtinNodeTypes.default;
    }
    const isDraggable = !!(node.draggable || nodesDraggable && typeof node.draggable === "undefined");
    const isSelectable = !!(node.selectable || elementsSelectable && typeof node.selectable === "undefined");
    const isConnectable = !!(node.connectable || nodesConnectable && typeof node.connectable === "undefined");
    const isFocusable = !!(node.focusable || nodesFocusable && typeof node.focusable === "undefined");
    const store = useStoreApi();
    const hasDimensions = nodeHasDimensions(node);
    const nodeRef = useNodeObserver({
      node,
      nodeType,
      hasDimensions,
      resizeObserver
    });
    const dragging = useDrag({
      nodeRef,
      disabled: node.hidden || !isDraggable,
      noDragClassName,
      handleSelector: node.dragHandle,
      nodeId: id2,
      isSelectable,
      nodeClickDistance
    });
    const moveSelectedNodes = useMoveSelectedNodes();
    if (node.hidden) {
      return null;
    }
    const nodeDimensions = getNodeDimensions(node);
    const inlineDimensions = getNodeInlineStyleDimensions(node);
    const hasPointerEvents = isSelectable || isDraggable || onClick || onMouseEnter || onMouseMove || onMouseLeave;
    const onMouseEnterHandler = onMouseEnter ? (event) => onMouseEnter(event, {
      ...internals.userNode
    }) : void 0;
    const onMouseMoveHandler = onMouseMove ? (event) => onMouseMove(event, {
      ...internals.userNode
    }) : void 0;
    const onMouseLeaveHandler = onMouseLeave ? (event) => onMouseLeave(event, {
      ...internals.userNode
    }) : void 0;
    const onContextMenuHandler = onContextMenu ? (event) => onContextMenu(event, {
      ...internals.userNode
    }) : void 0;
    const onDoubleClickHandler = onDoubleClick ? (event) => onDoubleClick(event, {
      ...internals.userNode
    }) : void 0;
    const onSelectNodeHandler = (event) => {
      const { selectNodesOnDrag, nodeDragThreshold } = store.getState();
      if (isSelectable && (!selectNodesOnDrag || !isDraggable || nodeDragThreshold > 0)) {
        handleNodeClick({
          id: id2,
          store,
          nodeRef
        });
      }
      if (onClick) {
        onClick(event, {
          ...internals.userNode
        });
      }
    };
    const onKeyDown = (event) => {
      if (isInputDOMNode(event.nativeEvent) || disableKeyboardA11y) {
        return;
      }
      if (elementSelectionKeys.includes(event.key) && isSelectable) {
        const unselect = event.key === "Escape";
        handleNodeClick({
          id: id2,
          store,
          unselect,
          nodeRef
        });
      } else if (isDraggable && node.selected && Object.prototype.hasOwnProperty.call(arrowKeyDiffs, event.key)) {
        store.setState({
          ariaLiveMessage: `Moved selected node ${event.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~internals.positionAbsolute.x}, y: ${~~internals.positionAbsolute.y}`
        });
        moveSelectedNodes({
          direction: arrowKeyDiffs[event.key],
          factor: event.shiftKey ? 4 : 1
        });
      }
    };
    return jsxRuntimeExports.jsx("div", {
      className: cc([
        "react-flow__node",
        `react-flow__node-${nodeType}`,
        {
          [noPanClassName]: isDraggable
        },
        node.className,
        {
          selected: node.selected,
          selectable: isSelectable,
          parent: isParent,
          draggable: isDraggable,
          dragging
        }
      ]),
      ref: nodeRef,
      style: {
        zIndex: internals.z,
        transform: `translate(${internals.positionAbsolute.x}px,${internals.positionAbsolute.y}px)`,
        pointerEvents: hasPointerEvents ? "all" : "none",
        visibility: hasDimensions ? "visible" : "hidden",
        ...node.style,
        ...inlineDimensions
      },
      "data-id": id2,
      "data-testid": `rf__node-${id2}`,
      onMouseEnter: onMouseEnterHandler,
      onMouseMove: onMouseMoveHandler,
      onMouseLeave: onMouseLeaveHandler,
      onContextMenu: onContextMenuHandler,
      onClick: onSelectNodeHandler,
      onDoubleClick: onDoubleClickHandler,
      onKeyDown: isFocusable ? onKeyDown : void 0,
      tabIndex: isFocusable ? 0 : void 0,
      role: isFocusable ? "button" : void 0,
      "aria-describedby": disableKeyboardA11y ? void 0 : `${ARIA_NODE_DESC_KEY}-${rfId}`,
      "aria-label": node.ariaLabel,
      children: jsxRuntimeExports.jsx(Provider, {
        value: id2,
        children: jsxRuntimeExports.jsx(NodeComponent, {
          id: id2,
          data: node.data,
          type: nodeType,
          positionAbsoluteX: internals.positionAbsolute.x,
          positionAbsoluteY: internals.positionAbsolute.y,
          selected: node.selected,
          selectable: isSelectable,
          draggable: isDraggable,
          deletable: node.deletable ?? true,
          isConnectable,
          sourcePosition: node.sourcePosition,
          targetPosition: node.targetPosition,
          dragging,
          dragHandle: node.dragHandle,
          zIndex: internals.z,
          parentId: node.parentId,
          ...nodeDimensions
        })
      })
    });
  }
  const selector$b = (s) => ({
    nodesDraggable: s.nodesDraggable,
    nodesConnectable: s.nodesConnectable,
    nodesFocusable: s.nodesFocusable,
    elementsSelectable: s.elementsSelectable,
    onError: s.onError
  });
  function NodeRendererComponent(props) {
    const { nodesDraggable, nodesConnectable, nodesFocusable, elementsSelectable, onError } = useStore(selector$b, shallow$1);
    const nodeIds = useVisibleNodeIds(props.onlyRenderVisibleElements);
    const resizeObserver = useResizeObserver();
    return jsxRuntimeExports.jsx("div", {
      className: "react-flow__nodes",
      style: containerStyle,
      children: nodeIds.map((nodeId) => {
        return jsxRuntimeExports.jsx(NodeWrapper, {
          id: nodeId,
          nodeTypes: props.nodeTypes,
          nodeExtent: props.nodeExtent,
          onClick: props.onNodeClick,
          onMouseEnter: props.onNodeMouseEnter,
          onMouseMove: props.onNodeMouseMove,
          onMouseLeave: props.onNodeMouseLeave,
          onContextMenu: props.onNodeContextMenu,
          onDoubleClick: props.onNodeDoubleClick,
          noDragClassName: props.noDragClassName,
          noPanClassName: props.noPanClassName,
          rfId: props.rfId,
          disableKeyboardA11y: props.disableKeyboardA11y,
          resizeObserver,
          nodesDraggable,
          nodesConnectable,
          nodesFocusable,
          elementsSelectable,
          nodeClickDistance: props.nodeClickDistance,
          onError
        }, nodeId);
      })
    });
  }
  NodeRendererComponent.displayName = "NodeRenderer";
  const NodeRenderer = reactExports.memo(NodeRendererComponent);
  function useVisibleEdgeIds(onlyRenderVisible) {
    const edgeIds = useStore(reactExports.useCallback((s) => {
      if (!onlyRenderVisible) {
        return s.edges.map((edge) => edge.id);
      }
      const visibleEdgeIds = [];
      if (s.width && s.height) {
        for (const edge of s.edges) {
          const sourceNode = s.nodeLookup.get(edge.source);
          const targetNode = s.nodeLookup.get(edge.target);
          if (sourceNode && targetNode && isEdgeVisible({
            sourceNode,
            targetNode,
            width: s.width,
            height: s.height,
            transform: s.transform
          })) {
            visibleEdgeIds.push(edge.id);
          }
        }
      }
      return visibleEdgeIds;
    }, [
      onlyRenderVisible
    ]), shallow$1);
    return edgeIds;
  }
  const ArrowSymbol = ({ color: color2 = "none", strokeWidth = 1 }) => {
    return jsxRuntimeExports.jsx("polyline", {
      style: {
        stroke: color2,
        strokeWidth
      },
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      points: "-5,-4 0,0 -5,4"
    });
  };
  const ArrowClosedSymbol = ({ color: color2 = "none", strokeWidth = 1 }) => {
    return jsxRuntimeExports.jsx("polyline", {
      style: {
        stroke: color2,
        fill: color2,
        strokeWidth
      },
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "-5,-4 0,0 -5,4 -5,-4"
    });
  };
  const MarkerSymbols = {
    [MarkerType.Arrow]: ArrowSymbol,
    [MarkerType.ArrowClosed]: ArrowClosedSymbol
  };
  function useMarkerSymbol(type) {
    const store = useStoreApi();
    const symbol = reactExports.useMemo(() => {
      var _a, _b;
      const symbolExists = Object.prototype.hasOwnProperty.call(MarkerSymbols, type);
      if (!symbolExists) {
        (_b = (_a = store.getState()).onError) == null ? void 0 : _b.call(_a, "009", errorMessages["error009"](type));
        return null;
      }
      return MarkerSymbols[type];
    }, [
      type
    ]);
    return symbol;
  }
  const Marker = ({ id: id2, type, color: color2, width = 12.5, height = 12.5, markerUnits = "strokeWidth", strokeWidth, orient = "auto-start-reverse" }) => {
    const Symbol2 = useMarkerSymbol(type);
    if (!Symbol2) {
      return null;
    }
    return jsxRuntimeExports.jsx("marker", {
      className: "react-flow__arrowhead",
      id: id2,
      markerWidth: `${width}`,
      markerHeight: `${height}`,
      viewBox: "-10 -10 20 20",
      markerUnits,
      orient,
      refX: "0",
      refY: "0",
      children: jsxRuntimeExports.jsx(Symbol2, {
        color: color2,
        strokeWidth
      })
    });
  };
  const MarkerDefinitions = ({ defaultColor, rfId }) => {
    const edges = useStore((s) => s.edges);
    const defaultEdgeOptions = useStore((s) => s.defaultEdgeOptions);
    const markers = reactExports.useMemo(() => {
      const markers2 = createMarkerIds(edges, {
        id: rfId,
        defaultColor,
        defaultMarkerStart: defaultEdgeOptions == null ? void 0 : defaultEdgeOptions.markerStart,
        defaultMarkerEnd: defaultEdgeOptions == null ? void 0 : defaultEdgeOptions.markerEnd
      });
      return markers2;
    }, [
      edges,
      defaultEdgeOptions,
      rfId,
      defaultColor
    ]);
    if (!markers.length) {
      return null;
    }
    return jsxRuntimeExports.jsx("svg", {
      className: "react-flow__marker",
      children: jsxRuntimeExports.jsx("defs", {
        children: markers.map((marker) => jsxRuntimeExports.jsx(Marker, {
          id: marker.id,
          type: marker.type,
          color: marker.color,
          width: marker.width,
          height: marker.height,
          markerUnits: marker.markerUnits,
          strokeWidth: marker.strokeWidth,
          orient: marker.orient
        }, marker.id))
      })
    });
  };
  MarkerDefinitions.displayName = "MarkerDefinitions";
  var MarkerDefinitions$1 = reactExports.memo(MarkerDefinitions);
  function EdgeTextComponent({ x, y, label, labelStyle = {}, labelShowBg = true, labelBgStyle = {}, labelBgPadding = [
    2,
    4
  ], labelBgBorderRadius = 2, children: children2, className, ...rest }) {
    const [edgeTextBbox, setEdgeTextBbox] = reactExports.useState({
      x: 1,
      y: 0,
      width: 0,
      height: 0
    });
    const edgeTextClasses = cc([
      "react-flow__edge-textwrapper",
      className
    ]);
    const edgeTextRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      if (edgeTextRef.current) {
        const textBbox = edgeTextRef.current.getBBox();
        setEdgeTextBbox({
          x: textBbox.x,
          y: textBbox.y,
          width: textBbox.width,
          height: textBbox.height
        });
      }
    }, [
      label
    ]);
    if (typeof label === "undefined" || !label) {
      return null;
    }
    return jsxRuntimeExports.jsxs("g", {
      transform: `translate(${x - edgeTextBbox.width / 2} ${y - edgeTextBbox.height / 2})`,
      className: edgeTextClasses,
      visibility: edgeTextBbox.width ? "visible" : "hidden",
      ...rest,
      children: [
        labelShowBg && jsxRuntimeExports.jsx("rect", {
          width: edgeTextBbox.width + 2 * labelBgPadding[0],
          x: -labelBgPadding[0],
          y: -labelBgPadding[1],
          height: edgeTextBbox.height + 2 * labelBgPadding[1],
          className: "react-flow__edge-textbg",
          style: labelBgStyle,
          rx: labelBgBorderRadius,
          ry: labelBgBorderRadius
        }),
        jsxRuntimeExports.jsx("text", {
          className: "react-flow__edge-text",
          y: edgeTextBbox.height / 2,
          dy: "0.3em",
          ref: edgeTextRef,
          style: labelStyle,
          children: label
        }),
        children2
      ]
    });
  }
  EdgeTextComponent.displayName = "EdgeText";
  const EdgeText = reactExports.memo(EdgeTextComponent);
  function BaseEdge({ id: id2, path, labelX, labelY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style: style2, markerEnd, markerStart, className, interactionWidth = 20 }) {
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        jsxRuntimeExports.jsx("path", {
          id: id2,
          style: style2,
          d: path,
          fill: "none",
          className: cc([
            "react-flow__edge-path",
            className
          ]),
          markerEnd,
          markerStart
        }),
        interactionWidth && jsxRuntimeExports.jsx("path", {
          d: path,
          fill: "none",
          strokeOpacity: 0,
          strokeWidth: interactionWidth,
          className: "react-flow__edge-interaction"
        }),
        label && isNumeric(labelX) && isNumeric(labelY) ? jsxRuntimeExports.jsx(EdgeText, {
          x: labelX,
          y: labelY,
          label,
          labelStyle,
          labelShowBg,
          labelBgStyle,
          labelBgPadding,
          labelBgBorderRadius
        }) : null
      ]
    });
  }
  function getControl({ pos, x1, y1, x2, y2 }) {
    if (pos === Position.Left || pos === Position.Right) {
      return [
        0.5 * (x1 + x2),
        y1
      ];
    }
    return [
      x1,
      0.5 * (y1 + y2)
    ];
  }
  function getSimpleBezierPath({ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top }) {
    const [sourceControlX, sourceControlY] = getControl({
      pos: sourcePosition,
      x1: sourceX,
      y1: sourceY,
      x2: targetX,
      y2: targetY
    });
    const [targetControlX, targetControlY] = getControl({
      pos: targetPosition,
      x1: targetX,
      y1: targetY,
      x2: sourceX,
      y2: sourceY
    });
    const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourceControlX,
      sourceControlY,
      targetControlX,
      targetControlY
    });
    return [
      `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`,
      labelX,
      labelY,
      offsetX,
      offsetY
    ];
  }
  function createSimpleBezierEdge(params) {
    return reactExports.memo(({ id: id2, sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style: style2, markerEnd, markerStart, interactionWidth }) => {
      const [path, labelX, labelY] = getSimpleBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
      });
      const _id = params.isInternal ? void 0 : id2;
      return jsxRuntimeExports.jsx(BaseEdge, {
        id: _id,
        path,
        labelX,
        labelY,
        label,
        labelStyle,
        labelShowBg,
        labelBgStyle,
        labelBgPadding,
        labelBgBorderRadius,
        style: style2,
        markerEnd,
        markerStart,
        interactionWidth
      });
    });
  }
  const SimpleBezierEdge = createSimpleBezierEdge({
    isInternal: false
  });
  const SimpleBezierEdgeInternal = createSimpleBezierEdge({
    isInternal: true
  });
  SimpleBezierEdge.displayName = "SimpleBezierEdge";
  SimpleBezierEdgeInternal.displayName = "SimpleBezierEdgeInternal";
  function createSmoothStepEdge(params) {
    return reactExports.memo(({ id: id2, sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style: style2, sourcePosition = Position.Bottom, targetPosition = Position.Top, markerEnd, markerStart, pathOptions, interactionWidth }) => {
      const [path, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: pathOptions == null ? void 0 : pathOptions.borderRadius,
        offset: pathOptions == null ? void 0 : pathOptions.offset
      });
      const _id = params.isInternal ? void 0 : id2;
      return jsxRuntimeExports.jsx(BaseEdge, {
        id: _id,
        path,
        labelX,
        labelY,
        label,
        labelStyle,
        labelShowBg,
        labelBgStyle,
        labelBgPadding,
        labelBgBorderRadius,
        style: style2,
        markerEnd,
        markerStart,
        interactionWidth
      });
    });
  }
  const SmoothStepEdge = createSmoothStepEdge({
    isInternal: false
  });
  const SmoothStepEdgeInternal = createSmoothStepEdge({
    isInternal: true
  });
  SmoothStepEdge.displayName = "SmoothStepEdge";
  SmoothStepEdgeInternal.displayName = "SmoothStepEdgeInternal";
  function createStepEdge(params) {
    return reactExports.memo(({ id: id2, ...props }) => {
      var _a;
      const _id = params.isInternal ? void 0 : id2;
      return jsxRuntimeExports.jsx(SmoothStepEdge, {
        ...props,
        id: _id,
        pathOptions: reactExports.useMemo(() => {
          var _a2;
          return {
            borderRadius: 0,
            offset: (_a2 = props.pathOptions) == null ? void 0 : _a2.offset
          };
        }, [
          (_a = props.pathOptions) == null ? void 0 : _a.offset
        ])
      });
    });
  }
  const StepEdge = createStepEdge({
    isInternal: false
  });
  const StepEdgeInternal = createStepEdge({
    isInternal: true
  });
  StepEdge.displayName = "StepEdge";
  StepEdgeInternal.displayName = "StepEdgeInternal";
  function createStraightEdge(params) {
    return reactExports.memo(({ id: id2, sourceX, sourceY, targetX, targetY, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style: style2, markerEnd, markerStart, interactionWidth }) => {
      const [path, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY
      });
      const _id = params.isInternal ? void 0 : id2;
      return jsxRuntimeExports.jsx(BaseEdge, {
        id: _id,
        path,
        labelX,
        labelY,
        label,
        labelStyle,
        labelShowBg,
        labelBgStyle,
        labelBgPadding,
        labelBgBorderRadius,
        style: style2,
        markerEnd,
        markerStart,
        interactionWidth
      });
    });
  }
  const StraightEdge = createStraightEdge({
    isInternal: false
  });
  const StraightEdgeInternal = createStraightEdge({
    isInternal: true
  });
  StraightEdge.displayName = "StraightEdge";
  StraightEdgeInternal.displayName = "StraightEdgeInternal";
  function createBezierEdge(params) {
    return reactExports.memo(({ id: id2, sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, style: style2, markerEnd, markerStart, pathOptions, interactionWidth }) => {
      const [path, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        curvature: pathOptions == null ? void 0 : pathOptions.curvature
      });
      const _id = params.isInternal ? void 0 : id2;
      return jsxRuntimeExports.jsx(BaseEdge, {
        id: _id,
        path,
        labelX,
        labelY,
        label,
        labelStyle,
        labelShowBg,
        labelBgStyle,
        labelBgPadding,
        labelBgBorderRadius,
        style: style2,
        markerEnd,
        markerStart,
        interactionWidth
      });
    });
  }
  const BezierEdge = createBezierEdge({
    isInternal: false
  });
  const BezierEdgeInternal = createBezierEdge({
    isInternal: true
  });
  BezierEdge.displayName = "BezierEdge";
  BezierEdgeInternal.displayName = "BezierEdgeInternal";
  const builtinEdgeTypes = {
    default: BezierEdgeInternal,
    straight: StraightEdgeInternal,
    step: StepEdgeInternal,
    smoothstep: SmoothStepEdgeInternal,
    simplebezier: SimpleBezierEdgeInternal
  };
  const nullPosition = {
    sourceX: null,
    sourceY: null,
    targetX: null,
    targetY: null,
    sourcePosition: null,
    targetPosition: null
  };
  const shiftX = (x, shift, position) => {
    if (position === Position.Left) return x - shift;
    if (position === Position.Right) return x + shift;
    return x;
  };
  const shiftY = (y, shift, position) => {
    if (position === Position.Top) return y - shift;
    if (position === Position.Bottom) return y + shift;
    return y;
  };
  const EdgeUpdaterClassName = "react-flow__edgeupdater";
  function EdgeAnchor({ position, centerX, centerY, radius = 10, onMouseDown, onMouseEnter, onMouseOut, type }) {
    return jsxRuntimeExports.jsx("circle", {
      onMouseDown,
      onMouseEnter,
      onMouseOut,
      className: cc([
        EdgeUpdaterClassName,
        `${EdgeUpdaterClassName}-${type}`
      ]),
      cx: shiftX(centerX, radius, position),
      cy: shiftY(centerY, radius, position),
      r: radius,
      stroke: "transparent",
      fill: "transparent"
    });
  }
  function EdgeUpdateAnchors({ isReconnectable, reconnectRadius, edge, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, onReconnect, onReconnectStart, onReconnectEnd, setReconnecting, setUpdateHover }) {
    const store = useStoreApi();
    const handleEdgeUpdater = (event, oppositeHandle) => {
      if (event.button !== 0) {
        return;
      }
      const { autoPanOnConnect, domNode, isValidConnection, connectionMode, connectionRadius, lib, onConnectStart, onConnectEnd, cancelConnection, nodeLookup, rfId: flowId, panBy: panBy2, updateConnection } = store.getState();
      const isTarget = oppositeHandle.type === "target";
      setReconnecting(true);
      onReconnectStart == null ? void 0 : onReconnectStart(event, edge, oppositeHandle.type);
      const _onReconnectEnd = (evt, connectionState) => {
        setReconnecting(false);
        onReconnectEnd == null ? void 0 : onReconnectEnd(evt, edge, oppositeHandle.type, connectionState);
      };
      const onConnectEdge = (connection) => onReconnect == null ? void 0 : onReconnect(edge, connection);
      XYHandle.onPointerDown(event.nativeEvent, {
        autoPanOnConnect,
        connectionMode,
        connectionRadius,
        domNode,
        handleId: oppositeHandle.id,
        nodeId: oppositeHandle.nodeId,
        nodeLookup,
        isTarget,
        edgeUpdaterType: oppositeHandle.type,
        lib,
        flowId,
        cancelConnection,
        panBy: panBy2,
        isValidConnection,
        onConnect: onConnectEdge,
        onConnectStart,
        onConnectEnd,
        onReconnectEnd: _onReconnectEnd,
        updateConnection,
        getTransform: () => store.getState().transform,
        getFromHandle: () => store.getState().connection.fromHandle
      });
    };
    const onReconnectSourceMouseDown = (event) => handleEdgeUpdater(event, {
      nodeId: edge.target,
      id: edge.targetHandle ?? null,
      type: "target"
    });
    const onReconnectTargetMouseDown = (event) => handleEdgeUpdater(event, {
      nodeId: edge.source,
      id: edge.sourceHandle ?? null,
      type: "source"
    });
    const onReconnectMouseEnter = () => setUpdateHover(true);
    const onReconnectMouseOut = () => setUpdateHover(false);
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        (isReconnectable === true || isReconnectable === "source") && jsxRuntimeExports.jsx(EdgeAnchor, {
          position: sourcePosition,
          centerX: sourceX,
          centerY: sourceY,
          radius: reconnectRadius,
          onMouseDown: onReconnectSourceMouseDown,
          onMouseEnter: onReconnectMouseEnter,
          onMouseOut: onReconnectMouseOut,
          type: "source"
        }),
        (isReconnectable === true || isReconnectable === "target") && jsxRuntimeExports.jsx(EdgeAnchor, {
          position: targetPosition,
          centerX: targetX,
          centerY: targetY,
          radius: reconnectRadius,
          onMouseDown: onReconnectTargetMouseDown,
          onMouseEnter: onReconnectMouseEnter,
          onMouseOut: onReconnectMouseOut,
          type: "target"
        })
      ]
    });
  }
  function EdgeWrapper({ id: id2, edgesFocusable, edgesReconnectable, elementsSelectable, onClick, onDoubleClick, onContextMenu, onMouseEnter, onMouseMove, onMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, rfId, edgeTypes, noPanClassName, onError, disableKeyboardA11y }) {
    let edge = useStore((s) => s.edgeLookup.get(id2));
    const defaultEdgeOptions = useStore((s) => s.defaultEdgeOptions);
    edge = defaultEdgeOptions ? {
      ...defaultEdgeOptions,
      ...edge
    } : edge;
    let edgeType = edge.type || "default";
    let EdgeComponent = (edgeTypes == null ? void 0 : edgeTypes[edgeType]) || builtinEdgeTypes[edgeType];
    if (EdgeComponent === void 0) {
      onError == null ? void 0 : onError("011", errorMessages["error011"](edgeType));
      edgeType = "default";
      EdgeComponent = builtinEdgeTypes.default;
    }
    const isFocusable = !!(edge.focusable || edgesFocusable && typeof edge.focusable === "undefined");
    const isReconnectable = typeof onReconnect !== "undefined" && (edge.reconnectable || edgesReconnectable && typeof edge.reconnectable === "undefined");
    const isSelectable = !!(edge.selectable || elementsSelectable && typeof edge.selectable === "undefined");
    const edgeRef = reactExports.useRef(null);
    const [updateHover, setUpdateHover] = reactExports.useState(false);
    const [reconnecting, setReconnecting] = reactExports.useState(false);
    const store = useStoreApi();
    const { zIndex, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = useStore(reactExports.useCallback((store2) => {
      const sourceNode = store2.nodeLookup.get(edge.source);
      const targetNode = store2.nodeLookup.get(edge.target);
      if (!sourceNode || !targetNode) {
        return {
          zIndex: edge.zIndex,
          ...nullPosition
        };
      }
      const edgePosition = getEdgePosition({
        id: id2,
        sourceNode,
        targetNode,
        sourceHandle: edge.sourceHandle || null,
        targetHandle: edge.targetHandle || null,
        connectionMode: store2.connectionMode,
        onError
      });
      const zIndex2 = getElevatedEdgeZIndex({
        selected: edge.selected,
        zIndex: edge.zIndex,
        sourceNode,
        targetNode,
        elevateOnSelect: store2.elevateEdgesOnSelect
      });
      return {
        zIndex: zIndex2,
        ...edgePosition || nullPosition
      };
    }, [
      edge.source,
      edge.target,
      edge.sourceHandle,
      edge.targetHandle,
      edge.selected,
      edge.zIndex
    ]), shallow$1);
    const markerStartUrl = reactExports.useMemo(() => edge.markerStart ? `url('#${getMarkerId(edge.markerStart, rfId)}')` : void 0, [
      edge.markerStart,
      rfId
    ]);
    const markerEndUrl = reactExports.useMemo(() => edge.markerEnd ? `url('#${getMarkerId(edge.markerEnd, rfId)}')` : void 0, [
      edge.markerEnd,
      rfId
    ]);
    if (edge.hidden || sourceX === null || sourceY === null || targetX === null || targetY === null) {
      return null;
    }
    const onEdgeClick = (event) => {
      var _a;
      const { addSelectedEdges, unselectNodesAndEdges, multiSelectionActive } = store.getState();
      if (isSelectable) {
        store.setState({
          nodesSelectionActive: false
        });
        if (edge.selected && multiSelectionActive) {
          unselectNodesAndEdges({
            nodes: [],
            edges: [
              edge
            ]
          });
          (_a = edgeRef.current) == null ? void 0 : _a.blur();
        } else {
          addSelectedEdges([
            id2
          ]);
        }
      }
      if (onClick) {
        onClick(event, edge);
      }
    };
    const onEdgeDoubleClick = onDoubleClick ? (event) => {
      onDoubleClick(event, {
        ...edge
      });
    } : void 0;
    const onEdgeContextMenu = onContextMenu ? (event) => {
      onContextMenu(event, {
        ...edge
      });
    } : void 0;
    const onEdgeMouseEnter = onMouseEnter ? (event) => {
      onMouseEnter(event, {
        ...edge
      });
    } : void 0;
    const onEdgeMouseMove = onMouseMove ? (event) => {
      onMouseMove(event, {
        ...edge
      });
    } : void 0;
    const onEdgeMouseLeave = onMouseLeave ? (event) => {
      onMouseLeave(event, {
        ...edge
      });
    } : void 0;
    const onKeyDown = (event) => {
      var _a;
      if (!disableKeyboardA11y && elementSelectionKeys.includes(event.key) && isSelectable) {
        const { unselectNodesAndEdges, addSelectedEdges } = store.getState();
        const unselect = event.key === "Escape";
        if (unselect) {
          (_a = edgeRef.current) == null ? void 0 : _a.blur();
          unselectNodesAndEdges({
            edges: [
              edge
            ]
          });
        } else {
          addSelectedEdges([
            id2
          ]);
        }
      }
    };
    return jsxRuntimeExports.jsx("svg", {
      style: {
        zIndex
      },
      children: jsxRuntimeExports.jsxs("g", {
        className: cc([
          "react-flow__edge",
          `react-flow__edge-${edgeType}`,
          edge.className,
          noPanClassName,
          {
            selected: edge.selected,
            animated: edge.animated,
            inactive: !isSelectable && !onClick,
            updating: updateHover,
            selectable: isSelectable
          }
        ]),
        onClick: onEdgeClick,
        onDoubleClick: onEdgeDoubleClick,
        onContextMenu: onEdgeContextMenu,
        onMouseEnter: onEdgeMouseEnter,
        onMouseMove: onEdgeMouseMove,
        onMouseLeave: onEdgeMouseLeave,
        onKeyDown: isFocusable ? onKeyDown : void 0,
        tabIndex: isFocusable ? 0 : void 0,
        role: isFocusable ? "button" : "img",
        "data-id": id2,
        "data-testid": `rf__edge-${id2}`,
        "aria-label": edge.ariaLabel === null ? void 0 : edge.ariaLabel || `Edge from ${edge.source} to ${edge.target}`,
        "aria-describedby": isFocusable ? `${ARIA_EDGE_DESC_KEY}-${rfId}` : void 0,
        ref: edgeRef,
        children: [
          !reconnecting && jsxRuntimeExports.jsx(EdgeComponent, {
            id: id2,
            source: edge.source,
            target: edge.target,
            type: edge.type,
            selected: edge.selected,
            animated: edge.animated,
            selectable: isSelectable,
            deletable: edge.deletable ?? true,
            label: edge.label,
            labelStyle: edge.labelStyle,
            labelShowBg: edge.labelShowBg,
            labelBgStyle: edge.labelBgStyle,
            labelBgPadding: edge.labelBgPadding,
            labelBgBorderRadius: edge.labelBgBorderRadius,
            sourceX,
            sourceY,
            targetX,
            targetY,
            sourcePosition,
            targetPosition,
            data: edge.data,
            style: edge.style,
            sourceHandleId: edge.sourceHandle,
            targetHandleId: edge.targetHandle,
            markerStart: markerStartUrl,
            markerEnd: markerEndUrl,
            pathOptions: "pathOptions" in edge ? edge.pathOptions : void 0,
            interactionWidth: edge.interactionWidth
          }),
          isReconnectable && jsxRuntimeExports.jsx(EdgeUpdateAnchors, {
            edge,
            isReconnectable,
            reconnectRadius,
            onReconnect,
            onReconnectStart,
            onReconnectEnd,
            sourceX,
            sourceY,
            targetX,
            targetY,
            sourcePosition,
            targetPosition,
            setUpdateHover,
            setReconnecting
          })
        ]
      })
    });
  }
  const selector$a = (s) => ({
    width: s.width,
    height: s.height,
    edgesFocusable: s.edgesFocusable,
    edgesReconnectable: s.edgesReconnectable,
    elementsSelectable: s.elementsSelectable,
    connectionMode: s.connectionMode,
    onError: s.onError
  });
  function EdgeRendererComponent({ defaultMarkerColor, onlyRenderVisibleElements, rfId, edgeTypes, noPanClassName, onReconnect, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, onEdgeClick, reconnectRadius, onEdgeDoubleClick, onReconnectStart, onReconnectEnd, disableKeyboardA11y }) {
    const { edgesFocusable, edgesReconnectable, elementsSelectable, onError } = useStore(selector$a, shallow$1);
    const edgeIds = useVisibleEdgeIds(onlyRenderVisibleElements);
    return jsxRuntimeExports.jsxs("div", {
      className: "react-flow__edges",
      children: [
        jsxRuntimeExports.jsx(MarkerDefinitions$1, {
          defaultColor: defaultMarkerColor,
          rfId
        }),
        edgeIds.map((id2) => {
          return jsxRuntimeExports.jsx(EdgeWrapper, {
            id: id2,
            edgesFocusable,
            edgesReconnectable,
            elementsSelectable,
            noPanClassName,
            onReconnect,
            onContextMenu: onEdgeContextMenu,
            onMouseEnter: onEdgeMouseEnter,
            onMouseMove: onEdgeMouseMove,
            onMouseLeave: onEdgeMouseLeave,
            onClick: onEdgeClick,
            reconnectRadius,
            onDoubleClick: onEdgeDoubleClick,
            onReconnectStart,
            onReconnectEnd,
            rfId,
            onError,
            edgeTypes,
            disableKeyboardA11y
          }, id2);
        })
      ]
    });
  }
  EdgeRendererComponent.displayName = "EdgeRenderer";
  const EdgeRenderer = reactExports.memo(EdgeRendererComponent);
  const selector$9 = (s) => `translate(${s.transform[0]}px,${s.transform[1]}px) scale(${s.transform[2]})`;
  function Viewport({ children: children2 }) {
    const transform2 = useStore(selector$9);
    return jsxRuntimeExports.jsx("div", {
      className: "react-flow__viewport xyflow__viewport react-flow__container",
      style: {
        transform: transform2
      },
      children: children2
    });
  }
  function useOnInitHandler(onInit) {
    const rfInstance = useReactFlow();
    const isInitialized = reactExports.useRef(false);
    reactExports.useEffect(() => {
      if (!isInitialized.current && rfInstance.viewportInitialized && onInit) {
        setTimeout(() => onInit(rfInstance), 1);
        isInitialized.current = true;
      }
    }, [
      onInit,
      rfInstance.viewportInitialized
    ]);
  }
  const selector$8 = (state) => {
    var _a;
    return (_a = state.panZoom) == null ? void 0 : _a.syncViewport;
  };
  function useViewportSync(viewport) {
    const syncViewport = useStore(selector$8);
    const store = useStoreApi();
    reactExports.useEffect(() => {
      if (viewport) {
        syncViewport == null ? void 0 : syncViewport(viewport);
        store.setState({
          transform: [
            viewport.x,
            viewport.y,
            viewport.zoom
          ]
        });
      }
    }, [
      viewport,
      syncViewport
    ]);
    return null;
  }
  function storeSelector$1(s) {
    return s.connection.inProgress ? {
      ...s.connection,
      to: pointToRendererPoint(s.connection.to, s.transform)
    } : {
      ...s.connection
    };
  }
  function getSelector(connectionSelector) {
    return storeSelector$1;
  }
  function useConnection(connectionSelector) {
    const combinedSelector = getSelector();
    return useStore(combinedSelector, shallow$1);
  }
  const selector$7 = (s) => ({
    nodesConnectable: s.nodesConnectable,
    isValid: s.connection.isValid,
    inProgress: s.connection.inProgress,
    width: s.width,
    height: s.height
  });
  function ConnectionLineWrapper({ containerStyle: containerStyle2, style: style2, type, component }) {
    const { nodesConnectable, width, height, isValid, inProgress } = useStore(selector$7, shallow$1);
    const renderConnection = !!(width && nodesConnectable && inProgress);
    if (!renderConnection) {
      return null;
    }
    return jsxRuntimeExports.jsx("svg", {
      style: containerStyle2,
      width,
      height,
      className: "react-flow__connectionline react-flow__container",
      children: jsxRuntimeExports.jsx("g", {
        className: cc([
          "react-flow__connection",
          getConnectionStatus(isValid)
        ]),
        children: jsxRuntimeExports.jsx(ConnectionLine, {
          style: style2,
          type,
          CustomComponent: component,
          isValid
        })
      })
    });
  }
  const ConnectionLine = ({ style: style2, type = ConnectionLineType.Bezier, CustomComponent, isValid }) => {
    const { inProgress, from, fromNode, fromHandle, fromPosition, to, toNode, toHandle, toPosition } = useConnection();
    if (!inProgress) {
      return;
    }
    if (CustomComponent) {
      return jsxRuntimeExports.jsx(CustomComponent, {
        connectionLineType: type,
        connectionLineStyle: style2,
        fromNode,
        fromHandle,
        fromX: from.x,
        fromY: from.y,
        toX: to.x,
        toY: to.y,
        fromPosition,
        toPosition,
        connectionStatus: getConnectionStatus(isValid),
        toNode,
        toHandle
      });
    }
    let path = "";
    const pathParams = {
      sourceX: from.x,
      sourceY: from.y,
      sourcePosition: fromPosition,
      targetX: to.x,
      targetY: to.y,
      targetPosition: toPosition
    };
    switch (type) {
      case ConnectionLineType.Bezier:
        [path] = getBezierPath(pathParams);
        break;
      case ConnectionLineType.SimpleBezier:
        [path] = getSimpleBezierPath(pathParams);
        break;
      case ConnectionLineType.Step:
        [path] = getSmoothStepPath({
          ...pathParams,
          borderRadius: 0
        });
        break;
      case ConnectionLineType.SmoothStep:
        [path] = getSmoothStepPath(pathParams);
        break;
      default:
        [path] = getStraightPath(pathParams);
    }
    return jsxRuntimeExports.jsx("path", {
      d: path,
      fill: "none",
      className: "react-flow__connection-path",
      style: style2
    });
  };
  ConnectionLine.displayName = "ConnectionLine";
  const emptyTypes = {};
  function useNodeOrEdgeTypesWarning(nodeOrEdgeTypes = emptyTypes) {
    reactExports.useRef(nodeOrEdgeTypes);
    useStoreApi();
    reactExports.useEffect(() => {
    }, [
      nodeOrEdgeTypes
    ]);
  }
  function useStylesLoadedWarning() {
    useStoreApi();
    reactExports.useRef(false);
    reactExports.useEffect(() => {
    }, []);
  }
  function GraphViewComponent({ nodeTypes, edgeTypes, onInit, onNodeClick, onEdgeClick, onNodeDoubleClick, onEdgeDoubleClick, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onSelectionContextMenu, onSelectionStart, onSelectionEnd, connectionLineType, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, selectionKeyCode, selectionOnDrag, selectionMode, multiSelectionKeyCode, panActivationKeyCode, zoomActivationKeyCode, deleteKeyCode, onlyRenderVisibleElements, elementsSelectable, defaultViewport: defaultViewport2, translateExtent, minZoom, maxZoom, preventScrolling, defaultMarkerColor, zoomOnScroll, zoomOnPinch, panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, panOnDrag, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, paneClickDistance, nodeClickDistance, onEdgeContextMenu, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, reconnectRadius, onReconnect, onReconnectStart, onReconnectEnd, noDragClassName, noWheelClassName, noPanClassName, disableKeyboardA11y, nodeExtent, rfId, viewport, onViewportChange }) {
    useNodeOrEdgeTypesWarning(nodeTypes);
    useNodeOrEdgeTypesWarning(edgeTypes);
    useStylesLoadedWarning();
    useOnInitHandler(onInit);
    useViewportSync(viewport);
    return jsxRuntimeExports.jsx(FlowRenderer, {
      onPaneClick,
      onPaneMouseEnter,
      onPaneMouseMove,
      onPaneMouseLeave,
      onPaneContextMenu,
      onPaneScroll,
      paneClickDistance,
      deleteKeyCode,
      selectionKeyCode,
      selectionOnDrag,
      selectionMode,
      onSelectionStart,
      onSelectionEnd,
      multiSelectionKeyCode,
      panActivationKeyCode,
      zoomActivationKeyCode,
      elementsSelectable,
      zoomOnScroll,
      zoomOnPinch,
      zoomOnDoubleClick,
      panOnScroll,
      panOnScrollSpeed,
      panOnScrollMode,
      panOnDrag,
      defaultViewport: defaultViewport2,
      translateExtent,
      minZoom,
      maxZoom,
      onSelectionContextMenu,
      preventScrolling,
      noDragClassName,
      noWheelClassName,
      noPanClassName,
      disableKeyboardA11y,
      onViewportChange,
      isControlledViewport: !!viewport,
      children: jsxRuntimeExports.jsxs(Viewport, {
        children: [
          jsxRuntimeExports.jsx(EdgeRenderer, {
            edgeTypes,
            onEdgeClick,
            onEdgeDoubleClick,
            onReconnect,
            onReconnectStart,
            onReconnectEnd,
            onlyRenderVisibleElements,
            onEdgeContextMenu,
            onEdgeMouseEnter,
            onEdgeMouseMove,
            onEdgeMouseLeave,
            reconnectRadius,
            defaultMarkerColor,
            noPanClassName,
            disableKeyboardA11y,
            rfId
          }),
          jsxRuntimeExports.jsx(ConnectionLineWrapper, {
            style: connectionLineStyle,
            type: connectionLineType,
            component: connectionLineComponent,
            containerStyle: connectionLineContainerStyle
          }),
          jsxRuntimeExports.jsx("div", {
            className: "react-flow__edgelabel-renderer"
          }),
          jsxRuntimeExports.jsx(NodeRenderer, {
            nodeTypes,
            onNodeClick,
            onNodeDoubleClick,
            onNodeMouseEnter,
            onNodeMouseMove,
            onNodeMouseLeave,
            onNodeContextMenu,
            nodeClickDistance,
            onlyRenderVisibleElements,
            noPanClassName,
            noDragClassName,
            disableKeyboardA11y,
            nodeExtent,
            rfId
          }),
          jsxRuntimeExports.jsx("div", {
            className: "react-flow__viewport-portal"
          })
        ]
      })
    });
  }
  GraphViewComponent.displayName = "GraphView";
  const GraphView = reactExports.memo(GraphViewComponent);
  const getInitialState = ({ nodes, edges, defaultNodes, defaultEdges, width, height, fitView: fitView2, nodeOrigin, nodeExtent } = {}) => {
    const nodeLookup = /* @__PURE__ */ new Map();
    const parentLookup = /* @__PURE__ */ new Map();
    const connectionLookup = /* @__PURE__ */ new Map();
    const edgeLookup = /* @__PURE__ */ new Map();
    const storeEdges = defaultEdges ?? edges ?? [];
    const storeNodes = defaultNodes ?? nodes ?? [];
    const storeNodeOrigin = nodeOrigin ?? [
      0,
      0
    ];
    const storeNodeExtent = nodeExtent ?? infiniteExtent;
    updateConnectionLookup(connectionLookup, edgeLookup, storeEdges);
    adoptUserNodes(storeNodes, nodeLookup, parentLookup, {
      nodeOrigin: storeNodeOrigin,
      nodeExtent: storeNodeExtent,
      elevateNodesOnSelect: false
    });
    let transform2 = [
      0,
      0,
      1
    ];
    if (fitView2 && width && height) {
      const bounds = getInternalNodesBounds(nodeLookup, {
        filter: (node) => !!((node.width || node.initialWidth) && (node.height || node.initialHeight))
      });
      const { x, y, zoom: zoom2 } = getViewportForBounds(bounds, width, height, 0.5, 2, 0.1);
      transform2 = [
        x,
        y,
        zoom2
      ];
    }
    return {
      rfId: "1",
      width: 0,
      height: 0,
      transform: transform2,
      nodes: storeNodes,
      nodeLookup,
      parentLookup,
      edges: storeEdges,
      edgeLookup,
      connectionLookup,
      onNodesChange: null,
      onEdgesChange: null,
      hasDefaultNodes: defaultNodes !== void 0,
      hasDefaultEdges: defaultEdges !== void 0,
      panZoom: null,
      minZoom: 0.5,
      maxZoom: 2,
      translateExtent: infiniteExtent,
      nodeExtent: storeNodeExtent,
      nodesSelectionActive: false,
      userSelectionActive: false,
      userSelectionRect: null,
      connectionMode: ConnectionMode.Strict,
      domNode: null,
      paneDragging: false,
      noPanClassName: "nopan",
      nodeOrigin: storeNodeOrigin,
      nodeDragThreshold: 1,
      snapGrid: [
        15,
        15
      ],
      snapToGrid: false,
      nodesDraggable: true,
      nodesConnectable: true,
      nodesFocusable: true,
      edgesFocusable: true,
      edgesReconnectable: true,
      elementsSelectable: true,
      elevateNodesOnSelect: true,
      elevateEdgesOnSelect: false,
      fitViewOnInit: false,
      fitViewDone: false,
      fitViewOnInitOptions: void 0,
      selectNodesOnDrag: true,
      multiSelectionActive: false,
      connection: {
        ...initialConnection
      },
      connectionClickStartHandle: null,
      connectOnClick: true,
      ariaLiveMessage: "",
      autoPanOnConnect: true,
      autoPanOnNodeDrag: true,
      autoPanSpeed: 15,
      connectionRadius: 20,
      onError: devWarn,
      isValidConnection: void 0,
      onSelectionChangeHandlers: [],
      lib: "react",
      debug: false
    };
  };
  const createStore = ({ nodes, edges, defaultNodes, defaultEdges, width, height, fitView: fitView$1, nodeOrigin, nodeExtent }) => createWithEqualityFn((set2, get2) => ({
    ...getInitialState({
      nodes,
      edges,
      width,
      height,
      fitView: fitView$1,
      nodeOrigin,
      nodeExtent,
      defaultNodes,
      defaultEdges
    }),
    setNodes: (nodes2) => {
      const { nodeLookup, parentLookup, nodeOrigin: nodeOrigin2, elevateNodesOnSelect } = get2();
      adoptUserNodes(nodes2, nodeLookup, parentLookup, {
        nodeOrigin: nodeOrigin2,
        nodeExtent,
        elevateNodesOnSelect,
        checkEquality: true
      });
      set2({
        nodes: nodes2
      });
    },
    setEdges: (edges2) => {
      const { connectionLookup, edgeLookup } = get2();
      updateConnectionLookup(connectionLookup, edgeLookup, edges2);
      set2({
        edges: edges2
      });
    },
    setDefaultNodesAndEdges: (nodes2, edges2) => {
      if (nodes2) {
        const { setNodes } = get2();
        setNodes(nodes2);
        set2({
          hasDefaultNodes: true
        });
      }
      if (edges2) {
        const { setEdges } = get2();
        setEdges(edges2);
        set2({
          hasDefaultEdges: true
        });
      }
    },
    updateNodeInternals: (updates, params = {
      triggerFitView: true
    }) => {
      const { triggerNodeChanges, nodeLookup, parentLookup, fitViewOnInit, fitViewDone, fitViewOnInitOptions, domNode, nodeOrigin: nodeOrigin2, nodeExtent: nodeExtent2, debug, fitViewSync } = get2();
      const { changes, updatedInternals } = updateNodeInternals(updates, nodeLookup, parentLookup, domNode, nodeOrigin2, nodeExtent2);
      if (!updatedInternals) {
        return;
      }
      updateAbsolutePositions(nodeLookup, parentLookup, {
        nodeOrigin: nodeOrigin2,
        nodeExtent: nodeExtent2
      });
      if (params.triggerFitView) {
        let nextFitViewDone = fitViewDone;
        if (!fitViewDone && fitViewOnInit) {
          nextFitViewDone = fitViewSync({
            ...fitViewOnInitOptions,
            nodes: fitViewOnInitOptions == null ? void 0 : fitViewOnInitOptions.nodes
          });
        }
        set2({
          fitViewDone: nextFitViewDone
        });
      } else {
        set2({});
      }
      if ((changes == null ? void 0 : changes.length) > 0) {
        if (debug) {
          console.log("React Flow: trigger node changes", changes);
        }
        triggerNodeChanges == null ? void 0 : triggerNodeChanges(changes);
      }
    },
    updateNodePositions: (nodeDragItems, dragging = false) => {
      const parentExpandChildren = [];
      const changes = [];
      for (const [id2, dragItem] of nodeDragItems) {
        const change = {
          id: id2,
          type: "position",
          position: dragItem.position,
          dragging
        };
        if ((dragItem == null ? void 0 : dragItem.expandParent) && (dragItem == null ? void 0 : dragItem.parentId) && change.position) {
          parentExpandChildren.push({
            id: id2,
            parentId: dragItem.parentId,
            rect: {
              ...dragItem.internals.positionAbsolute,
              width: dragItem.measured.width,
              height: dragItem.measured.height
            }
          });
          change.position.x = Math.max(0, change.position.x);
          change.position.y = Math.max(0, change.position.y);
        }
        changes.push(change);
      }
      if (parentExpandChildren.length > 0) {
        const { nodeLookup, parentLookup, nodeOrigin: nodeOrigin2 } = get2();
        const parentExpandChanges = handleExpandParent(parentExpandChildren, nodeLookup, parentLookup, nodeOrigin2);
        changes.push(...parentExpandChanges);
      }
      get2().triggerNodeChanges(changes);
    },
    triggerNodeChanges: (changes) => {
      const { onNodesChange, setNodes, nodes: nodes2, hasDefaultNodes, debug } = get2();
      if (changes == null ? void 0 : changes.length) {
        if (hasDefaultNodes) {
          const updatedNodes = applyNodeChanges(changes, nodes2);
          setNodes(updatedNodes);
        }
        if (debug) {
          console.log("React Flow: trigger node changes", changes);
        }
        onNodesChange == null ? void 0 : onNodesChange(changes);
      }
    },
    triggerEdgeChanges: (changes) => {
      const { onEdgesChange, setEdges, edges: edges2, hasDefaultEdges, debug } = get2();
      if (changes == null ? void 0 : changes.length) {
        if (hasDefaultEdges) {
          const updatedEdges = applyEdgeChanges(changes, edges2);
          setEdges(updatedEdges);
        }
        if (debug) {
          console.log("React Flow: trigger edge changes", changes);
        }
        onEdgesChange == null ? void 0 : onEdgesChange(changes);
      }
    },
    addSelectedNodes: (selectedNodeIds) => {
      const { multiSelectionActive, edgeLookup, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get2();
      if (multiSelectionActive) {
        const nodeChanges = selectedNodeIds.map((nodeId) => createSelectionChange(nodeId, true));
        triggerNodeChanges(nodeChanges);
        return;
      }
      triggerNodeChanges(getSelectionChanges(nodeLookup, /* @__PURE__ */ new Set([
        ...selectedNodeIds
      ]), true));
      triggerEdgeChanges(getSelectionChanges(edgeLookup));
    },
    addSelectedEdges: (selectedEdgeIds) => {
      const { multiSelectionActive, edgeLookup, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get2();
      if (multiSelectionActive) {
        const changedEdges = selectedEdgeIds.map((edgeId) => createSelectionChange(edgeId, true));
        triggerEdgeChanges(changedEdges);
        return;
      }
      triggerEdgeChanges(getSelectionChanges(edgeLookup, /* @__PURE__ */ new Set([
        ...selectedEdgeIds
      ])));
      triggerNodeChanges(getSelectionChanges(nodeLookup, /* @__PURE__ */ new Set(), true));
    },
    unselectNodesAndEdges: ({ nodes: nodes2, edges: edges2 } = {}) => {
      const { edges: storeEdges, nodes: storeNodes, nodeLookup, triggerNodeChanges, triggerEdgeChanges } = get2();
      const nodesToUnselect = nodes2 ? nodes2 : storeNodes;
      const edgesToUnselect = edges2 ? edges2 : storeEdges;
      const nodeChanges = nodesToUnselect.map((n2) => {
        const internalNode = nodeLookup.get(n2.id);
        if (internalNode) {
          internalNode.selected = false;
        }
        return createSelectionChange(n2.id, false);
      });
      const edgeChanges = edgesToUnselect.map((edge) => createSelectionChange(edge.id, false));
      triggerNodeChanges(nodeChanges);
      triggerEdgeChanges(edgeChanges);
    },
    setMinZoom: (minZoom) => {
      const { panZoom, maxZoom } = get2();
      panZoom == null ? void 0 : panZoom.setScaleExtent([
        minZoom,
        maxZoom
      ]);
      set2({
        minZoom
      });
    },
    setMaxZoom: (maxZoom) => {
      const { panZoom, minZoom } = get2();
      panZoom == null ? void 0 : panZoom.setScaleExtent([
        minZoom,
        maxZoom
      ]);
      set2({
        maxZoom
      });
    },
    setTranslateExtent: (translateExtent) => {
      var _a;
      (_a = get2().panZoom) == null ? void 0 : _a.setTranslateExtent(translateExtent);
      set2({
        translateExtent
      });
    },
    setPaneClickDistance: (clickDistance) => {
      var _a;
      (_a = get2().panZoom) == null ? void 0 : _a.setClickDistance(clickDistance);
    },
    resetSelectedElements: () => {
      const { edges: edges2, nodes: nodes2, triggerNodeChanges, triggerEdgeChanges } = get2();
      const nodeChanges = nodes2.reduce((res, node) => node.selected ? [
        ...res,
        createSelectionChange(node.id, false)
      ] : res, []);
      const edgeChanges = edges2.reduce((res, edge) => edge.selected ? [
        ...res,
        createSelectionChange(edge.id, false)
      ] : res, []);
      triggerNodeChanges(nodeChanges);
      triggerEdgeChanges(edgeChanges);
    },
    setNodeExtent: (nextNodeExtent) => {
      const { nodes: nodes2, nodeLookup, parentLookup, nodeOrigin: nodeOrigin2, elevateNodesOnSelect, nodeExtent: nodeExtent2 } = get2();
      if (nextNodeExtent[0][0] === nodeExtent2[0][0] && nextNodeExtent[0][1] === nodeExtent2[0][1] && nextNodeExtent[1][0] === nodeExtent2[1][0] && nextNodeExtent[1][1] === nodeExtent2[1][1]) {
        return;
      }
      adoptUserNodes(nodes2, nodeLookup, parentLookup, {
        nodeOrigin: nodeOrigin2,
        nodeExtent: nextNodeExtent,
        elevateNodesOnSelect,
        checkEquality: false
      });
      set2({
        nodeExtent: nextNodeExtent
      });
    },
    panBy: (delta) => {
      const { transform: transform2, width: width2, height: height2, panZoom, translateExtent } = get2();
      return panBy({
        delta,
        panZoom,
        transform: transform2,
        translateExtent,
        width: width2,
        height: height2
      });
    },
    fitView: (options) => {
      const { panZoom, width: width2, height: height2, minZoom, maxZoom, nodeLookup } = get2();
      if (!panZoom) {
        return Promise.resolve(false);
      }
      const fitViewNodes = getFitViewNodes(nodeLookup, options);
      return fitView({
        nodes: fitViewNodes,
        width: width2,
        height: height2,
        panZoom,
        minZoom,
        maxZoom
      }, options);
    },
    fitViewSync: (options) => {
      const { panZoom, width: width2, height: height2, minZoom, maxZoom, nodeLookup } = get2();
      if (!panZoom) {
        return false;
      }
      const fitViewNodes = getFitViewNodes(nodeLookup, options);
      fitView({
        nodes: fitViewNodes,
        width: width2,
        height: height2,
        panZoom,
        minZoom,
        maxZoom
      }, options);
      return fitViewNodes.size > 0;
    },
    cancelConnection: () => {
      set2({
        connection: {
          ...initialConnection
        }
      });
    },
    updateConnection: (connection) => {
      set2({
        connection
      });
    },
    reset: () => set2({
      ...getInitialState()
    })
  }), Object.is);
  function ReactFlowProvider({ initialNodes: nodes, initialEdges: edges, defaultNodes, defaultEdges, initialWidth: width, initialHeight: height, fitView: fitView2, nodeOrigin, nodeExtent, children: children2 }) {
    const [store] = reactExports.useState(() => createStore({
      nodes,
      edges,
      defaultNodes,
      defaultEdges,
      width,
      height,
      fitView: fitView2,
      nodeOrigin,
      nodeExtent
    }));
    return jsxRuntimeExports.jsx(Provider$1, {
      value: store,
      children: jsxRuntimeExports.jsx(BatchProvider, {
        children: children2
      })
    });
  }
  function Wrapper({ children: children2, nodes, edges, defaultNodes, defaultEdges, width, height, fitView: fitView2, nodeOrigin, nodeExtent }) {
    const isWrapped = reactExports.useContext(StoreContext);
    if (isWrapped) {
      return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
        children: children2
      });
    }
    return jsxRuntimeExports.jsx(ReactFlowProvider, {
      initialNodes: nodes,
      initialEdges: edges,
      defaultNodes,
      defaultEdges,
      initialWidth: width,
      initialHeight: height,
      fitView: fitView2,
      nodeOrigin,
      nodeExtent,
      children: children2
    });
  }
  const wrapperStyle = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    zIndex: 0
  };
  function ReactFlow({ nodes, edges, defaultNodes, defaultEdges, className, nodeTypes, edgeTypes, onNodeClick, onEdgeClick, onInit, onMove, onMoveStart, onMoveEnd, onConnect, onConnectStart, onConnectEnd, onClickConnectStart, onClickConnectEnd, onNodeMouseEnter, onNodeMouseMove, onNodeMouseLeave, onNodeContextMenu, onNodeDoubleClick, onNodeDragStart, onNodeDrag, onNodeDragStop, onNodesDelete, onEdgesDelete, onDelete, onSelectionChange, onSelectionDragStart, onSelectionDrag, onSelectionDragStop, onSelectionContextMenu, onSelectionStart, onSelectionEnd, onBeforeDelete, connectionMode, connectionLineType = ConnectionLineType.Bezier, connectionLineStyle, connectionLineComponent, connectionLineContainerStyle, deleteKeyCode = "Backspace", selectionKeyCode = "Shift", selectionOnDrag = false, selectionMode = SelectionMode.Full, panActivationKeyCode = "Space", multiSelectionKeyCode = isMacOs() ? "Meta" : "Control", zoomActivationKeyCode = isMacOs() ? "Meta" : "Control", snapToGrid, snapGrid, onlyRenderVisibleElements = false, selectNodesOnDrag, nodesDraggable, nodesConnectable, nodesFocusable, nodeOrigin = defaultNodeOrigin, edgesFocusable, edgesReconnectable, elementsSelectable = true, defaultViewport: defaultViewport$1 = defaultViewport, minZoom = 0.5, maxZoom = 2, translateExtent = infiniteExtent, preventScrolling = true, nodeExtent, defaultMarkerColor = "#b1b1b7", zoomOnScroll = true, zoomOnPinch = true, panOnScroll = false, panOnScrollSpeed = 0.5, panOnScrollMode = PanOnScrollMode.Free, zoomOnDoubleClick = true, panOnDrag = true, onPaneClick, onPaneMouseEnter, onPaneMouseMove, onPaneMouseLeave, onPaneScroll, onPaneContextMenu, paneClickDistance = 0, nodeClickDistance = 0, children: children2, onReconnect, onReconnectStart, onReconnectEnd, onEdgeContextMenu, onEdgeDoubleClick, onEdgeMouseEnter, onEdgeMouseMove, onEdgeMouseLeave, reconnectRadius = 10, onNodesChange, onEdgesChange, noDragClassName = "nodrag", noWheelClassName = "nowheel", noPanClassName = "nopan", fitView: fitView2, fitViewOptions, connectOnClick, attributionPosition, proOptions, defaultEdgeOptions, elevateNodesOnSelect, elevateEdgesOnSelect, disableKeyboardA11y = false, autoPanOnConnect, autoPanOnNodeDrag, autoPanSpeed, connectionRadius, isValidConnection, onError, style: style2, id: id2, nodeDragThreshold, viewport, onViewportChange, width, height, colorMode = "light", debug, ...rest }, ref) {
    const rfId = id2 || "1";
    const colorModeClassName = useColorModeClass(colorMode);
    return jsxRuntimeExports.jsx("div", {
      ...rest,
      style: {
        ...style2,
        ...wrapperStyle
      },
      ref,
      className: cc([
        "react-flow",
        className,
        colorModeClassName
      ]),
      "data-testid": "rf__wrapper",
      id: id2,
      children: jsxRuntimeExports.jsxs(Wrapper, {
        nodes,
        edges,
        width,
        height,
        fitView: fitView2,
        nodeOrigin,
        nodeExtent,
        children: [
          jsxRuntimeExports.jsx(GraphView, {
            onInit,
            onNodeClick,
            onEdgeClick,
            onNodeMouseEnter,
            onNodeMouseMove,
            onNodeMouseLeave,
            onNodeContextMenu,
            onNodeDoubleClick,
            nodeTypes,
            edgeTypes,
            connectionLineType,
            connectionLineStyle,
            connectionLineComponent,
            connectionLineContainerStyle,
            selectionKeyCode,
            selectionOnDrag,
            selectionMode,
            deleteKeyCode,
            multiSelectionKeyCode,
            panActivationKeyCode,
            zoomActivationKeyCode,
            onlyRenderVisibleElements,
            defaultViewport: defaultViewport$1,
            translateExtent,
            minZoom,
            maxZoom,
            preventScrolling,
            zoomOnScroll,
            zoomOnPinch,
            zoomOnDoubleClick,
            panOnScroll,
            panOnScrollSpeed,
            panOnScrollMode,
            panOnDrag,
            onPaneClick,
            onPaneMouseEnter,
            onPaneMouseMove,
            onPaneMouseLeave,
            onPaneScroll,
            onPaneContextMenu,
            paneClickDistance,
            nodeClickDistance,
            onSelectionContextMenu,
            onSelectionStart,
            onSelectionEnd,
            onReconnect,
            onReconnectStart,
            onReconnectEnd,
            onEdgeContextMenu,
            onEdgeDoubleClick,
            onEdgeMouseEnter,
            onEdgeMouseMove,
            onEdgeMouseLeave,
            reconnectRadius,
            defaultMarkerColor,
            noDragClassName,
            noWheelClassName,
            noPanClassName,
            rfId,
            disableKeyboardA11y,
            nodeExtent,
            viewport,
            onViewportChange
          }),
          jsxRuntimeExports.jsx(StoreUpdater, {
            nodes,
            edges,
            defaultNodes,
            defaultEdges,
            onConnect,
            onConnectStart,
            onConnectEnd,
            onClickConnectStart,
            onClickConnectEnd,
            nodesDraggable,
            nodesConnectable,
            nodesFocusable,
            edgesFocusable,
            edgesReconnectable,
            elementsSelectable,
            elevateNodesOnSelect,
            elevateEdgesOnSelect,
            minZoom,
            maxZoom,
            nodeExtent,
            onNodesChange,
            onEdgesChange,
            snapToGrid,
            snapGrid,
            connectionMode,
            translateExtent,
            connectOnClick,
            defaultEdgeOptions,
            fitView: fitView2,
            fitViewOptions,
            onNodesDelete,
            onEdgesDelete,
            onDelete,
            onNodeDragStart,
            onNodeDrag,
            onNodeDragStop,
            onSelectionDrag,
            onSelectionDragStart,
            onSelectionDragStop,
            onMove,
            onMoveStart,
            onMoveEnd,
            noPanClassName,
            nodeOrigin,
            rfId,
            autoPanOnConnect,
            autoPanOnNodeDrag,
            autoPanSpeed,
            onError,
            connectionRadius,
            isValidConnection,
            selectNodesOnDrag,
            nodeDragThreshold,
            onBeforeDelete,
            paneClickDistance,
            debug
          }),
          jsxRuntimeExports.jsx(SelectionListener, {
            onSelectionChange
          }),
          children2,
          jsxRuntimeExports.jsx(Attribution, {
            proOptions,
            position: attributionPosition
          }),
          jsxRuntimeExports.jsx(A11yDescriptions, {
            rfId,
            disableKeyboardA11y
          })
        ]
      })
    });
  }
  index = fixedForwardRef(ReactFlow);
  const selector$5 = (s) => {
    var _a;
    return (_a = s.domNode) == null ? void 0 : _a.querySelector(".react-flow__viewport-portal");
  };
  ViewportPortal = function({ children: children2 }) {
    const viewPortalDiv = useStore(selector$5);
    if (!viewPortalDiv) {
      return null;
    }
    return reactDomExports.createPortal(children2, viewPortalDiv);
  };
  const nodesSelector = (state) => state.nodes;
  useNodes = function() {
    const nodes = useStore(nodesSelector, shallow$1);
    return nodes;
  };
  useHandleConnections = function({ type, id: id2 = null, nodeId, onConnect, onDisconnect }) {
    const _nodeId = useNodeId();
    const currentNodeId = nodeId ?? _nodeId;
    const prevConnections = reactExports.useRef(null);
    const connections = useStore((state) => state.connectionLookup.get(`${currentNodeId}-${type}-${id2}`), areConnectionMapsEqual);
    reactExports.useEffect(() => {
      if (prevConnections.current && prevConnections.current !== connections) {
        const _connections = connections ?? /* @__PURE__ */ new Map();
        handleConnectionChange(prevConnections.current, _connections, onDisconnect);
        handleConnectionChange(_connections, prevConnections.current, onConnect);
      }
      prevConnections.current = connections ?? /* @__PURE__ */ new Map();
    }, [
      connections,
      onConnect,
      onDisconnect
    ]);
    return reactExports.useMemo(() => Array.from((connections == null ? void 0 : connections.values()) ?? []), [
      connections
    ]);
  };
  useInternalNode = function(id2) {
    const node = useStore(reactExports.useCallback((s) => s.nodeLookup.get(id2), [
      id2
    ]), shallow$1);
    return node;
  };
  function LinePattern({ dimensions, lineWidth, variant, className }) {
    return jsxRuntimeExports.jsx("path", {
      strokeWidth: lineWidth,
      d: `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`,
      className: cc([
        "react-flow__background-pattern",
        variant,
        className
      ])
    });
  }
  function DotPattern({ radius, className }) {
    return jsxRuntimeExports.jsx("circle", {
      cx: radius,
      cy: radius,
      r: radius,
      className: cc([
        "react-flow__background-pattern",
        "dots",
        className
      ])
    });
  }
  (function(BackgroundVariant2) {
    BackgroundVariant2["Lines"] = "lines";
    BackgroundVariant2["Dots"] = "dots";
    BackgroundVariant2["Cross"] = "cross";
  })(BackgroundVariant || (BackgroundVariant = {}));
  const defaultSize = {
    [BackgroundVariant.Dots]: 1,
    [BackgroundVariant.Lines]: 1,
    [BackgroundVariant.Cross]: 6
  };
  const selector$3 = (s) => ({
    transform: s.transform,
    patternId: `pattern-${s.rfId}`
  });
  function BackgroundComponent({ id: id2, variant = BackgroundVariant.Dots, gap = 20, size, lineWidth = 1, offset = 0, color: color2, bgColor, style: style2, className, patternClassName }) {
    const ref = reactExports.useRef(null);
    const { transform: transform2, patternId } = useStore(selector$3, shallow$1);
    const patternSize = size || defaultSize[variant];
    const isDots = variant === BackgroundVariant.Dots;
    const isCross = variant === BackgroundVariant.Cross;
    const gapXY = Array.isArray(gap) ? gap : [
      gap,
      gap
    ];
    const scaledGap = [
      gapXY[0] * transform2[2] || 1,
      gapXY[1] * transform2[2] || 1
    ];
    const scaledSize = patternSize * transform2[2];
    const offsetXY = Array.isArray(offset) ? offset : [
      offset,
      offset
    ];
    const patternDimensions = isCross ? [
      scaledSize,
      scaledSize
    ] : scaledGap;
    const scaledOffset = [
      offsetXY[0] * transform2[2] || 1 + patternDimensions[0] / 2,
      offsetXY[1] * transform2[2] || 1 + patternDimensions[1] / 2
    ];
    const _patternId = `${patternId}${id2 ? id2 : ""}`;
    return jsxRuntimeExports.jsxs("svg", {
      className: cc([
        "react-flow__background",
        className
      ]),
      style: {
        ...style2,
        ...containerStyle,
        "--xy-background-color-props": bgColor,
        "--xy-background-pattern-color-props": color2
      },
      ref,
      "data-testid": "rf__background",
      children: [
        jsxRuntimeExports.jsx("pattern", {
          id: _patternId,
          x: transform2[0] % scaledGap[0],
          y: transform2[1] % scaledGap[1],
          width: scaledGap[0],
          height: scaledGap[1],
          patternUnits: "userSpaceOnUse",
          patternTransform: `translate(-${scaledOffset[0]},-${scaledOffset[1]})`,
          children: isDots ? jsxRuntimeExports.jsx(DotPattern, {
            radius: scaledSize / 2,
            className: patternClassName
          }) : jsxRuntimeExports.jsx(LinePattern, {
            dimensions: patternDimensions,
            lineWidth,
            variant,
            className: patternClassName
          })
        }),
        jsxRuntimeExports.jsx("rect", {
          x: "0",
          y: "0",
          width: "100%",
          height: "100%",
          fill: `url(#${_patternId})`
        })
      ]
    });
  }
  BackgroundComponent.displayName = "Background";
  Background = reactExports.memo(BackgroundComponent);
  function PlusIcon() {
    return jsxRuntimeExports.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      children: jsxRuntimeExports.jsx("path", {
        d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"
      })
    });
  }
  function MinusIcon() {
    return jsxRuntimeExports.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 5",
      children: jsxRuntimeExports.jsx("path", {
        d: "M0 0h32v4.2H0z"
      })
    });
  }
  function FitViewIcon() {
    return jsxRuntimeExports.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 30",
      children: jsxRuntimeExports.jsx("path", {
        d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"
      })
    });
  }
  function LockIcon() {
    return jsxRuntimeExports.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 25 32",
      children: jsxRuntimeExports.jsx("path", {
        d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"
      })
    });
  }
  function UnlockIcon() {
    return jsxRuntimeExports.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 25 32",
      children: jsxRuntimeExports.jsx("path", {
        d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"
      })
    });
  }
  function ControlButton({ children: children2, className, ...rest }) {
    return jsxRuntimeExports.jsx("button", {
      type: "button",
      className: cc([
        "react-flow__controls-button",
        className
      ]),
      ...rest,
      children: children2
    });
  }
  const selector$2 = (s) => ({
    isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
    minZoomReached: s.transform[2] <= s.minZoom,
    maxZoomReached: s.transform[2] >= s.maxZoom
  });
  function ControlsComponent({ style: style2, showZoom = true, showFitView = true, showInteractive = true, fitViewOptions, onZoomIn, onZoomOut, onFitView, onInteractiveChange, className, children: children2, position = "bottom-left", orientation = "vertical", "aria-label": ariaLabel = "React Flow controls" }) {
    const store = useStoreApi();
    const { isInteractive, minZoomReached, maxZoomReached } = useStore(selector$2, shallow$1);
    const { zoomIn, zoomOut, fitView: fitView2 } = useReactFlow();
    const onZoomInHandler = () => {
      zoomIn();
      onZoomIn == null ? void 0 : onZoomIn();
    };
    const onZoomOutHandler = () => {
      zoomOut();
      onZoomOut == null ? void 0 : onZoomOut();
    };
    const onFitViewHandler = () => {
      fitView2(fitViewOptions);
      onFitView == null ? void 0 : onFitView();
    };
    const onToggleInteractivity = () => {
      store.setState({
        nodesDraggable: !isInteractive,
        nodesConnectable: !isInteractive,
        elementsSelectable: !isInteractive
      });
      onInteractiveChange == null ? void 0 : onInteractiveChange(!isInteractive);
    };
    const orientationClass = orientation === "horizontal" ? "horizontal" : "vertical";
    return jsxRuntimeExports.jsxs(Panel, {
      className: cc([
        "react-flow__controls",
        orientationClass,
        className
      ]),
      position,
      style: style2,
      "data-testid": "rf__controls",
      "aria-label": ariaLabel,
      children: [
        showZoom && jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
          children: [
            jsxRuntimeExports.jsx(ControlButton, {
              onClick: onZoomInHandler,
              className: "react-flow__controls-zoomin",
              title: "zoom in",
              "aria-label": "zoom in",
              disabled: maxZoomReached,
              children: jsxRuntimeExports.jsx(PlusIcon, {})
            }),
            jsxRuntimeExports.jsx(ControlButton, {
              onClick: onZoomOutHandler,
              className: "react-flow__controls-zoomout",
              title: "zoom out",
              "aria-label": "zoom out",
              disabled: minZoomReached,
              children: jsxRuntimeExports.jsx(MinusIcon, {})
            })
          ]
        }),
        showFitView && jsxRuntimeExports.jsx(ControlButton, {
          className: "react-flow__controls-fitview",
          onClick: onFitViewHandler,
          title: "fit view",
          "aria-label": "fit view",
          children: jsxRuntimeExports.jsx(FitViewIcon, {})
        }),
        showInteractive && jsxRuntimeExports.jsx(ControlButton, {
          className: "react-flow__controls-interactive",
          onClick: onToggleInteractivity,
          title: "toggle interactivity",
          "aria-label": "toggle interactivity",
          children: isInteractive ? jsxRuntimeExports.jsx(UnlockIcon, {}) : jsxRuntimeExports.jsx(LockIcon, {})
        }),
        children2
      ]
    });
  }
  ControlsComponent.displayName = "Controls";
  Controls = reactExports.memo(ControlsComponent);
  function MiniMapNodeComponent({ id: id2, x, y, width, height, style: style2, color: color2, strokeColor, strokeWidth, className, borderRadius, shapeRendering, selected: selected2, onClick }) {
    const { background, backgroundColor } = style2 || {};
    const fill = color2 || background || backgroundColor;
    return jsxRuntimeExports.jsx("rect", {
      className: cc([
        "react-flow__minimap-node",
        {
          selected: selected2
        },
        className
      ]),
      x,
      y,
      rx: borderRadius,
      ry: borderRadius,
      width,
      height,
      style: {
        fill,
        stroke: strokeColor,
        strokeWidth
      },
      shapeRendering,
      onClick: onClick ? (event) => onClick(event, id2) : void 0
    });
  }
  const MiniMapNode = reactExports.memo(MiniMapNodeComponent);
  const selectorNodeIds = (s) => s.nodes.map((node) => node.id);
  const getAttrFunction = (func) => func instanceof Function ? func : () => func;
  function MiniMapNodes({ nodeStrokeColor, nodeColor, nodeClassName = "", nodeBorderRadius = 5, nodeStrokeWidth, nodeComponent: NodeComponent = MiniMapNode, onClick }) {
    const nodeIds = useStore(selectorNodeIds, shallow$1);
    const nodeColorFunc = getAttrFunction(nodeColor);
    const nodeStrokeColorFunc = getAttrFunction(nodeStrokeColor);
    const nodeClassNameFunc = getAttrFunction(nodeClassName);
    const shapeRendering = typeof window === "undefined" || !!window.chrome ? "crispEdges" : "geometricPrecision";
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
      children: nodeIds.map((nodeId) => jsxRuntimeExports.jsx(NodeComponentWrapper, {
        id: nodeId,
        nodeColorFunc,
        nodeStrokeColorFunc,
        nodeClassNameFunc,
        nodeBorderRadius,
        nodeStrokeWidth,
        NodeComponent,
        onClick,
        shapeRendering
      }, nodeId))
    });
  }
  function NodeComponentWrapperInner({ id: id2, nodeColorFunc, nodeStrokeColorFunc, nodeClassNameFunc, nodeBorderRadius, nodeStrokeWidth, shapeRendering, NodeComponent, onClick }) {
    const { node, x, y, width, height } = useStore((s) => {
      const node2 = s.nodeLookup.get(id2);
      const { x: x2, y: y2 } = node2.internals.positionAbsolute;
      const { width: width2, height: height2 } = getNodeDimensions(node2);
      return {
        node: node2,
        x: x2,
        y: y2,
        width: width2,
        height: height2
      };
    }, shallow$1);
    if (!node || node.hidden || !nodeHasDimensions(node)) {
      return null;
    }
    return jsxRuntimeExports.jsx(NodeComponent, {
      x,
      y,
      width,
      height,
      style: node.style,
      selected: !!node.selected,
      className: nodeClassNameFunc(node),
      color: nodeColorFunc(node),
      borderRadius: nodeBorderRadius,
      strokeColor: nodeStrokeColorFunc(node),
      strokeWidth: nodeStrokeWidth,
      shapeRendering,
      onClick,
      id: node.id
    });
  }
  const NodeComponentWrapper = reactExports.memo(NodeComponentWrapperInner);
  var MiniMapNodes$1 = reactExports.memo(MiniMapNodes);
  const defaultWidth = 200;
  const defaultHeight = 150;
  const selector$1 = (s) => {
    const viewBB = {
      x: -s.transform[0] / s.transform[2],
      y: -s.transform[1] / s.transform[2],
      width: s.width / s.transform[2],
      height: s.height / s.transform[2]
    };
    return {
      viewBB,
      boundingRect: s.nodeLookup.size > 0 ? getBoundsOfRects(getInternalNodesBounds(s.nodeLookup), viewBB) : viewBB,
      rfId: s.rfId,
      panZoom: s.panZoom,
      translateExtent: s.translateExtent,
      flowWidth: s.width,
      flowHeight: s.height
    };
  };
  const ARIA_LABEL_KEY = "react-flow__minimap-desc";
  function MiniMapComponent({ style: style2, className, nodeStrokeColor, nodeColor, nodeClassName = "", nodeBorderRadius = 5, nodeStrokeWidth, nodeComponent, bgColor, maskColor, maskStrokeColor, maskStrokeWidth, position = "bottom-right", onClick, onNodeClick, pannable = false, zoomable = false, ariaLabel = "React Flow mini map", inversePan, zoomStep = 10, offsetScale = 5 }) {
    const store = useStoreApi();
    const svg = reactExports.useRef(null);
    const { boundingRect, viewBB, rfId, panZoom, translateExtent, flowWidth, flowHeight } = useStore(selector$1, shallow$1);
    const elementWidth = (style2 == null ? void 0 : style2.width) ?? defaultWidth;
    const elementHeight = (style2 == null ? void 0 : style2.height) ?? defaultHeight;
    const scaledWidth = boundingRect.width / elementWidth;
    const scaledHeight = boundingRect.height / elementHeight;
    const viewScale = Math.max(scaledWidth, scaledHeight);
    const viewWidth = viewScale * elementWidth;
    const viewHeight = viewScale * elementHeight;
    const offset = offsetScale * viewScale;
    const x = boundingRect.x - (viewWidth - boundingRect.width) / 2 - offset;
    const y = boundingRect.y - (viewHeight - boundingRect.height) / 2 - offset;
    const width = viewWidth + offset * 2;
    const height = viewHeight + offset * 2;
    const labelledBy = `${ARIA_LABEL_KEY}-${rfId}`;
    const viewScaleRef = reactExports.useRef(0);
    const minimapInstance = reactExports.useRef();
    viewScaleRef.current = viewScale;
    reactExports.useEffect(() => {
      if (svg.current && panZoom) {
        minimapInstance.current = XYMinimap({
          domNode: svg.current,
          panZoom,
          getTransform: () => store.getState().transform,
          getViewScale: () => viewScaleRef.current
        });
        return () => {
          var _a;
          (_a = minimapInstance.current) == null ? void 0 : _a.destroy();
        };
      }
    }, [
      panZoom
    ]);
    reactExports.useEffect(() => {
      var _a;
      (_a = minimapInstance.current) == null ? void 0 : _a.update({
        translateExtent,
        width: flowWidth,
        height: flowHeight,
        inversePan,
        pannable,
        zoomStep,
        zoomable
      });
    }, [
      pannable,
      zoomable,
      inversePan,
      zoomStep,
      translateExtent,
      flowWidth,
      flowHeight
    ]);
    const onSvgClick = onClick ? (event) => {
      var _a;
      const [x2, y2] = ((_a = minimapInstance.current) == null ? void 0 : _a.pointer(event)) || [
        0,
        0
      ];
      onClick(event, {
        x: x2,
        y: y2
      });
    } : void 0;
    const onSvgNodeClick = onNodeClick ? reactExports.useCallback((event, nodeId) => {
      const node = store.getState().nodeLookup.get(nodeId);
      onNodeClick(event, node);
    }, []) : void 0;
    return jsxRuntimeExports.jsx(Panel, {
      position,
      style: {
        ...style2,
        "--xy-minimap-background-color-props": typeof bgColor === "string" ? bgColor : void 0,
        "--xy-minimap-mask-background-color-props": typeof maskColor === "string" ? maskColor : void 0,
        "--xy-minimap-mask-stroke-color-props": typeof maskStrokeColor === "string" ? maskStrokeColor : void 0,
        "--xy-minimap-mask-stroke-width-props": typeof maskStrokeWidth === "number" ? maskStrokeWidth * viewScale : void 0,
        "--xy-minimap-node-background-color-props": typeof nodeColor === "string" ? nodeColor : void 0,
        "--xy-minimap-node-stroke-color-props": typeof nodeStrokeColor === "string" ? nodeStrokeColor : void 0,
        "--xy-minimap-node-stroke-width-props": typeof nodeStrokeWidth === "string" ? nodeStrokeWidth : void 0
      },
      className: cc([
        "react-flow__minimap",
        className
      ]),
      "data-testid": "rf__minimap",
      children: jsxRuntimeExports.jsxs("svg", {
        width: elementWidth,
        height: elementHeight,
        viewBox: `${x} ${y} ${width} ${height}`,
        className: "react-flow__minimap-svg",
        role: "img",
        "aria-labelledby": labelledBy,
        ref: svg,
        onClick: onSvgClick,
        children: [
          ariaLabel && jsxRuntimeExports.jsx("title", {
            id: labelledBy,
            children: ariaLabel
          }),
          jsxRuntimeExports.jsx(MiniMapNodes$1, {
            onClick: onSvgNodeClick,
            nodeColor,
            nodeStrokeColor,
            nodeBorderRadius,
            nodeClassName,
            nodeStrokeWidth,
            nodeComponent
          }),
          jsxRuntimeExports.jsx("path", {
            className: "react-flow__minimap-mask",
            d: `M${x - offset},${y - offset}h${width + offset * 2}v${height + offset * 2}h${-width - offset * 2}z
        M${viewBB.x},${viewBB.y}h${viewBB.width}v${viewBB.height}h${-viewBB.width}z`,
            fillRule: "evenodd",
            pointerEvents: "none"
          })
        ]
      })
    });
  }
  MiniMapComponent.displayName = "MiniMap";
  MiniMap = reactExports.memo(MiniMapComponent);
  function ResizeControl({ nodeId, position, variant = ResizeControlVariant.Handle, className, style: style2 = {}, children: children2, color: color2, minWidth = 10, minHeight = 10, maxWidth = Number.MAX_VALUE, maxHeight = Number.MAX_VALUE, keepAspectRatio = false, shouldResize, onResizeStart, onResize, onResizeEnd }) {
    const contextNodeId = useNodeId();
    const id2 = typeof nodeId === "string" ? nodeId : contextNodeId;
    const store = useStoreApi();
    const resizeControlRef = reactExports.useRef(null);
    const defaultPosition = variant === ResizeControlVariant.Line ? "right" : "bottom-right";
    const controlPosition = position ?? defaultPosition;
    const resizer = reactExports.useRef(null);
    reactExports.useEffect(() => {
      if (!resizeControlRef.current || !id2) {
        return;
      }
      if (!resizer.current) {
        resizer.current = XYResizer({
          domNode: resizeControlRef.current,
          nodeId: id2,
          getStoreItems: () => {
            const { nodeLookup, transform: transform2, snapGrid, snapToGrid, nodeOrigin, domNode } = store.getState();
            return {
              nodeLookup,
              transform: transform2,
              snapGrid,
              snapToGrid,
              nodeOrigin,
              paneDomNode: domNode
            };
          },
          onChange: (change, childChanges) => {
            const { triggerNodeChanges, nodeLookup, parentLookup, nodeOrigin } = store.getState();
            const changes = [];
            const nextPosition = {
              x: change.x,
              y: change.y
            };
            const node = nodeLookup.get(id2);
            if (node && node.expandParent && node.parentId) {
              const origin = node.origin ?? nodeOrigin;
              const width = change.width ?? node.measured.width;
              const height = change.height ?? node.measured.height;
              const child = {
                id: node.id,
                parentId: node.parentId,
                rect: {
                  width,
                  height,
                  ...evaluateAbsolutePosition({
                    x: change.x ?? node.position.x,
                    y: change.y ?? node.position.y
                  }, {
                    width,
                    height
                  }, node.parentId, nodeLookup, origin)
                }
              };
              const parentExpandChanges = handleExpandParent([
                child
              ], nodeLookup, parentLookup, nodeOrigin);
              changes.push(...parentExpandChanges);
              nextPosition.x = change.x ? Math.max(origin[0] * width, change.x) : void 0;
              nextPosition.y = change.y ? Math.max(origin[1] * height, change.y) : void 0;
            }
            if (nextPosition.x !== void 0 && nextPosition.y !== void 0) {
              const positionChange = {
                id: id2,
                type: "position",
                position: {
                  ...nextPosition
                }
              };
              changes.push(positionChange);
            }
            if (change.width !== void 0 && change.height !== void 0) {
              const dimensionChange = {
                id: id2,
                type: "dimensions",
                resizing: true,
                setAttributes: true,
                dimensions: {
                  width: change.width,
                  height: change.height
                }
              };
              changes.push(dimensionChange);
            }
            for (const childChange of childChanges) {
              const positionChange = {
                ...childChange,
                type: "position"
              };
              changes.push(positionChange);
            }
            triggerNodeChanges(changes);
          },
          onEnd: () => {
            const dimensionChange = {
              id: id2,
              type: "dimensions",
              resizing: false
            };
            store.getState().triggerNodeChanges([
              dimensionChange
            ]);
          }
        });
      }
      resizer.current.update({
        controlPosition,
        boundaries: {
          minWidth,
          minHeight,
          maxWidth,
          maxHeight
        },
        keepAspectRatio,
        onResizeStart,
        onResize,
        onResizeEnd,
        shouldResize
      });
      return () => {
        var _a;
        (_a = resizer.current) == null ? void 0 : _a.destroy();
      };
    }, [
      controlPosition,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      keepAspectRatio,
      onResizeStart,
      onResize,
      onResizeEnd,
      shouldResize
    ]);
    const positionClassNames = controlPosition.split("-");
    const colorStyleProp = variant === ResizeControlVariant.Line ? "borderColor" : "backgroundColor";
    const controlStyle = color2 ? {
      ...style2,
      [colorStyleProp]: color2
    } : style2;
    return jsxRuntimeExports.jsx("div", {
      className: cc([
        "react-flow__resize-control",
        "nodrag",
        ...positionClassNames,
        variant,
        className
      ]),
      ref: resizeControlRef,
      style: controlStyle,
      children: children2
    });
  }
  const NodeResizeControl = reactExports.memo(ResizeControl);
  NodeResizer = function({ nodeId, isVisible = true, handleClassName, handleStyle, lineClassName, lineStyle, color: color2, minWidth = 10, minHeight = 10, maxWidth = Number.MAX_VALUE, maxHeight = Number.MAX_VALUE, keepAspectRatio = false, shouldResize, onResizeStart, onResize, onResizeEnd }) {
    if (!isVisible) {
      return null;
    }
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        XY_RESIZER_LINE_POSITIONS.map((position) => jsxRuntimeExports.jsx(NodeResizeControl, {
          className: lineClassName,
          style: lineStyle,
          nodeId,
          position,
          variant: ResizeControlVariant.Line,
          color: color2,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
          onResizeStart,
          keepAspectRatio,
          shouldResize,
          onResize,
          onResizeEnd
        }, position)),
        XY_RESIZER_HANDLE_POSITIONS.map((position) => jsxRuntimeExports.jsx(NodeResizeControl, {
          className: handleClassName,
          style: handleStyle,
          nodeId,
          position,
          color: color2,
          minWidth,
          minHeight,
          maxWidth,
          maxHeight,
          onResizeStart,
          keepAspectRatio,
          shouldResize,
          onResize,
          onResizeEnd
        }, position))
      ]
    });
  };
  function listCacheClear$1() {
    this.__data__ = [];
    this.size = 0;
  }
  var _listCacheClear = listCacheClear$1;
  function eq$3(value, other) {
    return value === other || value !== value && other !== other;
  }
  eq_1 = eq$3;
  var eq$2 = eq_1;
  function assocIndexOf$4(array2, key) {
    var length = array2.length;
    while (length--) {
      if (eq$2(array2[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var _assocIndexOf = assocIndexOf$4;
  var assocIndexOf$3 = _assocIndexOf;
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete$1(key) {
    var data = this.__data__, index2 = assocIndexOf$3(data, key);
    if (index2 < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index2 == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index2, 1);
    }
    --this.size;
    return true;
  }
  var _listCacheDelete = listCacheDelete$1;
  var assocIndexOf$2 = _assocIndexOf;
  function listCacheGet$1(key) {
    var data = this.__data__, index2 = assocIndexOf$2(data, key);
    return index2 < 0 ? void 0 : data[index2][1];
  }
  var _listCacheGet = listCacheGet$1;
  var assocIndexOf$1 = _assocIndexOf;
  function listCacheHas$1(key) {
    return assocIndexOf$1(this.__data__, key) > -1;
  }
  var _listCacheHas = listCacheHas$1;
  var assocIndexOf = _assocIndexOf;
  function listCacheSet$1(key, value) {
    var data = this.__data__, index2 = assocIndexOf(data, key);
    if (index2 < 0) {
      ++this.size;
      data.push([
        key,
        value
      ]);
    } else {
      data[index2][1] = value;
    }
    return this;
  }
  var _listCacheSet = listCacheSet$1;
  var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
  function ListCache$4(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache$4.prototype.clear = listCacheClear;
  ListCache$4.prototype["delete"] = listCacheDelete;
  ListCache$4.prototype.get = listCacheGet;
  ListCache$4.prototype.has = listCacheHas;
  ListCache$4.prototype.set = listCacheSet;
  var _ListCache = ListCache$4;
  var ListCache$3 = _ListCache;
  function stackClear$1() {
    this.__data__ = new ListCache$3();
    this.size = 0;
  }
  var _stackClear = stackClear$1;
  function stackDelete$1(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var _stackDelete = stackDelete$1;
  function stackGet$1(key) {
    return this.__data__.get(key);
  }
  var _stackGet = stackGet$1;
  function stackHas$1(key) {
    return this.__data__.has(key);
  }
  var _stackHas = stackHas$1;
  var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal$1;
  var freeGlobal = _freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root$8 = freeGlobal || freeSelf || Function("return this")();
  _root = root$8;
  var root$7 = _root;
  var Symbol$5 = root$7.Symbol;
  _Symbol = Symbol$5;
  var Symbol$4 = _Symbol;
  var objectProto$d = Object.prototype;
  var hasOwnProperty$a = objectProto$d.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$d.toString;
  var symToStringTag$1 = Symbol$4 ? Symbol$4.toStringTag : void 0;
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e2) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var _getRawTag = getRawTag$1;
  var objectProto$c = Object.prototype;
  var nativeObjectToString = objectProto$c.toString;
  function objectToString$2(value) {
    return nativeObjectToString.call(value);
  }
  var _objectToString = objectToString$2;
  var Symbol$3 = _Symbol, getRawTag = _getRawTag, objectToString$1 = _objectToString;
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$3 ? Symbol$3.toStringTag : void 0;
  function baseGetTag$5(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
  }
  _baseGetTag = baseGetTag$5;
  function isObject$5(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  isObject_1 = isObject$5;
  isObject$6 = getDefaultExportFromCjs(isObject_1);
  var baseGetTag$4 = _baseGetTag, isObject$4 = isObject_1;
  var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction$3(value) {
    if (!isObject$4(value)) {
      return false;
    }
    var tag = baseGetTag$4(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  isFunction_1 = isFunction$3;
  isFunction$4 = getDefaultExportFromCjs(isFunction_1);
  var root$6 = _root;
  var coreJsData$1 = root$6["__core-js_shared__"];
  var _coreJsData = coreJsData$1;
  var coreJsData = _coreJsData;
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked$1(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var _isMasked = isMasked$1;
  var funcProto$1 = Function.prototype;
  var funcToString$1 = funcProto$1.toString;
  function toSource$2(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e2) {
      }
      try {
        return func + "";
      } catch (e2) {
      }
    }
    return "";
  }
  var _toSource = toSource$2;
  var isFunction$2 = isFunction_1, isMasked = _isMasked, isObject$3 = isObject_1, toSource$1 = _toSource;
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto$b = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
  var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function baseIsNative$1(value) {
    if (!isObject$3(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource$1(value));
  }
  var _baseIsNative = baseIsNative$1;
  function getValue$1(object, key) {
    return object == null ? void 0 : object[key];
  }
  var _getValue = getValue$1;
  var baseIsNative = _baseIsNative, getValue = _getValue;
  function getNative$7(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var _getNative = getNative$7;
  var getNative$6 = _getNative, root$5 = _root;
  var Map$4 = getNative$6(root$5, "Map");
  var _Map = Map$4;
  var getNative$5 = _getNative;
  var nativeCreate$4 = getNative$5(Object, "create");
  var _nativeCreate = nativeCreate$4;
  var nativeCreate$3 = _nativeCreate;
  function hashClear$1() {
    this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
    this.size = 0;
  }
  var _hashClear = hashClear$1;
  function hashDelete$1(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var _hashDelete = hashDelete$1;
  var nativeCreate$2 = _nativeCreate;
  var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
  var objectProto$a = Object.prototype;
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
  function hashGet$1(key) {
    var data = this.__data__;
    if (nativeCreate$2) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? void 0 : result;
    }
    return hasOwnProperty$8.call(data, key) ? data[key] : void 0;
  }
  var _hashGet = hashGet$1;
  var nativeCreate$1 = _nativeCreate;
  var objectProto$9 = Object.prototype;
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
  function hashHas$1(key) {
    var data = this.__data__;
    return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$7.call(data, key);
  }
  var _hashHas = hashHas$1;
  var nativeCreate = _nativeCreate;
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  function hashSet$1(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
    return this;
  }
  var _hashSet = hashSet$1;
  var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
  function Hash$8(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  Hash$8.prototype.clear = hashClear;
  Hash$8.prototype["delete"] = hashDelete;
  Hash$8.prototype.get = hashGet;
  Hash$8.prototype.has = hashHas;
  Hash$8.prototype.set = hashSet;
  var _Hash = Hash$8;
  var Hash$7 = _Hash, ListCache$2 = _ListCache, Map$3 = _Map;
  function mapCacheClear$1() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash$7(),
      "map": new (Map$3 || ListCache$2)(),
      "string": new Hash$7()
    };
  }
  var _mapCacheClear = mapCacheClear$1;
  function isKeyable$1(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  var _isKeyable = isKeyable$1;
  var isKeyable = _isKeyable;
  function getMapData$4(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var _getMapData = getMapData$4;
  var getMapData$3 = _getMapData;
  function mapCacheDelete$1(key) {
    var result = getMapData$3(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var _mapCacheDelete = mapCacheDelete$1;
  var getMapData$2 = _getMapData;
  function mapCacheGet$1(key) {
    return getMapData$2(this, key).get(key);
  }
  var _mapCacheGet = mapCacheGet$1;
  var getMapData$1 = _getMapData;
  function mapCacheHas$1(key) {
    return getMapData$1(this, key).has(key);
  }
  var _mapCacheHas = mapCacheHas$1;
  var getMapData = _getMapData;
  function mapCacheSet$1(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var _mapCacheSet = mapCacheSet$1;
  var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
  function MapCache$3(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache$3.prototype.clear = mapCacheClear;
  MapCache$3.prototype["delete"] = mapCacheDelete;
  MapCache$3.prototype.get = mapCacheGet;
  MapCache$3.prototype.has = mapCacheHas;
  MapCache$3.prototype.set = mapCacheSet;
  var _MapCache = MapCache$3;
  var ListCache$1 = _ListCache, Map$2 = _Map, MapCache$2 = _MapCache;
  var LARGE_ARRAY_SIZE = 200;
  function stackSet$1(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache$1) {
      var pairs = data.__data__;
      if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([
          key,
          value
        ]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache$2(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  var _stackSet = stackSet$1;
  var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
  function Stack$2(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack$2.prototype.clear = stackClear;
  Stack$2.prototype["delete"] = stackDelete;
  Stack$2.prototype.get = stackGet;
  Stack$2.prototype.has = stackHas;
  Stack$2.prototype.set = stackSet;
  _Stack = Stack$2;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd$1(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  var _setCacheAdd = setCacheAdd$1;
  function setCacheHas$1(value) {
    return this.__data__.has(value);
  }
  var _setCacheHas = setCacheHas$1;
  var MapCache$1 = _MapCache, setCacheAdd = _setCacheAdd, setCacheHas = _setCacheHas;
  function SetCache$1(values) {
    var index2 = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache$1();
    while (++index2 < length) {
      this.add(values[index2]);
    }
  }
  SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
  SetCache$1.prototype.has = setCacheHas;
  _SetCache = SetCache$1;
  function arraySome$1(array2, predicate) {
    var index2 = -1, length = array2 == null ? 0 : array2.length;
    while (++index2 < length) {
      if (predicate(array2[index2], index2, array2)) {
        return true;
      }
    }
    return false;
  }
  _arraySome = arraySome$1;
  function cacheHas$1(cache, key) {
    return cache.has(key);
  }
  _cacheHas = cacheHas$1;
  var SetCache = _SetCache, arraySome = _arraySome, cacheHas = _cacheHas;
  var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
  function equalArrays$2(array2, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array2.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array2);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array2;
    }
    var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
    stack.set(array2, other);
    stack.set(other, array2);
    while (++index2 < arrLength) {
      var arrValue = array2[index2], othValue = other[index2];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index2, other, array2, stack) : customizer(arrValue, othValue, index2, array2, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array2);
    stack["delete"](other);
    return result;
  }
  var _equalArrays = equalArrays$2;
  var root$4 = _root;
  var Uint8Array$2 = root$4.Uint8Array;
  _Uint8Array = Uint8Array$2;
  function mapToArray$1(map) {
    var index2 = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index2] = [
        key,
        value
      ];
    });
    return result;
  }
  var _mapToArray = mapToArray$1;
  function setToArray$1(set2) {
    var index2 = -1, result = Array(set2.size);
    set2.forEach(function(value) {
      result[++index2] = value;
    });
    return result;
  }
  _setToArray = setToArray$1;
  var Symbol$2 = _Symbol, Uint8Array$1 = _Uint8Array, eq$1 = eq_1, equalArrays$1 = _equalArrays, mapToArray = _mapToArray, setToArray = _setToArray;
  var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
  var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
  var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]";
  var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
  function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$2:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag$1:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
          return false;
        }
        return true;
      case boolTag$1:
      case dateTag$1:
      case numberTag$1:
        return eq$1(+object, +other);
      case errorTag$1:
        return object.name == other.name && object.message == other.message;
      case regexpTag$1:
      case stringTag$1:
        return object == other + "";
      case mapTag$2:
        var convert = mapToArray;
      case setTag$2:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$2;
        stack.set(object, other);
        var result = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag$1:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  var _equalByTag = equalByTag$1;
  function arrayPush$2(array2, values) {
    var index2 = -1, length = values.length, offset = array2.length;
    while (++index2 < length) {
      array2[offset + index2] = values[index2];
    }
    return array2;
  }
  _arrayPush = arrayPush$2;
  var isArray$9 = Array.isArray;
  isArray_1 = isArray$9;
  var arrayPush$1 = _arrayPush, isArray$8 = isArray_1;
  function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray$8(object) ? result : arrayPush$1(result, symbolsFunc(object));
  }
  var _baseGetAllKeys = baseGetAllKeys$2;
  function arrayFilter$1(array2, predicate) {
    var index2 = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
    while (++index2 < length) {
      var value = array2[index2];
      if (predicate(value, index2, array2)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  var _arrayFilter = arrayFilter$1;
  function stubArray$2() {
    return [];
  }
  var stubArray_1 = stubArray$2;
  var arrayFilter = _arrayFilter, stubArray$1 = stubArray_1;
  var objectProto$8 = Object.prototype;
  var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
  var getSymbols$2 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };
  _getSymbols = getSymbols$2;
  function baseTimes$1(n2, iteratee) {
    var index2 = -1, result = Array(n2);
    while (++index2 < n2) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  var _baseTimes = baseTimes$1;
  function isObjectLike$5(value) {
    return value != null && typeof value == "object";
  }
  isObjectLike_1 = isObjectLike$5;
  var baseGetTag$3 = _baseGetTag, isObjectLike$4 = isObjectLike_1;
  var argsTag$2 = "[object Arguments]";
  function baseIsArguments$1(value) {
    return isObjectLike$4(value) && baseGetTag$3(value) == argsTag$2;
  }
  var _baseIsArguments = baseIsArguments$1;
  var baseIsArguments = _baseIsArguments, isObjectLike$3 = isObjectLike_1;
  var objectProto$7 = Object.prototype;
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
  var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;
  var isArguments$2 = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike$3(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  isArguments_1 = isArguments$2;
  var isBuffer$2 = {
    exports: {}
  };
  function stubFalse() {
    return false;
  }
  var stubFalse_1 = stubFalse;
  isBuffer$2.exports;
  (function(module, exports2) {
    var root2 = _root, stubFalse2 = stubFalse_1;
    var freeExports = exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root2.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer2 = nativeIsBuffer || stubFalse2;
    module.exports = isBuffer2;
  })(isBuffer$2, isBuffer$2.exports);
  isBufferExports = isBuffer$2.exports;
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex$3(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  _isIndex = isIndex$3;
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength$3(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  var isLength_1 = isLength$3;
  var baseGetTag$2 = _baseGetTag, isLength$2 = isLength_1, isObjectLike$2 = isObjectLike_1;
  var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag$1 = "[object Map]", numberTag = "[object Number]", objectTag$2 = "[object Object]", regexpTag = "[object RegExp]", setTag$1 = "[object Set]", stringTag = "[object String]", weakMapTag$1 = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag] = typedArrayTags[setTag$1] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag$1] = false;
  function baseIsTypedArray$1(value) {
    return isObjectLike$2(value) && isLength$2(value.length) && !!typedArrayTags[baseGetTag$2(value)];
  }
  var _baseIsTypedArray = baseIsTypedArray$1;
  function baseUnary$1(func) {
    return function(value) {
      return func(value);
    };
  }
  _baseUnary = baseUnary$1;
  var _nodeUtil = {
    exports: {}
  };
  _nodeUtil.exports;
  (function(module, exports2) {
    var freeGlobal2 = _freeGlobal;
    var freeExports = exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal2.process;
    var nodeUtil2 = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e2) {
      }
    }();
    module.exports = nodeUtil2;
  })(_nodeUtil, _nodeUtil.exports);
  _nodeUtilExports = _nodeUtil.exports;
  var baseIsTypedArray = _baseIsTypedArray, baseUnary = _baseUnary, nodeUtil = _nodeUtilExports;
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  isTypedArray_1 = isTypedArray$2;
  var baseTimes = _baseTimes, isArguments$1 = isArguments_1, isArray$7 = isArray_1, isBuffer$1 = isBufferExports, isIndex$2 = _isIndex, isTypedArray$1 = isTypedArray_1;
  var objectProto$6 = Object.prototype;
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
  function arrayLikeKeys$2(value, inherited) {
    var isArr = isArray$7(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex$2(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  var _arrayLikeKeys = arrayLikeKeys$2;
  var objectProto$5 = Object.prototype;
  function isPrototype$2(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
    return value === proto;
  }
  _isPrototype = isPrototype$2;
  function overArg$2(func, transform2) {
    return function(arg) {
      return func(transform2(arg));
    };
  }
  var _overArg = overArg$2;
  var overArg$1 = _overArg;
  var nativeKeys$1 = overArg$1(Object.keys, Object);
  var _nativeKeys = nativeKeys$1;
  var isPrototype$1 = _isPrototype, nativeKeys = _nativeKeys;
  var objectProto$4 = Object.prototype;
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
  function baseKeys$1(object) {
    if (!isPrototype$1(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$4.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  var _baseKeys = baseKeys$1;
  var isFunction$1 = isFunction_1, isLength$1 = isLength_1;
  function isArrayLike$2(value) {
    return value != null && isLength$1(value.length) && !isFunction$1(value);
  }
  isArrayLike_1 = isArrayLike$2;
  var arrayLikeKeys$1 = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$1 = isArrayLike_1;
  function keys$2(object) {
    return isArrayLike$1(object) ? arrayLikeKeys$1(object) : baseKeys(object);
  }
  keys_1 = keys$2;
  var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols$1 = _getSymbols, keys$1 = keys_1;
  function getAllKeys$1(object) {
    return baseGetAllKeys$1(object, keys$1, getSymbols$1);
  }
  _getAllKeys = getAllKeys$1;
  var getAllKeys = _getAllKeys;
  var COMPARE_PARTIAL_FLAG$3 = 1;
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
  function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index2 = objLength;
    while (index2--) {
      var key = objProps[index2];
      if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index2 < objLength) {
      key = objProps[index2];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  var _equalObjects = equalObjects$1;
  var getNative$4 = _getNative, root$3 = _root;
  var DataView$1 = getNative$4(root$3, "DataView");
  var _DataView = DataView$1;
  var getNative$3 = _getNative, root$2 = _root;
  var Promise$2 = getNative$3(root$2, "Promise");
  var _Promise = Promise$2;
  var getNative$2 = _getNative, root$1 = _root;
  var Set$2 = getNative$2(root$1, "Set");
  _Set = Set$2;
  var getNative$1 = _getNative, root = _root;
  var WeakMap$2 = getNative$1(root, "WeakMap");
  var _WeakMap = WeakMap$2;
  var DataView = _DataView, Map$1 = _Map, Promise$1 = _Promise, Set$1 = _Set, WeakMap$1 = _WeakMap, baseGetTag$1 = _baseGetTag, toSource = _toSource;
  var mapTag = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
  var getTag$1 = baseGetTag$1;
  if (DataView && getTag$1(new DataView(new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag$1(new Map$1()) != mapTag || Promise$1 && getTag$1(Promise$1.resolve()) != promiseTag || Set$1 && getTag$1(new Set$1()) != setTag || WeakMap$1 && getTag$1(new WeakMap$1()) != weakMapTag) {
    getTag$1 = function(value) {
      var result = baseGetTag$1(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  _getTag = getTag$1;
  var Stack$1 = _Stack, equalArrays = _equalArrays, equalByTag = _equalByTag, equalObjects = _equalObjects, getTag = _getTag, isArray$6 = isArray_1, isBuffer = isBufferExports, isTypedArray = isTypedArray_1;
  var COMPARE_PARTIAL_FLAG$2 = 1;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
  var objectProto$2 = Object.prototype;
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
  function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray$6(object), othIsArr = isArray$6(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack$1());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
      var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$2.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack$1());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack$1());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  var _baseIsEqualDeep = baseIsEqualDeep$1;
  var baseIsEqualDeep = _baseIsEqualDeep, isObjectLike$1 = isObjectLike_1;
  function baseIsEqual$2(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike$1(value) && !isObjectLike$1(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$2, stack);
  }
  _baseIsEqual = baseIsEqual$2;
  var Stack = _Stack, baseIsEqual$1 = _baseIsEqual;
  var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
  function baseIsMatch$1(object, source, matchData, customizer) {
    var index2 = matchData.length, length = index2, noCustomizer = !customizer;
    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index2--) {
      var data = matchData[index2];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index2 < length) {
      data = matchData[index2];
      var key = data[0], objValue = object[key], srcValue = data[1];
      if (noCustomizer && data[2]) {
        if (objValue === void 0 && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack();
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === void 0 ? baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
          return false;
        }
      }
    }
    return true;
  }
  var _baseIsMatch = baseIsMatch$1;
  var isObject$2 = isObject_1;
  function isStrictComparable$2(value) {
    return value === value && !isObject$2(value);
  }
  var _isStrictComparable = isStrictComparable$2;
  var isStrictComparable$1 = _isStrictComparable, keys = keys_1;
  function getMatchData$1(object) {
    var result = keys(object), length = result.length;
    while (length--) {
      var key = result[length], value = object[key];
      result[length] = [
        key,
        value,
        isStrictComparable$1(value)
      ];
    }
    return result;
  }
  var _getMatchData = getMatchData$1;
  function matchesStrictComparable$2(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
    };
  }
  var _matchesStrictComparable = matchesStrictComparable$2;
  var baseIsMatch = _baseIsMatch, getMatchData = _getMatchData, matchesStrictComparable$1 = _matchesStrictComparable;
  function baseMatches$1(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }
  var _baseMatches = baseMatches$1;
  var baseGetTag = _baseGetTag, isObjectLike = isObjectLike_1;
  var symbolTag = "[object Symbol]";
  function isSymbol$3(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  isSymbol_1 = isSymbol$3;
  var isArray$5 = isArray_1, isSymbol$2 = isSymbol_1;
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
  function isKey$3(value, object) {
    if (isArray$5(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol$2(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  var _isKey = isKey$3;
  var MapCache = _MapCache;
  var FUNC_ERROR_TEXT$1 = "Expected a function";
  function memoize$1(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize$1.Cache || MapCache)();
    return memoized;
  }
  memoize$1.Cache = MapCache;
  var memoize_1 = memoize$1;
  memoize$2 = getDefaultExportFromCjs(memoize_1);
  var memoize = memoize_1;
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped$1(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  var _memoizeCapped = memoizeCapped$1;
  var memoizeCapped = _memoizeCapped;
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath$1 = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  var _stringToPath = stringToPath$1;
  function arrayMap$2(array2, iteratee) {
    var index2 = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
    while (++index2 < length) {
      result[index2] = iteratee(array2[index2], index2, array2);
    }
    return result;
  }
  _arrayMap = arrayMap$2;
  var Symbol$1 = _Symbol, arrayMap$1 = _arrayMap, isArray$4 = isArray_1, isSymbol$1 = isSymbol_1;
  var INFINITY$1 = 1 / 0;
  var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString$1(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray$4(value)) {
      return arrayMap$1(value, baseToString$1) + "";
    }
    if (isSymbol$1(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
  }
  var _baseToString = baseToString$1;
  var baseToString = _baseToString;
  function toString$1(value) {
    return value == null ? "" : baseToString(value);
  }
  toString_1 = toString$1;
  var isArray$3 = isArray_1, isKey$2 = _isKey, stringToPath = _stringToPath, toString = toString_1;
  function castPath$4(value, object) {
    if (isArray$3(value)) {
      return value;
    }
    return isKey$2(value, object) ? [
      value
    ] : stringToPath(toString(value));
  }
  _castPath = castPath$4;
  var isSymbol = isSymbol_1;
  var INFINITY = 1 / 0;
  function toKey$5(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  _toKey = toKey$5;
  var castPath$3 = _castPath, toKey$4 = _toKey;
  function baseGet$3(object, path) {
    path = castPath$3(path, object);
    var index2 = 0, length = path.length;
    while (object != null && index2 < length) {
      object = object[toKey$4(path[index2++])];
    }
    return index2 && index2 == length ? object : void 0;
  }
  _baseGet = baseGet$3;
  var baseGet$2 = _baseGet;
  function get$1(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet$2(object, path);
    return result === void 0 ? defaultValue : result;
  }
  var get_1 = get$1;
  get$2 = getDefaultExportFromCjs(get_1);
  function baseHasIn$1(object, key) {
    return object != null && key in Object(object);
  }
  var _baseHasIn = baseHasIn$1;
  var castPath$2 = _castPath, isArguments = isArguments_1, isArray$2 = isArray_1, isIndex$1 = _isIndex, isLength = isLength_1, toKey$3 = _toKey;
  function hasPath$1(object, path, hasFunc) {
    path = castPath$2(path, object);
    var index2 = -1, length = path.length, result = false;
    while (++index2 < length) {
      var key = toKey$3(path[index2]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index2 != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex$1(key, length) && (isArray$2(object) || isArguments(object));
  }
  var _hasPath = hasPath$1;
  var baseHasIn = _baseHasIn, hasPath = _hasPath;
  function hasIn$1(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }
  hasIn_1 = hasIn$1;
  var baseIsEqual = _baseIsEqual, get = get_1, hasIn = hasIn_1, isKey$1 = _isKey, isStrictComparable = _isStrictComparable, matchesStrictComparable = _matchesStrictComparable, toKey$2 = _toKey;
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function baseMatchesProperty$1(path, srcValue) {
    if (isKey$1(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey$2(path), srcValue);
    }
    return function(object) {
      var objValue = get(object, path);
      return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
  }
  var _baseMatchesProperty = baseMatchesProperty$1;
  function identity$1(value) {
    return value;
  }
  identity_1 = identity$1;
  function baseProperty$1(key) {
    return function(object) {
      return object == null ? void 0 : object[key];
    };
  }
  var _baseProperty = baseProperty$1;
  var baseGet$1 = _baseGet;
  function basePropertyDeep$1(path) {
    return function(object) {
      return baseGet$1(object, path);
    };
  }
  var _basePropertyDeep = basePropertyDeep$1;
  var baseProperty = _baseProperty, basePropertyDeep = _basePropertyDeep, isKey = _isKey, toKey$1 = _toKey;
  function property$1(path) {
    return isKey(path) ? baseProperty(toKey$1(path)) : basePropertyDeep(path);
  }
  var property_1 = property$1;
  var baseMatches = _baseMatches, baseMatchesProperty = _baseMatchesProperty, identity = identity_1, isArray$1 = isArray_1, property = property_1;
  function baseIteratee$2(value) {
    if (typeof value == "function") {
      return value;
    }
    if (value == null) {
      return identity;
    }
    if (typeof value == "object") {
      return isArray$1(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }
    return property(value);
  }
  _baseIteratee = baseIteratee$2;
  var FUNC_ERROR_TEXT = "Expected a function";
  function negate$1(predicate) {
    if (typeof predicate != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    return function() {
      var args = arguments;
      switch (args.length) {
        case 0:
          return !predicate.call(this);
        case 1:
          return !predicate.call(this, args[0]);
        case 2:
          return !predicate.call(this, args[0], args[1]);
        case 3:
          return !predicate.call(this, args[0], args[1], args[2]);
      }
      return !predicate.apply(this, args);
    };
  }
  var negate_1 = negate$1;
  var getNative = _getNative;
  var defineProperty$1 = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e2) {
    }
  }();
  _defineProperty = defineProperty$1;
  var defineProperty = _defineProperty;
  function baseAssignValue$1(object, key, value) {
    if (key == "__proto__" && defineProperty) {
      defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  _baseAssignValue = baseAssignValue$1;
  var baseAssignValue = _baseAssignValue, eq = eq_1;
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  function assignValue$1(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$1.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  _assignValue = assignValue$1;
  var assignValue = _assignValue, castPath$1 = _castPath, isIndex = _isIndex, isObject$1 = isObject_1, toKey = _toKey;
  function baseSet$1(object, path, value, customizer) {
    if (!isObject$1(object)) {
      return object;
    }
    path = castPath$1(path, object);
    var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
    while (nested != null && ++index2 < length) {
      var key = toKey(path[index2]), newValue = value;
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        return object;
      }
      if (index2 != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : void 0;
        if (newValue === void 0) {
          newValue = isObject$1(objValue) ? objValue : isIndex(path[index2 + 1]) ? [] : {};
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }
  var _baseSet = baseSet$1;
  var baseGet = _baseGet, baseSet = _baseSet, castPath = _castPath;
  function basePickBy$1(object, paths, predicate) {
    var index2 = -1, length = paths.length, result = {};
    while (++index2 < length) {
      var path = paths[index2], value = baseGet(object, path);
      if (predicate(value, path)) {
        baseSet(result, castPath(path, object), value);
      }
    }
    return result;
  }
  _basePickBy = basePickBy$1;
  var overArg = _overArg;
  var getPrototype$1 = overArg(Object.getPrototypeOf, Object);
  _getPrototype = getPrototype$1;
  var arrayPush = _arrayPush, getPrototype = _getPrototype, getSymbols = _getSymbols, stubArray = stubArray_1;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbolsIn$1 = !nativeGetSymbols ? stubArray : function(object) {
    var result = [];
    while (object) {
      arrayPush(result, getSymbols(object));
      object = getPrototype(object);
    }
    return result;
  };
  _getSymbolsIn = getSymbolsIn$1;
  function nativeKeysIn$1(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var _nativeKeysIn = nativeKeysIn$1;
  var isObject = isObject_1, isPrototype = _isPrototype, nativeKeysIn = _nativeKeysIn;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeysIn$1(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  var _baseKeysIn = baseKeysIn$1;
  var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike = isArrayLike_1;
  function keysIn$1(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  keysIn_1 = keysIn$1;
  var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn = keysIn_1;
  function getAllKeysIn$1(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
  }
  _getAllKeysIn = getAllKeysIn$1;
  var arrayMap = _arrayMap, baseIteratee$1 = _baseIteratee, basePickBy = _basePickBy, getAllKeysIn = _getAllKeysIn;
  function pickBy$1(object, predicate) {
    if (object == null) {
      return {};
    }
    var props = arrayMap(getAllKeysIn(object), function(prop) {
      return [
        prop
      ];
    });
    predicate = baseIteratee$1(predicate);
    return basePickBy(object, props, function(value, path) {
      return predicate(value, path[0]);
    });
  }
  var pickBy_1 = pickBy$1;
  var baseIteratee = _baseIteratee, negate = negate_1, pickBy = pickBy_1;
  function omitBy(object, predicate) {
    return pickBy(object, negate(baseIteratee(predicate)));
  }
  var omitBy_1 = omitBy;
  omitBy$1 = getDefaultExportFromCjs(omitBy_1);
  function isUndefined(value) {
    return value === void 0;
  }
  var isUndefined_1 = isUndefined;
  isUndefined$1 = getDefaultExportFromCjs(isUndefined_1);
  var isMergeableObject = function isMergeableObject2(value) {
    return isNonNullObject(value) && !isSpecial(value);
  };
  function isNonNullObject(value) {
    return !!value && typeof value === "object";
  }
  function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
  }
  var canUseSymbol = typeof Symbol === "function" && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
  function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
  }
  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }
  function cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
  }
  function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function(element) {
      return cloneUnlessOtherwiseSpecified(element, options);
    });
  }
  function getMergeFunction(key, options) {
    if (!options.customMerge) {
      return deepmerge;
    }
    var customMerge = options.customMerge(key);
    return typeof customMerge === "function" ? customMerge : deepmerge;
  }
  function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
      return Object.propertyIsEnumerable.call(target, symbol);
    }) : [];
  }
  function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
  }
  function propertyIsOnObject(object, property2) {
    try {
      return property2 in object;
    } catch (_) {
      return false;
    }
  }
  function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
  }
  function mergeObject(target, source, options) {
    var destination = {};
    if (options.isMergeableObject(target)) {
      getKeys(target).forEach(function(key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
      });
    }
    getKeys(source).forEach(function(key) {
      if (propertyIsUnsafe(target, key)) {
        return;
      }
      if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
        destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
      } else {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
      }
    });
    return destination;
  }
  function deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject;
    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, options);
    } else if (sourceIsArray) {
      return options.arrayMerge(target, source, options);
    } else {
      return mergeObject(target, source, options);
    }
  }
  deepmerge.all = function deepmergeAll(array2, options) {
    if (!Array.isArray(array2)) {
      throw new Error("first argument should be an array");
    }
    return array2.reduce(function(prev, next) {
      return deepmerge(prev, next, options);
    }, {});
  };
  var deepmerge_1 = deepmerge;
  var cjs = deepmerge_1;
  deepmerge$1 = getDefaultExportFromCjs(cjs);
  var Reflect;
  (function(Reflect2) {
    (function(factory) {
      var root2 = typeof globalThis === "object" ? globalThis : typeof commonjsGlobal === "object" ? commonjsGlobal : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
      var exporter = makeExporter(Reflect2);
      if (typeof root2.Reflect !== "undefined") {
        exporter = makeExporter(root2.Reflect, exporter);
      }
      factory(exporter, root2);
      if (typeof root2.Reflect === "undefined") {
        root2.Reflect = Reflect2;
      }
      function makeExporter(target, previous) {
        return function(key, value) {
          Object.defineProperty(target, key, {
            configurable: true,
            writable: true,
            value
          });
          if (previous) previous(key, value);
        };
      }
      function functionThis() {
        try {
          return Function("return this;")();
        } catch (_) {
        }
      }
      function indirectEvalThis() {
        try {
          return (void 0, eval)("(function() { return this; })()");
        } catch (_) {
        }
      }
      function sloppyModeThis() {
        return functionThis() || indirectEvalThis();
      }
    })(function(exporter, root2) {
      var hasOwn = Object.prototype.hasOwnProperty;
      var supportsSymbol = typeof Symbol === "function";
      var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
      var supportsCreate = typeof Object.create === "function";
      var supportsProto = {
        __proto__: []
      } instanceof Array;
      var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        create: supportsCreate ? function() {
          return MakeDictionary(/* @__PURE__ */ Object.create(null));
        } : supportsProto ? function() {
          return MakeDictionary({
            __proto__: null
          });
        } : function() {
          return MakeDictionary({});
        },
        has: downLevel ? function(map, key) {
          return hasOwn.call(map, key);
        } : function(map, key) {
          return key in map;
        },
        get: downLevel ? function(map, key) {
          return hasOwn.call(map, key) ? map[key] : void 0;
        } : function(map, key) {
          return map[key];
        }
      };
      var functionPrototype = Object.getPrototypeOf(Function);
      var _Map2 = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
      var _Set2 = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
      var _WeakMap2 = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
      var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
      var metadataRegistry = GetOrCreateMetadataRegistry();
      var metadataProvider = CreateMetadataProvider(metadataRegistry);
      function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators)) throw new TypeError();
          if (!IsObject(target)) throw new TypeError();
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
          if (IsNull(attributes)) attributes = void 0;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators)) throw new TypeError();
          if (!IsConstructor(target)) throw new TypeError();
          return DecorateConstructor(decorators, target);
        }
      }
      exporter("decorate", decorate);
      function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target)) throw new TypeError();
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
      }
      exporter("metadata", metadata);
      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      exporter("defineMetadata", defineMetadata);
      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasMetadata", hasMetadata);
      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasOwnMetadata", hasOwnMetadata);
      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }
      exporter("getMetadata", getMetadata);
      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("getOwnMetadata", getOwnMetadata);
      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }
      exporter("getMetadataKeys", getMetadataKeys);
      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }
      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
        var provider = GetMetadataProvider(target, propertyKey, false);
        if (IsUndefined(provider)) return false;
        return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
      }
      exporter("deleteMetadata", deleteMetadata);
      function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated)) throw new TypeError();
            target = decorated;
          }
        }
        return target;
      }
      function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated)) throw new TypeError();
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn2) return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
      }
      function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var provider = GetMetadataProvider(O, P, false);
        if (IsUndefined(provider)) return false;
        return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
      }
      function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn2) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
        return void 0;
      }
      function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var provider = GetMetadataProvider(O, P, false);
        if (IsUndefined(provider)) return;
        return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
      }
      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var provider = GetMetadataProvider(O, P, true);
        provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
      }
      function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null) return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0) return ownKeys;
        if (ownKeys.length <= 0) return parentKeys;
        var set2 = new _Set2();
        var keys2 = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
          var key = ownKeys_1[_i];
          var hasKey = set2.has(key);
          if (!hasKey) {
            set2.add(key);
            keys2.push(key);
          }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
          var key = parentKeys_1[_a];
          var hasKey = set2.has(key);
          if (!hasKey) {
            set2.add(key);
            keys2.push(key);
          }
        }
        return keys2;
      }
      function OrdinaryOwnMetadataKeys(O, P) {
        var provider = GetMetadataProvider(O, P, false);
        if (!provider) {
          return [];
        }
        return provider.OrdinaryOwnMetadataKeys(O, P);
      }
      function Type(x) {
        if (x === null) return 1;
        switch (typeof x) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return x === null ? 1 : 6;
          default:
            return 6;
        }
      }
      function IsUndefined(x) {
        return x === void 0;
      }
      function IsNull(x) {
        return x === null;
      }
      function IsSymbol(x) {
        return typeof x === "symbol";
      }
      function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
      }
      function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
          case 0:
            return input;
          case 1:
            return input;
          case 2:
            return input;
          case 3:
            return input;
          case 4:
            return input;
          case 5:
            return input;
        }
        var hint = "string";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== void 0) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result)) throw new TypeError();
          return result;
        }
        return OrdinaryToPrimitive(input);
      }
      function OrdinaryToPrimitive(O, hint) {
        var valueOf, result;
        {
          var toString_12 = O.toString;
          if (IsCallable(toString_12)) {
            var result = toString_12.call(O);
            if (!IsObject(result)) return result;
          }
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result)) return result;
          }
        }
        throw new TypeError();
      }
      function ToBoolean(argument) {
        return !!argument;
      }
      function ToString(argument) {
        return "" + argument;
      }
      function ToPropertyKey(argument) {
        var key = ToPrimitive(argument);
        if (IsSymbol(key)) return key;
        return ToString(key);
      }
      function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
      }
      function IsCallable(argument) {
        return typeof argument === "function";
      }
      function IsConstructor(argument) {
        return typeof argument === "function";
      }
      function IsPropertyKey(argument) {
        switch (Type(argument)) {
          case 3:
            return true;
          case 4:
            return true;
          default:
            return false;
        }
      }
      function SameValueZero(x, y) {
        return x === y || x !== x && y !== y;
      }
      function GetMethod(V, P) {
        var func = V[P];
        if (func === void 0 || func === null) return void 0;
        if (!IsCallable(func)) throw new TypeError();
        return func;
      }
      function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method)) throw new TypeError();
        var iterator = method.call(obj);
        if (!IsObject(iterator)) throw new TypeError();
        return iterator;
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      }
      function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f) f.call(iterator);
      }
      function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype) return proto;
        if (proto !== functionPrototype) return proto;
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype) return proto;
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function") return proto;
        if (constructor === O) return proto;
        return constructor;
      }
      function CreateMetadataRegistry() {
        var fallback;
        if (!IsUndefined(registrySymbol) && typeof root2.Reflect !== "undefined" && !(registrySymbol in root2.Reflect) && typeof root2.Reflect.defineMetadata === "function") {
          fallback = CreateFallbackProvider(root2.Reflect);
        }
        var first;
        var second;
        var rest;
        var targetProviderMap = new _WeakMap2();
        var registry = {
          registerProvider,
          getProvider,
          setProvider
        };
        return registry;
        function registerProvider(provider) {
          if (!Object.isExtensible(registry)) {
            throw new Error("Cannot add provider to a frozen registry.");
          }
          switch (true) {
            case fallback === provider:
              break;
            case IsUndefined(first):
              first = provider;
              break;
            case first === provider:
              break;
            case IsUndefined(second):
              second = provider;
              break;
            case second === provider:
              break;
            default:
              if (rest === void 0) rest = new _Set2();
              rest.add(provider);
              break;
          }
        }
        function getProviderNoCache(O, P) {
          if (!IsUndefined(first)) {
            if (first.isProviderFor(O, P)) return first;
            if (!IsUndefined(second)) {
              if (second.isProviderFor(O, P)) return first;
              if (!IsUndefined(rest)) {
                var iterator = GetIterator(rest);
                while (true) {
                  var next = IteratorStep(iterator);
                  if (!next) {
                    return void 0;
                  }
                  var provider = IteratorValue(next);
                  if (provider.isProviderFor(O, P)) {
                    IteratorClose(iterator);
                    return provider;
                  }
                }
              }
            }
          }
          if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
            return fallback;
          }
          return void 0;
        }
        function getProvider(O, P) {
          var providerMap = targetProviderMap.get(O);
          var provider;
          if (!IsUndefined(providerMap)) {
            provider = providerMap.get(P);
          }
          if (!IsUndefined(provider)) {
            return provider;
          }
          provider = getProviderNoCache(O, P);
          if (!IsUndefined(provider)) {
            if (IsUndefined(providerMap)) {
              providerMap = new _Map2();
              targetProviderMap.set(O, providerMap);
            }
            providerMap.set(P, provider);
          }
          return provider;
        }
        function hasProvider(provider) {
          if (IsUndefined(provider)) throw new TypeError();
          return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
        }
        function setProvider(O, P, provider) {
          if (!hasProvider(provider)) {
            throw new Error("Metadata provider not registered.");
          }
          var existingProvider = getProvider(O, P);
          if (existingProvider !== provider) {
            if (!IsUndefined(existingProvider)) {
              return false;
            }
            var providerMap = targetProviderMap.get(O);
            if (IsUndefined(providerMap)) {
              providerMap = new _Map2();
              targetProviderMap.set(O, providerMap);
            }
            providerMap.set(P, provider);
          }
          return true;
        }
      }
      function GetOrCreateMetadataRegistry() {
        var metadataRegistry2;
        if (!IsUndefined(registrySymbol) && IsObject(root2.Reflect) && Object.isExtensible(root2.Reflect)) {
          metadataRegistry2 = root2.Reflect[registrySymbol];
        }
        if (IsUndefined(metadataRegistry2)) {
          metadataRegistry2 = CreateMetadataRegistry();
        }
        if (!IsUndefined(registrySymbol) && IsObject(root2.Reflect) && Object.isExtensible(root2.Reflect)) {
          Object.defineProperty(root2.Reflect, registrySymbol, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: metadataRegistry2
          });
        }
        return metadataRegistry2;
      }
      function CreateMetadataProvider(registry) {
        var metadata2 = new _WeakMap2();
        var provider = {
          isProviderFor: function(O, P) {
            var targetMetadata = metadata2.get(O);
            if (IsUndefined(targetMetadata)) return false;
            return targetMetadata.has(P);
          },
          OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
          OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
          OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
          OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
          OrdinaryDeleteMetadata
        };
        metadataRegistry.registerProvider(provider);
        return provider;
        function GetOrCreateMetadataMap(O, P, Create) {
          var targetMetadata = metadata2.get(O);
          var createdTargetMetadata = false;
          if (IsUndefined(targetMetadata)) {
            if (!Create) return void 0;
            targetMetadata = new _Map2();
            metadata2.set(O, targetMetadata);
            createdTargetMetadata = true;
          }
          var metadataMap = targetMetadata.get(P);
          if (IsUndefined(metadataMap)) {
            if (!Create) return void 0;
            metadataMap = new _Map2();
            targetMetadata.set(P, metadataMap);
            if (!registry.setProvider(O, P, provider)) {
              targetMetadata.delete(P);
              if (createdTargetMetadata) {
                metadata2.delete(O);
              }
              throw new Error("Wrong provider for target.");
            }
          }
          return metadataMap;
        }
        function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(O, P, false);
          if (IsUndefined(metadataMap)) return false;
          return ToBoolean(metadataMap.has(MetadataKey));
        }
        function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(O, P, false);
          if (IsUndefined(metadataMap)) return void 0;
          return metadataMap.get(MetadataKey);
        }
        function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
          var metadataMap = GetOrCreateMetadataMap(O, P, true);
          metadataMap.set(MetadataKey, MetadataValue);
        }
        function OrdinaryOwnMetadataKeys2(O, P) {
          var keys2 = [];
          var metadataMap = GetOrCreateMetadataMap(O, P, false);
          if (IsUndefined(metadataMap)) return keys2;
          var keysObj = metadataMap.keys();
          var iterator = GetIterator(keysObj);
          var k2 = 0;
          while (true) {
            var next = IteratorStep(iterator);
            if (!next) {
              keys2.length = k2;
              return keys2;
            }
            var nextValue = IteratorValue(next);
            try {
              keys2[k2] = nextValue;
            } catch (e2) {
              try {
                IteratorClose(iterator);
              } finally {
                throw e2;
              }
            }
            k2++;
          }
        }
        function OrdinaryDeleteMetadata(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(O, P, false);
          if (IsUndefined(metadataMap)) return false;
          if (!metadataMap.delete(MetadataKey)) return false;
          if (metadataMap.size === 0) {
            var targetMetadata = metadata2.get(O);
            if (!IsUndefined(targetMetadata)) {
              targetMetadata.delete(P);
              if (targetMetadata.size === 0) {
                metadata2.delete(targetMetadata);
              }
            }
          }
          return true;
        }
      }
      function CreateFallbackProvider(reflect) {
        var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
        var metadataOwner = new _WeakMap2();
        var provider = {
          isProviderFor: function(O, P) {
            var metadataPropertySet = metadataOwner.get(O);
            if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
              return true;
            }
            if (getOwnMetadataKeys2(O, P).length) {
              if (IsUndefined(metadataPropertySet)) {
                metadataPropertySet = new _Set2();
                metadataOwner.set(O, metadataPropertySet);
              }
              metadataPropertySet.add(P);
              return true;
            }
            return false;
          },
          OrdinaryDefineOwnMetadata: defineMetadata2,
          OrdinaryHasOwnMetadata: hasOwnMetadata2,
          OrdinaryGetOwnMetadata: getOwnMetadata2,
          OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
          OrdinaryDeleteMetadata: deleteMetadata2
        };
        return provider;
      }
      function GetMetadataProvider(O, P, Create) {
        var registeredProvider = metadataRegistry.getProvider(O, P);
        if (!IsUndefined(registeredProvider)) {
          return registeredProvider;
        }
        if (Create) {
          if (metadataRegistry.setProvider(O, P, metadataProvider)) {
            return metadataProvider;
          }
          throw new Error("Illegal state.");
        }
        return void 0;
      }
      function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = function() {
          function MapIterator2(keys2, values, selector2) {
            this._index = 0;
            this._keys = keys2;
            this._values = values;
            this._selector = selector2;
          }
          MapIterator2.prototype["@@iterator"] = function() {
            return this;
          };
          MapIterator2.prototype[iteratorSymbol] = function() {
            return this;
          };
          MapIterator2.prototype.next = function() {
            var index2 = this._index;
            if (index2 >= 0 && index2 < this._keys.length) {
              var result = this._selector(this._keys[index2], this._values[index2]);
              if (index2 + 1 >= this._keys.length) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              } else {
                this._index++;
              }
              return {
                value: result,
                done: false
              };
            }
            return {
              value: void 0,
              done: true
            };
          };
          MapIterator2.prototype.throw = function(error) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            throw error;
          };
          MapIterator2.prototype.return = function(value) {
            if (this._index >= 0) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            }
            return {
              value,
              done: true
            };
          };
          return MapIterator2;
        }();
        var Map2 = function() {
          function Map3() {
            this._keys = [];
            this._values = [];
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          }
          Object.defineProperty(Map3.prototype, "size", {
            get: function() {
              return this._keys.length;
            },
            enumerable: true,
            configurable: true
          });
          Map3.prototype.has = function(key) {
            return this._find(key, false) >= 0;
          };
          Map3.prototype.get = function(key) {
            var index2 = this._find(key, false);
            return index2 >= 0 ? this._values[index2] : void 0;
          };
          Map3.prototype.set = function(key, value) {
            var index2 = this._find(key, true);
            this._values[index2] = value;
            return this;
          };
          Map3.prototype.delete = function(key) {
            var index2 = this._find(key, false);
            if (index2 >= 0) {
              var size = this._keys.length;
              for (var i = index2 + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i];
                this._values[i - 1] = this._values[i];
              }
              this._keys.length--;
              this._values.length--;
              if (SameValueZero(key, this._cacheKey)) {
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              return true;
            }
            return false;
          };
          Map3.prototype.clear = function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cacheKey = cacheSentinel;
            this._cacheIndex = -2;
          };
          Map3.prototype.keys = function() {
            return new MapIterator(this._keys, this._values, getKey);
          };
          Map3.prototype.values = function() {
            return new MapIterator(this._keys, this._values, getValue2);
          };
          Map3.prototype.entries = function() {
            return new MapIterator(this._keys, this._values, getEntry);
          };
          Map3.prototype["@@iterator"] = function() {
            return this.entries();
          };
          Map3.prototype[iteratorSymbol] = function() {
            return this.entries();
          };
          Map3.prototype._find = function(key, insert) {
            if (!SameValueZero(this._cacheKey, key)) {
              this._cacheIndex = -1;
              for (var i = 0; i < this._keys.length; i++) {
                if (SameValueZero(this._keys[i], key)) {
                  this._cacheIndex = i;
                  break;
                }
              }
            }
            if (this._cacheIndex < 0 && insert) {
              this._cacheIndex = this._keys.length;
              this._keys.push(key);
              this._values.push(void 0);
            }
            return this._cacheIndex;
          };
          return Map3;
        }();
        return Map2;
        function getKey(key, _) {
          return key;
        }
        function getValue2(_, value) {
          return value;
        }
        function getEntry(key, value) {
          return [
            key,
            value
          ];
        }
      }
      function CreateSetPolyfill() {
        var Set2 = function() {
          function Set3() {
            this._map = new _Map2();
          }
          Object.defineProperty(Set3.prototype, "size", {
            get: function() {
              return this._map.size;
            },
            enumerable: true,
            configurable: true
          });
          Set3.prototype.has = function(value) {
            return this._map.has(value);
          };
          Set3.prototype.add = function(value) {
            return this._map.set(value, value), this;
          };
          Set3.prototype.delete = function(value) {
            return this._map.delete(value);
          };
          Set3.prototype.clear = function() {
            this._map.clear();
          };
          Set3.prototype.keys = function() {
            return this._map.keys();
          };
          Set3.prototype.values = function() {
            return this._map.keys();
          };
          Set3.prototype.entries = function() {
            return this._map.entries();
          };
          Set3.prototype["@@iterator"] = function() {
            return this.keys();
          };
          Set3.prototype[iteratorSymbol] = function() {
            return this.keys();
          };
          return Set3;
        }();
        return Set2;
      }
      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys2 = HashMap.create();
        var rootKey = CreateUniqueKey();
        return function() {
          function WeakMap2() {
            this._key = CreateUniqueKey();
          }
          WeakMap2.prototype.has = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== void 0 ? HashMap.has(table, this._key) : false;
          };
          WeakMap2.prototype.get = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== void 0 ? HashMap.get(table, this._key) : void 0;
          };
          WeakMap2.prototype.set = function(target, value) {
            var table = GetOrCreateWeakMapTable(target, true);
            table[this._key] = value;
            return this;
          };
          WeakMap2.prototype.delete = function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            return table !== void 0 ? delete table[this._key] : false;
          };
          WeakMap2.prototype.clear = function() {
            this._key = CreateUniqueKey();
          };
          return WeakMap2;
        }();
        function CreateUniqueKey() {
          var key;
          do
            key = "@@WeakMap@@" + CreateUUID();
          while (HashMap.has(keys2, key));
          keys2[key] = true;
          return key;
        }
        function GetOrCreateWeakMapTable(target, create2) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create2) return void 0;
            Object.defineProperty(target, rootKey, {
              value: HashMap.create()
            });
          }
          return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
          for (var i = 0; i < size; ++i) buffer[i] = Math.random() * 255 | 0;
          return buffer;
        }
        function GenRandomBytes(size) {
          if (typeof Uint8Array === "function") {
            var array2 = new Uint8Array(size);
            if (typeof crypto !== "undefined") {
              crypto.getRandomValues(array2);
            } else if (typeof msCrypto !== "undefined") {
              msCrypto.getRandomValues(array2);
            } else {
              FillRandomBytes(array2, size);
            }
            return array2;
          }
          return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          data[6] = data[6] & 79 | 64;
          data[8] = data[8] & 191 | 128;
          var result = "";
          for (var offset = 0; offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8) result += "-";
            if (byte < 16) result += "0";
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
      }
      function MakeDictionary(obj) {
        obj.__ = void 0;
        delete obj.__;
        return obj;
      }
    });
  })(Reflect || (Reflect = {}));
  global = globalThis || void 0 || self;
  if (typeof window !== "undefined") {
    window.Buffer = Buffer$1$1;
  }
  if (typeof global !== "undefined" && typeof require !== "undefined") {
    global.Buffer = require("buffer/").Buffer;
  }
  class ObjectUtils {
    static isObject(val) {
      return val !== null && typeof val === "object";
    }
    static isObjectWithName(val) {
      return val !== null && typeof val === "object" && val["name"] !== void 0;
    }
    static assign(target, ...sources) {
      for (const source of sources) {
        for (const prop of Object.getOwnPropertyNames(source)) {
          target[prop] = source[prop];
        }
      }
    }
    static mixedListToArray(list) {
      if (list !== null && typeof list === "object") {
        return Object.keys(list).map((key) => list[key]);
      } else {
        return list;
      }
    }
  }
  class TypeORMError extends Error {
    get name() {
      return this.constructor.name;
    }
    constructor(message) {
      super(message);
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(this, new.target.prototype);
      } else {
        this.__proto__ = new.target.prototype;
      }
    }
  }
  class LockNotSupportedOnGivenDriverError extends TypeORMError {
    constructor() {
      super(`Locking not supported on given driver.`);
    }
  }
  class UpdateValuesMissingError extends TypeORMError {
    constructor() {
      super(`Cannot perform update query because update values are not defined. Call "qb.set(...)" method to specify updated values.`);
    }
  }
  class InstanceChecker {
    static isMssqlParameter(obj) {
      return this.check(obj, "MssqlParameter");
    }
    static isEntityMetadata(obj) {
      return this.check(obj, "EntityMetadata");
    }
    static isColumnMetadata(obj) {
      return this.check(obj, "ColumnMetadata");
    }
    static isSelectQueryBuilder(obj) {
      return this.check(obj, "SelectQueryBuilder");
    }
    static isInsertQueryBuilder(obj) {
      return this.check(obj, "InsertQueryBuilder");
    }
    static isDeleteQueryBuilder(obj) {
      return this.check(obj, "DeleteQueryBuilder");
    }
    static isUpdateQueryBuilder(obj) {
      return this.check(obj, "UpdateQueryBuilder");
    }
    static isSoftDeleteQueryBuilder(obj) {
      return this.check(obj, "SoftDeleteQueryBuilder");
    }
    static isRelationQueryBuilder(obj) {
      return this.check(obj, "RelationQueryBuilder");
    }
    static isBrackets(obj) {
      return this.check(obj, "Brackets") || this.check(obj, "NotBrackets");
    }
    static isNotBrackets(obj) {
      return this.check(obj, "NotBrackets");
    }
    static isSubject(obj) {
      return this.check(obj, "Subject");
    }
    static isRdbmsSchemaBuilder(obj) {
      return this.check(obj, "RdbmsSchemaBuilder");
    }
    static isMongoEntityManager(obj) {
      return this.check(obj, "MongoEntityManager");
    }
    static isSqljsEntityManager(obj) {
      return this.check(obj, "SqljsEntityManager");
    }
    static isEntitySchema(obj) {
      return this.check(obj, "EntitySchema");
    }
    static isBaseEntityConstructor(obj) {
      return typeof obj === "function" && typeof obj.hasId === "function" && typeof obj.save === "function" && typeof obj.useDataSource === "function";
    }
    static isFindOperator(obj) {
      return this.check(obj, "FindOperator") || this.check(obj, "EqualOperator");
    }
    static isEqualOperator(obj) {
      return this.check(obj, "EqualOperator");
    }
    static isQuery(obj) {
      return this.check(obj, "Query");
    }
    static isTable(obj) {
      return this.check(obj, "Table");
    }
    static isTableCheck(obj) {
      return this.check(obj, "TableCheck");
    }
    static isTableColumn(obj) {
      return this.check(obj, "TableColumn");
    }
    static isTableExclusion(obj) {
      return this.check(obj, "TableExclusion");
    }
    static isTableForeignKey(obj) {
      return this.check(obj, "TableForeignKey");
    }
    static isTableIndex(obj) {
      return this.check(obj, "TableIndex");
    }
    static isTableUnique(obj) {
      return this.check(obj, "TableUnique");
    }
    static isView(obj) {
      return this.check(obj, "View");
    }
    static isDataSource(obj) {
      return this.check(obj, "DataSource");
    }
    static check(obj, name) {
      return typeof obj === "object" && obj !== null && obj["@instanceof"] === Symbol.for(name);
    }
  }
  class EntityNotFoundError extends TypeORMError {
    constructor(entityClass, criteria) {
      super();
      this.entityClass = entityClass;
      this.criteria = criteria;
      this.message = `Could not find any entity of type "${this.stringifyTarget(entityClass)}" matching: ${this.stringifyCriteria(criteria)}`;
    }
    stringifyTarget(target) {
      if (InstanceChecker.isEntitySchema(target)) {
        return target.options.name;
      } else if (typeof target === "function") {
        return target.name;
      } else if (ObjectUtils.isObject(target) && "name" in target) {
        return target.name;
      } else {
        return target;
      }
    }
    stringifyCriteria(criteria) {
      try {
        return JSON.stringify(criteria, null, 4);
      } catch (e2) {
      }
      return "" + criteria;
    }
  }
  class OptimisticLockVersionMismatchError extends TypeORMError {
    constructor(entity, expectedVersion, actualVersion) {
      super(`The optimistic lock on entity ${entity} failed, version ${expectedVersion} was expected, but is actually ${actualVersion}.`);
    }
  }
  class LimitOnUpdateNotSupportedError extends TypeORMError {
    constructor() {
      super(`Your database does not support LIMIT on UPDATE statements.`);
    }
  }
  class MissingDeleteDateColumnError extends TypeORMError {
    constructor(entityMetadata) {
      super(`Entity "${entityMetadata.name}" does not have delete date columns.`);
    }
  }
  class ReturningStatementNotSupportedError extends TypeORMError {
    constructor() {
      super(`OUTPUT or RETURNING clause only supported by Microsoft SQL Server or PostgreSQL or MariaDB databases.`);
    }
  }
  class EntityPropertyNotFoundError extends TypeORMError {
    constructor(propertyPath, metadata) {
      super(propertyPath);
      Object.setPrototypeOf(this, EntityPropertyNotFoundError.prototype);
      this.message = `Property "${propertyPath}" was not found in "${metadata.targetName}". Make sure your query is correct.`;
    }
  }
  class NoVersionOrUpdateDateColumnError extends TypeORMError {
    constructor(entity) {
      super(`Entity ${entity} does not have version or update date columns.`);
    }
  }
  class InsertValuesMissingError extends TypeORMError {
    constructor() {
      super(`Cannot perform insert query because values are not defined. Call "qb.values(...)" method to specify inserted values.`);
    }
  }
  class OptimisticLockCanNotBeUsedError extends TypeORMError {
    constructor() {
      super(`The optimistic lock can be used only with getOne() method.`);
    }
  }
  class FindRelationsNotFoundError extends TypeORMError {
    constructor(notFoundRelations) {
      super();
      if (notFoundRelations.length === 1) {
        this.message = `Relation "${notFoundRelations[0]}" was not found; please check if it is correct and really exists in your entity.`;
      } else {
        this.message = `Relations ${notFoundRelations.map((relation) => `"${relation}"`).join(", ")} were not found; please check if relations are correct and they exist in your entities.`;
      }
    }
  }
  class PessimisticLockTransactionRequiredError extends TypeORMError {
    constructor() {
      super(`An open transaction is required for pessimistic lock.`);
    }
  }
  class OffsetWithoutLimitNotSupportedError extends TypeORMError {
    constructor() {
      super(`RDBMS does not support OFFSET without LIMIT in SELECT statements. You must use limit in conjunction with offset function (or take in conjunction with skip function if you are using pagination).`);
    }
  }
  class Alias {
    constructor(alias) {
      ObjectUtils.assign(this, alias || {});
    }
    get target() {
      return this.metadata.target;
    }
    get hasMetadata() {
      return !!this._metadata;
    }
    set metadata(metadata) {
      this._metadata = metadata;
    }
    get metadata() {
      if (!this._metadata) throw new TypeORMError(`Cannot get entity metadata for the given alias "${this.name}"`);
      return this._metadata;
    }
  }
  class QueryBuilderUtils {
    static isAliasProperty(str) {
      if (typeof str !== "string" || str.indexOf(".") === -1) return false;
      const [aliasName, propertyName] = str.split(".");
      if (!aliasName || !propertyName) return false;
      if (str.indexOf("(") !== -1 || str.indexOf(")") !== -1) return false;
      return true;
    }
  }
  var sha_js = {
    exports: {}
  };
  var inherits_browser = {
    exports: {}
  };
  if (typeof Object.create === "function") {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    inherits_browser.exports = function inherits2(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  var inherits_browserExports = inherits_browser.exports;
  var safeBuffer = {
    exports: {}
  };
  (function(module, exports2) {
    var buffer = require$$0;
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  })(safeBuffer, safeBuffer.exports);
  var safeBufferExports = safeBuffer.exports;
  var Buffer$6 = safeBufferExports.Buffer;
  function Hash$6(blockSize, finalSize) {
    this._block = Buffer$6.alloc(blockSize);
    this._finalSize = finalSize;
    this._blockSize = blockSize;
    this._len = 0;
  }
  Hash$6.prototype.update = function(data, enc) {
    if (typeof data === "string") {
      enc = enc || "utf8";
      data = Buffer$6.from(data, enc);
    }
    var block = this._block;
    var blockSize = this._blockSize;
    var length = data.length;
    var accum = this._len;
    for (var offset = 0; offset < length; ) {
      var assigned = accum % blockSize;
      var remainder = Math.min(length - offset, blockSize - assigned);
      for (var i = 0; i < remainder; i++) {
        block[assigned + i] = data[offset + i];
      }
      accum += remainder;
      offset += remainder;
      if (accum % blockSize === 0) {
        this._update(block);
      }
    }
    this._len += length;
    return this;
  };
  Hash$6.prototype.digest = function(enc) {
    var rem = this._len % this._blockSize;
    this._block[rem] = 128;
    this._block.fill(0, rem + 1);
    if (rem >= this._finalSize) {
      this._update(this._block);
      this._block.fill(0);
    }
    var bits = this._len * 8;
    if (bits <= 4294967295) {
      this._block.writeUInt32BE(bits, this._blockSize - 4);
    } else {
      var lowBits = (bits & 4294967295) >>> 0;
      var highBits = (bits - lowBits) / 4294967296;
      this._block.writeUInt32BE(highBits, this._blockSize - 8);
      this._block.writeUInt32BE(lowBits, this._blockSize - 4);
    }
    this._update(this._block);
    var hash2 = this._hash();
    return enc ? hash2.toString(enc) : hash2;
  };
  Hash$6.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  };
  var hash$1 = Hash$6;
  var inherits$5 = inherits_browserExports;
  var Hash$5 = hash$1;
  var Buffer$5 = safeBufferExports.Buffer;
  var K$3 = [
    1518500249,
    1859775393,
    2400959708 | 0,
    3395469782 | 0
  ];
  var W$5 = new Array(80);
  function Sha() {
    this.init();
    this._w = W$5;
    Hash$5.call(this, 64, 56);
  }
  inherits$5(Sha, Hash$5);
  Sha.prototype.init = function() {
    this._a = 1732584193;
    this._b = 4023233417;
    this._c = 2562383102;
    this._d = 271733878;
    this._e = 3285377520;
    return this;
  };
  function rotl5$1(num) {
    return num << 5 | num >>> 27;
  }
  function rotl30$1(num) {
    return num << 30 | num >>> 2;
  }
  function ft$1(s, b, c, d) {
    if (s === 0) return b & c | ~b & d;
    if (s === 2) return b & c | b & d | c & d;
    return b ^ c ^ d;
  }
  Sha.prototype._update = function(M) {
    var W2 = this._w;
    var a = this._a | 0;
    var b = this._b | 0;
    var c = this._c | 0;
    var d = this._d | 0;
    var e2 = this._e | 0;
    for (var i = 0; i < 16; ++i) W2[i] = M.readInt32BE(i * 4);
    for (; i < 80; ++i) W2[i] = W2[i - 3] ^ W2[i - 8] ^ W2[i - 14] ^ W2[i - 16];
    for (var j = 0; j < 80; ++j) {
      var s = ~~(j / 20);
      var t2 = rotl5$1(a) + ft$1(s, b, c, d) + e2 + W2[j] + K$3[s] | 0;
      e2 = d;
      d = c;
      c = rotl30$1(b);
      b = a;
      a = t2;
    }
    this._a = a + this._a | 0;
    this._b = b + this._b | 0;
    this._c = c + this._c | 0;
    this._d = d + this._d | 0;
    this._e = e2 + this._e | 0;
  };
  Sha.prototype._hash = function() {
    var H = Buffer$5.allocUnsafe(20);
    H.writeInt32BE(this._a | 0, 0);
    H.writeInt32BE(this._b | 0, 4);
    H.writeInt32BE(this._c | 0, 8);
    H.writeInt32BE(this._d | 0, 12);
    H.writeInt32BE(this._e | 0, 16);
    return H;
  };
  var sha = Sha;
  var inherits$4 = inherits_browserExports;
  var Hash$4 = hash$1;
  var Buffer$4 = safeBufferExports.Buffer;
  var K$2 = [
    1518500249,
    1859775393,
    2400959708 | 0,
    3395469782 | 0
  ];
  var W$4 = new Array(80);
  function Sha1() {
    this.init();
    this._w = W$4;
    Hash$4.call(this, 64, 56);
  }
  inherits$4(Sha1, Hash$4);
  Sha1.prototype.init = function() {
    this._a = 1732584193;
    this._b = 4023233417;
    this._c = 2562383102;
    this._d = 271733878;
    this._e = 3285377520;
    return this;
  };
  function rotl1(num) {
    return num << 1 | num >>> 31;
  }
  function rotl5(num) {
    return num << 5 | num >>> 27;
  }
  function rotl30(num) {
    return num << 30 | num >>> 2;
  }
  function ft(s, b, c, d) {
    if (s === 0) return b & c | ~b & d;
    if (s === 2) return b & c | b & d | c & d;
    return b ^ c ^ d;
  }
  Sha1.prototype._update = function(M) {
    var W2 = this._w;
    var a = this._a | 0;
    var b = this._b | 0;
    var c = this._c | 0;
    var d = this._d | 0;
    var e2 = this._e | 0;
    for (var i = 0; i < 16; ++i) W2[i] = M.readInt32BE(i * 4);
    for (; i < 80; ++i) W2[i] = rotl1(W2[i - 3] ^ W2[i - 8] ^ W2[i - 14] ^ W2[i - 16]);
    for (var j = 0; j < 80; ++j) {
      var s = ~~(j / 20);
      var t2 = rotl5(a) + ft(s, b, c, d) + e2 + W2[j] + K$2[s] | 0;
      e2 = d;
      d = c;
      c = rotl30(b);
      b = a;
      a = t2;
    }
    this._a = a + this._a | 0;
    this._b = b + this._b | 0;
    this._c = c + this._c | 0;
    this._d = d + this._d | 0;
    this._e = e2 + this._e | 0;
  };
  Sha1.prototype._hash = function() {
    var H = Buffer$4.allocUnsafe(20);
    H.writeInt32BE(this._a | 0, 0);
    H.writeInt32BE(this._b | 0, 4);
    H.writeInt32BE(this._c | 0, 8);
    H.writeInt32BE(this._d | 0, 12);
    H.writeInt32BE(this._e | 0, 16);
    return H;
  };
  var sha1 = Sha1;
  var inherits$3 = inherits_browserExports;
  var Hash$3 = hash$1;
  var Buffer$3 = safeBufferExports.Buffer;
  var K$1 = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  var W$3 = new Array(64);
  function Sha256$1() {
    this.init();
    this._w = W$3;
    Hash$3.call(this, 64, 56);
  }
  inherits$3(Sha256$1, Hash$3);
  Sha256$1.prototype.init = function() {
    this._a = 1779033703;
    this._b = 3144134277;
    this._c = 1013904242;
    this._d = 2773480762;
    this._e = 1359893119;
    this._f = 2600822924;
    this._g = 528734635;
    this._h = 1541459225;
    return this;
  };
  function ch(x, y, z) {
    return z ^ x & (y ^ z);
  }
  function maj$1(x, y, z) {
    return x & y | z & (x | y);
  }
  function sigma0$1(x) {
    return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
  }
  function sigma1$1(x) {
    return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
  }
  function gamma0(x) {
    return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
  }
  function gamma1(x) {
    return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
  }
  Sha256$1.prototype._update = function(M) {
    var W2 = this._w;
    var a = this._a | 0;
    var b = this._b | 0;
    var c = this._c | 0;
    var d = this._d | 0;
    var e2 = this._e | 0;
    var f = this._f | 0;
    var g = this._g | 0;
    var h2 = this._h | 0;
    for (var i = 0; i < 16; ++i) W2[i] = M.readInt32BE(i * 4);
    for (; i < 64; ++i) W2[i] = gamma1(W2[i - 2]) + W2[i - 7] + gamma0(W2[i - 15]) + W2[i - 16] | 0;
    for (var j = 0; j < 64; ++j) {
      var T1 = h2 + sigma1$1(e2) + ch(e2, f, g) + K$1[j] + W2[j] | 0;
      var T2 = sigma0$1(a) + maj$1(a, b, c) | 0;
      h2 = g;
      g = f;
      f = e2;
      e2 = d + T1 | 0;
      d = c;
      c = b;
      b = a;
      a = T1 + T2 | 0;
    }
    this._a = a + this._a | 0;
    this._b = b + this._b | 0;
    this._c = c + this._c | 0;
    this._d = d + this._d | 0;
    this._e = e2 + this._e | 0;
    this._f = f + this._f | 0;
    this._g = g + this._g | 0;
    this._h = h2 + this._h | 0;
  };
  Sha256$1.prototype._hash = function() {
    var H = Buffer$3.allocUnsafe(32);
    H.writeInt32BE(this._a, 0);
    H.writeInt32BE(this._b, 4);
    H.writeInt32BE(this._c, 8);
    H.writeInt32BE(this._d, 12);
    H.writeInt32BE(this._e, 16);
    H.writeInt32BE(this._f, 20);
    H.writeInt32BE(this._g, 24);
    H.writeInt32BE(this._h, 28);
    return H;
  };
  var sha256 = Sha256$1;
  var inherits$2 = inherits_browserExports;
  var Sha256 = sha256;
  var Hash$2 = hash$1;
  var Buffer$2 = safeBufferExports.Buffer;
  var W$2 = new Array(64);
  function Sha224() {
    this.init();
    this._w = W$2;
    Hash$2.call(this, 64, 56);
  }
  inherits$2(Sha224, Sha256);
  Sha224.prototype.init = function() {
    this._a = 3238371032;
    this._b = 914150663;
    this._c = 812702999;
    this._d = 4144912697;
    this._e = 4290775857;
    this._f = 1750603025;
    this._g = 1694076839;
    this._h = 3204075428;
    return this;
  };
  Sha224.prototype._hash = function() {
    var H = Buffer$2.allocUnsafe(28);
    H.writeInt32BE(this._a, 0);
    H.writeInt32BE(this._b, 4);
    H.writeInt32BE(this._c, 8);
    H.writeInt32BE(this._d, 12);
    H.writeInt32BE(this._e, 16);
    H.writeInt32BE(this._f, 20);
    H.writeInt32BE(this._g, 24);
    return H;
  };
  var sha224 = Sha224;
  var inherits$1 = inherits_browserExports;
  var Hash$1 = hash$1;
  var Buffer$1 = safeBufferExports.Buffer;
  var K = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  var W$1 = new Array(160);
  function Sha512() {
    this.init();
    this._w = W$1;
    Hash$1.call(this, 128, 112);
  }
  inherits$1(Sha512, Hash$1);
  Sha512.prototype.init = function() {
    this._ah = 1779033703;
    this._bh = 3144134277;
    this._ch = 1013904242;
    this._dh = 2773480762;
    this._eh = 1359893119;
    this._fh = 2600822924;
    this._gh = 528734635;
    this._hh = 1541459225;
    this._al = 4089235720;
    this._bl = 2227873595;
    this._cl = 4271175723;
    this._dl = 1595750129;
    this._el = 2917565137;
    this._fl = 725511199;
    this._gl = 4215389547;
    this._hl = 327033209;
    return this;
  };
  function Ch(x, y, z) {
    return z ^ x & (y ^ z);
  }
  function maj(x, y, z) {
    return x & y | z & (x | y);
  }
  function sigma0(x, xl) {
    return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25);
  }
  function sigma1(x, xl) {
    return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23);
  }
  function Gamma0(x, xl) {
    return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ x >>> 7;
  }
  function Gamma0l(x, xl) {
    return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25);
  }
  function Gamma1(x, xl) {
    return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ x >>> 6;
  }
  function Gamma1l(x, xl) {
    return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26);
  }
  function getCarry(a, b) {
    return a >>> 0 < b >>> 0 ? 1 : 0;
  }
  Sha512.prototype._update = function(M) {
    var W2 = this._w;
    var ah = this._ah | 0;
    var bh = this._bh | 0;
    var ch2 = this._ch | 0;
    var dh = this._dh | 0;
    var eh = this._eh | 0;
    var fh = this._fh | 0;
    var gh = this._gh | 0;
    var hh = this._hh | 0;
    var al = this._al | 0;
    var bl = this._bl | 0;
    var cl = this._cl | 0;
    var dl = this._dl | 0;
    var el = this._el | 0;
    var fl = this._fl | 0;
    var gl = this._gl | 0;
    var hl = this._hl | 0;
    for (var i = 0; i < 32; i += 2) {
      W2[i] = M.readInt32BE(i * 4);
      W2[i + 1] = M.readInt32BE(i * 4 + 4);
    }
    for (; i < 160; i += 2) {
      var xh = W2[i - 15 * 2];
      var xl = W2[i - 15 * 2 + 1];
      var gamma02 = Gamma0(xh, xl);
      var gamma0l = Gamma0l(xl, xh);
      xh = W2[i - 2 * 2];
      xl = W2[i - 2 * 2 + 1];
      var gamma12 = Gamma1(xh, xl);
      var gamma1l = Gamma1l(xl, xh);
      var Wi7h = W2[i - 7 * 2];
      var Wi7l = W2[i - 7 * 2 + 1];
      var Wi16h = W2[i - 16 * 2];
      var Wi16l = W2[i - 16 * 2 + 1];
      var Wil = gamma0l + Wi7l | 0;
      var Wih = gamma02 + Wi7h + getCarry(Wil, gamma0l) | 0;
      Wil = Wil + gamma1l | 0;
      Wih = Wih + gamma12 + getCarry(Wil, gamma1l) | 0;
      Wil = Wil + Wi16l | 0;
      Wih = Wih + Wi16h + getCarry(Wil, Wi16l) | 0;
      W2[i] = Wih;
      W2[i + 1] = Wil;
    }
    for (var j = 0; j < 160; j += 2) {
      Wih = W2[j];
      Wil = W2[j + 1];
      var majh = maj(ah, bh, ch2);
      var majl = maj(al, bl, cl);
      var sigma0h = sigma0(ah, al);
      var sigma0l = sigma0(al, ah);
      var sigma1h = sigma1(eh, el);
      var sigma1l = sigma1(el, eh);
      var Kih = K[j];
      var Kil = K[j + 1];
      var chh = Ch(eh, fh, gh);
      var chl = Ch(el, fl, gl);
      var t1l = hl + sigma1l | 0;
      var t1h = hh + sigma1h + getCarry(t1l, hl) | 0;
      t1l = t1l + chl | 0;
      t1h = t1h + chh + getCarry(t1l, chl) | 0;
      t1l = t1l + Kil | 0;
      t1h = t1h + Kih + getCarry(t1l, Kil) | 0;
      t1l = t1l + Wil | 0;
      t1h = t1h + Wih + getCarry(t1l, Wil) | 0;
      var t2l = sigma0l + majl | 0;
      var t2h = sigma0h + majh + getCarry(t2l, sigma0l) | 0;
      hh = gh;
      hl = gl;
      gh = fh;
      gl = fl;
      fh = eh;
      fl = el;
      el = dl + t1l | 0;
      eh = dh + t1h + getCarry(el, dl) | 0;
      dh = ch2;
      dl = cl;
      ch2 = bh;
      cl = bl;
      bh = ah;
      bl = al;
      al = t1l + t2l | 0;
      ah = t1h + t2h + getCarry(al, t1l) | 0;
    }
    this._al = this._al + al | 0;
    this._bl = this._bl + bl | 0;
    this._cl = this._cl + cl | 0;
    this._dl = this._dl + dl | 0;
    this._el = this._el + el | 0;
    this._fl = this._fl + fl | 0;
    this._gl = this._gl + gl | 0;
    this._hl = this._hl + hl | 0;
    this._ah = this._ah + ah + getCarry(this._al, al) | 0;
    this._bh = this._bh + bh + getCarry(this._bl, bl) | 0;
    this._ch = this._ch + ch2 + getCarry(this._cl, cl) | 0;
    this._dh = this._dh + dh + getCarry(this._dl, dl) | 0;
    this._eh = this._eh + eh + getCarry(this._el, el) | 0;
    this._fh = this._fh + fh + getCarry(this._fl, fl) | 0;
    this._gh = this._gh + gh + getCarry(this._gl, gl) | 0;
    this._hh = this._hh + hh + getCarry(this._hl, hl) | 0;
  };
  Sha512.prototype._hash = function() {
    var H = Buffer$1.allocUnsafe(64);
    function writeInt64BE(h2, l2, offset) {
      H.writeInt32BE(h2, offset);
      H.writeInt32BE(l2, offset + 4);
    }
    writeInt64BE(this._ah, this._al, 0);
    writeInt64BE(this._bh, this._bl, 8);
    writeInt64BE(this._ch, this._cl, 16);
    writeInt64BE(this._dh, this._dl, 24);
    writeInt64BE(this._eh, this._el, 32);
    writeInt64BE(this._fh, this._fl, 40);
    writeInt64BE(this._gh, this._gl, 48);
    writeInt64BE(this._hh, this._hl, 56);
    return H;
  };
  var sha512 = Sha512;
  var inherits = inherits_browserExports;
  var SHA512 = sha512;
  var Hash = hash$1;
  var Buffer = safeBufferExports.Buffer;
  var W = new Array(160);
  function Sha384() {
    this.init();
    this._w = W;
    Hash.call(this, 128, 112);
  }
  inherits(Sha384, SHA512);
  Sha384.prototype.init = function() {
    this._ah = 3418070365;
    this._bh = 1654270250;
    this._ch = 2438529370;
    this._dh = 355462360;
    this._eh = 1731405415;
    this._fh = 2394180231;
    this._gh = 3675008525;
    this._hh = 1203062813;
    this._al = 3238371032;
    this._bl = 914150663;
    this._cl = 812702999;
    this._dl = 4144912697;
    this._el = 4290775857;
    this._fl = 1750603025;
    this._gl = 1694076839;
    this._hl = 3204075428;
    return this;
  };
  Sha384.prototype._hash = function() {
    var H = Buffer.allocUnsafe(48);
    function writeInt64BE(h2, l2, offset) {
      H.writeInt32BE(h2, offset);
      H.writeInt32BE(l2, offset + 4);
    }
    writeInt64BE(this._ah, this._al, 0);
    writeInt64BE(this._bh, this._bl, 8);
    writeInt64BE(this._ch, this._cl, 16);
    writeInt64BE(this._dh, this._dl, 24);
    writeInt64BE(this._eh, this._el, 32);
    writeInt64BE(this._fh, this._fl, 40);
    return H;
  };
  var sha384 = Sha384;
  var exports = sha_js.exports = function SHA(algorithm) {
    algorithm = algorithm.toLowerCase();
    var Algorithm = exports[algorithm];
    if (!Algorithm) throw new Error(algorithm + " is not supported (we accept pull requests)");
    return new Algorithm();
  };
  exports.sha = sha;
  exports.sha1 = sha1;
  exports.sha224 = sha224;
  exports.sha256 = sha256;
  exports.sha384 = sha384;
  exports.sha512 = sha512;
  var sha_jsExports = sha_js.exports;
  const shajs = getDefaultExportFromCjs(sha_jsExports);
  function shorten(input, options = {}) {
    const { segmentLength = 4, separator = "__", termLength = 2 } = options;
    const segments = input.split(separator);
    const shortSegments = segments.reduce((acc, val) => {
      const segmentTerms = val.replace(/([a-z\xE0-\xFF])([A-Z\xC0-\xDF])/g, "$1 $2").split(" ");
      const length = segmentTerms.length > 1 ? termLength : segmentLength;
      const shortSegment = segmentTerms.map((term) => term.substr(0, length)).join("");
      acc.push(shortSegment);
      return acc;
    }, []);
    return shortSegments.join(separator);
  }
  function hash(input, options = {}) {
    const hashFunction = shajs("sha1");
    hashFunction.update(input, "utf8");
    const hashedInput = hashFunction.digest("hex");
    if (options.length) {
      return hashedInput.slice(0, options.length);
    }
    return hashedInput;
  }
  class VersionUtils {
    static isGreaterOrEqual(version, targetVersion) {
      const v1 = parseVersion(version);
      const v2 = parseVersion(targetVersion);
      return v1[0] > v2[0] || v1[0] === v2[0] && v1[1] > v2[1] || v1[0] === v2[0] && v1[1] === v2[1] && v1[2] >= v2[2];
    }
  }
  function parseVersion(version = "") {
    const v2 = [
      0,
      0,
      0
    ];
    version.split(".").forEach((value, i) => v2[i] = parseInt(value, 10));
    return v2;
  }
  class DriverUtils {
    static isSQLiteFamily(driver) {
      return [
        "sqlite",
        "cordova",
        "react-native",
        "nativescript",
        "sqljs",
        "expo",
        "better-sqlite3",
        "capacitor"
      ].includes(driver.options.type);
    }
    static isMySQLFamily(driver) {
      return [
        "mysql",
        "mariadb"
      ].includes(driver.options.type);
    }
    static isReleaseVersionOrGreater(driver, version) {
      return driver.version != null && VersionUtils.isGreaterOrEqual(driver.version, version);
    }
    static isPostgresFamily(driver) {
      return [
        "postgres",
        "aurora-postgres",
        "cockroachdb"
      ].includes(driver.options.type);
    }
    static buildDriverOptions(options, buildOptions) {
      if (options.url) {
        const urlDriverOptions = this.parseConnectionUrl(options.url);
        if (buildOptions && buildOptions.useSid && urlDriverOptions.database) {
          urlDriverOptions.sid = urlDriverOptions.database;
        }
        for (const key of Object.keys(urlDriverOptions)) {
          if (typeof urlDriverOptions[key] === "undefined") {
            delete urlDriverOptions[key];
          }
        }
        return Object.assign({}, options, urlDriverOptions);
      }
      return Object.assign({}, options);
    }
    static buildMongoDBDriverOptions(options, buildOptions) {
      if (options.url) {
        const urlDriverOptions = this.parseMongoDBConnectionUrl(options.url);
        if (buildOptions && buildOptions.useSid && urlDriverOptions.database) {
          urlDriverOptions.sid = urlDriverOptions.database;
        }
        for (const key of Object.keys(urlDriverOptions)) {
          if (typeof urlDriverOptions[key] === "undefined") {
            delete urlDriverOptions[key];
          }
        }
        return Object.assign({}, options, urlDriverOptions);
      }
      return Object.assign({}, options);
    }
    static buildAlias({ maxAliasLength }, buildOptions, ...alias) {
      const joiner = buildOptions && buildOptions.joiner ? buildOptions.joiner : "_";
      let newAlias = alias.length === 1 ? alias[0] : alias.join(joiner);
      if (maxAliasLength && maxAliasLength > 0 && newAlias.length > maxAliasLength) {
        if (buildOptions && buildOptions.shorten === true) {
          const shortenedAlias = shorten(newAlias);
          if (shortenedAlias.length < maxAliasLength) {
            return shortenedAlias;
          }
        }
        return hash(newAlias, {
          length: maxAliasLength
        });
      }
      return newAlias;
    }
    static buildColumnAlias({ maxAliasLength }, buildOptions, ...alias) {
      if (typeof buildOptions === "string") {
        alias.unshift(buildOptions);
        buildOptions = {
          shorten: false,
          joiner: "_"
        };
      } else {
        buildOptions = Object.assign({
          shorten: false,
          joiner: "_"
        }, buildOptions);
      }
      return this.buildAlias({
        maxAliasLength
      }, buildOptions, ...alias);
    }
    static parseConnectionUrl(url) {
      const type = url.split(":")[0];
      const firstSlashes = url.indexOf("//");
      const preBase = url.substr(firstSlashes + 2);
      const secondSlash = preBase.indexOf("/");
      const base = secondSlash !== -1 ? preBase.substr(0, secondSlash) : preBase;
      let afterBase = secondSlash !== -1 ? preBase.substr(secondSlash + 1) : void 0;
      if (afterBase && afterBase.indexOf("?") !== -1) {
        afterBase = afterBase.substr(0, afterBase.indexOf("?"));
      }
      const lastAtSign = base.lastIndexOf("@");
      const usernameAndPassword = base.substr(0, lastAtSign);
      const hostAndPort = base.substr(lastAtSign + 1);
      let username = usernameAndPassword;
      let password = "";
      const firstColon = usernameAndPassword.indexOf(":");
      if (firstColon !== -1) {
        username = usernameAndPassword.substr(0, firstColon);
        password = usernameAndPassword.substr(firstColon + 1);
      }
      const [host, port] = hostAndPort.split(":");
      return {
        type,
        host,
        username: decodeURIComponent(username),
        password: decodeURIComponent(password),
        port: port ? parseInt(port) : void 0,
        database: afterBase || void 0
      };
    }
    static parseMongoDBConnectionUrl(url) {
      const type = url.split(":")[0];
      const firstSlashes = url.indexOf("//");
      const preBase = url.substr(firstSlashes + 2);
      const secondSlash = preBase.indexOf("/");
      const base = secondSlash !== -1 ? preBase.substr(0, secondSlash) : preBase;
      let afterBase = secondSlash !== -1 ? preBase.substr(secondSlash + 1) : void 0;
      let afterQuestionMark = "";
      let host = void 0;
      let port = void 0;
      let hostReplicaSet = void 0;
      let replicaSet = void 0;
      let optionsObject = {};
      if (afterBase && afterBase.indexOf("?") !== -1) {
        afterQuestionMark = afterBase.substr(afterBase.indexOf("?") + 1, afterBase.length);
        const optionsList = afterQuestionMark.split("&");
        let optionKey;
        let optionValue;
        optionsList.forEach((optionItem) => {
          optionKey = optionItem.split("=")[0];
          optionValue = optionItem.split("=")[1];
          optionsObject[optionKey] = optionValue;
        });
        replicaSet = optionsObject["replicaSet"];
        afterBase = afterBase.substr(0, afterBase.indexOf("?"));
      }
      const lastAtSign = base.lastIndexOf("@");
      const usernameAndPassword = base.substr(0, lastAtSign);
      const hostAndPort = base.substr(lastAtSign + 1);
      let username = usernameAndPassword;
      let password = "";
      const firstColon = usernameAndPassword.indexOf(":");
      if (firstColon !== -1) {
        username = usernameAndPassword.substr(0, firstColon);
        password = usernameAndPassword.substr(firstColon + 1);
      }
      if (replicaSet) {
        hostReplicaSet = hostAndPort;
      } else {
        [host, port] = hostAndPort.split(":");
      }
      let connectionUrl = {
        type,
        host,
        hostReplicaSet,
        username: decodeURIComponent(username),
        password: decodeURIComponent(password),
        port: port ? parseInt(port) : void 0,
        database: afterBase || void 0
      };
      for (const [key, value] of Object.entries(optionsObject)) {
        connectionUrl[key] = value;
      }
      return connectionUrl;
    }
  }
  class JoinAttribute {
    constructor(connection, queryExpressionMap, joinAttribute) {
      this.connection = connection;
      this.queryExpressionMap = queryExpressionMap;
      this.isSelectedEvaluated = false;
      this.relationEvaluated = false;
      if (joinAttribute) {
        ObjectUtils.assign(this, joinAttribute);
      }
    }
    get isMany() {
      if (this.isMappingMany !== void 0) return this.isMappingMany;
      if (this.relation) return this.relation.isManyToMany || this.relation.isOneToMany;
      return false;
    }
    get isSelected() {
      if (!this.isSelectedEvaluated) {
        let getValue2 = () => {
          for (const select2 of this.queryExpressionMap.selects) {
            if (select2.selection === this.alias.name) return true;
            if (this.metadata && !!this.metadata.columns.find((column) => select2.selection === this.alias.name + "." + column.propertyPath)) return true;
          }
          return false;
        };
        this.isSelectedCache = getValue2();
        this.isSelectedEvaluated = true;
      }
      return this.isSelectedCache;
    }
    get tablePath() {
      return this.metadata ? this.metadata.tablePath : this.entityOrProperty;
    }
    get parentAlias() {
      if (!QueryBuilderUtils.isAliasProperty(this.entityOrProperty)) return void 0;
      return this.entityOrProperty.substr(0, this.entityOrProperty.indexOf("."));
    }
    get relationPropertyPath() {
      if (!QueryBuilderUtils.isAliasProperty(this.entityOrProperty)) return void 0;
      return this.entityOrProperty.substr(this.entityOrProperty.indexOf(".") + 1);
    }
    get relation() {
      if (!this.relationEvaluated) {
        let getValue2 = () => {
          if (!QueryBuilderUtils.isAliasProperty(this.entityOrProperty)) return void 0;
          const relationOwnerSelection = this.queryExpressionMap.findAliasByName(this.parentAlias);
          let relation = relationOwnerSelection.metadata.findRelationWithPropertyPath(this.relationPropertyPath);
          if (relation) {
            return relation;
          }
          if (relationOwnerSelection.metadata.parentEntityMetadata) {
            relation = relationOwnerSelection.metadata.parentEntityMetadata.findRelationWithPropertyPath(this.relationPropertyPath);
            if (relation) {
              return relation;
            }
          }
          throw new TypeORMError(`Relation with property path ${this.relationPropertyPath} in entity was not found.`);
        };
        this.relationCache = getValue2.bind(this)();
        this.relationEvaluated = true;
      }
      return this.relationCache;
    }
    get metadata() {
      if (this.relation) return this.relation.inverseEntityMetadata;
      if (this.connection.hasMetadata(this.entityOrProperty)) return this.connection.getMetadata(this.entityOrProperty);
      if (this.mapAsEntity && this.connection.hasMetadata(this.mapAsEntity)) {
        return this.connection.getMetadata(this.mapAsEntity);
      }
      return void 0;
    }
    get junctionAlias() {
      if (!this.relation) {
        throw new TypeORMError(`Cannot get junction table for join without relation.`);
      }
      if (typeof this.entityOrProperty !== "string") {
        throw new TypeORMError(`Junction property is not defined.`);
      }
      const aliasProperty = this.entityOrProperty.substr(0, this.entityOrProperty.indexOf("."));
      if (this.relation.isOwning) {
        return DriverUtils.buildAlias(this.connection.driver, void 0, aliasProperty, this.alias.name);
      } else {
        return DriverUtils.buildAlias(this.connection.driver, void 0, this.alias.name, aliasProperty);
      }
    }
    get mapToPropertyParentAlias() {
      if (!this.mapToProperty) return void 0;
      return this.mapToProperty.split(".")[0];
    }
    get mapToPropertyPropertyName() {
      if (!this.mapToProperty) return void 0;
      return this.mapToProperty.split(".")[1];
    }
  }
  class RelationIdAttribute {
    constructor(queryExpressionMap, relationIdAttribute) {
      this.queryExpressionMap = queryExpressionMap;
      this.disableMixedMap = false;
      ObjectUtils.assign(this, relationIdAttribute || {});
    }
    get joinInverseSideMetadata() {
      return this.relation.inverseEntityMetadata;
    }
    get parentAlias() {
      if (!QueryBuilderUtils.isAliasProperty(this.relationName)) throw new TypeORMError(`Given value must be a string representation of alias property`);
      return this.relationName.substr(0, this.relationName.indexOf("."));
    }
    get relationPropertyPath() {
      if (!QueryBuilderUtils.isAliasProperty(this.relationName)) throw new TypeORMError(`Given value must be a string representation of alias property`);
      return this.relationName.substr(this.relationName.indexOf(".") + 1);
    }
    get relation() {
      if (!QueryBuilderUtils.isAliasProperty(this.relationName)) throw new TypeORMError(`Given value must be a string representation of alias property`);
      const relationOwnerSelection = this.queryExpressionMap.findAliasByName(this.parentAlias);
      const relation = relationOwnerSelection.metadata.findRelationWithPropertyPath(this.relationPropertyPath);
      if (!relation) throw new TypeORMError(`Relation with property path ${this.relationPropertyPath} in entity was not found.`);
      return relation;
    }
    get junctionAlias() {
      const [parentAlias, relationProperty] = this.relationName.split(".");
      return parentAlias + "_" + relationProperty + "_rid";
    }
    get junctionMetadata() {
      return this.relation.junctionEntityMetadata;
    }
    get mapToPropertyParentAlias() {
      return this.mapToProperty.substr(0, this.mapToProperty.indexOf("."));
    }
    get mapToPropertyPropertyPath() {
      return this.mapToProperty.substr(this.mapToProperty.indexOf(".") + 1);
    }
  }
  class RelationCountAttribute {
    constructor(expressionMap, relationCountAttribute) {
      this.expressionMap = expressionMap;
      ObjectUtils.assign(this, relationCountAttribute || {});
    }
    get joinInverseSideMetadata() {
      return this.relation.inverseEntityMetadata;
    }
    get parentAlias() {
      if (!QueryBuilderUtils.isAliasProperty(this.relationName)) throw new TypeORMError(`Given value must be a string representation of alias property`);
      return this.relationName.split(".")[0];
    }
    get relationProperty() {
      if (!QueryBuilderUtils.isAliasProperty(this.relationName)) throw new TypeORMError(`Given value is a string representation of alias property`);
      return this.relationName.split(".")[1];
    }
    get junctionAlias() {
      const [parentAlias, relationProperty] = this.relationName.split(".");
      return parentAlias + "_" + relationProperty + "_rc";
    }
    get relation() {
      if (!QueryBuilderUtils.isAliasProperty(this.relationName)) throw new TypeORMError(`Given value is a string representation of alias property`);
      const [parentAlias, propertyPath] = this.relationName.split(".");
      const relationOwnerSelection = this.expressionMap.findAliasByName(parentAlias);
      const relation = relationOwnerSelection.metadata.findRelationWithPropertyPath(propertyPath);
      if (!relation) throw new TypeORMError(`Relation with property path ${propertyPath} in entity was not found.`);
      return relation;
    }
    get metadata() {
      if (!QueryBuilderUtils.isAliasProperty(this.relationName)) throw new TypeORMError(`Given value is a string representation of alias property`);
      const parentAlias = this.relationName.split(".")[0];
      const selection2 = this.expressionMap.findAliasByName(parentAlias);
      return selection2.metadata;
    }
    get mapToPropertyPropertyName() {
      return this.mapToProperty.split(".")[1];
    }
  }
  class QueryExpressionMap {
    constructor(connection) {
      var _a;
      this.connection = connection;
      this.relationLoadStrategy = "join";
      this.queryEntity = false;
      this.aliases = [];
      this.queryType = "select";
      this.selects = [];
      this.maxExecutionTime = 0;
      this.selectDistinct = false;
      this.selectDistinctOn = [];
      this.extraReturningColumns = [];
      this.onConflict = "";
      this.onIgnore = false;
      this.joinAttributes = [];
      this.relationIdAttributes = [];
      this.relationCountAttributes = [];
      this.wheres = [];
      this.havings = [];
      this.orderBys = {};
      this.groupBys = [];
      this.withDeleted = false;
      this.parameters = {};
      this.disableEscaping = true;
      this.enableRelationIdValues = false;
      this.extraAppendedAndWhereCondition = "";
      this.subQuery = false;
      this.aliasNamePrefixingEnabled = true;
      this.options = [];
      this.insertColumns = [];
      this.whereEntities = [];
      this.updateEntity = true;
      this.callListeners = true;
      this.useTransaction = false;
      this.nativeParameters = {};
      this.locallyGenerated = {};
      this.commonTableExpressions = [];
      if (connection.options.relationLoadStrategy) {
        this.relationLoadStrategy = connection.options.relationLoadStrategy;
      }
      this.timeTravel = ((_a = connection.options) == null ? void 0 : _a.timeTravelQueries) || false;
    }
    get allOrderBys() {
      if (!Object.keys(this.orderBys).length && this.mainAlias.hasMetadata && this.options.indexOf("disable-global-order") === -1) {
        const entityOrderBy = this.mainAlias.metadata.orderBy || {};
        return Object.keys(entityOrderBy).reduce((orderBy, key) => {
          orderBy[this.mainAlias.name + "." + key] = entityOrderBy[key];
          return orderBy;
        }, {});
      }
      return this.orderBys;
    }
    setMainAlias(alias) {
      this.mainAlias = alias;
      return alias;
    }
    createAlias(options) {
      let aliasName = options.name;
      if (!aliasName && options.tablePath) aliasName = options.tablePath;
      if (!aliasName && typeof options.target === "function") aliasName = options.target.name;
      if (!aliasName && typeof options.target === "string") aliasName = options.target;
      const alias = new Alias();
      alias.type = options.type;
      if (aliasName) alias.name = aliasName;
      if (options.metadata) alias.metadata = options.metadata;
      if (options.target && !alias.hasMetadata) alias.metadata = this.connection.getMetadata(options.target);
      if (options.tablePath) alias.tablePath = options.tablePath;
      if (options.subQuery) alias.subQuery = options.subQuery;
      this.aliases.push(alias);
      return alias;
    }
    findAliasByName(aliasName) {
      const alias = this.aliases.find((alias2) => alias2.name === aliasName);
      if (!alias) throw new TypeORMError(`"${aliasName}" alias was not found. Maybe you forgot to join it?`);
      return alias;
    }
    findColumnByAliasExpression(aliasExpression) {
      const [aliasName, propertyPath] = aliasExpression.split(".");
      const alias = this.findAliasByName(aliasName);
      return alias.metadata.findColumnWithPropertyName(propertyPath);
    }
    get relationMetadata() {
      if (!this.mainAlias) throw new TypeORMError(`Entity to work with is not specified!`);
      const relationMetadata = this.mainAlias.metadata.findRelationWithPropertyPath(this.relationPropertyPath);
      if (!relationMetadata) throw new TypeORMError(`Relation ${this.relationPropertyPath} was not found in entity ${this.mainAlias.name}`);
      return relationMetadata;
    }
    clone() {
      const map = new QueryExpressionMap(this.connection);
      map.queryType = this.queryType;
      map.selects = this.selects.map((select2) => select2);
      map.maxExecutionTime = this.maxExecutionTime;
      map.selectDistinct = this.selectDistinct;
      map.selectDistinctOn = this.selectDistinctOn;
      this.aliases.forEach((alias) => map.aliases.push(new Alias(alias)));
      map.relationLoadStrategy = this.relationLoadStrategy;
      map.mainAlias = this.mainAlias;
      map.valuesSet = this.valuesSet;
      map.returning = this.returning;
      map.onConflict = this.onConflict;
      map.onIgnore = this.onIgnore;
      map.onUpdate = this.onUpdate;
      map.joinAttributes = this.joinAttributes.map((join) => new JoinAttribute(this.connection, this, join));
      map.relationIdAttributes = this.relationIdAttributes.map((relationId) => new RelationIdAttribute(this, relationId));
      map.relationCountAttributes = this.relationCountAttributes.map((relationCount) => new RelationCountAttribute(this, relationCount));
      map.wheres = this.wheres.map((where) => ({
        ...where
      }));
      map.havings = this.havings.map((having) => ({
        ...having
      }));
      map.orderBys = Object.assign({}, this.orderBys);
      map.groupBys = this.groupBys.map((groupBy) => groupBy);
      map.limit = this.limit;
      map.offset = this.offset;
      map.skip = this.skip;
      map.take = this.take;
      map.lockMode = this.lockMode;
      map.onLocked = this.onLocked;
      map.lockVersion = this.lockVersion;
      map.lockTables = this.lockTables;
      map.withDeleted = this.withDeleted;
      map.parameters = Object.assign({}, this.parameters);
      map.disableEscaping = this.disableEscaping;
      map.enableRelationIdValues = this.enableRelationIdValues;
      map.extraAppendedAndWhereCondition = this.extraAppendedAndWhereCondition;
      map.subQuery = this.subQuery;
      map.aliasNamePrefixingEnabled = this.aliasNamePrefixingEnabled;
      map.cache = this.cache;
      map.cacheId = this.cacheId;
      map.cacheDuration = this.cacheDuration;
      map.relationPropertyPath = this.relationPropertyPath;
      map.of = this.of;
      map.insertColumns = this.insertColumns;
      map.whereEntities = this.whereEntities;
      map.updateEntity = this.updateEntity;
      map.callListeners = this.callListeners;
      map.useTransaction = this.useTransaction;
      map.timeTravel = this.timeTravel;
      map.nativeParameters = Object.assign({}, this.nativeParameters);
      map.comment = this.comment;
      map.commonTableExpressions = this.commonTableExpressions.map((cteOptions) => ({
        alias: cteOptions.alias,
        queryBuilder: typeof cteOptions.queryBuilder === "string" ? cteOptions.queryBuilder : cteOptions.queryBuilder.clone(),
        options: cteOptions.options
      }));
      return map;
    }
  }
  class Brackets {
    constructor(whereFactory) {
      this["@instanceof"] = Symbol.for("Brackets");
      this.whereFactory = whereFactory;
    }
  }
  class ApplyValueTransformers {
    static transformFrom(transformer, databaseValue) {
      if (Array.isArray(transformer)) {
        const reverseTransformers = transformer.slice().reverse();
        return reverseTransformers.reduce((transformedValue, _transformer) => {
          return _transformer.from(transformedValue);
        }, databaseValue);
      }
      return transformer.from(databaseValue);
    }
    static transformTo(transformer, entityValue) {
      if (Array.isArray(transformer)) {
        return transformer.reduce((transformedValue, _transformer) => {
          return _transformer.to(transformedValue);
        }, entityValue);
      }
      return transformer.to(entityValue);
    }
  }
  class FindOperator {
    constructor(type, value, useParameter = true, multipleParameters = false, getSql, objectLiteralParameters) {
      this["@instanceof"] = Symbol.for("FindOperator");
      this._type = type;
      this._value = value;
      this._useParameter = useParameter;
      this._multipleParameters = multipleParameters;
      this._getSql = getSql;
      this._objectLiteralParameters = objectLiteralParameters;
    }
    get useParameter() {
      if (InstanceChecker.isFindOperator(this._value)) return this._value.useParameter;
      return this._useParameter;
    }
    get multipleParameters() {
      if (InstanceChecker.isFindOperator(this._value)) return this._value.multipleParameters;
      return this._multipleParameters;
    }
    get type() {
      return this._type;
    }
    get value() {
      if (InstanceChecker.isFindOperator(this._value)) return this._value.value;
      return this._value;
    }
    get objectLiteralParameters() {
      if (InstanceChecker.isFindOperator(this._value)) return this._value.objectLiteralParameters;
      return this._objectLiteralParameters;
    }
    get child() {
      if (InstanceChecker.isFindOperator(this._value)) return this._value;
      return void 0;
    }
    get getSql() {
      if (InstanceChecker.isFindOperator(this._value)) return this._value.getSql;
      return this._getSql;
    }
    transformValue(transformer) {
      if (this._value instanceof FindOperator) {
        this._value.transformValue(transformer);
      } else {
        this._value = Array.isArray(this._value) && this._multipleParameters ? this._value.map((v2) => transformer && ApplyValueTransformers.transformTo(transformer, v2)) : ApplyValueTransformers.transformTo(transformer, this._value);
      }
    }
  }
  In = function(value) {
    return new FindOperator("in", value, true, true);
  };
  const ESCAPE_REGEXP = /[.*+\-?^${}()|[\]\\]/g;
  const escapeRegExp$1 = (s) => s.replace(ESCAPE_REGEXP, "\\$&");
  class QueryBuilder {
    constructor(connectionOrQueryBuilder, queryRunner) {
      this["@instanceof"] = Symbol.for("QueryBuilder");
      this.parameterIndex = 0;
      if (InstanceChecker.isDataSource(connectionOrQueryBuilder)) {
        this.connection = connectionOrQueryBuilder;
        this.queryRunner = queryRunner;
        this.expressionMap = new QueryExpressionMap(this.connection);
      } else {
        this.connection = connectionOrQueryBuilder.connection;
        this.queryRunner = connectionOrQueryBuilder.queryRunner;
        this.expressionMap = connectionOrQueryBuilder.expressionMap.clone();
      }
    }
    static registerQueryBuilderClass(name, factory) {
      QueryBuilder.queryBuilderRegistry[name] = factory;
    }
    get alias() {
      if (!this.expressionMap.mainAlias) throw new TypeORMError(`Main alias is not set`);
      return this.expressionMap.mainAlias.name;
    }
    select(selection2, selectionAliasName) {
      this.expressionMap.queryType = "select";
      if (Array.isArray(selection2)) {
        this.expressionMap.selects = selection2.map((selection3) => ({
          selection: selection3
        }));
      } else if (selection2) {
        this.expressionMap.selects = [
          {
            selection: selection2,
            aliasName: selectionAliasName
          }
        ];
      }
      if (InstanceChecker.isSelectQueryBuilder(this)) return this;
      return QueryBuilder.queryBuilderRegistry["SelectQueryBuilder"](this);
    }
    insert() {
      this.expressionMap.queryType = "insert";
      if (InstanceChecker.isInsertQueryBuilder(this)) return this;
      return QueryBuilder.queryBuilderRegistry["InsertQueryBuilder"](this);
    }
    update(entityOrTableNameUpdateSet, maybeUpdateSet) {
      const updateSet = maybeUpdateSet ? maybeUpdateSet : entityOrTableNameUpdateSet;
      entityOrTableNameUpdateSet = InstanceChecker.isEntitySchema(entityOrTableNameUpdateSet) ? entityOrTableNameUpdateSet.options.name : entityOrTableNameUpdateSet;
      if (typeof entityOrTableNameUpdateSet === "function" || typeof entityOrTableNameUpdateSet === "string") {
        const mainAlias = this.createFromAlias(entityOrTableNameUpdateSet);
        this.expressionMap.setMainAlias(mainAlias);
      }
      this.expressionMap.queryType = "update";
      this.expressionMap.valuesSet = updateSet;
      if (InstanceChecker.isUpdateQueryBuilder(this)) return this;
      return QueryBuilder.queryBuilderRegistry["UpdateQueryBuilder"](this);
    }
    delete() {
      this.expressionMap.queryType = "delete";
      if (InstanceChecker.isDeleteQueryBuilder(this)) return this;
      return QueryBuilder.queryBuilderRegistry["DeleteQueryBuilder"](this);
    }
    softDelete() {
      this.expressionMap.queryType = "soft-delete";
      if (InstanceChecker.isSoftDeleteQueryBuilder(this)) return this;
      return QueryBuilder.queryBuilderRegistry["SoftDeleteQueryBuilder"](this);
    }
    restore() {
      this.expressionMap.queryType = "restore";
      if (InstanceChecker.isSoftDeleteQueryBuilder(this)) return this;
      return QueryBuilder.queryBuilderRegistry["SoftDeleteQueryBuilder"](this);
    }
    relation(entityTargetOrPropertyPath, maybePropertyPath) {
      const entityTarget = arguments.length === 2 ? entityTargetOrPropertyPath : void 0;
      const propertyPath = arguments.length === 2 ? maybePropertyPath : entityTargetOrPropertyPath;
      this.expressionMap.queryType = "relation";
      this.expressionMap.relationPropertyPath = propertyPath;
      if (entityTarget) {
        const mainAlias = this.createFromAlias(entityTarget);
        this.expressionMap.setMainAlias(mainAlias);
      }
      if (InstanceChecker.isRelationQueryBuilder(this)) return this;
      return QueryBuilder.queryBuilderRegistry["RelationQueryBuilder"](this);
    }
    hasRelation(target, relation) {
      const entityMetadata = this.connection.getMetadata(target);
      const relations = Array.isArray(relation) ? relation : [
        relation
      ];
      return relations.every((relation2) => {
        return !!entityMetadata.findRelationWithPropertyPath(relation2);
      });
    }
    hasParameter(key) {
      var _a;
      return ((_a = this.parentQueryBuilder) == null ? void 0 : _a.hasParameter(key)) || key in this.expressionMap.parameters;
    }
    setParameter(key, value) {
      if (typeof value === "function") {
        throw new TypeORMError(`Function parameter isn't supported in the parameters. Please check "${key}" parameter.`);
      }
      if (!key.match(/^([A-Za-z0-9_.]+)$/)) {
        throw new TypeORMError("QueryBuilder parameter keys may only contain numbers, letters, underscores, or periods.");
      }
      if (this.parentQueryBuilder) {
        this.parentQueryBuilder.setParameter(key, value);
      }
      this.expressionMap.parameters[key] = value;
      return this;
    }
    setParameters(parameters) {
      for (const [key, value] of Object.entries(parameters)) {
        this.setParameter(key, value);
      }
      return this;
    }
    createParameter(value) {
      let parameterName;
      do {
        parameterName = `orm_param_${this.parameterIndex++}`;
      } while (this.hasParameter(parameterName));
      this.setParameter(parameterName, value);
      return `:${parameterName}`;
    }
    setNativeParameters(parameters) {
      if (this.parentQueryBuilder) {
        this.parentQueryBuilder.setNativeParameters(parameters);
      }
      Object.keys(parameters).forEach((key) => {
        this.expressionMap.nativeParameters[key] = parameters[key];
      });
      return this;
    }
    getParameters() {
      const parameters = Object.assign({}, this.expressionMap.parameters);
      if (this.expressionMap.mainAlias && this.expressionMap.mainAlias.hasMetadata) {
        const metadata = this.expressionMap.mainAlias.metadata;
        if (metadata.discriminatorColumn && metadata.parentEntityMetadata) {
          const values = metadata.childEntityMetadatas.filter((childMetadata) => childMetadata.discriminatorColumn).map((childMetadata) => childMetadata.discriminatorValue);
          values.push(metadata.discriminatorValue);
          parameters["discriminatorColumnValues"] = values;
        }
      }
      return parameters;
    }
    printSql() {
      const [query, parameters] = this.getQueryAndParameters();
      this.connection.logger.logQuery(query, parameters);
      return this;
    }
    getSql() {
      return this.getQueryAndParameters()[0];
    }
    getQueryAndParameters() {
      const query = this.getQuery();
      const parameters = this.getParameters();
      return this.connection.driver.escapeQueryWithParameters(query, parameters, this.expressionMap.nativeParameters);
    }
    async execute() {
      const [sql, parameters] = this.getQueryAndParameters();
      const queryRunner = this.obtainQueryRunner();
      try {
        return await queryRunner.query(sql, parameters);
      } finally {
        if (queryRunner !== this.queryRunner) {
          await queryRunner.release();
        }
      }
    }
    createQueryBuilder(queryRunner) {
      return new this.constructor(this.connection, queryRunner ?? this.queryRunner);
    }
    clone() {
      return new this.constructor(this);
    }
    comment(comment) {
      this.expressionMap.comment = comment;
      return this;
    }
    disableEscaping() {
      this.expressionMap.disableEscaping = false;
      return this;
    }
    escape(name) {
      if (!this.expressionMap.disableEscaping) return name;
      return this.connection.driver.escape(name);
    }
    setQueryRunner(queryRunner) {
      this.queryRunner = queryRunner;
      return this;
    }
    callListeners(enabled) {
      this.expressionMap.callListeners = enabled;
      return this;
    }
    useTransaction(enabled) {
      this.expressionMap.useTransaction = enabled;
      return this;
    }
    addCommonTableExpression(queryBuilder, alias, options) {
      this.expressionMap.commonTableExpressions.push({
        queryBuilder,
        alias,
        options: options || {}
      });
      return this;
    }
    getTableName(tablePath) {
      return tablePath.split(".").map((i) => {
        if (i === "") return i;
        return this.escape(i);
      }).join(".");
    }
    getMainTableName() {
      if (!this.expressionMap.mainAlias) throw new TypeORMError(`Entity where values should be inserted is not specified. Call "qb.into(entity)" method to specify it.`);
      if (this.expressionMap.mainAlias.hasMetadata) return this.expressionMap.mainAlias.metadata.tablePath;
      return this.expressionMap.mainAlias.tablePath;
    }
    createFromAlias(entityTarget, aliasName) {
      if (this.connection.hasMetadata(entityTarget)) {
        const metadata = this.connection.getMetadata(entityTarget);
        return this.expressionMap.createAlias({
          type: "from",
          name: aliasName,
          metadata: this.connection.getMetadata(entityTarget),
          tablePath: metadata.tablePath
        });
      } else {
        if (typeof entityTarget === "string") {
          const isSubquery = entityTarget.substr(0, 1) === "(" && entityTarget.substr(-1) === ")";
          return this.expressionMap.createAlias({
            type: "from",
            name: aliasName,
            tablePath: !isSubquery ? entityTarget : void 0,
            subQuery: isSubquery ? entityTarget : void 0
          });
        }
        const subQueryBuilder = entityTarget(this.subQuery());
        this.setParameters(subQueryBuilder.getParameters());
        const subquery = subQueryBuilder.getQuery();
        return this.expressionMap.createAlias({
          type: "from",
          name: aliasName,
          subQuery: subquery
        });
      }
    }
    replacePropertyNames(statement) {
      return statement;
    }
    replacePropertyNamesForTheWholeQuery(statement) {
      const replacements = {};
      for (const alias of this.expressionMap.aliases) {
        if (!alias.hasMetadata) continue;
        const replaceAliasNamePrefix = this.expressionMap.aliasNamePrefixingEnabled && alias.name ? `${alias.name}.` : "";
        if (!replacements[replaceAliasNamePrefix]) {
          replacements[replaceAliasNamePrefix] = {};
        }
        for (const relation of alias.metadata.relations) {
          if (relation.joinColumns.length > 0) replacements[replaceAliasNamePrefix][relation.propertyPath] = relation.joinColumns[0].databaseName;
        }
        for (const relation of alias.metadata.relations) {
          const allColumns = [
            ...relation.joinColumns,
            ...relation.inverseJoinColumns
          ];
          for (const joinColumn of allColumns) {
            const propertyKey = `${relation.propertyPath}.${joinColumn.referencedColumn.propertyPath}`;
            replacements[replaceAliasNamePrefix][propertyKey] = joinColumn.databaseName;
          }
        }
        for (const column of alias.metadata.columns) {
          replacements[replaceAliasNamePrefix][column.databaseName] = column.databaseName;
        }
        for (const column of alias.metadata.columns) {
          replacements[replaceAliasNamePrefix][column.propertyName] = column.databaseName;
        }
        for (const column of alias.metadata.columns) {
          replacements[replaceAliasNamePrefix][column.propertyPath] = column.databaseName;
        }
      }
      const replacementKeys = Object.keys(replacements);
      const replaceAliasNamePrefixes = replacementKeys.map((key) => escapeRegExp$1(key)).join("|");
      if (replacementKeys.length > 0) {
        statement = statement.replace(new RegExp(`([ =(]|^.{0})${replaceAliasNamePrefixes ? "(" + replaceAliasNamePrefixes + ")" : ""}([^ =(),]+)(?=[ =),]|.{0}$)`, "gm"), (...matches) => {
          let match, pre, p2;
          if (replaceAliasNamePrefixes) {
            match = matches[0];
            pre = matches[1];
            p2 = matches[3];
            if (replacements[matches[2]][p2]) {
              return `${pre}${this.escape(matches[2].substring(0, matches[2].length - 1))}.${this.escape(replacements[matches[2]][p2])}`;
            }
          } else {
            match = matches[0];
            pre = matches[1];
            p2 = matches[2];
            if (replacements[""][p2]) {
              return `${pre}${this.escape(replacements[""][p2])}`;
            }
          }
          return match;
        });
      }
      return statement;
    }
    createComment() {
      if (!this.expressionMap.comment) {
        return "";
      }
      return `/* ${this.expressionMap.comment.replace(/\*\//g, "")} */ `;
    }
    createTimeTravelQuery() {
      if (this.expressionMap.queryType === "select" && this.expressionMap.timeTravel) {
        return ` AS OF SYSTEM TIME ${this.expressionMap.timeTravel}`;
      }
      return "";
    }
    createWhereExpression() {
      const conditionsArray = [];
      const whereExpression = this.createWhereClausesExpression(this.expressionMap.wheres);
      if (whereExpression.length > 0 && whereExpression !== "1=1") {
        conditionsArray.push(this.replacePropertyNames(whereExpression));
      }
      if (this.expressionMap.mainAlias.hasMetadata) {
        const metadata = this.expressionMap.mainAlias.metadata;
        if (this.expressionMap.queryType === "select" && !this.expressionMap.withDeleted && metadata.deleteDateColumn) {
          const column = this.expressionMap.aliasNamePrefixingEnabled ? this.expressionMap.mainAlias.name + "." + metadata.deleteDateColumn.propertyName : metadata.deleteDateColumn.propertyName;
          const condition2 = `${this.replacePropertyNames(column)} IS NULL`;
          conditionsArray.push(condition2);
        }
        if (metadata.discriminatorColumn && metadata.parentEntityMetadata) {
          const column = this.expressionMap.aliasNamePrefixingEnabled ? this.expressionMap.mainAlias.name + "." + metadata.discriminatorColumn.databaseName : metadata.discriminatorColumn.databaseName;
          const condition2 = `${this.replacePropertyNames(column)} IN (:...discriminatorColumnValues)`;
          conditionsArray.push(condition2);
        }
      }
      if (this.expressionMap.extraAppendedAndWhereCondition) {
        const condition2 = this.replacePropertyNames(this.expressionMap.extraAppendedAndWhereCondition);
        conditionsArray.push(condition2);
      }
      let condition = "";
      condition += this.createTimeTravelQuery();
      if (!conditionsArray.length) {
        condition += "";
      } else if (conditionsArray.length === 1) {
        condition += ` WHERE ${conditionsArray[0]}`;
      } else {
        condition += ` WHERE ( ${conditionsArray.join(" ) AND ( ")} )`;
      }
      return condition;
    }
    createReturningExpression(returningType) {
      const columns = this.getReturningColumns();
      const driver = this.connection.driver;
      if (typeof this.expressionMap.returning !== "string" && this.expressionMap.extraReturningColumns.length > 0 && driver.isReturningSqlSupported(returningType)) {
        columns.push(...this.expressionMap.extraReturningColumns.filter((column) => {
          return columns.indexOf(column) === -1;
        }));
      }
      if (columns.length) {
        let columnsExpression = columns.map((column) => {
          const name = this.escape(column.databaseName);
          if (driver.options.type === "mssql") {
            if (this.expressionMap.queryType === "insert" || this.expressionMap.queryType === "update" || this.expressionMap.queryType === "soft-delete" || this.expressionMap.queryType === "restore") {
              return "INSERTED." + name;
            } else {
              return this.escape(this.getMainTableName()) + "." + name;
            }
          } else {
            return name;
          }
        }).join(", ");
        if (driver.options.type === "oracle") {
          columnsExpression += " INTO " + columns.map((column) => {
            return this.createParameter({
              type: driver.columnTypeToNativeParameter(column.type),
              dir: driver.oracle.BIND_OUT
            });
          }).join(", ");
        }
        if (driver.options.type === "mssql") {
          if (this.expressionMap.queryType === "insert" || this.expressionMap.queryType === "update") {
            columnsExpression += " INTO @OutputTable";
          }
        }
        return columnsExpression;
      } else if (typeof this.expressionMap.returning === "string") {
        return this.expressionMap.returning;
      }
      return "";
    }
    getReturningColumns() {
      const columns = [];
      if (Array.isArray(this.expressionMap.returning)) {
        this.expressionMap.returning.forEach((columnName) => {
          if (this.expressionMap.mainAlias.hasMetadata) {
            columns.push(...this.expressionMap.mainAlias.metadata.findColumnsWithPropertyPath(columnName));
          }
        });
      }
      return columns;
    }
    createWhereClausesExpression(clauses) {
      return clauses.map((clause, index2) => {
        const expression = this.createWhereConditionExpression(clause.condition);
        switch (clause.type) {
          case "and":
            return (index2 > 0 ? "AND " : "") + `${this.connection.options.isolateWhereStatements ? "(" : ""}${expression}${this.connection.options.isolateWhereStatements ? ")" : ""}`;
          case "or":
            return (index2 > 0 ? "OR " : "") + `${this.connection.options.isolateWhereStatements ? "(" : ""}${expression}${this.connection.options.isolateWhereStatements ? ")" : ""}`;
        }
        return expression;
      }).join(" ").trim();
    }
    createWhereConditionExpression(condition, alwaysWrap = false) {
      if (typeof condition === "string") return condition;
      if (Array.isArray(condition)) {
        if (condition.length === 0) {
          return "1=1";
        }
        if (condition.length === 1 && !alwaysWrap) {
          return this.createWhereClausesExpression(condition);
        }
        return "(" + this.createWhereClausesExpression(condition) + ")";
      }
      const { driver } = this.connection;
      switch (condition.operator) {
        case "lessThan":
          return `${condition.parameters[0]} < ${condition.parameters[1]}`;
        case "lessThanOrEqual":
          return `${condition.parameters[0]} <= ${condition.parameters[1]}`;
        case "arrayContains":
          return `${condition.parameters[0]} @> ${condition.parameters[1]}`;
        case "jsonContains":
          return `${condition.parameters[0]} ::jsonb @> ${condition.parameters[1]}`;
        case "arrayContainedBy":
          return `${condition.parameters[0]} <@ ${condition.parameters[1]}`;
        case "arrayOverlap":
          return `${condition.parameters[0]} && ${condition.parameters[1]}`;
        case "moreThan":
          return `${condition.parameters[0]} > ${condition.parameters[1]}`;
        case "moreThanOrEqual":
          return `${condition.parameters[0]} >= ${condition.parameters[1]}`;
        case "notEqual":
          return `${condition.parameters[0]} != ${condition.parameters[1]}`;
        case "equal":
          return `${condition.parameters[0]} = ${condition.parameters[1]}`;
        case "ilike":
          if (driver.options.type === "postgres" || driver.options.type === "cockroachdb") {
            return `${condition.parameters[0]} ILIKE ${condition.parameters[1]}`;
          }
          return `UPPER(${condition.parameters[0]}) LIKE UPPER(${condition.parameters[1]})`;
        case "like":
          return `${condition.parameters[0]} LIKE ${condition.parameters[1]}`;
        case "between":
          return `${condition.parameters[0]} BETWEEN ${condition.parameters[1]} AND ${condition.parameters[2]}`;
        case "in":
          if (condition.parameters.length <= 1) {
            return "0=1";
          }
          return `${condition.parameters[0]} IN (${condition.parameters.slice(1).join(", ")})`;
        case "any":
          if (driver.options.type === "cockroachdb") {
            return `${condition.parameters[0]}::STRING = ANY(${condition.parameters[1]}::STRING[])`;
          }
          return `${condition.parameters[0]} = ANY(${condition.parameters[1]})`;
        case "isNull":
          return `${condition.parameters[0]} IS NULL`;
        case "not":
          return `NOT(${this.createWhereConditionExpression(condition.condition)})`;
        case "brackets":
          return `${this.createWhereConditionExpression(condition.condition, true)}`;
        case "and":
          return "(" + condition.parameters.join(" AND ") + ")";
        case "or":
          return "(" + condition.parameters.join(" OR ") + ")";
      }
      throw new TypeError(`Unsupported FindOperator ${FindOperator.constructor.name}`);
    }
    createCteExpression() {
      if (!this.hasCommonTableExpressions()) {
        return "";
      }
      const databaseRequireRecusiveHint = this.connection.driver.cteCapabilities.requiresRecursiveHint;
      const cteStrings = this.expressionMap.commonTableExpressions.map((cte) => {
        const cteBodyExpression = typeof cte.queryBuilder === "string" ? cte.queryBuilder : cte.queryBuilder.getQuery();
        if (typeof cte.queryBuilder !== "string") {
          if (cte.queryBuilder.hasCommonTableExpressions()) {
            throw new TypeORMError(`Nested CTEs aren't supported (CTE: ${cte.alias})`);
          }
          if (!this.connection.driver.cteCapabilities.writable && !InstanceChecker.isSelectQueryBuilder(cte.queryBuilder)) {
            throw new TypeORMError(`Only select queries are supported in CTEs in ${this.connection.options.type} (CTE: ${cte.alias})`);
          }
          this.setParameters(cte.queryBuilder.getParameters());
        }
        let cteHeader = this.escape(cte.alias);
        if (cte.options.columnNames) {
          const escapedColumnNames = cte.options.columnNames.map((column) => this.escape(column));
          if (InstanceChecker.isSelectQueryBuilder(cte.queryBuilder)) {
            if (cte.queryBuilder.expressionMap.selects.length && cte.options.columnNames.length !== cte.queryBuilder.expressionMap.selects.length) {
              throw new TypeORMError(`cte.options.columnNames length (${cte.options.columnNames.length}) doesn't match subquery select list length ${cte.queryBuilder.expressionMap.selects.length} (CTE: ${cte.alias})`);
            }
          }
          cteHeader += `(${escapedColumnNames.join(", ")})`;
        }
        const recursiveClause = cte.options.recursive && databaseRequireRecusiveHint ? "RECURSIVE" : "";
        let materializeClause = "";
        if (this.connection.driver.cteCapabilities.materializedHint && cte.options.materialized !== void 0) {
          materializeClause = cte.options.materialized ? "MATERIALIZED" : "NOT MATERIALIZED";
        }
        return [
          recursiveClause,
          cteHeader,
          "AS",
          materializeClause,
          `(${cteBodyExpression})`
        ].filter(Boolean).join(" ");
      });
      return "WITH " + cteStrings.join(", ") + " ";
    }
    getWhereInIdsCondition(ids) {
      const metadata = this.expressionMap.mainAlias.metadata;
      const normalized = (Array.isArray(ids) ? ids : [
        ids
      ]).map((id2) => metadata.ensureEntityIdMap(id2));
      if (!metadata.hasMultiplePrimaryKeys) {
        const primaryColumn = metadata.primaryColumns[0];
        if (!primaryColumn.transformer && !primaryColumn.relationMetadata && !primaryColumn.embeddedMetadata) {
          return {
            [primaryColumn.propertyName]: In(normalized.map((id2) => primaryColumn.getEntityValue(id2, false)))
          };
        }
      }
      return new Brackets((qb) => {
        for (const data of normalized) {
          qb.orWhere(new Brackets((qb2) => qb2.where(data)));
        }
      });
    }
    getExistsCondition(subQuery) {
      const query = subQuery.clone().orderBy().groupBy().offset(void 0).limit(void 0).skip(void 0).take(void 0).select("1").setOption("disable-global-order");
      return [
        `EXISTS (${query.getQuery()})`,
        query.getParameters()
      ];
    }
    findColumnsForPropertyPath(propertyPath) {
      let alias = this.expressionMap.mainAlias;
      const root2 = [];
      const propertyPathParts = propertyPath.split(".");
      while (propertyPathParts.length > 1) {
        const part = propertyPathParts[0];
        if (!(alias == null ? void 0 : alias.hasMetadata)) {
          break;
        }
        if (alias.metadata.hasEmbeddedWithPropertyPath(part)) {
          propertyPathParts.unshift(`${propertyPathParts.shift()}.${propertyPathParts.shift()}`);
          continue;
        }
        if (alias.metadata.hasRelationWithPropertyPath(part)) {
          const joinAttr = this.expressionMap.joinAttributes.find((joinAttr2) => joinAttr2.relationPropertyPath === part);
          if (!(joinAttr == null ? void 0 : joinAttr.alias)) {
            const fullRelationPath = root2.length > 0 ? `${root2.join(".")}.${part}` : part;
            throw new Error(`Cannot find alias for relation at ${fullRelationPath}`);
          }
          alias = joinAttr.alias;
          root2.push(...part.split("."));
          propertyPathParts.shift();
          continue;
        }
        break;
      }
      if (!alias) {
        throw new Error(`Cannot find alias for property ${propertyPath}`);
      }
      const aliasPropertyPath = propertyPathParts.join(".");
      const columns = alias.metadata.findColumnsWithPropertyPath(aliasPropertyPath);
      if (!columns.length) {
        throw new EntityPropertyNotFoundError(propertyPath, alias.metadata);
      }
      return [
        alias,
        root2,
        columns
      ];
    }
    createPropertyPath(metadata, entity, prefix = "") {
      const paths = [];
      for (const key of Object.keys(entity)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (entity[key] === null || typeof entity[key] !== "object" || InstanceChecker.isFindOperator(entity[key])) {
          paths.push(path);
          continue;
        }
        if (metadata.hasEmbeddedWithPropertyPath(path)) {
          const subPaths = this.createPropertyPath(metadata, entity[key], path);
          paths.push(...subPaths);
          continue;
        }
        if (metadata.hasRelationWithPropertyPath(path)) {
          const relation = metadata.findRelationWithPropertyPath(path);
          if (relation.relationType === "one-to-one" || relation.relationType === "many-to-one") {
            const joinColumns = relation.joinColumns.map((j) => j.referencedColumn).filter((j) => !!j);
            const hasAllJoinColumns = joinColumns.length > 0 && joinColumns.every((column) => column.getEntityValue(entity[key], false));
            if (hasAllJoinColumns) {
              paths.push(path);
              continue;
            }
          }
          if (relation.relationType === "one-to-many" || relation.relationType === "many-to-many") {
            throw new Error(`Cannot query across ${relation.relationType} for property ${path}`);
          }
          const primaryColumns = relation.inverseEntityMetadata.primaryColumns;
          const hasAllPrimaryKeys = primaryColumns.length > 0 && primaryColumns.every((column) => column.getEntityValue(entity[key], false));
          if (hasAllPrimaryKeys) {
            const subPaths2 = primaryColumns.map((column) => `${path}.${column.propertyPath}`);
            paths.push(...subPaths2);
            continue;
          }
          const subPaths = this.createPropertyPath(relation.inverseEntityMetadata, entity[key]).map((p2) => `${path}.${p2}`);
          paths.push(...subPaths);
          continue;
        }
        paths.push(path);
      }
      return paths;
    }
    *getPredicates(where) {
      if (this.expressionMap.mainAlias.hasMetadata) {
        const propertyPaths = this.createPropertyPath(this.expressionMap.mainAlias.metadata, where);
        for (const propertyPath of propertyPaths) {
          const [alias, aliasPropertyPath, columns] = this.findColumnsForPropertyPath(propertyPath);
          for (const column of columns) {
            let containedWhere = where;
            for (const part of aliasPropertyPath) {
              if (!containedWhere || !(part in containedWhere)) {
                containedWhere = {};
                break;
              }
              containedWhere = containedWhere[part];
            }
            const aliasPath = this.expressionMap.aliasNamePrefixingEnabled ? `${alias.name}.${column.propertyPath}` : column.propertyPath;
            const parameterValue = column.getEntityValue(containedWhere, true);
            yield [
              aliasPath,
              parameterValue
            ];
          }
        }
      } else {
        for (const key of Object.keys(where)) {
          const parameterValue = where[key];
          const aliasPath = this.expressionMap.aliasNamePrefixingEnabled ? `${this.alias}.${key}` : key;
          yield [
            aliasPath,
            parameterValue
          ];
        }
      }
    }
    getWherePredicateCondition(aliasPath, parameterValue) {
      if (InstanceChecker.isFindOperator(parameterValue)) {
        let parameters = [];
        if (parameterValue.useParameter) {
          if (parameterValue.objectLiteralParameters) {
            this.setParameters(parameterValue.objectLiteralParameters);
          } else if (parameterValue.multipleParameters) {
            for (const v2 of parameterValue.value) {
              parameters.push(this.createParameter(v2));
            }
          } else {
            parameters.push(this.createParameter(parameterValue.value));
          }
        }
        if (parameterValue.type === "raw") {
          if (parameterValue.getSql) {
            return parameterValue.getSql(aliasPath);
          } else {
            return {
              operator: "equal",
              parameters: [
                aliasPath,
                parameterValue.value
              ]
            };
          }
        } else if (parameterValue.type === "not") {
          if (parameterValue.child) {
            return {
              operator: parameterValue.type,
              condition: this.getWherePredicateCondition(aliasPath, parameterValue.child)
            };
          } else {
            return {
              operator: "notEqual",
              parameters: [
                aliasPath,
                ...parameters
              ]
            };
          }
        } else if (parameterValue.type === "and") {
          const values = parameterValue.value;
          return {
            operator: parameterValue.type,
            parameters: values.map((operator) => this.createWhereConditionExpression(this.getWherePredicateCondition(aliasPath, operator)))
          };
        } else if (parameterValue.type === "or") {
          const values = parameterValue.value;
          return {
            operator: parameterValue.type,
            parameters: values.map((operator) => this.createWhereConditionExpression(this.getWherePredicateCondition(aliasPath, operator)))
          };
        } else {
          return {
            operator: parameterValue.type,
            parameters: [
              aliasPath,
              ...parameters
            ]
          };
        }
      } else {
        return {
          operator: "equal",
          parameters: [
            aliasPath,
            this.createParameter(parameterValue)
          ]
        };
      }
    }
    getWhereCondition(where) {
      if (typeof where === "string") {
        return where;
      }
      if (InstanceChecker.isBrackets(where)) {
        const whereQueryBuilder = this.createQueryBuilder();
        whereQueryBuilder.parentQueryBuilder = this;
        whereQueryBuilder.expressionMap.mainAlias = this.expressionMap.mainAlias;
        whereQueryBuilder.expressionMap.aliasNamePrefixingEnabled = this.expressionMap.aliasNamePrefixingEnabled;
        whereQueryBuilder.expressionMap.parameters = this.expressionMap.parameters;
        whereQueryBuilder.expressionMap.nativeParameters = this.expressionMap.nativeParameters;
        whereQueryBuilder.expressionMap.wheres = [];
        where.whereFactory(whereQueryBuilder);
        return {
          operator: InstanceChecker.isNotBrackets(where) ? "not" : "brackets",
          condition: whereQueryBuilder.expressionMap.wheres
        };
      }
      if (typeof where === "function") {
        return where(this);
      }
      const wheres = Array.isArray(where) ? where : [
        where
      ];
      const clauses = [];
      for (const where2 of wheres) {
        const conditions = [];
        for (const [aliasPath, parameterValue] of this.getPredicates(where2)) {
          conditions.push({
            type: "and",
            condition: this.getWherePredicateCondition(aliasPath, parameterValue)
          });
        }
        clauses.push({
          type: "or",
          condition: conditions
        });
      }
      if (clauses.length === 1) {
        return clauses[0].condition;
      }
      return clauses;
    }
    obtainQueryRunner() {
      return this.queryRunner || this.connection.createQueryRunner();
    }
    hasCommonTableExpressions() {
      return this.expressionMap.commonTableExpressions.length > 0;
    }
  }
  QueryBuilder.queryBuilderRegistry = {};
  class DeleteResult {
    static from(queryResult) {
      const result = new this();
      result.raw = queryResult.records;
      result.affected = queryResult.affected;
      return result;
    }
  }
  class DeleteQueryBuilder extends QueryBuilder {
    constructor(connectionOrQueryBuilder, queryRunner) {
      super(connectionOrQueryBuilder, queryRunner);
      this["@instanceof"] = Symbol.for("DeleteQueryBuilder");
      this.expressionMap.aliasNamePrefixingEnabled = false;
    }
    getQuery() {
      let sql = this.createComment();
      sql += this.createCteExpression();
      sql += this.createDeleteExpression();
      return this.replacePropertyNamesForTheWholeQuery(sql.trim());
    }
    async execute() {
      const [sql, parameters] = this.getQueryAndParameters();
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          await queryRunner.broadcaster.broadcast("BeforeRemove", this.expressionMap.mainAlias.metadata);
        }
        const queryResult = await queryRunner.query(sql, parameters, true);
        const deleteResult = DeleteResult.from(queryResult);
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          await queryRunner.broadcaster.broadcast("AfterRemove", this.expressionMap.mainAlias.metadata);
        }
        if (transactionStartedByUs) await queryRunner.commitTransaction();
        return deleteResult;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) {
          await queryRunner.release();
        }
      }
    }
    from(entityTarget, aliasName) {
      entityTarget = InstanceChecker.isEntitySchema(entityTarget) ? entityTarget.options.name : entityTarget;
      const mainAlias = this.createFromAlias(entityTarget, aliasName);
      this.expressionMap.setMainAlias(mainAlias);
      return this;
    }
    where(where, parameters) {
      this.expressionMap.wheres = [];
      const condition = this.getWhereCondition(where);
      if (condition) this.expressionMap.wheres = [
        {
          type: "simple",
          condition
        }
      ];
      if (parameters) this.setParameters(parameters);
      return this;
    }
    andWhere(where, parameters) {
      this.expressionMap.wheres.push({
        type: "and",
        condition: this.getWhereCondition(where)
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    orWhere(where, parameters) {
      this.expressionMap.wheres.push({
        type: "or",
        condition: this.getWhereCondition(where)
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    whereInIds(ids) {
      return this.where(this.getWhereInIdsCondition(ids));
    }
    andWhereInIds(ids) {
      return this.andWhere(this.getWhereInIdsCondition(ids));
    }
    orWhereInIds(ids) {
      return this.orWhere(this.getWhereInIdsCondition(ids));
    }
    output(output) {
      return this.returning(output);
    }
    returning(returning) {
      if (!this.connection.driver.isReturningSqlSupported("delete")) {
        throw new ReturningStatementNotSupportedError();
      }
      this.expressionMap.returning = returning;
      return this;
    }
    createDeleteExpression() {
      const tableName = this.getTableName(this.getMainTableName());
      const whereExpression = this.createWhereExpression();
      const returningExpression = this.createReturningExpression("delete");
      if (returningExpression === "") {
        return `DELETE FROM ${tableName}${whereExpression}`;
      }
      if (this.connection.driver.options.type === "mssql") {
        return `DELETE FROM ${tableName} OUTPUT ${returningExpression}${whereExpression}`;
      }
      return `DELETE FROM ${tableName}${whereExpression} RETURNING ${returningExpression}`;
    }
  }
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  const byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }
  const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  const native = {
    randomUUID
  };
  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    return unsafeStringify(rnds);
  }
  class BroadcasterResult {
    constructor() {
      this.count = 0;
      this.promises = [];
    }
    async wait() {
      if (this.promises.length > 0) {
        await Promise.all(this.promises);
      }
      return this;
    }
  }
  class InsertResult {
    constructor() {
      this.identifiers = [];
      this.generatedMaps = [];
    }
    static from(queryResult) {
      const result = new this();
      result.raw = queryResult.raw;
      return result;
    }
  }
  class ReturningResultsEntityUpdator {
    constructor(queryRunner, expressionMap) {
      this.queryRunner = queryRunner;
      this.expressionMap = expressionMap;
    }
    async update(updateResult, entities) {
      const metadata = this.expressionMap.mainAlias.metadata;
      await Promise.all(entities.map(async (entity, entityIndex) => {
        if (this.queryRunner.connection.driver.isReturningSqlSupported("update")) {
          if (this.queryRunner.connection.driver.options.type === "oracle" && Array.isArray(updateResult.raw) && this.expressionMap.extraReturningColumns.length > 0) {
            updateResult.raw = updateResult.raw.reduce((newRaw, rawItem, rawItemIndex) => {
              newRaw[this.expressionMap.extraReturningColumns[rawItemIndex].databaseName] = rawItem[0];
              return newRaw;
            }, {});
          }
          const result = Array.isArray(updateResult.raw) ? updateResult.raw[entityIndex] : updateResult.raw;
          const returningColumns = this.queryRunner.connection.driver.createGeneratedMap(metadata, result);
          if (returningColumns) {
            this.queryRunner.manager.merge(metadata.target, entity, returningColumns);
            updateResult.generatedMaps.push(returningColumns);
          }
        } else {
          const updationColumns = this.expressionMap.extraReturningColumns;
          if (updationColumns.length > 0) {
            const entityId = this.expressionMap.mainAlias.metadata.getEntityIdMap(entity);
            if (!entityId) throw new TypeORMError(`Cannot update entity because entity id is not set in the entity.`);
            const loadedReturningColumns = await this.queryRunner.manager.createQueryBuilder().select(metadata.primaryColumns.map((column) => metadata.targetName + "." + column.propertyPath)).addSelect(updationColumns.map((column) => metadata.targetName + "." + column.propertyPath)).from(metadata.target, metadata.targetName).where(entityId).withDeleted().setOption("create-pojo").getOne();
            if (loadedReturningColumns) {
              this.queryRunner.manager.merge(metadata.target, entity, loadedReturningColumns);
              updateResult.generatedMaps.push(loadedReturningColumns);
            }
          }
        }
      }));
    }
    async insert(insertResult, entities) {
      const metadata = this.expressionMap.mainAlias.metadata;
      let insertionColumns = metadata.getInsertionReturningColumns();
      const needToCheckGenerated = this.queryRunner.connection.driver.isReturningSqlSupported("insert");
      insertionColumns = insertionColumns.filter((column) => {
        if (!column.isGenerated) return true;
        return needToCheckGenerated === true;
      });
      const generatedMaps = entities.map((entity, entityIndex) => {
        if (this.queryRunner.connection.driver.options.type === "oracle" && Array.isArray(insertResult.raw) && this.expressionMap.extraReturningColumns.length > 0) {
          insertResult.raw = insertResult.raw.reduce((newRaw, rawItem, rawItemIndex) => {
            newRaw[this.expressionMap.extraReturningColumns[rawItemIndex].databaseName] = rawItem[0];
            return newRaw;
          }, {});
        }
        const result = Array.isArray(insertResult.raw) ? insertResult.raw[entityIndex] : insertResult.raw;
        const generatedMap = this.queryRunner.connection.driver.createGeneratedMap(metadata, result, entityIndex, entities.length) || {};
        if (entityIndex in this.expressionMap.locallyGenerated) {
          this.queryRunner.manager.merge(metadata.target, generatedMap, this.expressionMap.locallyGenerated[entityIndex]);
        }
        this.queryRunner.manager.merge(metadata.target, entity, generatedMap);
        return generatedMap;
      });
      if (insertionColumns.length > 0 && !this.queryRunner.connection.driver.isReturningSqlSupported("insert")) {
        const entityIds = entities.map((entity) => {
          const entityId = metadata.getEntityIdMap(entity);
          if (!entityId) throw new TypeORMError(`Cannot update entity because entity id is not set in the entity.`);
          return entityId;
        });
        const returningResult = await this.queryRunner.manager.createQueryBuilder().select(metadata.primaryColumns.map((column) => metadata.targetName + "." + column.propertyPath)).addSelect(insertionColumns.map((column) => metadata.targetName + "." + column.propertyPath)).from(metadata.target, metadata.targetName).where(entityIds).setOption("create-pojo").getMany();
        entities.forEach((entity, entityIndex) => {
          this.queryRunner.manager.merge(metadata.target, generatedMaps[entityIndex], returningResult[entityIndex]);
          this.queryRunner.manager.merge(metadata.target, entity, returningResult[entityIndex]);
        });
      }
      entities.forEach((entity, entityIndex) => {
        const entityId = metadata.getEntityIdMap(entity);
        insertResult.identifiers.push(entityId);
        insertResult.generatedMaps.push(generatedMaps[entityIndex]);
      });
    }
    getUpdationReturningColumns() {
      return this.expressionMap.mainAlias.metadata.columns.filter((column) => {
        return column.asExpression !== void 0 || column.isUpdateDate || column.isVersion;
      });
    }
    getSoftDeletionReturningColumns() {
      return this.expressionMap.mainAlias.metadata.columns.filter((column) => {
        return column.asExpression !== void 0 || column.isUpdateDate || column.isVersion || column.isDeleteDate;
      });
    }
  }
  class InsertQueryBuilder extends QueryBuilder {
    constructor() {
      super(...arguments);
      this["@instanceof"] = Symbol.for("InsertQueryBuilder");
    }
    getQuery() {
      let sql = this.createComment();
      sql += this.createCteExpression();
      sql += this.createInsertExpression();
      return this.replacePropertyNamesForTheWholeQuery(sql.trim());
    }
    async execute() {
      const valueSets = this.getValueSets();
      if (valueSets.length === 0) return new InsertResult();
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          const broadcastResult = new BroadcasterResult();
          valueSets.forEach((valueSet) => {
            queryRunner.broadcaster.broadcastBeforeInsertEvent(broadcastResult, this.expressionMap.mainAlias.metadata, valueSet);
          });
          await broadcastResult.wait();
        }
        let declareSql = null;
        let selectOutputSql = null;
        const returningResultsEntityUpdator = new ReturningResultsEntityUpdator(queryRunner, this.expressionMap);
        const returningColumns = [];
        if (Array.isArray(this.expressionMap.returning) && this.expressionMap.mainAlias.hasMetadata) {
          for (const columnPath of this.expressionMap.returning) {
            returningColumns.push(...this.expressionMap.mainAlias.metadata.findColumnsWithPropertyPath(columnPath));
          }
        }
        if (this.expressionMap.updateEntity === true && this.expressionMap.mainAlias.hasMetadata) {
          if (!(valueSets.length > 1 && this.connection.driver.options.type === "oracle")) {
            this.expressionMap.extraReturningColumns = this.expressionMap.mainAlias.metadata.getInsertionReturningColumns();
          }
          returningColumns.push(...this.expressionMap.extraReturningColumns.filter((c) => !returningColumns.includes(c)));
        }
        if (returningColumns.length > 0 && this.connection.driver.options.type === "mssql") {
          declareSql = this.connection.driver.buildTableVariableDeclaration("@OutputTable", returningColumns);
          selectOutputSql = `SELECT * FROM @OutputTable`;
        }
        const [insertSql, parameters] = this.getQueryAndParameters();
        const statements = [
          declareSql,
          insertSql,
          selectOutputSql
        ];
        const sql = statements.filter((s) => s != null).join(";\n\n");
        const queryResult = await queryRunner.query(sql, parameters, true);
        const insertResult = InsertResult.from(queryResult);
        if (this.expressionMap.updateEntity === true && this.expressionMap.mainAlias.hasMetadata) {
          await returningResultsEntityUpdator.insert(insertResult, valueSets);
        }
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          const broadcastResult = new BroadcasterResult();
          valueSets.forEach((valueSet) => {
            queryRunner.broadcaster.broadcastAfterInsertEvent(broadcastResult, this.expressionMap.mainAlias.metadata, valueSet);
          });
          await broadcastResult.wait();
        }
        if (transactionStartedByUs) {
          await queryRunner.commitTransaction();
        }
        return insertResult;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) {
          await queryRunner.release();
        }
      }
    }
    into(entityTarget, columns) {
      entityTarget = InstanceChecker.isEntitySchema(entityTarget) ? entityTarget.options.name : entityTarget;
      const mainAlias = this.createFromAlias(entityTarget);
      this.expressionMap.setMainAlias(mainAlias);
      this.expressionMap.insertColumns = columns || [];
      return this;
    }
    values(values) {
      this.expressionMap.valuesSet = values;
      return this;
    }
    output(output) {
      return this.returning(output);
    }
    returning(returning) {
      if (!this.connection.driver.isReturningSqlSupported("insert")) {
        throw new ReturningStatementNotSupportedError();
      }
      this.expressionMap.returning = returning;
      return this;
    }
    updateEntity(enabled) {
      this.expressionMap.updateEntity = enabled;
      return this;
    }
    onConflict(statement) {
      this.expressionMap.onConflict = statement;
      return this;
    }
    orIgnore(statement = true) {
      this.expressionMap.onIgnore = !!statement;
      return this;
    }
    orUpdate(statementOrOverwrite, conflictTarget, orUpdateOptions) {
      if (!Array.isArray(statementOrOverwrite)) {
        this.expressionMap.onUpdate = {
          conflict: statementOrOverwrite == null ? void 0 : statementOrOverwrite.conflict_target,
          columns: statementOrOverwrite == null ? void 0 : statementOrOverwrite.columns,
          overwrite: statementOrOverwrite == null ? void 0 : statementOrOverwrite.overwrite,
          skipUpdateIfNoValuesChanged: orUpdateOptions == null ? void 0 : orUpdateOptions.skipUpdateIfNoValuesChanged,
          upsertType: orUpdateOptions == null ? void 0 : orUpdateOptions.upsertType
        };
        return this;
      }
      this.expressionMap.onUpdate = {
        overwrite: statementOrOverwrite,
        conflict: conflictTarget,
        skipUpdateIfNoValuesChanged: orUpdateOptions == null ? void 0 : orUpdateOptions.skipUpdateIfNoValuesChanged,
        indexPredicate: orUpdateOptions == null ? void 0 : orUpdateOptions.indexPredicate,
        upsertType: orUpdateOptions == null ? void 0 : orUpdateOptions.upsertType
      };
      return this;
    }
    createInsertExpression() {
      var _a, _b;
      const tableName = this.getTableName(this.getMainTableName());
      const valuesExpression = this.createValuesExpression();
      const returningExpression = this.connection.driver.options.type === "oracle" && this.getValueSets().length > 1 ? null : this.createReturningExpression("insert");
      const columnsExpression = this.createColumnNamesExpression();
      let query = "INSERT ";
      if (((_a = this.expressionMap.onUpdate) == null ? void 0 : _a.upsertType) === "primary-key") {
        query = "UPSERT ";
      }
      if (DriverUtils.isMySQLFamily(this.connection.driver) || this.connection.driver.options.type === "aurora-mysql") {
        query += `${this.expressionMap.onIgnore ? " IGNORE " : ""}`;
      }
      query += `INTO ${tableName}`;
      if (this.alias !== this.getMainTableName() && DriverUtils.isPostgresFamily(this.connection.driver)) {
        query += ` AS "${this.alias}"`;
      }
      if (columnsExpression) {
        query += `(${columnsExpression})`;
      } else {
        if (!valuesExpression && (DriverUtils.isMySQLFamily(this.connection.driver) || this.connection.driver.options.type === "aurora-mysql")) query += "()";
      }
      if (returningExpression && this.connection.driver.options.type === "mssql") {
        query += ` OUTPUT ${returningExpression}`;
      }
      if (valuesExpression) {
        if ((this.connection.driver.options.type === "oracle" || this.connection.driver.options.type === "sap") && this.getValueSets().length > 1) {
          query += ` ${valuesExpression}`;
        } else {
          query += ` VALUES ${valuesExpression}`;
        }
      } else {
        if (DriverUtils.isMySQLFamily(this.connection.driver) || this.connection.driver.options.type === "aurora-mysql") {
          query += " VALUES ()";
        } else {
          query += ` DEFAULT VALUES`;
        }
      }
      if (((_b = this.expressionMap.onUpdate) == null ? void 0 : _b.upsertType) !== "primary-key") {
        if (this.connection.driver.supportedUpsertTypes.includes("on-conflict-do-update")) {
          if (this.expressionMap.onIgnore) {
            query += " ON CONFLICT DO NOTHING ";
          } else if (this.expressionMap.onConflict) {
            query += ` ON CONFLICT ${this.expressionMap.onConflict} `;
          } else if (this.expressionMap.onUpdate) {
            const { overwrite, columns, conflict, skipUpdateIfNoValuesChanged, indexPredicate } = this.expressionMap.onUpdate;
            let conflictTarget = "ON CONFLICT";
            if (Array.isArray(conflict)) {
              conflictTarget += ` ( ${conflict.map((column) => this.escape(column)).join(", ")} )`;
              if (indexPredicate && !DriverUtils.isPostgresFamily(this.connection.driver)) {
                throw new TypeORMError(`indexPredicate option is not supported by the current database driver`);
              }
              if (indexPredicate && DriverUtils.isPostgresFamily(this.connection.driver)) {
                conflictTarget += ` WHERE ( ${indexPredicate} )`;
              }
            } else if (conflict) {
              conflictTarget += ` ON CONSTRAINT ${this.escape(conflict)}`;
            }
            const updatePart = [];
            if (Array.isArray(overwrite)) {
              updatePart.push(...overwrite.map((column) => `${this.escape(column)} = EXCLUDED.${this.escape(column)}`));
            } else if (columns) {
              updatePart.push(...columns.map((column) => `${this.escape(column)} = :${column}`));
            }
            if (updatePart.length > 0) {
              query += ` ${conflictTarget} DO UPDATE SET `;
              updatePart.push(...this.expressionMap.mainAlias.metadata.columns.filter((column) => column.isUpdateDate && !(overwrite == null ? void 0 : overwrite.includes(column.databaseName)) && !(this.connection.driver.options.type === "oracle" && this.getValueSets().length > 1 || DriverUtils.isSQLiteFamily(this.connection.driver) || this.connection.driver.options.type === "sap" || this.connection.driver.options.type === "spanner")).map((column) => `${this.escape(column.databaseName)} = DEFAULT`));
              query += updatePart.join(", ");
              query += " ";
            }
            if (Array.isArray(overwrite) && skipUpdateIfNoValuesChanged && DriverUtils.isPostgresFamily(this.connection.driver)) {
              query += ` WHERE (`;
              query += overwrite.map((column) => `${tableName}.${this.escape(column)} IS DISTINCT FROM EXCLUDED.${this.escape(column)}`).join(" OR ");
              query += ") ";
            }
          }
        } else if (this.connection.driver.supportedUpsertTypes.includes("on-duplicate-key-update")) {
          if (this.expressionMap.onUpdate) {
            const { overwrite, columns } = this.expressionMap.onUpdate;
            if (Array.isArray(overwrite)) {
              query += " ON DUPLICATE KEY UPDATE ";
              query += overwrite.map((column) => `${this.escape(column)} = VALUES(${this.escape(column)})`).join(", ");
              query += " ";
            } else if (Array.isArray(columns)) {
              query += " ON DUPLICATE KEY UPDATE ";
              query += columns.map((column) => `${this.escape(column)} = :${column}`).join(", ");
              query += " ";
            }
          }
        } else {
          if (this.expressionMap.onUpdate) {
            throw new TypeORMError(`onUpdate is not supported by the current database driver`);
          }
        }
      }
      if (returningExpression && (DriverUtils.isPostgresFamily(this.connection.driver) || this.connection.driver.options.type === "oracle" || this.connection.driver.options.type === "cockroachdb" || DriverUtils.isMySQLFamily(this.connection.driver))) {
        query += ` RETURNING ${returningExpression}`;
      }
      if (this.connection.driver.options.type === "mssql" && this.expressionMap.mainAlias.hasMetadata && this.expressionMap.mainAlias.metadata.columns.filter((column) => this.expressionMap.insertColumns.length > 0 ? this.expressionMap.insertColumns.indexOf(column.propertyPath) !== -1 : column.isInsert).some((column) => this.isOverridingAutoIncrementBehavior(column))) {
        query = `SET IDENTITY_INSERT ${tableName} ON; ${query}; SET IDENTITY_INSERT ${tableName} OFF`;
      }
      return query;
    }
    getInsertedColumns() {
      if (!this.expressionMap.mainAlias.hasMetadata) return [];
      return this.expressionMap.mainAlias.metadata.columns.filter((column) => {
        if (this.expressionMap.insertColumns.length) return this.expressionMap.insertColumns.indexOf(column.propertyPath) !== -1;
        if (!column.isInsert) {
          return false;
        }
        if (column.isGenerated && column.generationStrategy === "increment" && !(this.connection.driver.options.type === "spanner") && !(this.connection.driver.options.type === "oracle") && !DriverUtils.isSQLiteFamily(this.connection.driver) && !DriverUtils.isMySQLFamily(this.connection.driver) && !(this.connection.driver.options.type === "aurora-mysql") && !(this.connection.driver.options.type === "mssql" && this.isOverridingAutoIncrementBehavior(column))) return false;
        return true;
      });
    }
    createColumnNamesExpression() {
      const columns = this.getInsertedColumns();
      if (columns.length > 0) return columns.map((column) => this.escape(column.databaseName)).join(", ");
      if (!this.expressionMap.mainAlias.hasMetadata && !this.expressionMap.insertColumns.length) {
        const valueSets = this.getValueSets();
        if (valueSets.length === 1) return Object.keys(valueSets[0]).map((columnName) => this.escape(columnName)).join(", ");
      }
      return this.expressionMap.insertColumns.map((columnName) => this.escape(columnName)).join(", ");
    }
    createValuesExpression() {
      const valueSets = this.getValueSets();
      const columns = this.getInsertedColumns();
      if (columns.length > 0) {
        let expression = "";
        valueSets.forEach((valueSet, valueSetIndex) => {
          columns.forEach((column, columnIndex) => {
            if (columnIndex === 0) {
              if (this.connection.driver.options.type === "oracle" && valueSets.length > 1) {
                expression += " SELECT ";
              } else if (this.connection.driver.options.type === "sap" && valueSets.length > 1) {
                expression += " SELECT ";
              } else {
                expression += "(";
              }
            }
            let value = column.getEntityValue(valueSet);
            if (!(typeof value === "function")) {
              value = this.connection.driver.preparePersistentValue(value, column);
            }
            if (column.isVersion && value === void 0) {
              expression += "1";
            } else if (column.isDiscriminator) {
              expression += this.createParameter(this.expressionMap.mainAlias.metadata.discriminatorValue);
            } else if (column.isGenerated && column.generationStrategy === "uuid" && !this.connection.driver.isUUIDGenerationSupported() && value === void 0) {
              value = v4();
              expression += this.createParameter(value);
              if (!(valueSetIndex in this.expressionMap.locallyGenerated)) {
                this.expressionMap.locallyGenerated[valueSetIndex] = {};
              }
              column.setEntityValue(this.expressionMap.locallyGenerated[valueSetIndex], value);
            } else if (value === void 0) {
              if (this.connection.driver.options.type === "oracle" && valueSets.length > 1 || DriverUtils.isSQLiteFamily(this.connection.driver) || this.connection.driver.options.type === "sap" || this.connection.driver.options.type === "spanner") {
                if (column.default !== void 0 && column.default !== null) {
                  expression += this.connection.driver.normalizeDefault(column);
                } else {
                  expression += "NULL";
                }
              } else {
                expression += "DEFAULT";
              }
            } else if (value === null && this.connection.driver.options.type === "spanner") {
              expression += "NULL";
            } else if (typeof value === "function") {
              expression += value();
            } else {
              if (this.connection.driver.options.type === "mssql") value = this.connection.driver.parametrizeValue(column, value);
              const paramName = this.createParameter(value);
              if ((DriverUtils.isMySQLFamily(this.connection.driver) || this.connection.driver.options.type === "aurora-mysql") && this.connection.driver.spatialTypes.indexOf(column.type) !== -1) {
                const useLegacy = this.connection.driver.options.legacySpatialSupport;
                const geomFromText = useLegacy ? "GeomFromText" : "ST_GeomFromText";
                if (column.srid != null) {
                  expression += `${geomFromText}(${paramName}, ${column.srid})`;
                } else {
                  expression += `${geomFromText}(${paramName})`;
                }
              } else if (DriverUtils.isPostgresFamily(this.connection.driver) && this.connection.driver.spatialTypes.indexOf(column.type) !== -1) {
                if (column.srid != null) {
                  expression += `ST_SetSRID(ST_GeomFromGeoJSON(${paramName}), ${column.srid})::${column.type}`;
                } else {
                  expression += `ST_GeomFromGeoJSON(${paramName})::${column.type}`;
                }
              } else if (this.connection.driver.options.type === "mssql" && this.connection.driver.spatialTypes.indexOf(column.type) !== -1) {
                expression += column.type + "::STGeomFromText(" + paramName + ", " + (column.srid || "0") + ")";
              } else {
                expression += paramName;
              }
            }
            if (columnIndex === columns.length - 1) {
              if (valueSetIndex === valueSets.length - 1) {
                if (this.connection.driver.options.type === "oracle" && valueSets.length > 1) {
                  expression += " FROM DUAL ";
                } else if (this.connection.driver.options.type === "sap" && valueSets.length > 1) {
                  expression += " FROM dummy ";
                } else {
                  expression += ")";
                }
              } else {
                if (this.connection.driver.options.type === "oracle" && valueSets.length > 1) {
                  expression += " FROM DUAL UNION ALL ";
                } else if (this.connection.driver.options.type === "sap" && valueSets.length > 1) {
                  expression += " FROM dummy UNION ALL ";
                } else {
                  expression += "), ";
                }
              }
            } else {
              expression += ", ";
            }
          });
        });
        if (expression === "()") return "";
        return expression;
      } else {
        let expression = "";
        valueSets.forEach((valueSet, insertionIndex) => {
          const columns2 = Object.keys(valueSet);
          columns2.forEach((columnName, columnIndex) => {
            if (columnIndex === 0) {
              expression += "(";
            }
            const value = valueSet[columnName];
            if (typeof value === "function") {
              expression += value();
            } else if (value === void 0) {
              if (this.connection.driver.options.type === "oracle" && valueSets.length > 1 || DriverUtils.isSQLiteFamily(this.connection.driver) || this.connection.driver.options.type === "sap" || this.connection.driver.options.type === "spanner") {
                expression += "NULL";
              } else {
                expression += "DEFAULT";
              }
            } else if (value === null && this.connection.driver.options.type === "spanner") ;
            else {
              expression += this.createParameter(value);
            }
            if (columnIndex === Object.keys(valueSet).length - 1) {
              if (insertionIndex === valueSets.length - 1) {
                expression += ")";
              } else {
                expression += "), ";
              }
            } else {
              expression += ", ";
            }
          });
        });
        if (expression === "()") return "";
        return expression;
      }
    }
    getValueSets() {
      if (Array.isArray(this.expressionMap.valuesSet)) return this.expressionMap.valuesSet;
      if (ObjectUtils.isObject(this.expressionMap.valuesSet)) return [
        this.expressionMap.valuesSet
      ];
      throw new InsertValuesMissingError();
    }
    isOverridingAutoIncrementBehavior(column) {
      return column.isPrimary && column.isGenerated && column.generationStrategy === "increment" && this.getValueSets().some((valueSet) => column.getEntityValue(valueSet) !== void 0 && column.getEntityValue(valueSet) !== null);
    }
  }
  class RelationUpdater {
    constructor(queryBuilder, expressionMap) {
      this.queryBuilder = queryBuilder;
      this.expressionMap = expressionMap;
    }
    async update(value) {
      const relation = this.expressionMap.relationMetadata;
      if (relation.isManyToOne || relation.isOneToOneOwner) {
        const updateSet = relation.joinColumns.reduce((updateSet2, joinColumn) => {
          const relationValue = ObjectUtils.isObject(value) ? joinColumn.referencedColumn.getEntityValue(value) : value;
          joinColumn.setEntityValue(updateSet2, relationValue);
          return updateSet2;
        }, {});
        if (!this.expressionMap.of || Array.isArray(this.expressionMap.of) && !this.expressionMap.of.length) return;
        await this.queryBuilder.createQueryBuilder().update(relation.entityMetadata.target).set(updateSet).whereInIds(this.expressionMap.of).execute();
      } else if ((relation.isOneToOneNotOwner || relation.isOneToMany) && value === null) {
        const updateSet = {};
        relation.inverseRelation.joinColumns.forEach((column) => {
          updateSet[column.propertyName] = null;
        });
        const ofs = Array.isArray(this.expressionMap.of) ? this.expressionMap.of : [
          this.expressionMap.of
        ];
        const parameters = {};
        const conditions = [];
        ofs.forEach((of, ofIndex) => {
          relation.inverseRelation.joinColumns.map((column, columnIndex) => {
            const parameterName = "joinColumn_" + ofIndex + "_" + columnIndex;
            parameters[parameterName] = ObjectUtils.isObject(of) ? column.referencedColumn.getEntityValue(of) : of;
            conditions.push(`${column.propertyPath} = :${parameterName}`);
          });
        });
        const condition = conditions.map((str) => "(" + str + ")").join(" OR ");
        if (!condition) return;
        await this.queryBuilder.createQueryBuilder().update(relation.inverseEntityMetadata.target).set(updateSet).where(condition).setParameters(parameters).execute();
      } else if (relation.isOneToOneNotOwner || relation.isOneToMany) {
        if (Array.isArray(this.expressionMap.of)) throw new TypeORMError(`You cannot update relations of multiple entities with the same related object. Provide a single entity into .of method.`);
        const of = this.expressionMap.of;
        const updateSet = relation.inverseRelation.joinColumns.reduce((updateSet2, joinColumn) => {
          const relationValue = ObjectUtils.isObject(of) ? joinColumn.referencedColumn.getEntityValue(of) : of;
          joinColumn.setEntityValue(updateSet2, relationValue);
          return updateSet2;
        }, {});
        if (!value || Array.isArray(value) && !value.length) return;
        await this.queryBuilder.createQueryBuilder().update(relation.inverseEntityMetadata.target).set(updateSet).whereInIds(value).execute();
      } else {
        const junctionMetadata = relation.junctionEntityMetadata;
        const ofs = Array.isArray(this.expressionMap.of) ? this.expressionMap.of : [
          this.expressionMap.of
        ];
        const values = Array.isArray(value) ? value : [
          value
        ];
        const firstColumnValues = relation.isManyToManyOwner ? ofs : values;
        const secondColumnValues = relation.isManyToManyOwner ? values : ofs;
        const bulkInserted = [];
        firstColumnValues.forEach((firstColumnVal) => {
          secondColumnValues.forEach((secondColumnVal) => {
            const inserted = {};
            junctionMetadata.ownerColumns.forEach((column) => {
              inserted[column.databaseName] = ObjectUtils.isObject(firstColumnVal) ? column.referencedColumn.getEntityValue(firstColumnVal) : firstColumnVal;
            });
            junctionMetadata.inverseColumns.forEach((column) => {
              inserted[column.databaseName] = ObjectUtils.isObject(secondColumnVal) ? column.referencedColumn.getEntityValue(secondColumnVal) : secondColumnVal;
            });
            bulkInserted.push(inserted);
          });
        });
        if (!bulkInserted.length) return;
        if (this.queryBuilder.connection.driver.options.type === "oracle" || this.queryBuilder.connection.driver.options.type === "sap") {
          await Promise.all(bulkInserted.map((value2) => {
            return this.queryBuilder.createQueryBuilder().insert().into(junctionMetadata.tableName).values(value2).execute();
          }));
        } else {
          await this.queryBuilder.createQueryBuilder().insert().into(junctionMetadata.tableName).values(bulkInserted).execute();
        }
      }
    }
  }
  class RelationRemover {
    constructor(queryBuilder, expressionMap) {
      this.queryBuilder = queryBuilder;
      this.expressionMap = expressionMap;
    }
    async remove(value) {
      const relation = this.expressionMap.relationMetadata;
      if (relation.isOneToMany) {
        const ofs = Array.isArray(this.expressionMap.of) ? this.expressionMap.of : [
          this.expressionMap.of
        ];
        const values = Array.isArray(value) ? value : [
          value
        ];
        const updateSet = {};
        relation.inverseRelation.joinColumns.forEach((column) => {
          updateSet[column.propertyName] = null;
        });
        const parameters = {};
        const conditions = [];
        ofs.forEach((of, ofIndex) => {
          conditions.push(...values.map((value2, valueIndex) => {
            return [
              ...relation.inverseRelation.joinColumns.map((column, columnIndex) => {
                const parameterName = "joinColumn_" + ofIndex + "_" + valueIndex + "_" + columnIndex;
                parameters[parameterName] = ObjectUtils.isObject(of) ? column.referencedColumn.getEntityValue(of) : of;
                return `${column.propertyPath} = :${parameterName}`;
              }),
              ...relation.inverseRelation.entityMetadata.primaryColumns.map((column, columnIndex) => {
                const parameterName = "primaryColumn_" + valueIndex + "_" + valueIndex + "_" + columnIndex;
                parameters[parameterName] = ObjectUtils.isObject(value2) ? column.getEntityValue(value2) : value2;
                return `${column.propertyPath} = :${parameterName}`;
              })
            ].join(" AND ");
          }));
        });
        const condition = conditions.map((str) => "(" + str + ")").join(" OR ");
        if (!condition) return;
        await this.queryBuilder.createQueryBuilder().update(relation.inverseEntityMetadata.target).set(updateSet).where(condition).setParameters(parameters).execute();
      } else {
        const junctionMetadata = relation.junctionEntityMetadata;
        const ofs = Array.isArray(this.expressionMap.of) ? this.expressionMap.of : [
          this.expressionMap.of
        ];
        const values = Array.isArray(value) ? value : [
          value
        ];
        const firstColumnValues = relation.isManyToManyOwner ? ofs : values;
        const secondColumnValues = relation.isManyToManyOwner ? values : ofs;
        const parameters = {};
        const conditions = [];
        firstColumnValues.forEach((firstColumnVal, firstColumnValIndex) => {
          conditions.push(...secondColumnValues.map((secondColumnVal, secondColumnValIndex) => {
            return [
              ...junctionMetadata.ownerColumns.map((column, columnIndex) => {
                const parameterName = "firstValue_" + firstColumnValIndex + "_" + secondColumnValIndex + "_" + columnIndex;
                parameters[parameterName] = ObjectUtils.isObject(firstColumnVal) ? column.referencedColumn.getEntityValue(firstColumnVal) : firstColumnVal;
                return `${column.databaseName} = :${parameterName}`;
              }),
              ...junctionMetadata.inverseColumns.map((column, columnIndex) => {
                const parameterName = "secondValue_" + firstColumnValIndex + "_" + secondColumnValIndex + "_" + columnIndex;
                parameters[parameterName] = ObjectUtils.isObject(secondColumnVal) ? column.referencedColumn.getEntityValue(secondColumnVal) : secondColumnVal;
                return `${column.databaseName} = :${parameterName}`;
              })
            ].join(" AND ");
          }));
        });
        const condition = conditions.map((str) => "(" + str + ")").join(" OR ");
        await this.queryBuilder.createQueryBuilder().delete().from(junctionMetadata.tableName).where(condition).setParameters(parameters).execute();
      }
    }
  }
  class RelationQueryBuilder extends QueryBuilder {
    constructor() {
      super(...arguments);
      this["@instanceof"] = Symbol.for("RelationQueryBuilder");
    }
    getQuery() {
      return "";
    }
    of(entity) {
      this.expressionMap.of = entity;
      return this;
    }
    async set(value) {
      const relation = this.expressionMap.relationMetadata;
      if (!this.expressionMap.of) throw new TypeORMError(`Entity whose relation needs to be set is not set. Use .of method to define whose relation you want to set.`);
      if (relation.isManyToMany || relation.isOneToMany) throw new TypeORMError(`Set operation is only supported for many-to-one and one-to-one relations. However given "${relation.propertyPath}" has ${relation.relationType} relation. Use .add() method instead.`);
      if (relation.joinColumns && relation.joinColumns.length > 1 && (!ObjectUtils.isObject(value) || Object.keys(value).length < relation.joinColumns.length)) throw new TypeORMError(`Value to be set into the relation must be a map of relation ids, for example: .set({ firstName: "...", lastName: "..." })`);
      const updater = new RelationUpdater(this, this.expressionMap);
      return updater.update(value);
    }
    async add(value) {
      if (Array.isArray(value) && value.length === 0) return;
      const relation = this.expressionMap.relationMetadata;
      if (!this.expressionMap.of) throw new TypeORMError(`Entity whose relation needs to be set is not set. Use .of method to define whose relation you want to set.`);
      if (relation.isManyToOne || relation.isOneToOne) throw new TypeORMError(`Add operation is only supported for many-to-many and one-to-many relations. However given "${relation.propertyPath}" has ${relation.relationType} relation. Use .set() method instead.`);
      if (relation.joinColumns && relation.joinColumns.length > 1 && (!ObjectUtils.isObject(value) || Object.keys(value).length < relation.joinColumns.length)) throw new TypeORMError(`Value to be set into the relation must be a map of relation ids, for example: .set({ firstName: "...", lastName: "..." })`);
      const updater = new RelationUpdater(this, this.expressionMap);
      return updater.update(value);
    }
    async remove(value) {
      if (Array.isArray(value) && value.length === 0) return;
      const relation = this.expressionMap.relationMetadata;
      if (!this.expressionMap.of) throw new TypeORMError(`Entity whose relation needs to be set is not set. Use .of method to define whose relation you want to set.`);
      if (relation.isManyToOne || relation.isOneToOne) throw new TypeORMError(`Add operation is only supported for many-to-many and one-to-many relations. However given "${relation.propertyPath}" has ${relation.relationType} relation. Use .set(null) method instead.`);
      const remover = new RelationRemover(this, this.expressionMap);
      return remover.remove(value);
    }
    async addAndRemove(added, removed) {
      await this.remove(removed);
      await this.add(added);
    }
    async loadOne() {
      return this.loadMany().then((results) => results[0]);
    }
    async loadMany() {
      let of = this.expressionMap.of;
      if (!ObjectUtils.isObject(of)) {
        const metadata = this.expressionMap.mainAlias.metadata;
        if (metadata.hasMultiplePrimaryKeys) throw new TypeORMError(`Cannot load entity because only one primary key was specified, however entity contains multiple primary keys`);
        of = metadata.primaryColumns[0].createValueMap(of);
      }
      return this.connection.relationLoader.load(this.expressionMap.relationMetadata, of, this.queryRunner);
    }
  }
  class OrmUtils {
    static chunk(array2, size) {
      return Array.from(Array(Math.ceil(array2.length / size)), (_, i) => {
        return array2.slice(i * size, i * size + size);
      });
    }
    static splitClassesAndStrings(classesAndStrings) {
      return [
        classesAndStrings.filter((cls) => typeof cls !== "string"),
        classesAndStrings.filter((str) => typeof str === "string")
      ];
    }
    static groupBy(array2, propertyCallback) {
      return array2.reduce((groupedArray, value) => {
        const key = propertyCallback(value);
        let grouped = groupedArray.find((i) => i.id === key);
        if (!grouped) {
          grouped = {
            id: key,
            items: []
          };
          groupedArray.push(grouped);
        }
        grouped.items.push(value);
        return groupedArray;
      }, []);
    }
    static uniq(array2, criteriaOrProperty) {
      return array2.reduce((uniqueArray, item) => {
        let found = false;
        if (typeof criteriaOrProperty === "function") {
          const itemValue = criteriaOrProperty(item);
          found = !!uniqueArray.find((uniqueItem) => criteriaOrProperty(uniqueItem) === itemValue);
        } else if (typeof criteriaOrProperty === "string") {
          found = !!uniqueArray.find((uniqueItem) => uniqueItem[criteriaOrProperty] === item[criteriaOrProperty]);
        } else {
          found = uniqueArray.indexOf(item) !== -1;
        }
        if (!found) uniqueArray.push(item);
        return uniqueArray;
      }, []);
    }
    static isPlainObject(item) {
      if (item === null || item === void 0) {
        return false;
      }
      return !item.constructor || item.constructor === Object;
    }
    static mergeArrayKey(target, key, value, memo) {
      if (memo.has(value)) {
        target[key] = memo.get(value);
        return;
      }
      if (value instanceof Promise) {
        return;
      }
      if (!this.isPlainObject(value) && !Array.isArray(value)) {
        target[key] = value;
        return;
      }
      if (!target[key]) {
        target[key] = Array.isArray(value) ? [] : {};
      }
      memo.set(value, target[key]);
      this.merge(target[key], value, memo);
      memo.delete(value);
    }
    static mergeObjectKey(target, key, value, memo) {
      if (memo.has(value)) {
        Object.assign(target, {
          [key]: memo.get(value)
        });
        return;
      }
      if (value instanceof Promise) {
        return;
      }
      if (!this.isPlainObject(value) && !Array.isArray(value)) {
        Object.assign(target, {
          [key]: value
        });
        return;
      }
      if (!target[key]) {
        Object.assign(target, {
          [key]: Array.isArray(value) ? [] : {}
        });
      }
      memo.set(value, target[key]);
      this.merge(target[key], value, memo);
      memo.delete(value);
    }
    static merge(target, source, memo = /* @__PURE__ */ new Map()) {
      if (this.isPlainObject(target) && this.isPlainObject(source)) {
        for (const key of Object.keys(source)) {
          if (key === "__proto__") continue;
          this.mergeObjectKey(target, key, source[key], memo);
        }
      }
      if (Array.isArray(target) && Array.isArray(source)) {
        for (let key = 0; key < source.length; key++) {
          this.mergeArrayKey(target, key, source[key], memo);
        }
      }
    }
    static mergeDeep(target, ...sources) {
      if (!sources.length) {
        return target;
      }
      for (const source of sources) {
        OrmUtils.merge(target, source);
      }
      return target;
    }
    static deepCompare(...args) {
      let i, l2, leftChain, rightChain;
      if (arguments.length < 1) {
        return true;
      }
      for (i = 1, l2 = arguments.length; i < l2; i++) {
        leftChain = [];
        rightChain = [];
        if (!this.compare2Objects(leftChain, rightChain, arguments[0], arguments[i])) {
          return false;
        }
      }
      return true;
    }
    static deepValue(obj, path) {
      const segments = path.split(".");
      for (let i = 0, len = segments.length; i < len; i++) {
        obj = obj[segments[i]];
      }
      return obj;
    }
    static replaceEmptyObjectsWithBooleans(obj) {
      for (let key in obj) {
        if (obj[key] && typeof obj[key] === "object") {
          if (Object.keys(obj[key]).length === 0) {
            obj[key] = true;
          } else {
            this.replaceEmptyObjectsWithBooleans(obj[key]);
          }
        }
      }
    }
    static propertyPathsToTruthyObject(paths) {
      let obj = {};
      for (let path of paths) {
        const props = path.split(".");
        if (!props.length) continue;
        if (!obj[props[0]] || obj[props[0]] === true) {
          obj[props[0]] = {};
        }
        let recursiveChild = obj[props[0]];
        for (let [key, prop] of props.entries()) {
          if (key === 0) continue;
          if (recursiveChild[prop]) {
            recursiveChild = recursiveChild[prop];
          } else if (key === props.length - 1) {
            recursiveChild[prop] = {};
            recursiveChild = null;
          } else {
            recursiveChild[prop] = {};
            recursiveChild = recursiveChild[prop];
          }
        }
      }
      this.replaceEmptyObjectsWithBooleans(obj);
      return obj;
    }
    static compareIds(firstId, secondId) {
      if (firstId === void 0 || firstId === null || secondId === void 0 || secondId === null) return false;
      if ((typeof firstId.id === "string" && typeof secondId.id === "string" || typeof firstId.id === "number" && typeof secondId.id === "number") && Object.keys(firstId).length === 1 && Object.keys(secondId).length === 1) {
        return firstId.id === secondId.id;
      }
      return OrmUtils.deepCompare(firstId, secondId);
    }
    static toBoolean(value) {
      if (typeof value === "boolean") return value;
      if (typeof value === "string") return value === "true" || value === "1";
      if (typeof value === "number") return value > 0;
      return false;
    }
    static zipObject(keys2, values) {
      return keys2.reduce((object, column, index2) => {
        object[column] = values[index2];
        return object;
      }, {});
    }
    static isArraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
      return arr1.every((element) => {
        return arr2.indexOf(element) !== -1;
      });
    }
    static areMutuallyExclusive(...lists) {
      const haveSharedObjects = lists.some((list) => {
        const otherLists = lists.filter((otherList) => otherList !== list);
        return list.some((item) => otherLists.some((otherList) => otherList.includes(item)));
      });
      return !haveSharedObjects;
    }
    static parseSqlCheckExpression(sql, columnName) {
      const enumMatch = sql.match(new RegExp(`"${columnName}" varchar CHECK\\s*\\(\\s*"${columnName}"\\s+IN\\s*`));
      if (enumMatch && enumMatch.index) {
        const afterMatch = sql.substring(enumMatch.index + enumMatch[0].length);
        const chars = afterMatch;
        let currentQuotes = "";
        let nextValue = "";
        const enumValues = [];
        for (let idx = 0; idx < chars.length; idx++) {
          const char = chars[idx];
          switch (char) {
            case ",":
              if (currentQuotes == "") {
                enumValues.push(nextValue);
                nextValue = "";
              } else {
                nextValue += char;
              }
              break;
            case "'":
              if (currentQuotes == char) {
                const isNextCharQuote = chars[idx + 1] === char;
                if (isNextCharQuote) {
                  nextValue += char;
                  idx += 1;
                } else {
                  currentQuotes = "";
                }
              } else {
                currentQuotes = char;
              }
              break;
            case ")":
              if (currentQuotes == "") {
                enumValues.push(nextValue);
                return enumValues;
              } else {
                nextValue += char;
              }
              break;
            default:
              if (currentQuotes != "") {
                nextValue += char;
              }
          }
        }
      }
      return void 0;
    }
    static compare2Objects(leftChain, rightChain, x, y) {
      let p2;
      if (Number.isNaN(x) && Number.isNaN(y)) return true;
      if (x === y) return true;
      if (x === null || y === null || x === void 0 || y === void 0) return false;
      if ((typeof x.equals === "function" || typeof x.equals === "function") && x.equals(y)) return true;
      if (typeof x === "function" && typeof y === "function" || x instanceof Date && y instanceof Date || x instanceof RegExp && y instanceof RegExp || typeof x === "string" && typeof y === "string" || typeof x === "number" && typeof y === "number") return x.toString() === y.toString();
      if (!(typeof x === "object" && typeof y === "object")) return false;
      if (Object.prototype.isPrototypeOf.call(x, y) || Object.prototype.isPrototypeOf.call(y, x)) return false;
      if (x.constructor !== y.constructor) return false;
      if (x.prototype !== y.prototype) return false;
      if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) return false;
      for (p2 in y) {
        if (y.hasOwnProperty(p2) !== x.hasOwnProperty(p2)) {
          return false;
        } else if (typeof y[p2] !== typeof x[p2]) {
          return false;
        }
      }
      for (p2 in x) {
        if (y.hasOwnProperty(p2) !== x.hasOwnProperty(p2)) {
          return false;
        } else if (typeof y[p2] !== typeof x[p2]) {
          return false;
        }
        switch (typeof x[p2]) {
          case "object":
          case "function":
            leftChain.push(x);
            rightChain.push(y);
            if (!this.compare2Objects(leftChain, rightChain, x[p2], y[p2])) {
              return false;
            }
            leftChain.pop();
            rightChain.pop();
            break;
          default:
            if (x[p2] !== y[p2]) {
              return false;
            }
            break;
        }
      }
      return true;
    }
  }
  class RawSqlResultsToEntityTransformer {
    constructor(expressionMap, driver, rawRelationIdResults, rawRelationCountResults, queryRunner) {
      this.expressionMap = expressionMap;
      this.driver = driver;
      this.rawRelationIdResults = rawRelationIdResults;
      this.rawRelationCountResults = rawRelationCountResults;
      this.queryRunner = queryRunner;
    }
    transform(rawResults, alias) {
      const group = this.group(rawResults, alias);
      const entities = [];
      group.forEach((results) => {
        const entity = this.transformRawResultsGroup(results, alias);
        if (entity !== void 0 && !Object.values(entity).every((value) => value === null)) entities.push(entity);
      });
      return entities;
    }
    group(rawResults, alias) {
      const map = /* @__PURE__ */ new Map();
      const keys2 = [];
      if (alias.metadata.tableType === "view") {
        keys2.push(...alias.metadata.columns.map((column) => DriverUtils.buildAlias(this.driver, void 0, alias.name, column.databaseName)));
      } else {
        keys2.push(...alias.metadata.primaryColumns.map((column) => DriverUtils.buildAlias(this.driver, void 0, alias.name, column.databaseName)));
      }
      rawResults.forEach((rawResult) => {
        const id2 = keys2.map((key) => {
          const keyValue = rawResult[key];
          if (Buffer$7.isBuffer(keyValue)) {
            return keyValue.toString("hex");
          }
          if (ObjectUtils.isObject(keyValue)) {
            return JSON.stringify(keyValue);
          }
          return keyValue;
        }).join("_");
        const items = map.get(id2);
        if (!items) {
          map.set(id2, [
            rawResult
          ]);
        } else {
          items.push(rawResult);
        }
      });
      return map;
    }
    transformRawResultsGroup(rawResults, alias) {
      let metadata = alias.metadata;
      if (metadata.discriminatorColumn) {
        const discriminatorValues = rawResults.map((result) => result[DriverUtils.buildAlias(this.driver, void 0, alias.name, alias.metadata.discriminatorColumn.databaseName)]);
        const discriminatorMetadata = metadata.childEntityMetadatas.find((childEntityMetadata) => {
          return typeof discriminatorValues.find((value) => value === childEntityMetadata.discriminatorValue) !== "undefined";
        });
        if (discriminatorMetadata) metadata = discriminatorMetadata;
      }
      let entity = metadata.create(this.queryRunner, {
        fromDeserializer: true,
        pojo: this.expressionMap.options.indexOf("create-pojo") !== -1
      });
      const hasColumns = this.transformColumns(rawResults, alias, entity, metadata);
      const hasRelations = this.transformJoins(rawResults, entity, alias, metadata);
      const hasRelationIds = this.transformRelationIds(rawResults, alias, entity, metadata);
      const hasRelationCounts = this.transformRelationCounts(rawResults, alias, entity);
      if (hasColumns) return entity;
      const hasOnlyVirtualPrimaryColumns = metadata.primaryColumns.filter((column) => column.isVirtual === false).length === 0;
      if (hasOnlyVirtualPrimaryColumns && (hasRelations || hasRelationIds || hasRelationCounts)) return entity;
      return void 0;
    }
    transformColumns(rawResults, alias, entity, metadata) {
      let hasData = false;
      metadata.columns.forEach((column) => {
        if (metadata.childEntityMetadatas.length > 0 && metadata.childEntityMetadatas.findIndex((childMetadata) => childMetadata.target === column.target) !== -1) return;
        const value = rawResults[0][DriverUtils.buildAlias(this.driver, void 0, alias.name, column.databaseName)];
        if (value === void 0 || column.isVirtual) return;
        if (!this.expressionMap.selects.find((select2) => select2.selection === alias.name || select2.selection === alias.name + "." + column.propertyPath)) return;
        column.setEntityValue(entity, this.driver.prepareHydratedValue(value, column));
        if (value !== null) hasData = true;
      });
      return hasData;
    }
    transformJoins(rawResults, entity, alias, metadata) {
      let hasData = false;
      this.expressionMap.joinAttributes.forEach((join) => {
        if (!join.metadata) return;
        if (!join.isSelected) return;
        if (join.relation && !metadata.relations.find((relation) => relation === join.relation)) return;
        if (join.mapToProperty) {
          if (join.mapToPropertyParentAlias !== alias.name) return;
        } else {
          if (!join.relation || join.parentAlias !== alias.name || join.relationPropertyPath !== join.relation.propertyPath) return;
        }
        let result = this.transform(rawResults, join.alias);
        result = !join.isMany ? result[0] : result;
        result = !join.isMany && result === void 0 ? null : result;
        if (result === void 0) return;
        if (join.mapToPropertyPropertyName) {
          entity[join.mapToPropertyPropertyName] = result;
        } else {
          join.relation.setEntityValue(entity, result);
        }
        hasData = true;
      });
      return hasData;
    }
    transformRelationIds(rawSqlResults, alias, entity, metadata) {
      let hasData = false;
      this.rawRelationIdResults.forEach((rawRelationIdResult, index2) => {
        if (rawRelationIdResult.relationIdAttribute.parentAlias !== alias.name) return;
        const relation = rawRelationIdResult.relationIdAttribute.relation;
        const valueMap = this.createValueMapFromJoinColumns(relation, rawRelationIdResult.relationIdAttribute.parentAlias, rawSqlResults);
        if (valueMap === void 0 || valueMap === null) {
          return;
        }
        this.prepareDataForTransformRelationIds();
        const hash2 = this.hashEntityIds(relation, valueMap);
        const idMaps = this.relationIdMaps[index2][hash2] || [];
        const properties = rawRelationIdResult.relationIdAttribute.mapToPropertyPropertyPath.split(".");
        const mapToProperty = (properties2, map, value) => {
          const property2 = properties2.shift();
          if (property2 && properties2.length === 0) {
            map[property2] = value;
            return map;
          }
          if (property2 && properties2.length > 0) {
            mapToProperty(properties2, map[property2], value);
          } else {
            return map;
          }
        };
        if (relation.isOneToOne || relation.isManyToOne) {
          if (idMaps[0] !== void 0) {
            mapToProperty(properties, entity, idMaps[0]);
            hasData = true;
          }
        } else {
          mapToProperty(properties, entity, idMaps);
          hasData = hasData || idMaps.length > 0;
        }
      });
      return hasData;
    }
    transformRelationCounts(rawSqlResults, alias, entity) {
      let hasData = false;
      this.rawRelationCountResults.filter((rawRelationCountResult) => rawRelationCountResult.relationCountAttribute.parentAlias === alias.name).forEach((rawRelationCountResult) => {
        const relation = rawRelationCountResult.relationCountAttribute.relation;
        let referenceColumnName;
        if (relation.isOneToMany) {
          referenceColumnName = relation.inverseRelation.joinColumns[0].referencedColumn.databaseName;
        } else {
          referenceColumnName = relation.isOwning ? relation.joinColumns[0].referencedColumn.databaseName : relation.inverseRelation.joinColumns[0].referencedColumn.databaseName;
        }
        const referenceColumnValue = rawSqlResults[0][DriverUtils.buildAlias(this.driver, void 0, alias.name, referenceColumnName)];
        if (referenceColumnValue !== void 0 && referenceColumnValue !== null) {
          entity[rawRelationCountResult.relationCountAttribute.mapToPropertyPropertyName] = 0;
          rawRelationCountResult.results.filter((result) => result["parentId"] === referenceColumnValue).forEach((result) => {
            entity[rawRelationCountResult.relationCountAttribute.mapToPropertyPropertyName] = parseInt(result["cnt"]);
            hasData = true;
          });
        }
      });
      return hasData;
    }
    createValueMapFromJoinColumns(relation, parentAlias, rawSqlResults) {
      let columns;
      if (relation.isManyToOne || relation.isOneToOneOwner) {
        columns = relation.entityMetadata.primaryColumns.map((joinColumn) => joinColumn);
      } else if (relation.isOneToMany || relation.isOneToOneNotOwner) {
        columns = relation.inverseRelation.joinColumns.map((joinColumn) => joinColumn);
      } else {
        if (relation.isOwning) {
          columns = relation.joinColumns.map((joinColumn) => joinColumn);
        } else {
          columns = relation.inverseRelation.inverseJoinColumns.map((joinColumn) => joinColumn);
        }
      }
      return columns.reduce((valueMap, column) => {
        rawSqlResults.forEach((rawSqlResult) => {
          if (relation.isManyToOne || relation.isOneToOneOwner) {
            valueMap[column.databaseName] = this.driver.prepareHydratedValue(rawSqlResult[DriverUtils.buildAlias(this.driver, void 0, parentAlias, column.databaseName)], column);
          } else {
            valueMap[column.databaseName] = this.driver.prepareHydratedValue(rawSqlResult[DriverUtils.buildAlias(this.driver, void 0, parentAlias, column.referencedColumn.databaseName)], column.referencedColumn);
          }
        });
        return valueMap;
      }, {});
    }
    extractEntityPrimaryIds(relation, relationIdRawResult) {
      let columns;
      if (relation.isManyToOne || relation.isOneToOneOwner) {
        columns = relation.entityMetadata.primaryColumns.map((joinColumn) => joinColumn);
      } else if (relation.isOneToMany || relation.isOneToOneNotOwner) {
        columns = relation.inverseRelation.joinColumns.map((joinColumn) => joinColumn);
      } else {
        if (relation.isOwning) {
          columns = relation.joinColumns.map((joinColumn) => joinColumn);
        } else {
          columns = relation.inverseRelation.inverseJoinColumns.map((joinColumn) => joinColumn);
        }
      }
      return columns.reduce((data, column) => {
        data[column.databaseName] = relationIdRawResult[column.databaseName];
        return data;
      }, {});
    }
    prepareDataForTransformRelationIds() {
      if (this.relationIdMaps) {
        return;
      }
      this.relationIdMaps = this.rawRelationIdResults.map((rawRelationIdResult) => {
        const relation = rawRelationIdResult.relationIdAttribute.relation;
        let columns;
        if (relation.isManyToOne || relation.isOneToOneOwner) {
          columns = relation.joinColumns;
        } else if (relation.isOneToMany || relation.isOneToOneNotOwner) {
          columns = relation.inverseEntityMetadata.primaryColumns;
        } else {
          if (relation.isOwning) {
            columns = relation.inverseJoinColumns;
          } else {
            columns = relation.inverseRelation.joinColumns;
          }
        }
        return rawRelationIdResult.results.reduce((agg, result) => {
          let idMap = columns.reduce((idMap2, column) => {
            let value = result[column.databaseName];
            if (relation.isOneToMany || relation.isOneToOneNotOwner) {
              if (column.isVirtual && column.referencedColumn && column.referencedColumn.propertyName !== column.propertyName) {
                value = column.referencedColumn.createValueMap(value);
              }
              return OrmUtils.mergeDeep(idMap2, column.createValueMap(value));
            }
            if (!column.isPrimary && column.referencedColumn.referencedColumn) {
              value = column.referencedColumn.referencedColumn.createValueMap(value);
            }
            return OrmUtils.mergeDeep(idMap2, column.referencedColumn.createValueMap(value));
          }, {});
          if (columns.length === 1 && !rawRelationIdResult.relationIdAttribute.disableMixedMap) {
            if (relation.isOneToMany || relation.isOneToOneNotOwner) {
              idMap = columns[0].getEntityValue(idMap);
            } else {
              idMap = columns[0].referencedColumn.getEntityValue(idMap);
            }
          }
          if (idMap !== void 0) {
            const hash2 = this.hashEntityIds(relation, result);
            if (agg[hash2]) {
              agg[hash2].push(idMap);
            } else {
              agg[hash2] = [
                idMap
              ];
            }
          }
          return agg;
        }, {});
      });
    }
    hashEntityIds(relation, data) {
      const entityPrimaryIds = this.extractEntityPrimaryIds(relation, data);
      return JSON.stringify(entityPrimaryIds);
    }
  }
  let RelationIdLoader$1 = class RelationIdLoader {
    constructor(connection, queryRunner, relationIdAttributes) {
      this.connection = connection;
      this.queryRunner = queryRunner;
      this.relationIdAttributes = relationIdAttributes;
    }
    async load(rawEntities) {
      const promises = this.relationIdAttributes.map(async (relationIdAttr) => {
        if (relationIdAttr.relation.isManyToOne || relationIdAttr.relation.isOneToOneOwner) {
          if (relationIdAttr.queryBuilderFactory) throw new TypeORMError("Additional condition can not be used with ManyToOne or OneToOne owner relations.");
          const duplicates = {};
          const results = rawEntities.map((rawEntity) => {
            const result = {};
            const duplicateParts = [];
            relationIdAttr.relation.joinColumns.forEach((joinColumn) => {
              result[joinColumn.databaseName] = this.connection.driver.prepareHydratedValue(rawEntity[DriverUtils.buildAlias(this.connection.driver, void 0, relationIdAttr.parentAlias, joinColumn.databaseName)], joinColumn.referencedColumn);
              const duplicatePart = `${joinColumn.databaseName}:${result[joinColumn.databaseName]}`;
              if (duplicateParts.indexOf(duplicatePart) === -1) {
                duplicateParts.push(duplicatePart);
              }
            });
            relationIdAttr.relation.entityMetadata.primaryColumns.forEach((primaryColumn) => {
              result[primaryColumn.databaseName] = this.connection.driver.prepareHydratedValue(rawEntity[DriverUtils.buildAlias(this.connection.driver, void 0, relationIdAttr.parentAlias, primaryColumn.databaseName)], primaryColumn);
              const duplicatePart = `${primaryColumn.databaseName}:${result[primaryColumn.databaseName]}`;
              if (duplicateParts.indexOf(duplicatePart) === -1) {
                duplicateParts.push(duplicatePart);
              }
            });
            duplicateParts.sort();
            const duplicate = duplicateParts.join("::");
            if (duplicates[duplicate]) {
              return null;
            }
            duplicates[duplicate] = true;
            return result;
          }).filter((v2) => v2);
          return {
            relationIdAttribute: relationIdAttr,
            results
          };
        } else if (relationIdAttr.relation.isOneToMany || relationIdAttr.relation.isOneToOneNotOwner) {
          const relation = relationIdAttr.relation;
          const joinColumns = relation.isOwning ? relation.joinColumns : relation.inverseRelation.joinColumns;
          const table = relation.inverseEntityMetadata.target;
          const tableName = relation.inverseEntityMetadata.tableName;
          const tableAlias = relationIdAttr.alias || tableName;
          const duplicates = {};
          const parameters = {};
          const condition = rawEntities.map((rawEntity, index2) => {
            const duplicateParts = [];
            const parameterParts = {};
            const queryPart = joinColumns.map((joinColumn) => {
              const parameterName = joinColumn.databaseName + index2;
              const parameterValue = rawEntity[DriverUtils.buildAlias(this.connection.driver, void 0, relationIdAttr.parentAlias, joinColumn.referencedColumn.databaseName)];
              const duplicatePart = `${tableAlias}:${joinColumn.propertyPath}:${parameterValue}`;
              if (duplicateParts.indexOf(duplicatePart) !== -1) {
                return "";
              }
              duplicateParts.push(duplicatePart);
              parameterParts[parameterName] = parameterValue;
              return tableAlias + "." + joinColumn.propertyPath + " = :" + parameterName;
            }).filter((v2) => v2).join(" AND ");
            duplicateParts.sort();
            const duplicate = duplicateParts.join("::");
            if (duplicates[duplicate]) {
              return "";
            }
            duplicates[duplicate] = true;
            Object.assign(parameters, parameterParts);
            return queryPart;
          }).filter((v2) => v2).map((condition2) => "(" + condition2 + ")").join(" OR ");
          if (!condition) return {
            relationIdAttribute: relationIdAttr,
            results: []
          };
          const qb = this.connection.createQueryBuilder(this.queryRunner);
          const columns = OrmUtils.uniq([
            ...joinColumns,
            ...relation.inverseRelation.entityMetadata.primaryColumns
          ], (column) => column.propertyPath);
          columns.forEach((joinColumn) => {
            qb.addSelect(tableAlias + "." + joinColumn.propertyPath, joinColumn.databaseName);
          });
          qb.from(table, tableAlias).where("(" + condition + ")").setParameters(parameters);
          if (relationIdAttr.queryBuilderFactory) relationIdAttr.queryBuilderFactory(qb);
          const results = await qb.getRawMany();
          results.forEach((result) => {
            joinColumns.forEach((column) => {
              result[column.databaseName] = this.connection.driver.prepareHydratedValue(result[column.databaseName], column.referencedColumn);
            });
            relation.inverseRelation.entityMetadata.primaryColumns.forEach((column) => {
              result[column.databaseName] = this.connection.driver.prepareHydratedValue(result[column.databaseName], column);
            });
          });
          return {
            relationIdAttribute: relationIdAttr,
            results
          };
        } else {
          const relation = relationIdAttr.relation;
          const joinColumns = relation.isOwning ? relation.joinColumns : relation.inverseRelation.inverseJoinColumns;
          const inverseJoinColumns = relation.isOwning ? relation.inverseJoinColumns : relation.inverseRelation.joinColumns;
          const junctionAlias = relationIdAttr.junctionAlias;
          const inverseSideTableName = relationIdAttr.joinInverseSideMetadata.tableName;
          const inverseSideTableAlias = relationIdAttr.alias || inverseSideTableName;
          const junctionTableName = relation.isOwning ? relation.junctionEntityMetadata.tableName : relation.inverseRelation.junctionEntityMetadata.tableName;
          const mappedColumns = rawEntities.map((rawEntity) => {
            return joinColumns.reduce((map, joinColumn) => {
              map[joinColumn.propertyPath] = rawEntity[DriverUtils.buildAlias(this.connection.driver, void 0, relationIdAttr.parentAlias, joinColumn.referencedColumn.databaseName)];
              return map;
            }, {});
          });
          if (mappedColumns.length === 0) return {
            relationIdAttribute: relationIdAttr,
            results: []
          };
          const parameters = {};
          const duplicates = {};
          const joinColumnConditions = mappedColumns.map((mappedColumn, index2) => {
            const duplicateParts = [];
            const parameterParts = {};
            const queryPart = Object.keys(mappedColumn).map((key) => {
              const parameterName = key + index2;
              const parameterValue = mappedColumn[key];
              const duplicatePart = `${junctionAlias}:${key}:${parameterValue}`;
              if (duplicateParts.indexOf(duplicatePart) !== -1) {
                return "";
              }
              duplicateParts.push(duplicatePart);
              parameterParts[parameterName] = parameterValue;
              return junctionAlias + "." + key + " = :" + parameterName;
            }).filter((s) => s).join(" AND ");
            duplicateParts.sort();
            const duplicate = duplicateParts.join("::");
            if (duplicates[duplicate]) {
              return "";
            }
            duplicates[duplicate] = true;
            Object.assign(parameters, parameterParts);
            return queryPart;
          }).filter((s) => s);
          const inverseJoinColumnCondition = inverseJoinColumns.map((joinColumn) => {
            return junctionAlias + "." + joinColumn.propertyPath + " = " + inverseSideTableAlias + "." + joinColumn.referencedColumn.propertyPath;
          }).join(" AND ");
          const condition = joinColumnConditions.map((condition2) => {
            return "(" + condition2 + " AND " + inverseJoinColumnCondition + ")";
          }).join(" OR ");
          const qb = this.connection.createQueryBuilder(this.queryRunner);
          inverseJoinColumns.forEach((joinColumn) => {
            qb.addSelect(junctionAlias + "." + joinColumn.propertyPath, joinColumn.databaseName).addOrderBy(junctionAlias + "." + joinColumn.propertyPath);
          });
          joinColumns.forEach((joinColumn) => {
            qb.addSelect(junctionAlias + "." + joinColumn.propertyPath, joinColumn.databaseName).addOrderBy(junctionAlias + "." + joinColumn.propertyPath);
          });
          qb.from(inverseSideTableName, inverseSideTableAlias).innerJoin(junctionTableName, junctionAlias, condition).setParameters(parameters);
          if (relationIdAttr.queryBuilderFactory) relationIdAttr.queryBuilderFactory(qb);
          const results = await qb.getRawMany();
          results.forEach((result) => {
            [
              ...joinColumns,
              ...inverseJoinColumns
            ].forEach((column) => {
              result[column.databaseName] = this.connection.driver.prepareHydratedValue(result[column.databaseName], column.referencedColumn);
            });
          });
          return {
            relationIdAttribute: relationIdAttr,
            results
          };
        }
      });
      return Promise.all(promises);
    }
  };
  class RelationIdLoader {
    constructor(connection, queryRunner) {
      this.connection = connection;
      this.queryRunner = queryRunner;
    }
    load(relation, entityOrEntities, relatedEntityOrRelatedEntities) {
      const entities = Array.isArray(entityOrEntities) ? entityOrEntities : [
        entityOrEntities
      ];
      const relatedEntities = Array.isArray(relatedEntityOrRelatedEntities) ? relatedEntityOrRelatedEntities : relatedEntityOrRelatedEntities ? [
        relatedEntityOrRelatedEntities
      ] : void 0;
      if (relation.isManyToMany) {
        return this.loadForManyToMany(relation, entities, relatedEntities);
      } else if (relation.isManyToOne || relation.isOneToOneOwner) {
        return this.loadForManyToOneAndOneToOneOwner(relation, entities, relatedEntities);
      } else {
        return this.loadForOneToManyAndOneToOneNotOwner(relation, entities, relatedEntities);
      }
    }
    async loadManyToManyRelationIdsAndGroup(relation, entitiesOrEntities, relatedEntityOrEntities, queryBuilder) {
      const isMany = relation.isManyToMany || relation.isOneToMany;
      const entities = Array.isArray(entitiesOrEntities) ? entitiesOrEntities : [
        entitiesOrEntities
      ];
      if (!relatedEntityOrEntities) {
        relatedEntityOrEntities = await this.connection.relationLoader.load(relation, entitiesOrEntities, this.queryRunner, queryBuilder);
        if (!relatedEntityOrEntities.length) return entities.map((entity) => ({
          entity,
          related: isMany ? [] : void 0
        }));
      }
      const relationIds = await this.load(relation, entitiesOrEntities, relatedEntityOrEntities);
      const relatedEntities = Array.isArray(relatedEntityOrEntities) ? relatedEntityOrEntities : [
        relatedEntityOrEntities
      ];
      let columns = [], inverseColumns = [];
      if (relation.isManyToManyOwner) {
        columns = relation.junctionEntityMetadata.inverseColumns.map((column) => column.referencedColumn);
        inverseColumns = relation.junctionEntityMetadata.ownerColumns.map((column) => column.referencedColumn);
      } else if (relation.isManyToManyNotOwner) {
        columns = relation.junctionEntityMetadata.ownerColumns.map((column) => column.referencedColumn);
        inverseColumns = relation.junctionEntityMetadata.inverseColumns.map((column) => column.referencedColumn);
      } else if (relation.isManyToOne || relation.isOneToOneOwner) {
        columns = relation.joinColumns.map((column) => column.referencedColumn);
        inverseColumns = relation.entityMetadata.primaryColumns;
      } else if (relation.isOneToMany || relation.isOneToOneNotOwner) {
        columns = relation.inverseRelation.entityMetadata.primaryColumns;
        inverseColumns = relation.inverseRelation.joinColumns.map((column) => column.referencedColumn);
      } else ;
      return entities.map((entity) => {
        const group = {
          entity,
          related: isMany ? [] : void 0
        };
        const entityRelationIds = relationIds.filter((relationId) => {
          return inverseColumns.every((column) => {
            return column.compareEntityValue(entity, relationId[column.entityMetadata.name + "_" + column.propertyAliasName]);
          });
        });
        if (!entityRelationIds.length) return group;
        relatedEntities.forEach((relatedEntity) => {
          entityRelationIds.forEach((relationId) => {
            const relatedEntityMatched = columns.every((column) => {
              return column.compareEntityValue(relatedEntity, relationId[DriverUtils.buildAlias(this.connection.driver, void 0, column.entityMetadata.name + "_" + relation.propertyPath.replace(".", "_") + "_" + column.propertyPath.replace(".", "_"))]);
            });
            if (relatedEntityMatched) {
              if (isMany) {
                group.related.push(relatedEntity);
              } else {
                group.related = relatedEntity;
              }
            }
          });
        });
        return group;
      });
    }
    loadForManyToMany(relation, entities, relatedEntities) {
      const junctionMetadata = relation.junctionEntityMetadata;
      const mainAlias = junctionMetadata.name;
      const columns = relation.isOwning ? junctionMetadata.ownerColumns : junctionMetadata.inverseColumns;
      const inverseColumns = relation.isOwning ? junctionMetadata.inverseColumns : junctionMetadata.ownerColumns;
      const qb = this.connection.createQueryBuilder(this.queryRunner);
      columns.forEach((column) => {
        const columnName = DriverUtils.buildAlias(this.connection.driver, void 0, column.referencedColumn.entityMetadata.name + "_" + column.referencedColumn.propertyPath.replace(".", "_"));
        qb.addSelect(mainAlias + "." + column.propertyPath, columnName);
      });
      inverseColumns.forEach((column) => {
        const columnName = DriverUtils.buildAlias(this.connection.driver, void 0, column.referencedColumn.entityMetadata.name + "_" + relation.propertyPath.replace(".", "_") + "_" + column.referencedColumn.propertyPath.replace(".", "_"));
        qb.addSelect(mainAlias + "." + column.propertyPath, columnName);
      });
      let condition1 = "";
      if (columns.length === 1) {
        const values = entities.map((entity) => columns[0].referencedColumn.getEntityValue(entity));
        const areAllNumbers = values.every((value) => typeof value === "number");
        if (areAllNumbers) {
          condition1 = `${mainAlias}.${columns[0].propertyPath} IN (${values.join(", ")})`;
        } else {
          qb.setParameter("values1", values);
          condition1 = mainAlias + "." + columns[0].propertyPath + " IN (:...values1)";
        }
      } else {
        condition1 = "(" + entities.map((entity, entityIndex) => {
          return columns.map((column) => {
            const paramName = "entity1_" + entityIndex + "_" + column.propertyName;
            qb.setParameter(paramName, column.referencedColumn.getEntityValue(entity));
            return mainAlias + "." + column.propertyPath + " = :" + paramName;
          }).join(" AND ");
        }).map((condition3) => "(" + condition3 + ")").join(" OR ") + ")";
      }
      let condition2 = "";
      if (relatedEntities) {
        if (inverseColumns.length === 1) {
          const values = relatedEntities.map((entity) => inverseColumns[0].referencedColumn.getEntityValue(entity));
          const areAllNumbers = values.every((value) => typeof value === "number");
          if (areAllNumbers) {
            condition2 = `${mainAlias}.${inverseColumns[0].propertyPath} IN (${values.join(", ")})`;
          } else {
            qb.setParameter("values2", values);
            condition2 = mainAlias + "." + inverseColumns[0].propertyPath + " IN (:...values2)";
          }
        } else {
          condition2 = "(" + relatedEntities.map((entity, entityIndex) => {
            return inverseColumns.map((column) => {
              const paramName = "entity2_" + entityIndex + "_" + column.propertyName;
              qb.setParameter(paramName, column.referencedColumn.getEntityValue(entity));
              return mainAlias + "." + column.propertyPath + " = :" + paramName;
            }).join(" AND ");
          }).map((condition3) => "(" + condition3 + ")").join(" OR ") + ")";
        }
      }
      const condition = [
        condition1,
        condition2
      ].filter((v2) => v2.length > 0).join(" AND ");
      return qb.from(junctionMetadata.target, mainAlias).where(condition).getRawMany();
    }
    loadForManyToOneAndOneToOneOwner(relation, entities, relatedEntities) {
      const mainAlias = relation.entityMetadata.targetName;
      const hasAllJoinColumnsInEntity = relation.joinColumns.every((joinColumn) => {
        return !!relation.entityMetadata.nonVirtualColumns.find((column) => column === joinColumn);
      });
      if (relatedEntities && hasAllJoinColumnsInEntity) {
        let relationIdMaps = [];
        entities.forEach((entity) => {
          let relationIdMap = {};
          relation.entityMetadata.primaryColumns.forEach((primaryColumn) => {
            const key = primaryColumn.entityMetadata.name + "_" + primaryColumn.propertyPath.replace(".", "_");
            relationIdMap[key] = primaryColumn.getEntityValue(entity);
          });
          relatedEntities.forEach((relatedEntity) => {
            relation.joinColumns.forEach((joinColumn) => {
              const entityColumnValue = joinColumn.getEntityValue(entity);
              const relatedEntityColumnValue = joinColumn.referencedColumn.getEntityValue(relatedEntity);
              if (entityColumnValue === void 0 || relatedEntityColumnValue === void 0) return;
              if (entityColumnValue === relatedEntityColumnValue) {
                const key = joinColumn.referencedColumn.entityMetadata.name + "_" + relation.propertyPath.replace(".", "_") + "_" + joinColumn.referencedColumn.propertyPath.replace(".", "_");
                relationIdMap[key] = relatedEntityColumnValue;
              }
            });
          });
          if (Object.keys(relationIdMap).length === relation.entityMetadata.primaryColumns.length + relation.joinColumns.length) {
            relationIdMaps.push(relationIdMap);
          }
        });
        if (relationIdMaps.length === entities.length) return Promise.resolve(relationIdMaps);
      }
      const qb = this.connection.createQueryBuilder(this.queryRunner);
      relation.entityMetadata.primaryColumns.forEach((primaryColumn) => {
        const columnName = DriverUtils.buildAlias(this.connection.driver, void 0, primaryColumn.entityMetadata.name + "_" + primaryColumn.propertyPath.replace(".", "_"));
        qb.addSelect(mainAlias + "." + primaryColumn.propertyPath, columnName);
      });
      relation.joinColumns.forEach((column) => {
        const columnName = DriverUtils.buildAlias(this.connection.driver, void 0, column.referencedColumn.entityMetadata.name + "_" + relation.propertyPath.replace(".", "_") + "_" + column.referencedColumn.propertyPath.replace(".", "_"));
        qb.addSelect(mainAlias + "." + column.propertyPath, columnName);
      });
      let condition = "";
      if (relation.entityMetadata.primaryColumns.length === 1) {
        const values = entities.map((entity) => relation.entityMetadata.primaryColumns[0].getEntityValue(entity));
        const areAllNumbers = values.every((value) => typeof value === "number");
        if (areAllNumbers) {
          condition = `${mainAlias}.${relation.entityMetadata.primaryColumns[0].propertyPath} IN (${values.join(", ")})`;
        } else {
          qb.setParameter("values", values);
          condition = mainAlias + "." + relation.entityMetadata.primaryColumns[0].propertyPath + " IN (:...values)";
        }
      } else {
        condition = entities.map((entity, entityIndex) => {
          return relation.entityMetadata.primaryColumns.map((column, columnIndex) => {
            const paramName = "entity" + entityIndex + "_" + columnIndex;
            qb.setParameter(paramName, column.getEntityValue(entity));
            return mainAlias + "." + column.propertyPath + " = :" + paramName;
          }).join(" AND ");
        }).map((condition2) => "(" + condition2 + ")").join(" OR ");
      }
      return qb.from(relation.entityMetadata.target, mainAlias).where(condition).getRawMany();
    }
    loadForOneToManyAndOneToOneNotOwner(relation, entities, relatedEntities) {
      relation = relation.inverseRelation;
      if (relation.entityMetadata.primaryColumns.length === relation.joinColumns.length) {
        const sameReferencedColumns = relation.entityMetadata.primaryColumns.every((column) => {
          return relation.joinColumns.indexOf(column) !== -1;
        });
        if (sameReferencedColumns) {
          return Promise.resolve(entities.map((entity) => {
            const result = {};
            relation.joinColumns.forEach(function(joinColumn) {
              const value = joinColumn.referencedColumn.getEntityValue(entity);
              const joinColumnName = joinColumn.referencedColumn.entityMetadata.name + "_" + joinColumn.referencedColumn.propertyPath.replace(".", "_");
              const primaryColumnName = joinColumn.entityMetadata.name + "_" + relation.inverseRelation.propertyPath.replace(".", "_") + "_" + joinColumn.propertyPath.replace(".", "_");
              result[joinColumnName] = value;
              result[primaryColumnName] = value;
            });
            return result;
          }));
        }
      }
      const mainAlias = relation.entityMetadata.targetName;
      const qb = this.connection.createQueryBuilder(this.queryRunner);
      relation.entityMetadata.primaryColumns.forEach((primaryColumn) => {
        const columnName = DriverUtils.buildAlias(this.connection.driver, void 0, primaryColumn.entityMetadata.name + "_" + relation.inverseRelation.propertyPath.replace(".", "_") + "_" + primaryColumn.propertyPath.replace(".", "_"));
        qb.addSelect(mainAlias + "." + primaryColumn.propertyPath, columnName);
      });
      relation.joinColumns.forEach((column) => {
        const columnName = DriverUtils.buildAlias(this.connection.driver, void 0, column.referencedColumn.entityMetadata.name + "_" + column.referencedColumn.propertyPath.replace(".", "_"));
        qb.addSelect(mainAlias + "." + column.propertyPath, columnName);
      });
      let condition = "";
      if (relation.joinColumns.length === 1) {
        const values = entities.map((entity) => relation.joinColumns[0].referencedColumn.getEntityValue(entity));
        const areAllNumbers = values.every((value) => typeof value === "number");
        if (areAllNumbers) {
          condition = `${mainAlias}.${relation.joinColumns[0].propertyPath} IN (${values.join(", ")})`;
        } else {
          qb.setParameter("values", values);
          condition = mainAlias + "." + relation.joinColumns[0].propertyPath + " IN (:...values)";
        }
      } else {
        condition = entities.map((entity, entityIndex) => {
          return relation.joinColumns.map((joinColumn, joinColumnIndex) => {
            const paramName = "entity" + entityIndex + "_" + joinColumnIndex;
            qb.setParameter(paramName, joinColumn.referencedColumn.getEntityValue(entity));
            return mainAlias + "." + joinColumn.propertyPath + " = :" + paramName;
          }).join(" AND ");
        }).map((condition2) => "(" + condition2 + ")").join(" OR ");
      }
      return qb.from(relation.entityMetadata.target, mainAlias).where(condition).getRawMany();
    }
  }
  class RelationIdMetadataToAttributeTransformer {
    constructor(expressionMap) {
      this.expressionMap = expressionMap;
    }
    transform() {
      if (this.expressionMap.mainAlias) {
        this.expressionMap.mainAlias.metadata.relationIds.forEach((relationId) => {
          const attribute = this.metadataToAttribute(this.expressionMap.mainAlias.name, relationId);
          this.expressionMap.relationIdAttributes.push(attribute);
        });
      }
      this.expressionMap.joinAttributes.forEach((join) => {
        if (!join.metadata || join.metadata.isJunction) return;
        join.metadata.relationIds.forEach((relationId) => {
          const attribute = this.metadataToAttribute(join.alias.name, relationId);
          this.expressionMap.relationIdAttributes.push(attribute);
        });
      });
    }
    metadataToAttribute(parentAliasName, relationId) {
      return new RelationIdAttribute(this.expressionMap, {
        relationName: parentAliasName + "." + relationId.relation.propertyName,
        mapToProperty: parentAliasName + "." + relationId.propertyName,
        alias: relationId.alias,
        queryBuilderFactory: relationId.queryBuilderFactory
      });
    }
  }
  class RelationCountLoader {
    constructor(connection, queryRunner, relationCountAttributes) {
      this.connection = connection;
      this.queryRunner = queryRunner;
      this.relationCountAttributes = relationCountAttributes;
    }
    async load(rawEntities) {
      const onlyUnique = (value, index2, self2) => {
        return self2.indexOf(value) === index2;
      };
      const promises = this.relationCountAttributes.map(async (relationCountAttr) => {
        if (relationCountAttr.relation.isOneToMany) {
          const relation = relationCountAttr.relation;
          const inverseRelation = relation.inverseRelation;
          const referenceColumnName = inverseRelation.joinColumns[0].referencedColumn.propertyName;
          const inverseSideTable = relation.inverseEntityMetadata.target;
          const inverseSideTableName = relation.inverseEntityMetadata.tableName;
          const inverseSideTableAlias = relationCountAttr.alias || inverseSideTableName;
          const inverseSidePropertyName = inverseRelation.propertyName;
          let referenceColumnValues = rawEntities.map((rawEntity) => rawEntity[relationCountAttr.parentAlias + "_" + referenceColumnName]).filter((value) => !!value);
          referenceColumnValues = referenceColumnValues.filter(onlyUnique);
          if (referenceColumnValues.length === 0) return {
            relationCountAttribute: relationCountAttr,
            results: []
          };
          const qb = this.connection.createQueryBuilder(this.queryRunner);
          qb.select(inverseSideTableAlias + "." + inverseSidePropertyName, "parentId").addSelect("COUNT(*)", "cnt").from(inverseSideTable, inverseSideTableAlias).where(inverseSideTableAlias + "." + inverseSidePropertyName + " IN (:...ids)").addGroupBy(inverseSideTableAlias + "." + inverseSidePropertyName).setParameter("ids", referenceColumnValues);
          if (relationCountAttr.queryBuilderFactory) relationCountAttr.queryBuilderFactory(qb);
          return {
            relationCountAttribute: relationCountAttr,
            results: await qb.getRawMany()
          };
        } else {
          let joinTableColumnName;
          let inverseJoinColumnName;
          let firstJunctionColumn;
          let secondJunctionColumn;
          if (relationCountAttr.relation.isOwning) {
            joinTableColumnName = relationCountAttr.relation.joinColumns[0].referencedColumn.databaseName;
            inverseJoinColumnName = relationCountAttr.relation.inverseJoinColumns[0].referencedColumn.databaseName;
            firstJunctionColumn = relationCountAttr.relation.junctionEntityMetadata.columns[0];
            secondJunctionColumn = relationCountAttr.relation.junctionEntityMetadata.columns[1];
          } else {
            joinTableColumnName = relationCountAttr.relation.inverseRelation.inverseJoinColumns[0].referencedColumn.databaseName;
            inverseJoinColumnName = relationCountAttr.relation.inverseRelation.joinColumns[0].referencedColumn.databaseName;
            firstJunctionColumn = relationCountAttr.relation.junctionEntityMetadata.columns[1];
            secondJunctionColumn = relationCountAttr.relation.junctionEntityMetadata.columns[0];
          }
          let referenceColumnValues = rawEntities.map((rawEntity) => rawEntity[relationCountAttr.parentAlias + "_" + joinTableColumnName]).filter((value) => !!value);
          referenceColumnValues = referenceColumnValues.filter(onlyUnique);
          if (referenceColumnValues.length === 0) return {
            relationCountAttribute: relationCountAttr,
            results: []
          };
          const junctionAlias = relationCountAttr.junctionAlias;
          const inverseSideTableName = relationCountAttr.joinInverseSideMetadata.tableName;
          const inverseSideTableAlias = relationCountAttr.alias || inverseSideTableName;
          const junctionTableName = relationCountAttr.relation.junctionEntityMetadata.tableName;
          const condition = junctionAlias + "." + firstJunctionColumn.propertyName + " IN (" + referenceColumnValues.map((vals) => isNaN(vals) ? "'" + vals + "'" : vals) + ") AND " + junctionAlias + "." + secondJunctionColumn.propertyName + " = " + inverseSideTableAlias + "." + inverseJoinColumnName;
          const qb = this.connection.createQueryBuilder(this.queryRunner);
          qb.select(junctionAlias + "." + firstJunctionColumn.propertyName, "parentId").addSelect("COUNT(" + qb.escape(inverseSideTableAlias) + "." + qb.escape(inverseJoinColumnName) + ")", "cnt").from(inverseSideTableName, inverseSideTableAlias).innerJoin(junctionTableName, junctionAlias, condition).addGroupBy(junctionAlias + "." + firstJunctionColumn.propertyName);
          if (relationCountAttr.queryBuilderFactory) relationCountAttr.queryBuilderFactory(qb);
          return {
            relationCountAttribute: relationCountAttr,
            results: await qb.getRawMany()
          };
        }
      });
      return Promise.all(promises);
    }
  }
  class RelationCountMetadataToAttributeTransformer {
    constructor(expressionMap) {
      this.expressionMap = expressionMap;
    }
    transform() {
      if (this.expressionMap.mainAlias) {
        this.expressionMap.mainAlias.metadata.relationCounts.forEach((relationCount) => {
          const attribute = this.metadataToAttribute(this.expressionMap.mainAlias.name, relationCount);
          this.expressionMap.relationCountAttributes.push(attribute);
        });
      }
      this.expressionMap.joinAttributes.forEach((join) => {
        if (!join.metadata || join.metadata.isJunction) return;
        join.metadata.relationCounts.forEach((relationCount) => {
          const attribute = this.metadataToAttribute(join.alias.name, relationCount);
          this.expressionMap.relationCountAttributes.push(attribute);
        });
      });
    }
    metadataToAttribute(parentAliasName, relationCount) {
      return new RelationCountAttribute(this.expressionMap, {
        relationName: parentAliasName + "." + relationCount.relation.propertyName,
        mapToProperty: parentAliasName + "." + relationCount.propertyName,
        alias: relationCount.alias,
        queryBuilderFactory: relationCount.queryBuilderFactory
      });
    }
  }
  class FindOptionsUtils {
    static isFindOneOptions(obj) {
      const possibleOptions = obj;
      return possibleOptions && (Array.isArray(possibleOptions.select) || Array.isArray(possibleOptions.relations) || typeof possibleOptions.select === "object" || typeof possibleOptions.relations === "object" || typeof possibleOptions.where === "object" || typeof possibleOptions.join === "object" || typeof possibleOptions.order === "object" || typeof possibleOptions.cache === "object" || typeof possibleOptions.cache === "boolean" || typeof possibleOptions.cache === "number" || typeof possibleOptions.comment === "string" || typeof possibleOptions.lock === "object" || typeof possibleOptions.loadRelationIds === "object" || typeof possibleOptions.loadRelationIds === "boolean" || typeof possibleOptions.loadEagerRelations === "boolean" || typeof possibleOptions.withDeleted === "boolean" || typeof possibleOptions.relationLoadStrategy === "string" || typeof possibleOptions.transaction === "boolean");
    }
    static isFindManyOptions(obj) {
      const possibleOptions = obj;
      return possibleOptions && (this.isFindOneOptions(possibleOptions) || typeof possibleOptions.skip === "number" || typeof possibleOptions.take === "number" || typeof possibleOptions.skip === "string" || typeof possibleOptions.take === "string");
    }
    static extractFindManyOptionsAlias(object) {
      if (this.isFindManyOptions(object) && object.join) return object.join.alias;
      return void 0;
    }
    static applyOptionsToTreeQueryBuilder(qb, options) {
      if (options == null ? void 0 : options.relations) {
        const allRelations = [
          ...options.relations
        ];
        FindOptionsUtils.applyRelationsRecursively(qb, allRelations, qb.expressionMap.mainAlias.name, qb.expressionMap.mainAlias.metadata, "");
        if (allRelations.length > 0) throw new FindRelationsNotFoundError(allRelations);
      }
      return qb;
    }
    static applyRelationsRecursively(qb, allRelations, alias, metadata, prefix) {
      let matchedBaseRelations = [];
      if (prefix) {
        const regexp = new RegExp("^" + prefix.replace(".", "\\.") + "\\.");
        matchedBaseRelations = allRelations.filter((relation) => relation.match(regexp)).map((relation) => metadata.findRelationWithPropertyPath(relation.replace(regexp, ""))).filter((entity) => entity);
      } else {
        matchedBaseRelations = allRelations.map((relation) => metadata.findRelationWithPropertyPath(relation)).filter((entity) => entity);
      }
      matchedBaseRelations.forEach((relation) => {
        let relationAlias = DriverUtils.buildAlias(qb.connection.driver, {
          joiner: "__"
        }, alias, relation.propertyPath);
        const selection2 = alias + "." + relation.propertyPath;
        if (qb.expressionMap.relationLoadStrategy === "query") {
          qb.concatRelationMetadata(relation);
        } else {
          qb.leftJoinAndSelect(selection2, relationAlias);
        }
        allRelations.splice(allRelations.indexOf(prefix ? prefix + "." + relation.propertyPath : relation.propertyPath), 1);
        let relationMetadata;
        let relationName;
        if (qb.expressionMap.relationLoadStrategy === "query") {
          relationMetadata = relation.inverseEntityMetadata;
          relationName = relationAlias;
        } else {
          const join = qb.expressionMap.joinAttributes.find((join2) => join2.entityOrProperty === selection2);
          relationMetadata = join.metadata;
          relationName = join.alias.name;
        }
        if (!relationName || !relationMetadata) {
          throw new EntityPropertyNotFoundError(relation.propertyPath, metadata);
        }
        this.applyRelationsRecursively(qb, allRelations, relationName, relationMetadata, prefix ? prefix + "." + relation.propertyPath : relation.propertyPath);
        if (qb.expressionMap.relationLoadStrategy === "join") {
          const relMetadata = metadata.relations.find((metadata2) => metadata2.propertyName === relation.propertyPath);
          if (relMetadata) {
            this.joinEagerRelations(qb, relationAlias, relMetadata.inverseEntityMetadata);
          }
        }
      });
    }
    static joinEagerRelations(qb, alias, metadata) {
      metadata.eagerRelations.forEach((relation) => {
        let relationAlias = DriverUtils.buildAlias(qb.connection.driver, {
          joiner: "__"
        }, alias, relation.propertyName);
        let addJoin = true;
        for (const join of qb.expressionMap.joinAttributes) {
          if (join.condition !== void 0 || join.mapToProperty !== void 0 || join.isMappingMany !== void 0 || join.direction !== "LEFT" || join.entityOrProperty !== `${alias}.${relation.propertyPath}`) {
            continue;
          }
          addJoin = false;
          relationAlias = join.alias.name;
          break;
        }
        const joinAlreadyAdded = Boolean(qb.expressionMap.joinAttributes.find((joinAttribute) => joinAttribute.alias.name === relationAlias));
        if (addJoin && !joinAlreadyAdded) {
          qb.leftJoin(alias + "." + relation.propertyPath, relationAlias);
        }
        let addSelect = true;
        for (const select2 of qb.expressionMap.selects) {
          if (select2.aliasName !== void 0 || select2.virtual !== void 0 || select2.selection !== relationAlias) {
            continue;
          }
          addSelect = false;
          break;
        }
        if (addSelect) {
          qb.addSelect(relationAlias);
        }
        this.joinEagerRelations(qb, relationAlias, relation.inverseEntityMetadata);
      });
    }
  }
  class SelectQueryBuilder extends QueryBuilder {
    constructor() {
      super(...arguments);
      this["@instanceof"] = Symbol.for("SelectQueryBuilder");
      this.findOptions = {};
      this.selects = [];
      this.joins = [];
      this.conditions = "";
      this.orderBys = [];
      this.relationMetadatas = [];
    }
    getQuery() {
      let sql = this.createComment();
      sql += this.createCteExpression();
      sql += this.createSelectExpression();
      sql += this.createJoinExpression();
      sql += this.createWhereExpression();
      sql += this.createGroupByExpression();
      sql += this.createHavingExpression();
      sql += this.createOrderByExpression();
      sql += this.createLimitOffsetExpression();
      sql += this.createLockExpression();
      sql = sql.trim();
      if (this.expressionMap.subQuery) sql = "(" + sql + ")";
      return this.replacePropertyNamesForTheWholeQuery(sql);
    }
    setFindOptions(findOptions) {
      this.findOptions = findOptions;
      this.applyFindOptions();
      return this;
    }
    subQuery() {
      const qb = this.createQueryBuilder();
      qb.expressionMap.subQuery = true;
      qb.parentQueryBuilder = this;
      return qb;
    }
    select(selection2, selectionAliasName) {
      this.expressionMap.queryType = "select";
      if (Array.isArray(selection2)) {
        this.expressionMap.selects = selection2.map((selection3) => ({
          selection: selection3
        }));
      } else if (typeof selection2 === "function") {
        const subQueryBuilder = selection2(this.subQuery());
        this.setParameters(subQueryBuilder.getParameters());
        this.expressionMap.selects.push({
          selection: subQueryBuilder.getQuery(),
          aliasName: selectionAliasName
        });
      } else if (selection2) {
        this.expressionMap.selects = [
          {
            selection: selection2,
            aliasName: selectionAliasName
          }
        ];
      }
      return this;
    }
    addSelect(selection2, selectionAliasName) {
      if (!selection2) return this;
      if (Array.isArray(selection2)) {
        this.expressionMap.selects = this.expressionMap.selects.concat(selection2.map((selection3) => ({
          selection: selection3
        })));
      } else if (typeof selection2 === "function") {
        const subQueryBuilder = selection2(this.subQuery());
        this.setParameters(subQueryBuilder.getParameters());
        this.expressionMap.selects.push({
          selection: subQueryBuilder.getQuery(),
          aliasName: selectionAliasName
        });
      } else if (selection2) {
        this.expressionMap.selects.push({
          selection: selection2,
          aliasName: selectionAliasName
        });
      }
      return this;
    }
    maxExecutionTime(milliseconds) {
      this.expressionMap.maxExecutionTime = milliseconds;
      return this;
    }
    distinct(distinct = true) {
      this.expressionMap.selectDistinct = distinct;
      return this;
    }
    distinctOn(distinctOn) {
      this.expressionMap.selectDistinctOn = distinctOn;
      return this;
    }
    fromDummy() {
      return this.from(this.connection.driver.dummyTableName ?? "(SELECT 1 AS dummy_column)", "dummy_table");
    }
    from(entityTarget, aliasName) {
      const mainAlias = this.createFromAlias(entityTarget, aliasName);
      this.expressionMap.setMainAlias(mainAlias);
      return this;
    }
    addFrom(entityTarget, aliasName) {
      const alias = this.createFromAlias(entityTarget, aliasName);
      if (!this.expressionMap.mainAlias) this.expressionMap.setMainAlias(alias);
      return this;
    }
    innerJoin(entityOrProperty, alias, condition, parameters) {
      this.join("INNER", entityOrProperty, alias, condition, parameters);
      return this;
    }
    leftJoin(entityOrProperty, alias, condition, parameters) {
      this.join("LEFT", entityOrProperty, alias, condition, parameters);
      return this;
    }
    innerJoinAndSelect(entityOrProperty, alias, condition, parameters) {
      this.addSelect(alias);
      this.innerJoin(entityOrProperty, alias, condition, parameters);
      return this;
    }
    leftJoinAndSelect(entityOrProperty, alias, condition, parameters) {
      this.addSelect(alias);
      this.leftJoin(entityOrProperty, alias, condition, parameters);
      return this;
    }
    innerJoinAndMapMany(mapToProperty, entityOrProperty, alias, condition, parameters) {
      this.addSelect(alias);
      this.join("INNER", entityOrProperty, alias, condition, parameters, mapToProperty, true);
      return this;
    }
    innerJoinAndMapOne(mapToProperty, entityOrProperty, alias, condition, parameters, mapAsEntity) {
      this.addSelect(alias);
      this.join("INNER", entityOrProperty, alias, condition, parameters, mapToProperty, false, mapAsEntity);
      return this;
    }
    leftJoinAndMapMany(mapToProperty, entityOrProperty, alias, condition, parameters) {
      this.addSelect(alias);
      this.join("LEFT", entityOrProperty, alias, condition, parameters, mapToProperty, true);
      return this;
    }
    leftJoinAndMapOne(mapToProperty, entityOrProperty, alias, condition, parameters, mapAsEntity) {
      this.addSelect(alias);
      this.join("LEFT", entityOrProperty, alias, condition, parameters, mapToProperty, false, mapAsEntity);
      return this;
    }
    loadRelationIdAndMap(mapToProperty, relationName, aliasNameOrOptions, queryBuilderFactory) {
      const relationIdAttribute = new RelationIdAttribute(this.expressionMap);
      relationIdAttribute.mapToProperty = mapToProperty;
      relationIdAttribute.relationName = relationName;
      if (typeof aliasNameOrOptions === "string") relationIdAttribute.alias = aliasNameOrOptions;
      if (typeof aliasNameOrOptions === "object" && aliasNameOrOptions.disableMixedMap) relationIdAttribute.disableMixedMap = true;
      relationIdAttribute.queryBuilderFactory = queryBuilderFactory;
      this.expressionMap.relationIdAttributes.push(relationIdAttribute);
      if (relationIdAttribute.relation.junctionEntityMetadata) {
        this.expressionMap.createAlias({
          type: "other",
          name: relationIdAttribute.junctionAlias,
          metadata: relationIdAttribute.relation.junctionEntityMetadata
        });
      }
      return this;
    }
    loadRelationCountAndMap(mapToProperty, relationName, aliasName, queryBuilderFactory) {
      const relationCountAttribute = new RelationCountAttribute(this.expressionMap);
      relationCountAttribute.mapToProperty = mapToProperty;
      relationCountAttribute.relationName = relationName;
      relationCountAttribute.alias = aliasName;
      relationCountAttribute.queryBuilderFactory = queryBuilderFactory;
      this.expressionMap.relationCountAttributes.push(relationCountAttribute);
      this.expressionMap.createAlias({
        type: "other",
        name: relationCountAttribute.junctionAlias
      });
      if (relationCountAttribute.relation.junctionEntityMetadata) {
        this.expressionMap.createAlias({
          type: "other",
          name: relationCountAttribute.junctionAlias,
          metadata: relationCountAttribute.relation.junctionEntityMetadata
        });
      }
      return this;
    }
    loadAllRelationIds(options) {
      this.expressionMap.mainAlias.metadata.relations.forEach((relation) => {
        if (options !== void 0 && options.relations !== void 0 && options.relations.indexOf(relation.propertyPath) === -1) return;
        this.loadRelationIdAndMap(this.expressionMap.mainAlias.name + "." + relation.propertyPath, this.expressionMap.mainAlias.name + "." + relation.propertyPath, options);
      });
      return this;
    }
    where(where, parameters) {
      this.expressionMap.wheres = [];
      const condition = this.getWhereCondition(where);
      if (condition) {
        this.expressionMap.wheres = [
          {
            type: "simple",
            condition
          }
        ];
      }
      if (parameters) this.setParameters(parameters);
      return this;
    }
    andWhere(where, parameters) {
      this.expressionMap.wheres.push({
        type: "and",
        condition: this.getWhereCondition(where)
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    orWhere(where, parameters) {
      this.expressionMap.wheres.push({
        type: "or",
        condition: this.getWhereCondition(where)
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    whereExists(subQuery) {
      return this.where(...this.getExistsCondition(subQuery));
    }
    andWhereExists(subQuery) {
      return this.andWhere(...this.getExistsCondition(subQuery));
    }
    orWhereExists(subQuery) {
      return this.orWhere(...this.getExistsCondition(subQuery));
    }
    whereInIds(ids) {
      return this.where(this.getWhereInIdsCondition(ids));
    }
    andWhereInIds(ids) {
      return this.andWhere(this.getWhereInIdsCondition(ids));
    }
    orWhereInIds(ids) {
      return this.orWhere(this.getWhereInIdsCondition(ids));
    }
    having(having, parameters) {
      this.expressionMap.havings.push({
        type: "simple",
        condition: having
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    andHaving(having, parameters) {
      this.expressionMap.havings.push({
        type: "and",
        condition: having
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    orHaving(having, parameters) {
      this.expressionMap.havings.push({
        type: "or",
        condition: having
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    groupBy(groupBy) {
      if (groupBy) {
        this.expressionMap.groupBys = [
          groupBy
        ];
      } else {
        this.expressionMap.groupBys = [];
      }
      return this;
    }
    addGroupBy(groupBy) {
      this.expressionMap.groupBys.push(groupBy);
      return this;
    }
    timeTravelQuery(timeTravelFn) {
      if (this.connection.driver.options.type === "cockroachdb") {
        if (timeTravelFn === void 0) {
          this.expressionMap.timeTravel = "follower_read_timestamp()";
        } else {
          this.expressionMap.timeTravel = timeTravelFn;
        }
      }
      return this;
    }
    orderBy(sort, order = "ASC", nulls) {
      if (order !== void 0 && order !== "ASC" && order !== "DESC") throw new TypeORMError(`SelectQueryBuilder.addOrderBy "order" can accept only "ASC" and "DESC" values.`);
      if (nulls !== void 0 && nulls !== "NULLS FIRST" && nulls !== "NULLS LAST") throw new TypeORMError(`SelectQueryBuilder.addOrderBy "nulls" can accept only "NULLS FIRST" and "NULLS LAST" values.`);
      if (sort) {
        if (typeof sort === "object") {
          this.expressionMap.orderBys = sort;
        } else {
          if (nulls) {
            this.expressionMap.orderBys = {
              [sort]: {
                order,
                nulls
              }
            };
          } else {
            this.expressionMap.orderBys = {
              [sort]: order
            };
          }
        }
      } else {
        this.expressionMap.orderBys = {};
      }
      return this;
    }
    addOrderBy(sort, order = "ASC", nulls) {
      if (order !== void 0 && order !== "ASC" && order !== "DESC") throw new TypeORMError(`SelectQueryBuilder.addOrderBy "order" can accept only "ASC" and "DESC" values.`);
      if (nulls !== void 0 && nulls !== "NULLS FIRST" && nulls !== "NULLS LAST") throw new TypeORMError(`SelectQueryBuilder.addOrderBy "nulls" can accept only "NULLS FIRST" and "NULLS LAST" values.`);
      if (nulls) {
        this.expressionMap.orderBys[sort] = {
          order,
          nulls
        };
      } else {
        this.expressionMap.orderBys[sort] = order;
      }
      return this;
    }
    limit(limit) {
      this.expressionMap.limit = this.normalizeNumber(limit);
      if (this.expressionMap.limit !== void 0 && isNaN(this.expressionMap.limit)) throw new TypeORMError(`Provided "limit" value is not a number. Please provide a numeric value.`);
      return this;
    }
    offset(offset) {
      this.expressionMap.offset = this.normalizeNumber(offset);
      if (this.expressionMap.offset !== void 0 && isNaN(this.expressionMap.offset)) throw new TypeORMError(`Provided "offset" value is not a number. Please provide a numeric value.`);
      return this;
    }
    take(take) {
      this.expressionMap.take = this.normalizeNumber(take);
      if (this.expressionMap.take !== void 0 && isNaN(this.expressionMap.take)) throw new TypeORMError(`Provided "take" value is not a number. Please provide a numeric value.`);
      return this;
    }
    skip(skip) {
      this.expressionMap.skip = this.normalizeNumber(skip);
      if (this.expressionMap.skip !== void 0 && isNaN(this.expressionMap.skip)) throw new TypeORMError(`Provided "skip" value is not a number. Please provide a numeric value.`);
      return this;
    }
    useIndex(index2) {
      this.expressionMap.useIndex = index2;
      return this;
    }
    setLock(lockMode, lockVersion, lockTables) {
      this.expressionMap.lockMode = lockMode;
      this.expressionMap.lockVersion = lockVersion;
      this.expressionMap.lockTables = lockTables;
      return this;
    }
    setOnLocked(onLocked) {
      this.expressionMap.onLocked = onLocked;
      return this;
    }
    withDeleted() {
      this.expressionMap.withDeleted = true;
      return this;
    }
    async getRawOne() {
      return (await this.getRawMany())[0];
    }
    async getRawMany() {
      if (this.expressionMap.lockMode === "optimistic") throw new OptimisticLockCanNotBeUsedError();
      this.expressionMap.queryEntity = false;
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        const results = await this.loadRawResults(queryRunner);
        if (transactionStartedByUs) {
          await queryRunner.commitTransaction();
        }
        return results;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) {
          await queryRunner.release();
        }
      }
    }
    async getRawAndEntities() {
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        this.expressionMap.queryEntity = true;
        const results = await this.executeEntitiesAndRawResults(queryRunner);
        if (transactionStartedByUs) {
          await queryRunner.commitTransaction();
        }
        return results;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) await queryRunner.release();
      }
    }
    async getOne() {
      const results = await this.getRawAndEntities();
      const result = results.entities[0];
      if (result && this.expressionMap.lockMode === "optimistic" && this.expressionMap.lockVersion) {
        const metadata = this.expressionMap.mainAlias.metadata;
        if (this.expressionMap.lockVersion instanceof Date) {
          const actualVersion = metadata.updateDateColumn.getEntityValue(result);
          if (actualVersion.getTime() !== this.expressionMap.lockVersion.getTime()) throw new OptimisticLockVersionMismatchError(metadata.name, this.expressionMap.lockVersion, actualVersion);
        } else {
          const actualVersion = metadata.versionColumn.getEntityValue(result);
          if (actualVersion !== this.expressionMap.lockVersion) throw new OptimisticLockVersionMismatchError(metadata.name, this.expressionMap.lockVersion, actualVersion);
        }
      }
      if (result === void 0) {
        return null;
      }
      return result;
    }
    async getOneOrFail() {
      const entity = await this.getOne();
      if (!entity) {
        throw new EntityNotFoundError(this.expressionMap.mainAlias.target, this.expressionMap.parameters);
      }
      return entity;
    }
    async getMany() {
      if (this.expressionMap.lockMode === "optimistic") throw new OptimisticLockCanNotBeUsedError();
      const results = await this.getRawAndEntities();
      return results.entities;
    }
    async getCount() {
      if (this.expressionMap.lockMode === "optimistic") throw new OptimisticLockCanNotBeUsedError();
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        this.expressionMap.queryEntity = false;
        const results = await this.executeCountQuery(queryRunner);
        if (transactionStartedByUs) {
          await queryRunner.commitTransaction();
        }
        return results;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) await queryRunner.release();
      }
    }
    async getExists() {
      if (this.expressionMap.lockMode === "optimistic") throw new OptimisticLockCanNotBeUsedError();
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        this.expressionMap.queryEntity = false;
        const results = await this.executeExistsQuery(queryRunner);
        if (transactionStartedByUs) {
          await queryRunner.commitTransaction();
        }
        return results;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) await queryRunner.release();
      }
    }
    async getManyAndCount() {
      if (this.expressionMap.lockMode === "optimistic") throw new OptimisticLockCanNotBeUsedError();
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        this.expressionMap.queryEntity = true;
        const entitiesAndRaw = await this.executeEntitiesAndRawResults(queryRunner);
        this.expressionMap.queryEntity = false;
        const cacheId = this.expressionMap.cacheId;
        this.expressionMap.cacheId = cacheId ? `${cacheId}-count` : cacheId;
        const count = await this.executeCountQuery(queryRunner);
        const results = [
          entitiesAndRaw.entities,
          count
        ];
        if (transactionStartedByUs) {
          await queryRunner.commitTransaction();
        }
        return results;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) await queryRunner.release();
      }
    }
    async stream() {
      this.expressionMap.queryEntity = false;
      const [sql, parameters] = this.getQueryAndParameters();
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        const releaseFn = () => {
          if (queryRunner !== this.queryRunner) return queryRunner.release();
          return;
        };
        const results = queryRunner.stream(sql, parameters, releaseFn, releaseFn);
        if (transactionStartedByUs) {
          await queryRunner.commitTransaction();
        }
        return results;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      }
    }
    cache(enabledOrMillisecondsOrId, maybeMilliseconds) {
      if (typeof enabledOrMillisecondsOrId === "boolean") {
        this.expressionMap.cache = enabledOrMillisecondsOrId;
      } else if (typeof enabledOrMillisecondsOrId === "number") {
        this.expressionMap.cache = true;
        this.expressionMap.cacheDuration = enabledOrMillisecondsOrId;
      } else if (typeof enabledOrMillisecondsOrId === "string" || typeof enabledOrMillisecondsOrId === "number") {
        this.expressionMap.cache = true;
        this.expressionMap.cacheId = enabledOrMillisecondsOrId;
      }
      if (maybeMilliseconds) {
        this.expressionMap.cacheDuration = maybeMilliseconds;
      }
      return this;
    }
    setOption(option) {
      this.expressionMap.options.push(option);
      return this;
    }
    join(direction, entityOrProperty, aliasName, condition, parameters, mapToProperty, isMappingMany, mapAsEntity) {
      if (parameters) {
        this.setParameters(parameters);
      }
      const joinAttribute = new JoinAttribute(this.connection, this.expressionMap);
      joinAttribute.direction = direction;
      joinAttribute.mapAsEntity = mapAsEntity;
      joinAttribute.mapToProperty = mapToProperty;
      joinAttribute.isMappingMany = isMappingMany;
      joinAttribute.entityOrProperty = entityOrProperty;
      joinAttribute.condition = condition;
      this.expressionMap.joinAttributes.push(joinAttribute);
      const joinAttributeMetadata = joinAttribute.metadata;
      if (joinAttributeMetadata) {
        if (joinAttributeMetadata.deleteDateColumn && !this.expressionMap.withDeleted) {
          const conditionDeleteColumn = `${aliasName}.${joinAttributeMetadata.deleteDateColumn.propertyName} IS NULL`;
          joinAttribute.condition = joinAttribute.condition ? ` ${joinAttribute.condition} AND ${conditionDeleteColumn}` : `${conditionDeleteColumn}`;
        }
        joinAttribute.alias = this.expressionMap.createAlias({
          type: "join",
          name: aliasName,
          metadata: joinAttributeMetadata
        });
        if (joinAttribute.relation && joinAttribute.relation.junctionEntityMetadata) {
          this.expressionMap.createAlias({
            type: "join",
            name: joinAttribute.junctionAlias,
            metadata: joinAttribute.relation.junctionEntityMetadata
          });
        }
      } else {
        let subQuery = "";
        if (typeof entityOrProperty === "function") {
          const subQueryBuilder = entityOrProperty(this.subQuery());
          this.setParameters(subQueryBuilder.getParameters());
          subQuery = subQueryBuilder.getQuery();
        } else {
          subQuery = entityOrProperty;
        }
        const isSubQuery = typeof entityOrProperty === "function" || entityOrProperty.substr(0, 1) === "(" && entityOrProperty.substr(-1) === ")";
        joinAttribute.alias = this.expressionMap.createAlias({
          type: "join",
          name: aliasName,
          tablePath: isSubQuery === false ? entityOrProperty : void 0,
          subQuery: isSubQuery === true ? subQuery : void 0
        });
      }
    }
    createSelectExpression() {
      if (!this.expressionMap.mainAlias) throw new TypeORMError("Cannot build query because main alias is not set (call qb#from method)");
      const allSelects = [];
      const excludedSelects = [];
      if (this.expressionMap.mainAlias.hasMetadata) {
        const metadata = this.expressionMap.mainAlias.metadata;
        allSelects.push(...this.buildEscapedEntityColumnSelects(this.expressionMap.mainAlias.name, metadata));
        excludedSelects.push(...this.findEntityColumnSelects(this.expressionMap.mainAlias.name, metadata));
      }
      this.expressionMap.joinAttributes.forEach((join) => {
        if (join.metadata) {
          allSelects.push(...this.buildEscapedEntityColumnSelects(join.alias.name, join.metadata));
          excludedSelects.push(...this.findEntityColumnSelects(join.alias.name, join.metadata));
        } else {
          const hasMainAlias = this.expressionMap.selects.some((select3) => select3.selection === join.alias.name);
          if (hasMainAlias) {
            allSelects.push({
              selection: this.escape(join.alias.name) + ".*"
            });
            const excludedSelect = this.expressionMap.selects.find((select3) => select3.selection === join.alias.name);
            excludedSelects.push(excludedSelect);
          }
        }
      });
      this.expressionMap.selects.filter((select3) => excludedSelects.indexOf(select3) === -1).forEach((select3) => allSelects.push({
        selection: this.replacePropertyNames(select3.selection),
        aliasName: select3.aliasName
      }));
      if (allSelects.length === 0) allSelects.push({
        selection: "*"
      });
      let useIndex = "";
      if (this.expressionMap.useIndex) {
        if (DriverUtils.isMySQLFamily(this.connection.driver)) {
          useIndex = ` USE INDEX (${this.expressionMap.useIndex})`;
        }
      }
      const froms = this.expressionMap.aliases.filter((alias) => alias.type === "from" && (alias.tablePath || alias.subQuery)).map((alias) => {
        if (alias.subQuery) return alias.subQuery + " " + this.escape(alias.name);
        return this.getTableName(alias.tablePath) + " " + this.escape(alias.name);
      });
      const select2 = this.createSelectDistinctExpression();
      const selection2 = allSelects.map((select3) => select3.selection + (select3.aliasName ? " AS " + this.escape(select3.aliasName) : "")).join(", ");
      return select2 + selection2 + " FROM " + froms.join(", ") + this.createTableLockExpression() + useIndex;
    }
    createSelectDistinctExpression() {
      const { selectDistinct, selectDistinctOn, maxExecutionTime } = this.expressionMap;
      const { driver } = this.connection;
      let select2 = "SELECT ";
      if (maxExecutionTime > 0) {
        if (DriverUtils.isMySQLFamily(driver)) {
          select2 += `/*+ MAX_EXECUTION_TIME(${this.expressionMap.maxExecutionTime}) */ `;
        }
      }
      if (DriverUtils.isPostgresFamily(driver) && selectDistinctOn.length > 0) {
        const selectDistinctOnMap = selectDistinctOn.map((on) => this.replacePropertyNames(on)).join(", ");
        select2 = `SELECT DISTINCT ON (${selectDistinctOnMap}) `;
      } else if (selectDistinct) {
        select2 = "SELECT DISTINCT ";
      }
      return select2;
    }
    createJoinExpression() {
      const joins = this.expressionMap.joinAttributes.map((joinAttr) => {
        const relation = joinAttr.relation;
        const destinationTableName = joinAttr.tablePath;
        const destinationTableAlias = joinAttr.alias.name;
        let appendedCondition = joinAttr.condition ? " AND (" + joinAttr.condition + ")" : "";
        const parentAlias = joinAttr.parentAlias;
        if (!parentAlias || !relation) {
          const destinationJoin = joinAttr.alias.subQuery ? joinAttr.alias.subQuery : this.getTableName(destinationTableName);
          return " " + joinAttr.direction + " JOIN " + destinationJoin + " " + this.escape(destinationTableAlias) + this.createTableLockExpression() + (joinAttr.condition ? " ON " + this.replacePropertyNames(joinAttr.condition) : "");
        }
        if (relation.isManyToOne || relation.isOneToOneOwner) {
          const condition = relation.joinColumns.map((joinColumn) => {
            return destinationTableAlias + "." + joinColumn.referencedColumn.propertyPath + "=" + parentAlias + "." + relation.propertyPath + "." + joinColumn.referencedColumn.propertyPath;
          }).join(" AND ");
          return " " + joinAttr.direction + " JOIN " + this.getTableName(destinationTableName) + " " + this.escape(destinationTableAlias) + this.createTableLockExpression() + " ON " + this.replacePropertyNames(condition + appendedCondition);
        } else if (relation.isOneToMany || relation.isOneToOneNotOwner) {
          const condition = relation.inverseRelation.joinColumns.map((joinColumn) => {
            if (relation.inverseEntityMetadata.tableType === "entity-child" && relation.inverseEntityMetadata.discriminatorColumn) {
              appendedCondition += " AND " + destinationTableAlias + "." + relation.inverseEntityMetadata.discriminatorColumn.databaseName + "='" + relation.inverseEntityMetadata.discriminatorValue + "'";
            }
            return destinationTableAlias + "." + relation.inverseRelation.propertyPath + "." + joinColumn.referencedColumn.propertyPath + "=" + parentAlias + "." + joinColumn.referencedColumn.propertyPath;
          }).join(" AND ");
          if (!condition) throw new TypeORMError(`Relation ${relation.entityMetadata.name}.${relation.propertyName} does not have join columns.`);
          return " " + joinAttr.direction + " JOIN " + this.getTableName(destinationTableName) + " " + this.escape(destinationTableAlias) + this.createTableLockExpression() + " ON " + this.replacePropertyNames(condition + appendedCondition);
        } else {
          const junctionTableName = relation.junctionEntityMetadata.tablePath;
          const junctionAlias = joinAttr.junctionAlias;
          let junctionCondition = "", destinationCondition = "";
          if (relation.isOwning) {
            junctionCondition = relation.joinColumns.map((joinColumn) => {
              return junctionAlias + "." + joinColumn.propertyPath + "=" + parentAlias + "." + joinColumn.referencedColumn.propertyPath;
            }).join(" AND ");
            destinationCondition = relation.inverseJoinColumns.map((joinColumn) => {
              return destinationTableAlias + "." + joinColumn.referencedColumn.propertyPath + "=" + junctionAlias + "." + joinColumn.propertyPath;
            }).join(" AND ");
          } else {
            junctionCondition = relation.inverseRelation.inverseJoinColumns.map((joinColumn) => {
              return junctionAlias + "." + joinColumn.propertyPath + "=" + parentAlias + "." + joinColumn.referencedColumn.propertyPath;
            }).join(" AND ");
            destinationCondition = relation.inverseRelation.joinColumns.map((joinColumn) => {
              return destinationTableAlias + "." + joinColumn.referencedColumn.propertyPath + "=" + junctionAlias + "." + joinColumn.propertyPath;
            }).join(" AND ");
          }
          return " " + joinAttr.direction + " JOIN " + this.getTableName(junctionTableName) + " " + this.escape(junctionAlias) + this.createTableLockExpression() + " ON " + this.replacePropertyNames(junctionCondition) + " " + joinAttr.direction + " JOIN " + this.getTableName(destinationTableName) + " " + this.escape(destinationTableAlias) + this.createTableLockExpression() + " ON " + this.replacePropertyNames(destinationCondition + appendedCondition);
        }
      });
      return joins.join(" ");
    }
    createGroupByExpression() {
      if (!this.expressionMap.groupBys || !this.expressionMap.groupBys.length) return "";
      return " GROUP BY " + this.replacePropertyNames(this.expressionMap.groupBys.join(", "));
    }
    createOrderByExpression() {
      const orderBys = this.expressionMap.allOrderBys;
      if (Object.keys(orderBys).length === 0) return "";
      return " ORDER BY " + Object.keys(orderBys).map((columnName) => {
        const orderValue = typeof orderBys[columnName] === "string" ? orderBys[columnName] : orderBys[columnName].order + " " + orderBys[columnName].nulls;
        const selection2 = this.expressionMap.selects.find((s) => s.selection === columnName);
        if (selection2 && !selection2.aliasName && columnName.indexOf(".") !== -1) {
          const criteriaParts = columnName.split(".");
          const aliasName = criteriaParts[0];
          const propertyPath = criteriaParts.slice(1).join(".");
          const alias = this.expressionMap.aliases.find((alias2) => alias2.name === aliasName);
          if (alias) {
            const column = alias.metadata.findColumnWithPropertyPath(propertyPath);
            if (column) {
              const orderAlias = DriverUtils.buildAlias(this.connection.driver, void 0, aliasName, column.databaseName);
              return this.escape(orderAlias) + " " + orderValue;
            }
          }
        }
        return this.replacePropertyNames(columnName) + " " + orderValue;
      }).join(", ");
    }
    createLimitOffsetExpression() {
      let offset = this.expressionMap.offset, limit = this.expressionMap.limit;
      if (!offset && !limit && this.expressionMap.joinAttributes.length === 0) {
        offset = this.expressionMap.skip;
        limit = this.expressionMap.take;
      }
      if (this.connection.driver.options.type === "mssql") {
        let prefix = "";
        if ((limit || offset) && Object.keys(this.expressionMap.allOrderBys).length <= 0) {
          prefix = " ORDER BY (SELECT NULL)";
        }
        if (limit && offset) return prefix + " OFFSET " + offset + " ROWS FETCH NEXT " + limit + " ROWS ONLY";
        if (limit) return prefix + " OFFSET 0 ROWS FETCH NEXT " + limit + " ROWS ONLY";
        if (offset) return prefix + " OFFSET " + offset + " ROWS";
      } else if (DriverUtils.isMySQLFamily(this.connection.driver) || this.connection.driver.options.type === "aurora-mysql" || this.connection.driver.options.type === "sap" || this.connection.driver.options.type === "spanner") {
        if (limit && offset) return " LIMIT " + limit + " OFFSET " + offset;
        if (limit) return " LIMIT " + limit;
        if (offset) throw new OffsetWithoutLimitNotSupportedError();
      } else if (DriverUtils.isSQLiteFamily(this.connection.driver)) {
        if (limit && offset) return " LIMIT " + limit + " OFFSET " + offset;
        if (limit) return " LIMIT " + limit;
        if (offset) return " LIMIT -1 OFFSET " + offset;
      } else if (this.connection.driver.options.type === "oracle") {
        if (limit && offset) return " OFFSET " + offset + " ROWS FETCH NEXT " + limit + " ROWS ONLY";
        if (limit) return " FETCH NEXT " + limit + " ROWS ONLY";
        if (offset) return " OFFSET " + offset + " ROWS";
      } else {
        if (limit && offset) return " LIMIT " + limit + " OFFSET " + offset;
        if (limit) return " LIMIT " + limit;
        if (offset) return " OFFSET " + offset;
      }
      return "";
    }
    createTableLockExpression() {
      if (this.connection.driver.options.type === "mssql") {
        switch (this.expressionMap.lockMode) {
          case "pessimistic_read":
            return " WITH (HOLDLOCK, ROWLOCK)";
          case "pessimistic_write":
            return " WITH (UPDLOCK, ROWLOCK)";
          case "dirty_read":
            return " WITH (NOLOCK)";
        }
      }
      return "";
    }
    createLockExpression() {
      const driver = this.connection.driver;
      let lockTablesClause = "";
      if (this.expressionMap.lockTables) {
        if (!(DriverUtils.isPostgresFamily(driver) || driver.options.type === "cockroachdb")) {
          throw new TypeORMError("Lock tables not supported in selected driver");
        }
        if (this.expressionMap.lockTables.length < 1) {
          throw new TypeORMError("lockTables cannot be an empty array");
        }
        lockTablesClause = " OF " + this.expressionMap.lockTables.join(", ");
      }
      let onLockExpression = "";
      if (this.expressionMap.onLocked === "nowait") {
        onLockExpression = " NOWAIT";
      } else if (this.expressionMap.onLocked === "skip_locked") {
        onLockExpression = " SKIP LOCKED";
      }
      switch (this.expressionMap.lockMode) {
        case "pessimistic_read":
          if (driver.options.type === "mysql" || driver.options.type === "aurora-mysql") {
            if (DriverUtils.isReleaseVersionOrGreater(driver, "8.0.0")) {
              return " FOR SHARE" + lockTablesClause + onLockExpression;
            } else {
              return " LOCK IN SHARE MODE";
            }
          } else if (driver.options.type === "mariadb") {
            return " LOCK IN SHARE MODE";
          } else if (DriverUtils.isPostgresFamily(driver)) {
            return " FOR SHARE" + lockTablesClause + onLockExpression;
          } else if (driver.options.type === "oracle") {
            return " FOR UPDATE";
          } else if (driver.options.type === "mssql") {
            return "";
          } else {
            throw new LockNotSupportedOnGivenDriverError();
          }
        case "pessimistic_write":
          if (DriverUtils.isMySQLFamily(driver) || driver.options.type === "aurora-mysql" || driver.options.type === "oracle") {
            return " FOR UPDATE" + onLockExpression;
          } else if (DriverUtils.isPostgresFamily(driver) || driver.options.type === "cockroachdb") {
            return " FOR UPDATE" + lockTablesClause + onLockExpression;
          } else if (driver.options.type === "mssql") {
            return "";
          } else {
            throw new LockNotSupportedOnGivenDriverError();
          }
        case "pessimistic_partial_write":
          if (DriverUtils.isPostgresFamily(driver)) {
            return " FOR UPDATE" + lockTablesClause + " SKIP LOCKED";
          } else if (DriverUtils.isMySQLFamily(driver)) {
            return " FOR UPDATE SKIP LOCKED";
          } else {
            throw new LockNotSupportedOnGivenDriverError();
          }
        case "pessimistic_write_or_fail":
          if (DriverUtils.isPostgresFamily(driver) || driver.options.type === "cockroachdb") {
            return " FOR UPDATE" + lockTablesClause + " NOWAIT";
          } else if (DriverUtils.isMySQLFamily(driver)) {
            return " FOR UPDATE NOWAIT";
          } else {
            throw new LockNotSupportedOnGivenDriverError();
          }
        case "for_no_key_update":
          if (DriverUtils.isPostgresFamily(driver) || driver.options.type === "cockroachdb") {
            return " FOR NO KEY UPDATE" + lockTablesClause + onLockExpression;
          } else {
            throw new LockNotSupportedOnGivenDriverError();
          }
        case "for_key_share":
          if (DriverUtils.isPostgresFamily(driver)) {
            return " FOR KEY SHARE" + lockTablesClause + onLockExpression;
          } else {
            throw new LockNotSupportedOnGivenDriverError();
          }
        default:
          return "";
      }
    }
    createHavingExpression() {
      if (!this.expressionMap.havings || !this.expressionMap.havings.length) return "";
      const conditions = this.expressionMap.havings.map((having, index2) => {
        switch (having.type) {
          case "and":
            return (index2 > 0 ? "AND " : "") + this.replacePropertyNames(having.condition);
          case "or":
            return (index2 > 0 ? "OR " : "") + this.replacePropertyNames(having.condition);
          default:
            return this.replacePropertyNames(having.condition);
        }
      }).join(" ");
      if (!conditions.length) return "";
      return " HAVING " + conditions;
    }
    buildEscapedEntityColumnSelects(aliasName, metadata) {
      const hasMainAlias = this.expressionMap.selects.some((select2) => select2.selection === aliasName);
      const columns = [];
      if (hasMainAlias) {
        columns.push(...metadata.columns.filter((column) => column.isSelect === true));
      }
      columns.push(...metadata.columns.filter((column) => {
        return this.expressionMap.selects.some((select2) => select2.selection === aliasName + "." + column.propertyPath);
      }));
      if (columns.length === 0) return [];
      const nonSelectedPrimaryColumns = this.expressionMap.queryEntity ? metadata.primaryColumns.filter((primaryColumn) => columns.indexOf(primaryColumn) === -1) : [];
      const allColumns = [
        ...columns,
        ...nonSelectedPrimaryColumns
      ];
      const finalSelects = [];
      const escapedAliasName = this.escape(aliasName);
      allColumns.forEach((column) => {
        let selectionPath = escapedAliasName + "." + this.escape(column.databaseName);
        if (column.isVirtualProperty && column.query) {
          selectionPath = `(${column.query(escapedAliasName)})`;
        }
        if (this.connection.driver.spatialTypes.indexOf(column.type) !== -1) {
          if (DriverUtils.isMySQLFamily(this.connection.driver) || this.connection.driver.options.type === "aurora-mysql") {
            const useLegacy = this.connection.driver.options.legacySpatialSupport;
            const asText = useLegacy ? "AsText" : "ST_AsText";
            selectionPath = `${asText}(${selectionPath})`;
          }
          if (DriverUtils.isPostgresFamily(this.connection.driver)) if (column.precision) {
            selectionPath = `ST_AsGeoJSON(${selectionPath}, ${column.precision})::json`;
          } else {
            selectionPath = `ST_AsGeoJSON(${selectionPath})::json`;
          }
          if (this.connection.driver.options.type === "mssql") selectionPath = `${selectionPath}.ToString()`;
        }
        const selections = this.expressionMap.selects.filter((select2) => select2.selection === aliasName + "." + column.propertyPath);
        if (selections.length) {
          selections.forEach((selection2) => {
            finalSelects.push({
              selection: selectionPath,
              aliasName: selection2.aliasName ? selection2.aliasName : DriverUtils.buildAlias(this.connection.driver, void 0, aliasName, column.databaseName),
              virtual: selection2.virtual
            });
          });
        } else {
          if (column.isVirtualProperty) {
            return;
          }
          finalSelects.push({
            selection: selectionPath,
            aliasName: DriverUtils.buildAlias(this.connection.driver, void 0, aliasName, column.databaseName),
            virtual: hasMainAlias
          });
        }
      });
      return finalSelects;
    }
    findEntityColumnSelects(aliasName, metadata) {
      const mainSelect = this.expressionMap.selects.find((select2) => select2.selection === aliasName);
      if (mainSelect) return [
        mainSelect
      ];
      return this.expressionMap.selects.filter((select2) => {
        return metadata.columns.some((column) => select2.selection === aliasName + "." + column.propertyPath);
      });
    }
    computeCountExpression() {
      const mainAlias = this.expressionMap.mainAlias.name;
      const metadata = this.expressionMap.mainAlias.metadata;
      const primaryColumns = metadata.primaryColumns;
      const distinctAlias = this.escape(mainAlias);
      if (this.expressionMap.joinAttributes.length === 0 && this.expressionMap.relationIdAttributes.length === 0 && this.expressionMap.relationCountAttributes.length === 0) {
        return "COUNT(1)";
      }
      if (this.connection.driver.options.type === "cockroachdb" || DriverUtils.isPostgresFamily(this.connection.driver)) {
        return "COUNT(DISTINCT(" + primaryColumns.map((c) => `${distinctAlias}.${this.escape(c.databaseName)}`).join(", ") + "))";
      }
      if (DriverUtils.isMySQLFamily(this.connection.driver)) {
        return "COUNT(DISTINCT " + primaryColumns.map((c) => `${distinctAlias}.${this.escape(c.databaseName)}`).join(", ") + ")";
      }
      if (this.connection.driver.options.type === "mssql") {
        const columnsExpression = primaryColumns.map((primaryColumn) => `${distinctAlias}.${this.escape(primaryColumn.databaseName)}`).join(", '|;|', ");
        if (primaryColumns.length === 1) {
          return `COUNT(DISTINCT(${columnsExpression}))`;
        }
        return `COUNT(DISTINCT(CONCAT(${columnsExpression})))`;
      }
      if (this.connection.driver.options.type === "spanner") {
        if (primaryColumns.length === 1) {
          return `COUNT(DISTINCT(${distinctAlias}.${this.escape(primaryColumns[0].databaseName)}))`;
        }
        const columnsExpression = primaryColumns.map((primaryColumn) => `CAST(${distinctAlias}.${this.escape(primaryColumn.databaseName)} AS STRING)`).join(", '|;|', ");
        return `COUNT(DISTINCT(CONCAT(${columnsExpression})))`;
      }
      return `COUNT(DISTINCT(` + primaryColumns.map((c) => `${distinctAlias}.${this.escape(c.databaseName)}`).join(" || '|;|' || ") + "))";
    }
    async executeCountQuery(queryRunner) {
      const countSql = this.computeCountExpression();
      const results = await this.clone().orderBy().groupBy().offset(void 0).limit(void 0).skip(void 0).take(void 0).select(countSql, "cnt").setOption("disable-global-order").loadRawResults(queryRunner);
      if (!results || !results[0] || !results[0]["cnt"]) return 0;
      return parseInt(results[0]["cnt"]);
    }
    async executeExistsQuery(queryRunner) {
      const results = await this.connection.createQueryBuilder().fromDummy().select("1", "row_exists").whereExists(this).limit(1).loadRawResults(queryRunner);
      return results.length > 0;
    }
    applyFindOptions() {
      if (this.expressionMap.mainAlias.metadata) {
        if (this.findOptions.relationLoadStrategy) {
          this.expressionMap.relationLoadStrategy = this.findOptions.relationLoadStrategy;
        }
        if (this.findOptions.comment) {
          this.comment(this.findOptions.comment);
        }
        if (this.findOptions.withDeleted) {
          this.withDeleted();
        }
        if (this.findOptions.select) {
          const select2 = Array.isArray(this.findOptions.select) ? OrmUtils.propertyPathsToTruthyObject(this.findOptions.select) : this.findOptions.select;
          this.buildSelect(select2, this.expressionMap.mainAlias.metadata, this.expressionMap.mainAlias.name);
        }
        if (this.selects.length) {
          this.select(this.selects);
        }
        this.selects = [];
        if (this.findOptions.relations) {
          const relations = Array.isArray(this.findOptions.relations) ? OrmUtils.propertyPathsToTruthyObject(this.findOptions.relations) : this.findOptions.relations;
          this.buildRelations(relations, typeof this.findOptions.select === "object" ? this.findOptions.select : void 0, this.expressionMap.mainAlias.metadata, this.expressionMap.mainAlias.name);
          if (this.findOptions.loadEagerRelations !== false && this.expressionMap.relationLoadStrategy === "join") {
            this.buildEagerRelations(relations, typeof this.findOptions.select === "object" ? this.findOptions.select : void 0, this.expressionMap.mainAlias.metadata, this.expressionMap.mainAlias.name);
          }
        }
        if (this.selects.length) {
          this.addSelect(this.selects);
        }
        if (this.findOptions.where) {
          this.conditions = this.buildWhere(this.findOptions.where, this.expressionMap.mainAlias.metadata, this.expressionMap.mainAlias.name);
          if (this.conditions.length) this.andWhere(this.conditions.substr(0, 1) !== "(" ? "(" + this.conditions + ")" : this.conditions);
        }
        if (this.findOptions.order) {
          this.buildOrder(this.findOptions.order, this.expressionMap.mainAlias.metadata, this.expressionMap.mainAlias.name);
        }
        if (this.joins.length) {
          this.joins.forEach((join) => {
            if (join.select && !join.selection) {
              if (join.type === "inner") {
                this.innerJoinAndSelect(`${join.parentAlias}.${join.relationMetadata.propertyPath}`, join.alias);
              } else {
                this.leftJoinAndSelect(`${join.parentAlias}.${join.relationMetadata.propertyPath}`, join.alias);
              }
            } else {
              if (join.type === "inner") {
                this.innerJoin(`${join.parentAlias}.${join.relationMetadata.propertyPath}`, join.alias);
              } else {
                this.leftJoin(`${join.parentAlias}.${join.relationMetadata.propertyPath}`, join.alias);
              }
            }
          });
        }
        if (this.findOptions.skip !== void 0) {
          this.skip(this.findOptions.skip);
        }
        if (this.findOptions.take !== void 0) {
          this.take(this.findOptions.take);
        }
        if (typeof this.findOptions.cache === "number") {
          this.cache(this.findOptions.cache);
        } else if (typeof this.findOptions.cache === "boolean") {
          this.cache(this.findOptions.cache);
        } else if (typeof this.findOptions.cache === "object") {
          this.cache(this.findOptions.cache.id, this.findOptions.cache.milliseconds);
        }
        if (this.findOptions.join) {
          if (this.findOptions.join.leftJoin) Object.keys(this.findOptions.join.leftJoin).forEach((key) => {
            this.leftJoin(this.findOptions.join.leftJoin[key], key);
          });
          if (this.findOptions.join.innerJoin) Object.keys(this.findOptions.join.innerJoin).forEach((key) => {
            this.innerJoin(this.findOptions.join.innerJoin[key], key);
          });
          if (this.findOptions.join.leftJoinAndSelect) Object.keys(this.findOptions.join.leftJoinAndSelect).forEach((key) => {
            this.leftJoinAndSelect(this.findOptions.join.leftJoinAndSelect[key], key);
          });
          if (this.findOptions.join.innerJoinAndSelect) Object.keys(this.findOptions.join.innerJoinAndSelect).forEach((key) => {
            this.innerJoinAndSelect(this.findOptions.join.innerJoinAndSelect[key], key);
          });
        }
        if (this.findOptions.lock) {
          if (this.findOptions.lock.mode === "optimistic") {
            this.setLock(this.findOptions.lock.mode, this.findOptions.lock.version);
          } else if (this.findOptions.lock.mode === "pessimistic_read" || this.findOptions.lock.mode === "pessimistic_write" || this.findOptions.lock.mode === "dirty_read" || this.findOptions.lock.mode === "pessimistic_partial_write" || this.findOptions.lock.mode === "pessimistic_write_or_fail" || this.findOptions.lock.mode === "for_no_key_update" || this.findOptions.lock.mode === "for_key_share") {
            const tableNames = this.findOptions.lock.tables ? this.findOptions.lock.tables.map((table) => {
              const tableAlias = this.expressionMap.aliases.find((alias) => {
                return alias.metadata.tableNameWithoutPrefix === table;
              });
              if (!tableAlias) {
                throw new TypeORMError(`"${table}" is not part of this query`);
              }
              return this.escape(tableAlias.name);
            }) : void 0;
            this.setLock(this.findOptions.lock.mode, void 0, tableNames);
            if (this.findOptions.lock.onLocked) {
              this.setOnLocked(this.findOptions.lock.onLocked);
            }
          }
        }
        if (this.findOptions.loadRelationIds === true) {
          this.loadAllRelationIds();
        } else if (typeof this.findOptions.loadRelationIds === "object") {
          this.loadAllRelationIds(this.findOptions.loadRelationIds);
        }
        if (this.findOptions.loadEagerRelations !== false) {
          FindOptionsUtils.joinEagerRelations(this, this.expressionMap.mainAlias.name, this.expressionMap.mainAlias.metadata);
        }
        if (this.findOptions.transaction === true) {
          this.expressionMap.useTransaction = true;
        }
      }
    }
    concatRelationMetadata(relationMetadata) {
      this.relationMetadatas.push(relationMetadata);
    }
    async executeEntitiesAndRawResults(queryRunner) {
      if (!this.expressionMap.mainAlias) throw new TypeORMError(`Alias is not set. Use "from" method to set an alias.`);
      if ((this.expressionMap.lockMode === "pessimistic_read" || this.expressionMap.lockMode === "pessimistic_write" || this.expressionMap.lockMode === "pessimistic_partial_write" || this.expressionMap.lockMode === "pessimistic_write_or_fail" || this.expressionMap.lockMode === "for_no_key_update" || this.expressionMap.lockMode === "for_key_share") && !queryRunner.isTransactionActive) throw new PessimisticLockTransactionRequiredError();
      if (this.expressionMap.lockMode === "optimistic") {
        const metadata = this.expressionMap.mainAlias.metadata;
        if (!metadata.versionColumn && !metadata.updateDateColumn) throw new NoVersionOrUpdateDateColumnError(metadata.name);
      }
      const relationIdLoader = new RelationIdLoader$1(this.connection, queryRunner, this.expressionMap.relationIdAttributes);
      const relationCountLoader = new RelationCountLoader(this.connection, queryRunner, this.expressionMap.relationCountAttributes);
      const relationIdMetadataTransformer = new RelationIdMetadataToAttributeTransformer(this.expressionMap);
      relationIdMetadataTransformer.transform();
      const relationCountMetadataTransformer = new RelationCountMetadataToAttributeTransformer(this.expressionMap);
      relationCountMetadataTransformer.transform();
      let rawResults = [], entities = [];
      if ((this.expressionMap.skip || this.expressionMap.take) && this.expressionMap.joinAttributes.length > 0) {
        const [selects, orderBys] = this.createOrderByCombinedWithSelectExpression("distinctAlias");
        const metadata = this.expressionMap.mainAlias.metadata;
        const mainAliasName = this.expressionMap.mainAlias.name;
        const querySelects = metadata.primaryColumns.map((primaryColumn) => {
          const distinctAlias = this.escape("distinctAlias");
          const columnAlias = this.escape(DriverUtils.buildAlias(this.connection.driver, void 0, mainAliasName, primaryColumn.databaseName));
          if (!orderBys[columnAlias]) orderBys[columnAlias] = "ASC";
          const alias = DriverUtils.buildAlias(this.connection.driver, void 0, "ids_" + mainAliasName, primaryColumn.databaseName);
          return `${distinctAlias}.${columnAlias} AS ${this.escape(alias)}`;
        });
        const originalQuery = this.clone();
        const originalQueryTimeTravel = originalQuery.expressionMap.timeTravel;
        rawResults = await new SelectQueryBuilder(this.connection, queryRunner).select(`DISTINCT ${querySelects.join(", ")}`).addSelect(selects).from(`(${originalQuery.orderBy().timeTravelQuery(false).getQuery()})`, "distinctAlias").timeTravelQuery(originalQueryTimeTravel).offset(this.expressionMap.skip).limit(this.expressionMap.take).orderBy(orderBys).cache(this.expressionMap.cache && this.expressionMap.cacheId ? `${this.expressionMap.cacheId}-pagination` : this.expressionMap.cache, this.expressionMap.cacheDuration).setParameters(this.getParameters()).setNativeParameters(this.expressionMap.nativeParameters).getRawMany();
        if (rawResults.length > 0) {
          let condition = "";
          const parameters = {};
          if (metadata.hasMultiplePrimaryKeys) {
            condition = rawResults.map((result, index2) => {
              return metadata.primaryColumns.map((primaryColumn) => {
                const paramKey = `orm_distinct_ids_${index2}_${primaryColumn.databaseName}`;
                const paramKeyResult = DriverUtils.buildAlias(this.connection.driver, void 0, "ids_" + mainAliasName, primaryColumn.databaseName);
                parameters[paramKey] = result[paramKeyResult];
                return `${mainAliasName}.${primaryColumn.propertyPath}=:${paramKey}`;
              }).join(" AND ");
            }).join(" OR ");
          } else {
            const alias = DriverUtils.buildAlias(this.connection.driver, void 0, "ids_" + mainAliasName, metadata.primaryColumns[0].databaseName);
            const ids = rawResults.map((result) => result[alias]);
            const areAllNumbers = ids.every((id2) => typeof id2 === "number");
            if (areAllNumbers) {
              condition = `${mainAliasName}.${metadata.primaryColumns[0].propertyPath} IN (${ids.join(", ")})`;
            } else {
              parameters["orm_distinct_ids"] = ids;
              condition = mainAliasName + "." + metadata.primaryColumns[0].propertyPath + " IN (:...orm_distinct_ids)";
            }
          }
          rawResults = await this.clone().mergeExpressionMap({
            extraAppendedAndWhereCondition: condition
          }).setParameters(parameters).loadRawResults(queryRunner);
        }
      } else {
        rawResults = await this.loadRawResults(queryRunner);
      }
      if (rawResults.length > 0) {
        const rawRelationIdResults = await relationIdLoader.load(rawResults);
        const rawRelationCountResults = await relationCountLoader.load(rawResults);
        const transformer = new RawSqlResultsToEntityTransformer(this.expressionMap, this.connection.driver, rawRelationIdResults, rawRelationCountResults, this.queryRunner);
        entities = transformer.transform(rawResults, this.expressionMap.mainAlias);
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          await queryRunner.broadcaster.broadcast("Load", this.expressionMap.mainAlias.metadata, entities);
        }
      }
      if (this.expressionMap.relationLoadStrategy === "query") {
        const queryStrategyRelationIdLoader = new RelationIdLoader(this.connection, queryRunner);
        await Promise.all(this.relationMetadatas.map(async (relation) => {
          const relationTarget = relation.inverseEntityMetadata.target;
          const relationAlias = relation.inverseEntityMetadata.targetName;
          const select2 = Array.isArray(this.findOptions.select) ? OrmUtils.propertyPathsToTruthyObject(this.findOptions.select) : this.findOptions.select;
          const relations = Array.isArray(this.findOptions.relations) ? OrmUtils.propertyPathsToTruthyObject(this.findOptions.relations) : this.findOptions.relations;
          const queryBuilder = this.createQueryBuilder(queryRunner).select(relationAlias).from(relationTarget, relationAlias).setFindOptions({
            select: select2 ? OrmUtils.deepValue(select2, relation.propertyPath) : void 0,
            order: this.findOptions.order ? OrmUtils.deepValue(this.findOptions.order, relation.propertyPath) : void 0,
            relations: relations ? OrmUtils.deepValue(relations, relation.propertyPath) : void 0,
            withDeleted: this.findOptions.withDeleted,
            relationLoadStrategy: this.findOptions.relationLoadStrategy
          });
          if (entities.length > 0) {
            const relatedEntityGroups = await queryStrategyRelationIdLoader.loadManyToManyRelationIdsAndGroup(relation, entities, void 0, queryBuilder);
            entities.forEach((entity) => {
              const relatedEntityGroup = relatedEntityGroups.find((group) => group.entity === entity);
              if (relatedEntityGroup) {
                const value = relatedEntityGroup.related === void 0 ? null : relatedEntityGroup.related;
                relation.setEntityValue(entity, value);
              }
            });
          }
        }));
      }
      return {
        raw: rawResults,
        entities
      };
    }
    createOrderByCombinedWithSelectExpression(parentAlias) {
      const orderBys = this.expressionMap.allOrderBys;
      const selectString = Object.keys(orderBys).map((orderCriteria) => {
        if (orderCriteria.indexOf(".") !== -1) {
          const criteriaParts = orderCriteria.split(".");
          const aliasName = criteriaParts[0];
          const propertyPath = criteriaParts.slice(1).join(".");
          const alias = this.expressionMap.findAliasByName(aliasName);
          const column = alias.metadata.findColumnWithPropertyPath(propertyPath);
          return this.escape(parentAlias) + "." + this.escape(DriverUtils.buildAlias(this.connection.driver, void 0, aliasName, column.databaseName));
        } else {
          if (this.expressionMap.selects.find((select2) => select2.selection === orderCriteria || select2.aliasName === orderCriteria)) return this.escape(parentAlias) + "." + this.escape(orderCriteria);
          return "";
        }
      }).join(", ");
      const orderByObject = {};
      Object.keys(orderBys).forEach((orderCriteria) => {
        if (orderCriteria.indexOf(".") !== -1) {
          const criteriaParts = orderCriteria.split(".");
          const aliasName = criteriaParts[0];
          const propertyPath = criteriaParts.slice(1).join(".");
          const alias = this.expressionMap.findAliasByName(aliasName);
          const column = alias.metadata.findColumnWithPropertyPath(propertyPath);
          orderByObject[this.escape(parentAlias) + "." + this.escape(DriverUtils.buildAlias(this.connection.driver, void 0, aliasName, column.databaseName))] = orderBys[orderCriteria];
        } else {
          if (this.expressionMap.selects.find((select2) => select2.selection === orderCriteria || select2.aliasName === orderCriteria)) {
            orderByObject[this.escape(parentAlias) + "." + this.escape(orderCriteria)] = orderBys[orderCriteria];
          } else {
            orderByObject[orderCriteria] = orderBys[orderCriteria];
          }
        }
      });
      return [
        selectString,
        orderByObject
      ];
    }
    async loadRawResults(queryRunner) {
      const [sql, parameters] = this.getQueryAndParameters();
      const queryId = sql + " -- PARAMETERS: " + JSON.stringify(parameters, (_, value) => typeof value === "bigint" ? value.toString() : value);
      const cacheOptions = typeof this.connection.options.cache === "object" ? this.connection.options.cache : {};
      let savedQueryResultCacheOptions = void 0;
      const isCachingEnabled = cacheOptions.alwaysEnabled && this.expressionMap.cache !== false || this.expressionMap.cache === true;
      let cacheError = false;
      if (this.connection.queryResultCache && isCachingEnabled) {
        try {
          savedQueryResultCacheOptions = await this.connection.queryResultCache.getFromCache({
            identifier: this.expressionMap.cacheId,
            query: queryId,
            duration: this.expressionMap.cacheDuration || cacheOptions.duration || 1e3
          }, queryRunner);
          if (savedQueryResultCacheOptions && !this.connection.queryResultCache.isExpired(savedQueryResultCacheOptions)) {
            return JSON.parse(savedQueryResultCacheOptions.result);
          }
        } catch (error) {
          if (!cacheOptions.ignoreErrors) {
            throw error;
          }
          cacheError = true;
        }
      }
      const results = await queryRunner.query(sql, parameters, true);
      if (!cacheError && this.connection.queryResultCache && isCachingEnabled) {
        try {
          await this.connection.queryResultCache.storeInCache({
            identifier: this.expressionMap.cacheId,
            query: queryId,
            time: (/* @__PURE__ */ new Date()).getTime(),
            duration: this.expressionMap.cacheDuration || cacheOptions.duration || 1e3,
            result: JSON.stringify(results.records)
          }, savedQueryResultCacheOptions, queryRunner);
        } catch (error) {
          if (!cacheOptions.ignoreErrors) {
            throw error;
          }
        }
      }
      return results.records;
    }
    mergeExpressionMap(expressionMap) {
      ObjectUtils.assign(this.expressionMap, expressionMap);
      return this;
    }
    normalizeNumber(num) {
      if (typeof num === "number" || num === void 0 || num === null) return num;
      return Number(num);
    }
    obtainQueryRunner() {
      return this.queryRunner || this.connection.createQueryRunner(this.connection.defaultReplicationModeForReads());
    }
    buildSelect(select2, metadata, alias, embedPrefix) {
      for (let key in select2) {
        if (select2[key] === void 0 || select2[key] === false) continue;
        const propertyPath = embedPrefix ? embedPrefix + "." + key : key;
        const column = metadata.findColumnWithPropertyPathStrict(propertyPath);
        const embed = metadata.findEmbeddedWithPropertyPath(propertyPath);
        const relation = metadata.findRelationWithPropertyPath(propertyPath);
        if (!embed && !column && !relation) throw new EntityPropertyNotFoundError(propertyPath, metadata);
        if (column) {
          this.selects.push(alias + "." + propertyPath);
        } else if (embed) {
          this.buildSelect(select2[key], metadata, alias, propertyPath);
        }
      }
    }
    buildRelations(relations, selection2, metadata, alias, embedPrefix) {
      if (!relations) return;
      Object.keys(relations).forEach((relationName) => {
        const relationValue = relations[relationName];
        const propertyPath = embedPrefix ? embedPrefix + "." + relationName : relationName;
        const embed = metadata.findEmbeddedWithPropertyPath(propertyPath);
        const relation = metadata.findRelationWithPropertyPath(propertyPath);
        if (!embed && !relation) throw new EntityPropertyNotFoundError(propertyPath, metadata);
        if (embed) {
          this.buildRelations(relationValue, typeof selection2 === "object" ? OrmUtils.deepValue(selection2, embed.propertyPath) : void 0, metadata, alias, propertyPath);
        } else if (relation) {
          let joinAlias = alias + "_" + propertyPath.replace(".", "_");
          joinAlias = DriverUtils.buildAlias(this.connection.driver, {
            joiner: "__"
          }, alias, joinAlias);
          if (relationValue === true || typeof relationValue === "object") {
            if (this.expressionMap.relationLoadStrategy === "query") {
              this.concatRelationMetadata(relation);
            } else {
              this.joins.push({
                type: "left",
                select: true,
                selection: selection2 && typeof selection2[relationName] === "object" ? selection2[relationName] : void 0,
                alias: joinAlias,
                parentAlias: alias,
                relationMetadata: relation
              });
              if (selection2 && typeof selection2[relationName] === "object") {
                this.buildSelect(selection2[relationName], relation.inverseEntityMetadata, joinAlias);
              }
            }
          }
          if (typeof relationValue === "object" && this.expressionMap.relationLoadStrategy === "join") {
            this.buildRelations(relationValue, typeof selection2 === "object" ? OrmUtils.deepValue(selection2, relation.propertyPath) : void 0, relation.inverseEntityMetadata, joinAlias, void 0);
          }
        }
      });
    }
    buildEagerRelations(relations, selection2, metadata, alias, embedPrefix) {
      if (!relations) return;
      Object.keys(relations).forEach((relationName) => {
        const relationValue = relations[relationName];
        const propertyPath = embedPrefix ? embedPrefix + "." + relationName : relationName;
        const embed = metadata.findEmbeddedWithPropertyPath(propertyPath);
        const relation = metadata.findRelationWithPropertyPath(propertyPath);
        if (!embed && !relation) throw new EntityPropertyNotFoundError(propertyPath, metadata);
        if (embed) {
          this.buildEagerRelations(relationValue, typeof selection2 === "object" ? OrmUtils.deepValue(selection2, embed.propertyPath) : void 0, metadata, alias, propertyPath);
        } else if (relation) {
          let joinAlias = alias + "_" + propertyPath.replace(".", "_");
          joinAlias = DriverUtils.buildAlias(this.connection.driver, {
            joiner: "__"
          }, alias, joinAlias);
          if (relationValue === true || typeof relationValue === "object") {
            relation.inverseEntityMetadata.eagerRelations.forEach((eagerRelation) => {
              let eagerRelationJoinAlias = joinAlias + "_" + eagerRelation.propertyPath.replace(".", "_");
              eagerRelationJoinAlias = DriverUtils.buildAlias(this.connection.driver, {
                joiner: "__"
              }, joinAlias, eagerRelationJoinAlias);
              const existJoin = this.joins.find((join) => join.alias === eagerRelationJoinAlias);
              if (!existJoin) {
                this.joins.push({
                  type: "left",
                  select: true,
                  alias: eagerRelationJoinAlias,
                  parentAlias: joinAlias,
                  selection: void 0,
                  relationMetadata: eagerRelation
                });
              }
              if (selection2 && typeof selection2[relationName] === "object") {
                this.buildSelect(selection2[relationName], relation.inverseEntityMetadata, joinAlias);
              }
            });
          }
          if (typeof relationValue === "object") {
            this.buildEagerRelations(relationValue, typeof selection2 === "object" ? OrmUtils.deepValue(selection2, relation.propertyPath) : void 0, relation.inverseEntityMetadata, joinAlias, void 0);
          }
        }
      });
    }
    buildOrder(order, metadata, alias, embedPrefix) {
      for (let key in order) {
        if (order[key] === void 0) continue;
        const propertyPath = embedPrefix ? embedPrefix + "." + key : key;
        const column = metadata.findColumnWithPropertyPathStrict(propertyPath);
        const embed = metadata.findEmbeddedWithPropertyPath(propertyPath);
        const relation = metadata.findRelationWithPropertyPath(propertyPath);
        if (!embed && !column && !relation) throw new EntityPropertyNotFoundError(propertyPath, metadata);
        if (column) {
          let direction = typeof order[key] === "object" ? order[key].direction : order[key];
          direction = direction === "DESC" || direction === "desc" || direction === -1 ? "DESC" : "ASC";
          let nulls = typeof order[key] === "object" ? order[key].nulls : void 0;
          nulls = (nulls == null ? void 0 : nulls.toLowerCase()) === "first" ? "NULLS FIRST" : (nulls == null ? void 0 : nulls.toLowerCase()) === "last" ? "NULLS LAST" : void 0;
          let aliasPath = `${alias}.${propertyPath}`;
          this.addOrderBy(aliasPath, direction, nulls);
        } else if (embed) {
          this.buildOrder(order[key], metadata, alias, propertyPath);
        } else if (relation) {
          let joinAlias = alias + "_" + propertyPath.replace(".", "_");
          joinAlias = DriverUtils.buildAlias(this.connection.driver, {
            joiner: "__"
          }, alias, joinAlias);
          const existJoin = this.joins.find((join) => join.alias === joinAlias);
          if (!existJoin) {
            this.joins.push({
              type: "left",
              select: false,
              alias: joinAlias,
              parentAlias: alias,
              selection: void 0,
              relationMetadata: relation
            });
          }
          this.buildOrder(order[key], relation.inverseEntityMetadata, joinAlias);
        }
      }
    }
    buildWhere(where, metadata, alias, embedPrefix) {
      let condition = "";
      if (Array.isArray(where)) {
        if (where.length) {
          condition = where.map((whereItem) => {
            return this.buildWhere(whereItem, metadata, alias, embedPrefix);
          }).filter((condition2) => !!condition2).map((condition2) => "(" + condition2 + ")").join(" OR ");
        }
      } else {
        let andConditions = [];
        for (let key in where) {
          if (where[key] === void 0 || where[key] === null) continue;
          const propertyPath = embedPrefix ? embedPrefix + "." + key : key;
          const column = metadata.findColumnWithPropertyPathStrict(propertyPath);
          const embed = metadata.findEmbeddedWithPropertyPath(propertyPath);
          const relation = metadata.findRelationWithPropertyPath(propertyPath);
          if (!embed && !column && !relation) throw new EntityPropertyNotFoundError(propertyPath, metadata);
          if (column) {
            let aliasPath = `${alias}.${propertyPath}`;
            if (column.isVirtualProperty && column.query) {
              aliasPath = `(${column.query(alias)})`;
            }
            let parameterValue = where[key];
            if (InstanceChecker.isEqualOperator(where[key])) {
              parameterValue = where[key].value;
            }
            if (column.transformer) {
              parameterValue instanceof FindOperator ? parameterValue.transformValue(column.transformer) : parameterValue = ApplyValueTransformers.transformTo(column.transformer, parameterValue);
            }
            andConditions.push(this.createWhereConditionExpression(this.getWherePredicateCondition(aliasPath, parameterValue)));
          } else if (embed) {
            const condition2 = this.buildWhere(where[key], metadata, alias, propertyPath);
            if (condition2) andConditions.push(condition2);
          } else if (relation) {
            if (typeof where[key] === "object") {
              const allAllUndefined = Object.keys(where[key]).every((k2) => where[key][k2] === void 0);
              if (allAllUndefined) {
                continue;
              }
            }
            if (InstanceChecker.isFindOperator(where[key])) {
              if (where[key].type === "moreThan" || where[key].type === "lessThan" || where[key].type === "moreThanOrEqual" || where[key].type === "lessThanOrEqual") {
                let sqlOperator = "";
                if (where[key].type === "moreThan") {
                  sqlOperator = ">";
                } else if (where[key].type === "lessThan") {
                  sqlOperator = "<";
                } else if (where[key].type === "moreThanOrEqual") {
                  sqlOperator = ">=";
                } else if (where[key].type === "lessThanOrEqual") {
                  sqlOperator = "<=";
                }
                const qb = this.subQuery();
                if (relation.isManyToManyOwner) {
                  qb.select("COUNT(*)").from(relation.joinTableName, relation.joinTableName).where(relation.joinColumns.map((column2) => {
                    return `${relation.joinTableName}.${column2.propertyName} = ${alias}.${column2.referencedColumn.propertyName}`;
                  }).join(" AND "));
                } else if (relation.isManyToManyNotOwner) {
                  qb.select("COUNT(*)").from(relation.inverseRelation.joinTableName, relation.inverseRelation.joinTableName).where(relation.inverseRelation.inverseJoinColumns.map((column2) => {
                    return `${relation.inverseRelation.joinTableName}.${column2.propertyName} = ${alias}.${column2.referencedColumn.propertyName}`;
                  }).join(" AND "));
                } else if (relation.isOneToMany) {
                  qb.select("COUNT(*)").from(relation.inverseEntityMetadata.target, relation.inverseEntityMetadata.tableName).where(relation.inverseRelation.joinColumns.map((column2) => {
                    return `${relation.inverseEntityMetadata.tableName}.${column2.propertyName} = ${alias}.${column2.referencedColumn.propertyName}`;
                  }).join(" AND "));
                } else {
                  throw new Error(`This relation isn't supported by given find operator`);
                }
                this.andWhere(qb.getSql() + " " + sqlOperator + " " + parseInt(where[key].value));
              } else {
                if (relation.isManyToOne || relation.isOneToOne && relation.isOneToOneOwner) {
                  const aliasPath = `${alias}.${propertyPath}`;
                  andConditions.push(this.createWhereConditionExpression(this.getWherePredicateCondition(aliasPath, where[key])));
                } else {
                  throw new Error(`This relation isn't supported by given find operator`);
                }
              }
            } else {
              let joinAlias = alias + "_" + relation.propertyPath.replace(".", "_");
              joinAlias = DriverUtils.buildAlias(this.connection.driver, {
                joiner: "__"
              }, alias, joinAlias);
              const existJoin = this.joins.find((join) => join.alias === joinAlias);
              if (!existJoin) {
                this.joins.push({
                  type: "left",
                  select: false,
                  selection: void 0,
                  alias: joinAlias,
                  parentAlias: alias,
                  relationMetadata: relation
                });
              }
              const condition2 = this.buildWhere(where[key], relation.inverseEntityMetadata, joinAlias);
              if (condition2) {
                andConditions.push(condition2);
              }
            }
          }
        }
        condition = andConditions.length ? "(" + andConditions.join(") AND (") + ")" : andConditions.join(" AND ");
      }
      return condition.length ? "(" + condition + ")" : condition;
    }
  }
  class UpdateResult {
    constructor() {
      this.generatedMaps = [];
    }
    static from(queryResult) {
      const result = new this();
      result.raw = queryResult.records;
      result.affected = queryResult.affected;
      return result;
    }
  }
  class SoftDeleteQueryBuilder extends QueryBuilder {
    constructor(connectionOrQueryBuilder, queryRunner) {
      super(connectionOrQueryBuilder, queryRunner);
      this["@instanceof"] = Symbol.for("SoftDeleteQueryBuilder");
      this.expressionMap.aliasNamePrefixingEnabled = false;
    }
    getQuery() {
      let sql = this.createUpdateExpression();
      sql += this.createCteExpression();
      sql += this.createOrderByExpression();
      sql += this.createLimitExpression();
      return this.replacePropertyNamesForTheWholeQuery(sql.trim());
    }
    async execute() {
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          if (this.expressionMap.queryType === "soft-delete") await queryRunner.broadcaster.broadcast("BeforeSoftRemove", this.expressionMap.mainAlias.metadata);
          else if (this.expressionMap.queryType === "restore") await queryRunner.broadcaster.broadcast("BeforeRecover", this.expressionMap.mainAlias.metadata);
        }
        const returningResultsEntityUpdator = new ReturningResultsEntityUpdator(queryRunner, this.expressionMap);
        if (this.expressionMap.updateEntity === true && this.expressionMap.mainAlias.hasMetadata && this.expressionMap.whereEntities.length > 0) {
          this.expressionMap.extraReturningColumns = returningResultsEntityUpdator.getSoftDeletionReturningColumns();
        }
        const [sql, parameters] = this.getQueryAndParameters();
        const queryResult = await queryRunner.query(sql, parameters, true);
        const updateResult = UpdateResult.from(queryResult);
        if (this.expressionMap.updateEntity === true && this.expressionMap.mainAlias.hasMetadata && this.expressionMap.whereEntities.length > 0) {
          await returningResultsEntityUpdator.update(updateResult, this.expressionMap.whereEntities);
        }
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          if (this.expressionMap.queryType === "soft-delete") await queryRunner.broadcaster.broadcast("AfterSoftRemove", this.expressionMap.mainAlias.metadata);
          else if (this.expressionMap.queryType === "restore") await queryRunner.broadcaster.broadcast("AfterRecover", this.expressionMap.mainAlias.metadata);
        }
        if (transactionStartedByUs) await queryRunner.commitTransaction();
        return updateResult;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) {
          await queryRunner.release();
        }
      }
    }
    from(entityTarget, aliasName) {
      entityTarget = InstanceChecker.isEntitySchema(entityTarget) ? entityTarget.options.name : entityTarget;
      const mainAlias = this.createFromAlias(entityTarget, aliasName);
      this.expressionMap.setMainAlias(mainAlias);
      return this;
    }
    where(where, parameters) {
      this.expressionMap.wheres = [];
      const condition = this.getWhereCondition(where);
      if (condition) this.expressionMap.wheres = [
        {
          type: "simple",
          condition
        }
      ];
      if (parameters) this.setParameters(parameters);
      return this;
    }
    andWhere(where, parameters) {
      this.expressionMap.wheres.push({
        type: "and",
        condition: this.getWhereCondition(where)
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    orWhere(where, parameters) {
      this.expressionMap.wheres.push({
        type: "or",
        condition: this.getWhereCondition(where)
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    whereInIds(ids) {
      return this.where(this.getWhereInIdsCondition(ids));
    }
    andWhereInIds(ids) {
      return this.andWhere(this.getWhereInIdsCondition(ids));
    }
    orWhereInIds(ids) {
      return this.orWhere(this.getWhereInIdsCondition(ids));
    }
    output(output) {
      return this.returning(output);
    }
    returning(returning) {
      if (!this.connection.driver.isReturningSqlSupported("update")) {
        throw new ReturningStatementNotSupportedError();
      }
      this.expressionMap.returning = returning;
      return this;
    }
    orderBy(sort, order = "ASC", nulls) {
      if (sort) {
        if (typeof sort === "object") {
          this.expressionMap.orderBys = sort;
        } else {
          if (nulls) {
            this.expressionMap.orderBys = {
              [sort]: {
                order,
                nulls
              }
            };
          } else {
            this.expressionMap.orderBys = {
              [sort]: order
            };
          }
        }
      } else {
        this.expressionMap.orderBys = {};
      }
      return this;
    }
    addOrderBy(sort, order = "ASC", nulls) {
      if (nulls) {
        this.expressionMap.orderBys[sort] = {
          order,
          nulls
        };
      } else {
        this.expressionMap.orderBys[sort] = order;
      }
      return this;
    }
    limit(limit) {
      this.expressionMap.limit = limit;
      return this;
    }
    whereEntity(entity) {
      if (!this.expressionMap.mainAlias.hasMetadata) throw new TypeORMError(`.whereEntity method can only be used on queries which update real entity table.`);
      this.expressionMap.wheres = [];
      const entities = Array.isArray(entity) ? entity : [
        entity
      ];
      entities.forEach((entity2) => {
        const entityIdMap = this.expressionMap.mainAlias.metadata.getEntityIdMap(entity2);
        if (!entityIdMap) throw new TypeORMError(`Provided entity does not have ids set, cannot perform operation.`);
        this.orWhereInIds(entityIdMap);
      });
      this.expressionMap.whereEntities = entities;
      return this;
    }
    updateEntity(enabled) {
      this.expressionMap.updateEntity = enabled;
      return this;
    }
    createUpdateExpression() {
      const metadata = this.expressionMap.mainAlias.hasMetadata ? this.expressionMap.mainAlias.metadata : void 0;
      if (!metadata) throw new TypeORMError(`Cannot get entity metadata for the given alias "${this.expressionMap.mainAlias}"`);
      if (!metadata.deleteDateColumn) {
        throw new MissingDeleteDateColumnError(metadata);
      }
      const updateColumnAndValues = [];
      switch (this.expressionMap.queryType) {
        case "soft-delete":
          updateColumnAndValues.push(this.escape(metadata.deleteDateColumn.databaseName) + " = CURRENT_TIMESTAMP");
          break;
        case "restore":
          updateColumnAndValues.push(this.escape(metadata.deleteDateColumn.databaseName) + " = NULL");
          break;
        default:
          throw new TypeORMError(`The queryType must be "soft-delete" or "restore"`);
      }
      if (metadata.versionColumn) updateColumnAndValues.push(this.escape(metadata.versionColumn.databaseName) + " = " + this.escape(metadata.versionColumn.databaseName) + " + 1");
      if (metadata.updateDateColumn) updateColumnAndValues.push(this.escape(metadata.updateDateColumn.databaseName) + " = CURRENT_TIMESTAMP");
      if (updateColumnAndValues.length <= 0) {
        throw new UpdateValuesMissingError();
      }
      const whereExpression = this.createWhereExpression();
      const returningExpression = this.createReturningExpression("update");
      if (returningExpression === "") {
        return `UPDATE ${this.getTableName(this.getMainTableName())} SET ${updateColumnAndValues.join(", ")}${whereExpression}`;
      }
      if (this.connection.driver.options.type === "mssql") {
        return `UPDATE ${this.getTableName(this.getMainTableName())} SET ${updateColumnAndValues.join(", ")} OUTPUT ${returningExpression}${whereExpression}`;
      }
      return `UPDATE ${this.getTableName(this.getMainTableName())} SET ${updateColumnAndValues.join(", ")}${whereExpression} RETURNING ${returningExpression}`;
    }
    createOrderByExpression() {
      const orderBys = this.expressionMap.orderBys;
      if (Object.keys(orderBys).length > 0) return " ORDER BY " + Object.keys(orderBys).map((columnName) => {
        if (typeof orderBys[columnName] === "string") {
          return this.replacePropertyNames(columnName) + " " + orderBys[columnName];
        } else {
          return this.replacePropertyNames(columnName) + " " + orderBys[columnName].order + " " + orderBys[columnName].nulls;
        }
      }).join(", ");
      return "";
    }
    createLimitExpression() {
      let limit = this.expressionMap.limit;
      if (limit) {
        if (DriverUtils.isMySQLFamily(this.connection.driver)) {
          return " LIMIT " + limit;
        } else {
          throw new LimitOnUpdateNotSupportedError();
        }
      }
      return "";
    }
  }
  class UpdateQueryBuilder extends QueryBuilder {
    constructor(connectionOrQueryBuilder, queryRunner) {
      super(connectionOrQueryBuilder, queryRunner);
      this["@instanceof"] = Symbol.for("UpdateQueryBuilder");
      this.expressionMap.aliasNamePrefixingEnabled = false;
    }
    getQuery() {
      let sql = this.createComment();
      sql += this.createCteExpression();
      sql += this.createUpdateExpression();
      sql += this.createOrderByExpression();
      sql += this.createLimitExpression();
      return this.replacePropertyNamesForTheWholeQuery(sql.trim());
    }
    async execute() {
      const queryRunner = this.obtainQueryRunner();
      let transactionStartedByUs = false;
      try {
        if (this.expressionMap.useTransaction === true && queryRunner.isTransactionActive === false) {
          await queryRunner.startTransaction();
          transactionStartedByUs = true;
        }
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          await queryRunner.broadcaster.broadcast("BeforeUpdate", this.expressionMap.mainAlias.metadata, this.expressionMap.valuesSet);
        }
        let declareSql = null;
        let selectOutputSql = null;
        const returningResultsEntityUpdator = new ReturningResultsEntityUpdator(queryRunner, this.expressionMap);
        const returningColumns = [];
        if (Array.isArray(this.expressionMap.returning) && this.expressionMap.mainAlias.hasMetadata) {
          for (const columnPath of this.expressionMap.returning) {
            returningColumns.push(...this.expressionMap.mainAlias.metadata.findColumnsWithPropertyPath(columnPath));
          }
        }
        if (this.expressionMap.updateEntity === true && this.expressionMap.mainAlias.hasMetadata && this.expressionMap.whereEntities.length > 0) {
          this.expressionMap.extraReturningColumns = returningResultsEntityUpdator.getUpdationReturningColumns();
          returningColumns.push(...this.expressionMap.extraReturningColumns.filter((c) => !returningColumns.includes(c)));
        }
        if (returningColumns.length > 0 && this.connection.driver.options.type === "mssql") {
          declareSql = this.connection.driver.buildTableVariableDeclaration("@OutputTable", returningColumns);
          selectOutputSql = `SELECT * FROM @OutputTable`;
        }
        const [updateSql, parameters] = this.getQueryAndParameters();
        const statements = [
          declareSql,
          updateSql,
          selectOutputSql
        ];
        const queryResult = await queryRunner.query(statements.filter((sql) => sql != null).join(";\n\n"), parameters, true);
        const updateResult = UpdateResult.from(queryResult);
        if (this.expressionMap.updateEntity === true && this.expressionMap.mainAlias.hasMetadata && this.expressionMap.whereEntities.length > 0) {
          await returningResultsEntityUpdator.update(updateResult, this.expressionMap.whereEntities);
        }
        if (this.expressionMap.callListeners === true && this.expressionMap.mainAlias.hasMetadata) {
          await queryRunner.broadcaster.broadcast("AfterUpdate", this.expressionMap.mainAlias.metadata, this.expressionMap.valuesSet);
        }
        if (transactionStartedByUs) await queryRunner.commitTransaction();
        return updateResult;
      } catch (error) {
        if (transactionStartedByUs) {
          try {
            await queryRunner.rollbackTransaction();
          } catch (rollbackError) {
          }
        }
        throw error;
      } finally {
        if (queryRunner !== this.queryRunner) {
          await queryRunner.release();
        }
      }
    }
    set(values) {
      this.expressionMap.valuesSet = values;
      return this;
    }
    where(where, parameters) {
      this.expressionMap.wheres = [];
      const condition = this.getWhereCondition(where);
      if (condition) this.expressionMap.wheres = [
        {
          type: "simple",
          condition
        }
      ];
      if (parameters) this.setParameters(parameters);
      return this;
    }
    andWhere(where, parameters) {
      this.expressionMap.wheres.push({
        type: "and",
        condition: this.getWhereCondition(where)
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    orWhere(where, parameters) {
      this.expressionMap.wheres.push({
        type: "or",
        condition: this.getWhereCondition(where)
      });
      if (parameters) this.setParameters(parameters);
      return this;
    }
    whereInIds(ids) {
      return this.where(this.getWhereInIdsCondition(ids));
    }
    andWhereInIds(ids) {
      return this.andWhere(this.getWhereInIdsCondition(ids));
    }
    orWhereInIds(ids) {
      return this.orWhere(this.getWhereInIdsCondition(ids));
    }
    output(output) {
      return this.returning(output);
    }
    returning(returning) {
      if (!this.connection.driver.isReturningSqlSupported("update")) {
        throw new ReturningStatementNotSupportedError();
      }
      this.expressionMap.returning = returning;
      return this;
    }
    orderBy(sort, order = "ASC", nulls) {
      if (sort) {
        if (typeof sort === "object") {
          this.expressionMap.orderBys = sort;
        } else {
          if (nulls) {
            this.expressionMap.orderBys = {
              [sort]: {
                order,
                nulls
              }
            };
          } else {
            this.expressionMap.orderBys = {
              [sort]: order
            };
          }
        }
      } else {
        this.expressionMap.orderBys = {};
      }
      return this;
    }
    addOrderBy(sort, order = "ASC", nulls) {
      if (nulls) {
        this.expressionMap.orderBys[sort] = {
          order,
          nulls
        };
      } else {
        this.expressionMap.orderBys[sort] = order;
      }
      return this;
    }
    limit(limit) {
      this.expressionMap.limit = limit;
      return this;
    }
    whereEntity(entity) {
      if (!this.expressionMap.mainAlias.hasMetadata) throw new TypeORMError(`.whereEntity method can only be used on queries which update real entity table.`);
      this.expressionMap.wheres = [];
      const entities = Array.isArray(entity) ? entity : [
        entity
      ];
      entities.forEach((entity2) => {
        const entityIdMap = this.expressionMap.mainAlias.metadata.getEntityIdMap(entity2);
        if (!entityIdMap) throw new TypeORMError(`Provided entity does not have ids set, cannot perform operation.`);
        this.orWhereInIds(entityIdMap);
      });
      this.expressionMap.whereEntities = entities;
      return this;
    }
    updateEntity(enabled) {
      this.expressionMap.updateEntity = enabled;
      return this;
    }
    createUpdateExpression() {
      const valuesSet = this.getValueSet();
      const metadata = this.expressionMap.mainAlias.hasMetadata ? this.expressionMap.mainAlias.metadata : void 0;
      const valuesSetNormalized = {};
      for (let key in valuesSet) {
        if (valuesSet[key] !== void 0) {
          valuesSetNormalized[key] = valuesSet[key];
        }
      }
      const updateColumnAndValues = [];
      const updatedColumns = [];
      if (metadata) {
        this.createPropertyPath(metadata, valuesSetNormalized).forEach((propertyPath) => {
          const columns = metadata.findColumnsWithPropertyPath(propertyPath);
          if (columns.length <= 0) {
            throw new EntityPropertyNotFoundError(propertyPath, metadata);
          }
          columns.forEach((column) => {
            if (!column.isUpdate || updatedColumns.includes(column)) {
              return;
            }
            updatedColumns.push(column);
            let value = column.getEntityValue(valuesSetNormalized);
            if (column.referencedColumn && typeof value === "object" && !(value instanceof Date) && value !== null && !Buffer$7.isBuffer(value)) {
              value = column.referencedColumn.getEntityValue(value);
            } else if (!(typeof value === "function")) {
              value = this.connection.driver.preparePersistentValue(value, column);
            }
            if (typeof value === "function") {
              updateColumnAndValues.push(this.escape(column.databaseName) + " = " + value());
            } else if ((this.connection.driver.options.type === "sap" || this.connection.driver.options.type === "spanner") && value === null) {
              updateColumnAndValues.push(this.escape(column.databaseName) + " = NULL");
            } else {
              if (this.connection.driver.options.type === "mssql") {
                value = this.connection.driver.parametrizeValue(column, value);
              }
              const paramName = this.createParameter(value);
              let expression = null;
              if ((DriverUtils.isMySQLFamily(this.connection.driver) || this.connection.driver.options.type === "aurora-mysql") && this.connection.driver.spatialTypes.indexOf(column.type) !== -1) {
                const useLegacy = this.connection.driver.options.legacySpatialSupport;
                const geomFromText = useLegacy ? "GeomFromText" : "ST_GeomFromText";
                if (column.srid != null) {
                  expression = `${geomFromText}(${paramName}, ${column.srid})`;
                } else {
                  expression = `${geomFromText}(${paramName})`;
                }
              } else if (DriverUtils.isPostgresFamily(this.connection.driver) && this.connection.driver.spatialTypes.indexOf(column.type) !== -1) {
                if (column.srid != null) {
                  expression = `ST_SetSRID(ST_GeomFromGeoJSON(${paramName}), ${column.srid})::${column.type}`;
                } else {
                  expression = `ST_GeomFromGeoJSON(${paramName})::${column.type}`;
                }
              } else if (this.connection.driver.options.type === "mssql" && this.connection.driver.spatialTypes.indexOf(column.type) !== -1) {
                expression = column.type + "::STGeomFromText(" + paramName + ", " + (column.srid || "0") + ")";
              } else {
                expression = paramName;
              }
              updateColumnAndValues.push(this.escape(column.databaseName) + " = " + expression);
            }
          });
        });
        if (updateColumnAndValues.length > 0 || Object.keys(valuesSetNormalized).length === 0) {
          if (metadata.versionColumn && updatedColumns.indexOf(metadata.versionColumn) === -1) updateColumnAndValues.push(this.escape(metadata.versionColumn.databaseName) + " = " + this.escape(metadata.versionColumn.databaseName) + " + 1");
          if (metadata.updateDateColumn && updatedColumns.indexOf(metadata.updateDateColumn) === -1) updateColumnAndValues.push(this.escape(metadata.updateDateColumn.databaseName) + " = CURRENT_TIMESTAMP");
        }
      } else {
        Object.keys(valuesSetNormalized).map((key) => {
          let value = valuesSetNormalized[key];
          if (typeof value === "function") {
            updateColumnAndValues.push(this.escape(key) + " = " + value());
          } else if ((this.connection.driver.options.type === "sap" || this.connection.driver.options.type === "spanner") && value === null) {
            updateColumnAndValues.push(this.escape(key) + " = NULL");
          } else {
            const paramName = this.createParameter(value);
            updateColumnAndValues.push(this.escape(key) + " = " + paramName);
          }
        });
      }
      if (updateColumnAndValues.length <= 0) {
        throw new UpdateValuesMissingError();
      }
      const whereExpression = this.createWhereExpression();
      const returningExpression = this.createReturningExpression("update");
      if (returningExpression === "") {
        return `UPDATE ${this.getTableName(this.getMainTableName())} SET ${updateColumnAndValues.join(", ")}${whereExpression}`;
      }
      if (this.connection.driver.options.type === "mssql") {
        return `UPDATE ${this.getTableName(this.getMainTableName())} SET ${updateColumnAndValues.join(", ")} OUTPUT ${returningExpression}${whereExpression}`;
      }
      return `UPDATE ${this.getTableName(this.getMainTableName())} SET ${updateColumnAndValues.join(", ")}${whereExpression} RETURNING ${returningExpression}`;
    }
    createOrderByExpression() {
      const orderBys = this.expressionMap.orderBys;
      if (Object.keys(orderBys).length > 0) return " ORDER BY " + Object.keys(orderBys).map((columnName) => {
        if (typeof orderBys[columnName] === "string") {
          return this.replacePropertyNames(columnName) + " " + orderBys[columnName];
        } else {
          return this.replacePropertyNames(columnName) + " " + orderBys[columnName].order + " " + orderBys[columnName].nulls;
        }
      }).join(", ");
      return "";
    }
    createLimitExpression() {
      let limit = this.expressionMap.limit;
      if (limit) {
        if (DriverUtils.isMySQLFamily(this.connection.driver) || this.connection.driver.options.type === "aurora-mysql") {
          return " LIMIT " + limit;
        } else {
          throw new LimitOnUpdateNotSupportedError();
        }
      }
      return "";
    }
    getValueSet() {
      if (typeof this.expressionMap.valuesSet === "object") return this.expressionMap.valuesSet;
      throw new UpdateValuesMissingError();
    }
  }
  function registerQueryBuilders() {
    QueryBuilder.registerQueryBuilderClass("DeleteQueryBuilder", (qb) => new DeleteQueryBuilder(qb));
    QueryBuilder.registerQueryBuilderClass("InsertQueryBuilder", (qb) => new InsertQueryBuilder(qb));
    QueryBuilder.registerQueryBuilderClass("RelationQueryBuilder", (qb) => new RelationQueryBuilder(qb));
    QueryBuilder.registerQueryBuilderClass("SelectQueryBuilder", (qb) => new SelectQueryBuilder(qb));
    QueryBuilder.registerQueryBuilderClass("SoftDeleteQueryBuilder", (qb) => new SoftDeleteQueryBuilder(qb));
    QueryBuilder.registerQueryBuilderClass("UpdateQueryBuilder", (qb) => new UpdateQueryBuilder(qb));
  }
  var MetadataTableType;
  (function(MetadataTableType2) {
    MetadataTableType2["VIEW"] = "VIEW";
    MetadataTableType2["MATERIALIZED_VIEW"] = "MATERIALIZED_VIEW";
    MetadataTableType2["GENERATED_COLUMN"] = "GENERATED_COLUMN";
  })(MetadataTableType || (MetadataTableType = {}));
  var browser = {
    exports: {}
  };
  var ms;
  var hasRequiredMs;
  function requireMs() {
    if (hasRequiredMs) return ms;
    hasRequiredMs = 1;
    var s = 1e3;
    var m2 = s * 60;
    var h2 = m2 * 60;
    var d = h2 * 24;
    var w2 = d * 7;
    var y = d * 365.25;
    ms = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n2 = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n2 * y;
        case "weeks":
        case "week":
        case "w":
          return n2 * w2;
        case "days":
        case "day":
        case "d":
          return n2 * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n2 * h2;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n2 * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n2 * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n2;
        default:
          return void 0;
      }
    }
    function fmtShort(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return Math.round(ms2 / d) + "d";
      }
      if (msAbs >= h2) {
        return Math.round(ms2 / h2) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms2 / m2) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms2 / s) + "s";
      }
      return ms2 + "ms";
    }
    function fmtLong(ms2) {
      var msAbs = Math.abs(ms2);
      if (msAbs >= d) {
        return plural(ms2, msAbs, d, "day");
      }
      if (msAbs >= h2) {
        return plural(ms2, msAbs, h2, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms2, msAbs, m2, "minute");
      }
      if (msAbs >= s) {
        return plural(ms2, msAbs, s, "second");
      }
      return ms2 + " ms";
    }
    function plural(ms2, msAbs, n2, name) {
      var isPlural = msAbs >= n2 * 1.5;
      return Math.round(ms2 / n2) + " " + name + (isPlural ? "s" : "");
    }
    return ms;
  }
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = requireMs();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace2) {
      let hash2 = 0;
      for (let i = 0; i < namespace2.length; i++) {
        hash2 = (hash2 << 5) - hash2 + namespace2.charCodeAt(i);
        hash2 |= 0;
      }
      return createDebug.colors[Math.abs(hash2) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace2) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self2 = debug;
        const curr = Number(/* @__PURE__ */ new Date());
        const ms2 = curr - (prevTime || curr);
        self2.diff = ms2;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index2 = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index2++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index2];
            match = formatter.call(self2, val);
            args.splice(index2, 1);
            index2--;
          }
          return match;
        });
        createDebug.formatArgs.call(self2, args);
        const logFn = self2.log || createDebug.log;
        logFn.apply(self2, args);
      }
      debug.namespace = namespace2;
      debug.useColors = createDebug.useColors();
      debug.color = createDebug.selectColor(namespace2);
      debug.extend = extend2;
      debug.destroy = createDebug.destroy;
      Object.defineProperty(debug, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace2);
          }
          return enabledCache;
        },
        set: (v2) => {
          enableOverride = v2;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }
      return debug;
    }
    function extend2(namespace2, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace2);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces2) {
      createDebug.save(namespaces2);
      createDebug.namespaces = namespaces2;
      createDebug.names = [];
      createDebug.skips = [];
      let i;
      const split = (typeof namespaces2 === "string" ? namespaces2 : "").split(/[\s,]+/);
      const len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) {
          continue;
        }
        namespaces2 = split[i].replace(/\*/g, ".*?");
        if (namespaces2[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces2.slice(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces2 + "$"));
        }
      }
    }
    function disable() {
      const namespaces2 = [
        ...createDebug.names.map(toNamespace),
        ...createDebug.skips.map(toNamespace).map((namespace2) => "-" + namespace2)
      ].join(",");
      createDebug.enable("");
      return namespaces2;
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      let i;
      let len;
      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  var common = setup;
  (function(module, exports2) {
    var define_process_env_default = {};
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m2;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index2 = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index2++;
        if (match === "%c") {
          lastC = index2;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces2) {
      try {
        if (namespaces2) {
          exports2.storage.setItem("debug", namespaces2);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r2;
      try {
        r2 = exports2.storage.getItem("debug");
      } catch (error) {
      }
      if (!r2 && typeof process$1 !== "undefined" && "env" in process$1) {
        r2 = define_process_env_default.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = common(exports2);
    const { formatters } = module.exports;
    formatters.j = function(v2) {
      try {
        return JSON.stringify(v2);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  })(browser, browser.exports);
  registerQueryBuilders();
  const flowNodeToNode = (node, data) => {
    return {
      id: node.id,
      type: node.node_type,
      position: {
        x: node.x || 0,
        y: node.y || 0
      },
      width: node.width || void 0,
      height: node.height || void 0,
      data: {
        loading: false,
        flowNode: node,
        ...data
      }
    };
  };
  const flowEdgeToEdge = (edge) => {
    return {
      id: edge.id,
      target: edge.target,
      source: edge.target,
      targetHandle: edge.targetHandle,
      sourceHandle: edge.sourceHandle
    };
  };
  const nodeFlowToEdge = (edge) => {
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      targetHandle: edge.targetHandle,
      sourceHandle: edge.sourceHandle
    };
  };
  filterUserConnections = (connections) => {
    return connections.filter((connection) => "edgeId" in connection ? `${connection.edgeId}`.startsWith("xy-edge__") : false);
  };
  const flowNodesToNodeChanges = (flowNodes, currentNodes, flowNodeSources) => {
    const newIds = [];
    const changes = flowNodes.map((node) => {
      var _a;
      const oldNode = currentNodes.find((item) => node.id === item.id);
      if (!oldNode) {
        newIds.push(node.id);
      }
      const source = (_a = flowNodeSources == null ? void 0 : flowNodeSources[node.source_type]) == null ? void 0 : _a.find((item) => (item == null ? void 0 : item.id) === node.source_id);
      const newNode = flowNodeToNode(node, {
        ...oldNode == null ? void 0 : oldNode.data,
        entity: source
      });
      return {
        type: oldNode ? "replace" : "add",
        id: node.id,
        item: oldNode ? deepmerge$1({
          ...oldNode || {},
          data: void 0
        }, omitBy$1(newNode, isUndefined$1)) : newNode
      };
    });
    return {
      changes,
      newIds: []
    };
  };
  const flowEdgesToEdgeChanges = (flowEdges, currentEdges) => {
    const updatedIds = [];
    const deletedIds = [];
    const changes = flowEdges.map((item) => {
      const old = currentEdges.find((edge) => item.source === edge.source && item.target === edge.target);
      if (!old || old.id !== item.id) {
        if (old) {
          deletedIds.push(old.id);
        }
        return {
          type: "add",
          item: nodeFlowToEdge(item)
        };
      }
      updatedIds.push(item.id);
      return {
        type: "replace",
        item: nodeFlowToEdge(item)
      };
    });
    currentEdges.forEach((edge) => {
      if (!updatedIds.includes(edge.id)) {
        deletedIds.push(edge.id);
      }
    });
    return {
      changes,
      updatedIds,
      deletedIds
    };
  };
  const TOOLBOX_NODE_SIZE = {
    width: 440,
    height: 360
  };
  const SESSION_INFO_SIZE = {
    width: 380,
    height: 650
  };
  SYSTEM_NODE_IDS = {
    [FlowNodeTypeEnum.Toolbox]: "toolbox",
    [FlowNodeTypeEnum.SessionInfo]: "session-info",
    [FlowNodeTypeEnum.DefaultEmbeddingModel]: "default-embedding-model",
    [FlowNodeTypeEnum.ApplicationBar]: "application-bar"
  };
  const TOOLBOX_NODE = {
    id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.Toolbox],
    type: FlowNodeTypeEnum.Toolbox,
    position: {
      x: 10 + SESSION_INFO_SIZE.width + 20,
      y: 10
    },
    measured: TOOLBOX_NODE_SIZE,
    data: {}
  };
  const SESSION_INFO_NODE = {
    id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.SessionInfo],
    type: FlowNodeTypeEnum.SessionInfo,
    position: {
      x: 10,
      y: 10
    },
    measured: SESSION_INFO_SIZE,
    data: {}
  };
  const EMBEDDING_MODEL = {
    id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.DefaultEmbeddingModel],
    type: FlowNodeTypeEnum.DefaultEmbeddingModel,
    position: {
      x: 10 + SESSION_INFO_SIZE.width + TOOLBOX_NODE_SIZE.width + 40,
      y: 10
    },
    data: {
      model: DEFAULT_EMBEDDING_MODEL
    }
  };
  const APPLICATION_BAR_MODEL = {
    id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.ApplicationBar],
    type: FlowNodeTypeEnum.ApplicationBar,
    position: {
      x: 10 + SESSION_INFO_SIZE.width + TOOLBOX_NODE_SIZE.width + 40,
      y: 80
    },
    data: {}
  };
  const DEFAULT_SYSTEM_NODES = [
    TOOLBOX_NODE,
    SESSION_INFO_NODE,
    EMBEDDING_MODEL,
    APPLICATION_BAR_MODEL
  ];
  DISABLED_DELETE_NODE_TYPES = [
    FlowNodeTypeEnum.Toolbox,
    FlowNodeTypeEnum.SessionInfo,
    FlowNodeTypeEnum.ApplicationBar,
    FlowNodeTypeEnum.EditorApp,
    FlowNodeTypeEnum.CodeContainerApp
  ];
  defaultFlowState = {
    flowNodes: [],
    flowEdges: [],
    ready: true,
    flowEdgeLoading: false,
    flowNodeLoading: false,
    syncedNodes: [],
    syncedEdges: [],
    syncNodeQueue: [],
    syncEdgeQueue: [],
    edges: [],
    nodes: DEFAULT_SYSTEM_NODES
  };
  findFlowNodesWithSource = async (query) => {
    const flowNodes = await getRepository("FlowNode").find(query);
    const entityGroups = flowNodes.reduce((all, node) => {
      var _a;
      if (!all[node.source_type]) {
        all[node.source_type] = [];
      }
      (_a = all[node.source_type]) == null ? void 0 : _a.push(node);
      return all;
    }, {});
    const flowNodeDatas = {};
    await Promise.all(Object.entries(entityGroups).map(async ([key, groupNodes]) => {
      const entityName = key;
      flowNodeDatas[entityName] = await getRepository(entityName).find({
        where: {
          id: In(groupNodes.map((node) => node.source_id))
        }
      });
    }));
    return {
      flowNodes,
      entityGroups,
      flowNodeDatas
    };
  };
  getFlowStateActions = (set2, get2) => {
    return {
      reset: () => {
        set2(defaultFlowState);
      },
      setNodes: (newNodes) => {
        if (typeof newNodes === "function") {
          set2({
            nodes: newNodes(get2().nodes)
          });
          return;
        }
        set2({
          nodes: newNodes
        });
      },
      setEdges: (newEdges) => {
        if (typeof newEdges === "function") {
          set2({
            edges: newEdges(get2().edges)
          });
          return;
        }
        set2({
          edges: newEdges
        });
      },
      updateNodes: (changes) => {
        const nodes = get2().nodes;
        set2({
          nodes: applyNodeChanges(changes, nodes)
        });
      },
      updateEdges: (changes) => {
        const edges = get2().edges;
        set2({
          edges: applyEdgeChanges(changes, edges)
        });
      },
      addConnectionToEdges: (connection) => {
        const edges = get2().edges;
        set2({
          edges: addEdge(connection, edges)
        });
      },
      flowNodesToNodes: (flowNodes, flowNodeDatas = {}) => {
        const currentNodes = get2().nodes;
        const { changes } = flowNodesToNodeChanges(flowNodes, currentNodes, flowNodeDatas);
        set2({
          nodes: applyNodeChanges(changes, currentNodes)
        });
      },
      flowEdgesToEdges: (flowEdges) => {
        const currentEdges = get2().edges;
        const { changes, updatedIds, deletedIds } = flowEdgesToEdgeChanges(flowEdges, currentEdges);
        currentEdges.forEach((edge) => {
          if (!updatedIds.includes(edge.id)) {
            deletedIds.push(edge.id);
          }
        });
        deletedIds.forEach((id2) => {
          changes.push({
            type: "remove",
            id: id2
          });
        });
        set2({
          edges: applyEdgeChanges(changes, currentEdges)
        });
      },
      getNodes: (nodeIds) => {
        const nodes = get2().nodes;
        return nodes.filter((node) => nodeIds.includes(node.id));
      },
      removeSyncNodeQueue: (timestamps) => {
        const { syncNodeQueue } = get2();
        for (const timestamp of timestamps) {
          const index2 = syncNodeQueue.findIndex((item) => item.timestamp === timestamp);
          if (index2 > -1) {
            syncNodeQueue.splice(index2, 1);
          }
        }
        set2({
          syncNodeQueue
        });
      },
      removeSyncEdgeQueue: (timestamps) => {
        const { syncEdgeQueue } = get2();
        for (const timestamp of timestamps) {
          const index2 = syncEdgeQueue.findIndex((item) => item.timestamp === timestamp);
          if (index2 > -1) {
            syncEdgeQueue.splice(index2, 1);
          }
        }
        set2({
          syncEdgeQueue
        });
      },
      pushSyncNodeQueue: (syncType, query) => {
        const { syncNodeQueue } = get2();
        set2({
          syncNodeQueue: [
            ...syncNodeQueue,
            {
              query,
              timestamp: Date.now(),
              syncType
            }
          ]
        });
      },
      pushSyncEdgeQueue: () => {
        const { syncEdgeQueue } = get2();
        set2({
          syncEdgeQueue: [
            ...syncEdgeQueue,
            {
              timestamp: Date.now()
            }
          ]
        });
      },
      findFlowNodesWithSource: async (query, option) => {
        try {
          set2({
            flowNodeLoading: true
          });
          const { flowNodes, flowNodeDatas } = await findFlowNodesWithSource(query);
          if (option == null ? void 0 : option.clean) {
            set2({
              flowNodes,
              nodes: flowNodes.map((item) => {
                var _a;
                const source = (_a = flowNodeDatas == null ? void 0 : flowNodeDatas[item.source_type]) == null ? void 0 : _a.find((data) => data.id === item.source_id);
                return flowNodeToNode(item, {
                  data: source
                });
              })
            });
          } else {
            const currentFlowNodes = get2().flowNodes;
            const ids = flowNodes.map((node) => node.id);
            const currentNodes = get2().nodes;
            const { changes } = flowNodesToNodeChanges(flowNodes, currentNodes, flowNodeDatas);
            set2({
              flowNodes: [
                ...currentFlowNodes.filter((item) => !ids.includes(item.id)),
                ...flowNodes
              ],
              nodes: applyNodeChanges(changes, currentNodes)
            });
          }
          return flowNodes;
        } finally {
          set2({
            flowNodeLoading: false
          });
        }
      },
      findFlowEdges: async (query, option) => {
        try {
          set2({
            flowEdgeLoading: true
          });
          const flowEdges = await getRepository("FlowEdge").find(query);
          const currentflowEdges = get2().flowEdges;
          const ids = flowEdges.map((edge) => edge.id);
          if (option == null ? void 0 : option.clean) {
            set2({
              flowEdges,
              edges: flowEdges.map((item) => flowEdgeToEdge(item))
            });
          } else {
            const currentEdges = get2().edges;
            const { changes } = flowEdgesToEdgeChanges(flowEdges, currentEdges);
            set2({
              flowEdges: [
                ...currentflowEdges.filter((item) => !ids.includes(item.id)),
                ...flowEdges
              ],
              edges: applyEdgeChanges(changes, currentEdges)
            });
          }
          return flowEdges;
        } finally {
          set2({
            flowEdgeLoading: false
          });
        }
      },
      deleteFlowNode: async (node) => {
        try {
          if (!node.id && !node.source_type && !node.source_id) {
            throw new Error("Missing flow node indentify");
          }
          const currentNode = await getRepository("FlowNode").findOne({
            where: node.id ? {
              id: node.id
            } : {
              source_type: node.source_type,
              source_id: node.source_id
            }
          });
          if (currentNode) {
            await getRepository("FlowNode").delete(currentNode.id);
            const flowNodes = get2().flowNodes;
            if (currentNode.source_type && currentNode.source_id) {
              await getRepository(currentNode.source_type).delete(currentNode.source_id).catch((error) => {
                logWarn("Failed to delete source entity", currentNode.source_type, currentNode.source_id, error);
              });
            }
            const nodes = get2().nodes;
            set2({
              flowNodes: flowNodes.filter((item) => item.id !== currentNode.id),
              nodes: applyNodeChanges([
                {
                  type: "remove",
                  id: currentNode.id
                }
              ], nodes)
            });
          }
        } catch (error) {
          logWarn("Failed to delete flow node", error);
        }
      },
      deleteFlowEdge: async (edge) => {
        try {
          if (!edge.id && !edge.source && !edge.target) {
            throw new Error("Missing flow edge indentify");
          }
          const currentEdge = await getRepository("FlowEdge").findOne({
            where: edge.id ? {
              id: edge.id
            } : {
              source: edge.source,
              target: edge.target
            }
          });
          if (currentEdge) {
            await getRepository("FlowEdge").delete(currentEdge.id);
            const flowEdges = get2().flowEdges;
            set2({
              flowEdges: flowEdges.filter((item) => item.id !== currentEdge.id)
            });
          }
        } catch (error) {
          logWarn("Failed to delete flow edge", error);
        }
      },
      updateFlowNode: async (inputNode, options) => {
        try {
          const currentSession = useSessionState.getState().currentSession;
          if (!(currentSession == null ? void 0 : currentSession.id)) {
            throw new Error("Session not found");
          }
          if (!inputNode.id) {
            throw new Error("Missing flow node indentify");
          }
          await getRepository("FlowNode").update(inputNode.id, inputNode);
          const flowNodes = get2().flowNodes;
          const newFlowNodes = flowNodes.map((item) => {
            if (item.id === inputNode.id) {
              return {
                ...item,
                ...inputNode
              };
            }
            return item;
          });
          set2({
            flowNodes: (options == null ? void 0 : options.silent) ? newFlowNodes : [
              ...newFlowNodes
            ]
          });
        } catch (error) {
          logWarn("Failed to create or update flow node", error, inputNode);
        }
      },
      createOrUpdateFlowNode: async (inputNode, options) => {
        var _a;
        try {
          const currentSession = useSessionState.getState().currentSession;
          if (!(currentSession == null ? void 0 : currentSession.id)) {
            throw new Error("Session not found");
          }
          if (!inputNode.id && (!inputNode.source_type || !inputNode.source_id)) {
            throw new Error("Missing flow node indentify");
          }
          let flowNode;
          let currentNode = (inputNode == null ? void 0 : inputNode.id) ? get2().flowNodes.find((item) => item.id === inputNode.id) : void 0;
          if (!currentNode && (inputNode.id || inputNode.source_type && inputNode.source_id)) {
            currentNode = await getRepository("FlowNode").findOne({
              where: inputNode.id ? {
                id: inputNode.id
              } : {
                source_type: inputNode.source_type,
                source_id: inputNode.source_id
              }
            });
          }
          if (currentNode) {
            flowNode = deepmerge$1(currentNode, omitBy$1(inputNode, isUndefined$1));
            if (options == null ? void 0 : options.lazy) {
              getRepository("FlowNode").update(currentNode.id, flowNode);
            } else {
              await getRepository("FlowNode").update(currentNode.id, flowNode);
            }
          } else if (inputNode.source_id && inputNode.source_type) {
            flowNode = {
              ...inputNode,
              source_id: `${inputNode.source_id}`,
              source_type: `${inputNode.source_type}`,
              node_type: inputNode.node_type || "NEW_MESSAGE",
              session_id: inputNode.session_id || (currentSession == null ? void 0 : currentSession.id)
            };
            if (options == null ? void 0 : options.lazy) {
              flowNode.id = nanoid();
              getRepository("FlowNode").save(flowNode);
            } else {
              flowNode = await getRepository("FlowNode").save(flowNode);
            }
          } else {
            throw new Error("Missing source id and type");
          }
          let source;
          const currentNodeData = get2().nodes.find((item) => item.id === flowNode.id);
          if (flowNode.source_type && !currentNodeData) {
            source = await getRepository(flowNode.source_type).findOne({
              where: {
                id: inputNode.source_id
              }
            });
          } else if (flowNode.source_type && currentNodeData) {
            source = (_a = currentNodeData == null ? void 0 : currentNodeData.data) == null ? void 0 : _a.entity;
          }
          const flowNodes = get2().flowNodes;
          const nodes = get2().nodes;
          const { changes } = flowNodesToNodeChanges([
            flowNode
          ], nodes, {
            [flowNode.source_type]: [
              source
            ]
          });
          set2({
            flowNodes: [
              ...flowNodes.filter((item) => item.id !== flowNode.id),
              flowNode
            ],
            nodes: applyNodeChanges(changes, nodes)
          });
          return flowNode;
        } catch (error) {
          logWarn("Failed to create or update flow node", error, inputNode);
        }
      },
      createOrUpdateFlowEdge: async (inputEdge, options) => {
        try {
          const currentSession = useSessionState.getState().currentSession;
          if (!(currentSession == null ? void 0 : currentSession.id)) {
            throw new Error("Session not found");
          }
          if (!inputEdge.id && (!inputEdge.source || !inputEdge.target)) {
            throw new Error("Missing flow node indentify");
          }
          let edge;
          let currentEdge = (inputEdge == null ? void 0 : inputEdge.id) ? get2().flowEdges.find((item) => item.id === inputEdge.id) : void 0;
          if (currentEdge && (inputEdge.id || inputEdge.source && inputEdge.target)) {
            currentEdge = await getRepository("FlowEdge").findOne({
              where: inputEdge.id ? {
                id: inputEdge.id
              } : {
                source: inputEdge.source,
                target: inputEdge.target
              }
            });
          }
          if (currentEdge) {
            edge = deepmerge$1(currentEdge, omitBy$1(inputEdge, isUndefined$1));
            if (options == null ? void 0 : options.lazy) {
              getRepository("FlowEdge").update(currentEdge.id, edge);
            } else {
              await getRepository("FlowEdge").update(currentEdge.id, edge);
            }
          } else if (inputEdge.source && inputEdge.target) {
            edge = {
              ...inputEdge,
              source: `${inputEdge.source}`,
              target: `${inputEdge.target}`,
              session_id: inputEdge.session_id || (currentSession == null ? void 0 : currentSession.id)
            };
            if (options == null ? void 0 : options.lazy) {
              edge.id = nanoid();
              getRepository("FlowEdge").save(edge);
            } else {
              edge = await getRepository("FlowEdge").save(edge);
            }
          } else {
            throw new Error("Missing source and target");
          }
          const flowEdges = get2().flowEdges;
          const edges = get2().edges;
          set2({
            flowEdges: [
              ...flowEdges.filter((item) => item.id !== edge.id),
              edge
            ],
            edges: applyEdgeChanges(flowEdgesToEdgeChanges([
              edge
            ], edges).changes, edges)
          });
          return edge;
        } catch (error) {
          logWarn("Failed to create or update flow node", error);
        }
      }
    };
  };
  const SvgSnowflake = (props) => reactExports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    fill: "none",
    height: 192,
    viewBox: "0 0 150 150",
    width: 192,
    ...props
  }, reactExports.createElement("clipPath", {
    id: "a"
  }, reactExports.createElement("path", {
    d: "m0 0h150v150h-150z"
  })), reactExports.createElement("g", {
    clipPath: "url(#a)"
  }, reactExports.createElement("path", {
    d: "m150 0h-150v150h150z",
    fill: "#29b5e8"
  }), reactExports.createElement("path", {
    clipRule: "evenodd",
    d: "m130.375 67.2532-14.096 8.1221 14.096 8.0536c.843.4872 1.581 1.1357 2.174 1.9084.592.7727 1.026 1.6545 1.278 2.5951.251.9406.315 1.9215.188 2.8867-.128.9652-.444 1.8959-.931 2.7388-.488.843-1.136 1.5817-1.909 2.174s-1.654 1.0267-2.595 1.2782-1.921.3154-2.887.1878c-.965-.1275-1.896-.444-2.739-.9312l-25.2559-14.5496c-1.1575-.6696-2.1128-1.6394-2.765-2.8068-.6523-1.1674-.9773-2.4893-.9408-3.826.0198-.5792.1089-1.1538.2653-1.7117.517-1.8711 1.7458-3.4654 3.4234-4.4419l25.256-14.4983c.847-.4892 1.782-.8067 2.751-.9343.97-.1275 1.955-.0627 2.899.1909.945.2536 1.83.6909 2.605 1.287.775.596 1.425 1.3391 1.913 2.1866.49.8402.808 1.7693.935 2.7334.128.964.063 1.9439-.191 2.8826-.254.9388-.692 1.8177-1.288 2.5859-.597.7681-1.34 1.4101-2.186 1.8887zm-13.343 39.3698-25.2478-14.5243c-1.1296-.6483-2.4091-.9896-3.7115-.9902s-2.5823.3397-3.7124.987c-1.1301.6472-2.0712 1.579-2.7297 2.7026-.6585 1.1237-1.0115 2.4001-1.0239 3.7024v29.0135c.0654 1.928.8772 3.755 2.264 5.095 1.3869 1.341 3.2403 2.09 5.1691 2.09 1.9289 0 3.7823-.749 5.1691-2.09 1.3868-1.34 2.1986-3.167 2.264-5.095v-16.261l14.1301 8.122c.843.488 1.774.805 2.739.933.966.128 1.947.064 2.888-.187s1.823-.685 2.596-1.277c.774-.592 1.423-1.331 1.91-2.174.488-.843.805-1.773.933-2.739.128-.965.065-1.946-.186-2.887s-.685-1.824-1.277-2.597-1.331-1.422-2.174-1.91zm-29.0992-28.3806-10.527 10.3986c-.3601.3349-.8269.5319-1.318.5563h-3.0897c-.49-.0294-.9551-.2257-1.318-.5563l-10.4671-10.4329c-.3274-.3573-.521-.817-.5478-1.3009v-3.081c.0283-.4861.2215-.9481.5478-1.3095l10.4671-10.4329c.3637-.3281.829-.5214 1.318-.5477h3.0897c.4899.0228.9562.2166 1.318.5477l10.4928 10.4329c.3237.3623.514.8243.5392 1.3095v3.081c-.0237.483-.2143.9428-.5392 1.3009zm-8.3874-2.8928c-.0404-.499-.2485-.9696-.5905-1.3352l-3.0383-3.004c-.3641-.3275-.8291-.5207-1.318-.5478h-.1113c-.4867.0255-.9495.2191-1.3094.5478l-3.0383 3.004c-.3262.3676-.5165.8358-.5392 1.3266v.1113c.0215.4834.2124.9439.5392 1.3009l3.0554 2.9955c.3607.3274.823.5208 1.3094.5477h.1113c.4889-.027.9539-.2203 1.318-.5477l3.0383-3.0212c.3282-.3576.5244-.8166.5563-1.3009zm-47.4914-31.2217 25.2563 14.4811c1.1308.648 2.4115.989 3.7149.9889 1.3033 0 2.584-.3409 3.7148-.989 1.1309-.648 2.0725-1.5806 2.7314-2.7051.659-1.1245 1.0123-2.4018 1.0249-3.7051v-28.9879c-.0654-1.9277-.8772-3.7546-2.264-5.0952s-3.2402-2.0899-5.1691-2.0899c-1.9288 0-3.7822.7493-5.169 2.0899-1.3869 1.3406-2.1987 3.1675-2.2641 5.0952v16.2613l-14.1473-8.1307c-.8429-.4877-1.7737-.8047-2.7392-.9328-.9654-.1281-1.9466-.0647-2.8876.1864s-1.8232.6852-2.5965 1.2773c-.7732.5921-1.4222 1.3307-1.91 2.1736-.4878.843-.8048 1.7738-.9329 2.7392-.128.9655-.0647 1.9467.1864 2.8876.2512.941.6852 1.8233 1.2773 2.5965.5921.7733 1.3307 1.4223 2.1737 1.9101zm55.4252 15.4739c1.4914.118 2.9836-.2193 4.2793-.9671l25.2475-14.5496c.843-.4877 1.582-1.1368 2.174-1.91s1.026-1.6555 1.277-2.5965.315-1.9222.187-2.8876c-.128-.9655-.445-1.8962-.933-2.7392-.488-.8429-1.137-1.5816-1.91-2.1737-.774-.5921-1.656-1.0261-2.597-1.2772-1.9-.5072-3.924-.2387-5.627.7464l-14.1298 8.1991v-16.2613c-.0654-1.9277-.8772-3.7546-2.264-5.0952-1.3868-1.3405-3.2402-2.0899-5.1691-2.0899-1.9288 0-3.7822.7494-5.169 2.0899-1.3869 1.3406-2.1987 3.1675-2.2641 5.0952v29.0136c-.0023 1.8784.7086 3.6876 1.9892 5.0619 1.2805 1.3743 3.0351 2.2111 4.909 2.3412zm-25.8554 31.5298c-1.4916-.1213-2.9847.2162-4.2793.9671l-25.2905 14.4893c-1.7024.985-2.9438 2.607-3.451 4.507s-.2387 3.924.7465 5.627c.9851 1.702 2.6061 2.943 4.5065 3.451 1.9004.507 3.9244.238 5.6268-.747l14.1473-8.122v16.261c.0654 1.928.8772 3.755 2.2641 5.096 1.3868 1.34 3.2402 2.09 5.169 2.09 1.9289 0 3.7823-.75 5.1691-2.09 1.3868-1.341 2.1986-3.168 2.264-5.096v-29.0645c-.0038-1.869-.7144-3.6673-1.9891-5.0341s-3.0192-2.2009-4.8834-2.3348zm-6.8468-13.5825c.4875-1.6032.414-3.3247-.2083-4.8806-.6224-1.5559-1.7564-2.8532-3.2152-3.6779l-25.2306-14.541c-1.704-.976-3.7248-1.2385-5.6216-.7303-1.8968.5083-3.5155 1.7461-4.5032 3.4433-.4889.84-.8065 1.7686-.9343 2.732-.1278.9635-.0632 1.9428.1899 2.8811.2531.9384.6897 1.8173 1.2846 2.5858.595.7686 1.3364 1.4115 2.1814 1.8917l14.096 8.1221-14.096 8.0536c-.8429.4861-1.5819 1.1334-2.1746 1.9051-.5928.7717-1.0277 1.6526-1.2801 2.5923-.2523.9398-.317 1.9201-.1905 2.8849s.4418 1.8952.9279 2.7382c.4861.8429 1.1335 1.5819 1.9051 2.1746.7717.5928 1.6526 1.0277 2.5924 1.2801.9397.2523 1.92.317 2.8848.1905s1.8952-.4418 2.7382-.9279l25.2306-14.5496c1.6248-.9071 2.8451-2.3965 3.4149-4.168z",
    fill: "#fff",
    fillRule: "evenodd"
  })));
  const SvgGemma = (props) => reactExports.createElement("svg", {
    className: "mr-2 w-5 h-5",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: 48,
    height: 48,
    ...props
  }, reactExports.createElement("path", {
    fill: "#fbc02d",
    d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
  }), reactExports.createElement("path", {
    fill: "#e53935",
    d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
  }), reactExports.createElement("path", {
    fill: "#4caf50",
    d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
  }), reactExports.createElement("path", {
    fill: "#1565c0",
    d: "M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
  }));
  const SvgPhi = (props) => reactExports.createElement("svg", {
    className: "mr-2 w-5 h-5",
    width: 1024,
    height: 1024,
    viewBox: "0 0 1024 1024",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props
  }, reactExports.createElement("path", {
    d: "M44.522 44.5217H489.739V489.739H44.522V44.5217Z",
    fill: "#F35325"
  }), reactExports.createElement("path", {
    d: "M534.261 44.5217H979.478V489.739H534.261V44.5217Z",
    fill: "#81BC06"
  }), reactExports.createElement("path", {
    d: "M44.522 534.261H489.739V979.478H44.522V534.261Z",
    fill: "#05A6F0"
  }), reactExports.createElement("path", {
    d: "M534.261 534.261H979.478V979.478H534.261V534.261Z",
    fill: "#FFBA08"
  }));
  const SvgMeta = (props) => reactExports.createElement("svg", {
    id: "Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    viewBox: "0 0 287.56 191",
    ...props
  }, reactExports.createElement("defs", null, reactExports.createElement("style", null, ".cls-1{fill:#0081fb;}.cls-2{fill:url(#linear-gradient);}.cls-3{fill:url(#linear-gradient-2);}"), reactExports.createElement("linearGradient", {
    id: "linear-gradient",
    x1: 62.34,
    y1: 101.45,
    x2: 260.34,
    y2: 91.45,
    gradientTransform: "matrix(1, 0, 0, -1, 0, 192)",
    gradientUnits: "userSpaceOnUse"
  }, reactExports.createElement("stop", {
    offset: 0,
    stopColor: "#0064e1"
  }), reactExports.createElement("stop", {
    offset: 0.4,
    stopColor: "#0064e1"
  }), reactExports.createElement("stop", {
    offset: 0.83,
    stopColor: "#0073ee"
  }), reactExports.createElement("stop", {
    offset: 1,
    stopColor: "#0082fb"
  })), reactExports.createElement("linearGradient", {
    id: "linear-gradient-2",
    x1: 41.42,
    y1: 53,
    x2: 41.42,
    y2: 126,
    gradientTransform: "matrix(1, 0, 0, -1, 0, 192)",
    gradientUnits: "userSpaceOnUse"
  }, reactExports.createElement("stop", {
    offset: 0,
    stopColor: "#0082fb"
  }), reactExports.createElement("stop", {
    offset: 1,
    stopColor: "#0064e0"
  }))), reactExports.createElement("title", null, "facebook-meta"), reactExports.createElement("path", {
    className: "cls-1",
    d: "M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z"
  }), reactExports.createElement("path", {
    className: "cls-2",
    d: "M24.49,37.3C38.73,15.35,59.28,0,82.85,0c13.65,0,27.22,4,41.39,15.61,15.5,12.65,32,33.48,52.63,67.81l7.39,12.32c17.84,29.72,28,45,33.93,52.22,7.64,9.26,13,12,19.94,12,17.63,0,22-16.2,22-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191c-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71L146.08,93.6c-12.94-21.62-24.81-37.74-31.68-45C107,40.71,97.51,31.23,82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78Z"
  }), reactExports.createElement("path", {
    className: "cls-3",
    d: "M82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78C38.61,71.62,31.06,99.34,31.06,126c0,11,2.41,19.41,5.56,24.51L10.14,167.91C3.34,156.6,0,141.76,0,124.85,0,94.1,8.44,62.05,24.49,37.3,38.73,15.35,59.28,0,82.85,0Z"
  }));
  const SvgMistral = (props) => reactExports.createElement("svg", {
    className: "mr-2 w-5 h-5",
    width: 256,
    height: 233,
    viewBox: "0 0 256 233",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props
  }, reactExports.createElement("path", {
    d: "M186.182 0h46.545v46.545h-46.545z"
  }), reactExports.createElement("path", {
    fill: "#f7d046",
    d: "M209.455 0H256v46.545h-46.545z"
  }), reactExports.createElement("path", {
    d: "M0 0h46.545v46.545H0zm0 46.545h46.545V93.09H0zm0 46.546h46.545v46.545H0zm0 46.545h46.545v46.545H0zm0 46.546h46.545v46.545H0z"
  }), reactExports.createElement("path", {
    fill: "#f7d046",
    d: "M23.273 0h46.545v46.545H23.273z"
  }), reactExports.createElement("path", {
    fill: "#f2a73b",
    d: "M209.455 46.545H256V93.09h-46.545zm-186.182 0h46.545V93.09H23.273z"
  }), reactExports.createElement("path", {
    d: "M139.636 46.545h46.545V93.09h-46.545z"
  }), reactExports.createElement("path", {
    fill: "#f2a73b",
    d: "M162.909 46.545h46.545V93.09h-46.545zm-93.091 0h46.545V93.09H69.818z"
  }), reactExports.createElement("path", {
    fill: "#ee792f",
    d: "M116.364 93.091h46.545v46.545h-46.545zm46.545 0h46.545v46.545h-46.545zm-93.091 0h46.545v46.545H69.818z"
  }), reactExports.createElement("path", {
    d: "M93.091 139.636h46.545v46.545H93.091z"
  }), reactExports.createElement("path", {
    fill: "#eb5829",
    d: "M116.364 139.636h46.545v46.545h-46.545z"
  }), reactExports.createElement("path", {
    fill: "#ee792f",
    d: "M209.455 93.091H256v46.545h-46.545zm-186.182 0h46.545v46.545H23.273z"
  }), reactExports.createElement("path", {
    d: "M186.182 139.636h46.545v46.545h-46.545z"
  }), reactExports.createElement("path", {
    fill: "#eb5829",
    d: "M209.455 139.636H256v46.545h-46.545z"
  }), reactExports.createElement("path", {
    d: "M186.182 186.182h46.545v46.545h-46.545z"
  }), reactExports.createElement("path", {
    fill: "#eb5829",
    d: "M23.273 139.636h46.545v46.545H23.273z"
  }), reactExports.createElement("path", {
    fill: "#ea3326",
    d: "M209.455 186.182H256v46.545h-46.545zm-186.182 0h46.545v46.545H23.273z"
  }));
  const qwenImage = "/NoLLMChat/assets/qwen-B-gSh3_v.webp";
  const smollmImage = "/NoLLMChat/assets/smollm-CikBjd4F.png";
  const stablelmImage = "/NoLLMChat/assets/stablelm-BquePdQ7.png";
  const nomicImage = "/NoLLMChat/assets/nomic-BjJqoFji.webp";
  const joshuaImage = "/NoLLMChat/assets/joshua-ByaReJuI.webp";
  LLMIcon = reactExports.memo(({ name, className, ...props }) => {
    name = name.toLowerCase();
    if (name.includes("gemma")) {
      return jsxRuntimeExports.jsx(SvgGemma, {
        className: cn("w-5 h-5", className),
        ...props
      });
    } else if (name == null ? void 0 : name.includes("qwen")) {
      return jsxRuntimeExports.jsx("img", {
        className: cn("w-5 h-5", className),
        src: qwenImage,
        alt: "qwen",
        ...props
      });
    } else if (name == null ? void 0 : name.includes("phi")) {
      return jsxRuntimeExports.jsx(SvgPhi, {
        className: cn("w-5 h-5", className),
        ...props
      });
    } else if (name == null ? void 0 : name.includes("llama")) {
      return jsxRuntimeExports.jsx(SvgMeta, {
        className: cn("w-5 h-5", className),
        ...props
      });
    } else if (name == null ? void 0 : name.includes("smollm")) {
      return jsxRuntimeExports.jsx("img", {
        className: cn("w-5 h-5", className),
        src: smollmImage,
        alt: "smollm",
        ...props
      });
    } else if (name == null ? void 0 : name.includes("mistral")) {
      return jsxRuntimeExports.jsx(SvgMistral, {
        className: cn("w-5 h-5", className),
        ...props
      });
    } else if (name == null ? void 0 : name.includes("snowflake")) {
      return jsxRuntimeExports.jsx(SvgSnowflake, {
        className: cn("w-5 h-5 rounded-full", className),
        ...props
      });
    } else if (name == null ? void 0 : name.includes("stablelm")) {
      return jsxRuntimeExports.jsx("img", {
        className: cn("w-5 h-5 rounded-full", className),
        src: stablelmImage,
        alt: "stablelm",
        ...props
      });
    } else if (name == null ? void 0 : name.includes("nomic")) {
      return jsxRuntimeExports.jsx("img", {
        className: cn("w-5 h-5 rounded-full", className),
        src: nomicImage,
        alt: "nomic",
        ...props
      });
    } else if ((name == null ? void 0 : name.includes("Xenova")) || (name == null ? void 0 : name.includes("janus"))) {
      return jsxRuntimeExports.jsx("img", {
        className: cn("w-5 h-5 rounded-full", className),
        src: joshuaImage,
        alt: "Xenova",
        ...props
      });
    }
    return jsxRuntimeExports.jsx(LazyIcon, {
      className: cn("w-5 h-5", className),
      name: "brain"
    });
  });
  RECOMMENDATION_LOCAL_LLMS = [
    "Qwen2.5-1.5B-Instruct-q4f32_1-MLC",
    "Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC",
    "stablelm-2-zephyr-1_6b-q4f16_1-MLC-1k",
    "Phi-3.5-mini-instruct-q4f16_1-MLC-1k",
    "Llama-3.2-3B-Instruct-q4f32_1-MLC"
  ];
  LLMInfo = reactExports.memo((props) => {
    var _a;
    const { name, model, isCached, isFunctionCalling } = props;
    const { t: t2 } = useTranslation("atoms");
    const modelTypeToString = reactExports.useCallback((modelType) => {
      if (modelType === 1) {
        return "llm_info.model_types.embedding";
      }
      if (modelType === 2) {
        return "llm_info.model_types.vlm";
      }
      return "llm_info.model_types.llm";
    }, []);
    if (!model) {
      return void 0;
    }
    return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
      children: [
        jsxRuntimeExports.jsx(Badge, {
          className: "",
          children: t2(modelTypeToString(model.model_type))
        }),
        RECOMMENDATION_LOCAL_LLMS.some((item) => name && item.includes(name)) ? jsxRuntimeExports.jsx(Badge, {
          className: "",
          variant: "outline",
          children: t2("llm_info.recommended")
        }) : null,
        isCached ? jsxRuntimeExports.jsx(Badge, {
          className: "",
          variant: "outline",
          children: t2("llm_info.cached")
        }) : null,
        isFunctionCalling ? jsxRuntimeExports.jsx(Badge, {
          className: "",
          variant: "outline",
          children: t2("llm_info.function_calling")
        }) : null,
        (model == null ? void 0 : model.low_resource_required) ? jsxRuntimeExports.jsx(Badge, {
          className: "",
          variant: "outline",
          children: t2("llm_info.low_resource_required")
        }) : null,
        ((_a = model == null ? void 0 : model.overrides) == null ? void 0 : _a.context_window_size) ? jsxRuntimeExports.jsxs(Badge, {
          className: "",
          variant: "outline",
          children: [
            model.overrides.context_window_size.toLocaleString("en-US"),
            " Tokens"
          ]
        }) : null,
        (model == null ? void 0 : model.vram_required_MB) ? jsxRuntimeExports.jsxs(Badge, {
          className: "",
          variant: "outline",
          children: [
            "VRAM: ",
            model.vram_required_MB.toLocaleString("en-US"),
            " MB"
          ]
        }) : null
      ]
    });
  });
  Textarea = reactExports.forwardRef(({ className, ...props }, ref) => {
    return jsxRuntimeExports.jsx("textarea", {
      className: cn("flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50", className),
      ref,
      ...props
    });
  });
  Textarea.displayName = "Textarea";
  const alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  });
  Alert = reactExports.forwardRef(({ className, variant, ...props }, ref) => jsxRuntimeExports.jsx("div", {
    ref,
    role: "alert",
    className: cn(alertVariants({
      variant
    }), className),
    ...props
  }));
  Alert.displayName = "Alert";
  AlertTitle = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx("h5", {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }));
  AlertTitle.displayName = "AlertTitle";
  AlertDescription = reactExports.forwardRef(({ className, ...props }, ref) => jsxRuntimeExports.jsx("div", {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }));
  AlertDescription.displayName = "AlertDescription";
  function useAutoResizeTextarea({ minHeight, maxHeight }) {
    const textareaRef = reactExports.useRef(null);
    const adjustHeight = reactExports.useCallback((reset) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }
      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY));
      textarea.style.height = `${newHeight}px`;
    }, [
      minHeight,
      maxHeight
    ]);
    reactExports.useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = `${minHeight}px`;
      }
    }, [
      minHeight
    ]);
    reactExports.useEffect(() => {
      const handleResize = () => adjustHeight();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [
      adjustHeight
    ]);
    return {
      textareaRef,
      adjustHeight
    };
  }
  const MIN_HEIGHT = 48;
  const MAX_HEIGHT = 164;
  AIInput = function({ onSubmit, disabled, enableTool, enableFile, placeholder, minHeight, maxHeight, className, onChange, value }) {
    const [loading, setLoading] = reactExports.useState(false);
    const [innerValue, setInnerValue] = reactExports.useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
      minHeight: minHeight || MIN_HEIGHT,
      maxHeight: maxHeight || MAX_HEIGHT
    });
    const [showSearch, setShowSearch] = reactExports.useState(true);
    const handleSubmit = async (e2) => {
      try {
        setLoading(true);
        await onSubmit(innerValue, e2);
      } finally {
        setLoading(false);
      }
    };
    return jsxRuntimeExports.jsx("div", {
      className: cn("w-full py-4 max-w-xl", className),
      children: jsxRuntimeExports.jsx("div", {
        className: "relative w-full mx-auto",
        children: jsxRuntimeExports.jsxs("div", {
          className: "relative flex flex-col",
          children: [
            jsxRuntimeExports.jsx("div", {
              className: "overflow-y-auto",
              style: {
                maxHeight: `${maxHeight || MAX_HEIGHT}px`
              },
              children: jsxRuntimeExports.jsx(Textarea, {
                id: "ai-input-04",
                value: (onChange ? value : innerValue) || "",
                disabled: disabled || loading,
                placeholder,
                className: "w-full rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 leading-[1.2]",
                ref: textareaRef,
                onKeyDown: (e2) => {
                  if (e2.key === "Enter" && !e2.shiftKey) {
                    e2.preventDefault();
                    handleSubmit(e2);
                  }
                },
                onChange: (e2) => {
                  if (!onChange) {
                    setInnerValue(e2.target.value);
                  }
                  adjustHeight();
                  onChange == null ? void 0 : onChange(e2);
                }
              })
            }),
            jsxRuntimeExports.jsxs("div", {
              className: "h-12 bg-black/5 dark:bg-white/5 rounded-b-xl",
              children: [
                jsxRuntimeExports.jsxs("div", {
                  className: "absolute left-3 bottom-3 flex items-center gap-2",
                  children: [
                    enableFile ? jsxRuntimeExports.jsxs("label", {
                      className: "cursor-pointer rounded-lg p-2 bg-black/5 dark:bg-white/5",
                      children: [
                        jsxRuntimeExports.jsx("input", {
                          type: "file",
                          className: "hidden"
                        }),
                        jsxRuntimeExports.jsx(LazyIcon, {
                          name: "paperclip",
                          className: "w-4 h-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                        })
                      ]
                    }) : void 0,
                    enableTool ? jsxRuntimeExports.jsxs("button", {
                      type: "button",
                      onClick: () => {
                        setShowSearch(!showSearch);
                      },
                      className: cn("rounded-full transition-all flex items-center gap-2 px-1.5 py-1 border h-8", showSearch ? "bg-sky-500/15 border-sky-400 text-sky-500" : "bg-black/5 dark:bg-white/5 border-transparent text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"),
                      children: [
                        jsxRuntimeExports.jsx("div", {
                          className: "w-4 h-4 flex items-center justify-center flex-shrink-0",
                          children: jsxRuntimeExports.jsx(motion.div, {
                            animate: {
                              rotate: showSearch ? 180 : 0,
                              scale: showSearch ? 1.1 : 1
                            },
                            whileHover: {
                              rotate: showSearch ? 180 : 15,
                              scale: 1.1,
                              transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 10
                              }
                            },
                            transition: {
                              type: "spring",
                              stiffness: 260,
                              damping: 25
                            },
                            children: jsxRuntimeExports.jsx(LazyIcon, {
                              name: "globe",
                              className: cn("w-4 h-4", showSearch ? "text-sky-500" : "text-inherit")
                            })
                          })
                        }),
                        jsxRuntimeExports.jsx(AnimatePresence, {
                          children: showSearch && jsxRuntimeExports.jsx(motion.span, {
                            initial: {
                              width: 0,
                              opacity: 0
                            },
                            animate: {
                              width: "auto",
                              opacity: 1
                            },
                            exit: {
                              width: 0,
                              opacity: 0
                            },
                            transition: {
                              duration: 0.2
                            },
                            className: "text-sm overflow-hidden whitespace-nowrap text-sky-500 flex-shrink-0",
                            children: "Search"
                          })
                        })
                      ]
                    }) : void 0
                  ]
                }),
                jsxRuntimeExports.jsx("div", {
                  className: "absolute right-3 bottom-3",
                  children: jsxRuntimeExports.jsx("button", {
                    type: "button",
                    disabled: disabled || loading,
                    onClick: (e2) => {
                      handleSubmit(e2);
                    },
                    className: cn("rounded-lg p-2", onChange && value || innerValue ? "bg-sky-500/15 text-sky-500" : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"),
                    children: jsxRuntimeExports.jsx(LazyIcon, {
                      name: "send",
                      className: "w-4 h-4"
                    })
                  })
                })
              ]
            })
          ]
        })
      })
    });
  };
  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill(object) {
    return objectToString.call(object) === "[object Array]";
  };
  function isFunction(object) {
    return typeof object === "function";
  }
  function typeStr(obj) {
    return isArray(obj) ? "array" : typeof obj;
  }
  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }
  function hasProperty(obj, propName) {
    return obj != null && typeof obj === "object" && propName in obj;
  }
  function primitiveHasOwnProperty(primitive, propName) {
    return primitive != null && typeof primitive !== "object" && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
  }
  var regExpTest = RegExp.prototype.test;
  function testRegExp(re, string) {
    return regExpTest.call(re, string);
  }
  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;"
  };
  function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
      return entityMap[s];
    });
  }
  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;
  function parseTemplate(template, tags) {
    if (!template) return [];
    var lineHasNonSpace = false;
    var sections = [];
    var tokens = [];
    var spaces = [];
    var hasTag = false;
    var nonSpace = false;
    var indentation = "";
    var tagIndex = 0;
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }
      hasTag = false;
      nonSpace = false;
    }
    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags(tagsToCompile) {
      if (typeof tagsToCompile === "string") tagsToCompile = tagsToCompile.split(spaceRe, 2);
      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error("Invalid tags: " + tagsToCompile);
      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
      closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
    }
    compileTags(tags || mustache.tags);
    var scanner = new Scanner(template);
    var start2, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start2 = scanner.pos;
      value = scanner.scanUntil(openingTagRe);
      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);
          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
            indentation += chr;
          } else {
            nonSpace = true;
            lineHasNonSpace = true;
            indentation += " ";
          }
          tokens.push([
            "text",
            chr,
            start2,
            start2 + 1
          ]);
          start2 += 1;
          if (chr === "\n") {
            stripSpace();
            indentation = "";
            tagIndex = 0;
            lineHasNonSpace = false;
          }
        }
      }
      if (!scanner.scan(openingTagRe)) break;
      hasTag = true;
      type = scanner.scan(tagRe) || "name";
      scanner.scan(whiteRe);
      if (type === "=") {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === "{") {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = "&";
      } else {
        value = scanner.scanUntil(closingTagRe);
      }
      if (!scanner.scan(closingTagRe)) throw new Error("Unclosed tag at " + scanner.pos);
      if (type == ">") {
        token = [
          type,
          value,
          start2,
          scanner.pos,
          indentation,
          tagIndex,
          lineHasNonSpace
        ];
      } else {
        token = [
          type,
          value,
          start2,
          scanner.pos
        ];
      }
      tagIndex++;
      tokens.push(token);
      if (type === "#" || type === "^") {
        sections.push(token);
      } else if (type === "/") {
        openSection = sections.pop();
        if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start2);
        if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start2);
      } else if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      } else if (type === "=") {
        compileTags(value);
      }
    }
    stripSpace();
    openSection = sections.pop();
    if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    return nestTokens(squashTokens(tokens));
  }
  function squashTokens(tokens) {
    var squashedTokens = [];
    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];
      if (token) {
        if (token[0] === "text" && lastToken && lastToken[0] === "text") {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }
    return squashedTokens;
  }
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];
    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];
      switch (token[0]) {
        case "#":
        case "^":
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case "/":
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }
    return nestedTokens;
  }
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }
  Scanner.prototype.eos = function eos() {
    return this.tail === "";
  };
  Scanner.prototype.scan = function scan(re) {
    var match = this.tail.match(re);
    if (!match || match.index !== 0) return "";
    var string = match[0];
    this.tail = this.tail.substring(string.length);
    this.pos += string.length;
    return string;
  };
  Scanner.prototype.scanUntil = function scanUntil(re) {
    var index2 = this.tail.search(re), match;
    switch (index2) {
      case -1:
        match = this.tail;
        this.tail = "";
        break;
      case 0:
        match = "";
        break;
      default:
        match = this.tail.substring(0, index2);
        this.tail = this.tail.substring(index2);
    }
    this.pos += match.length;
    return match;
  };
  function Context(view, parentContext) {
    this.view = view;
    this.cache = {
      ".": this.view
    };
    this.parent = parentContext;
  }
  Context.prototype.push = function push(view) {
    return new Context(view, this);
  };
  Context.prototype.lookup = function lookup(name) {
    var cache = this.cache;
    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index2, lookupHit = false;
      while (context) {
        if (name.indexOf(".") > 0) {
          intermediateValue = context.view;
          names = name.split(".");
          index2 = 0;
          while (intermediateValue != null && index2 < names.length) {
            if (index2 === names.length - 1) lookupHit = hasProperty(intermediateValue, names[index2]) || primitiveHasOwnProperty(intermediateValue, names[index2]);
            intermediateValue = intermediateValue[names[index2++]];
          }
        } else {
          intermediateValue = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }
        if (lookupHit) {
          value = intermediateValue;
          break;
        }
        context = context.parent;
      }
      cache[name] = value;
    }
    if (isFunction(value)) value = value.call(this.view);
    return value;
  };
  function Writer() {
    this.templateCache = {
      _cache: {},
      set: function set2(key, value) {
        this._cache[key] = value;
      },
      get: function get2(key) {
        return this._cache[key];
      },
      clear: function clear() {
        this._cache = {};
      }
    };
  }
  Writer.prototype.clearCache = function clearCache() {
    if (typeof this.templateCache !== "undefined") {
      this.templateCache.clear();
    }
  };
  Writer.prototype.parse = function parse(template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ":" + (tags || mustache.tags).join(":");
    var isCacheEnabled = typeof cache !== "undefined";
    var tokens = isCacheEnabled ? cache.get(cacheKey) : void 0;
    if (tokens == void 0) {
      tokens = parseTemplate(template, tags);
      isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
  };
  Writer.prototype.render = function render(template, view, partials, config) {
    var tags = this.getConfigTags(config);
    var tokens = this.parse(template, tags);
    var context = view instanceof Context ? view : new Context(view, void 0);
    return this.renderTokens(tokens, context, partials, template, config);
  };
  Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
    var buffer = "";
    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = void 0;
      token = tokens[i];
      symbol = token[0];
      if (symbol === "#") value = this.renderSection(token, context, partials, originalTemplate, config);
      else if (symbol === "^") value = this.renderInverted(token, context, partials, originalTemplate, config);
      else if (symbol === ">") value = this.renderPartial(token, context, partials, config);
      else if (symbol === "&") value = this.unescapedValue(token, context);
      else if (symbol === "name") value = this.escapedValue(token, context, config);
      else if (symbol === "text") value = this.rawValue(token);
      if (value !== void 0) buffer += value;
    }
    return buffer;
  };
  Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
    var self2 = this;
    var buffer = "";
    var value = context.lookup(token[1]);
    function subRender(template) {
      return self2.render(template, context, partials, config);
    }
    if (!value) return;
    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
      }
    } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== "string") throw new Error("Cannot use higher-order sections without the original template");
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
      if (value != null) buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
    }
    return buffer;
  };
  Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
    var value = context.lookup(token[1]);
    if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate, config);
  };
  Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, "");
    var partialByNl = partial.split("\n");
    for (var i = 0; i < partialByNl.length; i++) {
      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
        partialByNl[i] = filteredIndentation + partialByNl[i];
      }
    }
    return partialByNl.join("\n");
  };
  Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
    if (!partials) return;
    var tags = this.getConfigTags(config);
    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
      var lineHasNonSpace = token[6];
      var tagIndex = token[5];
      var indentation = token[4];
      var indentedValue = value;
      if (tagIndex == 0 && indentation) {
        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
      }
      var tokens = this.parse(indentedValue, tags);
      return this.renderTokens(tokens, context, partials, indentedValue, config);
    }
  };
  Writer.prototype.unescapedValue = function unescapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return value;
  };
  Writer.prototype.escapedValue = function escapedValue(token, context, config) {
    var escape = this.getConfigEscape(config) || mustache.escape;
    var value = context.lookup(token[1]);
    if (value != null) return typeof value === "number" && escape === mustache.escape ? String(value) : escape(value);
  };
  Writer.prototype.rawValue = function rawValue(token) {
    return token[1];
  };
  Writer.prototype.getConfigTags = function getConfigTags(config) {
    if (isArray(config)) {
      return config;
    } else if (config && typeof config === "object") {
      return config.tags;
    } else {
      return void 0;
    }
  };
  Writer.prototype.getConfigEscape = function getConfigEscape(config) {
    if (config && typeof config === "object" && !isArray(config)) {
      return config.escape;
    } else {
      return void 0;
    }
  };
  mustache = {
    name: "mustache.js",
    version: "4.2.0",
    tags: [
      "{{",
      "}}"
    ],
    clearCache: void 0,
    escape: void 0,
    parse: void 0,
    render: void 0,
    Scanner: void 0,
    Context: void 0,
    Writer: void 0,
    set templateCache(cache) {
      defaultWriter.templateCache = cache;
    },
    get templateCache() {
      return defaultWriter.templateCache;
    }
  };
  var defaultWriter = new Writer();
  mustache.clearCache = function clearCache() {
    return defaultWriter.clearCache();
  };
  mustache.parse = function parse(template, tags) {
    return defaultWriter.parse(template, tags);
  };
  mustache.render = function render(template, view, partials, config) {
    if (typeof template !== "string") {
      throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first argument for mustache#render(template, view, partials)');
    }
    return defaultWriter.render(template, view, partials, config);
  };
  mustache.escape = escapeHtml;
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;
  const handleStream = async (streamResponse, onMessageUpdate) => {
    let content = "";
    let response = "";
    let lastChunk;
    const chunks = [];
    await streamResponse;
    for await (const chunk of streamResponse) {
      if (!chunk) {
        continue;
      }
      if (Array.isArray(chunk)) {
        chunks.push(...chunk.map((c) => c.content));
        if (chunks == null ? void 0 : chunks.length) {
          response = chunks.join("");
          onMessageUpdate == null ? void 0 : onMessageUpdate({
            chunk,
            content: response
          });
        }
      } else {
        content = typeof chunk === "object" && "content" in chunk ? `${chunk.content}` : `${chunk}`;
        onMessageUpdate == null ? void 0 : onMessageUpdate({
          chunk,
          content
        });
      }
      lastChunk = chunk;
    }
    return {
      lastChunk,
      content
    };
  };
  useLocalLLM = () => {
    const toolsCallingStream = useLocalLLMState((state) => state.toolsCallingStream);
    const structuredStream = useLocalLLMState((state) => state.structuredStream);
    const stream = useLocalLLMState((state) => state.stream);
    const llmStream = reactExports.useCallback(async (messages, { tools, schemas, onMessageUpdate, onMessageFinish }) => {
      var _a, _b, _c, _d;
      if (schemas && (schemas == null ? void 0 : schemas.length) > 1) {
        logWarn("Multiple schemas are not supported");
      }
      let streamResponse;
      if (schemas == null ? void 0 : schemas.length) {
        const schema = (_c = (_b = (_a = schemas == null ? void 0 : schemas[0]) == null ? void 0 : _a.node) == null ? void 0 : _b.data) == null ? void 0 : _c.entity;
        if (!((_d = schema == null ? void 0 : schema.schema_items) == null ? void 0 : _d.length)) {
          throw new Error("Schema is not found");
        }
        streamResponse = structuredStream(schema.schema_items, messages);
      } else if (tools == null ? void 0 : tools.length) {
        streamResponse = toolsCallingStream(tools.reduce((all, item) => {
          var _a2, _b2, _c2, _d2, _e;
          const toolEntity = (_a2 = item.node.data) == null ? void 0 : _a2.entity;
          const toolSchemaEnity = (_d2 = (_c2 = (_b2 = item == null ? void 0 : item.connectedNodes) == null ? void 0 : _b2.find((node) => node.type === FlowNodeTypeEnum.Schema)) == null ? void 0 : _c2.data) == null ? void 0 : _d2.entity;
          if (toolEntity && ((_e = toolSchemaEnity == null ? void 0 : toolSchemaEnity.schema_items) == null ? void 0 : _e.length)) {
            all.push({
              name: toolEntity.name,
              description: toolEntity.description,
              schemaItems: toolSchemaEnity.schema_items
            });
          }
          return all;
        }, []), messages);
      } else {
        streamResponse = stream(messages);
      }
      if (!streamResponse) {
        throw new Error("Stream is not supported");
      }
      const { lastChunk, content } = await handleStream(streamResponse, onMessageUpdate);
      onMessageFinish == null ? void 0 : onMessageFinish({
        content,
        lastChunk
      });
      return {
        lastChunk,
        content
      };
    }, [
      stream,
      structuredStream,
      toolsCallingStream
    ]);
    return {
      stream: llmStream
    };
  };
});
export {
  _defineProperty as $,
  Alert as A,
  isObject$6 as B,
  isFunction$4 as C,
  toString_1 as D,
  _Set as E,
  FlowNodePlaceholderTypeEnum as F,
  _setToArray as G,
  Handle as H,
  In as I,
  _SetCache as J,
  _cacheHas as K,
  LLMStatusEnum as L,
  _baseIteratee as M,
  _Symbol as N,
  isArguments_1 as O,
  Position as P,
  _arrayPush as Q,
  RECOMMENDATION_LOCAL_LLMS as R,
  keys_1 as S,
  Textarea as T,
  isArrayLike_1 as U,
  isSymbol_1 as V,
  _arrayMap as W,
  _baseGet as X,
  _baseUnary as Y,
  identity_1 as Z,
  _baseGetTag as _,
  __tla,
  color as a,
  eq_1 as a0,
  _isIndex as a1,
  isObject_1 as a2,
  _root as a3,
  _baseIsEqual as a4,
  _getPrototype as a5,
  _arraySome as a6,
  _baseAssignValue as a7,
  memoize$2 as a8,
  NodeResizer as a9,
  isBufferExports as aA,
  _getAllKeys as aB,
  _getAllKeysIn as aC,
  _castPath as aD,
  _toKey as aE,
  isFunction_1 as aF,
  isTypedArray_1 as aG,
  useSyncExternalStoreExports as aH,
  _basePickBy as aI,
  hasIn_1 as aJ,
  useSyncExternalStoreExports$1 as aK,
  Panel as aa,
  useStore as ab,
  useStoreApi as ac,
  useNodes as ad,
  ViewportPortal as ae,
  SYSTEM_NODE_IDS as af,
  DISABLED_DELETE_NODE_TYPES as ag,
  deepmerge$1 as ah,
  applyNodeChanges as ai,
  index as aj,
  PanOnScrollMode as ak,
  Background as al,
  BackgroundVariant as am,
  Controls as an,
  MiniMap as ao,
  findFlowNodesWithSource as ap,
  global as aq,
  _assignValue as ar,
  keysIn_1 as as,
  _getSymbols as at,
  _getSymbolsIn as au,
  _Uint8Array as av,
  _isPrototype as aw,
  _getTag as ax,
  _nodeUtilExports as ay,
  _Stack as az,
  interpolateRgb as b,
  constant$1 as c,
  interpolateString as d,
  defaultFlowState as e,
  LLMProviderEnum as f,
  getFlowStateActions as g,
  LLMModelTypeEnum as h,
  interpolateNumber as i,
  LLMIcon as j,
  LLMInfo as k,
  useReactFlow as l,
  useHandleConnections as m,
  filterUserConnections as n,
  AlertTitle as o,
  AlertDescription as p,
  AIInput as q,
  mustache as r,
  shimExports as s,
  useLocalLLM as t,
  useInternalNode as u,
  omitBy$1 as v,
  isUndefined$1 as w,
  isArray_1 as x,
  isObjectLike_1 as y,
  get$2 as z
};
