# Benchmark

v4 has been rewritten with performance improvements in mind.

First, we use TypeScript in order to provide type safety and code completion. This allowed us to delete the verification step that we had before.

Second, we use `for` instead of `reduce`, which led to significant performance boost (I recommend reading [this article](https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/#arrayreduce-vs-for-and-forof)).

Last, we match an item with a single category by default. Which allowed us to break the categories loop as soon as possible.

I used `benchmark` to compute the performance gains. Code is shared [here](./benchmark.ts)

Here is the result of the benchmark. Higher is better.

![Benchmark](/assets/benchmark.jpeg "Benchmark")

So, based on the ops/sec values, the new version with a single category is approximately 41.32% faster than the legacy version, and the version with multiple categories is approximately 19.33% faster than the legacy version.

We didn't include the legacy validation step in the benchmark. Meaning the performance gains should be higher than this!
