export const getMillisecondToDateString = (millisecond: number) => {
    const date = new Date(millisecond);
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }`;
};
