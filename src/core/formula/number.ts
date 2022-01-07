
/**
 * Represents a rational number, usually generated during computing.
 */
export interface Rational {
    /**
     * 分子
     */
    numerator: number;
    /**
     * 分母
     */
    denominator: number;
}

/**
 * Represents a decimal number, usually comes from user input.
 */
export interface Decimal {
    /**
     * 数字
     */
    value: number;
    /**
     * *10^exp
     */
    exp: number;
}

/**
 * Represents a number.
 */
export type Real = Rational | Decimal;

export function strToNumber(str: string): Decimal {
    return {
        value: parseFloat(str),
        exp: 0
    }
}