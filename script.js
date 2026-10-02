function generateShadowShape(values) {
    // 数字列から影の輪郭を生成する簡易モデル
    const canvas = document.getElementById("shadowCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 2;

    ctx.beginPath();
    let x = 50, y = 150;

    values.forEach(v => {
        x += v * 20;
        y -= v * 10;
        ctx.lineTo(x, y);
    });

    ctx.stroke();
}

function replayAngle(angle) {
    const result = document.getElementById("angleResult");
    result.innerText = `影のずれ：${(angle * 0.03).toFixed(2)} units`;
}

function simulateDisplacement(values, angle, time) {
    const result = document.getElementById("dispResult");
    const final = values[values.length - 1] + angle * 0.02 + time * 0.01;
    result.innerText = `最終影形変位：${final.toFixed(2)} units`;
}
