const indexReg = /^([a-zA-Z]+)(\d+)$/;

export enum CmpIndexResult {
    Equal = 0,
    Top = 1,
    TopRight = 2,
    Right = 3,
    BottomRight = 4,
    Bottom = 5,
    BottomLeft = 6,
    Left = 7,
    TopLeft = 8
}

/**
 * 获取a在b的哪一边
 * @param a 一个索引号，例如A1
 * @param b 一个索引号
 * @returns
 */
export function cmpIndex(a: string, b: string): CmpIndexResult {
    const aResult = indexReg.exec(a);
    const bResult = indexReg.exec(b);
    if (!!aResult && !!bResult && aResult.length == 3 && bResult.length == 3) {
        const ar = parseInt(aResult[2]),
            br = parseInt(bResult[2]),
            ac = indexLetterToNumber(aResult[1]),
            bc = indexLetterToNumber(bResult[1]);

        if (ar == br) {
            if (ac == bc) return CmpIndexResult.Equal;
            else if (ac > bc) return CmpIndexResult.Right;
            else return CmpIndexResult.Left;
        }
        else if (ar > br) {
            if (ac == bc) return CmpIndexResult.Bottom;
            else if (ac > bc) return CmpIndexResult.BottomRight;
            else return CmpIndexResult.BottomLeft;
        }
        else {
            if (ac == bc) return CmpIndexResult.Top;
            else if (ac > bc) return CmpIndexResult.TopRight;
            else return CmpIndexResult.TopLeft;
        }

    }
    else {
        throw new Error("Invalid index!");
    }
}

export function isALeftTopOfB(a: string, b: string): boolean {
    const result = cmpIndex(a, b);
    return (result == CmpIndexResult.Equal ||
        result == CmpIndexResult.Left ||
        result == CmpIndexResult.Top ||
        result == CmpIndexResult.TopLeft);
}

/**
 * 索引中的字母转换为数字
 * 例如将B转换为2
 * @param letterIndex 字母索引
 */
export function indexLetterToNumber(letterIndex: string): number {
    let num = 0;
    const l = letterIndex.toLowerCase();
    for (let i = 0; i < l.length; i++) {
        num *= 26;
        const n = l.charCodeAt(i) - 'a'.charCodeAt(0) + 1;
        num += n;
    }
    return num;
}


export function indexNumberToLetter(index: number): string {
    const chars: number[] = [];
    while (index != 0) {
        let cl = index % 26;
        if (cl === 0) cl = 26;
        chars.push(cl);
        index = (index - cl) / 26;
    }
    let str = '';
    while (chars.length != 0) {
        str += String.fromCharCode('A'.charCodeAt(0) + (chars.pop()!) - 1);
    }
    return str;
}


export function exactIndex(index: string): number[] {

    const result = indexReg.exec(index);
    if (result && result.length == 3)
        return [indexLetterToNumber(result[1]), parseInt(result[2])]
    else {

        throw new Error("Invalid index!");
    }
}

export function arrToIndexStr(arr: number[]): string {
    return indexNumberToLetter(arr[0]) + arr[1];
}