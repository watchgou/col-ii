pub enum JsErr {
    TagNotExist,
}

impl JsErr {
    pub fn message(&self) -> &str {
        match self {
            JsErr::TagNotExist => "tag does not exist",
        }
    }
}
