import fs from "fs/promises";
import { readFileSync } from "fs";


export default function fSCacher(tmpPath: string) {

    return {
        initialCache: JSON.parse(
            // @ts-ignore
            readFileSync(tmpPath)
                ? readFileSync(tmpPath, {
                    encoding: "utf-8",
                })
                : "{}"
        ),
        onDataUpdate: async (ndata: any) => {
            try {
                await fs.unlink(tmpPath);
                // eslint-disable-next-line no-empty
            } catch { }

            await fs.writeFile(tmpPath, JSON.stringify(ndata), {
                encoding: "utf-8",
                flag: "w",
            });
        },
    };
}