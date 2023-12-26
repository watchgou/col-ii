import * as wasm from "../wasm-lib/pkg"

wasm.create_tag();

wasm.get("http://127.0.0.1:8080/api/v1/simple").then((res) => {
   // console.log(res);
});

const body = { "name": "test"};
body.st
wasm.post("http://127.0.0.1:8080/api/v1/simple", JSON.stringify(body)).then((res) => {
    //console.log(res);
});