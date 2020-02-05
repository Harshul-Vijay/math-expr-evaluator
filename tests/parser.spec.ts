import { Parser } from '../src/ts/parser';

describe('Parser test', () => {
  it('should return correct tokens', () => {
    const tokens = new Parser('2 * (1 + 1 - 3 / 4 * sin(pi / 4))').tokens;
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
        type: 'function',
        value: 'sin'
      },
      {
        type: 'lparen',
        value: '('
      },
      {
        type: 'number',
        value: Math.PI.toString()
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
        type: 'rparen',
        value: ')'
      },
      {
        type: 'rparen',
        value: ')'
      },
    ]);
  });
});
