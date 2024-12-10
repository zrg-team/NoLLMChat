import { G as BaseStringPromptTemplate, H as checkValidTemplate, J as renderTemplate, K as PromptTemplate, __tla as __tla_0 } from "./HomePage-D_Hs-RaH.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
import { __tla as __tla_2 } from "./use-llm-Kc_COJca.js";
import { __tla as __tla_3 } from "./routes-Q3DgWzwS.js";
let FewShotPromptTemplate;
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })()
]).then(async () => {
  FewShotPromptTemplate = class extends BaseStringPromptTemplate {
    constructor(input) {
      super(input);
      Object.defineProperty(this, "lc_serializable", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "examples", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "exampleSelector", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "examplePrompt", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "suffix", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ""
      });
      Object.defineProperty(this, "exampleSeparator", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "\n\n"
      });
      Object.defineProperty(this, "prefix", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ""
      });
      Object.defineProperty(this, "templateFormat", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "f-string"
      });
      Object.defineProperty(this, "validateTemplate", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: true
      });
      Object.assign(this, input);
      if (this.examples !== void 0 && this.exampleSelector !== void 0) {
        throw new Error("Only one of 'examples' and 'example_selector' should be provided");
      }
      if (this.examples === void 0 && this.exampleSelector === void 0) {
        throw new Error("One of 'examples' and 'example_selector' should be provided");
      }
      if (this.validateTemplate) {
        let totalInputVariables = this.inputVariables;
        if (this.partialVariables) {
          totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
        }
        checkValidTemplate(this.prefix + this.suffix, this.templateFormat, totalInputVariables);
      }
    }
    _getPromptType() {
      return "few_shot";
    }
    static lc_name() {
      return "FewShotPromptTemplate";
    }
    async getExamples(inputVariables) {
      if (this.examples !== void 0) {
        return this.examples;
      }
      if (this.exampleSelector !== void 0) {
        return this.exampleSelector.selectExamples(inputVariables);
      }
      throw new Error("One of 'examples' and 'example_selector' should be provided");
    }
    async partial(values) {
      const newInputVariables = this.inputVariables.filter((iv) => !(iv in values));
      const newPartialVariables = {
        ...this.partialVariables ?? {},
        ...values
      };
      const promptDict = {
        ...this,
        inputVariables: newInputVariables,
        partialVariables: newPartialVariables
      };
      return new FewShotPromptTemplate(promptDict);
    }
    async format(values) {
      const allValues = await this.mergePartialAndUserVariables(values);
      const examples = await this.getExamples(allValues);
      const exampleStrings = await Promise.all(examples.map((example) => this.examplePrompt.format(example)));
      const template = [
        this.prefix,
        ...exampleStrings,
        this.suffix
      ].join(this.exampleSeparator);
      return renderTemplate(template, this.templateFormat, allValues);
    }
    serialize() {
      if (this.exampleSelector || !this.examples) {
        throw new Error("Serializing an example selector is not currently supported");
      }
      if (this.outputParser !== void 0) {
        throw new Error("Serializing an output parser is not currently supported");
      }
      return {
        _type: this._getPromptType(),
        input_variables: this.inputVariables,
        example_prompt: this.examplePrompt.serialize(),
        example_separator: this.exampleSeparator,
        suffix: this.suffix,
        prefix: this.prefix,
        template_format: this.templateFormat,
        examples: this.examples
      };
    }
    static async deserialize(data) {
      const { example_prompt } = data;
      if (!example_prompt) {
        throw new Error("Missing example prompt");
      }
      const examplePrompt = await PromptTemplate.deserialize(example_prompt);
      let examples;
      if (Array.isArray(data.examples)) {
        examples = data.examples;
      } else {
        throw new Error("Invalid examples format. Only list or string are supported.");
      }
      return new FewShotPromptTemplate({
        inputVariables: data.input_variables,
        examplePrompt,
        examples,
        exampleSeparator: data.example_separator,
        prefix: data.prefix,
        suffix: data.suffix,
        templateFormat: data.template_format
      });
    }
  };
});
export {
  FewShotPromptTemplate,
  __tla
};
