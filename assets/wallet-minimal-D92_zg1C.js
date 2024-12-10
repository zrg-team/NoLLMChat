import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let WalletMinimal;
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
  WalletMinimal = createLucideIcon("WalletMinimal", [
    [
      "path",
      {
        d: "M17 14h.01",
        key: "7oqj8z"
      }
    ],
    [
      "path",
      {
        d: "M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14",
        key: "u1rqew"
      }
    ]
  ]);
});
export {
  __tla,
  WalletMinimal as default
};
