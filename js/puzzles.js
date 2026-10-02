document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "chapter1") setupChapter1();
  if (page === "chapter2") setupChapter2();
  if (page === "chapter3") setupChapter3();
  if (page === "chapter4") setupChapter4();
  if (page === "chapter5") setupChapter5();
  if (page === "final")    setupFinal();
});

function setupChapter1() {
  const light = document.getElementById("drag-light");
  const shadow = document.getElementById("drag-shadow");
  let shadowOverLight = false;

  [light, shadow].forEach(el => {
    let dragging = false;
    let offsetX = 0, offsetY = 0;
    el.addEventListener("mousedown", e => {
      dragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      el.style.cursor = "grabbing";
    });
    document.addEventListener("mousemove", e => {
      if (!dragging) return;
      el.style.position = "absolute";
      el.style.left = (e.pageX - offsetX) + "px";
      el.style.top = (e.pageY - offsetY) + "px";
      checkOverlap();
    });
    document.addEventListener("mouseup", () => {
      dragging = false;
      el.style.cursor = "grab";
    });
  });

  function checkOverlap() {
    const rectL = light.getBoundingClientRect();
    const rectS = shadow.getBoundingClientRect();
    const overlap = !(rectL.right < rectS.left ||
                      rectL.left > rectS.right ||
                      rectL.bottom < rectS.top ||
                      rectL.top > rectS.bottom);
    shadowOverLight = overlap;
  }

  document.addEventListener("click", e => {
    const content = document.getElementById("content-area").getBoundingClientRect();
    const inContent = e.clientX >= content.left && e.clientX <= content.right &&
                      e.clientY >= content.top && e.clientY <= content.bottom;
    if (!inContent && shadowOverLight) {
      alert("この影は光学的な影ではない。第2章が解放されました。");
      localStorage.setItem("chapter1_cleared", true);
      window.location.href = "chapter2.html";
    }
  });
}

function setupChapter2() {
  const input = document.getElementById("chapter2-input");
  const btn = document.getElementById("chapter2-submit");
  const story = document.getElementById("story-text");

  // 長押し検出（簡易）
  let pressTimer;
  story.addEventListener("mousedown", e => {
    if (e.target.textContent.includes("私の影じゃない")) {
      pressTimer = setTimeout(() => {
        alert("筆跡が人間のものではない。");
        playSFX("pen_scratch");
      }, 800);
    }
  });
  document.addEventListener("mouseup", () => {
    clearTimeout(pressTimer);
  });

  btn.addEventListener("click", () => {
    if (input.value.trim() === "B記日") {
      alert("影は文字を模倣している可能性がある。第3章が解放されました。");
      localStorage.setItem("chapter2_cleared", true);
      window.location.href = "chapter3.html";
    } else {
      alert("まだ何か見落としている。");
    }
  });
}

function setupChapter3() {
  const input = document.getElementById("chapter3-input");
  const btn = document.getElementById("chapter3-submit");

  btn.addEventListener("click", () => {
    if (input.value.trim() === "38") {
      alert("絵具は影と記録をつなぐ媒介になっている。第4章が解放されました。");
      localStorage.setItem("chapter3_cleared", true);
      window.location.href = "chapter4.html";
    } else {
      alert("ピーク値をもう一度確認せよ。");
    }
  });
}

function setupChapter4() {
  const form = document.getElementById("chapter4-form");
  const btn = document.getElementById("chapter4-submit");

  // 30秒放置でログ追加（簡易）
  setTimeout(() => {
    const log = document.getElementById("cam-log");
    const li = document.createElement("li");
    li.textContent = "18:39:50 影の侵入";
    li.style.opacity = "0.5";
    log.appendChild(li);
  }, 30000);

  btn.addEventListener("click", () => {
    const val = form.hypo.value;
    if (val === "shadow") {
      alert("影は記録を奪い、自己複製を生成した可能性がある。第5章が解放されました。");
      localStorage.setItem("chapter4_cleared", true);
      window.location.href = "chapter5.html";
    } else {
      alert("この仮説では欠損の説明が不十分だ。");
    }
  });
}

function setupChapter5() {
  const form = document.getElementById("chapter5-form");
  const btn = document.getElementById("chapter5-compare");

  btn.addEventListener("click", () => {
    const checked = Array.from(form.querySelectorAll("input[type=checkbox]:checked"))
      .map(c => c.value);
    const ok = checked.includes("time") && checked.includes("paint") && checked.includes("ren");
    if (ok) {
      alert("影は光ではなく、記録から生まれた。最終章が解放されました。");
      localStorage.setItem("chapter5_cleared", true);
      window.location.href = "final.html";
    } else {
      alert("まだ照合すべき証拠がある。");
    }
  });
}

function setupFinal() {
  const input = document.getElementById("final-input");
  const btn = document.getElementById("final-submit");

  // 右下余白クリックヒント
  document.addEventListener("click", e => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (e.clientX > w * 0.7 && e.clientY > h * 0.7) {
      alert("18:39──影が最初に記録世界へ侵入した時刻。");
    }
  });

  btn.addEventListener("click", () => {
    if (input.value.trim() === "18:39") {
      alert("最終謎を解いた。エンディングが解放されました。");
      localStorage.setItem("final_cleared", true);
      window.location.href = "ending.html";
    } else {
      alert("時刻の共通点をもう一度洗い出せ。");
    }
  });
}
