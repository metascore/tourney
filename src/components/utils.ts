export function scoreToShortString (n : number) {
    if (!n) {
        return 'Zero';
    }
    if (n >= 1_000_000_000_000) {
        const trillions = n % 1_000_000_000_000;
        const remainder = (n % (trillions * 1_000_000_000_000)) / 1_000_000_000_000;
        return `${(trillions + remainder).toFixed(2)} Trillion`;
    };
    const billion = n % 1_000_000_000;
    const remainder = (n % (billion * 1_000_000_000)) / 1_000_000_000;
    return `${(billion + remainder).toFixed(2)} Billion`;
};

export function numberWithCommas (n : number) {
    console.log(n);
    return Number(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '_');
}