import { Postfix } from "./postfix";
import { functions, Stack } from "./helpers";
export class Evaluator {
    constructor(expr) {
        this._result = 0;
        const postfix = new Postfix(expr).postfix;
        const stack = new Stack();
        postfix.map(token => {
            if (token.type === 'number') {
                stack.push(+token.value);
            }
            else if (token.type === 'operator') {
                const op2 = stack.pop();
                const op1 = stack.pop();
                let res = 0;
                if (token.value === '+') {
                    res = op1 + op2;
                }
                else if (token.value === '-') {
                    res = op1 - op2;
                }
                else if (token.value === '*') {
                    res = op1 * op2;
                }
                else if (token.value === '/') {
                    if (op2 === 0) {
                        throw new Error(`Cannot divide by zero`);
                    }
                    res = op1 / op2;
                }
                else if (token.value === '^') {
                    res = Math.pow(op1, op2);
                }
                else if (token.value === '%') {
                    res = op1 % op2;
                }
                else {
                    throw new Error(`Unknown operator '${token.value}'`);
                }
                stack.push(res);
            }
            else if (token.type === 'function') {
                if (!!functions[token.value]) {
                    const op1 = stack.pop();
                    const res = functions[token.value](`${op1}`);
                    stack.push(res);
                }
                else {
                    throw new Error(`Undefined function '${token.value}'`);
                }
            }
        });
        this._result = stack.reduce((prev, curr) => {
            return prev + curr;
        });
    }
    get result() {
        return this._result;
    }
}

//# sourceMappingURL=sourcemaps/evaluator.js.map
