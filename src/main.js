import * as wasm from "../wasm-lib/pkg"
import protobuf from "protobufjs"

wasm.create_tag();

wasm.get("http://192.168.50.154:8080/api/v1/simple").then((res) => {
    // console.log(res);
});

wasm.post("http://192.168.50.154:8080/api/v1/simple", JSON.stringify({ "name": "test" })).then((res) => {
    //console.log(res);
});



protobuf.load("../protos/transfer.proto", (err, root) => {
    if (err) throw err;
    // 获取消息类型
    const RequestTran = root.lookupType("RequestTran");
    // 创建一个消息实例
    const request_tran = RequestTran.create({
        from: "jon",
        to: "jack",
        amount: 1,
    });
    const u8_vec = RequestTran.encode(request_tran).finish();
    const get_request_tran = wasm.get_protobuf(u8_vec);
    console.log(get_request_tran);
    // // 将消息序列化为字节数组
    // const buffer = MyMessage.encode(message).finish();
    let resp = wasm.set_protobuf();
    // 反序列化字节数组为消息
    const message = RequestTran.decode(resp);

    console.log("Name:", message);
});


