import { BigNumber } from 'bignumber.js';

// /**
//  * Represents a decimal number, usually comes from user input.
//  */
// export interface Decimal {
//     /**
//      * 数字
//      */
//     value: number;
//     /**
//      * *10^exp
//      */
//     exp: number;
// }
// /**
//  * Represents a rational number, usually generated during computing.
//  */
// export interface Rational {
//     /**
//      * 分子
//      */
//     numerator: number;
//     /**
//      * 分母
//      */
//     denominator: number;
// }


/**
 * Represents a number.
 */
export type Real = BigNumber;

export function strToNumber(str: string): Real {
    return new BigNumber(str);
}

export function isNumber(obj: any) {
    return BigNumber.isBigNumber(obj);
}