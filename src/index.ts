export interface FCOptions {
  lifeTime: number;
}




export default function cache(func: Function, options: FCOptions = { lifeTime: 0 }): typeof func | any {
  let cached: any = {};
  const timeOfCreation = Date.now();



  return (...args: any) => {
    const str = args.join(',');

    if (options.lifeTime !== 0)
      Date.now() - timeOfCreation > options.lifeTime && (cached = {});


    if (str in cached) return cached[str];
    return cached[str] = func(...args);
  }

}
