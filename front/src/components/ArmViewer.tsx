import { useEffect, useState, useContext } from "react";

import { calc_endpoints } from "erap_core";
import { RobotArmsContext } from "../App";

interface ArmEndpoint {
    x: number,
    y: number,
    theta: number
}

const ArmViewer = (props: { wasmOk: Boolean }) => {
    const [centerX, setCenterX] = useState(0.0);
    const [centerY, setCenterY] = useState(0.0);
    const [context, setContext] = useState<CanvasRenderingContext2D|null>(null);

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
        calc_endpoints(0.0, 0.0, arms).forEach((endpoint: ArmEndpoint) => {
            context!!.beginPath();
            context!!.arc(...cpos(endpoint.x*5, endpoint.y*5), 15, 0, Math.PI * 2, true);
            context!!.stroke();
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
        if (props.wasmOk) {
            drawBackGround();
            drawArms();
        }
    }, [props.wasmOk, arms]);

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
