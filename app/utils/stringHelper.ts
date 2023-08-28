export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const levelNumberToText = {
  1: "Easy",
  2: "Intermediate",
  3: "Advanced"
}