import { useEffect, useState } from "react";

const ArmViewer = () => {
    const [centerX, setCenterX] = useState(0.0);
    const [centerY, setCenterY] = useState(0.0);
    const [context, setContext] = useState<CanvasRenderingContext2D|null>(null);

    const cpos = (x: number, y: number): [number, number] => {
        return [centerX + x, centerY + y];
    };

    const drawBackGround = () => {
        // X軸
        context?.beginPath();
        context?.moveTo(...cpos(-centerX, 0));
        context?.lineTo(...cpos(centerX, 0));
        context?.closePath();
        context?.stroke();

        // Y軸
        context?.beginPath();
        context?.moveTo(...cpos(0, -centerY));
        context?.lineTo(...cpos(0, centerY));
        context?.closePath();
        context?.stroke();
    };

    useEffect(() => {
        const parentDiv = document.getElementById("viewer");
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (parentDiv != null && canvas != null) {
            canvas.width = parentDiv.offsetWidth;
            canvas.height = parentDiv.offsetHeight;
            setCenterX(parentDiv.offsetWidth / 2);
            setCenterY(parentDiv.offsetHeight / 2);

            const canvasContext = canvas.getContext("2d");
            setContext(canvasContext);
        }
    }, []);

    useEffect(() => {
        drawBackGround();
    }, [context]);

    return (
        <div
            id="viewer"
            style={{
                boxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                width: "100%",
                height: "100%"
            }}
        >
            <canvas
                id="canvas"
                width="100%"
                height="100%"
            />
        </div>
    );
}

export default ArmViewer;
