import { Lexer } from "./lexer";
import { Token } from "./interfaces";
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
  /**
   * Stores the output of `Lexer`.
   */
  protected _tokens: Array<Token> = [];

  /**
   * The final array of tokens.
   */
  tokens: Array<Token> = [];

  constructor(expr: string) {
    // Create a new `Lexer`
    const lexer = new Lexer(expr);
    this._tokens = lexer.tokens;

    // Create a letter stack and a number stack
    const ltrStack = new Stack<Token>();
    const numStack = new Stack<Token>();
    this._tokens.map((token: Token) => {
      // Check types and take the appropriate action
      if (token.type === 'literal') {
        ltrStack.push(token);
      } else if (token.type === 'number') {
        numStack.push(token);
      } else if (token.type === 'operator' || token.type === 'rparen' ||
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

    this.tokens.map((token: Token, index: number) => {
      if (token.type === 'literal') {
        if (!!constants[token.value.toUpperCase()]) {
          this.tokens[index].type = 'number';
          this.tokens[index].value = `${constants[token.value.toUpperCase()]}`;
        } else {
          throw new Error(`Undefined constant '${token.value}'`);
        }
      } else if (token.type === 'number') {
        const prevToken = this.tokens[index - 1];
        const prevPrevToken = this.tokens[index - 2];
        if (!!prevToken && prevToken.type === 'operator' &&
          prevToken.value === '-' && ((prevPrevToken &&
          prevPrevToken.type === 'operator') || !prevPrevToken)) {
          this.tokens[index - 1] = null;
          this.tokens[index] = {
            ...token,
            sign: '-'
          };
        }
      }
    });

    this.tokens = this.tokens.filter((token) => token === null ? false : true);
  }

  /**
   * Reduces a given `Stack`.
   *
   * @param {Stack<Token>} stack The stack to reduce
   */
  private reduce(stack: Stack<Token>) {
    return stack.reduce((prev, curr) => {
      return {
        type: null,
        value: prev.value + curr.value
      };
    }, true, true);
  }
}
