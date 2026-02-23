# Mazu 🎰

一個基於 PixiJS + GSAP 的 HTML5 老虎機遊戲專案。

## 目前遊戲

### Storm Slot (`slot-game.html`)

5 轉輪 × 3 行的老虎機，直接開瀏覽器就能玩，無需安裝任何東西。

**技術棧**
- [PixiJS 7.3.2](https://pixijs.com/) — WebGL 渲染引擎（轉輪動畫）
- [GSAP 3.12.2](https://greensock.com/gsap/) — 動畫補間（中獎效果、彈跳）
- 純 HTML5 / CSS3 / Vanilla JS，零框架依賴

**玩法**
- 起始籌碼：1000
- 下注範圍：10 ~ 100（每次 +/- 10）
- 中獎條件：中間行連續 3 個以上相同符號
- 按 `SPIN` 按鈕或空白鍵轉動

**賠率表**

| 符號 | 3 個 | 4 個 | 5 個 |
|------|------|------|------|
| 💎 鑽石 | ×10 | ×25 | ×100 |
| 7️⃣ 幸運7 | ×5  | ×15 | ×50  |
| ⭐ 星星 | ×4  | ×10 | ×25  |
| 🍇 葡萄 | ×3  | ×6  | ×15  |
| 🍊 橘子 | ×2  | ×4  | ×10  |
| 🍋 檸檬 | ×2  | ×3  | ×8   |
| 🍒 櫻桃 | ×1  | ×2  | ×5   |

**功能特色**
- 轉輪模糊動畫效果（BlurFilter）
- 後排轉輪比前排多轉幾圈（增加期待感）
- 停輪彈跳效果
- 中獎時全符號閃爍 + 大字跳出顯示

## 快速開始

```bash
# 直接用瀏覽器開啟，或架本地 server
cd /home/r7/mazu
python3 -m http.server 8080
# 然後開 http://localhost:8080/slot-game.html
```

## 專案結構

```
mazu/
└── slot-game.html   # Storm Slot 老虎機（單檔，自包含）
```

---

> 🌊 Mazu — 媽祖，海上守護神。這個專案是一系列休閒遊戲的集合。

## 來源

Storm Slot 原始對話：https://claude.ai/chat/cb61a845-f5f5-47e4-9c3d-2cf20708d9c8
