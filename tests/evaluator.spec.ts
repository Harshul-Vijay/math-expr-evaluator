import { Evaluator } from '../src/ts/evaluator';

describe('Evaluator test', () => {
  it('should evaluate the expression correctly', () => {
    const evaluator = new Evaluator('3 + 4');
    expect(evaluator.result).toBe(7);
    const evaluator2 = new Evaluator('-1 * (3 + 2)');
    expect(evaluator2.result).toBe(-5);
  });
})
