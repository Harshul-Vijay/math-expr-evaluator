em++ ^
  src/c++/evaluator.cpp ^
  -Oz ^
  -s WASM=1 ^
  -s NO_EXIT_RUNTIME=1 ^
  -s EXPORTED_FUNCTIONS="['_evaluate']" ^
  -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" ^
  -o out/c++/out.wasm
