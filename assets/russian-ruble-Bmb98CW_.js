import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let RussianRuble;
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
  RussianRuble = createLucideIcon("RussianRuble", [
    [
      "path",
      {
        d: "M6 11h8a4 4 0 0 0 0-8H9v18",
        key: "18ai8t"
      }
    ],
    [
      "path",
      {
        d: "M6 15h8",
        key: "1y8f6l"
      }
    ]
  ]);
});
export {
  __tla,
  RussianRuble as default
};
