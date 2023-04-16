import redis from 'redis';


export default function redisCacher(tmpPath: string, options: { client: redis.RedisClientType }): Partial<FCOptions> {
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