export type Category<T, K extends string> = {
  name: K;
  filter: (element: T) => boolean;
};

type Result<T, K extends string> = Partial<Record<K, T[]>>;

export function categorize<T, K extends string>(
  elements: T[],
  categories: Readonly<Category<T, K>[]>,
): Result<T, K> {
  return elements.reduce<Result<T, K>>(
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
