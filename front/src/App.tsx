import { useEffect, useState } from "react";

import init, { test_wasm } from "erap_core";

const App = () => {
    const [msg, setMsg] = useState("Wasm modules are not initialzed yet");

    useEffect(() => {
        init().then(() => {
            setMsg(test_wasm("Erap"));
        });
    }, []);

    return (
        <div
            className="container"
            style={{
                width: "100vw",
                height: "100vh"
            }}
        >
            { msg }
        </div>
    );
}

export default App;
