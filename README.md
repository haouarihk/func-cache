# Fun cache

This is the fun and cache.

# How does it work:

It stores a map of results of a function and uses arguments as keys, for faster response,

Note that if the function result in different results with the same argument, the cache wouldn't work.

# How to use:

```ts
import funcache from "func-cache";

const cachedFibonacci = funcache((num: number) => {
    // ... your function here
}, options); // about the options, see below


console.log(cachedFibonacci(1000)); //-- viewing the result

console.log(cachedFibonacci.noCache(1000)); //-- run without caching

console.log(cachedFibonacci.clearCache()); //-- to clear the cache
```


# Options:

```ts
import fSCacher from "func-cache/tools/fs"; // only for server
import redisCacher from "func-cache/tools/redis"; // only for server
import upstashCacher from "func-cache/tools/upstash"; // only for server

import funcache, { localStorageCacher } from "func-cache";

const options = {
  // (1 sec) in miliseconds
  lifeTime: 1000, 

  /** debounce time wait to call onDataUpdate, default 1000ms */
  debounceTimer: 200,

  /** incase the call is async, (sometimes the script doesn't detect it's async and wont run the await for it) default: false */
  async: true,


    
  // place to store the cache, incase of restarts (browser only)
  ...localStorageCacher("_cachePlace_for_fibonacci"), 

  // place to store the cache, incase of restarts (server only). fs way
  ...fSCacher("./_cachePlace_for_fibonacci.json"), 

  // place to store the cache, incase of restarts (server only). redis way
  ...redisCacher(yourFunction, {
    client: redisClient,
  }),

  // place to store the cache, incase of restarts (server only). upstash way
  ...upstashCacher(upstashClient, {
    client: upstashClient,
  }),
};

```