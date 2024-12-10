import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MessageCircleOff;
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
  MessageCircleOff = createLucideIcon("MessageCircleOff", [
    [
      "path",
      {
        d: "M20.5 14.9A9 9 0 0 0 9.1 3.5",
        key: "1iebmn"
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
        d: "M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7",
        key: "1ov8ce"
      }
    ]
  ]);
});
export {
  __tla,
  MessageCircleOff as default
};
