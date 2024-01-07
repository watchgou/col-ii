import * as wasm from "../wasm-lib/pkg"
import * as transfer from "./protos/transfer"


export function encodeRequestTran(data){
   return transfer.encodeRequestTran(data);
}

export function decodeRequestTran(binary){
    return transfer.decodeRequestTran(binary);
}


export function get(url, callback) {
    wasm.get(url).then((res) => {
        callback(res);
    });
}

export function set(url, data, callback) {
    wasm.post(url, data).then((res) => {
        callback(res);
    });
}



export function wasmCreateElement(){
    wasm.create_tag();
}

export function createElement(selector,html,attribute,content){
    wasm.create_element(selector,html,attribute,content);
}