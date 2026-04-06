"use strict";

import { useLoader } from "./useLoader.js"; // adjust path
import React, { useEffect } from "react";
function useLoaderBinding(loading, options) {
  const loader = useLoader();
  const loaderIdRef = React.useRef(null);
  useEffect(() => {
    if (loading) {
      if (loaderIdRef.current == null) {
        loaderIdRef.current = loader.show(options);
      }
    } else {
      if (loaderIdRef.current != null) {
        loader.hide(loaderIdRef.current);
        loaderIdRef.current = null;
      }
    }
    return () => {
      if (!loading && loaderIdRef.current != null) {
        loader.hide(loaderIdRef.current);
        loaderIdRef.current = null;
      }
    };
  }, [loading, loader, options]);
}
export { useLoaderBinding };
//# sourceMappingURL=useLoaderBinding.js.map