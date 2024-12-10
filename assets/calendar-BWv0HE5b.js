import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Calendar;
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
  Calendar = createLucideIcon("Calendar", [
    [
      "path",
      {
        d: "M8 2v4",
        key: "1cmpym"
      }
    ],
    [
      "path",
      {
        d: "M16 2v4",
        key: "4m81vk"
      }
    ],
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2",
        key: "1hopcy"
      }
    ],
    [
      "path",
      {
        d: "M3 10h18",
        key: "8toen8"
      }
    ]
  ]);
});
export {
  __tla,
  Calendar as default
};
