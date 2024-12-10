import { al as getDefaultExportFromCjs, __tla as __tla_0 } from "./index-Bs2EL0Mm.js";
let EXIT, SKIP, VFileMessage, remarkGfm, boolbase, convert, decodeNamedCharacterReference, esm, asciiAlphanumeric, VFile, unreachable, nthCheck, ok, remarkParse, unified, visit;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  convert = function(test) {
    if (test === null || test === void 0) {
      return ok$1;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  };
  function anyFactory(tests) {
    const checks = [];
    let index2 = -1;
    while (++index2 < tests.length) {
      checks[index2] = convert(tests[index2]);
    }
    return castFactory(any);
    function any(...parameters) {
      let index3 = -1;
      while (++index3 < checks.length) {
        if (checks[index3].apply(this, parameters)) return true;
      }
      return false;
    }
  }
  function propsFactory(check) {
    const checkAsRecord = check;
    return castFactory(all2);
    function all2(node2) {
      const nodeAsRecord = node2;
      let key;
      for (key in check) {
        if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
      }
      return true;
    }
  }
  function typeFactory(check) {
    return castFactory(type);
    function type(node2) {
      return node2 && node2.type === check;
    }
  }
  function castFactory(testFunction) {
    return check;
    function check(value, index2, parent) {
      return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index2 === "number" ? index2 : void 0, parent || void 0));
    }
  }
  function ok$1() {
    return true;
  }
  function looksLikeANode(value) {
    return value !== null && typeof value === "object" && "type" in value;
  }
  function color(d) {
    return d;
  }
  const empty = [];
  const CONTINUE = true;
  EXIT = false;
  SKIP = "skip";
  function visitParents(tree, test, visitor, reverse) {
    let check;
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
    } else {
      check = test;
    }
    const is = convert(check);
    const step = reverse ? -1 : 1;
    factory(tree, void 0, [])();
    function factory(node2, index2, parents) {
      const value = node2 && typeof node2 === "object" ? node2 : {};
      if (typeof value.type === "string") {
        const name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
        Object.defineProperty(visit2, "name", {
          value: "node (" + color(node2.type + (name ? "<" + name + ">" : "")) + ")"
        });
      }
      return visit2;
      function visit2() {
        let result = empty;
        let subresult;
        let offset;
        let grandparents;
        if (!test || is(node2, index2, parents[parents.length - 1] || void 0)) {
          result = toResult(visitor(node2, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if ("children" in node2 && node2.children) {
          const nodeAsParent = node2;
          if (nodeAsParent.children && result[0] !== SKIP) {
            offset = (reverse ? nodeAsParent.children.length : -1) + step;
            grandparents = parents.concat(nodeAsParent);
            while (offset > -1 && offset < nodeAsParent.children.length) {
              const child = nodeAsParent.children[offset];
              subresult = factory(child, offset, grandparents)();
              if (subresult[0] === EXIT) {
                return subresult;
              }
              offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
            }
          }
        }
        return result;
      }
    }
  }
  function toResult(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "number") {
      return [
        CONTINUE,
        value
      ];
    }
    return value === null || value === void 0 ? empty : [
      value
    ];
  }
  visit = function(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
    let reverse;
    let test;
    let visitor;
    if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
      test = void 0;
      visitor = testOrVisitor;
      reverse = visitorOrReverse;
    } else {
      test = testOrVisitor;
      visitor = visitorOrReverse;
      reverse = maybeReverse;
    }
    visitParents(tree, test, overload, reverse);
    function overload(node2, parents) {
      const parent = parents[parents.length - 1];
      const index2 = parent ? parent.children.indexOf(node2) : void 0;
      return visitor(node2, index2, parent);
    }
  };
  const element = document.createElement("i");
  decodeNamedCharacterReference = function(value) {
    const characterReference2 = "&" + value + ";";
    element.innerHTML = characterReference2;
    const char = element.textContent;
    if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") {
      return false;
    }
    return char === characterReference2 ? false : char;
  };
  ok = function() {
  };
  unreachable = function() {
  };
  const whitespace = /* @__PURE__ */ new Set([
    9,
    10,
    12,
    13,
    32
  ]);
  const ZERO = "0".charCodeAt(0);
  const NINE = "9".charCodeAt(0);
  function parse$1(formula) {
    formula = formula.trim().toLowerCase();
    if (formula === "even") {
      return [
        2,
        0
      ];
    } else if (formula === "odd") {
      return [
        2,
        1
      ];
    }
    let idx = 0;
    let a = 0;
    let sign = readSign();
    let number = readNumber();
    if (idx < formula.length && formula.charAt(idx) === "n") {
      idx++;
      a = sign * (number !== null && number !== void 0 ? number : 1);
      skipWhitespace();
      if (idx < formula.length) {
        sign = readSign();
        skipWhitespace();
        number = readNumber();
      } else {
        sign = number = 0;
      }
    }
    if (number === null || idx < formula.length) {
      throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
    }
    return [
      a,
      sign * number
    ];
    function readSign() {
      if (formula.charAt(idx) === "-") {
        idx++;
        return -1;
      }
      if (formula.charAt(idx) === "+") {
        idx++;
      }
      return 1;
    }
    function readNumber() {
      const start = idx;
      let value = 0;
      while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
        value = value * 10 + (formula.charCodeAt(idx) - ZERO);
        idx++;
      }
      return idx === start ? null : value;
    }
    function skipWhitespace() {
      while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
        idx++;
      }
    }
  }
  boolbase = {
    trueFunc: function trueFunc() {
      return true;
    },
    falseFunc: function falseFunc() {
      return false;
    }
  };
  const boolbase$1 = getDefaultExportFromCjs(boolbase);
  function compile(parsed) {
    const a = parsed[0];
    const b = parsed[1] - 1;
    if (b < 0 && a <= 0) return boolbase$1.falseFunc;
    if (a === -1) return (index2) => index2 <= b;
    if (a === 0) return (index2) => index2 === b;
    if (a === 1) return b < 0 ? boolbase$1.trueFunc : (index2) => index2 >= b;
    const absA = Math.abs(a);
    const bMod = (b % absA + absA) % absA;
    return a > 1 ? (index2) => index2 >= b && index2 % absA === bMod : (index2) => index2 <= b && index2 % absA === bMod;
  }
  function generate(parsed) {
    const a = parsed[0];
    let b = parsed[1] - 1;
    let n = 0;
    if (a < 0) {
      const aPos = -a;
      const minValue = (b % aPos + aPos) % aPos;
      return () => {
        const val = minValue + aPos * n++;
        return val > b ? null : val;
      };
    }
    if (a === 0) return b < 0 ? () => null : () => n++ === 0 ? b : null;
    if (b < 0) {
      b += a * Math.ceil(-b / a);
    }
    return () => a * n++ + b;
  }
  nthCheck = function(formula) {
    return compile(parse$1(formula));
  };
  function sequence(formula) {
    return generate(parse$1(formula));
  }
  esm = Object.freeze(Object.defineProperty({
    __proto__: null,
    compile,
    default: nthCheck,
    generate,
    parse: parse$1,
    sequence
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  function stringifyPosition(value) {
    if (!value || typeof value !== "object") {
      return "";
    }
    if ("position" in value || "type" in value) {
      return position(value.position);
    }
    if ("start" in value || "end" in value) {
      return position(value);
    }
    if ("line" in value || "column" in value) {
      return point$1(value);
    }
    return "";
  }
  function point$1(point2) {
    return index(point2 && point2.line) + ":" + index(point2 && point2.column);
  }
  function position(pos) {
    return point$1(pos && pos.start) + "-" + point$1(pos && pos.end);
  }
  function index(value) {
    return value && typeof value === "number" ? value : 1;
  }
  VFileMessage = class extends Error {
    constructor(causeOrReason, optionsOrParentOrPlace, origin) {
      super();
      if (typeof optionsOrParentOrPlace === "string") {
        origin = optionsOrParentOrPlace;
        optionsOrParentOrPlace = void 0;
      }
      let reason = "";
      let options = {};
      let legacyCause = false;
      if (optionsOrParentOrPlace) {
        if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) {
          options = {
            place: optionsOrParentOrPlace
          };
        } else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) {
          options = {
            place: optionsOrParentOrPlace
          };
        } else if ("type" in optionsOrParentOrPlace) {
          options = {
            ancestors: [
              optionsOrParentOrPlace
            ],
            place: optionsOrParentOrPlace.position
          };
        } else {
          options = {
            ...optionsOrParentOrPlace
          };
        }
      }
      if (typeof causeOrReason === "string") {
        reason = causeOrReason;
      } else if (!options.cause && causeOrReason) {
        legacyCause = true;
        reason = causeOrReason.message;
        options.cause = causeOrReason;
      }
      if (!options.ruleId && !options.source && typeof origin === "string") {
        const index2 = origin.indexOf(":");
        if (index2 === -1) {
          options.ruleId = origin;
        } else {
          options.source = origin.slice(0, index2);
          options.ruleId = origin.slice(index2 + 1);
        }
      }
      if (!options.place && options.ancestors && options.ancestors) {
        const parent = options.ancestors[options.ancestors.length - 1];
        if (parent) {
          options.place = parent.position;
        }
      }
      const start = options.place && "start" in options.place ? options.place.start : options.place;
      this.ancestors = options.ancestors || void 0;
      this.cause = options.cause || void 0;
      this.column = start ? start.column : void 0;
      this.fatal = void 0;
      this.file;
      this.message = reason;
      this.line = start ? start.line : void 0;
      this.name = stringifyPosition(options.place) || "1:1";
      this.place = options.place || void 0;
      this.reason = this.message;
      this.ruleId = options.ruleId || void 0;
      this.source = options.source || void 0;
      this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
      this.actual;
      this.expected;
      this.note;
      this.url;
    }
  };
  VFileMessage.prototype.file = "";
  VFileMessage.prototype.name = "";
  VFileMessage.prototype.reason = "";
  VFileMessage.prototype.message = "";
  VFileMessage.prototype.stack = "";
  VFileMessage.prototype.column = void 0;
  VFileMessage.prototype.line = void 0;
  VFileMessage.prototype.ancestors = void 0;
  VFileMessage.prototype.cause = void 0;
  VFileMessage.prototype.fatal = void 0;
  VFileMessage.prototype.place = void 0;
  VFileMessage.prototype.ruleId = void 0;
  VFileMessage.prototype.source = void 0;
  const emptyOptions$1 = {};
  function toString(value, options) {
    const settings = emptyOptions$1;
    const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
    const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;
    return one(value, includeImageAlt, includeHtml);
  }
  function one(value, includeImageAlt, includeHtml) {
    if (node(value)) {
      if ("value" in value) {
        return value.type === "html" && !includeHtml ? "" : value.value;
      }
      if (includeImageAlt && "alt" in value && value.alt) {
        return value.alt;
      }
      if ("children" in value) {
        return all(value.children, includeImageAlt, includeHtml);
      }
    }
    if (Array.isArray(value)) {
      return all(value, includeImageAlt, includeHtml);
    }
    return "";
  }
  function all(values, includeImageAlt, includeHtml) {
    const result = [];
    let index2 = -1;
    while (++index2 < values.length) {
      result[index2] = one(values[index2], includeImageAlt, includeHtml);
    }
    return result.join("");
  }
  function node(value) {
    return Boolean(value && typeof value === "object");
  }
  function splice(list2, start, remove, items) {
    const end = list2.length;
    let chunkStart = 0;
    let parameters;
    if (start < 0) {
      start = -start > end ? 0 : end + start;
    } else {
      start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;
    if (items.length < 1e4) {
      parameters = Array.from(items);
      parameters.unshift(start, remove);
      list2.splice(...parameters);
    } else {
      if (remove) list2.splice(start, remove);
      while (chunkStart < items.length) {
        parameters = items.slice(chunkStart, chunkStart + 1e4);
        parameters.unshift(start, 0);
        list2.splice(...parameters);
        chunkStart += 1e4;
        start += 1e4;
      }
    }
  }
  function push(list2, items) {
    if (list2.length > 0) {
      splice(list2, list2.length, 0, items);
      return list2;
    }
    return items;
  }
  const hasOwnProperty = {}.hasOwnProperty;
  function combineExtensions(extensions) {
    const all2 = {};
    let index2 = -1;
    while (++index2 < extensions.length) {
      syntaxExtension(all2, extensions[index2]);
    }
    return all2;
  }
  function syntaxExtension(all2, extension2) {
    let hook;
    for (hook in extension2) {
      const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
      const left = maybe || (all2[hook] = {});
      const right = extension2[hook];
      let code2;
      if (right) {
        for (code2 in right) {
          if (!hasOwnProperty.call(left, code2)) left[code2] = [];
          const value = right[code2];
          constructs(left[code2], Array.isArray(value) ? value : value ? [
            value
          ] : []);
        }
      }
    }
  }
  function constructs(existing, list2) {
    let index2 = -1;
    const before = [];
    while (++index2 < list2.length) {
      (list2[index2].add === "after" ? existing : before).push(list2[index2]);
    }
    splice(existing, 0, 0, before);
  }
  function decodeNumericCharacterReference(value, base) {
    const code2 = Number.parseInt(value, base);
    if (code2 < 9 || code2 === 11 || code2 > 13 && code2 < 32 || code2 > 126 && code2 < 160 || code2 > 55295 && code2 < 57344 || code2 > 64975 && code2 < 65008 || (code2 & 65535) === 65535 || (code2 & 65535) === 65534 || code2 > 1114111) {
      return "\uFFFD";
    }
    return String.fromCodePoint(code2);
  }
  function normalizeIdentifier(value) {
    return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  const asciiAlpha = regexCheck(/[A-Za-z]/);
  asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
  const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
  function asciiControl(code2) {
    return code2 !== null && (code2 < 32 || code2 === 127);
  }
  const asciiDigit = regexCheck(/\d/);
  const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
  const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
  function markdownLineEnding(code2) {
    return code2 !== null && code2 < -2;
  }
  function markdownLineEndingOrSpace(code2) {
    return code2 !== null && (code2 < 0 || code2 === 32);
  }
  function markdownSpace(code2) {
    return code2 === -2 || code2 === -1 || code2 === 32;
  }
  const unicodePunctuation = regexCheck(new RegExp("\\p{P}|\\p{S}", "u"));
  const unicodeWhitespace = regexCheck(/\s/);
  function regexCheck(regex) {
    return check;
    function check(code2) {
      return code2 !== null && code2 > -1 && regex.test(String.fromCharCode(code2));
    }
  }
  function factorySpace(effects, ok2, type, max) {
    const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
    let size = 0;
    return start;
    function start(code2) {
      if (markdownSpace(code2)) {
        effects.enter(type);
        return prefix(code2);
      }
      return ok2(code2);
    }
    function prefix(code2) {
      if (markdownSpace(code2) && size++ < limit) {
        effects.consume(code2);
        return prefix;
      }
      effects.exit(type);
      return ok2(code2);
    }
  }
  const content$1 = {
    tokenize: initializeContent
  };
  function initializeContent(effects) {
    const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    let previous2;
    return contentStart;
    function afterContentStartConstruct(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, contentStart, "linePrefix");
    }
    function paragraphInitial(code2) {
      effects.enter("paragraph");
      return lineStart(code2);
    }
    function lineStart(code2) {
      const token = effects.enter("chunkText", {
        contentType: "text",
        previous: previous2
      });
      if (previous2) {
        previous2.next = token;
      }
      previous2 = token;
      return data(code2);
    }
    function data(code2) {
      if (code2 === null) {
        effects.exit("chunkText");
        effects.exit("paragraph");
        effects.consume(code2);
        return;
      }
      if (markdownLineEnding(code2)) {
        effects.consume(code2);
        effects.exit("chunkText");
        return lineStart;
      }
      effects.consume(code2);
      return data;
    }
  }
  const document$2 = {
    tokenize: initializeDocument
  };
  const containerConstruct = {
    tokenize: tokenizeContainer
  };
  function initializeDocument(effects) {
    const self = this;
    const stack = [];
    let continued = 0;
    let childFlow;
    let childToken;
    let lineStartOffset;
    return start;
    function start(code2) {
      if (continued < stack.length) {
        const item = stack[continued];
        self.containerState = item[1];
        return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code2);
      }
      return checkNewContainers(code2);
    }
    function documentContinue(code2) {
      continued++;
      if (self.containerState._closeFlow) {
        self.containerState._closeFlow = void 0;
        if (childFlow) {
          closeFlow();
        }
        const indexBeforeExits = self.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let point2;
        while (indexBeforeFlow--) {
          if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
            point2 = self.events[indexBeforeFlow][1].end;
            break;
          }
        }
        exitContainers(continued);
        let index2 = indexBeforeExits;
        while (index2 < self.events.length) {
          self.events[index2][1].end = Object.assign({}, point2);
          index2++;
        }
        splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
        self.events.length = index2;
        return checkNewContainers(code2);
      }
      return start(code2);
    }
    function checkNewContainers(code2) {
      if (continued === stack.length) {
        if (!childFlow) {
          return documentContinued(code2);
        }
        if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
          return flowStart(code2);
        }
        self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
      }
      self.containerState = {};
      return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code2);
    }
    function thereIsANewContainer(code2) {
      if (childFlow) closeFlow();
      exitContainers(continued);
      return documentContinued(code2);
    }
    function thereIsNoNewContainer(code2) {
      self.parser.lazy[self.now().line] = continued !== stack.length;
      lineStartOffset = self.now().offset;
      return flowStart(code2);
    }
    function documentContinued(code2) {
      self.containerState = {};
      return effects.attempt(containerConstruct, containerContinue, flowStart)(code2);
    }
    function containerContinue(code2) {
      continued++;
      stack.push([
        self.currentConstruct,
        self.containerState
      ]);
      return documentContinued(code2);
    }
    function flowStart(code2) {
      if (code2 === null) {
        if (childFlow) closeFlow();
        exitContainers(0);
        effects.consume(code2);
        return;
      }
      childFlow = childFlow || self.parser.flow(self.now());
      effects.enter("chunkFlow", {
        contentType: "flow",
        previous: childToken,
        _tokenizer: childFlow
      });
      return flowContinue(code2);
    }
    function flowContinue(code2) {
      if (code2 === null) {
        writeToChild(effects.exit("chunkFlow"), true);
        exitContainers(0);
        effects.consume(code2);
        return;
      }
      if (markdownLineEnding(code2)) {
        effects.consume(code2);
        writeToChild(effects.exit("chunkFlow"));
        continued = 0;
        self.interrupt = void 0;
        return start;
      }
      effects.consume(code2);
      return flowContinue;
    }
    function writeToChild(token, eof) {
      const stream = self.sliceStream(token);
      if (eof) stream.push(null);
      token.previous = childToken;
      if (childToken) childToken.next = token;
      childToken = token;
      childFlow.defineSkip(token.start);
      childFlow.write(stream);
      if (self.parser.lazy[token.start.line]) {
        let index2 = childFlow.events.length;
        while (index2--) {
          if (childFlow.events[index2][1].start.offset < lineStartOffset && (!childFlow.events[index2][1].end || childFlow.events[index2][1].end.offset > lineStartOffset)) {
            return;
          }
        }
        const indexBeforeExits = self.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let seen;
        let point2;
        while (indexBeforeFlow--) {
          if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
            if (seen) {
              point2 = self.events[indexBeforeFlow][1].end;
              break;
            }
            seen = true;
          }
        }
        exitContainers(continued);
        index2 = indexBeforeExits;
        while (index2 < self.events.length) {
          self.events[index2][1].end = Object.assign({}, point2);
          index2++;
        }
        splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
        self.events.length = index2;
      }
    }
    function exitContainers(size) {
      let index2 = stack.length;
      while (index2-- > size) {
        const entry = stack[index2];
        self.containerState = entry[1];
        entry[0].exit.call(self, effects);
      }
      stack.length = size;
    }
    function closeFlow() {
      childFlow.write([
        null
      ]);
      childToken = void 0;
      childFlow = void 0;
      self.containerState._closeFlow = void 0;
    }
  }
  function tokenizeContainer(effects, ok2, nok) {
    return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok2, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
  }
  function classifyCharacter(code2) {
    if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
      return 1;
    }
    if (unicodePunctuation(code2)) {
      return 2;
    }
  }
  function resolveAll(constructs2, events, context) {
    const called = [];
    let index2 = -1;
    while (++index2 < constructs2.length) {
      const resolve = constructs2[index2].resolveAll;
      if (resolve && !called.includes(resolve)) {
        events = resolve(events, context);
        called.push(resolve);
      }
    }
    return events;
  }
  const attention = {
    name: "attention",
    tokenize: tokenizeAttention,
    resolveAll: resolveAllAttention
  };
  function resolveAllAttention(events, context) {
    let index2 = -1;
    let open;
    let group;
    let text2;
    let openingSequence;
    let closingSequence;
    let use;
    let nextEvents;
    let offset;
    while (++index2 < events.length) {
      if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
        open = index2;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
            if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
              continue;
            }
            use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
            const start = Object.assign({}, events[open][1].end);
            const end = Object.assign({}, events[index2][1].start);
            movePoint(start, -use);
            movePoint(end, use);
            openingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start,
              end: Object.assign({}, events[open][1].end)
            };
            closingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start: Object.assign({}, events[index2][1].start),
              end
            };
            text2 = {
              type: use > 1 ? "strongText" : "emphasisText",
              start: Object.assign({}, events[open][1].end),
              end: Object.assign({}, events[index2][1].start)
            };
            group = {
              type: use > 1 ? "strong" : "emphasis",
              start: Object.assign({}, openingSequence.start),
              end: Object.assign({}, closingSequence.end)
            };
            events[open][1].end = Object.assign({}, openingSequence.start);
            events[index2][1].start = Object.assign({}, closingSequence.end);
            nextEvents = [];
            if (events[open][1].end.offset - events[open][1].start.offset) {
              nextEvents = push(nextEvents, [
                [
                  "enter",
                  events[open][1],
                  context
                ],
                [
                  "exit",
                  events[open][1],
                  context
                ]
              ]);
            }
            nextEvents = push(nextEvents, [
              [
                "enter",
                group,
                context
              ],
              [
                "enter",
                openingSequence,
                context
              ],
              [
                "exit",
                openingSequence,
                context
              ],
              [
                "enter",
                text2,
                context
              ]
            ]);
            nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index2), context));
            nextEvents = push(nextEvents, [
              [
                "exit",
                text2,
                context
              ],
              [
                "enter",
                closingSequence,
                context
              ],
              [
                "exit",
                closingSequence,
                context
              ],
              [
                "exit",
                group,
                context
              ]
            ]);
            if (events[index2][1].end.offset - events[index2][1].start.offset) {
              offset = 2;
              nextEvents = push(nextEvents, [
                [
                  "enter",
                  events[index2][1],
                  context
                ],
                [
                  "exit",
                  events[index2][1],
                  context
                ]
              ]);
            } else {
              offset = 0;
            }
            splice(events, open - 1, index2 - open + 3, nextEvents);
            index2 = open + nextEvents.length - offset - 2;
            break;
          }
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "attentionSequence") {
        events[index2][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeAttention(effects, ok2) {
    const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
    const previous2 = this.previous;
    const before = classifyCharacter(previous2);
    let marker;
    return start;
    function start(code2) {
      marker = code2;
      effects.enter("attentionSequence");
      return inside(code2);
    }
    function inside(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        return inside;
      }
      const token = effects.exit("attentionSequence");
      const after = classifyCharacter(code2);
      const open = !after || after === 2 && before || attentionMarkers2.includes(code2);
      const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
      token._open = Boolean(marker === 42 ? open : open && (before || !close));
      token._close = Boolean(marker === 42 ? close : close && (after || !open));
      return ok2(code2);
    }
  }
  function movePoint(point2, offset) {
    point2.column += offset;
    point2.offset += offset;
    point2._bufferIndex += offset;
  }
  const autolink = {
    name: "autolink",
    tokenize: tokenizeAutolink
  };
  function tokenizeAutolink(effects, ok2, nok) {
    let size = 0;
    return start;
    function start(code2) {
      effects.enter("autolink");
      effects.enter("autolinkMarker");
      effects.consume(code2);
      effects.exit("autolinkMarker");
      effects.enter("autolinkProtocol");
      return open;
    }
    function open(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return schemeOrEmailAtext;
      }
      if (code2 === 64) {
        return nok(code2);
      }
      return emailAtext(code2);
    }
    function schemeOrEmailAtext(code2) {
      if (code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2)) {
        size = 1;
        return schemeInsideOrEmailAtext(code2);
      }
      return emailAtext(code2);
    }
    function schemeInsideOrEmailAtext(code2) {
      if (code2 === 58) {
        effects.consume(code2);
        size = 0;
        return urlInside;
      }
      if ((code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2)) && size++ < 32) {
        effects.consume(code2);
        return schemeInsideOrEmailAtext;
      }
      size = 0;
      return emailAtext(code2);
    }
    function urlInside(code2) {
      if (code2 === 62) {
        effects.exit("autolinkProtocol");
        effects.enter("autolinkMarker");
        effects.consume(code2);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok2;
      }
      if (code2 === null || code2 === 32 || code2 === 60 || asciiControl(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return urlInside;
    }
    function emailAtext(code2) {
      if (code2 === 64) {
        effects.consume(code2);
        return emailAtSignOrDot;
      }
      if (asciiAtext(code2)) {
        effects.consume(code2);
        return emailAtext;
      }
      return nok(code2);
    }
    function emailAtSignOrDot(code2) {
      return asciiAlphanumeric(code2) ? emailLabel(code2) : nok(code2);
    }
    function emailLabel(code2) {
      if (code2 === 46) {
        effects.consume(code2);
        size = 0;
        return emailAtSignOrDot;
      }
      if (code2 === 62) {
        effects.exit("autolinkProtocol").type = "autolinkEmail";
        effects.enter("autolinkMarker");
        effects.consume(code2);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok2;
      }
      return emailValue(code2);
    }
    function emailValue(code2) {
      if ((code2 === 45 || asciiAlphanumeric(code2)) && size++ < 63) {
        const next = code2 === 45 ? emailValue : emailLabel;
        effects.consume(code2);
        return next;
      }
      return nok(code2);
    }
  }
  const blankLine = {
    tokenize: tokenizeBlankLine,
    partial: true
  };
  function tokenizeBlankLine(effects, ok2, nok) {
    return start;
    function start(code2) {
      return markdownSpace(code2) ? factorySpace(effects, after, "linePrefix")(code2) : after(code2);
    }
    function after(code2) {
      return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
    }
  }
  const blockQuote = {
    name: "blockQuote",
    tokenize: tokenizeBlockQuoteStart,
    continuation: {
      tokenize: tokenizeBlockQuoteContinuation
    },
    exit: exit$1
  };
  function tokenizeBlockQuoteStart(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      if (code2 === 62) {
        const state = self.containerState;
        if (!state.open) {
          effects.enter("blockQuote", {
            _container: true
          });
          state.open = true;
        }
        effects.enter("blockQuotePrefix");
        effects.enter("blockQuoteMarker");
        effects.consume(code2);
        effects.exit("blockQuoteMarker");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      if (markdownSpace(code2)) {
        effects.enter("blockQuotePrefixWhitespace");
        effects.consume(code2);
        effects.exit("blockQuotePrefixWhitespace");
        effects.exit("blockQuotePrefix");
        return ok2;
      }
      effects.exit("blockQuotePrefix");
      return ok2(code2);
    }
  }
  function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
    const self = this;
    return contStart;
    function contStart(code2) {
      if (markdownSpace(code2)) {
        return factorySpace(effects, contBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2);
      }
      return contBefore(code2);
    }
    function contBefore(code2) {
      return effects.attempt(blockQuote, ok2, nok)(code2);
    }
  }
  function exit$1(effects) {
    effects.exit("blockQuote");
  }
  const characterEscape = {
    name: "characterEscape",
    tokenize: tokenizeCharacterEscape
  };
  function tokenizeCharacterEscape(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("characterEscape");
      effects.enter("escapeMarker");
      effects.consume(code2);
      effects.exit("escapeMarker");
      return inside;
    }
    function inside(code2) {
      if (asciiPunctuation(code2)) {
        effects.enter("characterEscapeValue");
        effects.consume(code2);
        effects.exit("characterEscapeValue");
        effects.exit("characterEscape");
        return ok2;
      }
      return nok(code2);
    }
  }
  const characterReference = {
    name: "characterReference",
    tokenize: tokenizeCharacterReference
  };
  function tokenizeCharacterReference(effects, ok2, nok) {
    const self = this;
    let size = 0;
    let max;
    let test;
    return start;
    function start(code2) {
      effects.enter("characterReference");
      effects.enter("characterReferenceMarker");
      effects.consume(code2);
      effects.exit("characterReferenceMarker");
      return open;
    }
    function open(code2) {
      if (code2 === 35) {
        effects.enter("characterReferenceMarkerNumeric");
        effects.consume(code2);
        effects.exit("characterReferenceMarkerNumeric");
        return numeric;
      }
      effects.enter("characterReferenceValue");
      max = 31;
      test = asciiAlphanumeric;
      return value(code2);
    }
    function numeric(code2) {
      if (code2 === 88 || code2 === 120) {
        effects.enter("characterReferenceMarkerHexadecimal");
        effects.consume(code2);
        effects.exit("characterReferenceMarkerHexadecimal");
        effects.enter("characterReferenceValue");
        max = 6;
        test = asciiHexDigit;
        return value;
      }
      effects.enter("characterReferenceValue");
      max = 7;
      test = asciiDigit;
      return value(code2);
    }
    function value(code2) {
      if (code2 === 59 && size) {
        const token = effects.exit("characterReferenceValue");
        if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
          return nok(code2);
        }
        effects.enter("characterReferenceMarker");
        effects.consume(code2);
        effects.exit("characterReferenceMarker");
        effects.exit("characterReference");
        return ok2;
      }
      if (test(code2) && size++ < max) {
        effects.consume(code2);
        return value;
      }
      return nok(code2);
    }
  }
  const nonLazyContinuation = {
    tokenize: tokenizeNonLazyContinuation,
    partial: true
  };
  const codeFenced = {
    name: "codeFenced",
    tokenize: tokenizeCodeFenced,
    concrete: true
  };
  function tokenizeCodeFenced(effects, ok2, nok) {
    const self = this;
    const closeStart = {
      tokenize: tokenizeCloseStart,
      partial: true
    };
    let initialPrefix = 0;
    let sizeOpen = 0;
    let marker;
    return start;
    function start(code2) {
      return beforeSequenceOpen(code2);
    }
    function beforeSequenceOpen(code2) {
      const tail = self.events[self.events.length - 1];
      initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
      marker = code2;
      effects.enter("codeFenced");
      effects.enter("codeFencedFence");
      effects.enter("codeFencedFenceSequence");
      return sequenceOpen(code2);
    }
    function sequenceOpen(code2) {
      if (code2 === marker) {
        sizeOpen++;
        effects.consume(code2);
        return sequenceOpen;
      }
      if (sizeOpen < 3) {
        return nok(code2);
      }
      effects.exit("codeFencedFenceSequence");
      return markdownSpace(code2) ? factorySpace(effects, infoBefore, "whitespace")(code2) : infoBefore(code2);
    }
    function infoBefore(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("codeFencedFence");
        return self.interrupt ? ok2(code2) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code2);
      }
      effects.enter("codeFencedFenceInfo");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return info(code2);
    }
    function info(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return infoBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return factorySpace(effects, metaBefore, "whitespace")(code2);
      }
      if (code2 === 96 && code2 === marker) {
        return nok(code2);
      }
      effects.consume(code2);
      return info;
    }
    function metaBefore(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return infoBefore(code2);
      }
      effects.enter("codeFencedFenceMeta");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return meta(code2);
    }
    function meta(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceMeta");
        return infoBefore(code2);
      }
      if (code2 === 96 && code2 === marker) {
        return nok(code2);
      }
      effects.consume(code2);
      return meta;
    }
    function atNonLazyBreak(code2) {
      return effects.attempt(closeStart, after, contentBefore)(code2);
    }
    function contentBefore(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return contentStart;
    }
    function contentStart(code2) {
      return initialPrefix > 0 && markdownSpace(code2) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code2) : beforeContentChunk(code2);
    }
    function beforeContentChunk(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code2);
      }
      effects.enter("codeFlowValue");
      return contentChunk(code2);
    }
    function contentChunk(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("codeFlowValue");
        return beforeContentChunk(code2);
      }
      effects.consume(code2);
      return contentChunk;
    }
    function after(code2) {
      effects.exit("codeFenced");
      return ok2(code2);
    }
    function tokenizeCloseStart(effects2, ok3, nok2) {
      let size = 0;
      return startBefore;
      function startBefore(code2) {
        effects2.enter("lineEnding");
        effects2.consume(code2);
        effects2.exit("lineEnding");
        return start2;
      }
      function start2(code2) {
        effects2.enter("codeFencedFence");
        return markdownSpace(code2) ? factorySpace(effects2, beforeSequenceClose, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2) : beforeSequenceClose(code2);
      }
      function beforeSequenceClose(code2) {
        if (code2 === marker) {
          effects2.enter("codeFencedFenceSequence");
          return sequenceClose(code2);
        }
        return nok2(code2);
      }
      function sequenceClose(code2) {
        if (code2 === marker) {
          size++;
          effects2.consume(code2);
          return sequenceClose;
        }
        if (size >= sizeOpen) {
          effects2.exit("codeFencedFenceSequence");
          return markdownSpace(code2) ? factorySpace(effects2, sequenceCloseAfter, "whitespace")(code2) : sequenceCloseAfter(code2);
        }
        return nok2(code2);
      }
      function sequenceCloseAfter(code2) {
        if (code2 === null || markdownLineEnding(code2)) {
          effects2.exit("codeFencedFence");
          return ok3(code2);
        }
        return nok2(code2);
      }
    }
  }
  function tokenizeNonLazyContinuation(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code2) {
      return self.parser.lazy[self.now().line] ? nok(code2) : ok2(code2);
    }
  }
  const codeIndented = {
    name: "codeIndented",
    tokenize: tokenizeCodeIndented
  };
  const furtherStart = {
    tokenize: tokenizeFurtherStart,
    partial: true
  };
  function tokenizeCodeIndented(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      effects.enter("codeIndented");
      return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code2);
    }
    function afterPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code2) : nok(code2);
    }
    function atBreak(code2) {
      if (code2 === null) {
        return after(code2);
      }
      if (markdownLineEnding(code2)) {
        return effects.attempt(furtherStart, atBreak, after)(code2);
      }
      effects.enter("codeFlowValue");
      return inside(code2);
    }
    function inside(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("codeFlowValue");
        return atBreak(code2);
      }
      effects.consume(code2);
      return inside;
    }
    function after(code2) {
      effects.exit("codeIndented");
      return ok2(code2);
    }
  }
  function tokenizeFurtherStart(effects, ok2, nok) {
    const self = this;
    return furtherStart2;
    function furtherStart2(code2) {
      if (self.parser.lazy[self.now().line]) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return furtherStart2;
      }
      return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code2);
    }
    function afterPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok2(code2) : markdownLineEnding(code2) ? furtherStart2(code2) : nok(code2);
    }
  }
  const codeText = {
    name: "codeText",
    tokenize: tokenizeCodeText,
    resolve: resolveCodeText,
    previous: previous$1
  };
  function resolveCodeText(events) {
    let tailExitIndex = events.length - 4;
    let headEnterIndex = 3;
    let index2;
    let enter;
    if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
      index2 = headEnterIndex;
      while (++index2 < tailExitIndex) {
        if (events[index2][1].type === "codeTextData") {
          events[headEnterIndex][1].type = "codeTextPadding";
          events[tailExitIndex][1].type = "codeTextPadding";
          headEnterIndex += 2;
          tailExitIndex -= 2;
          break;
        }
      }
    }
    index2 = headEnterIndex - 1;
    tailExitIndex++;
    while (++index2 <= tailExitIndex) {
      if (enter === void 0) {
        if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
          enter = index2;
        }
      } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
        events[enter][1].type = "codeTextData";
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          tailExitIndex -= index2 - enter - 2;
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return events;
  }
  function previous$1(code2) {
    return code2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }
  function tokenizeCodeText(effects, ok2, nok) {
    let sizeOpen = 0;
    let size;
    let token;
    return start;
    function start(code2) {
      effects.enter("codeText");
      effects.enter("codeTextSequence");
      return sequenceOpen(code2);
    }
    function sequenceOpen(code2) {
      if (code2 === 96) {
        effects.consume(code2);
        sizeOpen++;
        return sequenceOpen;
      }
      effects.exit("codeTextSequence");
      return between(code2);
    }
    function between(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 32) {
        effects.enter("space");
        effects.consume(code2);
        effects.exit("space");
        return between;
      }
      if (code2 === 96) {
        token = effects.enter("codeTextSequence");
        size = 0;
        return sequenceClose(code2);
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return between;
      }
      effects.enter("codeTextData");
      return data(code2);
    }
    function data(code2) {
      if (code2 === null || code2 === 32 || code2 === 96 || markdownLineEnding(code2)) {
        effects.exit("codeTextData");
        return between(code2);
      }
      effects.consume(code2);
      return data;
    }
    function sequenceClose(code2) {
      if (code2 === 96) {
        effects.consume(code2);
        size++;
        return sequenceClose;
      }
      if (size === sizeOpen) {
        effects.exit("codeTextSequence");
        effects.exit("codeText");
        return ok2(code2);
      }
      token.type = "codeTextData";
      return data(code2);
    }
  }
  class SpliceBuffer {
    constructor(initial) {
      this.left = initial ? [
        ...initial
      ] : [];
      this.right = [];
    }
    get(index2) {
      if (index2 < 0 || index2 >= this.left.length + this.right.length) {
        throw new RangeError("Cannot access index `" + index2 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
      }
      if (index2 < this.left.length) return this.left[index2];
      return this.right[this.right.length - index2 + this.left.length - 1];
    }
    get length() {
      return this.left.length + this.right.length;
    }
    shift() {
      this.setCursor(0);
      return this.right.pop();
    }
    slice(start, end) {
      const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
      if (stop < this.left.length) {
        return this.left.slice(start, stop);
      }
      if (start > this.left.length) {
        return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
      }
      return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
    }
    splice(start, deleteCount, items) {
      const count = deleteCount || 0;
      this.setCursor(Math.trunc(start));
      const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
      if (items) chunkedPush(this.left, items);
      return removed.reverse();
    }
    pop() {
      this.setCursor(Number.POSITIVE_INFINITY);
      return this.left.pop();
    }
    push(item) {
      this.setCursor(Number.POSITIVE_INFINITY);
      this.left.push(item);
    }
    pushMany(items) {
      this.setCursor(Number.POSITIVE_INFINITY);
      chunkedPush(this.left, items);
    }
    unshift(item) {
      this.setCursor(0);
      this.right.push(item);
    }
    unshiftMany(items) {
      this.setCursor(0);
      chunkedPush(this.right, items.reverse());
    }
    setCursor(n) {
      if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
      if (n < this.left.length) {
        const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
        chunkedPush(this.right, removed.reverse());
      } else {
        const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        chunkedPush(this.left, removed.reverse());
      }
    }
  }
  function chunkedPush(list2, right) {
    let chunkStart = 0;
    if (right.length < 1e4) {
      list2.push(...right);
    } else {
      while (chunkStart < right.length) {
        list2.push(...right.slice(chunkStart, chunkStart + 1e4));
        chunkStart += 1e4;
      }
    }
  }
  function subtokenize(eventsArray) {
    const jumps = {};
    let index2 = -1;
    let event;
    let lineIndex;
    let otherIndex;
    let otherEvent;
    let parameters;
    let subevents;
    let more;
    const events = new SpliceBuffer(eventsArray);
    while (++index2 < events.length) {
      while (index2 in jumps) {
        index2 = jumps[index2];
      }
      event = events.get(index2);
      if (index2 && event[1].type === "chunkFlow" && events.get(index2 - 1)[1].type === "listItemPrefix") {
        subevents = event[1]._tokenizer.events;
        otherIndex = 0;
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
          otherIndex += 2;
        }
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
          while (++otherIndex < subevents.length) {
            if (subevents[otherIndex][1].type === "content") {
              break;
            }
            if (subevents[otherIndex][1].type === "chunkText") {
              subevents[otherIndex][1]._isInFirstContentOfListItem = true;
              otherIndex++;
            }
          }
        }
      }
      if (event[0] === "enter") {
        if (event[1].contentType) {
          Object.assign(jumps, subcontent(events, index2));
          index2 = jumps[index2];
          more = true;
        }
      } else if (event[1]._container) {
        otherIndex = index2;
        lineIndex = void 0;
        while (otherIndex--) {
          otherEvent = events.get(otherIndex);
          if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
            if (otherEvent[0] === "enter") {
              if (lineIndex) {
                events.get(lineIndex)[1].type = "lineEndingBlank";
              }
              otherEvent[1].type = "lineEnding";
              lineIndex = otherIndex;
            }
          } else {
            break;
          }
        }
        if (lineIndex) {
          event[1].end = Object.assign({}, events.get(lineIndex)[1].start);
          parameters = events.slice(lineIndex, index2);
          parameters.unshift(event);
          events.splice(lineIndex, index2 - lineIndex + 1, parameters);
        }
      }
    }
    splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
    return !more;
  }
  function subcontent(events, eventIndex) {
    const token = events.get(eventIndex)[1];
    const context = events.get(eventIndex)[2];
    let startPosition = eventIndex - 1;
    const startPositions = [];
    const tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
    const childEvents = tokenizer.events;
    const jumps = [];
    const gaps = {};
    let stream;
    let previous2;
    let index2 = -1;
    let current = token;
    let adjust = 0;
    let start = 0;
    const breaks = [
      start
    ];
    while (current) {
      while (events.get(++startPosition)[1] !== current) {
      }
      startPositions.push(startPosition);
      if (!current._tokenizer) {
        stream = context.sliceStream(current);
        if (!current.next) {
          stream.push(null);
        }
        if (previous2) {
          tokenizer.defineSkip(current.start);
        }
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = true;
        }
        tokenizer.write(stream);
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = void 0;
        }
      }
      previous2 = current;
      current = current.next;
    }
    current = token;
    while (++index2 < childEvents.length) {
      if (childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line) {
        start = index2 + 1;
        breaks.push(start);
        current._tokenizer = void 0;
        current.previous = void 0;
        current = current.next;
      }
    }
    tokenizer.events = [];
    if (current) {
      current._tokenizer = void 0;
      current.previous = void 0;
    } else {
      breaks.pop();
    }
    index2 = breaks.length;
    while (index2--) {
      const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
      const start2 = startPositions.pop();
      jumps.push([
        start2,
        start2 + slice.length - 1
      ]);
      events.splice(start2, 2, slice);
    }
    jumps.reverse();
    index2 = -1;
    while (++index2 < jumps.length) {
      gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
      adjust += jumps[index2][1] - jumps[index2][0] - 1;
    }
    return gaps;
  }
  const content = {
    tokenize: tokenizeContent,
    resolve: resolveContent
  };
  const continuationConstruct = {
    tokenize: tokenizeContinuation,
    partial: true
  };
  function resolveContent(events) {
    subtokenize(events);
    return events;
  }
  function tokenizeContent(effects, ok2) {
    let previous2;
    return chunkStart;
    function chunkStart(code2) {
      effects.enter("content");
      previous2 = effects.enter("chunkContent", {
        contentType: "content"
      });
      return chunkInside(code2);
    }
    function chunkInside(code2) {
      if (code2 === null) {
        return contentEnd(code2);
      }
      if (markdownLineEnding(code2)) {
        return effects.check(continuationConstruct, contentContinue, contentEnd)(code2);
      }
      effects.consume(code2);
      return chunkInside;
    }
    function contentEnd(code2) {
      effects.exit("chunkContent");
      effects.exit("content");
      return ok2(code2);
    }
    function contentContinue(code2) {
      effects.consume(code2);
      effects.exit("chunkContent");
      previous2.next = effects.enter("chunkContent", {
        contentType: "content",
        previous: previous2
      });
      previous2 = previous2.next;
      return chunkInside;
    }
  }
  function tokenizeContinuation(effects, ok2, nok) {
    const self = this;
    return startLookahead;
    function startLookahead(code2) {
      effects.exit("chunkContent");
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, prefixed, "linePrefix");
    }
    function prefixed(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return nok(code2);
      }
      const tail = self.events[self.events.length - 1];
      if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
        return ok2(code2);
      }
      return effects.interrupt(self.parser.constructs.flow, nok, ok2)(code2);
    }
  }
  function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
    const limit = max || Number.POSITIVE_INFINITY;
    let balance = 0;
    return start;
    function start(code2) {
      if (code2 === 60) {
        effects.enter(type);
        effects.enter(literalType);
        effects.enter(literalMarkerType);
        effects.consume(code2);
        effects.exit(literalMarkerType);
        return enclosedBefore;
      }
      if (code2 === null || code2 === 32 || code2 === 41 || asciiControl(code2)) {
        return nok(code2);
      }
      effects.enter(type);
      effects.enter(rawType);
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return raw(code2);
    }
    function enclosedBefore(code2) {
      if (code2 === 62) {
        effects.enter(literalMarkerType);
        effects.consume(code2);
        effects.exit(literalMarkerType);
        effects.exit(literalType);
        effects.exit(type);
        return ok2;
      }
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return enclosed(code2);
    }
    function enclosed(code2) {
      if (code2 === 62) {
        effects.exit("chunkString");
        effects.exit(stringType);
        return enclosedBefore(code2);
      }
      if (code2 === null || code2 === 60 || markdownLineEnding(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? enclosedEscape : enclosed;
    }
    function enclosedEscape(code2) {
      if (code2 === 60 || code2 === 62 || code2 === 92) {
        effects.consume(code2);
        return enclosed;
      }
      return enclosed(code2);
    }
    function raw(code2) {
      if (!balance && (code2 === null || code2 === 41 || markdownLineEndingOrSpace(code2))) {
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok2(code2);
      }
      if (balance < limit && code2 === 40) {
        effects.consume(code2);
        balance++;
        return raw;
      }
      if (code2 === 41) {
        effects.consume(code2);
        balance--;
        return raw;
      }
      if (code2 === null || code2 === 32 || code2 === 40 || asciiControl(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? rawEscape : raw;
    }
    function rawEscape(code2) {
      if (code2 === 40 || code2 === 41 || code2 === 92) {
        effects.consume(code2);
        return raw;
      }
      return raw(code2);
    }
  }
  function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
    const self = this;
    let size = 0;
    let seen;
    return start;
    function start(code2) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.enter(stringType);
      return atBreak;
    }
    function atBreak(code2) {
      if (size > 999 || code2 === null || code2 === 91 || code2 === 93 && !seen || code2 === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.exit(stringType);
        effects.enter(markerType);
        effects.consume(code2);
        effects.exit(markerType);
        effects.exit(type);
        return ok2;
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return atBreak;
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return labelInside(code2);
    }
    function labelInside(code2) {
      if (code2 === null || code2 === 91 || code2 === 93 || markdownLineEnding(code2) || size++ > 999) {
        effects.exit("chunkString");
        return atBreak(code2);
      }
      effects.consume(code2);
      if (!seen) seen = !markdownSpace(code2);
      return code2 === 92 ? labelEscape : labelInside;
    }
    function labelEscape(code2) {
      if (code2 === 91 || code2 === 92 || code2 === 93) {
        effects.consume(code2);
        size++;
        return labelInside;
      }
      return labelInside(code2);
    }
  }
  function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
    let marker;
    return start;
    function start(code2) {
      if (code2 === 34 || code2 === 39 || code2 === 40) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code2);
        effects.exit(markerType);
        marker = code2 === 40 ? 41 : code2;
        return begin;
      }
      return nok(code2);
    }
    function begin(code2) {
      if (code2 === marker) {
        effects.enter(markerType);
        effects.consume(code2);
        effects.exit(markerType);
        effects.exit(type);
        return ok2;
      }
      effects.enter(stringType);
      return atBreak(code2);
    }
    function atBreak(code2) {
      if (code2 === marker) {
        effects.exit(stringType);
        return begin(marker);
      }
      if (code2 === null) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return factorySpace(effects, atBreak, "linePrefix");
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return inside(code2);
    }
    function inside(code2) {
      if (code2 === marker || code2 === null || markdownLineEnding(code2)) {
        effects.exit("chunkString");
        return atBreak(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? escape : inside;
    }
    function escape(code2) {
      if (code2 === marker || code2 === 92) {
        effects.consume(code2);
        return inside;
      }
      return inside(code2);
    }
  }
  function factoryWhitespace(effects, ok2) {
    let seen;
    return start;
    function start(code2) {
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        seen = true;
        return start;
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code2);
      }
      return ok2(code2);
    }
  }
  const definition$1 = {
    name: "definition",
    tokenize: tokenizeDefinition
  };
  const titleBefore = {
    tokenize: tokenizeTitleBefore,
    partial: true
  };
  function tokenizeDefinition(effects, ok2, nok) {
    const self = this;
    let identifier;
    return start;
    function start(code2) {
      effects.enter("definition");
      return before(code2);
    }
    function before(code2) {
      return factoryLabel.call(self, effects, labelAfter, nok, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(code2);
    }
    function labelAfter(code2) {
      identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
      if (code2 === 58) {
        effects.enter("definitionMarker");
        effects.consume(code2);
        effects.exit("definitionMarker");
        return markerAfter;
      }
      return nok(code2);
    }
    function markerAfter(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, destinationBefore)(code2) : destinationBefore(code2);
    }
    function destinationBefore(code2) {
      return factoryDestination(effects, destinationAfter, nok, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(code2);
    }
    function destinationAfter(code2) {
      return effects.attempt(titleBefore, after, after)(code2);
    }
    function after(code2) {
      return markdownSpace(code2) ? factorySpace(effects, afterWhitespace, "whitespace")(code2) : afterWhitespace(code2);
    }
    function afterWhitespace(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("definition");
        self.parser.defined.push(identifier);
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  function tokenizeTitleBefore(effects, ok2, nok) {
    return titleBefore2;
    function titleBefore2(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, beforeMarker)(code2) : nok(code2);
    }
    function beforeMarker(code2) {
      return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code2);
    }
    function titleAfter(code2) {
      return markdownSpace(code2) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code2) : titleAfterOptionalWhitespace(code2);
    }
    function titleAfterOptionalWhitespace(code2) {
      return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
    }
  }
  const hardBreakEscape = {
    name: "hardBreakEscape",
    tokenize: tokenizeHardBreakEscape
  };
  function tokenizeHardBreakEscape(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("hardBreakEscape");
      effects.consume(code2);
      return after;
    }
    function after(code2) {
      if (markdownLineEnding(code2)) {
        effects.exit("hardBreakEscape");
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  const headingAtx = {
    name: "headingAtx",
    tokenize: tokenizeHeadingAtx,
    resolve: resolveHeadingAtx
  };
  function resolveHeadingAtx(events, context) {
    let contentEnd = events.length - 2;
    let contentStart = 3;
    let content2;
    let text2;
    if (events[contentStart][1].type === "whitespace") {
      contentStart += 2;
    }
    if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
      contentEnd -= 2;
    }
    if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
      contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
    }
    if (contentEnd > contentStart) {
      content2 = {
        type: "atxHeadingText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end
      };
      text2 = {
        type: "chunkText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end,
        contentType: "text"
      };
      splice(events, contentStart, contentEnd - contentStart + 1, [
        [
          "enter",
          content2,
          context
        ],
        [
          "enter",
          text2,
          context
        ],
        [
          "exit",
          text2,
          context
        ],
        [
          "exit",
          content2,
          context
        ]
      ]);
    }
    return events;
  }
  function tokenizeHeadingAtx(effects, ok2, nok) {
    let size = 0;
    return start;
    function start(code2) {
      effects.enter("atxHeading");
      return before(code2);
    }
    function before(code2) {
      effects.enter("atxHeadingSequence");
      return sequenceOpen(code2);
    }
    function sequenceOpen(code2) {
      if (code2 === 35 && size++ < 6) {
        effects.consume(code2);
        return sequenceOpen;
      }
      if (code2 === null || markdownLineEndingOrSpace(code2)) {
        effects.exit("atxHeadingSequence");
        return atBreak(code2);
      }
      return nok(code2);
    }
    function atBreak(code2) {
      if (code2 === 35) {
        effects.enter("atxHeadingSequence");
        return sequenceFurther(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("atxHeading");
        return ok2(code2);
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, atBreak, "whitespace")(code2);
      }
      effects.enter("atxHeadingText");
      return data(code2);
    }
    function sequenceFurther(code2) {
      if (code2 === 35) {
        effects.consume(code2);
        return sequenceFurther;
      }
      effects.exit("atxHeadingSequence");
      return atBreak(code2);
    }
    function data(code2) {
      if (code2 === null || code2 === 35 || markdownLineEndingOrSpace(code2)) {
        effects.exit("atxHeadingText");
        return atBreak(code2);
      }
      effects.consume(code2);
      return data;
    }
  }
  const htmlBlockNames = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ];
  const htmlRawNames = [
    "pre",
    "script",
    "style",
    "textarea"
  ];
  const htmlFlow = {
    name: "htmlFlow",
    tokenize: tokenizeHtmlFlow,
    resolveTo: resolveToHtmlFlow,
    concrete: true
  };
  const blankLineBefore = {
    tokenize: tokenizeBlankLineBefore,
    partial: true
  };
  const nonLazyContinuationStart = {
    tokenize: tokenizeNonLazyContinuationStart,
    partial: true
  };
  function resolveToHtmlFlow(events) {
    let index2 = events.length;
    while (index2--) {
      if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
        break;
      }
    }
    if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
      events[index2][1].start = events[index2 - 2][1].start;
      events[index2 + 1][1].start = events[index2 - 2][1].start;
      events.splice(index2 - 2, 2);
    }
    return events;
  }
  function tokenizeHtmlFlow(effects, ok2, nok) {
    const self = this;
    let marker;
    let closingTag;
    let buffer;
    let index2;
    let markerB;
    return start;
    function start(code2) {
      return before(code2);
    }
    function before(code2) {
      effects.enter("htmlFlow");
      effects.enter("htmlFlowData");
      effects.consume(code2);
      return open;
    }
    function open(code2) {
      if (code2 === 33) {
        effects.consume(code2);
        return declarationOpen;
      }
      if (code2 === 47) {
        effects.consume(code2);
        closingTag = true;
        return tagCloseStart;
      }
      if (code2 === 63) {
        effects.consume(code2);
        marker = 3;
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        buffer = String.fromCharCode(code2);
        return tagName;
      }
      return nok(code2);
    }
    function declarationOpen(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        marker = 2;
        return commentOpenInside;
      }
      if (code2 === 91) {
        effects.consume(code2);
        marker = 5;
        index2 = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        marker = 4;
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      return nok(code2);
    }
    function commentOpenInside(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      return nok(code2);
    }
    function cdataOpenInside(code2) {
      const value = "CDATA[";
      if (code2 === value.charCodeAt(index2++)) {
        effects.consume(code2);
        if (index2 === value.length) {
          return self.interrupt ? ok2 : continuation;
        }
        return cdataOpenInside;
      }
      return nok(code2);
    }
    function tagCloseStart(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        buffer = String.fromCharCode(code2);
        return tagName;
      }
      return nok(code2);
    }
    function tagName(code2) {
      if (code2 === null || code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        const slash = code2 === 47;
        const name = buffer.toLowerCase();
        if (!slash && !closingTag && htmlRawNames.includes(name)) {
          marker = 1;
          return self.interrupt ? ok2(code2) : continuation(code2);
        }
        if (htmlBlockNames.includes(buffer.toLowerCase())) {
          marker = 6;
          if (slash) {
            effects.consume(code2);
            return basicSelfClosing;
          }
          return self.interrupt ? ok2(code2) : continuation(code2);
        }
        marker = 7;
        return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code2) : closingTag ? completeClosingTagAfter(code2) : completeAttributeNameBefore(code2);
      }
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        buffer += String.fromCharCode(code2);
        return tagName;
      }
      return nok(code2);
    }
    function basicSelfClosing(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return self.interrupt ? ok2 : continuation;
      }
      return nok(code2);
    }
    function completeClosingTagAfter(code2) {
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeClosingTagAfter;
      }
      return completeEnd(code2);
    }
    function completeAttributeNameBefore(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        return completeEnd;
      }
      if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
        effects.consume(code2);
        return completeAttributeName;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeNameBefore;
      }
      return completeEnd(code2);
    }
    function completeAttributeName(code2) {
      if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return completeAttributeName;
      }
      return completeAttributeNameAfter(code2);
    }
    function completeAttributeNameAfter(code2) {
      if (code2 === 61) {
        effects.consume(code2);
        return completeAttributeValueBefore;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeNameAfter;
      }
      return completeAttributeNameBefore(code2);
    }
    function completeAttributeValueBefore(code2) {
      if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 34 || code2 === 39) {
        effects.consume(code2);
        markerB = code2;
        return completeAttributeValueQuoted;
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAttributeValueBefore;
      }
      return completeAttributeValueUnquoted(code2);
    }
    function completeAttributeValueQuoted(code2) {
      if (code2 === markerB) {
        effects.consume(code2);
        markerB = null;
        return completeAttributeValueQuotedAfter;
      }
      if (code2 === null || markdownLineEnding(code2)) {
        return nok(code2);
      }
      effects.consume(code2);
      return completeAttributeValueQuoted;
    }
    function completeAttributeValueUnquoted(code2) {
      if (code2 === null || code2 === 34 || code2 === 39 || code2 === 47 || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96 || markdownLineEndingOrSpace(code2)) {
        return completeAttributeNameAfter(code2);
      }
      effects.consume(code2);
      return completeAttributeValueUnquoted;
    }
    function completeAttributeValueQuotedAfter(code2) {
      if (code2 === 47 || code2 === 62 || markdownSpace(code2)) {
        return completeAttributeNameBefore(code2);
      }
      return nok(code2);
    }
    function completeEnd(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return completeAfter;
      }
      return nok(code2);
    }
    function completeAfter(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return continuation(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return completeAfter;
      }
      return nok(code2);
    }
    function continuation(code2) {
      if (code2 === 45 && marker === 2) {
        effects.consume(code2);
        return continuationCommentInside;
      }
      if (code2 === 60 && marker === 1) {
        effects.consume(code2);
        return continuationRawTagOpen;
      }
      if (code2 === 62 && marker === 4) {
        effects.consume(code2);
        return continuationClose;
      }
      if (code2 === 63 && marker === 3) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      if (code2 === 93 && marker === 5) {
        effects.consume(code2);
        return continuationCdataInside;
      }
      if (markdownLineEnding(code2) && (marker === 6 || marker === 7)) {
        effects.exit("htmlFlowData");
        return effects.check(blankLineBefore, continuationAfter, continuationStart)(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("htmlFlowData");
        return continuationStart(code2);
      }
      effects.consume(code2);
      return continuation;
    }
    function continuationStart(code2) {
      return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code2);
    }
    function continuationStartNonLazy(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return continuationBefore;
    }
    function continuationBefore(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        return continuationStart(code2);
      }
      effects.enter("htmlFlowData");
      return continuation(code2);
    }
    function continuationCommentInside(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationRawTagOpen(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        buffer = "";
        return continuationRawEndTag;
      }
      return continuation(code2);
    }
    function continuationRawEndTag(code2) {
      if (code2 === 62) {
        const name = buffer.toLowerCase();
        if (htmlRawNames.includes(name)) {
          effects.consume(code2);
          return continuationClose;
        }
        return continuation(code2);
      }
      if (asciiAlpha(code2) && buffer.length < 8) {
        effects.consume(code2);
        buffer += String.fromCharCode(code2);
        return continuationRawEndTag;
      }
      return continuation(code2);
    }
    function continuationCdataInside(code2) {
      if (code2 === 93) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationDeclarationInside(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        return continuationClose;
      }
      if (code2 === 45 && marker === 2) {
        effects.consume(code2);
        return continuationDeclarationInside;
      }
      return continuation(code2);
    }
    function continuationClose(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("htmlFlowData");
        return continuationAfter(code2);
      }
      effects.consume(code2);
      return continuationClose;
    }
    function continuationAfter(code2) {
      effects.exit("htmlFlow");
      return ok2(code2);
    }
  }
  function tokenizeNonLazyContinuationStart(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      if (markdownLineEnding(code2)) {
        effects.enter("lineEnding");
        effects.consume(code2);
        effects.exit("lineEnding");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      return self.parser.lazy[self.now().line] ? nok(code2) : ok2(code2);
    }
  }
  function tokenizeBlankLineBefore(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return effects.attempt(blankLine, ok2, nok);
    }
  }
  const htmlText = {
    name: "htmlText",
    tokenize: tokenizeHtmlText
  };
  function tokenizeHtmlText(effects, ok2, nok) {
    const self = this;
    let marker;
    let index2;
    let returnState;
    return start;
    function start(code2) {
      effects.enter("htmlText");
      effects.enter("htmlTextData");
      effects.consume(code2);
      return open;
    }
    function open(code2) {
      if (code2 === 33) {
        effects.consume(code2);
        return declarationOpen;
      }
      if (code2 === 47) {
        effects.consume(code2);
        return tagCloseStart;
      }
      if (code2 === 63) {
        effects.consume(code2);
        return instruction;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return tagOpen;
      }
      return nok(code2);
    }
    function declarationOpen(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return commentOpenInside;
      }
      if (code2 === 91) {
        effects.consume(code2);
        index2 = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return declaration;
      }
      return nok(code2);
    }
    function commentOpenInside(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return commentEnd;
      }
      return nok(code2);
    }
    function comment(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 45) {
        effects.consume(code2);
        return commentClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = comment;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return comment;
    }
    function commentClose(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return commentEnd;
      }
      return comment(code2);
    }
    function commentEnd(code2) {
      return code2 === 62 ? end(code2) : code2 === 45 ? commentClose(code2) : comment(code2);
    }
    function cdataOpenInside(code2) {
      const value = "CDATA[";
      if (code2 === value.charCodeAt(index2++)) {
        effects.consume(code2);
        return index2 === value.length ? cdata : cdataOpenInside;
      }
      return nok(code2);
    }
    function cdata(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.consume(code2);
        return cdataClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = cdata;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return cdata;
    }
    function cdataClose(code2) {
      if (code2 === 93) {
        effects.consume(code2);
        return cdataEnd;
      }
      return cdata(code2);
    }
    function cdataEnd(code2) {
      if (code2 === 62) {
        return end(code2);
      }
      if (code2 === 93) {
        effects.consume(code2);
        return cdataEnd;
      }
      return cdata(code2);
    }
    function declaration(code2) {
      if (code2 === null || code2 === 62) {
        return end(code2);
      }
      if (markdownLineEnding(code2)) {
        returnState = declaration;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return declaration;
    }
    function instruction(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (code2 === 63) {
        effects.consume(code2);
        return instructionClose;
      }
      if (markdownLineEnding(code2)) {
        returnState = instruction;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return instruction;
    }
    function instructionClose(code2) {
      return code2 === 62 ? end(code2) : instruction(code2);
    }
    function tagCloseStart(code2) {
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return tagClose;
      }
      return nok(code2);
    }
    function tagClose(code2) {
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagClose;
      }
      return tagCloseBetween(code2);
    }
    function tagCloseBetween(code2) {
      if (markdownLineEnding(code2)) {
        returnState = tagCloseBetween;
        return lineEndingBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagCloseBetween;
      }
      return end(code2);
    }
    function tagOpen(code2) {
      if (code2 === 45 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagOpen;
      }
      if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      return nok(code2);
    }
    function tagOpenBetween(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        return end;
      }
      if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
        effects.consume(code2);
        return tagOpenAttributeName;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenBetween;
        return lineEndingBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenBetween;
      }
      return end(code2);
    }
    function tagOpenAttributeName(code2) {
      if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
        effects.consume(code2);
        return tagOpenAttributeName;
      }
      return tagOpenAttributeNameAfter(code2);
    }
    function tagOpenAttributeNameAfter(code2) {
      if (code2 === 61) {
        effects.consume(code2);
        return tagOpenAttributeValueBefore;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeNameAfter;
        return lineEndingBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenAttributeNameAfter;
      }
      return tagOpenBetween(code2);
    }
    function tagOpenAttributeValueBefore(code2) {
      if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 34 || code2 === 39) {
        effects.consume(code2);
        marker = code2;
        return tagOpenAttributeValueQuoted;
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeValueBefore;
        return lineEndingBefore(code2);
      }
      if (markdownSpace(code2)) {
        effects.consume(code2);
        return tagOpenAttributeValueBefore;
      }
      effects.consume(code2);
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuoted(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        marker = void 0;
        return tagOpenAttributeValueQuotedAfter;
      }
      if (code2 === null) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        returnState = tagOpenAttributeValueQuoted;
        return lineEndingBefore(code2);
      }
      effects.consume(code2);
      return tagOpenAttributeValueQuoted;
    }
    function tagOpenAttributeValueUnquoted(code2) {
      if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 96) {
        return nok(code2);
      }
      if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      effects.consume(code2);
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuotedAfter(code2) {
      if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
        return tagOpenBetween(code2);
      }
      return nok(code2);
    }
    function end(code2) {
      if (code2 === 62) {
        effects.consume(code2);
        effects.exit("htmlTextData");
        effects.exit("htmlText");
        return ok2;
      }
      return nok(code2);
    }
    function lineEndingBefore(code2) {
      effects.exit("htmlTextData");
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return lineEndingAfter;
    }
    function lineEndingAfter(code2) {
      return markdownSpace(code2) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2) : lineEndingAfterPrefix(code2);
    }
    function lineEndingAfterPrefix(code2) {
      effects.enter("htmlTextData");
      return returnState(code2);
    }
  }
  const labelEnd = {
    name: "labelEnd",
    tokenize: tokenizeLabelEnd,
    resolveTo: resolveToLabelEnd,
    resolveAll: resolveAllLabelEnd
  };
  const resourceConstruct = {
    tokenize: tokenizeResource
  };
  const referenceFullConstruct = {
    tokenize: tokenizeReferenceFull
  };
  const referenceCollapsedConstruct = {
    tokenize: tokenizeReferenceCollapsed
  };
  function resolveAllLabelEnd(events) {
    let index2 = -1;
    while (++index2 < events.length) {
      const token = events[index2][1];
      if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
        events.splice(index2 + 1, token.type === "labelImage" ? 4 : 2);
        token.type = "data";
        index2++;
      }
    }
    return events;
  }
  function resolveToLabelEnd(events, context) {
    let index2 = events.length;
    let offset = 0;
    let token;
    let open;
    let close;
    let media;
    while (index2--) {
      token = events[index2][1];
      if (open) {
        if (token.type === "link" || token.type === "labelLink" && token._inactive) {
          break;
        }
        if (events[index2][0] === "enter" && token.type === "labelLink") {
          token._inactive = true;
        }
      } else if (close) {
        if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
          open = index2;
          if (token.type !== "labelLink") {
            offset = 2;
            break;
          }
        }
      } else if (token.type === "labelEnd") {
        close = index2;
      }
    }
    const group = {
      type: events[open][1].type === "labelLink" ? "link" : "image",
      start: Object.assign({}, events[open][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    const label = {
      type: "label",
      start: Object.assign({}, events[open][1].start),
      end: Object.assign({}, events[close][1].end)
    };
    const text2 = {
      type: "labelText",
      start: Object.assign({}, events[open + offset + 2][1].end),
      end: Object.assign({}, events[close - 2][1].start)
    };
    media = [
      [
        "enter",
        group,
        context
      ],
      [
        "enter",
        label,
        context
      ]
    ];
    media = push(media, events.slice(open + 1, open + offset + 3));
    media = push(media, [
      [
        "enter",
        text2,
        context
      ]
    ]);
    media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
    media = push(media, [
      [
        "exit",
        text2,
        context
      ],
      events[close - 2],
      events[close - 1],
      [
        "exit",
        label,
        context
      ]
    ]);
    media = push(media, events.slice(close + 1));
    media = push(media, [
      [
        "exit",
        group,
        context
      ]
    ]);
    splice(events, open, events.length, media);
    return events;
  }
  function tokenizeLabelEnd(effects, ok2, nok) {
    const self = this;
    let index2 = self.events.length;
    let labelStart;
    let defined;
    while (index2--) {
      if ((self.events[index2][1].type === "labelImage" || self.events[index2][1].type === "labelLink") && !self.events[index2][1]._balanced) {
        labelStart = self.events[index2][1];
        break;
      }
    }
    return start;
    function start(code2) {
      if (!labelStart) {
        return nok(code2);
      }
      if (labelStart._inactive) {
        return labelEndNok(code2);
      }
      defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({
        start: labelStart.end,
        end: self.now()
      })));
      effects.enter("labelEnd");
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelEnd");
      return after;
    }
    function after(code2) {
      if (code2 === 40) {
        return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code2);
      }
      if (code2 === 91) {
        return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code2);
      }
      return defined ? labelEndOk(code2) : labelEndNok(code2);
    }
    function referenceNotFull(code2) {
      return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code2);
    }
    function labelEndOk(code2) {
      return ok2(code2);
    }
    function labelEndNok(code2) {
      labelStart._balanced = true;
      return nok(code2);
    }
  }
  function tokenizeResource(effects, ok2, nok) {
    return resourceStart;
    function resourceStart(code2) {
      effects.enter("resource");
      effects.enter("resourceMarker");
      effects.consume(code2);
      effects.exit("resourceMarker");
      return resourceBefore;
    }
    function resourceBefore(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, resourceOpen)(code2) : resourceOpen(code2);
    }
    function resourceOpen(code2) {
      if (code2 === 41) {
        return resourceEnd(code2);
      }
      return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code2);
    }
    function resourceDestinationAfter(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, resourceBetween)(code2) : resourceEnd(code2);
    }
    function resourceDestinationMissing(code2) {
      return nok(code2);
    }
    function resourceBetween(code2) {
      if (code2 === 34 || code2 === 39 || code2 === 40) {
        return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code2);
      }
      return resourceEnd(code2);
    }
    function resourceTitleAfter(code2) {
      return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, resourceEnd)(code2) : resourceEnd(code2);
    }
    function resourceEnd(code2) {
      if (code2 === 41) {
        effects.enter("resourceMarker");
        effects.consume(code2);
        effects.exit("resourceMarker");
        effects.exit("resource");
        return ok2;
      }
      return nok(code2);
    }
  }
  function tokenizeReferenceFull(effects, ok2, nok) {
    const self = this;
    return referenceFull;
    function referenceFull(code2) {
      return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code2);
    }
    function referenceFullAfter(code2) {
      return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok2(code2) : nok(code2);
    }
    function referenceFullMissing(code2) {
      return nok(code2);
    }
  }
  function tokenizeReferenceCollapsed(effects, ok2, nok) {
    return referenceCollapsedStart;
    function referenceCollapsedStart(code2) {
      effects.enter("reference");
      effects.enter("referenceMarker");
      effects.consume(code2);
      effects.exit("referenceMarker");
      return referenceCollapsedOpen;
    }
    function referenceCollapsedOpen(code2) {
      if (code2 === 93) {
        effects.enter("referenceMarker");
        effects.consume(code2);
        effects.exit("referenceMarker");
        effects.exit("reference");
        return ok2;
      }
      return nok(code2);
    }
  }
  const labelStartImage = {
    name: "labelStartImage",
    tokenize: tokenizeLabelStartImage,
    resolveAll: labelEnd.resolveAll
  };
  function tokenizeLabelStartImage(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      effects.enter("labelImage");
      effects.enter("labelImageMarker");
      effects.consume(code2);
      effects.exit("labelImageMarker");
      return open;
    }
    function open(code2) {
      if (code2 === 91) {
        effects.enter("labelMarker");
        effects.consume(code2);
        effects.exit("labelMarker");
        effects.exit("labelImage");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      return code2 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code2) : ok2(code2);
    }
  }
  const labelStartLink = {
    name: "labelStartLink",
    tokenize: tokenizeLabelStartLink,
    resolveAll: labelEnd.resolveAll
  };
  function tokenizeLabelStartLink(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code2) {
      effects.enter("labelLink");
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelLink");
      return after;
    }
    function after(code2) {
      return code2 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code2) : ok2(code2);
    }
  }
  const lineEnding = {
    name: "lineEnding",
    tokenize: tokenizeLineEnding
  };
  function tokenizeLineEnding(effects, ok2) {
    return start;
    function start(code2) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, ok2, "linePrefix");
    }
  }
  const thematicBreak$1 = {
    name: "thematicBreak",
    tokenize: tokenizeThematicBreak
  };
  function tokenizeThematicBreak(effects, ok2, nok) {
    let size = 0;
    let marker;
    return start;
    function start(code2) {
      effects.enter("thematicBreak");
      return before(code2);
    }
    function before(code2) {
      marker = code2;
      return atBreak(code2);
    }
    function atBreak(code2) {
      if (code2 === marker) {
        effects.enter("thematicBreakSequence");
        return sequence2(code2);
      }
      if (size >= 3 && (code2 === null || markdownLineEnding(code2))) {
        effects.exit("thematicBreak");
        return ok2(code2);
      }
      return nok(code2);
    }
    function sequence2(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        size++;
        return sequence2;
      }
      effects.exit("thematicBreakSequence");
      return markdownSpace(code2) ? factorySpace(effects, atBreak, "whitespace")(code2) : atBreak(code2);
    }
  }
  const list$1 = {
    name: "list",
    tokenize: tokenizeListStart,
    continuation: {
      tokenize: tokenizeListContinuation
    },
    exit: tokenizeListEnd
  };
  const listItemPrefixWhitespaceConstruct = {
    tokenize: tokenizeListItemPrefixWhitespace,
    partial: true
  };
  const indentConstruct = {
    tokenize: tokenizeIndent$1,
    partial: true
  };
  function tokenizeListStart(effects, ok2, nok) {
    const self = this;
    const tail = self.events[self.events.length - 1];
    let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    let size = 0;
    return start;
    function start(code2) {
      const kind = self.containerState.type || (code2 === 42 || code2 === 43 || code2 === 45 ? "listUnordered" : "listOrdered");
      if (kind === "listUnordered" ? !self.containerState.marker || code2 === self.containerState.marker : asciiDigit(code2)) {
        if (!self.containerState.type) {
          self.containerState.type = kind;
          effects.enter(kind, {
            _container: true
          });
        }
        if (kind === "listUnordered") {
          effects.enter("listItemPrefix");
          return code2 === 42 || code2 === 45 ? effects.check(thematicBreak$1, nok, atMarker)(code2) : atMarker(code2);
        }
        if (!self.interrupt || code2 === 49) {
          effects.enter("listItemPrefix");
          effects.enter("listItemValue");
          return inside(code2);
        }
      }
      return nok(code2);
    }
    function inside(code2) {
      if (asciiDigit(code2) && ++size < 10) {
        effects.consume(code2);
        return inside;
      }
      if ((!self.interrupt || size < 2) && (self.containerState.marker ? code2 === self.containerState.marker : code2 === 41 || code2 === 46)) {
        effects.exit("listItemValue");
        return atMarker(code2);
      }
      return nok(code2);
    }
    function atMarker(code2) {
      effects.enter("listItemMarker");
      effects.consume(code2);
      effects.exit("listItemMarker");
      self.containerState.marker = self.containerState.marker || code2;
      return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
    }
    function onBlank(code2) {
      self.containerState.initialBlankLine = true;
      initialSize++;
      return endOfPrefix(code2);
    }
    function otherPrefix(code2) {
      if (markdownSpace(code2)) {
        effects.enter("listItemPrefixWhitespace");
        effects.consume(code2);
        effects.exit("listItemPrefixWhitespace");
        return endOfPrefix;
      }
      return nok(code2);
    }
    function endOfPrefix(code2) {
      self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
      return ok2(code2);
    }
  }
  function tokenizeListContinuation(effects, ok2, nok) {
    const self = this;
    self.containerState._closeFlow = void 0;
    return effects.check(blankLine, onBlank, notBlank);
    function onBlank(code2) {
      self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
      return factorySpace(effects, ok2, "listItemIndent", self.containerState.size + 1)(code2);
    }
    function notBlank(code2) {
      if (self.containerState.furtherBlankLines || !markdownSpace(code2)) {
        self.containerState.furtherBlankLines = void 0;
        self.containerState.initialBlankLine = void 0;
        return notInCurrentItem(code2);
      }
      self.containerState.furtherBlankLines = void 0;
      self.containerState.initialBlankLine = void 0;
      return effects.attempt(indentConstruct, ok2, notInCurrentItem)(code2);
    }
    function notInCurrentItem(code2) {
      self.containerState._closeFlow = true;
      self.interrupt = void 0;
      return factorySpace(effects, effects.attempt(list$1, ok2, nok), "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2);
    }
  }
  function tokenizeIndent$1(effects, ok2, nok) {
    const self = this;
    return factorySpace(effects, afterPrefix, "listItemIndent", self.containerState.size + 1);
    function afterPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok2(code2) : nok(code2);
    }
  }
  function tokenizeListEnd(effects) {
    effects.exit(this.containerState.type);
  }
  function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
    const self = this;
    return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
    function afterPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return !markdownSpace(code2) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok2(code2) : nok(code2);
    }
  }
  const setextUnderline = {
    name: "setextUnderline",
    tokenize: tokenizeSetextUnderline,
    resolveTo: resolveToSetextUnderline
  };
  function resolveToSetextUnderline(events, context) {
    let index2 = events.length;
    let content2;
    let text2;
    let definition2;
    while (index2--) {
      if (events[index2][0] === "enter") {
        if (events[index2][1].type === "content") {
          content2 = index2;
          break;
        }
        if (events[index2][1].type === "paragraph") {
          text2 = index2;
        }
      } else {
        if (events[index2][1].type === "content") {
          events.splice(index2, 1);
        }
        if (!definition2 && events[index2][1].type === "definition") {
          definition2 = index2;
        }
      }
    }
    const heading2 = {
      type: "setextHeading",
      start: Object.assign({}, events[text2][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    events[text2][1].type = "setextHeadingText";
    if (definition2) {
      events.splice(text2, 0, [
        "enter",
        heading2,
        context
      ]);
      events.splice(definition2 + 1, 0, [
        "exit",
        events[content2][1],
        context
      ]);
      events[content2][1].end = Object.assign({}, events[definition2][1].end);
    } else {
      events[content2][1] = heading2;
    }
    events.push([
      "exit",
      heading2,
      context
    ]);
    return events;
  }
  function tokenizeSetextUnderline(effects, ok2, nok) {
    const self = this;
    let marker;
    return start;
    function start(code2) {
      let index2 = self.events.length;
      let paragraph2;
      while (index2--) {
        if (self.events[index2][1].type !== "lineEnding" && self.events[index2][1].type !== "linePrefix" && self.events[index2][1].type !== "content") {
          paragraph2 = self.events[index2][1].type === "paragraph";
          break;
        }
      }
      if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph2)) {
        effects.enter("setextHeadingLine");
        marker = code2;
        return before(code2);
      }
      return nok(code2);
    }
    function before(code2) {
      effects.enter("setextHeadingLineSequence");
      return inside(code2);
    }
    function inside(code2) {
      if (code2 === marker) {
        effects.consume(code2);
        return inside;
      }
      effects.exit("setextHeadingLineSequence");
      return markdownSpace(code2) ? factorySpace(effects, after, "lineSuffix")(code2) : after(code2);
    }
    function after(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("setextHeadingLine");
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  const flow$1 = {
    tokenize: initializeFlow
  };
  function initializeFlow(effects) {
    const self = this;
    const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content, afterConstruct)), "linePrefix")));
    return initial;
    function atBlankEnding(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEndingBlank");
      effects.consume(code2);
      effects.exit("lineEndingBlank");
      self.currentConstruct = void 0;
      return initial;
    }
    function afterConstruct(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      self.currentConstruct = void 0;
      return initial;
    }
  }
  const resolver = {
    resolveAll: createResolver()
  };
  const string$1 = initializeFactory("string");
  const text$3 = initializeFactory("text");
  function initializeFactory(field) {
    return {
      tokenize: initializeText,
      resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0)
    };
    function initializeText(effects) {
      const self = this;
      const constructs2 = this.parser.constructs[field];
      const text2 = effects.attempt(constructs2, start, notText);
      return start;
      function start(code2) {
        return atBreak(code2) ? text2(code2) : notText(code2);
      }
      function notText(code2) {
        if (code2 === null) {
          effects.consume(code2);
          return;
        }
        effects.enter("data");
        effects.consume(code2);
        return data;
      }
      function data(code2) {
        if (atBreak(code2)) {
          effects.exit("data");
          return text2(code2);
        }
        effects.consume(code2);
        return data;
      }
      function atBreak(code2) {
        if (code2 === null) {
          return true;
        }
        const list2 = constructs2[code2];
        let index2 = -1;
        if (list2) {
          while (++index2 < list2.length) {
            const item = list2[index2];
            if (!item.previous || item.previous.call(self, self.previous)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  function createResolver(extraResolver) {
    return resolveAllText;
    function resolveAllText(events, context) {
      let index2 = -1;
      let enter;
      while (++index2 <= events.length) {
        if (enter === void 0) {
          if (events[index2] && events[index2][1].type === "data") {
            enter = index2;
            index2++;
          }
        } else if (!events[index2] || events[index2][1].type !== "data") {
          if (index2 !== enter + 2) {
            events[enter][1].end = events[index2 - 1][1].end;
            events.splice(enter + 2, index2 - enter - 2);
            index2 = enter + 2;
          }
          enter = void 0;
        }
      }
      return extraResolver ? extraResolver(events, context) : events;
    }
  }
  function resolveAllLineSuffixes(events, context) {
    let eventIndex = 0;
    while (++eventIndex <= events.length) {
      if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
        const data = events[eventIndex - 1][1];
        const chunks = context.sliceStream(data);
        let index2 = chunks.length;
        let bufferIndex = -1;
        let size = 0;
        let tabs;
        while (index2--) {
          const chunk = chunks[index2];
          if (typeof chunk === "string") {
            bufferIndex = chunk.length;
            while (chunk.charCodeAt(bufferIndex - 1) === 32) {
              size++;
              bufferIndex--;
            }
            if (bufferIndex) break;
            bufferIndex = -1;
          } else if (chunk === -2) {
            tabs = true;
            size++;
          } else if (chunk === -1) ;
          else {
            index2++;
            break;
          }
        }
        if (size) {
          const token = {
            type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
            start: {
              line: data.end.line,
              column: data.end.column - size,
              offset: data.end.offset - size,
              _index: data.start._index + index2,
              _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex
            },
            end: Object.assign({}, data.end)
          };
          data.end = Object.assign({}, token.start);
          if (data.start.offset === data.end.offset) {
            Object.assign(data, token);
          } else {
            events.splice(eventIndex, 0, [
              "enter",
              token,
              context
            ], [
              "exit",
              token,
              context
            ]);
            eventIndex += 2;
          }
        }
        eventIndex++;
      }
    }
    return events;
  }
  function createTokenizer(parser, initialize, from) {
    let point2 = Object.assign(from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    }, {
      _index: 0,
      _bufferIndex: -1
    });
    const columnStart = {};
    const resolveAllConstructs = [];
    let chunks = [];
    let stack = [];
    const effects = {
      consume,
      enter,
      exit: exit2,
      attempt: constructFactory(onsuccessfulconstruct),
      check: constructFactory(onsuccessfulcheck),
      interrupt: constructFactory(onsuccessfulcheck, {
        interrupt: true
      })
    };
    const context = {
      previous: null,
      code: null,
      containerState: {},
      events: [],
      parser,
      sliceStream,
      sliceSerialize,
      now,
      defineSkip,
      write
    };
    let state = initialize.tokenize.call(context, effects);
    if (initialize.resolveAll) {
      resolveAllConstructs.push(initialize);
    }
    return context;
    function write(slice) {
      chunks = push(chunks, slice);
      main();
      if (chunks[chunks.length - 1] !== null) {
        return [];
      }
      addResult(initialize, 0);
      context.events = resolveAll(resolveAllConstructs, context.events, context);
      return context.events;
    }
    function sliceSerialize(token, expandTabs) {
      return serializeChunks(sliceStream(token), expandTabs);
    }
    function sliceStream(token) {
      return sliceChunks(chunks, token);
    }
    function now() {
      const { line, column, offset, _index, _bufferIndex } = point2;
      return {
        line,
        column,
        offset,
        _index,
        _bufferIndex
      };
    }
    function defineSkip(value) {
      columnStart[value.line] = value.column;
      accountForPotentialSkip();
    }
    function main() {
      let chunkIndex;
      while (point2._index < chunks.length) {
        const chunk = chunks[point2._index];
        if (typeof chunk === "string") {
          chunkIndex = point2._index;
          if (point2._bufferIndex < 0) {
            point2._bufferIndex = 0;
          }
          while (point2._index === chunkIndex && point2._bufferIndex < chunk.length) {
            go(chunk.charCodeAt(point2._bufferIndex));
          }
        } else {
          go(chunk);
        }
      }
    }
    function go(code2) {
      state = state(code2);
    }
    function consume(code2) {
      if (markdownLineEnding(code2)) {
        point2.line++;
        point2.column = 1;
        point2.offset += code2 === -3 ? 2 : 1;
        accountForPotentialSkip();
      } else if (code2 !== -1) {
        point2.column++;
        point2.offset++;
      }
      if (point2._bufferIndex < 0) {
        point2._index++;
      } else {
        point2._bufferIndex++;
        if (point2._bufferIndex === chunks[point2._index].length) {
          point2._bufferIndex = -1;
          point2._index++;
        }
      }
      context.previous = code2;
    }
    function enter(type, fields) {
      const token = fields || {};
      token.type = type;
      token.start = now();
      context.events.push([
        "enter",
        token,
        context
      ]);
      stack.push(token);
      return token;
    }
    function exit2(type) {
      const token = stack.pop();
      token.end = now();
      context.events.push([
        "exit",
        token,
        context
      ]);
      return token;
    }
    function onsuccessfulconstruct(construct, info) {
      addResult(construct, info.from);
    }
    function onsuccessfulcheck(_, info) {
      info.restore();
    }
    function constructFactory(onreturn, fields) {
      return hook;
      function hook(constructs2, returnState, bogusState) {
        let listOfConstructs;
        let constructIndex;
        let currentConstruct;
        let info;
        return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : "tokenize" in constructs2 ? handleListOfConstructs([
          constructs2
        ]) : handleMapOfConstructs(constructs2);
        function handleMapOfConstructs(map2) {
          return start;
          function start(code2) {
            const def = code2 !== null && map2[code2];
            const all2 = code2 !== null && map2.null;
            const list2 = [
              ...Array.isArray(def) ? def : def ? [
                def
              ] : [],
              ...Array.isArray(all2) ? all2 : all2 ? [
                all2
              ] : []
            ];
            return handleListOfConstructs(list2)(code2);
          }
        }
        function handleListOfConstructs(list2) {
          listOfConstructs = list2;
          constructIndex = 0;
          if (list2.length === 0) {
            return bogusState;
          }
          return handleConstruct(list2[constructIndex]);
        }
        function handleConstruct(construct) {
          return start;
          function start(code2) {
            info = store();
            currentConstruct = construct;
            if (!construct.partial) {
              context.currentConstruct = construct;
            }
            if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
              return nok();
            }
            return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok2, nok)(code2);
          }
        }
        function ok2(code2) {
          onreturn(currentConstruct, info);
          return returnState;
        }
        function nok(code2) {
          info.restore();
          if (++constructIndex < listOfConstructs.length) {
            return handleConstruct(listOfConstructs[constructIndex]);
          }
          return bogusState;
        }
      }
    }
    function addResult(construct, from2) {
      if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
        resolveAllConstructs.push(construct);
      }
      if (construct.resolve) {
        splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
      }
      if (construct.resolveTo) {
        context.events = construct.resolveTo(context.events, context);
      }
    }
    function store() {
      const startPoint = now();
      const startPrevious = context.previous;
      const startCurrentConstruct = context.currentConstruct;
      const startEventsIndex = context.events.length;
      const startStack = Array.from(stack);
      return {
        restore,
        from: startEventsIndex
      };
      function restore() {
        point2 = startPoint;
        context.previous = startPrevious;
        context.currentConstruct = startCurrentConstruct;
        context.events.length = startEventsIndex;
        stack = startStack;
        accountForPotentialSkip();
      }
    }
    function accountForPotentialSkip() {
      if (point2.line in columnStart && point2.column < 2) {
        point2.column = columnStart[point2.line];
        point2.offset += columnStart[point2.line] - 1;
      }
    }
  }
  function sliceChunks(chunks, token) {
    const startIndex = token.start._index;
    const startBufferIndex = token.start._bufferIndex;
    const endIndex = token.end._index;
    const endBufferIndex = token.end._bufferIndex;
    let view;
    if (startIndex === endIndex) {
      view = [
        chunks[startIndex].slice(startBufferIndex, endBufferIndex)
      ];
    } else {
      view = chunks.slice(startIndex, endIndex);
      if (startBufferIndex > -1) {
        const head = view[0];
        if (typeof head === "string") {
          view[0] = head.slice(startBufferIndex);
        } else {
          view.shift();
        }
      }
      if (endBufferIndex > 0) {
        view.push(chunks[endIndex].slice(0, endBufferIndex));
      }
    }
    return view;
  }
  function serializeChunks(chunks, expandTabs) {
    let index2 = -1;
    const result = [];
    let atTab;
    while (++index2 < chunks.length) {
      const chunk = chunks[index2];
      let value;
      if (typeof chunk === "string") {
        value = chunk;
      } else switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab) continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
      atTab = chunk === -2;
      result.push(value);
    }
    return result.join("");
  }
  const document$1 = {
    [42]: list$1,
    [43]: list$1,
    [45]: list$1,
    [48]: list$1,
    [49]: list$1,
    [50]: list$1,
    [51]: list$1,
    [52]: list$1,
    [53]: list$1,
    [54]: list$1,
    [55]: list$1,
    [56]: list$1,
    [57]: list$1,
    [62]: blockQuote
  };
  const contentInitial = {
    [91]: definition$1
  };
  const flowInitial = {
    [-2]: codeIndented,
    [-1]: codeIndented,
    [32]: codeIndented
  };
  const flow = {
    [35]: headingAtx,
    [42]: thematicBreak$1,
    [45]: [
      setextUnderline,
      thematicBreak$1
    ],
    [60]: htmlFlow,
    [61]: setextUnderline,
    [95]: thematicBreak$1,
    [96]: codeFenced,
    [126]: codeFenced
  };
  const string = {
    [38]: characterReference,
    [92]: characterEscape
  };
  const text$2 = {
    [-5]: lineEnding,
    [-4]: lineEnding,
    [-3]: lineEnding,
    [33]: labelStartImage,
    [38]: characterReference,
    [42]: attention,
    [60]: [
      autolink,
      htmlText
    ],
    [91]: labelStartLink,
    [92]: [
      hardBreakEscape,
      characterEscape
    ],
    [93]: labelEnd,
    [95]: attention,
    [96]: codeText
  };
  const insideSpan = {
    null: [
      attention,
      resolver
    ]
  };
  const attentionMarkers = {
    null: [
      42,
      95
    ]
  };
  const disable = {
    null: []
  };
  const defaultConstructs = Object.freeze(Object.defineProperty({
    __proto__: null,
    attentionMarkers,
    contentInitial,
    disable,
    document: document$1,
    flow,
    flowInitial,
    insideSpan,
    string,
    text: text$2
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  function parse(options) {
    const settings = options || {};
    const constructs2 = combineExtensions([
      defaultConstructs,
      ...settings.extensions || []
    ]);
    const parser = {
      defined: [],
      lazy: {},
      constructs: constructs2,
      content: create(content$1),
      document: create(document$2),
      flow: create(flow$1),
      string: create(string$1),
      text: create(text$3)
    };
    return parser;
    function create(initial) {
      return creator;
      function creator(from) {
        return createTokenizer(parser, initial, from);
      }
    }
  }
  function postprocess(events) {
    while (!subtokenize(events)) {
    }
    return events;
  }
  const search = /[\0\t\n\r]/g;
  function preprocess() {
    let column = 1;
    let buffer = "";
    let start = true;
    let atCarriageReturn;
    return preprocessor;
    function preprocessor(value, encoding, end) {
      const chunks = [];
      let match;
      let next;
      let startPosition;
      let endPosition;
      let code2;
      value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
      startPosition = 0;
      buffer = "";
      if (start) {
        if (value.charCodeAt(0) === 65279) {
          startPosition++;
        }
        start = void 0;
      }
      while (startPosition < value.length) {
        search.lastIndex = startPosition;
        match = search.exec(value);
        endPosition = match && match.index !== void 0 ? match.index : value.length;
        code2 = value.charCodeAt(endPosition);
        if (!match) {
          buffer = value.slice(startPosition);
          break;
        }
        if (code2 === 10 && startPosition === endPosition && atCarriageReturn) {
          chunks.push(-3);
          atCarriageReturn = void 0;
        } else {
          if (atCarriageReturn) {
            chunks.push(-5);
            atCarriageReturn = void 0;
          }
          if (startPosition < endPosition) {
            chunks.push(value.slice(startPosition, endPosition));
            column += endPosition - startPosition;
          }
          switch (code2) {
            case 0: {
              chunks.push(65533);
              column++;
              break;
            }
            case 9: {
              next = Math.ceil(column / 4) * 4;
              chunks.push(-2);
              while (column++ < next) chunks.push(-1);
              break;
            }
            case 10: {
              chunks.push(-4);
              column = 1;
              break;
            }
            default: {
              atCarriageReturn = true;
              column = 1;
            }
          }
        }
        startPosition = endPosition + 1;
      }
      if (end) {
        if (atCarriageReturn) chunks.push(-5);
        if (buffer) chunks.push(buffer);
        chunks.push(null);
      }
      return chunks;
    }
  }
  const characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  function decodeString(value) {
    return value.replace(characterEscapeOrReference, decode);
  }
  function decode($0, $1, $2) {
    if ($1) {
      return $1;
    }
    const head = $2.charCodeAt(0);
    if (head === 35) {
      const head2 = $2.charCodeAt(1);
      const hex = head2 === 120 || head2 === 88;
      return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
    }
    return decodeNamedCharacterReference($2) || $0;
  }
  const own$1 = {}.hasOwnProperty;
  function fromMarkdown(value, encoding, options) {
    if (typeof encoding !== "string") {
      options = encoding;
      encoding = void 0;
    }
    return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
  }
  function compiler(options) {
    const config = {
      transforms: [],
      canContainEols: [
        "emphasis",
        "fragment",
        "heading",
        "paragraph",
        "strong"
      ],
      enter: {
        autolink: opener(link2),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading2),
        blockQuote: opener(blockQuote2),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText2, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition2),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis2),
        hardBreakEscape: opener(hardBreak2),
        hardBreakTrailing: opener(hardBreak2),
        htmlFlow: opener(html2, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html2, buffer),
        htmlTextData: onenterdata,
        image: opener(image2),
        label: buffer,
        link: opener(link2),
        listItem: opener(listItem2),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list2, onenterlistordered),
        listUnordered: opener(list2),
        paragraph: opener(paragraph2),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading2),
        strong: opener(strong2),
        thematicBreak: opener(thematicBreak2)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        characterReference: onexitcharacterreference,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    };
    configure(config, (options || {}).mdastExtensions || []);
    const data = {};
    return compile2;
    function compile2(events) {
      let tree = {
        type: "root",
        children: []
      };
      const context = {
        stack: [
          tree
        ],
        tokenStack: [],
        config,
        enter,
        exit: exit2,
        buffer,
        resume,
        data
      };
      const listStack = [];
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
          if (events[index2][0] === "enter") {
            listStack.push(index2);
          } else {
            const tail = listStack.pop();
            index2 = prepareList(events, tail, index2);
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        const handler = config[events[index2][0]];
        if (own$1.call(handler, events[index2][1].type)) {
          handler[events[index2][1].type].call(Object.assign({
            sliceSerialize: events[index2][2].sliceSerialize
          }, context), events[index2][1]);
        }
      }
      if (context.tokenStack.length > 0) {
        const tail = context.tokenStack[context.tokenStack.length - 1];
        const handler = tail[1] || defaultOnError;
        handler.call(context, void 0, tail[0]);
      }
      tree.position = {
        start: point(events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }),
        end: point(events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        })
      };
      index2 = -1;
      while (++index2 < config.transforms.length) {
        tree = config.transforms[index2](tree) || tree;
      }
      return tree;
    }
    function prepareList(events, start, length) {
      let index2 = start - 1;
      let containerBalance = -1;
      let listSpread = false;
      let listItem3;
      let lineIndex;
      let firstBlankLineIndex;
      let atMarker;
      while (++index2 <= length) {
        const event = events[index2];
        switch (event[1].type) {
          case "listUnordered":
          case "listOrdered":
          case "blockQuote": {
            if (event[0] === "enter") {
              containerBalance++;
            } else {
              containerBalance--;
            }
            atMarker = void 0;
            break;
          }
          case "lineEndingBlank": {
            if (event[0] === "enter") {
              if (listItem3 && !atMarker && !containerBalance && !firstBlankLineIndex) {
                firstBlankLineIndex = index2;
              }
              atMarker = void 0;
            }
            break;
          }
          case "linePrefix":
          case "listItemValue":
          case "listItemMarker":
          case "listItemPrefix":
          case "listItemPrefixWhitespace": {
            break;
          }
          default: {
            atMarker = void 0;
          }
        }
        if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
          if (listItem3) {
            let tailIndex = index2;
            lineIndex = void 0;
            while (tailIndex--) {
              const tailEvent = events[tailIndex];
              if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
                if (tailEvent[0] === "exit") continue;
                if (lineIndex) {
                  events[lineIndex][1].type = "lineEndingBlank";
                  listSpread = true;
                }
                tailEvent[1].type = "lineEnding";
                lineIndex = tailIndex;
              } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") ;
              else {
                break;
              }
            }
            if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
              listItem3._spread = true;
            }
            listItem3.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
            events.splice(lineIndex || index2, 0, [
              "exit",
              listItem3,
              event[2]
            ]);
            index2++;
            length++;
          }
          if (event[1].type === "listItemPrefix") {
            const item = {
              type: "listItem",
              _spread: false,
              start: Object.assign({}, event[1].start),
              end: void 0
            };
            listItem3 = item;
            events.splice(index2, 0, [
              "enter",
              item,
              event[2]
            ]);
            index2++;
            length++;
            firstBlankLineIndex = void 0;
            atMarker = true;
          }
        }
      }
      events[start][1]._spread = listSpread;
      return length;
    }
    function opener(create, and) {
      return open;
      function open(token) {
        enter.call(this, create(token), token);
        if (and) and.call(this, token);
      }
    }
    function buffer() {
      this.stack.push({
        type: "fragment",
        children: []
      });
    }
    function enter(node2, token, errorHandler) {
      const parent = this.stack[this.stack.length - 1];
      const siblings = parent.children;
      siblings.push(node2);
      this.stack.push(node2);
      this.tokenStack.push([
        token,
        errorHandler
      ]);
      node2.position = {
        start: point(token.start),
        end: void 0
      };
    }
    function closer(and) {
      return close;
      function close(token) {
        if (and) and.call(this, token);
        exit2.call(this, token);
      }
    }
    function exit2(token, onExitError) {
      const node2 = this.stack.pop();
      const open = this.tokenStack.pop();
      if (!open) {
        throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open");
      } else if (open[0].type !== token.type) {
        if (onExitError) {
          onExitError.call(this, token, open[0]);
        } else {
          const handler = open[1] || defaultOnError;
          handler.call(this, token, open[0]);
        }
      }
      node2.position.end = point(token.end);
    }
    function resume() {
      return toString(this.stack.pop());
    }
    function onenterlistordered() {
      this.data.expectingFirstListItemValue = true;
    }
    function onenterlistitemvalue(token) {
      if (this.data.expectingFirstListItemValue) {
        const ancestor = this.stack[this.stack.length - 2];
        ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
        this.data.expectingFirstListItemValue = void 0;
      }
    }
    function onexitcodefencedfenceinfo() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.lang = data2;
    }
    function onexitcodefencedfencemeta() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.meta = data2;
    }
    function onexitcodefencedfence() {
      if (this.data.flowCodeInside) return;
      this.buffer();
      this.data.flowCodeInside = true;
    }
    function onexitcodefenced() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
      this.data.flowCodeInside = void 0;
    }
    function onexitcodeindented() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2.replace(/(\r?\n|\r)$/g, "");
    }
    function onexitdefinitionlabelstring(token) {
      const label = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.label = label;
      node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    }
    function onexitdefinitiontitlestring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.title = data2;
    }
    function onexitdefinitiondestinationstring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.url = data2;
    }
    function onexitatxheadingsequence(token) {
      const node2 = this.stack[this.stack.length - 1];
      if (!node2.depth) {
        const depth = this.sliceSerialize(token).length;
        node2.depth = depth;
      }
    }
    function onexitsetextheadingtext() {
      this.data.setextHeadingSlurpLineEnding = true;
    }
    function onexitsetextheadinglinesequence(token) {
      const node2 = this.stack[this.stack.length - 1];
      node2.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
    }
    function onexitsetextheading() {
      this.data.setextHeadingSlurpLineEnding = void 0;
    }
    function onenterdata(token) {
      const node2 = this.stack[this.stack.length - 1];
      const siblings = node2.children;
      let tail = siblings[siblings.length - 1];
      if (!tail || tail.type !== "text") {
        tail = text2();
        tail.position = {
          start: point(token.start),
          end: void 0
        };
        siblings.push(tail);
      }
      this.stack.push(tail);
    }
    function onexitdata(token) {
      const tail = this.stack.pop();
      tail.value += this.sliceSerialize(token);
      tail.position.end = point(token.end);
    }
    function onexitlineending(token) {
      const context = this.stack[this.stack.length - 1];
      if (this.data.atHardBreak) {
        const tail = context.children[context.children.length - 1];
        tail.position.end = point(token.end);
        this.data.atHardBreak = void 0;
        return;
      }
      if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
        onenterdata.call(this, token);
        onexitdata.call(this, token);
      }
    }
    function onexithardbreak() {
      this.data.atHardBreak = true;
    }
    function onexithtmlflow() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexithtmltext() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexitcodetext() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexitlink() {
      const node2 = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const referenceType = this.data.referenceType || "shortcut";
        node2.type += "Reference";
        node2.referenceType = referenceType;
        delete node2.url;
        delete node2.title;
      } else {
        delete node2.identifier;
        delete node2.label;
      }
      this.data.referenceType = void 0;
    }
    function onexitimage() {
      const node2 = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const referenceType = this.data.referenceType || "shortcut";
        node2.type += "Reference";
        node2.referenceType = referenceType;
        delete node2.url;
        delete node2.title;
      } else {
        delete node2.identifier;
        delete node2.label;
      }
      this.data.referenceType = void 0;
    }
    function onexitlabeltext(token) {
      const string2 = this.sliceSerialize(token);
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.label = decodeString(string2);
      ancestor.identifier = normalizeIdentifier(string2).toLowerCase();
    }
    function onexitlabel() {
      const fragment = this.stack[this.stack.length - 1];
      const value = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      this.data.inReference = true;
      if (node2.type === "link") {
        const children = fragment.children;
        node2.children = children;
      } else {
        node2.alt = value;
      }
    }
    function onexitresourcedestinationstring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.url = data2;
    }
    function onexitresourcetitlestring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.title = data2;
    }
    function onexitresource() {
      this.data.inReference = void 0;
    }
    function onenterreference() {
      this.data.referenceType = "collapsed";
    }
    function onexitreferencestring(token) {
      const label = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.label = label;
      node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
      this.data.referenceType = "full";
    }
    function onexitcharacterreferencemarker(token) {
      this.data.characterReferenceType = token.type;
    }
    function onexitcharacterreferencevalue(token) {
      const data2 = this.sliceSerialize(token);
      const type = this.data.characterReferenceType;
      let value;
      if (type) {
        value = decodeNumericCharacterReference(data2, type === "characterReferenceMarkerNumeric" ? 10 : 16);
        this.data.characterReferenceType = void 0;
      } else {
        const result = decodeNamedCharacterReference(data2);
        value = result;
      }
      const tail = this.stack[this.stack.length - 1];
      tail.value += value;
    }
    function onexitcharacterreference(token) {
      const tail = this.stack.pop();
      tail.position.end = point(token.end);
    }
    function onexitautolinkprotocol(token) {
      onexitdata.call(this, token);
      const node2 = this.stack[this.stack.length - 1];
      node2.url = this.sliceSerialize(token);
    }
    function onexitautolinkemail(token) {
      onexitdata.call(this, token);
      const node2 = this.stack[this.stack.length - 1];
      node2.url = "mailto:" + this.sliceSerialize(token);
    }
    function blockQuote2() {
      return {
        type: "blockquote",
        children: []
      };
    }
    function codeFlow() {
      return {
        type: "code",
        lang: null,
        meta: null,
        value: ""
      };
    }
    function codeText2() {
      return {
        type: "inlineCode",
        value: ""
      };
    }
    function definition2() {
      return {
        type: "definition",
        identifier: "",
        label: null,
        title: null,
        url: ""
      };
    }
    function emphasis2() {
      return {
        type: "emphasis",
        children: []
      };
    }
    function heading2() {
      return {
        type: "heading",
        depth: 0,
        children: []
      };
    }
    function hardBreak2() {
      return {
        type: "break"
      };
    }
    function html2() {
      return {
        type: "html",
        value: ""
      };
    }
    function image2() {
      return {
        type: "image",
        title: null,
        url: "",
        alt: null
      };
    }
    function link2() {
      return {
        type: "link",
        title: null,
        url: "",
        children: []
      };
    }
    function list2(token) {
      return {
        type: "list",
        ordered: token.type === "listOrdered",
        start: null,
        spread: token._spread,
        children: []
      };
    }
    function listItem2(token) {
      return {
        type: "listItem",
        spread: token._spread,
        checked: null,
        children: []
      };
    }
    function paragraph2() {
      return {
        type: "paragraph",
        children: []
      };
    }
    function strong2() {
      return {
        type: "strong",
        children: []
      };
    }
    function text2() {
      return {
        type: "text",
        value: ""
      };
    }
    function thematicBreak2() {
      return {
        type: "thematicBreak"
      };
    }
  }
  function point(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }
  function configure(combined, extensions) {
    let index2 = -1;
    while (++index2 < extensions.length) {
      const value = extensions[index2];
      if (Array.isArray(value)) {
        configure(combined, value);
      } else {
        extension(combined, value);
      }
    }
  }
  function extension(combined, extension2) {
    let key;
    for (key in extension2) {
      if (own$1.call(extension2, key)) {
        switch (key) {
          case "canContainEols": {
            const right = extension2[key];
            if (right) {
              combined[key].push(...right);
            }
            break;
          }
          case "transforms": {
            const right = extension2[key];
            if (right) {
              combined[key].push(...right);
            }
            break;
          }
          case "enter":
          case "exit": {
            const right = extension2[key];
            if (right) {
              Object.assign(combined[key], right);
            }
            break;
          }
        }
      }
    }
  }
  function defaultOnError(left, right) {
    if (left) {
      throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open");
    } else {
      throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open");
    }
  }
  remarkParse = function(options) {
    const self = this;
    self.parser = parser;
    function parser(doc) {
      return fromMarkdown(doc, {
        ...self.data("settings"),
        ...options,
        extensions: self.data("micromarkExtensions") || [],
        mdastExtensions: self.data("fromMarkdownExtensions") || []
      });
    }
  };
  function bail(error) {
    if (error) {
      throw error;
    }
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  var toStr = Object.prototype.toString;
  var defineProperty = Object.defineProperty;
  var gOPD = Object.getOwnPropertyDescriptor;
  var isArray = function isArray2(arr) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(arr);
    }
    return toStr.call(arr) === "[object Array]";
  };
  var isPlainObject$1 = function isPlainObject2(obj) {
    if (!obj || toStr.call(obj) !== "[object Object]") {
      return false;
    }
    var hasOwnConstructor = hasOwn.call(obj, "constructor");
    var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
      return false;
    }
    var key;
    for (key in obj) {
    }
    return typeof key === "undefined" || hasOwn.call(obj, key);
  };
  var setProperty = function setProperty2(target, options) {
    if (defineProperty && options.name === "__proto__") {
      defineProperty(target, options.name, {
        enumerable: true,
        configurable: true,
        value: options.newValue,
        writable: true
      });
    } else {
      target[options.name] = options.newValue;
    }
  };
  var getProperty = function getProperty2(obj, name) {
    if (name === "__proto__") {
      if (!hasOwn.call(obj, name)) {
        return void 0;
      } else if (gOPD) {
        return gOPD(obj, name).value;
      }
    }
    return obj[name];
  };
  var extend = function extend2() {
    var options, name, src, copy, copyIsArray, clone;
    var target = arguments[0];
    var i = 1;
    var length = arguments.length;
    var deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    if (target == null || typeof target !== "object" && typeof target !== "function") {
      target = {};
    }
    for (; i < length; ++i) {
      options = arguments[i];
      if (options != null) {
        for (name in options) {
          src = getProperty(target, name);
          copy = getProperty(options, name);
          if (target !== copy) {
            if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && isArray(src) ? src : [];
              } else {
                clone = src && isPlainObject$1(src) ? src : {};
              }
              setProperty(target, {
                name,
                newValue: extend2(deep, clone, copy)
              });
            } else if (typeof copy !== "undefined") {
              setProperty(target, {
                name,
                newValue: copy
              });
            }
          }
        }
      }
    }
    return target;
  };
  const extend$1 = getDefaultExportFromCjs(extend);
  function isPlainObject(value) {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
  }
  function trough() {
    const fns = [];
    const pipeline = {
      run,
      use
    };
    return pipeline;
    function run(...values) {
      let middlewareIndex = -1;
      const callback = values.pop();
      if (typeof callback !== "function") {
        throw new TypeError("Expected function as last argument, not " + callback);
      }
      next(null, ...values);
      function next(error, ...output) {
        const fn = fns[++middlewareIndex];
        let index2 = -1;
        if (error) {
          callback(error);
          return;
        }
        while (++index2 < values.length) {
          if (output[index2] === null || output[index2] === void 0) {
            output[index2] = values[index2];
          }
        }
        values = output;
        if (fn) {
          wrap(fn, next)(...output);
        } else {
          callback(null, ...output);
        }
      }
    }
    function use(middelware) {
      if (typeof middelware !== "function") {
        throw new TypeError("Expected `middelware` to be a function, not " + middelware);
      }
      fns.push(middelware);
      return pipeline;
    }
  }
  function wrap(middleware, callback) {
    let called;
    return wrapped;
    function wrapped(...parameters) {
      const fnExpectsCallback = middleware.length > parameters.length;
      let result;
      if (fnExpectsCallback) {
        parameters.push(done);
      }
      try {
        result = middleware.apply(this, parameters);
      } catch (error) {
        const exception = error;
        if (fnExpectsCallback && called) {
          throw exception;
        }
        return done(exception);
      }
      if (!fnExpectsCallback) {
        if (result && result.then && typeof result.then === "function") {
          result.then(then, done);
        } else if (result instanceof Error) {
          done(result);
        } else {
          then(result);
        }
      }
    }
    function done(error, ...output) {
      if (!called) {
        called = true;
        callback(error, ...output);
      }
    }
    function then(value) {
      done(null, value);
    }
  }
  const minpath = {
    basename,
    dirname,
    extname,
    join,
    sep: "/"
  };
  function basename(path2, extname2) {
    if (extname2 !== void 0 && typeof extname2 !== "string") {
      throw new TypeError('"ext" argument must be a string');
    }
    assertPath$1(path2);
    let start = 0;
    let end = -1;
    let index2 = path2.length;
    let seenNonSlash;
    if (extname2 === void 0 || extname2.length === 0 || extname2.length > path2.length) {
      while (index2--) {
        if (path2.codePointAt(index2) === 47) {
          if (seenNonSlash) {
            start = index2 + 1;
            break;
          }
        } else if (end < 0) {
          seenNonSlash = true;
          end = index2 + 1;
        }
      }
      return end < 0 ? "" : path2.slice(start, end);
    }
    if (extname2 === path2) {
      return "";
    }
    let firstNonSlashEnd = -1;
    let extnameIndex = extname2.length - 1;
    while (index2--) {
      if (path2.codePointAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd < 0) {
          seenNonSlash = true;
          firstNonSlashEnd = index2 + 1;
        }
        if (extnameIndex > -1) {
          if (path2.codePointAt(index2) === extname2.codePointAt(extnameIndex--)) {
            if (extnameIndex < 0) {
              end = index2;
            }
          } else {
            extnameIndex = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) {
      end = firstNonSlashEnd;
    } else if (end < 0) {
      end = path2.length;
    }
    return path2.slice(start, end);
  }
  function dirname(path2) {
    assertPath$1(path2);
    if (path2.length === 0) {
      return ".";
    }
    let end = -1;
    let index2 = path2.length;
    let unmatchedSlash;
    while (--index2) {
      if (path2.codePointAt(index2) === 47) {
        if (unmatchedSlash) {
          end = index2;
          break;
        }
      } else if (!unmatchedSlash) {
        unmatchedSlash = true;
      }
    }
    return end < 0 ? path2.codePointAt(0) === 47 ? "/" : "." : end === 1 && path2.codePointAt(0) === 47 ? "//" : path2.slice(0, end);
  }
  function extname(path2) {
    assertPath$1(path2);
    let index2 = path2.length;
    let end = -1;
    let startPart = 0;
    let startDot = -1;
    let preDotState = 0;
    let unmatchedSlash;
    while (index2--) {
      const code2 = path2.codePointAt(index2);
      if (code2 === 47) {
        if (unmatchedSlash) {
          startPart = index2 + 1;
          break;
        }
        continue;
      }
      if (end < 0) {
        unmatchedSlash = true;
        end = index2 + 1;
      }
      if (code2 === 46) {
        if (startDot < 0) {
          startDot = index2;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot > -1) {
        preDotState = -1;
      }
    }
    if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path2.slice(startDot, end);
  }
  function join(...segments) {
    let index2 = -1;
    let joined;
    while (++index2 < segments.length) {
      assertPath$1(segments[index2]);
      if (segments[index2]) {
        joined = joined === void 0 ? segments[index2] : joined + "/" + segments[index2];
      }
    }
    return joined === void 0 ? "." : normalize(joined);
  }
  function normalize(path2) {
    assertPath$1(path2);
    const absolute = path2.codePointAt(0) === 47;
    let value = normalizeString(path2, !absolute);
    if (value.length === 0 && !absolute) {
      value = ".";
    }
    if (value.length > 0 && path2.codePointAt(path2.length - 1) === 47) {
      value += "/";
    }
    return absolute ? "/" + value : value;
  }
  function normalizeString(path2, allowAboveRoot) {
    let result = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let index2 = -1;
    let code2;
    let lastSlashIndex;
    while (++index2 <= path2.length) {
      if (index2 < path2.length) {
        code2 = path2.codePointAt(index2);
      } else if (code2 === 47) {
        break;
      } else {
        code2 = 47;
      }
      if (code2 === 47) {
        if (lastSlash === index2 - 1 || dots === 1) ;
        else if (lastSlash !== index2 - 1 && dots === 2) {
          if (result.length < 2 || lastSegmentLength !== 2 || result.codePointAt(result.length - 1) !== 46 || result.codePointAt(result.length - 2) !== 46) {
            if (result.length > 2) {
              lastSlashIndex = result.lastIndexOf("/");
              if (lastSlashIndex !== result.length - 1) {
                if (lastSlashIndex < 0) {
                  result = "";
                  lastSegmentLength = 0;
                } else {
                  result = result.slice(0, lastSlashIndex);
                  lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
                }
                lastSlash = index2;
                dots = 0;
                continue;
              }
            } else if (result.length > 0) {
              result = "";
              lastSegmentLength = 0;
              lastSlash = index2;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            result = result.length > 0 ? result + "/.." : "..";
            lastSegmentLength = 2;
          }
        } else {
          if (result.length > 0) {
            result += "/" + path2.slice(lastSlash + 1, index2);
          } else {
            result = path2.slice(lastSlash + 1, index2);
          }
          lastSegmentLength = index2 - lastSlash - 1;
        }
        lastSlash = index2;
        dots = 0;
      } else if (code2 === 46 && dots > -1) {
        dots++;
      } else {
        dots = -1;
      }
    }
    return result;
  }
  function assertPath$1(path2) {
    if (typeof path2 !== "string") {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path2));
    }
  }
  const minproc = {
    cwd
  };
  function cwd() {
    return "/";
  }
  function isUrl(fileUrlOrPath) {
    return Boolean(fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && fileUrlOrPath.auth === void 0);
  }
  function urlToPath(path2) {
    if (typeof path2 === "string") {
      path2 = new URL(path2);
    } else if (!isUrl(path2)) {
      const error = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + path2 + "`");
      error.code = "ERR_INVALID_ARG_TYPE";
      throw error;
    }
    if (path2.protocol !== "file:") {
      const error = new TypeError("The URL must be of scheme file");
      error.code = "ERR_INVALID_URL_SCHEME";
      throw error;
    }
    return getPathFromURLPosix(path2);
  }
  function getPathFromURLPosix(url) {
    if (url.hostname !== "") {
      const error = new TypeError('File URL host must be "localhost" or empty on darwin');
      error.code = "ERR_INVALID_FILE_URL_HOST";
      throw error;
    }
    const pathname = url.pathname;
    let index2 = -1;
    while (++index2 < pathname.length) {
      if (pathname.codePointAt(index2) === 37 && pathname.codePointAt(index2 + 1) === 50) {
        const third = pathname.codePointAt(index2 + 2);
        if (third === 70 || third === 102) {
          const error = new TypeError("File URL path must not include encoded / characters");
          error.code = "ERR_INVALID_FILE_URL_PATH";
          throw error;
        }
      }
    }
    return decodeURIComponent(pathname);
  }
  const order = [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ];
  VFile = class {
    constructor(value) {
      let options;
      if (!value) {
        options = {};
      } else if (isUrl(value)) {
        options = {
          path: value
        };
      } else if (typeof value === "string" || isUint8Array$1(value)) {
        options = {
          value
        };
      } else {
        options = value;
      }
      this.cwd = "cwd" in options ? "" : minproc.cwd();
      this.data = {};
      this.history = [];
      this.messages = [];
      this.value;
      this.map;
      this.result;
      this.stored;
      let index2 = -1;
      while (++index2 < order.length) {
        const field2 = order[index2];
        if (field2 in options && options[field2] !== void 0 && options[field2] !== null) {
          this[field2] = field2 === "history" ? [
            ...options[field2]
          ] : options[field2];
        }
      }
      let field;
      for (field in options) {
        if (!order.includes(field)) {
          this[field] = options[field];
        }
      }
    }
    get basename() {
      return typeof this.path === "string" ? minpath.basename(this.path) : void 0;
    }
    set basename(basename2) {
      assertNonEmpty(basename2, "basename");
      assertPart(basename2, "basename");
      this.path = minpath.join(this.dirname || "", basename2);
    }
    get dirname() {
      return typeof this.path === "string" ? minpath.dirname(this.path) : void 0;
    }
    set dirname(dirname2) {
      assertPath(this.basename, "dirname");
      this.path = minpath.join(dirname2 || "", this.basename);
    }
    get extname() {
      return typeof this.path === "string" ? minpath.extname(this.path) : void 0;
    }
    set extname(extname2) {
      assertPart(extname2, "extname");
      assertPath(this.dirname, "extname");
      if (extname2) {
        if (extname2.codePointAt(0) !== 46) {
          throw new Error("`extname` must start with `.`");
        }
        if (extname2.includes(".", 1)) {
          throw new Error("`extname` cannot contain multiple dots");
        }
      }
      this.path = minpath.join(this.dirname, this.stem + (extname2 || ""));
    }
    get path() {
      return this.history[this.history.length - 1];
    }
    set path(path2) {
      if (isUrl(path2)) {
        path2 = urlToPath(path2);
      }
      assertNonEmpty(path2, "path");
      if (this.path !== path2) {
        this.history.push(path2);
      }
    }
    get stem() {
      return typeof this.path === "string" ? minpath.basename(this.path, this.extname) : void 0;
    }
    set stem(stem) {
      assertNonEmpty(stem, "stem");
      assertPart(stem, "stem");
      this.path = minpath.join(this.dirname || "", stem + (this.extname || ""));
    }
    fail(causeOrReason, optionsOrParentOrPlace, origin) {
      const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
      message.fatal = true;
      throw message;
    }
    info(causeOrReason, optionsOrParentOrPlace, origin) {
      const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
      message.fatal = void 0;
      return message;
    }
    message(causeOrReason, optionsOrParentOrPlace, origin) {
      const message = new VFileMessage(causeOrReason, optionsOrParentOrPlace, origin);
      if (this.path) {
        message.name = this.path + ":" + message.name;
        message.file = this.path;
      }
      message.fatal = false;
      this.messages.push(message);
      return message;
    }
    toString(encoding) {
      if (this.value === void 0) {
        return "";
      }
      if (typeof this.value === "string") {
        return this.value;
      }
      const decoder = new TextDecoder(encoding || void 0);
      return decoder.decode(this.value);
    }
  };
  function assertPart(part, name) {
    if (part && part.includes(minpath.sep)) {
      throw new Error("`" + name + "` cannot be a path: did not expect `" + minpath.sep + "`");
    }
  }
  function assertNonEmpty(part, name) {
    if (!part) {
      throw new Error("`" + name + "` cannot be empty");
    }
  }
  function assertPath(path2, name) {
    if (!path2) {
      throw new Error("Setting `" + name + "` requires `path` to be set too");
    }
  }
  function isUint8Array$1(value) {
    return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
  }
  const CallableInstance = function(property) {
    const self = this;
    const constr = self.constructor;
    const proto = constr.prototype;
    const value = proto[property];
    const apply = function() {
      return value.apply(apply, arguments);
    };
    Object.setPrototypeOf(apply, proto);
    return apply;
  };
  const own = {}.hasOwnProperty;
  class Processor extends CallableInstance {
    constructor() {
      super("copy");
      this.Compiler = void 0;
      this.Parser = void 0;
      this.attachers = [];
      this.compiler = void 0;
      this.freezeIndex = -1;
      this.frozen = void 0;
      this.namespace = {};
      this.parser = void 0;
      this.transformers = trough();
    }
    copy() {
      const destination = new Processor();
      let index2 = -1;
      while (++index2 < this.attachers.length) {
        const attacher = this.attachers[index2];
        destination.use(...attacher);
      }
      destination.data(extend$1(true, {}, this.namespace));
      return destination;
    }
    data(key, value) {
      if (typeof key === "string") {
        if (arguments.length === 2) {
          assertUnfrozen("data", this.frozen);
          this.namespace[key] = value;
          return this;
        }
        return own.call(this.namespace, key) && this.namespace[key] || void 0;
      }
      if (key) {
        assertUnfrozen("data", this.frozen);
        this.namespace = key;
        return this;
      }
      return this.namespace;
    }
    freeze() {
      if (this.frozen) {
        return this;
      }
      const self = this;
      while (++this.freezeIndex < this.attachers.length) {
        const [attacher, ...options] = this.attachers[this.freezeIndex];
        if (options[0] === false) {
          continue;
        }
        if (options[0] === true) {
          options[0] = void 0;
        }
        const transformer = attacher.call(self, ...options);
        if (typeof transformer === "function") {
          this.transformers.use(transformer);
        }
      }
      this.frozen = true;
      this.freezeIndex = Number.POSITIVE_INFINITY;
      return this;
    }
    parse(file) {
      this.freeze();
      const realFile = vfile(file);
      const parser = this.parser || this.Parser;
      assertParser("parse", parser);
      return parser(String(realFile), realFile);
    }
    process(file, done) {
      const self = this;
      this.freeze();
      assertParser("process", this.parser || this.Parser);
      assertCompiler("process", this.compiler || this.Compiler);
      return done ? executor(void 0, done) : new Promise(executor);
      function executor(resolve, reject) {
        const realFile = vfile(file);
        const parseTree = self.parse(realFile);
        self.run(parseTree, realFile, function(error, tree, file2) {
          if (error || !tree || !file2) {
            return realDone(error);
          }
          const compileTree = tree;
          const compileResult = self.stringify(compileTree, file2);
          if (looksLikeAValue(compileResult)) {
            file2.value = compileResult;
          } else {
            file2.result = compileResult;
          }
          realDone(error, file2);
        });
        function realDone(error, file2) {
          if (error || !file2) {
            reject(error);
          } else if (resolve) {
            resolve(file2);
          } else {
            done(void 0, file2);
          }
        }
      }
    }
    processSync(file) {
      let complete = false;
      let result;
      this.freeze();
      assertParser("processSync", this.parser || this.Parser);
      assertCompiler("processSync", this.compiler || this.Compiler);
      this.process(file, realDone);
      assertDone("processSync", "process", complete);
      return result;
      function realDone(error, file2) {
        complete = true;
        bail(error);
        result = file2;
      }
    }
    run(tree, file, done) {
      assertNode(tree);
      this.freeze();
      const transformers = this.transformers;
      if (!done && typeof file === "function") {
        done = file;
        file = void 0;
      }
      return done ? executor(void 0, done) : new Promise(executor);
      function executor(resolve, reject) {
        const realFile = vfile(file);
        transformers.run(tree, realFile, realDone);
        function realDone(error, outputTree, file2) {
          const resultingTree = outputTree || tree;
          if (error) {
            reject(error);
          } else if (resolve) {
            resolve(resultingTree);
          } else {
            done(void 0, resultingTree, file2);
          }
        }
      }
    }
    runSync(tree, file) {
      let complete = false;
      let result;
      this.run(tree, file, realDone);
      assertDone("runSync", "run", complete);
      return result;
      function realDone(error, tree2) {
        bail(error);
        result = tree2;
        complete = true;
      }
    }
    stringify(tree, file) {
      this.freeze();
      const realFile = vfile(file);
      const compiler2 = this.compiler || this.Compiler;
      assertCompiler("stringify", compiler2);
      assertNode(tree);
      return compiler2(tree, realFile);
    }
    use(value, ...parameters) {
      const attachers = this.attachers;
      const namespace = this.namespace;
      assertUnfrozen("use", this.frozen);
      if (value === null || value === void 0) ;
      else if (typeof value === "function") {
        addPlugin(value, parameters);
      } else if (typeof value === "object") {
        if (Array.isArray(value)) {
          addList(value);
        } else {
          addPreset(value);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value + "`");
      }
      return this;
      function add(value2) {
        if (typeof value2 === "function") {
          addPlugin(value2, []);
        } else if (typeof value2 === "object") {
          if (Array.isArray(value2)) {
            const [plugin, ...parameters2] = value2;
            addPlugin(plugin, parameters2);
          } else {
            addPreset(value2);
          }
        } else {
          throw new TypeError("Expected usable value, not `" + value2 + "`");
        }
      }
      function addPreset(result) {
        if (!("plugins" in result) && !("settings" in result)) {
          throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
        }
        addList(result.plugins);
        if (result.settings) {
          namespace.settings = extend$1(true, namespace.settings, result.settings);
        }
      }
      function addList(plugins) {
        let index2 = -1;
        if (plugins === null || plugins === void 0) ;
        else if (Array.isArray(plugins)) {
          while (++index2 < plugins.length) {
            const thing = plugins[index2];
            add(thing);
          }
        } else {
          throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
        }
      }
      function addPlugin(plugin, parameters2) {
        let index2 = -1;
        let entryIndex = -1;
        while (++index2 < attachers.length) {
          if (attachers[index2][0] === plugin) {
            entryIndex = index2;
            break;
          }
        }
        if (entryIndex === -1) {
          attachers.push([
            plugin,
            ...parameters2
          ]);
        } else if (parameters2.length > 0) {
          let [primary, ...rest] = parameters2;
          const currentPrimary = attachers[entryIndex][1];
          if (isPlainObject(currentPrimary) && isPlainObject(primary)) {
            primary = extend$1(true, currentPrimary, primary);
          }
          attachers[entryIndex] = [
            plugin,
            primary,
            ...rest
          ];
        }
      }
    }
  }
  unified = new Processor().freeze();
  function assertParser(name, value) {
    if (typeof value !== "function") {
      throw new TypeError("Cannot `" + name + "` without `parser`");
    }
  }
  function assertCompiler(name, value) {
    if (typeof value !== "function") {
      throw new TypeError("Cannot `" + name + "` without `compiler`");
    }
  }
  function assertUnfrozen(name, frozen) {
    if (frozen) {
      throw new Error("Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
    }
  }
  function assertNode(node2) {
    if (!isPlainObject(node2) || typeof node2.type !== "string") {
      throw new TypeError("Expected node, got `" + node2 + "`");
    }
  }
  function assertDone(name, asyncName, complete) {
    if (!complete) {
      throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
    }
  }
  function vfile(value) {
    return looksLikeAVFile(value) ? value : new VFile(value);
  }
  function looksLikeAVFile(value) {
    return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
  }
  function looksLikeAValue(value) {
    return typeof value === "string" || isUint8Array(value);
  }
  function isUint8Array(value) {
    return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
  }
  function ccount(value, character) {
    const source = String(value);
    if (typeof character !== "string") {
      throw new TypeError("Expected character");
    }
    let count = 0;
    let index2 = source.indexOf(character);
    while (index2 !== -1) {
      count++;
      index2 = source.indexOf(character, index2 + character.length);
    }
    return count;
  }
  function escapeStringRegexp(string2) {
    if (typeof string2 !== "string") {
      throw new TypeError("Expected a string");
    }
    return string2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  function findAndReplace(tree, list2, options) {
    const settings = options || {};
    const ignored = convert(settings.ignore || []);
    const pairs = toPairs(list2);
    let pairIndex = -1;
    while (++pairIndex < pairs.length) {
      visitParents(tree, "text", visitor);
    }
    function visitor(node2, parents) {
      let index2 = -1;
      let grandparent;
      while (++index2 < parents.length) {
        const parent = parents[index2];
        const siblings = grandparent ? grandparent.children : void 0;
        if (ignored(parent, siblings ? siblings.indexOf(parent) : void 0, grandparent)) {
          return;
        }
        grandparent = parent;
      }
      if (grandparent) {
        return handler(node2, parents);
      }
    }
    function handler(node2, parents) {
      const parent = parents[parents.length - 1];
      const find = pairs[pairIndex][0];
      const replace2 = pairs[pairIndex][1];
      let start = 0;
      const siblings = parent.children;
      const index2 = siblings.indexOf(node2);
      let change = false;
      let nodes = [];
      find.lastIndex = 0;
      let match = find.exec(node2.value);
      while (match) {
        const position2 = match.index;
        const matchObject = {
          index: match.index,
          input: match.input,
          stack: [
            ...parents,
            node2
          ]
        };
        let value = replace2(...match, matchObject);
        if (typeof value === "string") {
          value = value.length > 0 ? {
            type: "text",
            value
          } : void 0;
        }
        if (value === false) {
          find.lastIndex = position2 + 1;
        } else {
          if (start !== position2) {
            nodes.push({
              type: "text",
              value: node2.value.slice(start, position2)
            });
          }
          if (Array.isArray(value)) {
            nodes.push(...value);
          } else if (value) {
            nodes.push(value);
          }
          start = position2 + match[0].length;
          change = true;
        }
        if (!find.global) {
          break;
        }
        match = find.exec(node2.value);
      }
      if (change) {
        if (start < node2.value.length) {
          nodes.push({
            type: "text",
            value: node2.value.slice(start)
          });
        }
        parent.children.splice(index2, 1, ...nodes);
      } else {
        nodes = [
          node2
        ];
      }
      return index2 + nodes.length;
    }
  }
  function toPairs(tupleOrList) {
    const result = [];
    if (!Array.isArray(tupleOrList)) {
      throw new TypeError("Expected find and replace tuple or list of tuples");
    }
    const list2 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [
      tupleOrList
    ];
    let index2 = -1;
    while (++index2 < list2.length) {
      const tuple = list2[index2];
      result.push([
        toExpression(tuple[0]),
        toFunction(tuple[1])
      ]);
    }
    return result;
  }
  function toExpression(find) {
    return typeof find === "string" ? new RegExp(escapeStringRegexp(find), "g") : find;
  }
  function toFunction(replace2) {
    return typeof replace2 === "function" ? replace2 : function() {
      return replace2;
    };
  }
  const inConstruct = "phrasing";
  const notInConstruct = [
    "autolink",
    "link",
    "image",
    "label"
  ];
  function gfmAutolinkLiteralFromMarkdown() {
    return {
      transforms: [
        transformGfmAutolinkLiterals
      ],
      enter: {
        literalAutolink: enterLiteralAutolink,
        literalAutolinkEmail: enterLiteralAutolinkValue,
        literalAutolinkHttp: enterLiteralAutolinkValue,
        literalAutolinkWww: enterLiteralAutolinkValue
      },
      exit: {
        literalAutolink: exitLiteralAutolink,
        literalAutolinkEmail: exitLiteralAutolinkEmail,
        literalAutolinkHttp: exitLiteralAutolinkHttp,
        literalAutolinkWww: exitLiteralAutolinkWww
      }
    };
  }
  function gfmAutolinkLiteralToMarkdown() {
    return {
      unsafe: [
        {
          character: "@",
          before: "[+\\-.\\w]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ".",
          before: "[Ww]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ":",
          before: "[ps]",
          after: "\\/",
          inConstruct,
          notInConstruct
        }
      ]
    };
  }
  function enterLiteralAutolink(token) {
    this.enter({
      type: "link",
      title: null,
      url: "",
      children: []
    }, token);
  }
  function enterLiteralAutolinkValue(token) {
    this.config.enter.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkHttp(token) {
    this.config.exit.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkWww(token) {
    this.config.exit.data.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "link");
    node2.url = "http://" + this.sliceSerialize(token);
  }
  function exitLiteralAutolinkEmail(token) {
    this.config.exit.autolinkEmail.call(this, token);
  }
  function exitLiteralAutolink(token) {
    this.exit(token);
  }
  function transformGfmAutolinkLiterals(tree) {
    findAndReplace(tree, [
      [
        /(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,
        findUrl
      ],
      [
        new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"),
        findEmail
      ]
    ], {
      ignore: [
        "link",
        "linkReference"
      ]
    });
  }
  function findUrl(_, protocol, domain2, path2, match) {
    let prefix = "";
    if (!previous(match)) {
      return false;
    }
    if (/^w/i.test(protocol)) {
      domain2 = protocol + domain2;
      protocol = "";
      prefix = "http://";
    }
    if (!isCorrectDomain(domain2)) {
      return false;
    }
    const parts = splitUrl(domain2 + path2);
    if (!parts[0]) return false;
    const result = {
      type: "link",
      title: null,
      url: prefix + protocol + parts[0],
      children: [
        {
          type: "text",
          value: protocol + parts[0]
        }
      ]
    };
    if (parts[1]) {
      return [
        result,
        {
          type: "text",
          value: parts[1]
        }
      ];
    }
    return result;
  }
  function findEmail(_, atext, label, match) {
    if (!previous(match, true) || /[-\d_]$/.test(label)) {
      return false;
    }
    return {
      type: "link",
      title: null,
      url: "mailto:" + atext + "@" + label,
      children: [
        {
          type: "text",
          value: atext + "@" + label
        }
      ]
    };
  }
  function isCorrectDomain(domain2) {
    const parts = domain2.split(".");
    if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
      return false;
    }
    return true;
  }
  function splitUrl(url) {
    const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
    if (!trailExec) {
      return [
        url,
        void 0
      ];
    }
    url = url.slice(0, trailExec.index);
    let trail2 = trailExec[0];
    let closingParenIndex = trail2.indexOf(")");
    const openingParens = ccount(url, "(");
    let closingParens = ccount(url, ")");
    while (closingParenIndex !== -1 && openingParens > closingParens) {
      url += trail2.slice(0, closingParenIndex + 1);
      trail2 = trail2.slice(closingParenIndex + 1);
      closingParenIndex = trail2.indexOf(")");
      closingParens++;
    }
    return [
      url,
      trail2
    ];
  }
  function previous(match, email) {
    const code2 = match.input.charCodeAt(match.index - 1);
    return (match.index === 0 || unicodeWhitespace(code2) || unicodePunctuation(code2)) && (!email || code2 !== 47);
  }
  footnoteReference.peek = footnoteReferencePeek;
  function gfmFootnoteFromMarkdown() {
    return {
      enter: {
        gfmFootnoteDefinition: enterFootnoteDefinition,
        gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
        gfmFootnoteCall: enterFootnoteCall,
        gfmFootnoteCallString: enterFootnoteCallString
      },
      exit: {
        gfmFootnoteDefinition: exitFootnoteDefinition,
        gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
        gfmFootnoteCall: exitFootnoteCall,
        gfmFootnoteCallString: exitFootnoteCallString
      }
    };
  }
  function gfmFootnoteToMarkdown() {
    return {
      unsafe: [
        {
          character: "[",
          inConstruct: [
            "phrasing",
            "label",
            "reference"
          ]
        }
      ],
      handlers: {
        footnoteDefinition,
        footnoteReference
      }
    };
  }
  function enterFootnoteDefinition(token) {
    this.enter({
      type: "footnoteDefinition",
      identifier: "",
      label: "",
      children: []
    }, token);
  }
  function enterFootnoteDefinitionLabelString() {
    this.buffer();
  }
  function exitFootnoteDefinitionLabelString(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "footnoteDefinition");
    node2.label = label;
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
  }
  function exitFootnoteDefinition(token) {
    this.exit(token);
  }
  function enterFootnoteCall(token) {
    this.enter({
      type: "footnoteReference",
      identifier: "",
      label: ""
    }, token);
  }
  function enterFootnoteCallString() {
    this.buffer();
  }
  function exitFootnoteCallString(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "footnoteReference");
    node2.label = label;
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
  }
  function exitFootnoteCall(token) {
    this.exit(token);
  }
  function footnoteReference(node2, _, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move("[^");
    const exit2 = state.enter("footnoteReference");
    const subexit = state.enter("reference");
    value += tracker.move(state.safe(state.associationId(node2), {
      ...tracker.current(),
      before: value,
      after: "]"
    }));
    subexit();
    exit2();
    value += tracker.move("]");
    return value;
  }
  function footnoteReferencePeek() {
    return "[";
  }
  function footnoteDefinition(node2, _, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move("[^");
    const exit2 = state.enter("footnoteDefinition");
    const subexit = state.enter("label");
    value += tracker.move(state.safe(state.associationId(node2), {
      ...tracker.current(),
      before: value,
      after: "]"
    }));
    subexit();
    value += tracker.move("]:" + (node2.children && node2.children.length > 0 ? " " : ""));
    tracker.shift(4);
    value += tracker.move(state.indentLines(state.containerFlow(node2, tracker.current()), map$2));
    exit2();
    return value;
  }
  function map$2(line, index2, blank) {
    if (index2 === 0) {
      return line;
    }
    return (blank ? "" : "    ") + line;
  }
  const constructsWithoutStrikethrough = [
    "autolink",
    "destinationLiteral",
    "destinationRaw",
    "reference",
    "titleQuote",
    "titleApostrophe"
  ];
  handleDelete.peek = peekDelete;
  function gfmStrikethroughFromMarkdown() {
    return {
      canContainEols: [
        "delete"
      ],
      enter: {
        strikethrough: enterStrikethrough
      },
      exit: {
        strikethrough: exitStrikethrough
      }
    };
  }
  function gfmStrikethroughToMarkdown() {
    return {
      unsafe: [
        {
          character: "~",
          inConstruct: "phrasing",
          notInConstruct: constructsWithoutStrikethrough
        }
      ],
      handlers: {
        delete: handleDelete
      }
    };
  }
  function enterStrikethrough(token) {
    this.enter({
      type: "delete",
      children: []
    }, token);
  }
  function exitStrikethrough(token) {
    this.exit(token);
  }
  function handleDelete(node2, _, state, info) {
    const tracker = state.createTracker(info);
    const exit2 = state.enter("strikethrough");
    let value = tracker.move("~~");
    value += state.containerPhrasing(node2, {
      ...tracker.current(),
      before: value,
      after: "~"
    });
    value += tracker.move("~~");
    exit2();
    return value;
  }
  function peekDelete() {
    return "~";
  }
  function markdownTable(table, options = {}) {
    const align = (options.align || []).concat();
    const stringLength = options.stringLength || defaultStringLength;
    const alignments = [];
    const cellMatrix = [];
    const sizeMatrix = [];
    const longestCellByColumn = [];
    let mostCellsPerRow = 0;
    let rowIndex = -1;
    while (++rowIndex < table.length) {
      const row2 = [];
      const sizes2 = [];
      let columnIndex2 = -1;
      if (table[rowIndex].length > mostCellsPerRow) {
        mostCellsPerRow = table[rowIndex].length;
      }
      while (++columnIndex2 < table[rowIndex].length) {
        const cell = serialize(table[rowIndex][columnIndex2]);
        if (options.alignDelimiters !== false) {
          const size = stringLength(cell);
          sizes2[columnIndex2] = size;
          if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
            longestCellByColumn[columnIndex2] = size;
          }
        }
        row2.push(cell);
      }
      cellMatrix[rowIndex] = row2;
      sizeMatrix[rowIndex] = sizes2;
    }
    let columnIndex = -1;
    if (typeof align === "object" && "length" in align) {
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = toAlignment(align[columnIndex]);
      }
    } else {
      const code2 = toAlignment(align);
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = code2;
      }
    }
    columnIndex = -1;
    const row = [];
    const sizes = [];
    while (++columnIndex < mostCellsPerRow) {
      const code2 = alignments[columnIndex];
      let before = "";
      let after = "";
      if (code2 === 99) {
        before = ":";
        after = ":";
      } else if (code2 === 108) {
        before = ":";
      } else if (code2 === 114) {
        after = ":";
      }
      let size = options.alignDelimiters === false ? 1 : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);
      const cell = before + "-".repeat(size) + after;
      if (options.alignDelimiters !== false) {
        size = before.length + size + after.length;
        if (size > longestCellByColumn[columnIndex]) {
          longestCellByColumn[columnIndex] = size;
        }
        sizes[columnIndex] = size;
      }
      row[columnIndex] = cell;
    }
    cellMatrix.splice(1, 0, row);
    sizeMatrix.splice(1, 0, sizes);
    rowIndex = -1;
    const lines = [];
    while (++rowIndex < cellMatrix.length) {
      const row2 = cellMatrix[rowIndex];
      const sizes2 = sizeMatrix[rowIndex];
      columnIndex = -1;
      const line = [];
      while (++columnIndex < mostCellsPerRow) {
        const cell = row2[columnIndex] || "";
        let before = "";
        let after = "";
        if (options.alignDelimiters !== false) {
          const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
          const code2 = alignments[columnIndex];
          if (code2 === 114) {
            before = " ".repeat(size);
          } else if (code2 === 99) {
            if (size % 2) {
              before = " ".repeat(size / 2 + 0.5);
              after = " ".repeat(size / 2 - 0.5);
            } else {
              before = " ".repeat(size / 2);
              after = before;
            }
          } else {
            after = " ".repeat(size);
          }
        }
        if (options.delimiterStart !== false && !columnIndex) {
          line.push("|");
        }
        if (options.padding !== false && !(options.alignDelimiters === false && cell === "") && (options.delimiterStart !== false || columnIndex)) {
          line.push(" ");
        }
        if (options.alignDelimiters !== false) {
          line.push(before);
        }
        line.push(cell);
        if (options.alignDelimiters !== false) {
          line.push(after);
        }
        if (options.padding !== false) {
          line.push(" ");
        }
        if (options.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
          line.push("|");
        }
      }
      lines.push(options.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join(""));
    }
    return lines.join("\n");
  }
  function serialize(value) {
    return value === null || value === void 0 ? "" : String(value);
  }
  function defaultStringLength(value) {
    return value.length;
  }
  function toAlignment(value) {
    const code2 = typeof value === "string" ? value.codePointAt(0) : 0;
    return code2 === 67 || code2 === 99 ? 99 : code2 === 76 || code2 === 108 ? 108 : code2 === 82 || code2 === 114 ? 114 : 0;
  }
  function blockquote(node2, _, state, info) {
    const exit2 = state.enter("blockquote");
    const tracker = state.createTracker(info);
    tracker.move("> ");
    tracker.shift(2);
    const value = state.indentLines(state.containerFlow(node2, tracker.current()), map$1);
    exit2();
    return value;
  }
  function map$1(line, _, blank) {
    return ">" + (blank ? "" : " ") + line;
  }
  function patternInScope(stack, pattern) {
    return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
  }
  function listInScope(stack, list2, none) {
    if (typeof list2 === "string") {
      list2 = [
        list2
      ];
    }
    if (!list2 || list2.length === 0) {
      return none;
    }
    let index2 = -1;
    while (++index2 < list2.length) {
      if (stack.includes(list2[index2])) {
        return true;
      }
    }
    return false;
  }
  function hardBreak(_, _1, state, info) {
    let index2 = -1;
    while (++index2 < state.unsafe.length) {
      if (state.unsafe[index2].character === "\n" && patternInScope(state.stack, state.unsafe[index2])) {
        return /[ \t]/.test(info.before) ? "" : " ";
      }
    }
    return "\\\n";
  }
  function longestStreak(value, substring) {
    const source = String(value);
    let index2 = source.indexOf(substring);
    let expected = index2;
    let count = 0;
    let max = 0;
    if (typeof substring !== "string") {
      throw new TypeError("Expected substring");
    }
    while (index2 !== -1) {
      if (index2 === expected) {
        if (++count > max) {
          max = count;
        }
      } else {
        count = 1;
      }
      expected = index2 + substring.length;
      index2 = source.indexOf(substring, expected);
    }
    return max;
  }
  function formatCodeAsIndented(node2, state) {
    return Boolean(state.options.fences === false && node2.value && !node2.lang && /[^ \r\n]/.test(node2.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node2.value));
  }
  function checkFence(state) {
    const marker = state.options.fence || "`";
    if (marker !== "`" && marker !== "~") {
      throw new Error("Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`");
    }
    return marker;
  }
  function code$1(node2, _, state, info) {
    const marker = checkFence(state);
    const raw = node2.value || "";
    const suffix = marker === "`" ? "GraveAccent" : "Tilde";
    if (formatCodeAsIndented(node2, state)) {
      const exit3 = state.enter("codeIndented");
      const value2 = state.indentLines(raw, map);
      exit3();
      return value2;
    }
    const tracker = state.createTracker(info);
    const sequence2 = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
    const exit2 = state.enter("codeFenced");
    let value = tracker.move(sequence2);
    if (node2.lang) {
      const subexit = state.enter(`codeFencedLang${suffix}`);
      value += tracker.move(state.safe(node2.lang, {
        before: value,
        after: " ",
        encode: [
          "`"
        ],
        ...tracker.current()
      }));
      subexit();
    }
    if (node2.lang && node2.meta) {
      const subexit = state.enter(`codeFencedMeta${suffix}`);
      value += tracker.move(" ");
      value += tracker.move(state.safe(node2.meta, {
        before: value,
        after: "\n",
        encode: [
          "`"
        ],
        ...tracker.current()
      }));
      subexit();
    }
    value += tracker.move("\n");
    if (raw) {
      value += tracker.move(raw + "\n");
    }
    value += tracker.move(sequence2);
    exit2();
    return value;
  }
  function map(line, _, blank) {
    return (blank ? "" : "    ") + line;
  }
  function checkQuote(state) {
    const marker = state.options.quote || '"';
    if (marker !== '"' && marker !== "'") {
      throw new Error("Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`");
    }
    return marker;
  }
  function definition(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const exit2 = state.enter("definition");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("[");
    value += tracker.move(state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    }));
    value += tracker.move("]: ");
    subexit();
    if (!node2.url || /[\0- \u007F]/.test(node2.url)) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: ">",
        ...tracker.current()
      }));
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : "\n",
        ...tracker.current()
      }));
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      }));
      value += tracker.move(quote);
      subexit();
    }
    exit2();
    return value;
  }
  function checkEmphasis(state) {
    const marker = state.options.emphasis || "*";
    if (marker !== "*" && marker !== "_") {
      throw new Error("Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`");
    }
    return marker;
  }
  emphasis.peek = emphasisPeek;
  function emphasis(node2, _, state, info) {
    const marker = checkEmphasis(state);
    const exit2 = state.enter("emphasis");
    const tracker = state.createTracker(info);
    let value = tracker.move(marker);
    value += tracker.move(state.containerPhrasing(node2, {
      before: value,
      after: marker,
      ...tracker.current()
    }));
    value += tracker.move(marker);
    exit2();
    return value;
  }
  function emphasisPeek(_, _1, state) {
    return state.options.emphasis || "*";
  }
  function formatHeadingAsSetext(node2, state) {
    let literalWithBreak = false;
    visit(node2, function(node3) {
      if ("value" in node3 && /\r?\n|\r/.test(node3.value) || node3.type === "break") {
        literalWithBreak = true;
        return EXIT;
      }
    });
    return Boolean((!node2.depth || node2.depth < 3) && toString(node2) && (state.options.setext || literalWithBreak));
  }
  function heading(node2, _, state, info) {
    const rank = Math.max(Math.min(6, node2.depth || 1), 1);
    const tracker = state.createTracker(info);
    if (formatHeadingAsSetext(node2, state)) {
      const exit3 = state.enter("headingSetext");
      const subexit2 = state.enter("phrasing");
      const value2 = state.containerPhrasing(node2, {
        ...tracker.current(),
        before: "\n",
        after: "\n"
      });
      subexit2();
      exit3();
      return value2 + "\n" + (rank === 1 ? "=" : "-").repeat(value2.length - (Math.max(value2.lastIndexOf("\r"), value2.lastIndexOf("\n")) + 1));
    }
    const sequence2 = "#".repeat(rank);
    const exit2 = state.enter("headingAtx");
    const subexit = state.enter("phrasing");
    tracker.move(sequence2 + " ");
    let value = state.containerPhrasing(node2, {
      before: "# ",
      after: "\n",
      ...tracker.current()
    });
    if (/^[\t ]/.test(value)) {
      value = "&#x" + value.charCodeAt(0).toString(16).toUpperCase() + ";" + value.slice(1);
    }
    value = value ? sequence2 + " " + value : sequence2;
    if (state.options.closeAtx) {
      value += " " + sequence2;
    }
    subexit();
    exit2();
    return value;
  }
  html.peek = htmlPeek;
  function html(node2) {
    return node2.value || "";
  }
  function htmlPeek() {
    return "<";
  }
  image.peek = imagePeek;
  function image(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const exit2 = state.enter("image");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("![");
    value += tracker.move(state.safe(node2.alt, {
      before: value,
      after: "]",
      ...tracker.current()
    }));
    value += tracker.move("](");
    subexit();
    if (!node2.url && node2.title || /[\0- \u007F]/.test(node2.url)) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: ">",
        ...tracker.current()
      }));
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : ")",
        ...tracker.current()
      }));
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      }));
      value += tracker.move(quote);
      subexit();
    }
    value += tracker.move(")");
    exit2();
    return value;
  }
  function imagePeek() {
    return "!";
  }
  imageReference.peek = imageReferencePeek;
  function imageReference(node2, _, state, info) {
    const type = node2.referenceType;
    const exit2 = state.enter("imageReference");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("![");
    const alt = state.safe(node2.alt, {
      before: value,
      after: "]",
      ...tracker.current()
    });
    value += tracker.move(alt + "][");
    subexit();
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter("reference");
    const reference = state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit2();
    if (type === "full" || !alt || alt !== reference) {
      value += tracker.move(reference + "]");
    } else if (type === "shortcut") {
      value = value.slice(0, -1);
    } else {
      value += tracker.move("]");
    }
    return value;
  }
  function imageReferencePeek() {
    return "!";
  }
  inlineCode.peek = inlineCodePeek;
  function inlineCode(node2, _, state) {
    let value = node2.value || "";
    let sequence2 = "`";
    let index2 = -1;
    while (new RegExp("(^|[^`])" + sequence2 + "([^`]|$)").test(value)) {
      sequence2 += "`";
    }
    if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) {
      value = " " + value + " ";
    }
    while (++index2 < state.unsafe.length) {
      const pattern = state.unsafe[index2];
      const expression = state.compilePattern(pattern);
      let match;
      if (!pattern.atBreak) continue;
      while (match = expression.exec(value)) {
        let position2 = match.index;
        if (value.charCodeAt(position2) === 10 && value.charCodeAt(position2 - 1) === 13) {
          position2--;
        }
        value = value.slice(0, position2) + " " + value.slice(match.index + 1);
      }
    }
    return sequence2 + value + sequence2;
  }
  function inlineCodePeek() {
    return "`";
  }
  function formatLinkAsAutolink(node2, state) {
    const raw = toString(node2);
    return Boolean(!state.options.resourceLink && node2.url && !node2.title && node2.children && node2.children.length === 1 && node2.children[0].type === "text" && (raw === node2.url || "mailto:" + raw === node2.url) && /^[a-z][a-z+.-]+:/i.test(node2.url) && !/[\0- <>\u007F]/.test(node2.url));
  }
  link.peek = linkPeek;
  function link(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const tracker = state.createTracker(info);
    let exit2;
    let subexit;
    if (formatLinkAsAutolink(node2, state)) {
      const stack = state.stack;
      state.stack = [];
      exit2 = state.enter("autolink");
      let value2 = tracker.move("<");
      value2 += tracker.move(state.containerPhrasing(node2, {
        before: value2,
        after: ">",
        ...tracker.current()
      }));
      value2 += tracker.move(">");
      exit2();
      state.stack = stack;
      return value2;
    }
    exit2 = state.enter("link");
    subexit = state.enter("label");
    let value = tracker.move("[");
    value += tracker.move(state.containerPhrasing(node2, {
      before: value,
      after: "](",
      ...tracker.current()
    }));
    value += tracker.move("](");
    subexit();
    if (!node2.url && node2.title || /[\0- \u007F]/.test(node2.url)) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: ">",
        ...tracker.current()
      }));
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : ")",
        ...tracker.current()
      }));
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      }));
      value += tracker.move(quote);
      subexit();
    }
    value += tracker.move(")");
    exit2();
    return value;
  }
  function linkPeek(node2, _, state) {
    return formatLinkAsAutolink(node2, state) ? "<" : "[";
  }
  linkReference.peek = linkReferencePeek;
  function linkReference(node2, _, state, info) {
    const type = node2.referenceType;
    const exit2 = state.enter("linkReference");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("[");
    const text2 = state.containerPhrasing(node2, {
      before: value,
      after: "]",
      ...tracker.current()
    });
    value += tracker.move(text2 + "][");
    subexit();
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter("reference");
    const reference = state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit2();
    if (type === "full" || !text2 || text2 !== reference) {
      value += tracker.move(reference + "]");
    } else if (type === "shortcut") {
      value = value.slice(0, -1);
    } else {
      value += tracker.move("]");
    }
    return value;
  }
  function linkReferencePeek() {
    return "[";
  }
  function checkBullet(state) {
    const marker = state.options.bullet || "*";
    if (marker !== "*" && marker !== "+" && marker !== "-") {
      throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
    }
    return marker;
  }
  function checkBulletOther(state) {
    const bullet = checkBullet(state);
    const bulletOther = state.options.bulletOther;
    if (!bulletOther) {
      return bullet === "*" ? "-" : "*";
    }
    if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") {
      throw new Error("Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
    }
    if (bulletOther === bullet) {
      throw new Error("Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different");
    }
    return bulletOther;
  }
  function checkBulletOrdered(state) {
    const marker = state.options.bulletOrdered || ".";
    if (marker !== "." && marker !== ")") {
      throw new Error("Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`");
    }
    return marker;
  }
  function checkRule(state) {
    const marker = state.options.rule || "*";
    if (marker !== "*" && marker !== "-" && marker !== "_") {
      throw new Error("Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`");
    }
    return marker;
  }
  function list(node2, parent, state, info) {
    const exit2 = state.enter("list");
    const bulletCurrent = state.bulletCurrent;
    let bullet = node2.ordered ? checkBulletOrdered(state) : checkBullet(state);
    const bulletOther = node2.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
    let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
    if (!node2.ordered) {
      const firstListItem = node2.children ? node2.children[0] : void 0;
      if ((bullet === "*" || bullet === "-") && firstListItem && (!firstListItem.children || !firstListItem.children[0]) && state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) {
        useDifferentMarker = true;
      }
      if (checkRule(state) === bullet && firstListItem) {
        let index2 = -1;
        while (++index2 < node2.children.length) {
          const item = node2.children[index2];
          if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
            useDifferentMarker = true;
            break;
          }
        }
      }
    }
    if (useDifferentMarker) {
      bullet = bulletOther;
    }
    state.bulletCurrent = bullet;
    const value = state.containerFlow(node2, info);
    state.bulletLastUsed = bullet;
    state.bulletCurrent = bulletCurrent;
    exit2();
    return value;
  }
  function checkListItemIndent(state) {
    const style = state.options.listItemIndent || "one";
    if (style !== "tab" && style !== "one" && style !== "mixed") {
      throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
    }
    return style;
  }
  function listItem(node2, parent, state, info) {
    const listItemIndent = checkListItemIndent(state);
    let bullet = state.bulletCurrent || checkBullet(state);
    if (parent && parent.type === "list" && parent.ordered) {
      bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node2)) + bullet;
    }
    let size = bullet.length + 1;
    if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node2.spread)) {
      size = Math.ceil(size / 4) * 4;
    }
    const tracker = state.createTracker(info);
    tracker.move(bullet + " ".repeat(size - bullet.length));
    tracker.shift(size);
    const exit2 = state.enter("listItem");
    const value = state.indentLines(state.containerFlow(node2, tracker.current()), map2);
    exit2();
    return value;
    function map2(line, index2, blank) {
      if (index2) {
        return (blank ? "" : " ".repeat(size)) + line;
      }
      return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
    }
  }
  function paragraph(node2, _, state, info) {
    const exit2 = state.enter("paragraph");
    const subexit = state.enter("phrasing");
    const value = state.containerPhrasing(node2, info);
    subexit();
    exit2();
    return value;
  }
  const phrasing = convert([
    "break",
    "delete",
    "emphasis",
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    "inlineMath",
    "link",
    "linkReference",
    "mdxJsxTextElement",
    "mdxTextExpression",
    "strong",
    "text",
    "textDirective"
  ]);
  function root(node2, _, state, info) {
    const hasPhrasing = node2.children.some(function(d) {
      return phrasing(d);
    });
    const fn = hasPhrasing ? state.containerPhrasing : state.containerFlow;
    return fn.call(state, node2, info);
  }
  function checkStrong(state) {
    const marker = state.options.strong || "*";
    if (marker !== "*" && marker !== "_") {
      throw new Error("Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`");
    }
    return marker;
  }
  strong.peek = strongPeek;
  function strong(node2, _, state, info) {
    const marker = checkStrong(state);
    const exit2 = state.enter("strong");
    const tracker = state.createTracker(info);
    let value = tracker.move(marker + marker);
    value += tracker.move(state.containerPhrasing(node2, {
      before: value,
      after: marker,
      ...tracker.current()
    }));
    value += tracker.move(marker + marker);
    exit2();
    return value;
  }
  function strongPeek(_, _1, state) {
    return state.options.strong || "*";
  }
  function text$1(node2, _, state, info) {
    return state.safe(node2.value, info);
  }
  function checkRuleRepetition(state) {
    const repetition = state.options.ruleRepetition || 3;
    if (repetition < 3) {
      throw new Error("Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more");
    }
    return repetition;
  }
  function thematicBreak(_, _1, state) {
    const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
    return state.options.ruleSpaces ? value.slice(0, -1) : value;
  }
  const handle = {
    blockquote,
    break: hardBreak,
    code: code$1,
    definition,
    emphasis,
    hardBreak,
    heading,
    html,
    image,
    imageReference,
    inlineCode,
    link,
    linkReference,
    list,
    listItem,
    paragraph,
    root,
    strong,
    text: text$1,
    thematicBreak
  };
  function gfmTableFromMarkdown() {
    return {
      enter: {
        table: enterTable,
        tableData: enterCell,
        tableHeader: enterCell,
        tableRow: enterRow
      },
      exit: {
        codeText: exitCodeText,
        table: exitTable,
        tableData: exit,
        tableHeader: exit,
        tableRow: exit
      }
    };
  }
  function enterTable(token) {
    const align = token._align;
    this.enter({
      type: "table",
      align: align.map(function(d) {
        return d === "none" ? null : d;
      }),
      children: []
    }, token);
    this.data.inTable = true;
  }
  function exitTable(token) {
    this.exit(token);
    this.data.inTable = void 0;
  }
  function enterRow(token) {
    this.enter({
      type: "tableRow",
      children: []
    }, token);
  }
  function exit(token) {
    this.exit(token);
  }
  function enterCell(token) {
    this.enter({
      type: "tableCell",
      children: []
    }, token);
  }
  function exitCodeText(token) {
    let value = this.resume();
    if (this.data.inTable) {
      value = value.replace(/\\([\\|])/g, replace);
    }
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "inlineCode");
    node2.value = value;
    this.exit(token);
  }
  function replace($0, $1) {
    return $1 === "|" ? $1 : $0;
  }
  function gfmTableToMarkdown(options) {
    const settings = options || {};
    const padding = settings.tableCellPadding;
    const alignDelimiters = settings.tablePipeAlign;
    const stringLength = settings.stringLength;
    const around = padding ? " " : "|";
    return {
      unsafe: [
        {
          character: "\r",
          inConstruct: "tableCell"
        },
        {
          character: "\n",
          inConstruct: "tableCell"
        },
        {
          atBreak: true,
          character: "|",
          after: "[	 :-]"
        },
        {
          character: "|",
          inConstruct: "tableCell"
        },
        {
          atBreak: true,
          character: ":",
          after: "-"
        },
        {
          atBreak: true,
          character: "-",
          after: "[:|-]"
        }
      ],
      handlers: {
        inlineCode: inlineCodeWithTable,
        table: handleTable,
        tableCell: handleTableCell,
        tableRow: handleTableRow
      }
    };
    function handleTable(node2, _, state, info) {
      return serializeData(handleTableAsData(node2, state, info), node2.align);
    }
    function handleTableRow(node2, _, state, info) {
      const row = handleTableRowAsData(node2, state, info);
      const value = serializeData([
        row
      ]);
      return value.slice(0, value.indexOf("\n"));
    }
    function handleTableCell(node2, _, state, info) {
      const exit2 = state.enter("tableCell");
      const subexit = state.enter("phrasing");
      const value = state.containerPhrasing(node2, {
        ...info,
        before: around,
        after: around
      });
      subexit();
      exit2();
      return value;
    }
    function serializeData(matrix, align) {
      return markdownTable(matrix, {
        align,
        alignDelimiters,
        padding,
        stringLength
      });
    }
    function handleTableAsData(node2, state, info) {
      const children = node2.children;
      let index2 = -1;
      const result = [];
      const subexit = state.enter("table");
      while (++index2 < children.length) {
        result[index2] = handleTableRowAsData(children[index2], state, info);
      }
      subexit();
      return result;
    }
    function handleTableRowAsData(node2, state, info) {
      const children = node2.children;
      let index2 = -1;
      const result = [];
      const subexit = state.enter("tableRow");
      while (++index2 < children.length) {
        result[index2] = handleTableCell(children[index2], node2, state, info);
      }
      subexit();
      return result;
    }
    function inlineCodeWithTable(node2, parent, state) {
      let value = handle.inlineCode(node2, parent, state);
      if (state.stack.includes("tableCell")) {
        value = value.replace(/\|/g, "\\$&");
      }
      return value;
    }
  }
  function gfmTaskListItemFromMarkdown() {
    return {
      exit: {
        taskListCheckValueChecked: exitCheck,
        taskListCheckValueUnchecked: exitCheck,
        paragraph: exitParagraphWithTaskListItem
      }
    };
  }
  function gfmTaskListItemToMarkdown() {
    return {
      unsafe: [
        {
          atBreak: true,
          character: "-",
          after: "[:|-]"
        }
      ],
      handlers: {
        listItem: listItemWithTaskListItem
      }
    };
  }
  function exitCheck(token) {
    const node2 = this.stack[this.stack.length - 2];
    ok(node2.type === "listItem");
    node2.checked = token.type === "taskListCheckValueChecked";
  }
  function exitParagraphWithTaskListItem(token) {
    const parent = this.stack[this.stack.length - 2];
    if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
      const node2 = this.stack[this.stack.length - 1];
      ok(node2.type === "paragraph");
      const head = node2.children[0];
      if (head && head.type === "text") {
        const siblings = parent.children;
        let index2 = -1;
        let firstParaghraph;
        while (++index2 < siblings.length) {
          const sibling = siblings[index2];
          if (sibling.type === "paragraph") {
            firstParaghraph = sibling;
            break;
          }
        }
        if (firstParaghraph === node2) {
          head.value = head.value.slice(1);
          if (head.value.length === 0) {
            node2.children.shift();
          } else if (node2.position && head.position && typeof head.position.start.offset === "number") {
            head.position.start.column++;
            head.position.start.offset++;
            node2.position.start = Object.assign({}, head.position.start);
          }
        }
      }
    }
    this.exit(token);
  }
  function listItemWithTaskListItem(node2, parent, state, info) {
    const head = node2.children[0];
    const checkable = typeof node2.checked === "boolean" && head && head.type === "paragraph";
    const checkbox = "[" + (node2.checked ? "x" : " ") + "] ";
    const tracker = state.createTracker(info);
    if (checkable) {
      tracker.move(checkbox);
    }
    let value = handle.listItem(node2, parent, state, {
      ...info,
      ...tracker.current()
    });
    if (checkable) {
      value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
    }
    return value;
    function check($0) {
      return $0 + checkbox;
    }
  }
  function gfmFromMarkdown() {
    return [
      gfmAutolinkLiteralFromMarkdown(),
      gfmFootnoteFromMarkdown(),
      gfmStrikethroughFromMarkdown(),
      gfmTableFromMarkdown(),
      gfmTaskListItemFromMarkdown()
    ];
  }
  function gfmToMarkdown(options) {
    return {
      extensions: [
        gfmAutolinkLiteralToMarkdown(),
        gfmFootnoteToMarkdown(),
        gfmStrikethroughToMarkdown(),
        gfmTableToMarkdown(options),
        gfmTaskListItemToMarkdown()
      ]
    };
  }
  const wwwPrefix = {
    tokenize: tokenizeWwwPrefix,
    partial: true
  };
  const domain = {
    tokenize: tokenizeDomain,
    partial: true
  };
  const path = {
    tokenize: tokenizePath,
    partial: true
  };
  const trail = {
    tokenize: tokenizeTrail,
    partial: true
  };
  const emailDomainDotTrail = {
    tokenize: tokenizeEmailDomainDotTrail,
    partial: true
  };
  const wwwAutolink = {
    name: "wwwAutolink",
    tokenize: tokenizeWwwAutolink,
    previous: previousWww
  };
  const protocolAutolink = {
    name: "protocolAutolink",
    tokenize: tokenizeProtocolAutolink,
    previous: previousProtocol
  };
  const emailAutolink = {
    name: "emailAutolink",
    tokenize: tokenizeEmailAutolink,
    previous: previousEmail
  };
  const text = {};
  function gfmAutolinkLiteral() {
    return {
      text
    };
  }
  let code = 48;
  while (code < 123) {
    text[code] = emailAutolink;
    code++;
    if (code === 58) code = 65;
    else if (code === 91) code = 97;
  }
  text[43] = emailAutolink;
  text[45] = emailAutolink;
  text[46] = emailAutolink;
  text[95] = emailAutolink;
  text[72] = [
    emailAutolink,
    protocolAutolink
  ];
  text[104] = [
    emailAutolink,
    protocolAutolink
  ];
  text[87] = [
    emailAutolink,
    wwwAutolink
  ];
  text[119] = [
    emailAutolink,
    wwwAutolink
  ];
  function tokenizeEmailAutolink(effects, ok2, nok) {
    const self = this;
    let dot;
    let data;
    return start;
    function start(code2) {
      if (!gfmAtext(code2) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) {
        return nok(code2);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkEmail");
      return atext(code2);
    }
    function atext(code2) {
      if (gfmAtext(code2)) {
        effects.consume(code2);
        return atext;
      }
      if (code2 === 64) {
        effects.consume(code2);
        return emailDomain;
      }
      return nok(code2);
    }
    function emailDomain(code2) {
      if (code2 === 46) {
        return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code2);
      }
      if (code2 === 45 || code2 === 95 || asciiAlphanumeric(code2)) {
        data = true;
        effects.consume(code2);
        return emailDomain;
      }
      return emailDomainAfter(code2);
    }
    function emailDomainDot(code2) {
      effects.consume(code2);
      dot = true;
      return emailDomain;
    }
    function emailDomainAfter(code2) {
      if (data && dot && asciiAlpha(self.previous)) {
        effects.exit("literalAutolinkEmail");
        effects.exit("literalAutolink");
        return ok2(code2);
      }
      return nok(code2);
    }
  }
  function tokenizeWwwAutolink(effects, ok2, nok) {
    const self = this;
    return wwwStart;
    function wwwStart(code2) {
      if (code2 !== 87 && code2 !== 119 || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) {
        return nok(code2);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkWww");
      return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code2);
    }
    function wwwAfter(code2) {
      effects.exit("literalAutolinkWww");
      effects.exit("literalAutolink");
      return ok2(code2);
    }
  }
  function tokenizeProtocolAutolink(effects, ok2, nok) {
    const self = this;
    let buffer = "";
    let seen = false;
    return protocolStart;
    function protocolStart(code2) {
      if ((code2 === 72 || code2 === 104) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
        effects.enter("literalAutolink");
        effects.enter("literalAutolinkHttp");
        buffer += String.fromCodePoint(code2);
        effects.consume(code2);
        return protocolPrefixInside;
      }
      return nok(code2);
    }
    function protocolPrefixInside(code2) {
      if (asciiAlpha(code2) && buffer.length < 5) {
        buffer += String.fromCodePoint(code2);
        effects.consume(code2);
        return protocolPrefixInside;
      }
      if (code2 === 58) {
        const protocol = buffer.toLowerCase();
        if (protocol === "http" || protocol === "https") {
          effects.consume(code2);
          return protocolSlashesInside;
        }
      }
      return nok(code2);
    }
    function protocolSlashesInside(code2) {
      if (code2 === 47) {
        effects.consume(code2);
        if (seen) {
          return afterProtocol;
        }
        seen = true;
        return protocolSlashesInside;
      }
      return nok(code2);
    }
    function afterProtocol(code2) {
      return code2 === null || asciiControl(code2) || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2) || unicodePunctuation(code2) ? nok(code2) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code2);
    }
    function protocolAfter(code2) {
      effects.exit("literalAutolinkHttp");
      effects.exit("literalAutolink");
      return ok2(code2);
    }
  }
  function tokenizeWwwPrefix(effects, ok2, nok) {
    let size = 0;
    return wwwPrefixInside;
    function wwwPrefixInside(code2) {
      if ((code2 === 87 || code2 === 119) && size < 3) {
        size++;
        effects.consume(code2);
        return wwwPrefixInside;
      }
      if (code2 === 46 && size === 3) {
        effects.consume(code2);
        return wwwPrefixAfter;
      }
      return nok(code2);
    }
    function wwwPrefixAfter(code2) {
      return code2 === null ? nok(code2) : ok2(code2);
    }
  }
  function tokenizeDomain(effects, ok2, nok) {
    let underscoreInLastSegment;
    let underscoreInLastLastSegment;
    let seen;
    return domainInside;
    function domainInside(code2) {
      if (code2 === 46 || code2 === 95) {
        return effects.check(trail, domainAfter, domainAtPunctuation)(code2);
      }
      if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2) || code2 !== 45 && unicodePunctuation(code2)) {
        return domainAfter(code2);
      }
      seen = true;
      effects.consume(code2);
      return domainInside;
    }
    function domainAtPunctuation(code2) {
      if (code2 === 95) {
        underscoreInLastSegment = true;
      } else {
        underscoreInLastLastSegment = underscoreInLastSegment;
        underscoreInLastSegment = void 0;
      }
      effects.consume(code2);
      return domainInside;
    }
    function domainAfter(code2) {
      if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
        return nok(code2);
      }
      return ok2(code2);
    }
  }
  function tokenizePath(effects, ok2) {
    let sizeOpen = 0;
    let sizeClose = 0;
    return pathInside;
    function pathInside(code2) {
      if (code2 === 40) {
        sizeOpen++;
        effects.consume(code2);
        return pathInside;
      }
      if (code2 === 41 && sizeClose < sizeOpen) {
        return pathAtPunctuation(code2);
      }
      if (code2 === 33 || code2 === 34 || code2 === 38 || code2 === 39 || code2 === 41 || code2 === 42 || code2 === 44 || code2 === 46 || code2 === 58 || code2 === 59 || code2 === 60 || code2 === 63 || code2 === 93 || code2 === 95 || code2 === 126) {
        return effects.check(trail, ok2, pathAtPunctuation)(code2);
      }
      if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
        return ok2(code2);
      }
      effects.consume(code2);
      return pathInside;
    }
    function pathAtPunctuation(code2) {
      if (code2 === 41) {
        sizeClose++;
      }
      effects.consume(code2);
      return pathInside;
    }
  }
  function tokenizeTrail(effects, ok2, nok) {
    return trail2;
    function trail2(code2) {
      if (code2 === 33 || code2 === 34 || code2 === 39 || code2 === 41 || code2 === 42 || code2 === 44 || code2 === 46 || code2 === 58 || code2 === 59 || code2 === 63 || code2 === 95 || code2 === 126) {
        effects.consume(code2);
        return trail2;
      }
      if (code2 === 38) {
        effects.consume(code2);
        return trailCharacterReferenceStart;
      }
      if (code2 === 93) {
        effects.consume(code2);
        return trailBracketAfter;
      }
      if (code2 === 60 || code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
        return ok2(code2);
      }
      return nok(code2);
    }
    function trailBracketAfter(code2) {
      if (code2 === null || code2 === 40 || code2 === 91 || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
        return ok2(code2);
      }
      return trail2(code2);
    }
    function trailCharacterReferenceStart(code2) {
      return asciiAlpha(code2) ? trailCharacterReferenceInside(code2) : nok(code2);
    }
    function trailCharacterReferenceInside(code2) {
      if (code2 === 59) {
        effects.consume(code2);
        return trail2;
      }
      if (asciiAlpha(code2)) {
        effects.consume(code2);
        return trailCharacterReferenceInside;
      }
      return nok(code2);
    }
  }
  function tokenizeEmailDomainDotTrail(effects, ok2, nok) {
    return start;
    function start(code2) {
      effects.consume(code2);
      return after;
    }
    function after(code2) {
      return asciiAlphanumeric(code2) ? nok(code2) : ok2(code2);
    }
  }
  function previousWww(code2) {
    return code2 === null || code2 === 40 || code2 === 42 || code2 === 95 || code2 === 91 || code2 === 93 || code2 === 126 || markdownLineEndingOrSpace(code2);
  }
  function previousProtocol(code2) {
    return !asciiAlpha(code2);
  }
  function previousEmail(code2) {
    return !(code2 === 47 || gfmAtext(code2));
  }
  function gfmAtext(code2) {
    return code2 === 43 || code2 === 45 || code2 === 46 || code2 === 95 || asciiAlphanumeric(code2);
  }
  function previousUnbalanced(events) {
    let index2 = events.length;
    let result = false;
    while (index2--) {
      const token = events[index2][1];
      if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
        result = true;
        break;
      }
      if (token._gfmAutolinkLiteralWalkedInto) {
        result = false;
        break;
      }
    }
    if (events.length > 0 && !result) {
      events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
    }
    return result;
  }
  const indent = {
    tokenize: tokenizeIndent,
    partial: true
  };
  function gfmFootnote() {
    return {
      document: {
        [91]: {
          name: "gfmFootnoteDefinition",
          tokenize: tokenizeDefinitionStart,
          continuation: {
            tokenize: tokenizeDefinitionContinuation
          },
          exit: gfmFootnoteDefinitionEnd
        }
      },
      text: {
        [91]: {
          name: "gfmFootnoteCall",
          tokenize: tokenizeGfmFootnoteCall
        },
        [93]: {
          name: "gfmPotentialFootnoteCall",
          add: "after",
          tokenize: tokenizePotentialGfmFootnoteCall,
          resolveTo: resolveToPotentialGfmFootnoteCall
        }
      }
    };
  }
  function tokenizePotentialGfmFootnoteCall(effects, ok2, nok) {
    const self = this;
    let index2 = self.events.length;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    let labelStart;
    while (index2--) {
      const token = self.events[index2][1];
      if (token.type === "labelImage") {
        labelStart = token;
        break;
      }
      if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
        break;
      }
    }
    return start;
    function start(code2) {
      if (!labelStart || !labelStart._balanced) {
        return nok(code2);
      }
      const id = normalizeIdentifier(self.sliceSerialize({
        start: labelStart.end,
        end: self.now()
      }));
      if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) {
        return nok(code2);
      }
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteCallLabelMarker");
      return ok2(code2);
    }
  }
  function resolveToPotentialGfmFootnoteCall(events, context) {
    let index2 = events.length;
    while (index2--) {
      if (events[index2][1].type === "labelImage" && events[index2][0] === "enter") {
        events[index2][1];
        break;
      }
    }
    events[index2 + 1][1].type = "data";
    events[index2 + 3][1].type = "gfmFootnoteCallLabelMarker";
    const call = {
      type: "gfmFootnoteCall",
      start: Object.assign({}, events[index2 + 3][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    const marker = {
      type: "gfmFootnoteCallMarker",
      start: Object.assign({}, events[index2 + 3][1].end),
      end: Object.assign({}, events[index2 + 3][1].end)
    };
    marker.end.column++;
    marker.end.offset++;
    marker.end._bufferIndex++;
    const string2 = {
      type: "gfmFootnoteCallString",
      start: Object.assign({}, marker.end),
      end: Object.assign({}, events[events.length - 1][1].start)
    };
    const chunk = {
      type: "chunkString",
      contentType: "string",
      start: Object.assign({}, string2.start),
      end: Object.assign({}, string2.end)
    };
    const replacement = [
      events[index2 + 1],
      events[index2 + 2],
      [
        "enter",
        call,
        context
      ],
      events[index2 + 3],
      events[index2 + 4],
      [
        "enter",
        marker,
        context
      ],
      [
        "exit",
        marker,
        context
      ],
      [
        "enter",
        string2,
        context
      ],
      [
        "enter",
        chunk,
        context
      ],
      [
        "exit",
        chunk,
        context
      ],
      [
        "exit",
        string2,
        context
      ],
      events[events.length - 2],
      events[events.length - 1],
      [
        "exit",
        call,
        context
      ]
    ];
    events.splice(index2, events.length - index2 + 1, ...replacement);
    return events;
  }
  function tokenizeGfmFootnoteCall(effects, ok2, nok) {
    const self = this;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    let size = 0;
    let data;
    return start;
    function start(code2) {
      effects.enter("gfmFootnoteCall");
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteCallLabelMarker");
      return callStart;
    }
    function callStart(code2) {
      if (code2 !== 94) return nok(code2);
      effects.enter("gfmFootnoteCallMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteCallMarker");
      effects.enter("gfmFootnoteCallString");
      effects.enter("chunkString").contentType = "string";
      return callData;
    }
    function callData(code2) {
      if (size > 999 || code2 === 93 && !data || code2 === null || code2 === 91 || markdownLineEndingOrSpace(code2)) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.exit("chunkString");
        const token = effects.exit("gfmFootnoteCallString");
        if (!defined.includes(normalizeIdentifier(self.sliceSerialize(token)))) {
          return nok(code2);
        }
        effects.enter("gfmFootnoteCallLabelMarker");
        effects.consume(code2);
        effects.exit("gfmFootnoteCallLabelMarker");
        effects.exit("gfmFootnoteCall");
        return ok2;
      }
      if (!markdownLineEndingOrSpace(code2)) {
        data = true;
      }
      size++;
      effects.consume(code2);
      return code2 === 92 ? callEscape : callData;
    }
    function callEscape(code2) {
      if (code2 === 91 || code2 === 92 || code2 === 93) {
        effects.consume(code2);
        size++;
        return callData;
      }
      return callData(code2);
    }
  }
  function tokenizeDefinitionStart(effects, ok2, nok) {
    const self = this;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    let identifier;
    let size = 0;
    let data;
    return start;
    function start(code2) {
      effects.enter("gfmFootnoteDefinition")._container = true;
      effects.enter("gfmFootnoteDefinitionLabel");
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code2);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      return labelAtMarker;
    }
    function labelAtMarker(code2) {
      if (code2 === 94) {
        effects.enter("gfmFootnoteDefinitionMarker");
        effects.consume(code2);
        effects.exit("gfmFootnoteDefinitionMarker");
        effects.enter("gfmFootnoteDefinitionLabelString");
        effects.enter("chunkString").contentType = "string";
        return labelInside;
      }
      return nok(code2);
    }
    function labelInside(code2) {
      if (size > 999 || code2 === 93 && !data || code2 === null || code2 === 91 || markdownLineEndingOrSpace(code2)) {
        return nok(code2);
      }
      if (code2 === 93) {
        effects.exit("chunkString");
        const token = effects.exit("gfmFootnoteDefinitionLabelString");
        identifier = normalizeIdentifier(self.sliceSerialize(token));
        effects.enter("gfmFootnoteDefinitionLabelMarker");
        effects.consume(code2);
        effects.exit("gfmFootnoteDefinitionLabelMarker");
        effects.exit("gfmFootnoteDefinitionLabel");
        return labelAfter;
      }
      if (!markdownLineEndingOrSpace(code2)) {
        data = true;
      }
      size++;
      effects.consume(code2);
      return code2 === 92 ? labelEscape : labelInside;
    }
    function labelEscape(code2) {
      if (code2 === 91 || code2 === 92 || code2 === 93) {
        effects.consume(code2);
        size++;
        return labelInside;
      }
      return labelInside(code2);
    }
    function labelAfter(code2) {
      if (code2 === 58) {
        effects.enter("definitionMarker");
        effects.consume(code2);
        effects.exit("definitionMarker");
        if (!defined.includes(identifier)) {
          defined.push(identifier);
        }
        return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
      }
      return nok(code2);
    }
    function whitespaceAfter(code2) {
      return ok2(code2);
    }
  }
  function tokenizeDefinitionContinuation(effects, ok2, nok) {
    return effects.check(blankLine, ok2, effects.attempt(indent, ok2, nok));
  }
  function gfmFootnoteDefinitionEnd(effects) {
    effects.exit("gfmFootnoteDefinition");
  }
  function tokenizeIndent(effects, ok2, nok) {
    const self = this;
    return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 4 + 1);
    function afterPrefix(code2) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok2(code2) : nok(code2);
    }
  }
  function gfmStrikethrough(options) {
    const options_ = options || {};
    let single = options_.singleTilde;
    const tokenizer = {
      name: "strikethrough",
      tokenize: tokenizeStrikethrough,
      resolveAll: resolveAllStrikethrough
    };
    if (single === null || single === void 0) {
      single = true;
    }
    return {
      text: {
        [126]: tokenizer
      },
      insideSpan: {
        null: [
          tokenizer
        ]
      },
      attentionMarkers: {
        null: [
          126
        ]
      }
    };
    function resolveAllStrikethrough(events, context) {
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][0] === "enter" && events[index2][1].type === "strikethroughSequenceTemporary" && events[index2][1]._close) {
          let open = index2;
          while (open--) {
            if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index2][1].end.offset - events[index2][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
              events[index2][1].type = "strikethroughSequence";
              events[open][1].type = "strikethroughSequence";
              const strikethrough = {
                type: "strikethrough",
                start: Object.assign({}, events[open][1].start),
                end: Object.assign({}, events[index2][1].end)
              };
              const text2 = {
                type: "strikethroughText",
                start: Object.assign({}, events[open][1].end),
                end: Object.assign({}, events[index2][1].start)
              };
              const nextEvents = [
                [
                  "enter",
                  strikethrough,
                  context
                ],
                [
                  "enter",
                  events[open][1],
                  context
                ],
                [
                  "exit",
                  events[open][1],
                  context
                ],
                [
                  "enter",
                  text2,
                  context
                ]
              ];
              const insideSpan2 = context.parser.constructs.insideSpan.null;
              if (insideSpan2) {
                splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan2, events.slice(open + 1, index2), context));
              }
              splice(nextEvents, nextEvents.length, 0, [
                [
                  "exit",
                  text2,
                  context
                ],
                [
                  "enter",
                  events[index2][1],
                  context
                ],
                [
                  "exit",
                  events[index2][1],
                  context
                ],
                [
                  "exit",
                  strikethrough,
                  context
                ]
              ]);
              splice(events, open - 1, index2 - open + 3, nextEvents);
              index2 = open + nextEvents.length - 2;
              break;
            }
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === "strikethroughSequenceTemporary") {
          events[index2][1].type = "data";
        }
      }
      return events;
    }
    function tokenizeStrikethrough(effects, ok2, nok) {
      const previous2 = this.previous;
      const events = this.events;
      let size = 0;
      return start;
      function start(code2) {
        if (previous2 === 126 && events[events.length - 1][1].type !== "characterEscape") {
          return nok(code2);
        }
        effects.enter("strikethroughSequenceTemporary");
        return more(code2);
      }
      function more(code2) {
        const before = classifyCharacter(previous2);
        if (code2 === 126) {
          if (size > 1) return nok(code2);
          effects.consume(code2);
          size++;
          return more;
        }
        if (size < 2 && !single) return nok(code2);
        const token = effects.exit("strikethroughSequenceTemporary");
        const after = classifyCharacter(code2);
        token._open = !after || after === 2 && Boolean(before);
        token._close = !before || before === 2 && Boolean(after);
        return ok2(code2);
      }
    }
  }
  class EditMap {
    constructor() {
      this.map = [];
    }
    add(index2, remove, add) {
      addImplementation(this, index2, remove, add);
    }
    consume(events) {
      this.map.sort(function(a, b) {
        return a[0] - b[0];
      });
      if (this.map.length === 0) {
        return;
      }
      let index2 = this.map.length;
      const vecs = [];
      while (index2 > 0) {
        index2 -= 1;
        vecs.push(events.slice(this.map[index2][0] + this.map[index2][1]), this.map[index2][2]);
        events.length = this.map[index2][0];
      }
      vecs.push([
        ...events
      ]);
      events.length = 0;
      let slice = vecs.pop();
      while (slice) {
        events.push(...slice);
        slice = vecs.pop();
      }
      this.map.length = 0;
    }
  }
  function addImplementation(editMap, at, remove, add) {
    let index2 = 0;
    if (remove === 0 && add.length === 0) {
      return;
    }
    while (index2 < editMap.map.length) {
      if (editMap.map[index2][0] === at) {
        editMap.map[index2][1] += remove;
        editMap.map[index2][2].push(...add);
        return;
      }
      index2 += 1;
    }
    editMap.map.push([
      at,
      remove,
      add
    ]);
  }
  function gfmTableAlign(events, index2) {
    let inDelimiterRow = false;
    const align = [];
    while (index2 < events.length) {
      const event = events[index2];
      if (inDelimiterRow) {
        if (event[0] === "enter") {
          if (event[1].type === "tableContent") {
            align.push(events[index2 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
          }
        } else if (event[1].type === "tableContent") {
          if (events[index2 - 1][1].type === "tableDelimiterMarker") {
            const alignIndex = align.length - 1;
            align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
          }
        } else if (event[1].type === "tableDelimiterRow") {
          break;
        }
      } else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") {
        inDelimiterRow = true;
      }
      index2 += 1;
    }
    return align;
  }
  function gfmTable() {
    return {
      flow: {
        null: {
          name: "table",
          tokenize: tokenizeTable,
          resolveAll: resolveTable
        }
      }
    };
  }
  function tokenizeTable(effects, ok2, nok) {
    const self = this;
    let size = 0;
    let sizeB = 0;
    let seen;
    return start;
    function start(code2) {
      let index2 = self.events.length - 1;
      while (index2 > -1) {
        const type = self.events[index2][1].type;
        if (type === "lineEnding" || type === "linePrefix") index2--;
        else break;
      }
      const tail = index2 > -1 ? self.events[index2][1].type : null;
      const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
      if (next === bodyRowStart && self.parser.lazy[self.now().line]) {
        return nok(code2);
      }
      return next(code2);
    }
    function headRowBefore(code2) {
      effects.enter("tableHead");
      effects.enter("tableRow");
      return headRowStart(code2);
    }
    function headRowStart(code2) {
      if (code2 === 124) {
        return headRowBreak(code2);
      }
      seen = true;
      sizeB += 1;
      return headRowBreak(code2);
    }
    function headRowBreak(code2) {
      if (code2 === null) {
        return nok(code2);
      }
      if (markdownLineEnding(code2)) {
        if (sizeB > 1) {
          sizeB = 0;
          self.interrupt = true;
          effects.exit("tableRow");
          effects.enter("lineEnding");
          effects.consume(code2);
          effects.exit("lineEnding");
          return headDelimiterStart;
        }
        return nok(code2);
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, headRowBreak, "whitespace")(code2);
      }
      sizeB += 1;
      if (seen) {
        seen = false;
        size += 1;
      }
      if (code2 === 124) {
        effects.enter("tableCellDivider");
        effects.consume(code2);
        effects.exit("tableCellDivider");
        seen = true;
        return headRowBreak;
      }
      effects.enter("data");
      return headRowData(code2);
    }
    function headRowData(code2) {
      if (code2 === null || code2 === 124 || markdownLineEndingOrSpace(code2)) {
        effects.exit("data");
        return headRowBreak(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? headRowEscape : headRowData;
    }
    function headRowEscape(code2) {
      if (code2 === 92 || code2 === 124) {
        effects.consume(code2);
        return headRowData;
      }
      return headRowData(code2);
    }
    function headDelimiterStart(code2) {
      self.interrupt = false;
      if (self.parser.lazy[self.now().line]) {
        return nok(code2);
      }
      effects.enter("tableDelimiterRow");
      seen = false;
      if (markdownSpace(code2)) {
        return factorySpace(effects, headDelimiterBefore, "linePrefix", self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code2);
      }
      return headDelimiterBefore(code2);
    }
    function headDelimiterBefore(code2) {
      if (code2 === 45 || code2 === 58) {
        return headDelimiterValueBefore(code2);
      }
      if (code2 === 124) {
        seen = true;
        effects.enter("tableCellDivider");
        effects.consume(code2);
        effects.exit("tableCellDivider");
        return headDelimiterCellBefore;
      }
      return headDelimiterNok(code2);
    }
    function headDelimiterCellBefore(code2) {
      if (markdownSpace(code2)) {
        return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code2);
      }
      return headDelimiterValueBefore(code2);
    }
    function headDelimiterValueBefore(code2) {
      if (code2 === 58) {
        sizeB += 1;
        seen = true;
        effects.enter("tableDelimiterMarker");
        effects.consume(code2);
        effects.exit("tableDelimiterMarker");
        return headDelimiterLeftAlignmentAfter;
      }
      if (code2 === 45) {
        sizeB += 1;
        return headDelimiterLeftAlignmentAfter(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        return headDelimiterCellAfter(code2);
      }
      return headDelimiterNok(code2);
    }
    function headDelimiterLeftAlignmentAfter(code2) {
      if (code2 === 45) {
        effects.enter("tableDelimiterFiller");
        return headDelimiterFiller(code2);
      }
      return headDelimiterNok(code2);
    }
    function headDelimiterFiller(code2) {
      if (code2 === 45) {
        effects.consume(code2);
        return headDelimiterFiller;
      }
      if (code2 === 58) {
        seen = true;
        effects.exit("tableDelimiterFiller");
        effects.enter("tableDelimiterMarker");
        effects.consume(code2);
        effects.exit("tableDelimiterMarker");
        return headDelimiterRightAlignmentAfter;
      }
      effects.exit("tableDelimiterFiller");
      return headDelimiterRightAlignmentAfter(code2);
    }
    function headDelimiterRightAlignmentAfter(code2) {
      if (markdownSpace(code2)) {
        return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code2);
      }
      return headDelimiterCellAfter(code2);
    }
    function headDelimiterCellAfter(code2) {
      if (code2 === 124) {
        return headDelimiterBefore(code2);
      }
      if (code2 === null || markdownLineEnding(code2)) {
        if (!seen || size !== sizeB) {
          return headDelimiterNok(code2);
        }
        effects.exit("tableDelimiterRow");
        effects.exit("tableHead");
        return ok2(code2);
      }
      return headDelimiterNok(code2);
    }
    function headDelimiterNok(code2) {
      return nok(code2);
    }
    function bodyRowStart(code2) {
      effects.enter("tableRow");
      return bodyRowBreak(code2);
    }
    function bodyRowBreak(code2) {
      if (code2 === 124) {
        effects.enter("tableCellDivider");
        effects.consume(code2);
        effects.exit("tableCellDivider");
        return bodyRowBreak;
      }
      if (code2 === null || markdownLineEnding(code2)) {
        effects.exit("tableRow");
        return ok2(code2);
      }
      if (markdownSpace(code2)) {
        return factorySpace(effects, bodyRowBreak, "whitespace")(code2);
      }
      effects.enter("data");
      return bodyRowData(code2);
    }
    function bodyRowData(code2) {
      if (code2 === null || code2 === 124 || markdownLineEndingOrSpace(code2)) {
        effects.exit("data");
        return bodyRowBreak(code2);
      }
      effects.consume(code2);
      return code2 === 92 ? bodyRowEscape : bodyRowData;
    }
    function bodyRowEscape(code2) {
      if (code2 === 92 || code2 === 124) {
        effects.consume(code2);
        return bodyRowData;
      }
      return bodyRowData(code2);
    }
  }
  function resolveTable(events, context) {
    let index2 = -1;
    let inFirstCellAwaitingPipe = true;
    let rowKind = 0;
    let lastCell = [
      0,
      0,
      0,
      0
    ];
    let cell = [
      0,
      0,
      0,
      0
    ];
    let afterHeadAwaitingFirstBodyRow = false;
    let lastTableEnd = 0;
    let currentTable;
    let currentBody;
    let currentCell;
    const map2 = new EditMap();
    while (++index2 < events.length) {
      const event = events[index2];
      const token = event[1];
      if (event[0] === "enter") {
        if (token.type === "tableHead") {
          afterHeadAwaitingFirstBodyRow = false;
          if (lastTableEnd !== 0) {
            flushTableEnd(map2, context, lastTableEnd, currentTable, currentBody);
            currentBody = void 0;
            lastTableEnd = 0;
          }
          currentTable = {
            type: "table",
            start: Object.assign({}, token.start),
            end: Object.assign({}, token.end)
          };
          map2.add(index2, 0, [
            [
              "enter",
              currentTable,
              context
            ]
          ]);
        } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
          inFirstCellAwaitingPipe = true;
          currentCell = void 0;
          lastCell = [
            0,
            0,
            0,
            0
          ];
          cell = [
            0,
            index2 + 1,
            0,
            0
          ];
          if (afterHeadAwaitingFirstBodyRow) {
            afterHeadAwaitingFirstBodyRow = false;
            currentBody = {
              type: "tableBody",
              start: Object.assign({}, token.start),
              end: Object.assign({}, token.end)
            };
            map2.add(index2, 0, [
              [
                "enter",
                currentBody,
                context
              ]
            ]);
          }
          rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
        } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
          inFirstCellAwaitingPipe = false;
          if (cell[2] === 0) {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map2, context, lastCell, rowKind, void 0, currentCell);
              lastCell = [
                0,
                0,
                0,
                0
              ];
            }
            cell[2] = index2;
          }
        } else if (token.type === "tableCellDivider") {
          if (inFirstCellAwaitingPipe) {
            inFirstCellAwaitingPipe = false;
          } else {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map2, context, lastCell, rowKind, void 0, currentCell);
            }
            lastCell = cell;
            cell = [
              lastCell[1],
              index2,
              0,
              0
            ];
          }
        }
      } else if (token.type === "tableHead") {
        afterHeadAwaitingFirstBodyRow = true;
        lastTableEnd = index2;
      } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
        lastTableEnd = index2;
        if (lastCell[1] !== 0) {
          cell[0] = cell[1];
          currentCell = flushCell(map2, context, lastCell, rowKind, index2, currentCell);
        } else if (cell[1] !== 0) {
          currentCell = flushCell(map2, context, cell, rowKind, index2, currentCell);
        }
        rowKind = 0;
      } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
        cell[3] = index2;
      }
    }
    if (lastTableEnd !== 0) {
      flushTableEnd(map2, context, lastTableEnd, currentTable, currentBody);
    }
    map2.consume(context.events);
    index2 = -1;
    while (++index2 < context.events.length) {
      const event = context.events[index2];
      if (event[0] === "enter" && event[1].type === "table") {
        event[1]._align = gfmTableAlign(context.events, index2);
      }
    }
    return events;
  }
  function flushCell(map2, context, range, rowKind, rowEnd, previousCell) {
    const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
    const valueName = "tableContent";
    if (range[0] !== 0) {
      previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
      map2.add(range[0], 0, [
        [
          "exit",
          previousCell,
          context
        ]
      ]);
    }
    const now = getPoint(context.events, range[1]);
    previousCell = {
      type: groupName,
      start: Object.assign({}, now),
      end: Object.assign({}, now)
    };
    map2.add(range[1], 0, [
      [
        "enter",
        previousCell,
        context
      ]
    ]);
    if (range[2] !== 0) {
      const relatedStart = getPoint(context.events, range[2]);
      const relatedEnd = getPoint(context.events, range[3]);
      const valueToken = {
        type: valueName,
        start: Object.assign({}, relatedStart),
        end: Object.assign({}, relatedEnd)
      };
      map2.add(range[2], 0, [
        [
          "enter",
          valueToken,
          context
        ]
      ]);
      if (rowKind !== 2) {
        const start = context.events[range[2]];
        const end = context.events[range[3]];
        start[1].end = Object.assign({}, end[1].end);
        start[1].type = "chunkText";
        start[1].contentType = "text";
        if (range[3] > range[2] + 1) {
          const a = range[2] + 1;
          const b = range[3] - range[2] - 1;
          map2.add(a, b, []);
        }
      }
      map2.add(range[3] + 1, 0, [
        [
          "exit",
          valueToken,
          context
        ]
      ]);
    }
    if (rowEnd !== void 0) {
      previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
      map2.add(rowEnd, 0, [
        [
          "exit",
          previousCell,
          context
        ]
      ]);
      previousCell = void 0;
    }
    return previousCell;
  }
  function flushTableEnd(map2, context, index2, table, tableBody) {
    const exits = [];
    const related = getPoint(context.events, index2);
    if (tableBody) {
      tableBody.end = Object.assign({}, related);
      exits.push([
        "exit",
        tableBody,
        context
      ]);
    }
    table.end = Object.assign({}, related);
    exits.push([
      "exit",
      table,
      context
    ]);
    map2.add(index2 + 1, 0, exits);
  }
  function getPoint(events, index2) {
    const event = events[index2];
    const side = event[0] === "enter" ? "start" : "end";
    return event[1][side];
  }
  const tasklistCheck = {
    name: "tasklistCheck",
    tokenize: tokenizeTasklistCheck
  };
  function gfmTaskListItem() {
    return {
      text: {
        [91]: tasklistCheck
      }
    };
  }
  function tokenizeTasklistCheck(effects, ok2, nok) {
    const self = this;
    return open;
    function open(code2) {
      if (self.previous !== null || !self._gfmTasklistFirstContentOfListItem) {
        return nok(code2);
      }
      effects.enter("taskListCheck");
      effects.enter("taskListCheckMarker");
      effects.consume(code2);
      effects.exit("taskListCheckMarker");
      return inside;
    }
    function inside(code2) {
      if (markdownLineEndingOrSpace(code2)) {
        effects.enter("taskListCheckValueUnchecked");
        effects.consume(code2);
        effects.exit("taskListCheckValueUnchecked");
        return close;
      }
      if (code2 === 88 || code2 === 120) {
        effects.enter("taskListCheckValueChecked");
        effects.consume(code2);
        effects.exit("taskListCheckValueChecked");
        return close;
      }
      return nok(code2);
    }
    function close(code2) {
      if (code2 === 93) {
        effects.enter("taskListCheckMarker");
        effects.consume(code2);
        effects.exit("taskListCheckMarker");
        effects.exit("taskListCheck");
        return after;
      }
      return nok(code2);
    }
    function after(code2) {
      if (markdownLineEnding(code2)) {
        return ok2(code2);
      }
      if (markdownSpace(code2)) {
        return effects.check({
          tokenize: spaceThenNonSpace
        }, ok2, nok)(code2);
      }
      return nok(code2);
    }
  }
  function spaceThenNonSpace(effects, ok2, nok) {
    return factorySpace(effects, after, "whitespace");
    function after(code2) {
      return code2 === null ? nok(code2) : ok2(code2);
    }
  }
  function gfm(options) {
    return combineExtensions([
      gfmAutolinkLiteral(),
      gfmFootnote(),
      gfmStrikethrough(options),
      gfmTable(),
      gfmTaskListItem()
    ]);
  }
  const emptyOptions = {};
  remarkGfm = function(options) {
    const self = this;
    const settings = options || emptyOptions;
    const data = self.data();
    const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
    const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
    micromarkExtensions.push(gfm(settings));
    fromMarkdownExtensions.push(gfmFromMarkdown());
    toMarkdownExtensions.push(gfmToMarkdown(settings));
  };
});
export {
  EXIT as E,
  SKIP as S,
  VFileMessage as V,
  __tla,
  remarkGfm as a,
  boolbase as b,
  convert as c,
  decodeNamedCharacterReference as d,
  esm as e,
  asciiAlphanumeric as f,
  VFile as g,
  unreachable as h,
  nthCheck as n,
  ok as o,
  remarkParse as r,
  unified as u,
  visit as v
};
