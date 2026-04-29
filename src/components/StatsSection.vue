<script setup>
const stats = [
  { num: '1,900', suffix: '+', label: '누적 화주사', sub: '국내 + 글로벌' },
  { num: '5,000', suffix: '+', label: '취급 카테고리', sub: 'HS 코드 기준' },
  { num: '160', suffix: '', label: '운송 국가', sub: '6개 대륙' },
  { num: '99.4', suffix: '%', label: '정시 출항률', sub: '2025 기준' }
]
</script>

<template>
  <section class="stats">
    <div class="container">
      <div class="head">
        <span class="kicker"><span class="rule"></span>By the Numbers</span>
        <h2>매주 항로 위에서 검증되는 숫자.</h2>
      </div>
      <ul class="grid">
        <li v-for="(s, i) in stats" :key="s.label">
          <span class="idx">0{{ i + 1 }}</span>
          <span class="num">
            {{ s.num }}<sup v-if="s.suffix">{{ s.suffix }}</sup>
          </span>
          <span class="label">{{ s.label }}</span>
          <span class="sub">{{ s.sub }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.stats {
  padding: 96px 0;
  background: var(--color-bg-dark);
  color: #fff;
  position: relative;
  overflow: hidden;
}
.stats::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 1px;
  background: var(--color-warm);
}

.head {
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.kicker {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
.rule {
  width: 28px;
  height: 1px;
  background: var(--color-warm);
}
.head h2 {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.025em;
  max-width: 18ch;
  line-height: 1.2;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.grid li {
  padding: 36px 28px 32px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}
.grid li:last-child { border-right: none; }
.grid li:first-child { padding-left: 0; }
.grid li:not(:first-child) { padding-left: 28px; }

.idx {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-warm);
  letter-spacing: 0.1em;
  margin-bottom: 18px;
  font-feature-settings: 'tnum' 1;
}
.num {
  font-size: 56px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.03em;
  line-height: 1;
  font-feature-settings: 'tnum' 1;
  margin-bottom: 14px;
}
.num sup {
  font-size: 22px;
  vertical-align: top;
  color: var(--color-warm);
  font-weight: 500;
  margin-left: 2px;
}
.label {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
}
.sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.02em;
}

@media (max-width: 900px) {
  .stats { padding: 72px 0; }
  .head h2 { font-size: 26px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
  .grid li {
    padding: 28px 16px 28px 0;
  }
  .grid li:not(:first-child) { padding-left: 16px; }
  .grid li:nth-child(2n) { border-right: none; }
  .grid li:nth-child(3), .grid li:nth-child(4) {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .grid li:nth-child(3) { padding-left: 0; }
  .num { font-size: 38px; }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
  .grid li {
    padding: 24px 0 !important;
    border-right: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .grid li:first-child { border-top: none; }
  .num { font-size: 36px; }
}
</style>
