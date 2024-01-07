use wasm_bindgen::JsValue;
use web_sys::Element;

use crate::enums::err::JsErr;

pub fn draw_canvas(html: String, attribute: String, content: String) -> Element {
    let document = web_sys::window().unwrap().document().unwrap();
    let create_ele = document.create_element(&html);
    match create_ele {
        Ok(ele) => {
            ele.set_attribute(&attribute, &content).unwrap();
            ele
        }
        Err(err) => {
            let err_msg = JsValue::from(JsErr::ElementCreateFailed(&html).code());
            let array = js_sys::Array::new();
            array.push(&err_msg);
            web_sys::console::log(&array);
            panic!("{:?}", err)
        }
    }
}
