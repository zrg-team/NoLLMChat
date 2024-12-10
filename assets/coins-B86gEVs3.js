import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Coins;
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
  Coins = createLucideIcon("Coins", [
    [
      "circle",
      {
        cx: "8",
        cy: "8",
        r: "6",
        key: "3yglwk"
      }
    ],
    [
      "path",
      {
        d: "M18.09 10.37A6 6 0 1 1 10.34 18",
        key: "t5s6rm"
      }
    ],
    [
      "path",
      {
        d: "M7 6h1v4",
        key: "1obek4"
      }
    ],
    [
      "path",
      {
        d: "m16.71 13.88.7.71-2.82 2.82",
        key: "1rbuyh"
      }
    ]
  ]);
});
export {
  __tla,
  Coins as default
};
