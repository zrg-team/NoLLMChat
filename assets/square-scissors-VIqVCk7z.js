import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SquareScissors;
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
  SquareScissors = createLucideIcon("SquareScissors", [
    [
      "rect",
      {
        width: "20",
        height: "20",
        x: "2",
        y: "2",
        rx: "2",
        key: "1btzen"
      }
    ],
    [
      "circle",
      {
        cx: "8",
        cy: "8",
        r: "2",
        key: "14cg06"
      }
    ],
    [
      "path",
      {
        d: "M9.414 9.414 12 12",
        key: "qz4lzr"
      }
    ],
    [
      "path",
      {
        d: "M14.8 14.8 18 18",
        key: "11flf1"
      }
    ],
    [
      "circle",
      {
        cx: "8",
        cy: "16",
        r: "2",
        key: "1acxsx"
      }
    ],
    [
      "path",
      {
        d: "m18 6-8.586 8.586",
        key: "11kzk1"
      }
    ]
  ]);
});
export {
  __tla,
  SquareScissors as default
};
