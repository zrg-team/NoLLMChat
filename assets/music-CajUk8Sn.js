import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Music;
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
  Music = createLucideIcon("Music", [
    [
      "path",
      {
        d: "M9 18V5l12-2v13",
        key: "1jmyc2"
      }
    ],
    [
      "circle",
      {
        cx: "6",
        cy: "18",
        r: "3",
        key: "fqmcym"
      }
    ],
    [
      "circle",
      {
        cx: "18",
        cy: "16",
        r: "3",
        key: "1hluhg"
      }
    ]
  ]);
});
export {
  __tla,
  Music as default
};
