# Fun cache

This is the fun and cache.

# How does it work:

It stores a map of results of a function and uses arguments as keys, for faster response,

Note that if the function result in different results with the same argument, the cache wouldn't work.

# How to use:

```ts
import funcache from "func-cache";

const cachedFibonacci: typeof fibonnacci = funcache(fibonacci);
function fibonnacci(num: number) {
  let a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}
```
