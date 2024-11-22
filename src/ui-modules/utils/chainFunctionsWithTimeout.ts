const chainFunctionsWithTimeout = (
    functions: { func: () => void; timeout: number }[],
) => {
    functions.reduce((promise, { func, timeout }) => {
        return promise.then(
            () =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        func();
                        resolve();
                    }, timeout);
                }),
        );
    }, Promise.resolve());
};

export { chainFunctionsWithTimeout };
