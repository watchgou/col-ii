use wasm_bindgen::prelude::*;

enum JsError<'a> {
    Err(&'a str),
}

impl<'a> JsError<'a> {
    /// Construct a JavaScript `Error` object with a string message
    #[inline]
    pub fn new_err(value: &'a str) -> JsError<'a> {
        Self::Err(value)
    }
   
    pub fn message(&self) -> &str {
        match self {
            JsError::Err(err_value) => err_value,
        
        }
    }
}

#[wasm_bindgen]
pub fn make_the_window_small() {
    let document = web_sys::window().unwrap().document().unwrap();
    let symbol = document.query_selector("#app-body").unwrap();
    if let Some(symbol) = symbol {
        symbol.set_inner_html("<h1>Hello, web-sys!</h1>");
    } else {
        let err = JsValue::from(JsError::new_err("tag does not exist").message());
        let array = js_sys::Array::new();
        array.set(0, err);
        web_sys::console::log(&array);
    }
}
