import { aforSec } from "aforwait"
import cache from "./";

const cachedWait: typeof wait = cache(wait);
async function wait() {
  await aforSec(1);
  return "1 seconds"
}

describe("testing cache", () => {
  it("wait 1", async () => {
    const t0 = performance.now();

    const val1 = await cachedWait();

    const t1 = performance.now();

    const diff1 = t1 - t0;
    console.log(diff1);

    const val2 = await cachedWait();

    const t2 = performance.now();

    const diff2 = t2 - t1;
    console.log(diff2);

    expect(diff2 < diff1).toBe(true);

    expect(val1).toEqual(val2);
  });
});
