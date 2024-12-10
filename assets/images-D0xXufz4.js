import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Images;
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
  Images = createLucideIcon("Images", [
    [
      "path",
      {
        d: "M18 22H4a2 2 0 0 1-2-2V6",
        key: "pblm9e"
      }
    ],
    [
      "path",
      {
        d: "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18",
        key: "nf6bnh"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "8",
        r: "2",
        key: "1822b1"
      }
    ],
    [
      "rect",
      {
        width: "16",
        height: "16",
        x: "6",
        y: "2",
        rx: "2",
        key: "12espp"
      }
    ]
  ]);
});
export {
  __tla,
  Images as default
};
