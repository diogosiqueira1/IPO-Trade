/**
 * IPO Trade — Interactive Exchange Simulation & Developer Tools
 * Live Slot Ticker, Arbitrage Calculator & Package Asset Downloader
 */

import { showToast } from './components.js';

export function initIpoTradeApp() {
  initLiveTicker();
  initArbitrageCalculator();
  initOrderBookSimulation();
  initPackageDownloads();
}

/* ==========================================================================
   1. LIVE SLOTS MARKET TICKER
   ========================================================================== */
function initLiveTicker() {
  const tickerItems = [
    { name: 'FORTUNE TIGER', price: 142.85, change: +8.4, volume: '$1.4M' },
    { name: 'GATES OF OLYMPUS', price: 289.40, change: -2.1, volume: '$2.8M' },
    { name: 'SWEET BONANZA', price: 94.10, change: +14.6, volume: '$980K' },
    { name: 'BIG BASS BONANZA', price: 62.50, change: +4.2, volume: '$620K' },
    { name: 'AVIATOR PRO', price: 412.00, change: +21.9, volume: '$4.1M' },
    { name: 'STARBURST XXXTREME', price: 78.30, change: -1.4, volume: '$410K' }
  ];

  const track = document.getElementById('marketTickerTrack');
  if (!track) return;

  function renderTicker() {
    let html = '';
    // Duplicate array for infinite marquee illusion
    const doubled = [...tickerItems, ...tickerItems];
    doubled.forEach(item => {
      const isPositive = item.change >= 0;
      html += `
        <div class="ticker-pill" style="display:inline-flex;align-items:center;gap:0.75rem;padding:0.55rem 1.1rem;background:rgba(255,255,255,0.04);border:1px solid var(--border-subtle);border-radius:var(--r-full);font-size:var(--text-xs);white-space:nowrap;">
          <span style="font-weight:700;color:var(--text-white);">${item.name}</span>
          <span class="mono" style="color:var(--text-muted);">$${item.price.toFixed(2)}</span>
          <span style="color:${isPositive ? 'var(--color-success)' : 'var(--color-danger)'};font-weight:600;display:inline-flex;align-items:center;gap:0.2rem;">
            ${isPositive ? '▲ +' : '▼ '}${item.change.toFixed(1)}%
          </span>
          <span style="color:var(--text-faint);font-size:10px;">Vol: ${item.volume}</span>
        </div>
      `;
    });
    track.innerHTML = html;
  }

  renderTicker();

  // Periodically fluctuate random slot price slightly
  setInterval(() => {
    const randIdx = Math.floor(Math.random() * tickerItems.length);
    const delta = (Math.random() - 0.48) * 1.5;
    tickerItems[randIdx].price = Math.max(10, tickerItems[randIdx].price + delta);
    tickerItems[randIdx].change += (delta > 0 ? 0.3 : -0.3);
    renderTicker();
  }, 4000);
}

/* ==========================================================================
   2. INTERACTIVE ARBITRAGE CALCULATOR
   ========================================================================== */
function initArbitrageCalculator() {
  const amountInput = document.getElementById('calcAmount');
  const slotSelect = document.getElementById('calcSlot');
  const resultSpread = document.getElementById('calcResultSpread');
  const resultProfit = document.getElementById('calcResultProfit');
  const resultFee = document.getElementById('calcResultFee');

  if (!amountInput || !resultProfit) return;

  function calculate() {
    const amount = parseFloat(amountInput.value) || 0;
    const baseSpread = 2.85; // 2.85% spread
    const feeRate = 0.0015;  // 0.15% fee
    
    const grossProfit = amount * (baseSpread / 100);
    const fee = amount * feeRate;
    const netProfit = grossProfit - fee;

    if (resultSpread) resultSpread.textContent = `+${baseSpread.toFixed(2)}%`;
    if (resultFee) resultFee.textContent = `$${fee.toFixed(2)}`;
    resultProfit.textContent = `$${Math.max(0, netProfit).toFixed(2)}`;
  }

  amountInput.addEventListener('input', calculate);
  if (slotSelect) slotSelect.addEventListener('change', calculate);
  calculate();
}

/* ==========================================================================
   3. ORDERBOOK LIVE DEPTH SIMULATION
   ========================================================================== */
function initOrderBookSimulation() {
  const container = document.getElementById('orderBookContainer');
  if (!container) return;

  const asks = [
    { price: 143.20, size: 24.5, total: 3508.4 },
    { price: 143.05, size: 18.2, total: 2603.5 },
    { price: 142.95, size: 45.0, total: 6432.7 },
    { price: 142.88, size: 12.0, total: 1714.5 }
  ];

  const bids = [
    { price: 142.82, size: 30.4, total: 4341.7 },
    { price: 142.75, size: 52.1, total: 7437.2 },
    { price: 142.60, size: 14.8, total: 2110.4 },
    { price: 142.40, size: 68.0, total: 9683.2 }
  ];

  function renderRows() {
    let asksHtml = asks.map(a => `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:0.35rem 0.75rem;font-family:var(--font-mono);font-size:var(--text-xs);position:relative;">
        <div style="position:absolute;inset:0;right:auto;width:${Math.min(100, a.size * 1.5)}%;background:rgba(239,68,68,0.1);pointer-events:none;"></div>
        <span style="color:var(--color-danger);font-weight:600;">$${a.price.toFixed(2)}</span>
        <span style="color:var(--text-muted);text-align:right;">${a.size.toFixed(1)}</span>
        <span style="color:var(--text-faint);text-align:right;">$${a.total.toFixed(0)}</span>
      </div>
    `).join('');

    let bidsHtml = bids.map(b => `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;padding:0.35rem 0.75rem;font-family:var(--font-mono);font-size:var(--text-xs);position:relative;">
        <div style="position:absolute;inset:0;right:auto;width:${Math.min(100, b.size * 1.5)}%;background:rgba(63,207,142,0.1);pointer-events:none;"></div>
        <span style="color:var(--color-success);font-weight:600;">$${b.price.toFixed(2)}</span>
        <span style="color:var(--text-muted);text-align:right;">${b.size.toFixed(1)}</span>
        <span style="color:var(--text-faint);text-align:right;">$${b.total.toFixed(0)}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div style="margin-bottom:0.75rem;">${asksHtml}</div>
      <div style="padding:0.4rem 0.75rem;background:rgba(255,255,255,0.03);display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:var(--text-xs);font-weight:700;border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle);">
        <span>LAST: <strong style="color:var(--lemongrass);">$142.85</strong></span>
        <span style="color:var(--color-success);">SPREAD: 0.04%</span>
      </div>
      <div style="margin-top:0.75rem;">${bidsHtml}</div>
    `;
  }

  renderRows();
}

/* ==========================================================================
   4. PACKAGE DOWNLOAD ENGINE (Export Assets directly)
   ========================================================================== */
function initPackageDownloads() {
  const downloadTokensBtn = document.getElementById('btnDownloadTokensJson');
  if (downloadTokensBtn) {
    downloadTokensBtn.addEventListener('click', () => {
      fetch('tokens.json')
        .then(r => r.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ipotrade-tokens.json';
          a.click();
          URL.revokeObjectURL(url);
          showToast('tokens.json baixado com sucesso!');
        })
        .catch(() => {
          showToast('Iniciando download do pacote...');
        });
    });
  }
}
