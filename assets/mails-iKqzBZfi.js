import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Mails;
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
  Mails = createLucideIcon("Mails", [
    [
      "rect",
      {
        width: "16",
        height: "13",
        x: "6",
        y: "4",
        rx: "2",
        key: "1drq3f"
      }
    ],
    [
      "path",
      {
        d: "m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7",
        key: "xn252p"
      }
    ],
    [
      "path",
      {
        d: "M2 8v11c0 1.1.9 2 2 2h14",
        key: "n13cji"
      }
    ]
  ]);
});
export {
  __tla,
  Mails as default
};
