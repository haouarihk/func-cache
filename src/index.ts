export default function cache(func: Function): typeof func | any {
  const cached: any = {};

  return (...args: any) => {
    const str = args.join(',');

    if (cached[str]) return cached[str];
    return cached[str] = func(...args);
  }

}
