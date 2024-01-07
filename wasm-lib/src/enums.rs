#[cfg(test)]
use mockall::{automock, predicate::*};
pub mod err {
    pub enum JsErr <'a>{
        TagNotExist(&'a str),
        ElementCreateFailed(&'a str),
    }
    impl<'a> JsErr<'a> {
        pub fn code(&self) -> String {
            match self {
                Self::TagNotExist(tar)=>format!("{} tag does not exist",tar),
                Self::ElementCreateFailed(ele)=>format!("{} create element failed",ele),
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
}
