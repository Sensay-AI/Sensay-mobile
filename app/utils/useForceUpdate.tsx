import { useState } from "react"

/**
 * A hook that can be used to force update component.
 *
 */
export function useForceUpdate() {
  const [, setToggle] = useState(false);
  return () => setToggle(toggle => !toggle);
}
