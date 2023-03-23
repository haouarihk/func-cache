# Fun cache

This is the fun and cache.

# How does it work:

It stores a map of results of a function and uses arguments as keys, for faster response,

Note that if the function result in different results with the same argument, the cache wouldn't work.

# How to use:

```ts
import funcache from "func-cache";

const cachedFibonacci = funcache(fibonacci);
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

console.log(cachedFibonacci(1000)); //-- viewing the result
```

# Options:

```ts
funcache(fibonacci, {
  lifeTime: 1000, // (1 sec) in miliseconds
});
```
