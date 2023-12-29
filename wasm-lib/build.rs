fn main() -> std::io::Result<()> {
    //    protobuf_codegen_pure::Codegen::new().out_dir("src/")
    //    .include("protos/")
    //    .inputs(&["protos/transfer.proto"]).run()?;

    protobuf_codegen::Codegen::new()
        .protoc()
        .protoc_path(&protoc_bin_vendored::protoc_bin_path().unwrap())
        .includes(&["protos/"])
        .input("protos/transfer.proto")
        .cargo_out_dir("protos")
        .run_from_script();
    Ok(())
}
