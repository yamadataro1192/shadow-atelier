function generateShadowShape(values) {
    const canvas = document.getElementById("shadowCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#EDEDED";
    ctx.lineWidth = 2;

    ctx.beginPath();
    let x = 80, y = 200;

    values.forEach((v, i) => {
        setTimeout(() => {
            x += v * 22;
            y -= v * 12;
            ctx.lineTo(x, y);
            ctx.stroke();
        }, i * 180);
    });
}

function replayAngle(angle) {
    const result = document.getElementById("angleResult");
    const val = (angle * 0.03).toFixed(2);
    result.innerText = `影のずれ：${val} units`;
}

function simulateDisplacement(values, angle, time) {
    const result = document.getElementById("dispResult");
    const final = values[values.length - 1] + angle * 0.02 + time * 0.01;

    result.style.opacity = 0;
    setTimeout(() => {
        result.innerText = `最終影形変位：${final.toFixed(2)} units`;
        result.style.opacity = 1;
    }, 400);
}
