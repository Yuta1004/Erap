import { useEffect, useState, useContext } from "react";

import { calc_endpoints } from "erap_core";
import { RobotArmsContext, WasmStatContext } from "../App";

const ArmViewer = () => {
    const [centerX, setCenterX] = useState(0.0);
    const [centerY, setCenterY] = useState(0.0);
    const [context, setContext] = useState<CanvasRenderingContext2D|null>(null);

    const wasmOk = useContext(WasmStatContext);
    const [arms, setArms] = useContext(RobotArmsContext);

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
        context!!.stroke();

        // Y軸
        context!!.beginPath();
        context!!.moveTo(...cpos(0, -centerY));
        context!!.lineTo(...cpos(0, centerY));
        context!!.closePath();
        context!!.stroke();
    };

    const drawArms = () => {
        // 原点
        context!!.beginPath();
        context!!.arc(...cpos(0, 0), 15, 0, Math.PI * 2, true);
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
            drawBackGround();
            drawArms();
        }
    }, [wasmOk, arms]);

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
