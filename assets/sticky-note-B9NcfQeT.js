import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let StickyNote;
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
  StickyNote = createLucideIcon("StickyNote", [
    [
      "path",
      {
        d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z",
        key: "qazsjp"
      }
    ],
    [
      "path",
      {
        d: "M15 3v4a2 2 0 0 0 2 2h4",
        key: "40519r"
      }
    ]
  ]);
});
export {
  __tla,
  StickyNote as default
};
