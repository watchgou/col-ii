#[cfg(test)]
use mockall::{automock, predicate::*};

pub mod err {

    pub enum JsErr<'a> {
        TagNotExist(&'a str),
        ElementCreateFailed(&'a str),
        #[warn(dead_code)]
        UnknownFields,
    }
    impl<'a> JsErr<'a> {
        pub fn code(&self) -> String {
            match self {
                Self::TagNotExist(tar) => format!("{} tag does not exist", tar),
                Self::ElementCreateFailed(ele) => format!("{} create element failed", ele),
                _ => format!("unknown error"),
            }
        }
    }
}

pub mod global_static {

    pub enum Constant {
        Get,
        Post,
        ContentType,
        ApplicationJson,
    }

    impl Constant {
        pub fn value(&self) -> &str {
            match self {
                Self::Get => "GET",
                Self::Post => "POST",
                Self::ContentType => "Content-Type",
                Self::ApplicationJson => "application/json",
            }
        }
    }
}

#[cfg_attr(test, automock)]
pub trait Fool {
    fn foo(&self, x: u32) -> u32;
}
#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_trait() {
        let mut mock: MockFool = MockFool::new();
        mock.expect_foo().with(eq(3)).returning(|x| x + 1);
        assert_eq!(mock.foo(3), 4);
    }

    #[test]
    fn test_err() {
        let tag_not_exist = err::JsErr::TagNotExist("div").code();
        assert_eq!(tag_not_exist, "div tag does not exist");
        let element_create_failed = err::JsErr::ElementCreateFailed("body").code();
        assert_eq!(element_create_failed, "body create element failed");
        let unknown_failed = err::JsErr::UnknownFields.code();
        assert_eq!(unknown_failed, "unknown error");
    }
}
