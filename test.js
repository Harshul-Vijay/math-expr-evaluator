const fs = require('fs');
const chalk = require('chalk');
var source = fs.readFileSync('./out/c++/out.wasm');
const env = {
  memoryBase: 0,
  tableBase: 0,
  memory: new WebAssembly.Memory({
    initial: 256
  }),
  table: new WebAssembly.Table({
    initial: 0,
    element: 'anyfunc'
  }),
  /* emscripten_asm_const_iii: () => {} */
}

const typedArray = new Uint8Array(source);

WebAssembly.instantiate(typedArray, {
  env: env
}).then(result => {
  console.log(result.instance.exports.evaluate(9, 9, '+'));
}).catch(e => {
  // error caught
  console.log(chalk.redBright(e));
});
