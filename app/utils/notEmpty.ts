export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (typeof value === "string") {
    return value && value.length > 0;
  }
  return value !== null && value !== undefined;
}