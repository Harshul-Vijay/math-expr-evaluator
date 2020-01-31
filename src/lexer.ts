import { functions, operators } from "./helpers";
import { Token, TokenType } from "./interfaces";

/**
 * Breaks a given string into tokens.
 * 
 * @class Lexer
 * @param {string} expr The expression to break into tokens.
 */
export class Lexer {
  protected _tokens: Array<string> = [];

  /**
   * The array of tokens to output.
   */
  tokens: Array<Token> = [];

  constructor(expr: string) {
    // Remove all the whitespaces
    expr = expr.replace(/\s+/gi, '');
    this._tokens = expr.split('');
    if (this.validateParentheses(this._tokens)) {
      this._tokens.map((token: string, index: number) => {
        const type = this.classify(token);
        const typeNext = !!this._tokens[index + 1] ?
          this.classify(this._tokens[index + 1]) : false;
        if (typeNext && type === 'number' && typeNext === 'literal') {
          this.tokens.push({
            type: 'operator',
            value: '*'
          });
        }
        this.tokens.push({
          type: type,
          value: token
        });
      });
    } else {
      throw new Error(`Parentheses don't match.`);
    }
  }

  /**
   * Returns the type of a given token.
   * 
   * @function classify
   * @param {string} token The token to return the type of.
   * @returns {TokenType} The tokens type.
   */
  classify(token: string): TokenType {
    let type: TokenType = null;
    if (!!functions[token]) {
      type = 'function';
    } else if (token.match(/[.0-9]/gi)) {
      type = 'number';
    } else if (operators.find((op: string) => op === token ? true : false)) {
      type = 'operator';
    } else if (token.match(/[A-z]/gi)) {
      type = 'literal';
    } else if (token.match(/[(]/gi)) {
      type = 'lparen';
    } else if (token.match(/[)]/gi)) {
      type = 'rparen';
    } else {
      // Throw a new error
      throw new Error(`Unknown token: '${ token }'`);
    }
    return type;
  }

  /**
   * Validates parentheses in a given list of tokens.
   * 
   * @param {Array<string>} tokens
   */
  validateParentheses(tokens: Array<string>): boolean {
    let ctr: number = 0;
    tokens.map(token => token === '(' && ctr++ || token === ')' && ctr--);
    return (ctr === 0) ? true : false;
  }
}
