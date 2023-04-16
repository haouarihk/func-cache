interface FCOptions {
    lifeTime: number;

    /** incase you want to save the data somewhere else and it's async */
    onDataUpdate?: (nData: any) => Promise<void>;

    /** incase you want to get the initial data from somewhere else */
    getCache?: () => Promise<object>;

    initialCache?: any;

    /** debounce time wait to call onDataUpdate, default 1000ms */
    debounceTimer?: number;

    /** incase the call is async, (sometimes the script doesn't detect it's async and wont run the await for it) default: false */
    async?: boolean;

    /** shows logs */
    debug?: boolean;
}