// 作品番号 23-41 入力
const searchInput = document.getElementById("workSearch");
if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (e.target.value.trim() === "23-41") {
                triggerShadowTransition();
            }
        }
    });
}

// 特定作品 3秒ホバー
const shadowCard = document.querySelector('.work-card[data-key="shadow-core"]');
let hoverTimer = null;

if (shadowCard) {
    shadowCard.addEventListener("mouseenter", () => {
        hoverTimer = setTimeout(() => {
            triggerShadowTransition();
        }, 3000);
    });

    shadowCard.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimer);
    });
}

// タグ「影」を3回クリック
const shadowTag = document.querySelector('.tag[data-tag="shadow"]');
let shadowClickCount = 0;
let clickTimer = null;

if (shadowTag) {
    shadowTag.addEventListener("click", () => {
        if (!clickTimer) {
            clickTimer = setTimeout(() => {
                shadowClickCount = 0;
                clickTimer = null;
            }, 10000); // 10秒以内
        }
        shadowClickCount++;
        if (shadowClickCount >= 3) {
            triggerShadowTransition();
        }
    });
}

// 遷移演出
function triggerShadowTransition() {
    const overlay = document.getElementById("transitionOverlay");
    if (!overlay) return;
    overlay.classList.add("show");
    playLowTone();
}

// 低音
function playLowTone() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 48;
    gain.gain.value = 0.2;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
}
