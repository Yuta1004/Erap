import { useEffect, useState, createContext } from "react";

import init, { gen_arm } from "erap_core";
import ArmViewer from "./components/ArmViewer";
import Control from "./components/Control";

type SContextType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const RobotArmsContext = createContext({} as SContextType<{}[]>);

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
            <RobotArmsContext.Provider value={[ arms, setArms ]}>
                <ArmViewer wasmOk={ wasmOk }/>
                <Control/>
            </RobotArmsContext.Provider>
        </div>
    );
}

export default App;
