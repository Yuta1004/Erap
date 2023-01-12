import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import init, { gen_arm } from "erap_core";
import ArmViewer from "./components/ArmViewer";
import Control from "./components/Control";

const App = () => {
    const [wasmOk, setWasmOk] = useState(false);
    const [arms, setArms] = useState<{}[]>([]);

    useEffect(() => {
        init().then(() => {
            setWasmOk(true);
            setArms([
                gen_arm(20.0,  25.0),
                gen_arm(18.0,  40.0),
                gen_arm(35.0, -30.0)
            ]);
        });
    }, []);

    return (
        <div
            className="container"
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex"
            }}
        >
            <ArmViewer
                wasmOk={ wasmOk }
                x0={ 0 }
                y0={ 0 }
                arms={ arms }
            />
            <Control/>
        </div>
    );
}

export default App;
