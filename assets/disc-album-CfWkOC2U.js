import { c as createLucideIcon, __tla as __tla_0 } from "./createLucideIcon-DZXM6zSt.js";
import { __tla as __tla_1 } from "./index-Bs2EL0Mm.js";
let DiscAlbum;
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
  DiscAlbum = createLucideIcon("DiscAlbum", [
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        key: "afitv7"
      }
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "5",
        key: "nd82uf"
      }
    ],
    [
      "path",
      {
        d: "M12 12h.01",
        key: "1mp3jc"
      }
    ]
  ]);
});
export {
  __tla,
  DiscAlbum as default
};
