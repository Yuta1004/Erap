import { useEffect, useState, useContext } from "react";

import { calc_endpoints } from "erap_core";
import { RobotArmsContext, WasmStatContext, GameStatContext } from "../App";

const ArmViewer = () => {
    const [centerX, setCenterX] = useState(0.0);
    const [centerY, setCenterY] = useState(0.0);
    const [context, setContext] = useState<CanvasRenderingContext2D|null>(null);

    const wasmOk = useContext(WasmStatContext);
    const [arms, setArms] = useContext(RobotArmsContext);

    const [gameStat, setGameStat] = useContext(GameStatContext);
    const [targets, setTargets] = useState<[number, number][]>([]);

    const cpos = (x: number, y: number): [number, number] => {
        return [centerX + x, centerY - y];
    };

    const drawBackGround = () => {
        // 背景
        context!!.clearRect(0, 0, centerX*2, centerY*2);

        // X軸
        context!!.beginPath();
        context!!.moveTo(...cpos(-centerX, 0));
        context!!.lineTo(...cpos(centerX, 0));
        context!!.closePath();
        context!!.strokeStyle = "rgba(0, 0, 0, 1.0)";
        context!!.stroke();

        // Y軸
        context!!.beginPath();
        context!!.moveTo(...cpos(0, -centerY));
        context!!.lineTo(...cpos(0, centerY));
        context!!.closePath();
        context!!.stroke();
    };

    const drawArms = (): [number, number] => {
        // 原点
        context!!.beginPath();
        context!!.arc(...cpos(0, 0), 15, 0, Math.PI * 2, true);
        context!!.strokeStyle = "rgba(0, 0, 0, 1.0)";
        context!!.stroke();

        // アーム
        var befX = 0, befY = 0;
        const endpoints = calc_endpoints(0.0, 0.0, arms);
        for (var idx = 0; idx < endpoints.length; ++ idx) {
            const endpoint = endpoints[idx];

            // 円
            context!!.beginPath();
            context!!.arc(...cpos(endpoint.x*5, endpoint.y*5), 15, 0, Math.PI * 2, true);
            context!!.stroke();

            // 接線1
            const diffX1 = Math.cos((endpoint.theta+90) * (Math.PI / 180)) * 15;
            const diffY1 = Math.sin((endpoint.theta+90) * (Math.PI / 180)) * 15;

            context!!.beginPath();
            context!!.moveTo(...cpos(befX+diffX1, befY+diffY1));
            context!!.lineTo(...cpos(endpoint.x*5+diffX1, endpoint.y*5+diffY1));
            context!!.closePath();
            context!!.stroke();

            // 接線2
            const diffX2 = Math.cos((endpoint.theta-90) * (Math.PI / 180)) * 15;
            const diffY2 = Math.sin((endpoint.theta-90) * (Math.PI / 180)) * 15;

            context!!.beginPath();
            context!!.moveTo(...cpos(befX+diffX2, befY+diffY2));
            context!!.lineTo(...cpos(endpoint.x*5+diffX2, endpoint.y*5+diffY2));
            context!!.closePath();
            context!!.stroke();

            befX = endpoint.x*5;
            befY = endpoint.y*5;
        }

        // アームの最先端
        context!!.beginPath();
        context!!.arc(...cpos(befX, befY), 20, 0, Math.PI * 2, true);
        context!!.fillStyle = "rgba(40, 255, 40, 1.0)";
        context!!.fill();
        context!!.stroke();

        return [befX, befY];
    }

    const drawTargets = () => {
        targets.forEach((pos, idx) => {
            if (idx > 0) {
                const [x, y] = pos;
                context!!.beginPath();
                context!!.arc(...cpos(x, y), 25, 0, Math.PI * 2, true);
                context!!.arc(...cpos(x, y), 30, 0, Math.PI * 2, true);
                context!!.strokeStyle = "rgba(255, 0, 0, 1.0)";
                context!!.stroke();
            }
        });
    }

    useEffect(() => {
        const parentDiv = document.getElementById("viewer");
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (parentDiv != null && canvas != null) {
            canvas.width = parentDiv.clientWidth;
            canvas.height = parentDiv.clientHeight;
            setCenterX(parentDiv.clientWidth / 2);
            setCenterY(parentDiv.clientHeight / 2);

            const canvasContext = canvas.getContext("2d");
            setContext(canvasContext);
        }
    }, []);

    useEffect(() => {
        if (wasmOk) {
            // 描画処理
            drawBackGround();
            drawTargets();
            const [armX, armY] = drawArms();

            // ターゲット接触判定
            if (gameStat) {
                var idx = 1;
                for (; idx < targets.length; ++ idx) {
                    const [targetX, targetY] = targets[idx];
                    if (Math.pow(armX - targetX, 2) + Math.pow(armY - targetY, 2) < 900) {
                        break;
                    }
                }
                if (idx < targets.length) {
                    targets.splice(idx, 1);
                }

                // ゲーム終了判定
                if (targets.length === 1) {
                    console.log("finish");
                }
            }
            setTargets(targets);
        }
    }, [wasmOk, arms, targets]);

    useEffect(() => {
        var newTargets = [];
        if (gameStat) {
            for (var cnt = 0; cnt < 6; ++ cnt) {
                const target: [number, number] = [
                    (Math.random()*centerX*2 - centerX) * 0.9,
                    (Math.random()*centerY*2 - centerY) * 0.9
                ];
                newTargets.push(target);
            }
        }
        setTargets(newTargets);
    }, [gameStat]);

    return (
        <div
            id="viewer"
            style={{
                boxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                flexBasis: "70%",
                height: "100%",
                border: "solid 1px black",
                overflow: "hidden"
            }}
        >
            <canvas id="canvas"/>
        </div>
    );
}

export default ArmViewer;
