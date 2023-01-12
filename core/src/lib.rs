mod arm;

#[cfg(feature = "wasm")]
use wasm_bindgen::prelude::{wasm_bindgen, JsValue};

#[cfg(feature = "wasm")]
use arm::{Arm, ArmEndpoint};

#[cfg(feature = "wasm")]
#[wasm_bindgen]
pub fn test_wasm(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[cfg(feature = "wasm")]
#[wasm_bindgen]
pub fn gen_arm(length: f32, theta: f32) -> JsValue {
    let arm = Arm::new(length, theta);
    serde_wasm_bindgen::to_value(&arm).unwrap()
}

#[cfg(feature = "wasm")]
#[wasm_bindgen]
pub fn calc_endpoints(x0: f32, y0: f32, arms: JsValue) -> JsValue {
    let arms: Vec<Arm> = serde_wasm_bindgen::from_value(arms).unwrap();

    let mut endpoint = ArmEndpoint::new(x0, y0, 0.0);
    let mut endpoints = vec![];
    for arm in arms {
        endpoint = arm.calc_endpoint(&endpoint);
        endpoints.push(endpoint.clone());
    }

    serde_wasm_bindgen::to_value(&endpoints).unwrap()
}
