import fs from "fs";


export function fSCacher(tmpPath: string) {

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