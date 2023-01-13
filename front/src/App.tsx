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
    const [gameTime, setGameTime] = useState(0);
    const [gameTimer, setGameTimer] = useState<NodeJS.Timer>();

    const gameFinCallback = () => {
        alert("!!CONGRATULATIONS!!\nTime : " + gameTime + "s!");
        setGameStat(false);
        clearInterval(gameTimer);
    }

    useEffect(() => {
        init().then(() => {
            setWasmOk(true);
            setArms([gen_arm(15.0, 45.0)]);
        });
    }, []);

    useEffect(() => {
        if (gameStat) {
            setGameTimer(setInterval(() => {
                setGameTime((gameTime) => gameTime + 1);
            }, 1000))
        } else {
            clearInterval(gameTimer);
        }
        setGameTime(0);
    }, [gameStat]);

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
                <h2>{ "TIME: " + gameTime + "s"}</h2>
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
