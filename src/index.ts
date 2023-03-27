import debounce from "debounce";
import util from "util";
export interface FCOptions {
  lifeTime: number;
  onDataUpdate?: (nData: any) => void;
  initialCache?: any;

  /** debounce time wait to call onDataUpdate, default 1000ms */
  debounceTimer?: number;

  /** incase the call is async, (sometimes the script doesn't detect it's async and wont run the await for it) default: false */
  async?: boolean;
}


export default function funCache<T extends Function>(func: T, options: FCOptions = { lifeTime: 0, debounceTimer: 1000, async: false }): T {
  let cached: any = {
    ____timeOfCreation: Date.now(),
    ...options.initialCache
  };

  const updateData = options.onDataUpdate ? debounce(() => {
    options.onDataUpdate?.(cached);
  }, options.debounceTimer) : undefined;

  const checkExpiry = () => {
    if (options.lifeTime !== 0 && Date.now() - cached.____timeOfCreation > options.lifeTime)
      cached = { ____timeOfCreation: cached.____timeOfCreation }
  }

  const cache = (getnewval: Function, str: any) => {
    checkExpiry();


    if (str in cached) return cached[str];
    cached[str] = getnewval();

    updateData?.();

    return cached[str]
  }

  const asyncCache = async (getnewval: Function, str: any) => {
    checkExpiry();

    if (str in cached) return cached[str];
    cached[str] = await getnewval();

    updateData?.();

    return cached[str]
  }

  if (options.async || util.types.isAsyncFunction(func)) {
    return (async (...args: any) =>
      await asyncCache(() => func(...args), args.join(","))
    ) as any
  }

  return ((...args: any) =>
    cache(func(...args), args.join(","))
  ) as any
}



export function fSCacher(tmpPath: string) {
  const fs = require("fs")
  return {
    initialCache: JSON.parse(
      // @ts-ignore
      fs.existsSync(tmpPath)
        ? fs.readFileSync(tmpPath, {
          encoding: "utf-8",
        })
        : "{}"
    ),
    onDataUpdate: (ndata: any) => {
      try {
        fs.unlinkSync(tmpPath);
        // eslint-disable-next-line no-empty
      } catch { }

      fs.writeFileSync(tmpPath, JSON.stringify(ndata), {
        encoding: "utf-8",
        flag: "w",
      });
    },
  };
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