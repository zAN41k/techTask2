export const setLocalStorage = async (page, data) => {
    await page.addInitScript((data) => {
        for (const key in data) {
            window.localStorage.setItem(
                data[key].key,
                JSON.stringify(data[key].value),
            );
        }
    }, data);
};
