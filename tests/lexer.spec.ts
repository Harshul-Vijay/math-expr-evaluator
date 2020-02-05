import { Lexer } from '../src/ts/lexer';

describe('Lexer test', () => {
  it('should return the correct tokens', () => {
    const tokens = new Lexer('2 * ( 1 + 1 - 3 / 4 * pi)').tokens;
    expect(tokens).toStrictEqual([
      {
        type: 'number',
        value: '2'
      },
      {
        type: 'operator',
        value: '*'
      },
      {
        type: 'lparen',
        value: '('
      },
      {
        type: 'number',
        value: '1'
      },
      {
        type: 'operator',
        value: '+'
      },
      {
        type: 'number',
        value: '1'
      },
      {
        type: 'operator',
        value: '-'
      },
      {
        type: 'number',
        value: '3'
      },
      {
        type: 'operator',
        value: '/'
      },
      {
        type: 'number',
        value: '4'
      },
      {
        type: 'operator',
        value: '*'
      },
      {
        type: 'literal',
        value: 'p'
      },
      {
        type: 'literal',
        value: 'i'
      },
      {
        type: 'rparen',
        value: ')'
      },
    ]);
  });

  it('should validate parentheses correctly', () => {
    const parentheses = new Lexer('').validateParentheses([
      '(',
      'test',
      ')',
    ]);
    expect(parentheses).toBeTruthy();
  });
});
