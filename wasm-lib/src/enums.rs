#[cfg(test)]
use mockall::{automock, predicate::*};

pub mod err {
    pub enum JsErr {
        TagNotExist,
    }

    impl JsErr {
        pub fn message(&self) -> &str {
            match self {
                Self::TagNotExist => "tag does not exist",
            }
        }
    }
}

pub mod constants {

    pub enum Style {
        DEFAULT,
        CALL(String),
    }
    impl Style {
        pub fn code(&self) -> &str {
            match self {
                Self::DEFAULT => "",
                Self::CALL(content) => content,
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
    fn test_code() {
        assert_eq!(constants::Style::CALL("hello".to_string()).code(), "hello");
        assert_eq!(constants::Style::DEFAULT.code(), "");
    }
    #[test]
    fn test_trait() {
        let mut mock: MockFool = MockFool::new();
        mock.expect_foo().with(eq(3)).returning(|x| x + 1);
        assert_eq!(mock.foo(3), 4);
    }
}
