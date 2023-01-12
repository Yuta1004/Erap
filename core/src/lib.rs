mod arm;

#[cfg(feature = "wasm")]
use wasm_bindgen::prelude::wasm_bindgen;

#[cfg(feature = "wasm")]
#[wasm_bindgen]
pub fn test_wasm(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[cfg(test)]
mod test {
    #[test]
    fn test_a() {
        assert!(true)
    }
}
