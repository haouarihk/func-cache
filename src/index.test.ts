import cache from "./";

const cachedFibonacci = cache(fibonacci);
function fibonacci(num: number) {
  let a = 1, b = 0, temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

describe("testing cache", () => {
  it("fibonacci", () => {
    const t0 = performance.now()

    const val1 = cachedFibonacci(1000)

    const t1 = performance.now()

    const val2 = cachedFibonacci(1000)

    const t2 = performance.now()

    expect(t2 - t1 < t1 - t0).toBe(true);

    expect(val1).toEqual(val2);
  });
});
