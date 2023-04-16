interface FCOptions {
    lifeTime: number;

    onDataUpdate?: (nData: any) => void;

    getCache?: () => Promise<object>;
    initialCache?: object;

    /** debounce time wait to call onDataUpdate, default 1000ms */
    debounceTimer?: number;

    /** incase the call is async, (sometimes the script doesn't detect it's async and wont run the await for it) default: false */
    async?: boolean;

    /** shows logs */
    debug?: boolean;
}