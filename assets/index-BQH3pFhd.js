import { az as Buffer, al as getDefaultExportFromCjs, a1 as React, r as reactExports, __tla as __tla_0 } from "./index-Bs2EL0Mm.js";
import { s as shimExports, __tla as __tla_1 } from "./use-llm-Kc_COJca.js";
let useChat;
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
  var marker = "vercel.ai.error";
  var symbol = Symbol.for(marker);
  var _a;
  var _AISDKError = class _AISDKError2 extends Error {
    constructor({ name: name14, message, cause }) {
      super(message);
      this[_a] = true;
      this.name = name14;
      this.cause = cause;
    }
    static isInstance(error) {
      return _AISDKError2.hasMarker(error, marker);
    }
    static hasMarker(error, marker15) {
      const markerSymbol = Symbol.for(marker15);
      return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
    }
  };
  _a = symbol;
  var AISDKError = _AISDKError;
  function getErrorMessage(error) {
    if (error == null) {
      return "unknown error";
    }
    if (typeof error === "string") {
      return error;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return JSON.stringify(error);
  }
  var name3 = "AI_InvalidArgumentError";
  var marker4 = `vercel.ai.error.${name3}`;
  var symbol4 = Symbol.for(marker4);
  var _a4;
  var InvalidArgumentError = class extends AISDKError {
    constructor({ message, cause, argument }) {
      super({
        name: name3,
        message,
        cause
      });
      this[_a4] = true;
      this.argument = argument;
    }
    static isInstance(error) {
      return AISDKError.hasMarker(error, marker4);
    }
  };
  _a4 = symbol4;
  var name6 = "AI_JSONParseError";
  var marker7 = `vercel.ai.error.${name6}`;
  var symbol7 = Symbol.for(marker7);
  var _a7;
  var JSONParseError = class extends AISDKError {
    constructor({ text, cause }) {
      super({
        name: name6,
        message: `JSON parsing failed: Text: ${text}.
Error message: ${getErrorMessage(cause)}`,
        cause
      });
      this[_a7] = true;
      this.text = text;
    }
    static isInstance(error) {
      return AISDKError.hasMarker(error, marker7);
    }
  };
  _a7 = symbol7;
  var name12 = "AI_TypeValidationError";
  var marker13 = `vercel.ai.error.${name12}`;
  var symbol13 = Symbol.for(marker13);
  var _a13;
  var _TypeValidationError = class _TypeValidationError2 extends AISDKError {
    constructor({ value, cause }) {
      super({
        name: name12,
        message: `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage(cause)}`,
        cause
      });
      this[_a13] = true;
      this.value = value;
    }
    static isInstance(error) {
      return AISDKError.hasMarker(error, marker13);
    }
    static wrap({ value, cause }) {
      return _TypeValidationError2.isInstance(cause) && cause.value === value ? cause : new _TypeValidationError2({
        value,
        cause
      });
    }
  };
  _a13 = symbol13;
  var TypeValidationError = _TypeValidationError;
  let customAlphabet = (alphabet, defaultSize = 21) => {
    return (size = defaultSize) => {
      let id = "";
      let i = size;
      while (i--) {
        id += alphabet[Math.random() * alphabet.length | 0];
      }
      return id;
    };
  };
  var secureJsonParse = {
    exports: {}
  };
  const hasBuffer = typeof Buffer !== "undefined";
  const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
  const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
  function _parse(text, reviver, options) {
    if (options == null) {
      if (reviver !== null && typeof reviver === "object") {
        options = reviver;
        reviver = void 0;
      }
    }
    if (hasBuffer && Buffer.isBuffer(text)) {
      text = text.toString();
    }
    if (text && text.charCodeAt(0) === 65279) {
      text = text.slice(1);
    }
    const obj = JSON.parse(text, reviver);
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    const protoAction = options && options.protoAction || "error";
    const constructorAction = options && options.constructorAction || "error";
    if (protoAction === "ignore" && constructorAction === "ignore") {
      return obj;
    }
    if (protoAction !== "ignore" && constructorAction !== "ignore") {
      if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
        return obj;
      }
    } else if (protoAction !== "ignore" && constructorAction === "ignore") {
      if (suspectProtoRx.test(text) === false) {
        return obj;
      }
    } else {
      if (suspectConstructorRx.test(text) === false) {
        return obj;
      }
    }
    return filter(obj, {
      protoAction,
      constructorAction,
      safe: options && options.safe
    });
  }
  function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
    let next = [
      obj
    ];
    while (next.length) {
      const nodes = next;
      next = [];
      for (const node of nodes) {
        if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
          if (safe === true) {
            return null;
          } else if (protoAction === "error") {
            throw new SyntaxError("Object contains forbidden prototype property");
          }
          delete node.__proto__;
        }
        if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
          if (safe === true) {
            return null;
          } else if (constructorAction === "error") {
            throw new SyntaxError("Object contains forbidden prototype property");
          }
          delete node.constructor;
        }
        for (const key in node) {
          const value = node[key];
          if (value && typeof value === "object") {
            next.push(value);
          }
        }
      }
    }
    return obj;
  }
  function parse(text, reviver, options) {
    const stackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
      return _parse(text, reviver, options);
    } finally {
      Error.stackTraceLimit = stackTraceLimit;
    }
  }
  function safeParse(text, reviver) {
    const stackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    try {
      return _parse(text, reviver, {
        safe: true
      });
    } catch (_e) {
      return null;
    } finally {
      Error.stackTraceLimit = stackTraceLimit;
    }
  }
  secureJsonParse.exports = parse;
  secureJsonParse.exports.default = parse;
  secureJsonParse.exports.parse = parse;
  secureJsonParse.exports.safeParse = safeParse;
  secureJsonParse.exports.scan = filter;
  var secureJsonParseExports = secureJsonParse.exports;
  const SecureJSON = getDefaultExportFromCjs(secureJsonParseExports);
  var createIdGenerator = ({ prefix, size: defaultSize = 16, alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", separator = "-" } = {}) => {
    const generator = customAlphabet(alphabet, defaultSize);
    if (prefix == null) {
      return generator;
    }
    if (alphabet.includes(separator)) {
      throw new InvalidArgumentError({
        argument: "separator",
        message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
      });
    }
    return (size) => `${prefix}${separator}${generator(size)}`;
  };
  var generateId = createIdGenerator();
  var validatorSymbol = Symbol.for("vercel.ai.validator");
  function validator(validate) {
    return {
      [validatorSymbol]: true,
      validate
    };
  }
  function isValidator(value) {
    return typeof value === "object" && value !== null && validatorSymbol in value && value[validatorSymbol] === true && "validate" in value;
  }
  function asValidator(value) {
    return isValidator(value) ? value : zodValidator(value);
  }
  function zodValidator(zodSchema) {
    return validator((value) => {
      const result = zodSchema.safeParse(value);
      return result.success ? {
        success: true,
        value: result.data
      } : {
        success: false,
        error: result.error
      };
    });
  }
  function safeValidateTypes({ value, schema }) {
    const validator2 = asValidator(schema);
    try {
      if (validator2.validate == null) {
        return {
          success: true,
          value
        };
      }
      const result = validator2.validate(value);
      if (result.success) {
        return result;
      }
      return {
        success: false,
        error: TypeValidationError.wrap({
          value,
          cause: result.error
        })
      };
    } catch (error) {
      return {
        success: false,
        error: TypeValidationError.wrap({
          value,
          cause: error
        })
      };
    }
  }
  function safeParseJSON({ text, schema }) {
    try {
      const value = SecureJSON.parse(text);
      if (schema == null) {
        return {
          success: true,
          value
        };
      }
      return safeValidateTypes({
        value,
        schema
      });
    } catch (error) {
      return {
        success: false,
        error: JSONParseError.isInstance(error) ? error : new JSONParseError({
          text,
          cause: error
        })
      };
    }
  }
  var textStreamPart = {
    code: "0",
    name: "text",
    parse: (value) => {
      if (typeof value !== "string") {
        throw new Error('"text" parts expect a string value.');
      }
      return {
        type: "text",
        value
      };
    }
  };
  var errorStreamPart = {
    code: "3",
    name: "error",
    parse: (value) => {
      if (typeof value !== "string") {
        throw new Error('"error" parts expect a string value.');
      }
      return {
        type: "error",
        value
      };
    }
  };
  var assistantMessageStreamPart = {
    code: "4",
    name: "assistant_message",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("id" in value) || !("role" in value) || !("content" in value) || typeof value.id !== "string" || typeof value.role !== "string" || value.role !== "assistant" || !Array.isArray(value.content) || !value.content.every((item) => item != null && typeof item === "object" && "type" in item && item.type === "text" && "text" in item && item.text != null && typeof item.text === "object" && "value" in item.text && typeof item.text.value === "string")) {
        throw new Error('"assistant_message" parts expect an object with an "id", "role", and "content" property.');
      }
      return {
        type: "assistant_message",
        value
      };
    }
  };
  var assistantControlDataStreamPart = {
    code: "5",
    name: "assistant_control_data",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("threadId" in value) || !("messageId" in value) || typeof value.threadId !== "string" || typeof value.messageId !== "string") {
        throw new Error('"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.');
      }
      return {
        type: "assistant_control_data",
        value: {
          threadId: value.threadId,
          messageId: value.messageId
        }
      };
    }
  };
  var dataMessageStreamPart = {
    code: "6",
    name: "data_message",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("role" in value) || !("data" in value) || typeof value.role !== "string" || value.role !== "data") {
        throw new Error('"data_message" parts expect an object with a "role" and "data" property.');
      }
      return {
        type: "data_message",
        value
      };
    }
  };
  var assistantStreamParts = [
    textStreamPart,
    errorStreamPart,
    assistantMessageStreamPart,
    assistantControlDataStreamPart,
    dataMessageStreamPart
  ];
  ({
    [textStreamPart.code]: textStreamPart,
    [errorStreamPart.code]: errorStreamPart,
    [assistantMessageStreamPart.code]: assistantMessageStreamPart,
    [assistantControlDataStreamPart.code]: assistantControlDataStreamPart,
    [dataMessageStreamPart.code]: dataMessageStreamPart
  });
  ({
    [textStreamPart.name]: textStreamPart.code,
    [errorStreamPart.name]: errorStreamPart.code,
    [assistantMessageStreamPart.name]: assistantMessageStreamPart.code,
    [assistantControlDataStreamPart.name]: assistantControlDataStreamPart.code,
    [dataMessageStreamPart.name]: dataMessageStreamPart.code
  });
  assistantStreamParts.map((part) => part.code);
  function fixJson(input) {
    const stack = [
      "ROOT"
    ];
    let lastValidIndex = -1;
    let literalStart = null;
    function processValueStart(char, i, swapState) {
      {
        switch (char) {
          case '"': {
            lastValidIndex = i;
            stack.pop();
            stack.push(swapState);
            stack.push("INSIDE_STRING");
            break;
          }
          case "f":
          case "t":
          case "n": {
            lastValidIndex = i;
            literalStart = i;
            stack.pop();
            stack.push(swapState);
            stack.push("INSIDE_LITERAL");
            break;
          }
          case "-": {
            stack.pop();
            stack.push(swapState);
            stack.push("INSIDE_NUMBER");
            break;
          }
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            lastValidIndex = i;
            stack.pop();
            stack.push(swapState);
            stack.push("INSIDE_NUMBER");
            break;
          }
          case "{": {
            lastValidIndex = i;
            stack.pop();
            stack.push(swapState);
            stack.push("INSIDE_OBJECT_START");
            break;
          }
          case "[": {
            lastValidIndex = i;
            stack.pop();
            stack.push(swapState);
            stack.push("INSIDE_ARRAY_START");
            break;
          }
        }
      }
    }
    function processAfterObjectValue(char, i) {
      switch (char) {
        case ",": {
          stack.pop();
          stack.push("INSIDE_OBJECT_AFTER_COMMA");
          break;
        }
        case "}": {
          lastValidIndex = i;
          stack.pop();
          break;
        }
      }
    }
    function processAfterArrayValue(char, i) {
      switch (char) {
        case ",": {
          stack.pop();
          stack.push("INSIDE_ARRAY_AFTER_COMMA");
          break;
        }
        case "]": {
          lastValidIndex = i;
          stack.pop();
          break;
        }
      }
    }
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const currentState = stack[stack.length - 1];
      switch (currentState) {
        case "ROOT":
          processValueStart(char, i, "FINISH");
          break;
        case "INSIDE_OBJECT_START": {
          switch (char) {
            case '"': {
              stack.pop();
              stack.push("INSIDE_OBJECT_KEY");
              break;
            }
            case "}": {
              lastValidIndex = i;
              stack.pop();
              break;
            }
          }
          break;
        }
        case "INSIDE_OBJECT_AFTER_COMMA": {
          switch (char) {
            case '"': {
              stack.pop();
              stack.push("INSIDE_OBJECT_KEY");
              break;
            }
          }
          break;
        }
        case "INSIDE_OBJECT_KEY": {
          switch (char) {
            case '"': {
              stack.pop();
              stack.push("INSIDE_OBJECT_AFTER_KEY");
              break;
            }
          }
          break;
        }
        case "INSIDE_OBJECT_AFTER_KEY": {
          switch (char) {
            case ":": {
              stack.pop();
              stack.push("INSIDE_OBJECT_BEFORE_VALUE");
              break;
            }
          }
          break;
        }
        case "INSIDE_OBJECT_BEFORE_VALUE": {
          processValueStart(char, i, "INSIDE_OBJECT_AFTER_VALUE");
          break;
        }
        case "INSIDE_OBJECT_AFTER_VALUE": {
          processAfterObjectValue(char, i);
          break;
        }
        case "INSIDE_STRING": {
          switch (char) {
            case '"': {
              stack.pop();
              lastValidIndex = i;
              break;
            }
            case "\\": {
              stack.push("INSIDE_STRING_ESCAPE");
              break;
            }
            default: {
              lastValidIndex = i;
            }
          }
          break;
        }
        case "INSIDE_ARRAY_START": {
          switch (char) {
            case "]": {
              lastValidIndex = i;
              stack.pop();
              break;
            }
            default: {
              lastValidIndex = i;
              processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
              break;
            }
          }
          break;
        }
        case "INSIDE_ARRAY_AFTER_VALUE": {
          switch (char) {
            case ",": {
              stack.pop();
              stack.push("INSIDE_ARRAY_AFTER_COMMA");
              break;
            }
            case "]": {
              lastValidIndex = i;
              stack.pop();
              break;
            }
            default: {
              lastValidIndex = i;
              break;
            }
          }
          break;
        }
        case "INSIDE_ARRAY_AFTER_COMMA": {
          processValueStart(char, i, "INSIDE_ARRAY_AFTER_VALUE");
          break;
        }
        case "INSIDE_STRING_ESCAPE": {
          stack.pop();
          lastValidIndex = i;
          break;
        }
        case "INSIDE_NUMBER": {
          switch (char) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": {
              lastValidIndex = i;
              break;
            }
            case "e":
            case "E":
            case "-":
            case ".": {
              break;
            }
            case ",": {
              stack.pop();
              if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
                processAfterArrayValue(char, i);
              }
              if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
                processAfterObjectValue(char, i);
              }
              break;
            }
            case "}": {
              stack.pop();
              if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
                processAfterObjectValue(char, i);
              }
              break;
            }
            case "]": {
              stack.pop();
              if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
                processAfterArrayValue(char, i);
              }
              break;
            }
            default: {
              stack.pop();
              break;
            }
          }
          break;
        }
        case "INSIDE_LITERAL": {
          const partialLiteral = input.substring(literalStart, i + 1);
          if (!"false".startsWith(partialLiteral) && !"true".startsWith(partialLiteral) && !"null".startsWith(partialLiteral)) {
            stack.pop();
            if (stack[stack.length - 1] === "INSIDE_OBJECT_AFTER_VALUE") {
              processAfterObjectValue(char, i);
            } else if (stack[stack.length - 1] === "INSIDE_ARRAY_AFTER_VALUE") {
              processAfterArrayValue(char, i);
            }
          } else {
            lastValidIndex = i;
          }
          break;
        }
      }
    }
    let result = input.slice(0, lastValidIndex + 1);
    for (let i = stack.length - 1; i >= 0; i--) {
      const state = stack[i];
      switch (state) {
        case "INSIDE_STRING": {
          result += '"';
          break;
        }
        case "INSIDE_OBJECT_KEY":
        case "INSIDE_OBJECT_AFTER_KEY":
        case "INSIDE_OBJECT_AFTER_COMMA":
        case "INSIDE_OBJECT_START":
        case "INSIDE_OBJECT_BEFORE_VALUE":
        case "INSIDE_OBJECT_AFTER_VALUE": {
          result += "}";
          break;
        }
        case "INSIDE_ARRAY_START":
        case "INSIDE_ARRAY_AFTER_COMMA":
        case "INSIDE_ARRAY_AFTER_VALUE": {
          result += "]";
          break;
        }
        case "INSIDE_LITERAL": {
          const partialLiteral = input.substring(literalStart, input.length);
          if ("true".startsWith(partialLiteral)) {
            result += "true".slice(partialLiteral.length);
          } else if ("false".startsWith(partialLiteral)) {
            result += "false".slice(partialLiteral.length);
          } else if ("null".startsWith(partialLiteral)) {
            result += "null".slice(partialLiteral.length);
          }
        }
      }
    }
    return result;
  }
  function parsePartialJson(jsonText) {
    if (jsonText === void 0) {
      return {
        value: void 0,
        state: "undefined-input"
      };
    }
    let result = safeParseJSON({
      text: jsonText
    });
    if (result.success) {
      return {
        value: result.value,
        state: "successful-parse"
      };
    }
    result = safeParseJSON({
      text: fixJson(jsonText)
    });
    if (result.success) {
      return {
        value: result.value,
        state: "repaired-parse"
      };
    }
    return {
      value: void 0,
      state: "failed-parse"
    };
  }
  var textStreamPart2 = {
    code: "0",
    name: "text",
    parse: (value) => {
      if (typeof value !== "string") {
        throw new Error('"text" parts expect a string value.');
      }
      return {
        type: "text",
        value
      };
    }
  };
  var dataStreamPart = {
    code: "2",
    name: "data",
    parse: (value) => {
      if (!Array.isArray(value)) {
        throw new Error('"data" parts expect an array value.');
      }
      return {
        type: "data",
        value
      };
    }
  };
  var errorStreamPart2 = {
    code: "3",
    name: "error",
    parse: (value) => {
      if (typeof value !== "string") {
        throw new Error('"error" parts expect a string value.');
      }
      return {
        type: "error",
        value
      };
    }
  };
  var messageAnnotationsStreamPart = {
    code: "8",
    name: "message_annotations",
    parse: (value) => {
      if (!Array.isArray(value)) {
        throw new Error('"message_annotations" parts expect an array value.');
      }
      return {
        type: "message_annotations",
        value
      };
    }
  };
  var toolCallStreamPart = {
    code: "9",
    name: "tool_call",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string" || !("args" in value) || typeof value.args !== "object") {
        throw new Error('"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.');
      }
      return {
        type: "tool_call",
        value
      };
    }
  };
  var toolResultStreamPart = {
    code: "a",
    name: "tool_result",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("result" in value)) {
        throw new Error('"tool_result" parts expect an object with a "toolCallId" and a "result" property.');
      }
      return {
        type: "tool_result",
        value
      };
    }
  };
  var toolCallStreamingStartStreamPart = {
    code: "b",
    name: "tool_call_streaming_start",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string") {
        throw new Error('"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.');
      }
      return {
        type: "tool_call_streaming_start",
        value
      };
    }
  };
  var toolCallDeltaStreamPart = {
    code: "c",
    name: "tool_call_delta",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("argsTextDelta" in value) || typeof value.argsTextDelta !== "string") {
        throw new Error('"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.');
      }
      return {
        type: "tool_call_delta",
        value
      };
    }
  };
  var finishMessageStreamPart = {
    code: "d",
    name: "finish_message",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
        throw new Error('"finish_message" parts expect an object with a "finishReason" property.');
      }
      const result = {
        finishReason: value.finishReason
      };
      if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
        result.usage = {
          promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
          completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
        };
      }
      return {
        type: "finish_message",
        value: result
      };
    }
  };
  var finishStepStreamPart = {
    code: "e",
    name: "finish_step",
    parse: (value) => {
      if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
        throw new Error('"finish_step" parts expect an object with a "finishReason" property.');
      }
      const result = {
        finishReason: value.finishReason,
        isContinued: false
      };
      if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
        result.usage = {
          promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
          completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
        };
      }
      if ("isContinued" in value && typeof value.isContinued === "boolean") {
        result.isContinued = value.isContinued;
      }
      return {
        type: "finish_step",
        value: result
      };
    }
  };
  var dataStreamParts = [
    textStreamPart2,
    dataStreamPart,
    errorStreamPart2,
    messageAnnotationsStreamPart,
    toolCallStreamPart,
    toolResultStreamPart,
    toolCallStreamingStartStreamPart,
    toolCallDeltaStreamPart,
    finishMessageStreamPart,
    finishStepStreamPart
  ];
  var dataStreamPartsByCode = {
    [textStreamPart2.code]: textStreamPart2,
    [dataStreamPart.code]: dataStreamPart,
    [errorStreamPart2.code]: errorStreamPart2,
    [messageAnnotationsStreamPart.code]: messageAnnotationsStreamPart,
    [toolCallStreamPart.code]: toolCallStreamPart,
    [toolResultStreamPart.code]: toolResultStreamPart,
    [toolCallStreamingStartStreamPart.code]: toolCallStreamingStartStreamPart,
    [toolCallDeltaStreamPart.code]: toolCallDeltaStreamPart,
    [finishMessageStreamPart.code]: finishMessageStreamPart,
    [finishStepStreamPart.code]: finishStepStreamPart
  };
  ({
    [textStreamPart2.name]: textStreamPart2.code,
    [dataStreamPart.name]: dataStreamPart.code,
    [errorStreamPart2.name]: errorStreamPart2.code,
    [messageAnnotationsStreamPart.name]: messageAnnotationsStreamPart.code,
    [toolCallStreamPart.name]: toolCallStreamPart.code,
    [toolResultStreamPart.name]: toolResultStreamPart.code,
    [toolCallStreamingStartStreamPart.name]: toolCallStreamingStartStreamPart.code,
    [toolCallDeltaStreamPart.name]: toolCallDeltaStreamPart.code,
    [finishMessageStreamPart.name]: finishMessageStreamPart.code,
    [finishStepStreamPart.name]: finishStepStreamPart.code
  });
  var validCodes2 = dataStreamParts.map((part) => part.code);
  var parseDataStreamPart = (line) => {
    const firstSeparatorIndex = line.indexOf(":");
    if (firstSeparatorIndex === -1) {
      throw new Error("Failed to parse stream string. No separator found.");
    }
    const prefix = line.slice(0, firstSeparatorIndex);
    if (!validCodes2.includes(prefix)) {
      throw new Error(`Failed to parse stream string. Invalid code ${prefix}.`);
    }
    const code = prefix;
    const textValue = line.slice(firstSeparatorIndex + 1);
    const jsonValue = JSON.parse(textValue);
    return dataStreamPartsByCode[code].parse(jsonValue);
  };
  var NEWLINE = "\n".charCodeAt(0);
  function concatChunks(chunks, totalLength) {
    const concatenatedChunks = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      concatenatedChunks.set(chunk, offset);
      offset += chunk.length;
    }
    chunks.length = 0;
    return concatenatedChunks;
  }
  async function processDataStream({ stream, onTextPart, onDataPart, onErrorPart, onToolCallStreamingStartPart, onToolCallDeltaPart, onToolCallPart, onToolResultPart, onMessageAnnotationsPart, onFinishMessagePart, onFinishStepPart }) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    const chunks = [];
    let totalLength = 0;
    while (true) {
      const { value } = await reader.read();
      if (value) {
        chunks.push(value);
        totalLength += value.length;
        if (value[value.length - 1] !== NEWLINE) {
          continue;
        }
      }
      if (chunks.length === 0) {
        break;
      }
      const concatenatedChunks = concatChunks(chunks, totalLength);
      totalLength = 0;
      const streamParts = decoder.decode(concatenatedChunks, {
        stream: true
      }).split("\n").filter((line) => line !== "").map(parseDataStreamPart);
      for (const { type, value: value2 } of streamParts) {
        switch (type) {
          case "text":
            await (onTextPart == null ? void 0 : onTextPart(value2));
            break;
          case "data":
            await (onDataPart == null ? void 0 : onDataPart(value2));
            break;
          case "error":
            await (onErrorPart == null ? void 0 : onErrorPart(value2));
            break;
          case "message_annotations":
            await (onMessageAnnotationsPart == null ? void 0 : onMessageAnnotationsPart(value2));
            break;
          case "tool_call_streaming_start":
            await (onToolCallStreamingStartPart == null ? void 0 : onToolCallStreamingStartPart(value2));
            break;
          case "tool_call_delta":
            await (onToolCallDeltaPart == null ? void 0 : onToolCallDeltaPart(value2));
            break;
          case "tool_call":
            await (onToolCallPart == null ? void 0 : onToolCallPart(value2));
            break;
          case "tool_result":
            await (onToolResultPart == null ? void 0 : onToolResultPart(value2));
            break;
          case "finish_message":
            await (onFinishMessagePart == null ? void 0 : onFinishMessagePart(value2));
            break;
          case "finish_step":
            await (onFinishStepPart == null ? void 0 : onFinishStepPart(value2));
            break;
          default: {
            const exhaustiveCheck = type;
            throw new Error(`Unknown stream part type: ${exhaustiveCheck}`);
          }
        }
      }
    }
  }
  function calculateLanguageModelUsage({ promptTokens, completionTokens }) {
    return {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens
    };
  }
  async function processChatResponse({ stream, update, onToolCall, onFinish, generateId: generateId2 = generateId, getCurrentDate = () => /* @__PURE__ */ new Date() }) {
    const createdAt = getCurrentDate();
    let currentMessage = void 0;
    let createNewMessage = true;
    const previousMessages = [];
    const data = [];
    let messageAnnotations = void 0;
    const partialToolCalls = {};
    let usage = {
      completionTokens: NaN,
      promptTokens: NaN,
      totalTokens: NaN
    };
    let finishReason = "unknown";
    function execUpdate() {
      const copiedData = [
        ...data
      ];
      if (currentMessage == null) {
        update(previousMessages, copiedData);
        return;
      }
      if (messageAnnotations == null ? void 0 : messageAnnotations.length) {
        currentMessage.annotations = messageAnnotations;
      }
      const copiedMessage = {
        ...JSON.parse(JSON.stringify(currentMessage)),
        revisionId: generateId2()
      };
      update([
        ...previousMessages,
        copiedMessage
      ], copiedData);
    }
    function getMessage() {
      if (createNewMessage || currentMessage == null) {
        if (currentMessage != null) {
          previousMessages.push(currentMessage);
        }
        createNewMessage = false;
        currentMessage = {
          id: generateId2(),
          role: "assistant",
          content: "",
          createdAt
        };
      }
      return currentMessage;
    }
    await processDataStream({
      stream,
      onTextPart(value) {
        const activeMessage = getMessage();
        currentMessage = {
          ...activeMessage,
          content: activeMessage.content + value
        };
        execUpdate();
      },
      onToolCallStreamingStartPart(value) {
        const activeMessage = getMessage();
        if (activeMessage.toolInvocations == null) {
          activeMessage.toolInvocations = [];
        }
        partialToolCalls[value.toolCallId] = {
          text: "",
          toolName: value.toolName,
          index: activeMessage.toolInvocations.length
        };
        activeMessage.toolInvocations.push({
          state: "partial-call",
          toolCallId: value.toolCallId,
          toolName: value.toolName,
          args: void 0
        });
        execUpdate();
      },
      onToolCallDeltaPart(value) {
        const activeMessage = getMessage();
        const partialToolCall = partialToolCalls[value.toolCallId];
        partialToolCall.text += value.argsTextDelta;
        const { value: partialArgs } = parsePartialJson(partialToolCall.text);
        activeMessage.toolInvocations[partialToolCall.index] = {
          state: "partial-call",
          toolCallId: value.toolCallId,
          toolName: partialToolCall.toolName,
          args: partialArgs
        };
        execUpdate();
      },
      async onToolCallPart(value) {
        const activeMessage = getMessage();
        if (partialToolCalls[value.toolCallId] != null) {
          activeMessage.toolInvocations[partialToolCalls[value.toolCallId].index] = {
            state: "call",
            ...value
          };
        } else {
          if (activeMessage.toolInvocations == null) {
            activeMessage.toolInvocations = [];
          }
          activeMessage.toolInvocations.push({
            state: "call",
            ...value
          });
        }
        if (onToolCall) {
          const result = await onToolCall({
            toolCall: value
          });
          if (result != null) {
            activeMessage.toolInvocations[activeMessage.toolInvocations.length - 1] = {
              state: "result",
              ...value,
              result
            };
          }
        }
        execUpdate();
      },
      onToolResultPart(value) {
        const activeMessage = getMessage();
        const toolInvocations = activeMessage.toolInvocations;
        if (toolInvocations == null) {
          throw new Error("tool_result must be preceded by a tool_call");
        }
        const toolInvocationIndex = toolInvocations.findIndex((invocation) => invocation.toolCallId === value.toolCallId);
        if (toolInvocationIndex === -1) {
          throw new Error("tool_result must be preceded by a tool_call with the same toolCallId");
        }
        toolInvocations[toolInvocationIndex] = {
          ...toolInvocations[toolInvocationIndex],
          state: "result",
          ...value
        };
        execUpdate();
      },
      onDataPart(value) {
        data.push(...value);
        execUpdate();
      },
      onMessageAnnotationsPart(value) {
        if (messageAnnotations == null) {
          messageAnnotations = [
            ...value
          ];
        } else {
          messageAnnotations.push(...value);
        }
        execUpdate();
      },
      onFinishStepPart(value) {
        createNewMessage = !value.isContinued;
      },
      onFinishMessagePart(value) {
        finishReason = value.finishReason;
        if (value.usage != null) {
          usage = calculateLanguageModelUsage(value.usage);
        }
      },
      onErrorPart(error) {
        throw new Error(error);
      }
    });
    onFinish == null ? void 0 : onFinish({
      message: currentMessage,
      finishReason,
      usage
    });
  }
  async function processTextStream({ stream, onTextPart }) {
    const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      await onTextPart(value);
    }
  }
  var getOriginalFetch = () => fetch;
  async function callChatApi({ api, body, streamProtocol = "data", credentials, headers, abortController, restoreMessagesOnFailure, onResponse, onUpdate, onFinish, onToolCall, generateId: generateId2, fetch: fetch2 = getOriginalFetch() }) {
    var _a2, _b;
    const response = await fetch2(api, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      signal: (_a2 = abortController == null ? void 0 : abortController()) == null ? void 0 : _a2.signal,
      credentials
    }).catch((err) => {
      restoreMessagesOnFailure();
      throw err;
    });
    if (onResponse) {
      try {
        await onResponse(response);
      } catch (err) {
        throw err;
      }
    }
    if (!response.ok) {
      restoreMessagesOnFailure();
      throw new Error((_b = await response.text()) != null ? _b : "Failed to fetch the chat response.");
    }
    if (!response.body) {
      throw new Error("The response body is empty.");
    }
    switch (streamProtocol) {
      case "text": {
        const resultMessage = {
          id: generateId2(),
          createdAt: /* @__PURE__ */ new Date(),
          role: "assistant",
          content: ""
        };
        await processTextStream({
          stream: response.body,
          onTextPart: (chunk) => {
            resultMessage.content += chunk;
            onUpdate([
              {
                ...resultMessage
              }
            ], []);
          }
        });
        onFinish == null ? void 0 : onFinish(resultMessage, {
          usage: {
            completionTokens: NaN,
            promptTokens: NaN,
            totalTokens: NaN
          },
          finishReason: "unknown"
        });
        return;
      }
      case "data": {
        await processChatResponse({
          stream: response.body,
          update: onUpdate,
          onToolCall,
          onFinish({ message, finishReason, usage }) {
            if (onFinish && message != null) {
              onFinish(message, {
                usage,
                finishReason
              });
            }
          },
          generateId: generateId2
        });
        return;
      }
      default: {
        const exhaustiveCheck = streamProtocol;
        throw new Error(`Unknown stream protocol: ${exhaustiveCheck}`);
      }
    }
  }
  const noop = () => {
  };
  const UNDEFINED = noop();
  const OBJECT = Object;
  const isUndefined = (v) => v === UNDEFINED;
  const isFunction = (v) => typeof v == "function";
  const mergeObjects = (a, b) => ({
    ...a,
    ...b
  });
  const isPromiseLike = (x) => isFunction(x.then);
  const table = /* @__PURE__ */ new WeakMap();
  let counter = 0;
  const stableHash = (arg) => {
    const type = typeof arg;
    const constructor = arg && arg.constructor;
    const isDate = constructor == Date;
    let result;
    let index;
    if (OBJECT(arg) === arg && !isDate && constructor != RegExp) {
      result = table.get(arg);
      if (result) return result;
      result = ++counter + "~";
      table.set(arg, result);
      if (constructor == Array) {
        result = "@";
        for (index = 0; index < arg.length; index++) {
          result += stableHash(arg[index]) + ",";
        }
        table.set(arg, result);
      }
      if (constructor == OBJECT) {
        result = "#";
        const keys = OBJECT.keys(arg).sort();
        while (!isUndefined(index = keys.pop())) {
          if (!isUndefined(arg[index])) {
            result += index + ":" + stableHash(arg[index]) + ",";
          }
        }
        table.set(arg, result);
      }
    } else {
      result = isDate ? arg.toJSON() : type == "symbol" ? arg.toString() : type == "string" ? JSON.stringify(arg) : "" + arg;
    }
    return result;
  };
  const SWRGlobalState = /* @__PURE__ */ new WeakMap();
  const EMPTY_CACHE = {};
  const INITIAL_CACHE = {};
  const STR_UNDEFINED = "undefined";
  const isWindowDefined = typeof window != STR_UNDEFINED;
  const isDocumentDefined = typeof document != STR_UNDEFINED;
  const hasRequestAnimationFrame = () => isWindowDefined && typeof window["requestAnimationFrame"] != STR_UNDEFINED;
  const createCacheHelper = (cache2, key) => {
    const state = SWRGlobalState.get(cache2);
    return [
      () => !isUndefined(key) && cache2.get(key) || EMPTY_CACHE,
      (info) => {
        if (!isUndefined(key)) {
          const prev = cache2.get(key);
          if (!(key in INITIAL_CACHE)) {
            INITIAL_CACHE[key] = prev;
          }
          state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
        }
      },
      state[6],
      () => {
        if (!isUndefined(key)) {
          if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
        }
        return !isUndefined(key) && cache2.get(key) || EMPTY_CACHE;
      }
    ];
  };
  let online = true;
  const isOnline = () => online;
  const [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
    window.addEventListener.bind(window),
    window.removeEventListener.bind(window)
  ] : [
    noop,
    noop
  ];
  const isVisible = () => {
    const visibilityState = isDocumentDefined && document.visibilityState;
    return isUndefined(visibilityState) || visibilityState !== "hidden";
  };
  const initFocus = (callback) => {
    if (isDocumentDefined) {
      document.addEventListener("visibilitychange", callback);
    }
    onWindowEvent("focus", callback);
    return () => {
      if (isDocumentDefined) {
        document.removeEventListener("visibilitychange", callback);
      }
      offWindowEvent("focus", callback);
    };
  };
  const initReconnect = (callback) => {
    const onOnline = () => {
      online = true;
      callback();
    };
    const onOffline = () => {
      online = false;
    };
    onWindowEvent("online", onOnline);
    onWindowEvent("offline", onOffline);
    return () => {
      offWindowEvent("online", onOnline);
      offWindowEvent("offline", onOffline);
    };
  };
  const preset = {
    isOnline,
    isVisible
  };
  const defaultConfigOptions = {
    initFocus,
    initReconnect
  };
  const IS_REACT_LEGACY = !React.useId;
  const IS_SERVER = !isWindowDefined || "Deno" in window;
  const rAF = (f) => hasRequestAnimationFrame() ? window["requestAnimationFrame"](f) : setTimeout(f, 1);
  const useIsomorphicLayoutEffect = IS_SERVER ? reactExports.useEffect : reactExports.useLayoutEffect;
  const navigatorConnection = typeof navigator !== "undefined" && navigator.connection;
  const slowConnection = !IS_SERVER && navigatorConnection && ([
    "slow-2g",
    "2g"
  ].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);
  const serialize = (key) => {
    if (isFunction(key)) {
      try {
        key = key();
      } catch (err) {
        key = "";
      }
    }
    const args = key;
    key = typeof key == "string" ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : "";
    return [
      key,
      args
    ];
  };
  let __timestamp = 0;
  const getTimestamp = () => ++__timestamp;
  const FOCUS_EVENT = 0;
  const RECONNECT_EVENT = 1;
  const MUTATE_EVENT = 2;
  const ERROR_REVALIDATE_EVENT = 3;
  var events = {
    __proto__: null,
    ERROR_REVALIDATE_EVENT,
    FOCUS_EVENT,
    MUTATE_EVENT,
    RECONNECT_EVENT
  };
  async function internalMutate(...args) {
    const [cache2, _key, _data, _opts] = args;
    const options = mergeObjects({
      populateCache: true,
      throwOnError: true
    }, typeof _opts === "boolean" ? {
      revalidate: _opts
    } : _opts || {});
    let populateCache = options.populateCache;
    const rollbackOnErrorOption = options.rollbackOnError;
    let optimisticData = options.optimisticData;
    const rollbackOnError = (error) => {
      return typeof rollbackOnErrorOption === "function" ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
    };
    const throwOnError = options.throwOnError;
    if (isFunction(_key)) {
      const keyFilter = _key;
      const matchedKeys = [];
      const it = cache2.keys();
      for (const key of it) {
        if (!/^\$(inf|sub)\$/.test(key) && keyFilter(cache2.get(key)._k)) {
          matchedKeys.push(key);
        }
      }
      return Promise.all(matchedKeys.map(mutateByKey));
    }
    return mutateByKey(_key);
    async function mutateByKey(_k) {
      const [key] = serialize(_k);
      if (!key) return;
      const [get, set] = createCacheHelper(cache2, key);
      const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache2);
      const startRevalidate = () => {
        const revalidators = EVENT_REVALIDATORS[key];
        const revalidate = isFunction(options.revalidate) ? options.revalidate(get().data, _k) : options.revalidate !== false;
        if (revalidate) {
          delete FETCH[key];
          delete PRELOAD[key];
          if (revalidators && revalidators[0]) {
            return revalidators[0](MUTATE_EVENT).then(() => get().data);
          }
        }
        return get().data;
      };
      if (args.length < 3) {
        return startRevalidate();
      }
      let data = _data;
      let error;
      const beforeMutationTs = getTimestamp();
      MUTATION[key] = [
        beforeMutationTs,
        0
      ];
      const hasOptimisticData = !isUndefined(optimisticData);
      const state = get();
      const displayedData = state.data;
      const currentData = state._c;
      const committedData = isUndefined(currentData) ? displayedData : currentData;
      if (hasOptimisticData) {
        optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
        set({
          data: optimisticData,
          _c: committedData
        });
      }
      if (isFunction(data)) {
        try {
          data = data(committedData);
        } catch (err) {
          error = err;
        }
      }
      if (data && isPromiseLike(data)) {
        data = await data.catch((err) => {
          error = err;
        });
        if (beforeMutationTs !== MUTATION[key][0]) {
          if (error) throw error;
          return data;
        } else if (error && hasOptimisticData && rollbackOnError(error)) {
          populateCache = true;
          set({
            data: committedData,
            _c: UNDEFINED
          });
        }
      }
      if (populateCache) {
        if (!error) {
          if (isFunction(populateCache)) {
            const populateCachedData = populateCache(data, committedData);
            set({
              data: populateCachedData,
              error: UNDEFINED,
              _c: UNDEFINED
            });
          } else {
            set({
              data,
              error: UNDEFINED,
              _c: UNDEFINED
            });
          }
        }
      }
      MUTATION[key][1] = getTimestamp();
      Promise.resolve(startRevalidate()).then(() => {
        set({
          _c: UNDEFINED
        });
      });
      if (error) {
        if (throwOnError) throw error;
        return;
      }
      return data;
    }
  }
  const revalidateAllKeys = (revalidators, type) => {
    for (const key in revalidators) {
      if (revalidators[key][0]) revalidators[key][0](type);
    }
  };
  const initCache = (provider, options) => {
    if (!SWRGlobalState.has(provider)) {
      const opts = mergeObjects(defaultConfigOptions, options);
      const EVENT_REVALIDATORS = {};
      const mutate2 = internalMutate.bind(UNDEFINED, provider);
      let unmount = noop;
      const subscriptions = {};
      const subscribe = (key, callback) => {
        const subs = subscriptions[key] || [];
        subscriptions[key] = subs;
        subs.push(callback);
        return () => subs.splice(subs.indexOf(callback), 1);
      };
      const setter = (key, value, prev) => {
        provider.set(key, value);
        const subs = subscriptions[key];
        if (subs) {
          for (const fn of subs) {
            fn(value, prev);
          }
        }
      };
      const initProvider = () => {
        if (!SWRGlobalState.has(provider)) {
          SWRGlobalState.set(provider, [
            EVENT_REVALIDATORS,
            {},
            {},
            {},
            mutate2,
            setter,
            subscribe
          ]);
          if (!IS_SERVER) {
            const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
            const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
            unmount = () => {
              releaseFocus && releaseFocus();
              releaseReconnect && releaseReconnect();
              SWRGlobalState.delete(provider);
            };
          }
        }
      };
      initProvider();
      return [
        provider,
        mutate2,
        initProvider,
        unmount
      ];
    }
    return [
      provider,
      SWRGlobalState.get(provider)[4]
    ];
  };
  const onErrorRetry = (_, __, config, revalidate, opts) => {
    const maxRetryCount = config.errorRetryCount;
    const currentRetryCount = opts.retryCount;
    const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
    if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
      return;
    }
    setTimeout(revalidate, timeout, opts);
  };
  const compare = (currentData, newData) => stableHash(currentData) == stableHash(newData);
  const [cache, mutate] = initCache(/* @__PURE__ */ new Map());
  const defaultConfig = mergeObjects({
    onLoadingSlow: noop,
    onSuccess: noop,
    onError: noop,
    onErrorRetry,
    onDiscarded: noop,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    errorRetryInterval: slowConnection ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: slowConnection ? 5e3 : 3e3,
    compare,
    isPaused: () => false,
    cache,
    mutate,
    fallback: {}
  }, preset);
  const mergeConfigs = (a, b) => {
    const v = mergeObjects(a, b);
    if (b) {
      const { use: u1, fallback: f1 } = a;
      const { use: u2, fallback: f2 } = b;
      if (u1 && u2) {
        v.use = u1.concat(u2);
      }
      if (f1 && f2) {
        v.fallback = mergeObjects(f1, f2);
      }
    }
    return v;
  };
  const SWRConfigContext = reactExports.createContext({});
  const INFINITE_PREFIX = "$inf$";
  const enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
  const use$1 = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
  const setupDevTools = () => {
    if (enableDevtools) {
      window.__SWR_DEVTOOLS_REACT__ = React;
    }
  };
  const normalize = (args) => {
    return isFunction(args[1]) ? [
      args[0],
      args[1],
      args[2] || {}
    ] : [
      args[0],
      null,
      (args[1] === null ? args[2] : args[1]) || {}
    ];
  };
  const useSWRConfig = () => {
    return mergeObjects(defaultConfig, reactExports.useContext(SWRConfigContext));
  };
  const middleware = (useSWRNext) => (key_, fetcher_, config) => {
    const fetcher = fetcher_ && ((...args) => {
      const [key] = serialize(key_);
      const [, , , PRELOAD] = SWRGlobalState.get(cache);
      if (key.startsWith(INFINITE_PREFIX)) {
        return fetcher_(...args);
      }
      const req = PRELOAD[key];
      if (isUndefined(req)) return fetcher_(...args);
      delete PRELOAD[key];
      return req;
    });
    return useSWRNext(key_, fetcher, config);
  };
  const BUILT_IN_MIDDLEWARE = use$1.concat(middleware);
  const withArgs = (hook) => {
    return function useSWRArgs(...args) {
      const fallbackConfig = useSWRConfig();
      const [key, fn, _config] = normalize(args);
      const config = mergeConfigs(fallbackConfig, _config);
      let next = hook;
      const { use: use2 } = config;
      const middleware2 = (use2 || []).concat(BUILT_IN_MIDDLEWARE);
      for (let i = middleware2.length; i--; ) {
        next = middleware2[i](next);
      }
      return next(key, fn || config.fetcher || null, config);
    };
  };
  const subscribeCallback = (key, callbacks, callback) => {
    const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
    keyedRevalidators.push(callback);
    return () => {
      const index = keyedRevalidators.indexOf(callback);
      if (index >= 0) {
        keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
        keyedRevalidators.pop();
      }
    };
  };
  setupDevTools();
  const use = React.use || ((promise) => {
    if (promise.status === "pending") {
      throw promise;
    } else if (promise.status === "fulfilled") {
      return promise.value;
    } else if (promise.status === "rejected") {
      throw promise.reason;
    } else {
      promise.status = "pending";
      promise.then((v) => {
        promise.status = "fulfilled";
        promise.value = v;
      }, (e) => {
        promise.status = "rejected";
        promise.reason = e;
      });
      throw promise;
    }
  });
  const WITH_DEDUPE = {
    dedupe: true
  };
  const useSWRHandler = (_key, fetcher, config) => {
    const { cache: cache2, compare: compare2, suspense, fallbackData, revalidateOnMount, revalidateIfStale, refreshInterval, refreshWhenHidden, refreshWhenOffline, keepPreviousData } = config;
    const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache2);
    const [key, fnArg] = serialize(_key);
    const initialMountedRef = reactExports.useRef(false);
    const unmountedRef = reactExports.useRef(false);
    const keyRef = reactExports.useRef(key);
    const fetcherRef = reactExports.useRef(fetcher);
    const configRef = reactExports.useRef(config);
    const getConfig = () => configRef.current;
    const isActive = () => getConfig().isVisible() && getConfig().isOnline();
    const [getCache, setCache, subscribeCache, getInitialCache] = createCacheHelper(cache2, key);
    const stateDependencies = reactExports.useRef({}).current;
    const fallback = isUndefined(fallbackData) ? config.fallback[key] : fallbackData;
    const isEqual = (prev, current) => {
      for (const _ in stateDependencies) {
        const t = _;
        if (t === "data") {
          if (!compare2(prev[t], current[t])) {
            if (!isUndefined(prev[t])) {
              return false;
            }
            if (!compare2(returnedData, current[t])) {
              return false;
            }
          }
        } else {
          if (current[t] !== prev[t]) {
            return false;
          }
        }
      }
      return true;
    };
    const getSnapshot = reactExports.useMemo(() => {
      const shouldStartRequest = (() => {
        if (!key) return false;
        if (!fetcher) return false;
        if (!isUndefined(revalidateOnMount)) return revalidateOnMount;
        if (getConfig().isPaused()) return false;
        if (suspense) return false;
        if (!isUndefined(revalidateIfStale)) return revalidateIfStale;
        return true;
      })();
      const getSelectedCache = (state) => {
        const snapshot = mergeObjects(state);
        delete snapshot._k;
        if (!shouldStartRequest) {
          return snapshot;
        }
        return {
          isValidating: true,
          isLoading: true,
          ...snapshot
        };
      };
      const cachedData2 = getCache();
      const initialData = getInitialCache();
      const clientSnapshot = getSelectedCache(cachedData2);
      const serverSnapshot = cachedData2 === initialData ? clientSnapshot : getSelectedCache(initialData);
      let memorizedSnapshot = clientSnapshot;
      return [
        () => {
          const newSnapshot = getSelectedCache(getCache());
          const compareResult = isEqual(newSnapshot, memorizedSnapshot);
          if (compareResult) {
            memorizedSnapshot.data = newSnapshot.data;
            memorizedSnapshot.isLoading = newSnapshot.isLoading;
            memorizedSnapshot.isValidating = newSnapshot.isValidating;
            memorizedSnapshot.error = newSnapshot.error;
            return memorizedSnapshot;
          } else {
            memorizedSnapshot = newSnapshot;
            return newSnapshot;
          }
        },
        () => serverSnapshot
      ];
    }, [
      cache2,
      key
    ]);
    const cached = shimExports.useSyncExternalStore(reactExports.useCallback((callback) => subscribeCache(key, (current, prev) => {
      if (!isEqual(prev, current)) callback();
    }), [
      cache2,
      key
    ]), getSnapshot[0], getSnapshot[1]);
    const isInitialMount = !initialMountedRef.current;
    const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
    const cachedData = cached.data;
    const data = isUndefined(cachedData) ? fallback : cachedData;
    const error = cached.error;
    const laggyDataRef = reactExports.useRef(data);
    const returnedData = keepPreviousData ? isUndefined(cachedData) ? laggyDataRef.current : cachedData : data;
    const shouldDoInitialRevalidation = (() => {
      if (hasRevalidator && !isUndefined(error)) return false;
      if (isInitialMount && !isUndefined(revalidateOnMount)) return revalidateOnMount;
      if (getConfig().isPaused()) return false;
      if (suspense) return isUndefined(data) ? false : revalidateIfStale;
      return isUndefined(data) || revalidateIfStale;
    })();
    const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
    const isValidating = isUndefined(cached.isValidating) ? defaultValidatingState : cached.isValidating;
    const isLoading = isUndefined(cached.isLoading) ? defaultValidatingState : cached.isLoading;
    const revalidate = reactExports.useCallback(async (revalidateOpts) => {
      const currentFetcher = fetcherRef.current;
      if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) {
        return false;
      }
      let newData;
      let startAt;
      let loading = true;
      const opts = revalidateOpts || {};
      const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
      const callbackSafeguard = () => {
        if (IS_REACT_LEGACY) {
          return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
        }
        return key === keyRef.current;
      };
      const finalState = {
        isValidating: false,
        isLoading: false
      };
      const finishRequestAndUpdateState = () => {
        setCache(finalState);
      };
      const cleanupState = () => {
        const requestInfo = FETCH[key];
        if (requestInfo && requestInfo[1] === startAt) {
          delete FETCH[key];
        }
      };
      const initialState = {
        isValidating: true
      };
      if (isUndefined(getCache().data)) {
        initialState.isLoading = true;
      }
      try {
        if (shouldStartNewRequest) {
          setCache(initialState);
          if (config.loadingTimeout && isUndefined(getCache().data)) {
            setTimeout(() => {
              if (loading && callbackSafeguard()) {
                getConfig().onLoadingSlow(key, config);
              }
            }, config.loadingTimeout);
          }
          FETCH[key] = [
            currentFetcher(fnArg),
            getTimestamp()
          ];
        }
        [newData, startAt] = FETCH[key];
        newData = await newData;
        if (shouldStartNewRequest) {
          setTimeout(cleanupState, config.dedupingInterval);
        }
        if (!FETCH[key] || FETCH[key][1] !== startAt) {
          if (shouldStartNewRequest) {
            if (callbackSafeguard()) {
              getConfig().onDiscarded(key);
            }
          }
          return false;
        }
        finalState.error = UNDEFINED;
        const mutationInfo = MUTATION[key];
        if (!isUndefined(mutationInfo) && (startAt <= mutationInfo[0] || startAt <= mutationInfo[1] || mutationInfo[1] === 0)) {
          finishRequestAndUpdateState();
          if (shouldStartNewRequest) {
            if (callbackSafeguard()) {
              getConfig().onDiscarded(key);
            }
          }
          return false;
        }
        const cacheData = getCache().data;
        finalState.data = compare2(cacheData, newData) ? cacheData : newData;
        if (shouldStartNewRequest) {
          if (callbackSafeguard()) {
            getConfig().onSuccess(newData, key, config);
          }
        }
      } catch (err) {
        cleanupState();
        const currentConfig = getConfig();
        const { shouldRetryOnError } = currentConfig;
        if (!currentConfig.isPaused()) {
          finalState.error = err;
          if (shouldStartNewRequest && callbackSafeguard()) {
            currentConfig.onError(err, key, currentConfig);
            if (shouldRetryOnError === true || isFunction(shouldRetryOnError) && shouldRetryOnError(err)) {
              if (!getConfig().revalidateOnFocus || !getConfig().revalidateOnReconnect || isActive()) {
                currentConfig.onErrorRetry(err, key, currentConfig, (_opts) => {
                  const revalidators = EVENT_REVALIDATORS[key];
                  if (revalidators && revalidators[0]) {
                    revalidators[0](events.ERROR_REVALIDATE_EVENT, _opts);
                  }
                }, {
                  retryCount: (opts.retryCount || 0) + 1,
                  dedupe: true
                });
              }
            }
          }
        }
      }
      loading = false;
      finishRequestAndUpdateState();
      return true;
    }, [
      key,
      cache2
    ]);
    const boundMutate = reactExports.useCallback((...args) => {
      return internalMutate(cache2, keyRef.current, ...args);
    }, []);
    useIsomorphicLayoutEffect(() => {
      fetcherRef.current = fetcher;
      configRef.current = config;
      if (!isUndefined(cachedData)) {
        laggyDataRef.current = cachedData;
      }
    });
    useIsomorphicLayoutEffect(() => {
      if (!key) return;
      const softRevalidate = revalidate.bind(UNDEFINED, WITH_DEDUPE);
      let nextFocusRevalidatedAt = 0;
      const onRevalidate = (type, opts = {}) => {
        if (type == events.FOCUS_EVENT) {
          const now = Date.now();
          if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
            nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
            softRevalidate();
          }
        } else if (type == events.RECONNECT_EVENT) {
          if (getConfig().revalidateOnReconnect && isActive()) {
            softRevalidate();
          }
        } else if (type == events.MUTATE_EVENT) {
          return revalidate();
        } else if (type == events.ERROR_REVALIDATE_EVENT) {
          return revalidate(opts);
        }
        return;
      };
      const unsubEvents = subscribeCallback(key, EVENT_REVALIDATORS, onRevalidate);
      unmountedRef.current = false;
      keyRef.current = key;
      initialMountedRef.current = true;
      setCache({
        _k: fnArg
      });
      if (shouldDoInitialRevalidation) {
        if (isUndefined(data) || IS_SERVER) {
          softRevalidate();
        } else {
          rAF(softRevalidate);
        }
      }
      return () => {
        unmountedRef.current = true;
        unsubEvents();
      };
    }, [
      key
    ]);
    useIsomorphicLayoutEffect(() => {
      let timer;
      function next() {
        const interval = isFunction(refreshInterval) ? refreshInterval(getCache().data) : refreshInterval;
        if (interval && timer !== -1) {
          timer = setTimeout(execute, interval);
        }
      }
      function execute() {
        if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) {
          revalidate(WITH_DEDUPE).then(next);
        } else {
          next();
        }
      }
      next();
      return () => {
        if (timer) {
          clearTimeout(timer);
          timer = -1;
        }
      };
    }, [
      refreshInterval,
      refreshWhenHidden,
      refreshWhenOffline,
      key
    ]);
    reactExports.useDebugValue(returnedData);
    if (suspense && isUndefined(data) && key) {
      if (!IS_REACT_LEGACY && IS_SERVER) {
        throw new Error("Fallback data is required when using suspense in SSR.");
      }
      fetcherRef.current = fetcher;
      configRef.current = config;
      unmountedRef.current = false;
      const req = PRELOAD[key];
      if (!isUndefined(req)) {
        const promise = boundMutate(req);
        use(promise);
      }
      if (isUndefined(error)) {
        const promise = revalidate(WITH_DEDUPE);
        if (!isUndefined(returnedData)) {
          promise.status = "fulfilled";
          promise.value = true;
        }
        use(promise);
      } else {
        throw error;
      }
    }
    return {
      mutate: boundMutate,
      get data() {
        stateDependencies.data = true;
        return returnedData;
      },
      get error() {
        stateDependencies.error = true;
        return error;
      },
      get isValidating() {
        stateDependencies.isValidating = true;
        return isValidating;
      },
      get isLoading() {
        stateDependencies.isLoading = true;
        return isLoading;
      }
    };
  };
  const useSWR = withArgs(useSWRHandler);
  function throttle$1(function_, wait) {
    if (typeof function_ !== "function") {
      throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
    }
    let timeoutId;
    let lastCallTime = 0;
    return function throttled(...arguments_) {
      clearTimeout(timeoutId);
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime;
      const delayForNextCall = wait - timeSinceLastCall;
      if (delayForNextCall <= 0) {
        lastCallTime = now;
        function_.apply(this, arguments_);
      } else {
        timeoutId = setTimeout(() => {
          lastCallTime = Date.now();
          function_.apply(this, arguments_);
        }, delayForNextCall);
      }
    };
  }
  var throttleit = throttle$1;
  const throttleFunction = getDefaultExportFromCjs(throttleit);
  function throttle(fn, waitMs) {
    return waitMs != null ? throttleFunction(fn, waitMs) : fn;
  }
  var processResponseStream = async (api, chatRequest, mutate2, mutateStreamData, existingDataRef, extraMetadataRef, messagesRef, abortControllerRef, generateId2, streamProtocol, onFinish, onResponse, onToolCall, sendExtraMessageFields, experimental_prepareRequestBody, fetch2, keepLastMessageOnError) => {
    var _a2;
    const previousMessages = messagesRef.current;
    mutate2(chatRequest.messages, false);
    const constructedMessagesPayload = sendExtraMessageFields ? chatRequest.messages : chatRequest.messages.map(({ role, content, experimental_attachments, data, annotations, toolInvocations }) => ({
      role,
      content,
      ...experimental_attachments !== void 0 && {
        experimental_attachments
      },
      ...data !== void 0 && {
        data
      },
      ...annotations !== void 0 && {
        annotations
      },
      ...toolInvocations !== void 0 && {
        toolInvocations
      }
    }));
    const existingData = existingDataRef.current;
    return await callChatApi({
      api,
      body: (_a2 = experimental_prepareRequestBody == null ? void 0 : experimental_prepareRequestBody({
        messages: chatRequest.messages,
        requestData: chatRequest.data,
        requestBody: chatRequest.body
      })) != null ? _a2 : {
        messages: constructedMessagesPayload,
        data: chatRequest.data,
        ...extraMetadataRef.current.body,
        ...chatRequest.body
      },
      streamProtocol,
      credentials: extraMetadataRef.current.credentials,
      headers: {
        ...extraMetadataRef.current.headers,
        ...chatRequest.headers
      },
      abortController: () => abortControllerRef.current,
      restoreMessagesOnFailure() {
        if (!keepLastMessageOnError) {
          mutate2(previousMessages, false);
        }
      },
      onResponse,
      onUpdate(merged, data) {
        mutate2([
          ...chatRequest.messages,
          ...merged
        ], false);
        if (data == null ? void 0 : data.length) {
          mutateStreamData([
            ...existingData != null ? existingData : [],
            ...data
          ], false);
        }
      },
      onToolCall,
      onFinish,
      generateId: generateId2,
      fetch: fetch2
    });
  };
  function useChat$1({ api = "/api/chat", id, initialMessages, initialInput = "", sendExtraMessageFields, onToolCall, experimental_prepareRequestBody, maxSteps = 1, streamProtocol = "data", onResponse, onFinish, onError, credentials, headers, body, generateId: generateId2 = generateId, fetch: fetch2, keepLastMessageOnError = true, experimental_throttle: throttleWaitMs } = {}) {
    const hookId = reactExports.useId();
    const idKey = id != null ? id : hookId;
    const chatKey = typeof api === "string" ? [
      api,
      idKey
    ] : idKey;
    const [initialMessagesFallback] = reactExports.useState([]);
    const { data: messages, mutate: mutate2 } = useSWR([
      chatKey,
      "messages"
    ], null, {
      fallbackData: initialMessages != null ? initialMessages : initialMessagesFallback
    });
    const messagesRef = reactExports.useRef(messages || []);
    reactExports.useEffect(() => {
      messagesRef.current = messages || [];
    }, [
      messages
    ]);
    const { data: streamData, mutate: mutateStreamData } = useSWR([
      chatKey,
      "streamData"
    ], null);
    const streamDataRef = reactExports.useRef(streamData);
    reactExports.useEffect(() => {
      streamDataRef.current = streamData;
    }, [
      streamData
    ]);
    const { data: isLoading = false, mutate: mutateLoading } = useSWR([
      chatKey,
      "loading"
    ], null);
    const { data: error = void 0, mutate: setError } = useSWR([
      chatKey,
      "error"
    ], null);
    const abortControllerRef = reactExports.useRef(null);
    const extraMetadataRef = reactExports.useRef({
      credentials,
      headers,
      body
    });
    reactExports.useEffect(() => {
      extraMetadataRef.current = {
        credentials,
        headers,
        body
      };
    }, [
      credentials,
      headers,
      body
    ]);
    const triggerRequest = reactExports.useCallback(async (chatRequest) => {
      const messageCount = messagesRef.current.length;
      try {
        mutateLoading(true);
        setError(void 0);
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        await processResponseStream(api, chatRequest, throttle(mutate2, throttleWaitMs), throttle(mutateStreamData, throttleWaitMs), streamDataRef, extraMetadataRef, messagesRef, abortControllerRef, generateId2, streamProtocol, onFinish, onResponse, onToolCall, sendExtraMessageFields, experimental_prepareRequestBody, fetch2, keepLastMessageOnError);
        abortControllerRef.current = null;
      } catch (err) {
        if (err.name === "AbortError") {
          abortControllerRef.current = null;
          return null;
        }
        if (onError && err instanceof Error) {
          onError(err);
        }
        setError(err);
      } finally {
        mutateLoading(false);
      }
      const messages2 = messagesRef.current;
      const lastMessage = messages2[messages2.length - 1];
      if (messages2.length > messageCount && lastMessage != null && maxSteps > 1 && isAssistantMessageWithCompletedToolCalls(lastMessage) && countTrailingAssistantMessages(messages2) < maxSteps) {
        await triggerRequest({
          messages: messages2
        });
      }
    }, [
      mutate2,
      mutateLoading,
      api,
      extraMetadataRef,
      onResponse,
      onFinish,
      onError,
      setError,
      mutateStreamData,
      streamDataRef,
      streamProtocol,
      sendExtraMessageFields,
      experimental_prepareRequestBody,
      onToolCall,
      maxSteps,
      messagesRef,
      abortControllerRef,
      generateId2,
      fetch2,
      keepLastMessageOnError,
      throttleWaitMs
    ]);
    const append = reactExports.useCallback(async (message, { data, headers: headers2, body: body2, experimental_attachments } = {}) => {
      var _a2, _b;
      if (!message.id) {
        message.id = generateId2();
      }
      const attachmentsForRequest = await prepareAttachmentsForRequest(experimental_attachments);
      const messages2 = messagesRef.current.concat({
        ...message,
        id: (_a2 = message.id) != null ? _a2 : generateId2(),
        createdAt: (_b = message.createdAt) != null ? _b : /* @__PURE__ */ new Date(),
        experimental_attachments: attachmentsForRequest.length > 0 ? attachmentsForRequest : void 0
      });
      return triggerRequest({
        messages: messages2,
        headers: headers2,
        body: body2,
        data
      });
    }, [
      triggerRequest,
      generateId2
    ]);
    const reload = reactExports.useCallback(async ({ data, headers: headers2, body: body2 } = {}) => {
      const messages2 = messagesRef.current;
      if (messages2.length === 0) {
        return null;
      }
      const lastMessage = messages2[messages2.length - 1];
      return triggerRequest({
        messages: lastMessage.role === "assistant" ? messages2.slice(0, -1) : messages2,
        headers: headers2,
        body: body2,
        data
      });
    }, [
      triggerRequest
    ]);
    const stop = reactExports.useCallback(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    }, []);
    const setMessages = reactExports.useCallback((messages2) => {
      if (typeof messages2 === "function") {
        messages2 = messages2(messagesRef.current);
      }
      mutate2(messages2, false);
      messagesRef.current = messages2;
    }, [
      mutate2
    ]);
    const setData = reactExports.useCallback((data) => {
      if (typeof data === "function") {
        data = data(streamDataRef.current);
      }
      mutateStreamData(data, false);
      streamDataRef.current = data;
    }, [
      mutateStreamData
    ]);
    const [input, setInput] = reactExports.useState(initialInput);
    const handleSubmit = reactExports.useCallback(async (event, options = {}, metadata) => {
      var _a2;
      (_a2 = event == null ? void 0 : event.preventDefault) == null ? void 0 : _a2.call(event);
      if (!input && !options.allowEmptySubmit) return;
      if (metadata) {
        extraMetadataRef.current = {
          ...extraMetadataRef.current,
          ...metadata
        };
      }
      const attachmentsForRequest = await prepareAttachmentsForRequest(options.experimental_attachments);
      const messages2 = !input && !attachmentsForRequest.length && options.allowEmptySubmit ? messagesRef.current : messagesRef.current.concat({
        id: generateId2(),
        createdAt: /* @__PURE__ */ new Date(),
        role: "user",
        content: input,
        experimental_attachments: attachmentsForRequest.length > 0 ? attachmentsForRequest : void 0
      });
      const chatRequest = {
        messages: messages2,
        headers: options.headers,
        body: options.body,
        data: options.data
      };
      triggerRequest(chatRequest);
      setInput("");
    }, [
      input,
      generateId2,
      triggerRequest
    ]);
    const handleInputChange = (e) => {
      setInput(e.target.value);
    };
    const addToolResult = ({ toolCallId, result }) => {
      const updatedMessages = messagesRef.current.map((message, index, arr) => index === arr.length - 1 && message.role === "assistant" && message.toolInvocations ? {
        ...message,
        toolInvocations: message.toolInvocations.map((toolInvocation) => toolInvocation.toolCallId === toolCallId ? {
          ...toolInvocation,
          result,
          state: "result"
        } : toolInvocation)
      } : message);
      mutate2(updatedMessages, false);
      const lastMessage = updatedMessages[updatedMessages.length - 1];
      if (isAssistantMessageWithCompletedToolCalls(lastMessage)) {
        triggerRequest({
          messages: updatedMessages
        });
      }
    };
    return {
      messages: messages || [],
      setMessages,
      data: streamData,
      setData,
      error,
      append,
      reload,
      stop,
      input,
      setInput,
      handleInputChange,
      handleSubmit,
      isLoading,
      addToolResult
    };
  }
  function isAssistantMessageWithCompletedToolCalls(message) {
    return message.role === "assistant" && message.toolInvocations && message.toolInvocations.length > 0 && message.toolInvocations.every((toolInvocation) => "result" in toolInvocation);
  }
  function countTrailingAssistantMessages(messages) {
    let count = 0;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") {
        count++;
      } else {
        break;
      }
    }
    return count;
  }
  async function prepareAttachmentsForRequest(attachmentsFromOptions) {
    if (attachmentsFromOptions == null) {
      return [];
    }
    if (attachmentsFromOptions instanceof FileList) {
      return Promise.all(Array.from(attachmentsFromOptions).map(async (attachment) => {
        const { name, type } = attachment;
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (readerEvent) => {
            var _a2;
            resolve((_a2 = readerEvent.target) == null ? void 0 : _a2.result);
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(attachment);
        });
        return {
          name,
          contentType: type,
          url: dataUrl
        };
      }));
    }
    if (Array.isArray(attachmentsFromOptions)) {
      return attachmentsFromOptions;
    }
    throw new Error("Invalid attachments type");
  }
  useChat = useChat$1;
});
export {
  __tla,
  useChat as u
};
