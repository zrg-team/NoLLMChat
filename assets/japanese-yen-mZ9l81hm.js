import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let JapaneseYen;
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
  JapaneseYen = createLucideIcon("JapaneseYen", [
    [
      "path",
      {
        d: "M12 9.5V21m0-11.5L6 3m6 6.5L18 3",
        key: "2ej80x"
      }
    ],
    [
      "path",
      {
        d: "M6 15h12",
        key: "1hwgt5"
      }
    ],
    [
      "path",
      {
        d: "M6 11h12",
        key: "wf4gp6"
      }
    ]
  ]);
});
export {
  __tla,
  JapaneseYen as default
};
