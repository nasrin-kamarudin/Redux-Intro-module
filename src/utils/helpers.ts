import type { DetailItem } from "../types/drs.types";

export function createData<T extends Record<string, unknown>>(row: T): T {
  return row;
}

export const toMap = (arr: DetailItem[]): Record<string, string> =>
  Object.fromEntries(arr.map((item) => [item.label, item.value]));
