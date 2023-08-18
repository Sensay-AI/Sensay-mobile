import { useState } from "react"

/**
 * A hook that can be used to force update component.
 *
 */
export function useSelectedLanguages(defaultLanguages?: number[]) {
  return useState<number[]>(defaultLanguages || [])
}
