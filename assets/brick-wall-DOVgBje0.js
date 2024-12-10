import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let BrickWall;
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
  BrickWall = createLucideIcon("BrickWall", [
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        key: "afitv7"
      }
    ],
    [
      "path",
      {
        d: "M12 9v6",
        key: "199k2o"
      }
    ],
    [
      "path",
      {
        d: "M16 15v6",
        key: "8rj2es"
      }
    ],
    [
      "path",
      {
        d: "M16 3v6",
        key: "1j6rpj"
      }
    ],
    [
      "path",
      {
        d: "M3 15h18",
        key: "5xshup"
      }
    ],
    [
      "path",
      {
        d: "M3 9h18",
        key: "1pudct"
      }
    ],
    [
      "path",
      {
        d: "M8 15v6",
        key: "1stoo3"
      }
    ],
    [
      "path",
      {
        d: "M8 3v6",
        key: "vlvjmk"
      }
    ]
  ]);
});
export {
  __tla,
  BrickWall as default
};
