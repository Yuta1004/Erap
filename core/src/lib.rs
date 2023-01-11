use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn test_wasm(name: &str) -> String {
    format!("Hello, {}!", name)
}
