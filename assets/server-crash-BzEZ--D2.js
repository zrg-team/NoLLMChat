import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let ServerCrash;
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
  ServerCrash = createLucideIcon("ServerCrash", [
    [
      "path",
      {
        d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
        key: "4b9dqc"
      }
    ],
    [
      "path",
      {
        d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
        key: "22nnkd"
      }
    ],
    [
      "path",
      {
        d: "M6 6h.01",
        key: "1utrut"
      }
    ],
    [
      "path",
      {
        d: "M6 18h.01",
        key: "uhywen"
      }
    ],
    [
      "path",
      {
        d: "m13 6-4 6h6l-4 6",
        key: "14hqih"
      }
    ]
  ]);
});
export {
  __tla,
  ServerCrash as default
};
