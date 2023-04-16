import redis from '@upstash/redis';


export default function upstashCacher(tmpPath: string, options: { client: redis.Redis }): Partial<FCOptions> {
    const red = options.client;
    return {
        async getCache() {
            return JSON.parse(
                await red.get(tmpPath) || "{}"
            )
        },
        onDataUpdate: async (ndata: any) => {
            await red.set(tmpPath, JSON.stringify(ndata))
        },
    };
}