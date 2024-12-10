import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MessageSquareOff;
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
  MessageSquareOff = createLucideIcon("MessageSquareOff", [
    [
      "path",
      {
        d: "M21 15V5a2 2 0 0 0-2-2H9",
        key: "43el77"
      }
    ],
    [
      "path",
      {
        d: "m2 2 20 20",
        key: "1ooewy"
      }
    ],
    [
      "path",
      {
        d: "M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10",
        key: "pwpm4a"
      }
    ]
  ]);
});
export {
  __tla,
  MessageSquareOff as default
};
