import { MathFunctions, MathConstants } from "./interfaces";

const convertToRadians = (angle: string) => {
  let multiplier = Math.PI;
  if (angle.match(/deg/gi)) {
    multiplier /= 180;
  } else if (angle.match(/grad/gi)) {
    multiplier /= 200;
  } else {
    multiplier /= Math.PI;
  }
  return ((+angle.replace(/[A-z]/gi, '')) * multiplier);
};

export const associativity = {
  '^': 'right',
  '/': 'left',
  '*': 'left',
  '+': 'left',
  '-': 'left',
};

export const constants: MathConstants = {
  E: Math.E,
  LN10: Math.LN10,
  LN2: Math.LN2,
  LOG2E: Math.LOG2E,
  LOG10E: Math.LOG10E,
  PI: Math.PI,
  SQRT1_2: Math.SQRT1_2,
  SQRT2: Math.SQRT2,
  INFINITY: Infinity
};

export const functions: MathFunctions = {
  sin: (angle: string) => {
    return Math.sin(convertToRadians(angle));
  },
  cos: (angle: string) => {
    return Math.cos(convertToRadians(angle));
  },
  tan: (angle: string) => {
    return Math.tan(convertToRadians(angle));
  },
  cot: (angle: string) => {
    return (1 / (functions.tan(angle)));
  },
  sec: (angle: string) => {
    return (1 / (functions.cos(angle)));
  },
  cosec: (angle: string) => {
    return (1 / (functions.sin(angle)));
  },
  ln: (number: number) => {
    return Math.log(number);
  },
  log: (number: number) => {
    return Math.log(number);
  },
  logtwo: (number: number) => {
    return Math.log2(number);
  },
  logten: (number: number) => {
    return Math.log10(number);
  },
  sqrt: (number: number) => {
    return Math.sqrt(number);
  }
};

export const operators = [
  '^',
  '+', 
  '-',
  '/',
  '*',
  '%',
];

export const precedence = {
  '^': 4,
  '/': 3,
  '*': 3,
  '+': 2,
  '-': 2,
  '%': 1,
};

export class Stack<T = any> {
  protected _stack: Array<T> = [];

  constructor(...data: Array<T>) {
    this._stack.push(...data);
  }

  get contents() {
    return this._stack || null;
  }

  isEmpty() {
    return this._stack.length === 0 ? true : false;
  }

  peekAtLast(): T {
    return this._stack[this._stack.length - 1];
  }
  
  peek(): T {
    return this._stack[0];
  }

  pop(): T {
    const out = this._stack.pop();
    return out;
  }

  push(...items: Array<T>) {
    this._stack.push(...items);
    return true;
  }

  reduce(method: (prev: T, curr: T) => T, silent: boolean = false,
    resetOnReduction: boolean = false): T {
    if (this.isEmpty()) {
      if (!silent) {
        throw new Error('Cannot reduce empty stack.');
      } else if (silent) {
        return null;
      }
    }
    const out: T = this._stack.reduce((prev, curr) => {
      return method(prev, curr);
    });
    if (resetOnReduction) {
      this.reset();
    }
    return out;
  }

  reset() {
    this._stack = [];
    return true;
  }
};
