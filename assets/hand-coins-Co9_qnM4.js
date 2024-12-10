import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let HandCoins;
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
  HandCoins = createLucideIcon("HandCoins", [
    [
      "path",
      {
        d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17",
        key: "geh8rc"
      }
    ],
    [
      "path",
      {
        d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
        key: "1fto5m"
      }
    ],
    [
      "path",
      {
        d: "m2 16 6 6",
        key: "1pfhp9"
      }
    ],
    [
      "circle",
      {
        cx: "16",
        cy: "9",
        r: "2.9",
        key: "1n0dlu"
      }
    ],
    [
      "circle",
      {
        cx: "6",
        cy: "5",
        r: "3",
        key: "151irh"
      }
    ]
  ]);
});
export {
  __tla,
  HandCoins as default
};
