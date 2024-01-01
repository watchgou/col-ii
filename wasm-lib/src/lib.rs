use protobuf::Message;
use serde::ser::SerializeStruct;
use wasm_bindgen::prelude::*;

mod err;
mod transfer;
use err::JsErr;
use transfer::transfer::RequestTran;
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
        array.push(&err_msg);
        web_sys::console::log(&array);
    }
}

#[wasm_bindgen]
pub async fn get(url: String) -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(web_sys::RequestMode::Cors);
    let request = Request::new_with_str_and_init(&url, &opts)?;
    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;
    let value: Response = resp_value.dyn_into()?;
    let json = JsFuture::from(value.json()?).await?;
    Ok(json)
}

#[wasm_bindgen]
pub async fn post(url: String, val: String) -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("POST");
    opts.mode(web_sys::RequestMode::Cors);
    if !val.is_empty() {
        let param = JsValue::from(val);
        opts.body(Some(&param));
    }
    let request = Request::new_with_str_and_init(&url, &opts)?;
    request.headers().set("Content-Type", "application/json")?;
    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;
    let value: Response = resp_value.dyn_into()?;
    let json = JsFuture::from(value.json()?).await?;
    Ok(json)
}

/// 序列化
/// ```
/// const request_transfer =  wasm.set_protobuf();
/// ```
#[wasm_bindgen]
pub fn set_protobuf() -> Result<Vec<u8>, JsError> {
    // protobuf  序列化
    let mut request_tran: RequestTran = RequestTran::new();
    request_tran.amount = 1;
    request_tran.to = "test".to_string();
    request_tran.from = "test".to_string();
    let bytes = request_tran.write_to_bytes().unwrap();
    Ok(bytes)
}

/// 接受 u8数组，反序列化
#[wasm_bindgen]
pub fn get_protobuf(source: Vec<u8>) -> Result<JsValue, JsError> {
    // protobuf  反序列化
    let request_tran = RequestTran::parse_from_bytes(&source).unwrap();
    Ok(serde_wasm_bindgen::to_value(&request_tran)?)
}

impl serde::Serialize for RequestTran {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut s = serializer.serialize_struct("Transfer", 3)?;
        s.serialize_field("from", &self.from)?;
        s.serialize_field("to", &self.to)?;
        s.serialize_field("amount", &self.amount)?;
        s.end()
    }
}
