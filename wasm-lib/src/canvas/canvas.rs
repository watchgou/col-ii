use crate::JsErr;
use wasm_bindgen::JsValue;
use web_sys::Element;

pub fn draw_canvas() -> Element {
    let document = web_sys::window().unwrap().document().expect("error");
    if let Some(id) = document.query_selector("#learn-draw").unwrap() {
        let canvas_tag = r#"
        <canvas id="canvas-content"></canvas>
        "#;
        id.set_inner_html(canvas_tag);
        let canvas_ele = document.query_selector("#canvas-content").unwrap().unwrap();
        canvas_ele
            .set_attribute(
                "style",
                "height: 500px; width: 500px; background-color: white;",
            )
            .unwrap();
        id
    } else {
        let err_msg = JsValue::from(JsErr::TagNotExist.message());
        let array = js_sys::Array::new();
        array.push(&err_msg);
        web_sys::console::log(&array);
        let canvas_ele = document.create_element("canvas").unwrap();
        canvas_ele
            .set_attribute(
                "style",
                "height: 500px; width: 500px; background-color: white;",
            )
            .unwrap();
        canvas_ele
    }
}
