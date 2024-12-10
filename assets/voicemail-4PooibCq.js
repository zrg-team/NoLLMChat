import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Voicemail;
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
  Voicemail = createLucideIcon("Voicemail", [
    [
      "circle",
      {
        cx: "6",
        cy: "12",
        r: "4",
        key: "1ehtga"
      }
    ],
    [
      "circle",
      {
        cx: "18",
        cy: "12",
        r: "4",
        key: "4vafl8"
      }
    ],
    [
      "line",
      {
        x1: "6",
        x2: "18",
        y1: "16",
        y2: "16",
        key: "pmt8us"
      }
    ]
  ]);
});
export {
  __tla,
  Voicemail as default
};
