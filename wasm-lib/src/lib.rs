use wasm_bindgen::prelude::*;

enum JsError {
    TagNotExist,
}

impl JsError {
    fn message(&self) -> String {
        match self {
            JsError::TagNotExist => String::from("tag does not exist"),
        }
    }
    
}

#[wasm_bindgen]
pub fn create_tag() {
    let document = web_sys::window().unwrap().document().unwrap();
    let symbol = document.query_selector("#root").unwrap();
    if let Some(symbol) = symbol {
        symbol.set_inner_html("<div><h1>Hello, web-sys!</h1></div>");
    } else {
        let err_msg = JsValue::from(JsError::TagNotExist.message());
        let array = js_sys::Array::new();
        array.set(0, err_msg);
        web_sys::console::log(&array);
    }
}
