import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let SmartphoneCharging;
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
  SmartphoneCharging = createLucideIcon("SmartphoneCharging", [
    [
      "rect",
      {
        width: "14",
        height: "20",
        x: "5",
        y: "2",
        rx: "2",
        ry: "2",
        key: "1yt0o3"
      }
    ],
    [
      "path",
      {
        d: "M12.667 8 10 12h4l-2.667 4",
        key: "h9lk2d"
      }
    ]
  ]);
});
export {
  __tla,
  SmartphoneCharging as default
};
