import { Lexer } from "./lexer";
import { Stack, constants } from "./helpers";
/**
 * Parses a given expression.
 *
 * @class Parser
 * @param {string} expr The expression to parse.
 *
 * @todo Implement implicit multiplication
 */
export class Parser {
    constructor(expr) {
        /**
         * Stores the output of `Lexer`.
         */
        this._tokens = [];
        /**
         * The final array of tokens.
         */
        this.tokens = [];
        // Create a new `Lexer`
        const lexer = new Lexer(expr);
        this._tokens = lexer.tokens;
        // Create a letter stack and a number stack
        const ltrStack = new Stack();
        const numStack = new Stack();
        this._tokens.map((token) => {
            // Check types and take the appropriate action
            if (token.type === 'literal') {
                ltrStack.push(token);
            }
            else if (token.type === 'number') {
                numStack.push(token);
            }
            else if (token.type === 'operator' || token.type === 'rparen' ||
                token.type === 'lparen') {
                const lb = this.reduce(ltrStack);
                const nb = this.reduce(numStack);
                if (nb) {
                    this.tokens.push({
                        type: lexer.classify(nb.value),
                        value: nb.value
                    });
                }
                if (lb) {
                    this.tokens.push({
                        type: lexer.classify(lb.value),
                        value: lb.value
                    });
                }
                this.tokens.push(token);
            }
        });
        // If the letter and number stacks aren't empty, dump their contents to 
        // the output array
        if (!numStack.isEmpty()) {
            const val = this.reduce(numStack).value;
            this.tokens.push({
                type: lexer.classify(val),
                value: val
            });
        }
        if (!ltrStack.isEmpty()) {
            const val = this.reduce(ltrStack).value;
            this.tokens.push({
                type: lexer.classify(val),
                value: val
            });
        }
        this.tokens.map((token, index) => {
            if (token.type === 'literal') {
                if (!!constants[token.value.toUpperCase()]) {
                    this.tokens[index].type = 'number';
                    this.tokens[index].value = `${constants[token.value.toUpperCase()]}`;
                }
                else {
                    throw new Error(`Undefined constant '${token.value}'`);
                }
            }
        });
    }
    /**
     * Reduces a given `Stack`.
     *
     * @param {Stack<Token>} stack The stack to reduce
     */
    reduce(stack) {
        return stack.reduce((prev, curr) => {
            return {
                type: null,
                value: prev.value + curr.value
            };
        }, true, true);
    }
}

//# sourceMappingURL=sourcemaps/parser.js.map
