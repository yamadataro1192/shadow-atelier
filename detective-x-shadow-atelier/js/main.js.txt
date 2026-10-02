document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  const title = document.getElementById("page-title");
  const sfx = document.getElementById("sfx-layer");

  if (page === "intro") {
    const btn = document.getElementById("start-btn");
    btn.addEventListener("click", () => {
      window.location.href = "chapter1.html";
    });
  }

  // タイトルクリック演出（ノイズ音）
  if (title && sfx) {
    title.addEventListener("click", () => {
      playSFX("click_noise");
    });
  }

  // 章解放チェック（簡易版）
  if (page.startsWith("chapter")) {
    const num = parseInt(page.replace("chapter", ""), 10);
    if (num > 1) {
      const prev = "chapter" + (num - 1) + "_cleared";
      if (!localStorage.getItem(prev)) {
        alert("前の章をクリアしていません。TOPへ戻ります。");
        window.location.href = "index.html";
      }
    }
  }

  if (page === "final") {
    if (!localStorage.getItem("chapter5_cleared")) {
      alert("第5章をクリアしていません。TOPへ戻ります。");
      window.location.href = "index.html";
    }
  }

  if (page === "ending") {
    if (!localStorage.getItem("final_cleared")) {
      alert("最終章をクリアしていません。TOPへ戻ります。");
      window.location.href = "index.html";
    }
  }
});

function playSFX(name) {
  const audio = document.getElementById("sfx-layer");
  if (!audio) return;
  audio.src = "sfx/" + name + ".mp3"; // 実際のファイルは別途配置
  audio.play().catch(() => {});
}
