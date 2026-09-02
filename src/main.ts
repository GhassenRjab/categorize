/**
 * @deprecated This package is deprecated and no longer maintained.
 */
export type Category<T, K extends string> = {
  name: K;
  filter: (element: T) => boolean;
};

/**
 * @deprecated This package is deprecated and no longer maintained.
 */
export type Result<T, K extends string> = Partial<Record<K, T[]>>;

/**
 * @deprecated This package is deprecated and no longer maintained.
 */
export type Options = {
  singleCategoryMatch: boolean;
};

/**
 * Organizes array elements into categories.
 *
 * @deprecated This package is deprecated and no longer maintained. Use native `Object.groupBy` or `Map.groupBy` where applicable.
 */
export function categorize<T, K extends string>(
  items: T[],
  categories: Readonly<Category<T, K>[]>,
  options: Options = { singleCategoryMatch: true },
): Result<T, K> {
  const result: Result<T, K> = {};
  const itemsLength = items.length;
  for (let i = 0; i < itemsLength; i++) {
    const element = items[i];

    const categoriesLength = categories.length;
    for (let j = 0; j < categoriesLength; j++) {
      const { name, filter } = categories[j];
      if (filter(element)) {
        (result[name] ??= []).push(element);
        if (options.singleCategoryMatch) break;
      }
    }
  }

  return result;
}
