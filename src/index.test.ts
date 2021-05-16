//@ts-ignore
import waitSync from "wait-sync";
import cache from "./";

const cachedWait: typeof wait = cache(wait);
function wait() {
  waitSync(10)
  return "10 seconds"
}

describe("testing cache", () => {
  it("wait 10", () => {
    const t0 = performance.now();

    const val1 = cachedWait();

    const t1 = performance.now();

    const diff1 = t1 - t0;
    console.log(diff1);

    const val2 = cachedWait();

    const t2 = performance.now();

    const diff2 = t2 - t1;
    console.log(diff2);

    expect(diff2 < diff1).toBe(true);

    expect(val1).toEqual(val2);
  });
});
