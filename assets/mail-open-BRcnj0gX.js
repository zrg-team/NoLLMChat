import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let MailOpen;
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
  MailOpen = createLucideIcon("MailOpen", [
    [
      "path",
      {
        d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
        key: "1jhwl8"
      }
    ],
    [
      "path",
      {
        d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10",
        key: "1qfld7"
      }
    ]
  ]);
});
export {
  __tla,
  MailOpen as default
};
