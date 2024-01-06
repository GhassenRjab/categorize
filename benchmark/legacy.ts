import { Category, Result } from "../src/main";

export function categorize<T, K extends string>(
  items: T[],
  categories: Readonly<Category<T, K>[]>,
): Result<T, K> {
  return items.reduce<Result<T, K>>(
    (result, item) => {
      categories.forEach(({ name, filter }) => {
        if (filter(item)) {
          (result[name] ??= []).push(item);
        }
      });
      return result;
    },
    {} as Result<T, K>,
  );
}
