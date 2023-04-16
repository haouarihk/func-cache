import redis from '@upstash/redis';


export default async function upstashCacher(tmpPath: string, options: { client: redis.Redis }) {
    const red = options.client;
    return {
        initialCache: JSON.parse(
            await red.get(tmpPath) || "{}"
        ),
        onDataUpdate: async (ndata: any) => {
            await red.set(tmpPath, JSON.stringify(ndata))
        },
    };
}