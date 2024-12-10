import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Network;
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
  Network = createLucideIcon("Network", [
    [
      "rect",
      {
        x: "16",
        y: "16",
        width: "6",
        height: "6",
        rx: "1",
        key: "4q2zg0"
      }
    ],
    [
      "rect",
      {
        x: "2",
        y: "16",
        width: "6",
        height: "6",
        rx: "1",
        key: "8cvhb9"
      }
    ],
    [
      "rect",
      {
        x: "9",
        y: "2",
        width: "6",
        height: "6",
        rx: "1",
        key: "1egb70"
      }
    ],
    [
      "path",
      {
        d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
        key: "1jsf9p"
      }
    ],
    [
      "path",
      {
        d: "M12 12V8",
        key: "2874zd"
      }
    ]
  ]);
});
export {
  __tla,
  Network as default
};
