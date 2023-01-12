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
export const GameStatContext = createContext({} as SContextType<Boolean>);

const App = () => {
    const [wasmOk, setWasmOk] = useState<Boolean>(false);
    const [arms, setArms] = useState<RobotArm[]>([]);
    const [gameStat, setGameStat] = useState<Boolean>(false);

    const gameFinCallback = () => {
        setGameStat(false);
    }

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
            <div
                style={{
                    position: "absolute",
                    top: "0px",
                    left: "10px"
                }}
            >
                <p>
                    <b>Erap</b>（Easy Robot Arm Programming）<br/>
                    実世界指向システム 課題 / 中神悠太
                </p>
                <p>{ "" + gameStat }</p>
            </div>
            <WasmStatContext.Provider value={ wasmOk }>
                <RobotArmsContext.Provider value={[ arms, setArms ]}>
                    <GameStatContext.Provider value={[ gameStat, setGameStat ]}>
                        <ArmViewer gameFinCallBack={ gameFinCallback }/>
                        <Control/>
                    </GameStatContext.Provider>
                </RobotArmsContext.Provider>
            </WasmStatContext.Provider>
        </div>
    );
}

export default App;
