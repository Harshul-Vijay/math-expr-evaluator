import { Postfix } from '../src/postfix';

describe('Postfix test', () => {
  it('should return the correct postfix expression', () => {
    const postfix = new Postfix('3 + 4 * sin(1)').postfix;
    expect(postfix).toStrictEqual([
      {
        type: 'number',
        value: '3',
      },
      {
        type: 'number',
        value: '4',
      },
      {
        type: 'number',
        value: '1',
      },
      {
        type: 'function',
        value: 'sin',
      },
      {
        type: 'operator',
        value: '*',
      },
      {
        type: 'operator',
        value: '+',
      },
    ]);
    const postfix2 = new Postfix('(3^4)^5').postfix;
    expect(postfix2).toStrictEqual([
      {
        type: 'number',
        value: '3',
      },
      {
        type: 'number',
        value: '4',
      },
      {
        type: 'operator',
        value: '^',
      },
      {
        type: 'number',
        value: '5',
      },
      {
        type: 'operator',
        value: '^',
      },
    ]);
  });
});
