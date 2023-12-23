build:
	yarn install
	wasm-pack build src-wasm
run: 
	yarn vite

clean:
	rm -rf node_modules
	rm -rf src-wasm/pkg
	cd src-wasm && cargo clean