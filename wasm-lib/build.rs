fn main() -> std::io::Result<()> {
    tonic_build::compile_protos("proto/transfer.proto")?;
    println!("hello");
    Ok(())
}
