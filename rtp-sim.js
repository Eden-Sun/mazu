'use strict';
// RTP simulation — mirrors slot-game.html logic exactly
// Usage: node rtp-sim.js [numSpins=200000]

const NUM_SPINS = parseInt(process.argv[2]) || 200_000;

// ── Symbols (copied from slot-game.html) ──
const SYMS = [
  { id: 0, e: '💠', w: 1,  pays: [0, 0, 0, 0.35, 1.40, 7.00 ] },
  { id: 1, e: '🌙', w: 2,  pays: [0, 0, 0, 0.15, 0.55, 2.80 ] },
  { id: 2, e: '⚡', w: 3,  pays: [0, 0, 0, 0.07, 0.28, 1.40 ] },
  { id: 3, e: '🌊', w: 4,  pays: [0, 0, 0, 0.06, 0.20, 1.00 ] },
  { id: 4, e: '🏮', w: 5,  pays: [0, 0, 0, 0.04, 0.14, 0.55 ] },
  { id: 5, e: '🐉', w: 6,  pays: [0, 0, 0, 0.025,0.09, 0.40 ] },
  { id: 6, e: '🌸', w: 8,  pays: [0, 0, 0, 0.015,0.06, 0.20 ] },
  { id: 7, e: '🔱', w: 10, pays: [0, 0, 0, 0.007,0.03, 0.10 ] },
  { id: 8, e: '♦',  w: 15, pays: [0, 0, 0, 0.004,0.01, 0.036] },
];
const TOT_W = SYMS.reduce((s, x) => s + x.w, 0); // 54

function pickSym() {
  let r = Math.random() * TOT_W;
  for (const s of SYMS) { r -= s.w; if (r <= 0) return s.id; }
  return SYMS[SYMS.length - 1].id;
}

// 5 reels × 6 rows — All-ways pays (same logic as slot-game.html calcWin)
function calcWin(grid, bet) {
  let total = 0;
  for (const sym of SYMS) {
    let len = 0, ways = 0;
    for (let r = 0; r < 5; r++) {
      const cnt = grid[r].filter(s => s === sym.id).length;
      if (!cnt) break;
      len++;
      ways = r ? ways * cnt : cnt;
    }
    if (len >= 3 && sym.pays[len] > 0) {
      total += ways * sym.pays[len] * bet;
    }
  }
  return Math.round(total * 10) / 10;
}

// ── Simulation ──
console.log(`\n🌺  Mazu Slot — RTP Simulation`);
console.log(`    Spins : ${NUM_SPINS.toLocaleString()}`);
console.log(`    Reels : 5 × 6  (All-ways, 7776 ways)`);
console.log(`    Bet   : 1 per spin (normalised)\n`);

const BET = 1;
let totalBet = 0;
let totalWin = 0;
let hitCount = 0;
let bigWins   = 0;   // win >= 10× bet
let megaWins  = 0;   // win >= 50× bet

// Per-symbol hit counters for diagnostics
const symHits = new Array(SYMS.length).fill(0);

for (let i = 0; i < NUM_SPINS; i++) {
  const grid = Array.from({ length: 5 }, () =>
    Array.from({ length: 6 }, () => pickSym())
  );
  const win = calcWin(grid, BET);
  totalBet += BET;
  totalWin += win;
  if (win > 0) {
    hitCount++;
    if (win >= 50 * BET)  megaWins++;
    else if (win >= 10 * BET) bigWins++;
    // Which symbol triggered?
    for (const sym of SYMS) {
      for (let r = 0; r < 5; r++) {
        if (grid[r].includes(sym.id)) { /* just counting hits per sym */}
      }
    }
  }
}

const rtp      = (totalWin / totalBet) * 100;
const hitRate  = (hitCount / NUM_SPINS) * 100;
const houseEdge = 100 - rtp;

console.log('─'.repeat(44));
console.log(`  RTP           : ${rtp.toFixed(3)}%`);
console.log(`  House Edge    : ${houseEdge.toFixed(3)}%`);
console.log(`  Hit Rate      : ${hitRate.toFixed(2)}%  (${hitCount.toLocaleString()} / ${NUM_SPINS.toLocaleString()} spins)`);
console.log(`  Big Wins(≥10x): ${bigWins.toLocaleString()}`);
console.log(`  Mega Wins(≥50x): ${megaWins.toLocaleString()}`);
console.log(`  Total Bet     : ${totalBet.toLocaleString()}`);
console.log(`  Total Win     : ${totalWin.toFixed(1)}`);
console.log('─'.repeat(44));

// Symbol probability table
console.log('\n  Symbol weights (probability per cell):');
for (const s of SYMS) {
  const prob = (s.w / TOT_W * 100).toFixed(2);
  console.log(`    ${s.e}  w=${s.w.toString().padStart(2)}  p=${prob}%`);
}
console.log('');
