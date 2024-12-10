import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MessageSquareLock;
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
  MessageSquareLock = createLucideIcon("MessageSquareLock", [
    [
      "path",
      {
        d: "M19 15v-2a2 2 0 1 0-4 0v2",
        key: "h3d1vz"
      }
    ],
    [
      "path",
      {
        d: "M9 17H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3.5",
        key: "xsnnhn"
      }
    ],
    [
      "rect",
      {
        x: "13",
        y: "15",
        width: "8",
        height: "5",
        rx: "1",
        key: "1ccwuk"
      }
    ]
  ]);
});
export {
  __tla,
  MessageSquareLock as default
};
