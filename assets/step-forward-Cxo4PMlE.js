import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let StepForward;
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
  StepForward = createLucideIcon("StepForward", [
    [
      "line",
      {
        x1: "6",
        x2: "6",
        y1: "4",
        y2: "20",
        key: "fy8qot"
      }
    ],
    [
      "polygon",
      {
        points: "10,4 20,12 10,20",
        key: "1mc1pf"
      }
    ]
  ]);
});
export {
  __tla,
  StepForward as default
};
