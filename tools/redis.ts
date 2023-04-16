import redis from 'redis';


export default async function redisCacher(tmpPath: string, options: { client: redis.RedisClientType }) {
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