import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Server;
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
  Server = createLucideIcon("Server", [
    [
      "rect",
      {
        width: "20",
        height: "8",
        x: "2",
        y: "2",
        rx: "2",
        ry: "2",
        key: "ngkwjq"
      }
    ],
    [
      "rect",
      {
        width: "20",
        height: "8",
        x: "2",
        y: "14",
        rx: "2",
        ry: "2",
        key: "iecqi9"
      }
    ],
    [
      "line",
      {
        x1: "6",
        x2: "6.01",
        y1: "6",
        y2: "6",
        key: "16zg32"
      }
    ],
    [
      "line",
      {
        x1: "6",
        x2: "6.01",
        y1: "18",
        y2: "18",
        key: "nzw8ys"
      }
    ]
  ]);
});
export {
  __tla,
  Server as default
};
