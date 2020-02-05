#include <emscripten/emscripten.h>
/* #include <stack>
#include <iostream>
using namespace std;

int main() {
  cout << "Hi!" << endl;
  return 0;
} */

extern "C" {
  EMSCRIPTEN_KEEPALIVE
  int evaluate(int num1, int num2, char op) {
    /* stack<int> Stack;
    Stack.push(1);
    Stack.push(2);
    Stack.push(3);
    return Stack.top(); */
    /* EM_ASM_({
      console.log('Hi; num1: ', $0, '; num2: ', $1, '; op: ', $2);
    }, num1, num2, op); */
    switch (op) {
      case '+':
        return num1 + num2;
        break;

      case '-':
        return num1 - num2;
        break;

      case '/':
        return num1 / num2;
        break;

      case '*':
        return num1 * num2;
        break;

      case '^':
        return num1 ^ num2;
        break;

      case '%':
        return num1 % num2;
        break;

      default:
        return -1;
        break;
    }
    if (op == '+') {
    } else if (op == '-') {
    } else if (op == '/') {
    } else if (op == '*') {
    } else if (op == '^') {
    } else if (op == '%') {
    } else {
      /* return NULL; */
    }
  }
}
