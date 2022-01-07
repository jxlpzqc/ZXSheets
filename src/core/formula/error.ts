export enum ParseErrorType {
    SyntaxError = "SyntaxError",
    IllegalCharacterError = "IllegalCharacterError"
}

export class ParseError extends Error {

    constructor(
        public type: ParseErrorType,
        public position: number = -1,
        message = ""
    ) {

        super((message ?? type.toString()) + (position == -1 ? "" : `at char index ${position}`));
    }
}

