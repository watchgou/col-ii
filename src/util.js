import * as wasm from "../wasm-lib/pkg"
import * as transfer from "./protos/transfer"

export function transfer_data() {
    let resp = wasm.set_protobuf();
    const message = transfer.decodeRequestTran(resp);
    console.log(message);
    const u8_vec = transfer.encodeRequestTran({ from: "jon", to: "jack", amount: 1 });
    const get_request_tran = wasm.get_protobuf(u8_vec);
    console.log(get_request_tran);
}