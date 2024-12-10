import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Trello;
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
  Trello = createLucideIcon("Trello", [
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        ry: "2",
        key: "1m3agn"
      }
    ],
    [
      "rect",
      {
        width: "3",
        height: "9",
        x: "7",
        y: "7",
        key: "14n3xi"
      }
    ],
    [
      "rect",
      {
        width: "3",
        height: "5",
        x: "14",
        y: "7",
        key: "s4azjd"
      }
    ]
  ]);
});
export {
  __tla,
  Trello as default
};
