import * as wasm from "../wasm-lib/pkg"
import * as util from "./util.js"
import * as gpu_js from "./webgpu.js" 


wasm.create_tag();

// wasm.get("http://127.0.0.1:8080/api/v1/simple").then((res) => {
//     // console.log(res);
// });

// wasm.post("http://127.0.0.1:8080/api/v1/simple", JSON.stringify({ "name": "test" })).then((res) => {
//     //console.log(res);
// });

util.transfer_data();

gpu_js.draw_gpu();




