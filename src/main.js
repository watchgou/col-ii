import * as wasm from "../wasm-lib/pkg"
import protobuf from "protobufjs"

wasm.create_tag();

wasm.get("http://127.0.0.1:8080/api/v1/simple").then((res) => {
    // console.log(res);
});

wasm.post("http://127.0.0.1:8080/api/v1/simple", JSON.stringify({ "name": "test" })).then((res) => {
    //console.log(res);
});



protobuf.load("protos/transfer.proto", (err, root) => {
    if (err) throw err;
    // 获取消息类型
    const RequestTran = root.lookupType("RequestTran");
    // 创建一个消息实例
    // const message = MyMessage.create({
    //     name: "John",
    //     age: 25
    // });
    // // 将消息序列化为字节数组
    // const buffer = MyMessage.encode(message).finish();
    let resp = wasm.test_protobuf();
    // 反序列化字节数组为消息
    const message = RequestTran.decode(resp);

    console.log("Name:", message);
});


