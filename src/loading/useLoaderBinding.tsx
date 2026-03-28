
import { useLoader, ShowLoaderOptions } from "./useLoader"; // adjust path
import React, { useEffect } from "react";

function useLoaderBinding(
  loading: boolean,
  options?: {
    label?: string;
    variant?: "spinner" | "pulse" | "dots" | "circular";
    theme?: "light" | "dark" | "system";
  },
) {
  const loader = useLoader();
  const loaderIdRef = React.useRef<number | null>(null);

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
export type { ShowLoaderOptions };