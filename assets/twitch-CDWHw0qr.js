import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let Twitch;
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
  Twitch = createLucideIcon("Twitch", [
    [
      "path",
      {
        d: "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7",
        key: "c0yzno"
      }
    ]
  ]);
});
export {
  __tla,
  Twitch as default
};
