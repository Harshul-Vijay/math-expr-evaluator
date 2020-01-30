import { Evaluator } from '../src/evaluator';

describe('Evaluator test', () => {
  it('should evaluate the expression correctly', () => {
    const evaluator = new Evaluator('3 + 4');
    expect(evaluator.result).toBe(7);
  });
})
