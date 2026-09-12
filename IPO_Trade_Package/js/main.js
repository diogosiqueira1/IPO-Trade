/**
 * IPO Trade — Master JavaScript Entrypoint
 * Initializes Particle Canvas, Counters, UI Components & Exchange Simulator
 */

import { initParticles } from './particles.js';
import { initCounters } from './counters.js';
import { initComponents } from './components.js';
import { initIpoTradeApp } from './ipotrade-app.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ambient particles in Hero
  initParticles('heroCanvas');

  // 2. Dynamic stat counters
  initCounters();

  // 3. UI Components (Modals, Tabs, Accordions, Copy, Cursor)
  initComponents();

  // 4. IPO Trade Interactive Simulator (Ticker, Orderbook, Calculator)
  initIpoTradeApp();

  console.log('⚡ IPO Trade Frontend Package Initialized.');
});
