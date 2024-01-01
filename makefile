build:
	yarn install
	mkdir wasm-lib/src/transfer 
	protoc --rust_out=wasm-lib/src/transfer protos/transfer.proto
	wasm-pack build wasm-lib
	yarn build

run:
	yarn install
	mkdir wasm-lib/src/transfer 
	protoc --rust_out=wasm-lib/src/transfer protos/transfer.proto
	wasm-pack build wasm-lib
	yarn vite

clean:
	rm -rf dist
	rm -rf node_modules
	rm -rf wasm-lib/pkg
	rm -rf wasm-lib/src/transfer
	cd wasm-lib && cargo clean

git:
	git add .
	git commit -m "update"
	git push -u origin main	

doc:
	cd wasm-lib && cargo doc --open