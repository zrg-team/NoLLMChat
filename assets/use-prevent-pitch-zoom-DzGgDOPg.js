import { r as reactExports, __tla as __tla_0 } from "./index-Bs2EL0Mm.js";
let usePreventPitchZoom;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  usePreventPitchZoom = (elementRef, disable) => {
    reactExports.useEffect(() => {
      const handleWheel = (event) => {
        if (event.ctrlKey) {
          event.preventDefault();
        }
      };
      const editorElement = elementRef.current;
      if (editorElement) {
        editorElement.addEventListener("wheel", handleWheel, {
          passive: false
        });
      }
      return () => {
        if (editorElement) {
          editorElement.removeEventListener("wheel", handleWheel);
        }
      };
    }, [
      elementRef,
      disable
    ]);
  };
});
export {
  __tla,
  usePreventPitchZoom as u
};
