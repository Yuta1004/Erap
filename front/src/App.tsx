import { useEffect, useState, createContext } from "react";

import init, { gen_arm } from "erap_core";
import ArmViewer from "./components/ArmViewer";
import Control from "./components/Control";

interface RobotArm {
    length: number,
    theta: number
}

type SContextType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const WasmStatContext = createContext({});
export const RobotArmsContext = createContext({} as SContextType<RobotArm[]>);

const App = () => {
    const [wasmOk, setWasmOk] = useState<Boolean>(false);
    const [arms, setArms] = useState<RobotArm[]>([]);

    useEffect(() => {
        init().then(() => {
            setWasmOk(true);
            setArms([gen_arm(15.0, 45.0)]);
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
            <WasmStatContext.Provider value={ wasmOk }>
                <RobotArmsContext.Provider value={[ arms, setArms ]}>
                    <ArmViewer/>
                    <Control/>
                </RobotArmsContext.Provider>
            </WasmStatContext.Provider>
        </div>
    );
}

export default App;
