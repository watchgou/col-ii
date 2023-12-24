import * as wasm from "../wasm-lib/pkg"

wasm.create_tag();

let result = wasm.get("www.baidu.com");
console.log(result);