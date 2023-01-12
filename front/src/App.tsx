import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import init, {  } from "erap_core";
import ArmViewer from "./components/ArmViewer";

const App = () => {
    useEffect(() => {
        init().then(() => {});
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
            <ArmViewer/>
            <Box
                sx={{
                    boxSizing: "border-box",
                    WebkitBoxSizing: "border-box",
                    width: "100%",
                    height: "100%"
                }}
            />
        </div>
    );
}

export default App;
