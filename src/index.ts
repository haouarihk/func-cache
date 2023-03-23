export interface FCOptions {
  lifeTime: number;
}


export default function cache<T extends Function>(func: T, options: FCOptions = { lifeTime: 0 }): T {
  let cached: any = {};
  const timeOfCreation = Date.now();

  const cache = (newval: any, str: any) => {
    if (options.lifeTime !== 0 && Date.now() - timeOfCreation > options.lifeTime)
      cached = {}


    if (str in cached) return cached[str];
    return cached[str] = newval;
  }

  if (func.constructor.name === 'AsyncFunction') {
    return (async (...args: any) =>
      cache(await func(...args), args.join(","))
    ) as any
  }

  return ((...args: any) =>
    cache(func(...args), args.join(","))
  ) as any

}
