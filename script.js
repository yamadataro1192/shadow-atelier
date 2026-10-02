// ===== 影形ログ描画 =====
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
            x += Number(v) * 22;
            y -= Number(v) * 12;
            ctx.lineTo(x, y);
            ctx.stroke();
        }, i * 180);
    });
}

// ===== 影角度再現 =====
function replayAngle(angle) {
    const result = document.getElementById("angleResult");
    if (!angle) {
        alert("角度を入力してください。");
        return;
    }
    const val = (angle * 0.03).toFixed(2);
    result.innerText = `影のずれ：${val} units`;
}

// ===== 影変位シミュレーション（完全修正版） =====
function simulateDisplacement(values, angle, time) {
    const result = document.getElementById("dispResult");

    // --- 入力チェック ---
    if (!values || values.length === 0 || values[0].trim() === "") {
        alert("影形ログを入力してください。");
        return;
    }
    if (!angle) {
        alert("角度を入力してください。");
        return;
    }
    if (!time) {
        alert("時刻を入力してください。");
        return;
    }

    // --- 時刻を HHMM → 時間単位に変換 ---
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const timeInHours = hours + minutes / 60;

    // --- 計算式（3.08 が出る） ---
    const lastValue = Number(values[values.length - 1]); // ← 数値化
    const final = lastValue + angle * 0.02 + timeInHours * 0.01;

    result.style.opacity = 0;
    setTimeout(() => {
        result.innerText = `最終影形変位：${final.toFixed(2)} units`;
        result.style.opacity = 1;
    }, 400);

    // --- 二重条件判定 ---
    const correctValues = ["1.2", "1.4", "1.4", "1.7", "2.1"];
    const isValuesCorrect = JSON.stringify(values.map(v => v.trim())) === JSON.stringify(correctValues);
    const isAngleCorrect = angle === 37;
    const isTimeCorrect = time === 2341;

    // --- ロック解除条件 ---
    if (final >= 3.0 && isValuesCorrect && isAngleCorrect && isTimeCorrect) {
        document.getElementById("observerLogLink").classList.remove("locked");
        document.body.classList.add("observer-bg");
        playLowTone();
        alert("観測者ログが解放されました。");
    }
}

// ===== 低音演出 =====
function playLowTone() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 48; // 低音
    gain.gain.value = 0.25;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
}

// ===== タイトルへ戻る =====
function goHome() {
    window.location.href = "../index.html";
}
