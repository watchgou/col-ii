build:
	yarn install
	wasm-pack build wasm-lib
run: 
	yarn vite

clean:
	rm -rf node_modules
	rm -rf wasm-lib/pkg
	cd wasm-lib && cargo clean