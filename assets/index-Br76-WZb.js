var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { a4 as logWarn, V as create, X as devtools, __tla as __tla_0 } from "./index-Bs2EL0Mm.js";
let useWebContainerState;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const DEFAULT_EDITOR_ORIGIN = "https://stackblitz.com";
  const IGNORED_ERROR = new Error();
  IGNORED_ERROR.stack = "";
  const params = {};
  let editorOrigin = null;
  const iframeSettings = {
    get editorOrigin() {
      if (editorOrigin == null) {
        editorOrigin = new URL(globalThis.WEBCONTAINER_API_IFRAME_URL ?? DEFAULT_EDITOR_ORIGIN).origin;
      }
      return editorOrigin;
    },
    set editorOrigin(newOrigin) {
      editorOrigin = new URL(newOrigin).origin;
    },
    setQueryParam(key, value) {
      params[key] = value;
    },
    get url() {
      const url = new URL(this.editorOrigin);
      url.pathname = "/headless";
      for (const param in params) {
        url.searchParams.set(param, params[param]);
      }
      url.searchParams.set("version", "1.5.1-internal.1");
      return url;
    }
  };
  function resettablePromise() {
    let resolve;
    let promise;
    function reset() {
      promise = new Promise((_resolve) => resolve = _resolve);
    }
    reset();
    return {
      get promise() {
        return promise;
      },
      resolve(value) {
        return resolve(value);
      },
      reset
    };
  }
  ({
    initialized: false,
    bootCalled: false,
    forwardAuth: true,
    redirectUri: "",
    authComplete: resettablePromise(),
    clientId: "",
    oauthScope: "",
    broadcastChannel: null,
    get editorOrigin() {
      return iframeSettings.editorOrigin;
    },
    tokens: null,
    cleanup: []
  });
  var PreviewMessageType;
  (function(PreviewMessageType2) {
    PreviewMessageType2["UncaughtException"] = "PREVIEW_UNCAUGHT_EXCEPTION";
    PreviewMessageType2["UnhandledRejection"] = "PREVIEW_UNHANDLED_REJECTION";
    PreviewMessageType2["ConsoleError"] = "PREVIEW_CONSOLE_ERROR";
  })(PreviewMessageType || (PreviewMessageType = {}));
  var __defProp2 = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all) __defProp2(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var comlink_exports = {};
  __export(comlink_exports, {
    createEndpoint: () => createEndpoint,
    expose: () => expose,
    proxy: () => proxy,
    proxyMarker: () => proxyMarker,
    releaseProxy: () => releaseProxy,
    transfer: () => transfer,
    transferHandlers: () => transferHandlers,
    windowEndpoint: () => windowEndpoint,
    wrap: () => wrap
  });
  var proxyMarker = Symbol("Comlink.proxy");
  var createEndpoint = Symbol("Comlink.endpoint");
  var releaseProxy = Symbol("Comlink.releaseProxy");
  var throwMarker = Symbol("Comlink.thrown");
  var isObject = (val) => typeof val === "object" && val !== null || typeof val === "function";
  var proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
      const { port1, port2 } = new MessageChannel();
      expose(obj, port1);
      return [
        port2,
        [
          port2
        ]
      ];
    },
    deserialize(port) {
      port.start();
      return wrap(port);
    }
  };
  var throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
      let serialized;
      if (value instanceof Error) {
        serialized = {
          isError: true,
          value: {
            message: value.message,
            name: value.name,
            stack: value.stack
          }
        };
      } else {
        serialized = {
          isError: false,
          value
        };
      }
      return [
        serialized,
        []
      ];
    },
    deserialize(serialized) {
      if (serialized.isError) {
        throw Object.assign(new Error(serialized.value.message), serialized.value);
      }
      throw serialized.value;
    }
  };
  var transferHandlers = /* @__PURE__ */ new Map([
    [
      "proxy",
      proxyTransferHandler
    ],
    [
      "throw",
      throwTransferHandler
    ]
  ]);
  function expose(obj, ep = self) {
    ep.addEventListener("message", function callback(ev) {
      if (!ev || !ev.data) {
        return;
      }
      const { id, type, path } = Object.assign({
        path: []
      }, ev.data);
      const argumentList = (ev.data.argumentList || []).map(fromWireValue);
      let returnValue;
      try {
        const parent = path.slice(0, -1).reduce((obj2, prop) => obj2[prop], obj);
        const rawValue = path.reduce((obj2, prop) => obj2[prop], obj);
        switch (type) {
          case 0:
            {
              returnValue = rawValue;
            }
            break;
          case 1:
            {
              parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
              returnValue = true;
            }
            break;
          case 2:
            {
              returnValue = rawValue.apply(parent, argumentList);
            }
            break;
          case 3:
            {
              const value = new rawValue(...argumentList);
              returnValue = proxy(value);
            }
            break;
          case 4:
            {
              const { port1, port2 } = new MessageChannel();
              expose(obj, port2);
              returnValue = transfer(port1, [
                port1
              ]);
            }
            break;
          case 5:
            {
              returnValue = void 0;
            }
            break;
        }
      } catch (value) {
        returnValue = {
          value,
          [throwMarker]: 0
        };
      }
      Promise.resolve(returnValue).catch((value) => {
        return {
          value,
          [throwMarker]: 0
        };
      }).then((returnValue2) => {
        const [wireValue, transferables] = toWireValue(returnValue2);
        ep.postMessage(Object.assign(Object.assign({}, wireValue), {
          id
        }), transferables);
        if (type === 5) {
          ep.removeEventListener("message", callback);
          closeEndPoint(ep);
        }
      });
    });
    if (ep.start) {
      ep.start();
    }
  }
  function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
  }
  function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint)) endpoint.close();
  }
  function wrap(ep, target) {
    return createProxy(ep, [], target);
  }
  function throwIfProxyReleased(isReleased) {
    if (isReleased) {
      throw new Error("Proxy has been released and is not useable");
    }
  }
  function createProxy(ep, path = [], target = function() {
  }) {
    let isProxyReleased = false;
    const proxy2 = new Proxy(target, {
      get(_target, prop) {
        throwIfProxyReleased(isProxyReleased);
        if (prop === releaseProxy) {
          return () => {
            return requestResponseMessage(ep, {
              type: 5,
              path: path.map((p) => p.toString())
            }).then(() => {
              closeEndPoint(ep);
              isProxyReleased = true;
            });
          };
        }
        if (prop === "then") {
          if (path.length === 0) {
            return {
              then: () => proxy2
            };
          }
          const r = requestResponseMessage(ep, {
            type: 0,
            path: path.map((p) => p.toString())
          }).then(fromWireValue);
          return r.then.bind(r);
        }
        return createProxy(ep, [
          ...path,
          prop
        ]);
      },
      set(_target, prop, rawValue) {
        throwIfProxyReleased(isProxyReleased);
        const [value, transferables] = toWireValue(rawValue);
        return requestResponseMessage(ep, {
          type: 1,
          path: [
            ...path,
            prop
          ].map((p) => p.toString()),
          value
        }, transferables).then(fromWireValue);
      },
      apply(_target, _thisArg, rawArgumentList) {
        throwIfProxyReleased(isProxyReleased);
        const last = path[path.length - 1];
        if (last === createEndpoint) {
          return requestResponseMessage(ep, {
            type: 4
          }).then(fromWireValue);
        }
        if (last === "bind") {
          return createProxy(ep, path.slice(0, -1));
        }
        const [argumentList, transferables] = processArguments(rawArgumentList);
        return requestResponseMessage(ep, {
          type: 2,
          path: path.map((p) => p.toString()),
          argumentList
        }, transferables).then(fromWireValue);
      },
      construct(_target, rawArgumentList) {
        throwIfProxyReleased(isProxyReleased);
        const [argumentList, transferables] = processArguments(rawArgumentList);
        return requestResponseMessage(ep, {
          type: 3,
          path: path.map((p) => p.toString()),
          argumentList
        }, transferables).then(fromWireValue);
      }
    });
    return proxy2;
  }
  function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
  }
  function processArguments(argumentList) {
    const processed = argumentList.map(toWireValue);
    return [
      processed.map((v) => v[0]),
      myFlat(processed.map((v) => v[1]))
    ];
  }
  var transferCache = /* @__PURE__ */ new WeakMap();
  function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
  }
  function proxy(obj) {
    return Object.assign(obj, {
      [proxyMarker]: true
    });
  }
  function windowEndpoint(w, context = self, targetOrigin = "*") {
    return {
      postMessage: (msg, transferables) => w.postMessage(msg, targetOrigin, transferables),
      addEventListener: context.addEventListener.bind(context),
      removeEventListener: context.removeEventListener.bind(context)
    };
  }
  function toWireValue(value) {
    for (const [name, handler] of transferHandlers) {
      if (handler.canHandle(value)) {
        const [serializedValue, transferables] = handler.serialize(value);
        return [
          {
            type: 3,
            name,
            value: serializedValue
          },
          transferables
        ];
      }
    }
    return [
      {
        type: 0,
        value
      },
      transferCache.get(value) || []
    ];
  }
  function fromWireValue(value) {
    switch (value.type) {
      case 3:
        return transferHandlers.get(value.name).deserialize(value.value);
      case 0:
        return value.value;
    }
  }
  function requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve) => {
      const id = generateUUID();
      ep.addEventListener("message", function l(ev) {
        if (!ev.data || !ev.data.id || ev.data.id !== id) {
          return;
        }
        ep.removeEventListener("message", l);
        resolve(ev.data);
      });
      if (ep.start) {
        ep.start();
      }
      ep.postMessage(Object.assign({
        id
      }, msg), transfers);
    });
  }
  function generateUUID() {
    return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
  }
  const PREVIEW_MESSAGE_TYPES = [
    PreviewMessageType.ConsoleError,
    PreviewMessageType.UncaughtException,
    PreviewMessageType.UnhandledRejection
  ];
  function isPreviewMessage(data) {
    if (data == null || typeof data !== "object") {
      return false;
    }
    if (!("type" in data) || !PREVIEW_MESSAGE_TYPES.includes(data.type)) {
      return false;
    }
    return true;
  }
  function nullPrototype(source) {
    const prototype = /* @__PURE__ */ Object.create(null);
    if (!source) {
      return prototype;
    }
    return Object.assign(prototype, source);
  }
  function toInternalFileSystemTree(tree) {
    const newTree = {
      d: {}
    };
    for (const name of Object.keys(tree)) {
      const entry = tree[name];
      if ("file" in entry) {
        if ("symlink" in entry.file) {
          newTree.d[name] = {
            f: {
              l: entry.file.symlink
            }
          };
          continue;
        }
        const contents = entry.file.contents;
        const stringContents = typeof contents === "string" ? contents : binaryString(contents);
        const binary = typeof contents === "string" ? {} : {
          b: true
        };
        newTree.d[name] = {
          f: {
            c: stringContents,
            ...binary
          }
        };
        continue;
      }
      const newEntry = toInternalFileSystemTree(entry.directory);
      newTree.d[name] = newEntry;
    }
    return newTree;
  }
  function toExternalFileSystemTree(tree) {
    const newTree = nullPrototype();
    if ("f" in tree) {
      throw new Error("It is not possible to export a single file in the JSON format.");
    }
    if ("d" in tree) {
      for (const name of Object.keys(tree.d)) {
        const entry = tree.d[name];
        if ("d" in entry) {
          newTree[name] = nullPrototype({
            directory: toExternalFileSystemTree(entry)
          });
        } else if ("f" in entry) {
          if ("c" in entry.f) {
            newTree[name] = nullPrototype({
              file: nullPrototype({
                contents: entry.f.c
              })
            });
          } else if ("l" in entry.f) {
            newTree[name] = nullPrototype({
              file: nullPrototype({
                symlink: entry.f.l
              })
            });
          }
        }
      }
    }
    return newTree;
  }
  function binaryString(bytes) {
    let result = "";
    for (const byte of bytes) {
      result += String.fromCharCode(byte);
    }
    return result;
  }
  let bootPromise = null;
  let cachedServerPromise = null;
  let cachedBootOptions = {};
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const _WebContainer = class _WebContainer {
    constructor(_instance, fs, _runtimeInfo) {
      __publicField(this, "_instance");
      __publicField(this, "_runtimeInfo");
      __publicField(this, "fs");
      __publicField(this, "internal");
      __publicField(this, "_tornDown", false);
      __publicField(this, "_unsubscribeFromTokenChangedListener", () => {
      });
      this._instance = _instance;
      this._runtimeInfo = _runtimeInfo;
      this.fs = new FileSystemAPIClient(fs);
      this.internal = new WebContainerInternal(_instance);
    }
    async spawn(command, optionsOrArgs, options) {
      let args = [];
      if (Array.isArray(optionsOrArgs)) {
        args = optionsOrArgs;
      } else {
        options = optionsOrArgs;
      }
      let output = void 0;
      let outputStream = new ReadableStream();
      if ((options == null ? void 0 : options.output) !== false) {
        const result = streamWithPush();
        output = result.push;
        outputStream = result.stream;
      }
      let stdout = void 0;
      let stdoutStream;
      let stderr = void 0;
      let stderrStream;
      stdoutStream = new ReadableStream();
      stderrStream = new ReadableStream();
      if (options == null ? void 0 : options.stdout) {
        const result = streamWithPush();
        stdout = result.push;
        stdoutStream = result.stream;
      }
      if (options == null ? void 0 : options.stderr) {
        const result = streamWithPush();
        stderr = result.push;
        stderrStream = result.stream;
      }
      const wrappedOutput = proxyListener(binaryListener(output));
      const wrappedStdout = proxyListener(binaryListener(stdout));
      const wrappedStderr = proxyListener(binaryListener(stderr));
      const process = await this._instance.run({
        command,
        args,
        cwd: options == null ? void 0 : options.cwd,
        env: options == null ? void 0 : options.env,
        terminal: options == null ? void 0 : options.terminal
      }, wrappedStdout, wrappedStderr, wrappedOutput);
      return new WebContainerProcessImpl(process, outputStream, stdoutStream, stderrStream);
    }
    async export(path, options) {
      const serializeOptions = {
        format: (options == null ? void 0 : options.format) ?? "json",
        includes: options == null ? void 0 : options.includes,
        excludes: options == null ? void 0 : options.excludes,
        external: true
      };
      const result = await this._instance.serialize(path, serializeOptions);
      if (serializeOptions.format === "json") {
        const data = JSON.parse(decoder.decode(result));
        return toExternalFileSystemTree(data);
      }
      return result;
    }
    on(event, listener) {
      if (event === "preview-message") {
        const originalListener = listener;
        listener = (message) => {
          if (isPreviewMessage(message)) {
            originalListener(message);
          }
        };
      }
      const { listener: wrapped, subscribe } = syncSubscription(listener);
      return subscribe(this._instance.on(event, comlink_exports.proxy(wrapped)));
    }
    mount(snapshotOrTree, options) {
      const payload = snapshotOrTree instanceof Uint8Array ? snapshotOrTree : snapshotOrTree instanceof ArrayBuffer ? new Uint8Array(snapshotOrTree) : encoder.encode(JSON.stringify(toInternalFileSystemTree(snapshotOrTree)));
      return this._instance.loadFiles(comlink_exports.transfer(payload, [
        payload.buffer
      ]), {
        mountPoints: options == null ? void 0 : options.mountPoint
      });
    }
    setPreviewScript(scriptSrc, options) {
      return this._instance.setPreviewScript(scriptSrc, options);
    }
    get path() {
      return this._runtimeInfo.path;
    }
    get workdir() {
      return this._runtimeInfo.cwd;
    }
    teardown() {
      if (this._tornDown) {
        throw new Error("WebContainer already torn down");
      }
      this._tornDown = true;
      this._unsubscribeFromTokenChangedListener();
      this.fs._teardown();
      this._instance.teardown();
      this._instance[comlink_exports.releaseProxy]();
      if (_WebContainer._instance === this) {
        _WebContainer._instance = null;
      }
    }
    static async boot(options = {}) {
      const { workdirName } = options;
      if (window.crossOriginIsolated && options.coep === "none") {
        console.warn(`A Cross-Origin-Embedder-Policy header is required in cross origin isolated environments.
Set the 'coep' option to 'require-corp'.`);
      }
      if ((workdirName == null ? void 0 : workdirName.includes("/")) || workdirName === ".." || workdirName === ".") {
        throw new Error("workdirName should be a valid folder name");
      }
      while (bootPromise) {
        await bootPromise;
      }
      if (_WebContainer._instance) {
        throw new Error("Only a single WebContainer instance can be booted");
      }
      const instancePromise = unsynchronizedBoot(options);
      bootPromise = instancePromise.catch(() => {
      });
      try {
        const instance = await instancePromise;
        _WebContainer._instance = instance;
        return instance;
      } finally {
        bootPromise = null;
      }
    }
  };
  __publicField(_WebContainer, "_instance", null);
  let WebContainer = _WebContainer;
  class WebContainerInternal {
    constructor(_instance) {
      __publicField(this, "_instance");
      this._instance = _instance;
    }
    watchPaths(options, cb) {
      const { listener, subscribe } = syncSubscription(cb);
      return subscribe(this._instance.watchPaths(options, comlink_exports.proxy(listener)));
    }
    getProcesses() {
      return this._instance.getProcesses();
    }
    onProcessesRemove(cb) {
      const { listener, subscribe } = syncSubscription(cb);
      return subscribe(this._instance.onProcessesRemove(comlink_exports.proxy(listener)));
    }
    serialize(path, options) {
      return this._instance.serialize(path, options);
    }
  }
  const DIR_ENTRY_TYPE_FILE = 1;
  const DIR_ENTRY_TYPE_DIR = 2;
  class DirEntImpl {
    constructor(name, _type) {
      __publicField(this, "name");
      __publicField(this, "_type");
      this.name = name;
      this._type = _type;
    }
    isFile() {
      return this._type === DIR_ENTRY_TYPE_FILE;
    }
    isDirectory() {
      return this._type === DIR_ENTRY_TYPE_DIR;
    }
  }
  class FSWatcher {
    constructor(_apiClient, _path, _options, _listener) {
      __publicField(this, "_apiClient");
      __publicField(this, "_path");
      __publicField(this, "_options");
      __publicField(this, "_listener");
      __publicField(this, "_wrappedListener");
      __publicField(this, "_watcher");
      __publicField(this, "_closed", false);
      this._apiClient = _apiClient;
      this._path = _path;
      this._options = _options;
      this._listener = _listener;
      this._apiClient._watchers.add(this);
      this._wrappedListener = (event, filename) => {
        if (this._listener && !this._closed) {
          this._listener(event, filename);
        }
      };
      this._apiClient._fs.watch(this._path, this._options, proxyListener(this._wrappedListener)).then((_watcher) => {
        this._watcher = _watcher;
        if (this._closed) {
          this._teardown();
        }
      }).catch(console.error);
    }
    close() {
      if (!this._closed) {
        this._closed = true;
        this._apiClient._watchers.delete(this);
        this._teardown();
      }
    }
    _teardown() {
      var _a;
      (_a = this._watcher) == null ? void 0 : _a.close().finally(() => {
        var _a2;
        (_a2 = this._watcher) == null ? void 0 : _a2[comlink_exports.releaseProxy]();
      });
    }
  }
  class WebContainerProcessImpl {
    constructor(process, output, stdout, stderr) {
      __publicField(this, "output");
      __publicField(this, "input");
      __publicField(this, "exit");
      __publicField(this, "_process");
      __publicField(this, "stdout");
      __publicField(this, "stderr");
      this.output = output;
      this._process = process;
      this.input = new WritableStream({
        write: (data) => {
          var _a;
          (_a = this._getProcess()) == null ? void 0 : _a.write(data).catch(() => {
          });
        }
      });
      this.exit = this._onExit();
      this.stdout = stdout;
      this.stderr = stderr;
    }
    kill() {
      var _a;
      (_a = this._getProcess()) == null ? void 0 : _a.kill();
    }
    resize(dimensions) {
      var _a;
      (_a = this._getProcess()) == null ? void 0 : _a.resize(dimensions);
    }
    async _onExit() {
      var _a;
      try {
        return await this._process.onExit;
      } finally {
        (_a = this._process) == null ? void 0 : _a[comlink_exports.releaseProxy]();
        this._process = null;
      }
    }
    _getProcess() {
      if (this._process == null) {
        console.warn("This process already exited");
      }
      return this._process;
    }
  }
  class FileSystemAPIClient {
    constructor(fs) {
      __publicField(this, "_fs");
      __publicField(this, "_watchers", /* @__PURE__ */ new Set([]));
      this._fs = fs;
    }
    rm(...args) {
      return this._fs.rm(...args);
    }
    async readFile(path, encoding) {
      return await this._fs.readFile(path, encoding);
    }
    async rename(oldPath, newPath) {
      return await this._fs.rename(oldPath, newPath);
    }
    async writeFile(path, data, options) {
      if (data instanceof Uint8Array) {
        const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        data = comlink_exports.transfer(new Uint8Array(buffer), [
          buffer
        ]);
      }
      await this._fs.writeFile(path, data, options);
    }
    async readdir(path, options) {
      const result = await this._fs.readdir(path, options);
      if (isStringArray(result)) {
        return result;
      }
      if (isTypedArrayCollection(result)) {
        return result;
      }
      const entries = result.map((entry) => new DirEntImpl(entry.name, entry["Symbol(type)"]));
      return entries;
    }
    async mkdir(path, options) {
      return await this._fs.mkdir(path, options);
    }
    watch(path, options, listener) {
      if (typeof options === "function") {
        listener = options;
        options = null;
      }
      return new FSWatcher(this, path, options, listener);
    }
    _teardown() {
      this._fs[comlink_exports.releaseProxy]();
      for (const watcherWrapper of this._watchers) {
        watcherWrapper.close();
      }
    }
  }
  async function unsynchronizedBoot(options) {
    const { serverPromise } = serverFactory(options);
    const server = await serverPromise;
    const instance = await server.build({
      host: window.location.host,
      version: "1.5.1-internal.1",
      workdirName: options.workdirName,
      forwardPreviewErrors: options.forwardPreviewErrors
    });
    const fs = await instance.fs();
    const runtimeInfo = await instance.runtimeInfo();
    return new WebContainer(instance, fs, runtimeInfo);
  }
  function binaryListener(listener) {
    if (listener == null) {
      return void 0;
    }
    return (data) => {
      if (data instanceof Uint8Array) {
        listener(decoder.decode(data));
      } else if (data == null) {
        listener(null);
      }
    };
  }
  function proxyListener(listener) {
    if (listener == null) {
      return void 0;
    }
    return comlink_exports.proxy(listener);
  }
  function serverFactory(options) {
    if (cachedServerPromise != null) {
      if (options.coep !== cachedBootOptions.coep) {
        console.warn(`Attempting to boot WebContainer with 'coep: ${options.coep}'`);
        console.warn(`First boot had 'coep: ${cachedBootOptions.coep}', new settings will not take effect!`);
      }
      return {
        serverPromise: cachedServerPromise
      };
    }
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.setAttribute("allow", "cross-origin-isolated");
    const url = iframeSettings.url;
    if (options.coep) {
      url.searchParams.set("coep", options.coep);
    }
    iframe.src = url.toString();
    const { origin } = url;
    cachedBootOptions = {
      ...options
    };
    cachedServerPromise = new Promise((resolve) => {
      const onMessage = (event) => {
        if (event.origin !== origin) {
          return;
        }
        const { data } = event;
        if (data.type === "init") {
          resolve(comlink_exports.wrap(event.ports[0]));
          return;
        }
        if (data.type === "warning") {
          console[data.level].call(console, data.message);
          return;
        }
      };
      window.addEventListener("message", onMessage);
    });
    document.body.insertBefore(iframe, null);
    return {
      serverPromise: cachedServerPromise
    };
  }
  function isStringArray(list) {
    return typeof list[0] === "string";
  }
  function isTypedArrayCollection(list) {
    return list[0] instanceof Uint8Array;
  }
  function streamWithPush() {
    let controller = null;
    const stream = new ReadableStream({
      start(controller_) {
        controller = controller_;
      }
    });
    const push = (item) => {
      if (item != null) {
        controller == null ? void 0 : controller.enqueue(item);
      } else {
        controller == null ? void 0 : controller.close();
        controller = null;
      }
    };
    return {
      stream,
      push
    };
  }
  function syncSubscription(listener) {
    let stopped = false;
    let unsubscribe = () => {
    };
    const wrapped = (...args) => {
      if (stopped) {
        return;
      }
      listener(...args);
    };
    return {
      subscribe(promise) {
        promise.then((unsubscribe_) => {
          unsubscribe = unsubscribe_;
          if (stopped) {
            unsubscribe();
          }
        });
        return () => {
          stopped = true;
          unsubscribe();
        };
      },
      listener: wrapped
    };
  }
  const getWebContainerStateActions = (set, get) => {
    return {
      init: async (onWebContainerTeardown) => {
        try {
          let currentWebcontainerInstance = get().webcontainerInstance;
          if (currentWebcontainerInstance) {
            const currentOnWebContainerTeardown = get().onWebContainerTeardown;
            currentWebcontainerInstance.teardown();
            currentOnWebContainerTeardown == null ? void 0 : currentOnWebContainerTeardown();
            currentWebcontainerInstance = void 0;
            await new Promise((resolve) => setTimeout(resolve, 250));
          }
          const webcontainerInstance = await WebContainer.boot({
            coep: "credentialless"
          });
          set({
            webcontainerInstance,
            onWebContainerTeardown
          });
          return webcontainerInstance;
        } catch (error) {
          logWarn("Failed init:", error);
        } finally {
          set({
            ready: true
          });
        }
      },
      teardown: async () => {
        const webcontainerInstance = get().webcontainerInstance;
        if (webcontainerInstance) {
          webcontainerInstance.teardown();
        }
        set({
          webcontainerInstance: void 0
        });
      },
      mounts: async (files) => {
        try {
          const webcontainerInstance = get().webcontainerInstance;
          if (!webcontainerInstance) {
            throw new Error("WebContainer instance is not ready");
          }
          await webcontainerInstance.mount(files);
        } catch (error) {
          logWarn("Failed startContainer:", error);
        }
      }
    };
  };
  const defaultWebContainerState = {};
  useWebContainerState = create()(devtools((set, get) => ({
    ...defaultWebContainerState,
    ...getWebContainerStateActions(set, get)
  })));
});
export {
  __tla,
  useWebContainerState as u
};
