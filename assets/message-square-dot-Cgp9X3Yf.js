import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MessageSquareDot;
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
  MessageSquareDot = createLucideIcon("MessageSquareDot", [
    [
      "path",
      {
        d: "M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7",
        key: "uodpkb"
      }
    ],
    [
      "circle",
      {
        cx: "18",
        cy: "6",
        r: "3",
        key: "1h7g24"
      }
    ]
  ]);
});
export {
  __tla,
  MessageSquareDot as default
};
