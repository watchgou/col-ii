use wasm_bindgen::prelude::*;

mod err;
use err::JsErr;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, Response};

#[wasm_bindgen]
pub async fn create_tag() {
    let document = web_sys::window().unwrap().document().unwrap();
    let symbol = document.query_selector("#root").unwrap();
    if let Some(symbol) = symbol {
        symbol.set_inner_html("<div><h1>Hello, web-sys!</h1></div>");
    } else {
        let err_msg = JsValue::from(JsErr::TagNotExist.message());
        let array = js_sys::Array::new();
        array.set(0, err_msg);
        web_sys::console::log(&array);
    }
}

#[wasm_bindgen]
pub async fn get(url: String) -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(web_sys::RequestMode::Cors);
    let request = Request::new_with_str_and_init(&url, &opts)?;
    request.headers().set("Accept", "application/json")?;
    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;
    let value: Response = resp_value.dyn_into()?;
    let json = JsFuture::from(value.json()?).await?;
    Ok(json)
}
