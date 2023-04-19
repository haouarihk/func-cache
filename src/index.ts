import debounce from "debounce";
import util from "util";

export default function funCache<T extends Function>(func: T, options: FCOptions = { lifeTime: 0, debounceTimer: 1000, async: false }): T & { clearCache: () => void } {
  let cached: any = {
    ____timeOfCreation: Date.now(),
    ...options.initialCache
  };

  let firstTimeDone = !!options.initialCache;
  const getData = async () => {
    await options.getCache?.()?.then((data: any) => {
      cached = { ...data, ...cached };
    }) || {};
  }

  const updateData = options.onDataUpdate ? debounce(() => {
    try {
      options.onDataUpdate?.(cached);
    } catch (err) {
      if (options.debug) {
        console.error(err)
      }
    }
  }, options.debounceTimer) : undefined;

  const checkExpiry = () => {
    if (options.lifeTime !== 0 && Date.now() - cached.____timeOfCreation > options.lifeTime)
      cached = { ____timeOfCreation: cached.____timeOfCreation }
  }

  const cachedFN = ((...args: any) => {

    checkExpiry();

    const str = args.join(",");

    if (str in cached) return cached[str];

    const re = func(...args);

    //async
    if (options.async || !util.types.isPromise(re))
      return new Promise(async (s, r) => {
        try {
          if (!firstTimeDone) {
            firstTimeDone = true;
            try {
              await getData();
            } catch { }
          }

          const val = await re;
          cached[str] = val;
          updateData?.();
          return s(val)

        } catch (err) {
          r(err)
        }
      })

    // sync
    cached[str] = re;
    updateData?.();
    return re;
  }) as any;

  cachedFN.clearCache = () => {
    cached = { ____timeOfCreation: Date.now() }
  }

  cachedFN.noCache = (...args: any) => func(...args);

  return cachedFN;
}



export function localStorageCacher(tmpPath: string, options?: { localStorage?: Storage }) {
  const ls = options?.localStorage || window.localStorage;
  return {
    initialCache: JSON.parse(
      ls.getItem(tmpPath) || "{}"
    ),
    onDataUpdate: (ndata: any) => {
      ls.setItem(tmpPath, JSON.stringify(ndata))
    },
  };
}




export async function fSCacher(tmpPath: string) {
  const fs = require("fs");
  const fsPromises = require("fs/promises");

  return {
    initialCache: JSON.parse(
      // @ts-ignore
      fs.existsSync(tmpPath)
        ? fs.readFileSync(tmpPath, {
          encoding: "utf-8",
        })
        : "{}"
    ),
    onDataUpdate: async (ndata: any) => {
      try {
        await fsPromises.unlink(tmpPath);
        // eslint-disable-next-line no-empty
      } catch { }

      await fsPromises.writeFile(tmpPath, JSON.stringify(ndata), {
        encoding: "utf-8",
        flag: "w",
      });
    },
  };
}

import type { RedisClientType } from 'redis';

export function redisCacher(tmpPath: string, options: { client?: RedisClientType }): Partial<FCOptions> {
  return {
    async getCache() {
      return JSON.parse(
        options.client && await options.client.get(tmpPath) || "{}"
      )
    },
    onDataUpdate: async (ndata: any) => {
      options.client && await options.client.set(tmpPath, JSON.stringify(ndata))
    },
  };
}

import type { Redis } from '@upstash/redis';

export function upstashCacher(tmpPath: string, options: { client?: Redis }): Partial<FCOptions> {
  return {
    async getCache() {
      return JSON.parse(
        options.client && await options.client.get(tmpPath) || "{}"
      )
    },
    onDataUpdate: async (ndata: any) => {
      options.client && await options.client.set(tmpPath, JSON.stringify(ndata))
    },
  };
}