# Mazu 🎰

一個基於 PixiJS + GSAP 的 HTML5 老虎機遊戲專案。

## 目前遊戲

### Storm Slot (`slot-game.html`)

5 轉輪 × 6 行的 All-Ways (7776 ways) 老虎機，直接開瀏覽器就能玩，無需安裝任何東西。

**技術棧**
- [PixiJS 7.3.2](https://pixijs.com/) — WebGL 渲染引擎（轉輪動畫）
- [GSAP 3.12.2](https://greensock.com/gsap/) — 動畫補間（中獎效果、彈跳）
- 純 HTML5 / CSS3 / Vanilla JS，零框架依賴

**玩法**
- 起始籌碼：1000
- 下注範圍：10 ~ 100（每次 +/- 10）
- 中獎條件：中間行連續 3 個以上相同符號
- 按 `SPIN` 按鈕或空白鍵轉動

**賠率表（per-way multiplier × bet）**

| 符號 | 3 連 | 4 連 | 5 連 |
|------|------|------|------|
| 💠 媽祖 | ×0.35 | ×1.40 | ×7.00 |
| 🌙 月娥 | ×0.15 | ×0.55 | ×2.80 |
| ⚡ 千里眼 | ×0.07 | ×0.28 | ×1.40 |
| 🌊 順風耳 | ×0.06 | ×0.20 | ×1.00 |
| 🏮 宮燈 | ×0.04 | ×0.14 | ×0.55 |
| 🐉 龍 | ×0.025 | ×0.09 | ×0.40 |
| 🌸 蓮花 | ×0.015 | ×0.06 | ×0.20 |
| 🔱 三叉戟 | ×0.007 | ×0.03 | ×0.10 |
| ♦ 符牌 | ×0.004 | ×0.01 | ×0.036 |

> 實際中獎金額 = 賠率 × 中獎路數(ways) × 投注額。7776-ways 結構下單一 way 賠率較小，但多路同時中獎可累積可觀獎金。

**功能特色**
- 轉輪模糊動畫效果（BlurFilter）
- 後排轉輪比前排多轉幾圈（增加期待感）
- 停輪彈跳效果
- 中獎時全符號閃爍 + 大字跳出顯示

## 快速開始（含後端）

```bash
# 安裝依賴
npm install

# 啟動後端 (default port 3000)
npm start
# 或開發模式（自動重啟）
npm run dev

# 開啟遊戲  http://localhost:3000/slot-game.html
# 管理後台  http://localhost:3000/admin.html
```

### 環境變數

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `PORT` | `3000` | 監聽端口 |
| `ADMIN_TOKEN` | `mazu-admin-2024` | 管理 API token |
| `DB_PATH` | `./mazu.db` | SQLite 資料庫路徑 |

```bash
# 生產環境建議自訂 token
ADMIN_TOKEN=your-secret-token PORT=8080 npm start
```

### RTP 模擬

```bash
# 跑 200,000 次 spin 估算 RTP 和中獎率
npm run rtp

# 也可自訂次數
node rtp-sim.js 500000
```

**RTP 驗證數據（500k spins）**

| 指標 | 數值 |
|------|------|
| RTP | 93.72% |
| House Edge | 6.28% |
| Hit Rate | 83.4% |
| 理論 RTP | 93.72% |

RTP 可透過調整 `SYMS[].pays` 陣列中的賠率值微調。每個符號的 `w` 權重控制出現頻率，`pays[3..5]` 控制 3/4/5 連線的 per-way 賠率。

## API 文件

所有管理端點需要 `Authorization: Bearer <ADMIN_TOKEN>` header。

| 方法 | 路徑 | 說明 |
|------|------|------|
| POST | `/api/spins` | 記錄一次 spin 結果 |
| GET  | `/api/admin/users` | 玩家排行（sortBy, order, limit） |
| GET  | `/api/admin/users/:userId` | 玩家詳細 + 最近 100 次記錄 |
| GET  | `/api/admin/house` | 全局 KPI（houseEdge, totalBet...） |

**POST /api/spins body 格式：**

```json
{
  "userId":       "uuid-string",
  "sessionId":    "uuid-string",
  "bet":          10,
  "win":          50,
  "freeMode":     false,
  "ts":           1700000000000,
  "balanceAfter": 1040
}
```

## 專案結構

```
mazu/
├── slot-game.html  # 媽祖老虎機（含自動 spin 追蹤）
├── admin.html      # 管理後台（香草 HTML/JS）
├── server.js       # Express + SQLite 後端
├── rtp-sim.js      # RTP 模擬腳本
├── package.json
└── mazu.db         # SQLite 資料庫（執行後自動建立）
```

---

> 🌊 Mazu — 媽祖，海上守護神。這個專案是一系列休閒遊戲的集合。

## 來源

Storm Slot 原始對話：https://claude.ai/chat/cb61a845-f5f5-47e4-9c3d-2cf20708d9c8
