FROM rust:1.63.0

WORKDIR /workdir

COPY ./Cargo.toml ./Cargo.toml

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh && \
    mkdir src && \
    touch src/lib.rs && \
    rustup target add wasm32-unknown-unknown && \
    cargo install wasm-bindgen-cli --version 0.2.83 && \
    cargo build --features wasm
