//convert a string or a number to a string that is a number with decimal 2
export const toDecimalString = (number: string | number) => {
    if (typeof number === 'string') {
        return parseFloat(number).toFixed(2);
    }

    return number.toFixed(2);
}