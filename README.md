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
import { fSCacher } from "func-cache/src/fs";
import funcache, { localStorageCacher } from "func-cache";

funcache(fibonacci, {
  // (1 sec) in miliseconds
  lifeTime: 1000, 
  
  // place to store the cache, incase of restarts (browser only)
  ...localStorageCacher("_cachePlace_for_fibonacci"), 

  // place to store the cache, incase of restarts (server only)
  ...fSCacher("./_cachePlace_for_fibonacci.json"), 

  /** debounce time wait to call onDataUpdate, default 1000ms */
  debounceTimer: 200,

  /** incase the call is async, (sometimes the script doesn't detect it's async and wont run the await for it) default: false */
  async: true,
});
```
