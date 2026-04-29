<script setup>
defineProps({
  eyebrow: String,
  title: String,
  description: String,
  items: { type: Array, default: () => [] },
  reverse: Boolean,
  alt: Boolean
})
</script>

<template>
  <section class="split section" :class="{ alt }">
    <div class="container" :class="{ reverse }">
      <div class="text">
        <span class="eyebrow">{{ eyebrow }}</span>
        <h2 class="section-title">{{ title }}</h2>
        <p class="desc">{{ description }}</p>
        <ul class="items">
          <li v-for="(item, i) in items" :key="i">
            <span class="bullet">{{ String(i + 1).padStart(2, '0') }}</span>
            <span>{{ item }}</span>
          </li>
        </ul>
        <a href="#" class="more">자세히 보기 →</a>
      </div>

      <div class="visual">
        <div class="dash dash-tl"></div>
        <div class="dash dash-br"></div>
        <div class="panel">
          <div class="panel-head">
            <span>운송 현황</span>
            <span class="live"><i></i> LIVE</span>
          </div>
          <ul class="rows">
            <li>
              <div>
                <strong>BUSAN → LAX</strong>
                <span>HMM ALGECIRAS · Voy. 0125W</span>
              </div>
              <span class="status s-live">운송 중 · D-3</span>
            </li>
            <li>
              <div>
                <strong>SHA → ICN</strong>
                <span>EVER GIVEN · Voy. 0815E</span>
              </div>
              <span class="status s-done">입고 완료</span>
            </li>
            <li>
              <div>
                <strong>HKG → ROT</strong>
                <span>MAERSK EDISON · Voy. 512N</span>
              </div>
              <span class="status s-wait">서류 대기</span>
            </li>
          </ul>
          <div class="bar-row">
            <div>
              <span class="bar-lbl">이번 주 운송 진행률</span>
              <span class="bar-num">72 <em>/ 100</em></span>
            </div>
            <div class="bar"><div class="bar-fill" style="width:72%"></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.split { background: var(--color-bg); padding: 96px 0; }
.split.alt { background: var(--color-bg-soft); }

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.container.reverse .text { order: 2; }
.container.reverse .visual { order: 1; }

.desc {
  font-size: 16px;
  color: var(--color-text-muted);
  margin-bottom: 36px;
  line-height: 1.7;
  max-width: 44ch;
}
.items {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 36px;
  border-top: 1px solid var(--color-border);
}
.items li {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 15px;
  color: var(--color-text);
  line-height: 1.55;
}
.bullet {
  font-size: 11px;
  color: var(--color-warm);
  font-weight: 500;
  letter-spacing: 0.06em;
  flex-shrink: 0;
  padding-top: 3px;
  font-feature-settings: 'tnum' 1;
}
.more {
  display: inline-block;
  color: var(--color-text);
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  transition: color var(--transition), border-color var(--transition);
}
.more:hover {
  color: var(--color-warm);
  border-color: var(--color-warm);
}

.visual {
  position: relative;
  padding: 40px;
}
.dash {
  position: absolute;
  width: 60px;
  height: 60px;
  border-color: var(--color-warm);
  pointer-events: none;
}
.dash-tl {
  top: 0;
  left: 0;
  border-top: 1px solid;
  border-left: 1px solid;
}
.dash-br {
  bottom: 0;
  right: 0;
  border-bottom: 1px solid;
  border-right: 1px solid;
}

.panel {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-md);
}
.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 4px;
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}
.live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: 600;
  letter-spacing: 0.1em;
}
.live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d97706;
  animation: blink 1.6s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.rows li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
}
.rows li:last-child { border-bottom: none; }
.rows strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 2px;
}
.rows span {
  font-size: 12px;
  color: var(--color-text-subtle);
}
.status {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 99px;
  white-space: nowrap;
  flex-shrink: 0;
}
.s-live { background: var(--color-warm-soft); color: var(--color-warm); }
.s-done { background: #e8f0fb; color: var(--color-primary); }
.s-wait { background: var(--color-bg-soft); color: var(--color-text-muted); }

.bar-row {
  margin-top: 16px;
  padding-top: 18px;
  border-top: 1px solid var(--color-border);
}
.bar-row > div:first-child {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.bar-lbl {
  font-size: 12px;
  color: var(--color-text-muted);
}
.bar-num {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
  font-feature-settings: 'tnum' 1;
}
.bar-num em {
  font-style: normal;
  font-size: 13px;
  color: var(--color-text-subtle);
  font-weight: 500;
}
.bar {
  height: 4px;
  background: var(--color-bg-soft);
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  background: var(--color-text);
}

@media (max-width: 1024px) {
  .container { grid-template-columns: 1fr; gap: 48px; }
  .container.reverse .text { order: 1; }
  .container.reverse .visual { order: 2; }
  .visual { max-width: 520px; margin: 0 auto; width: 100%; padding: 32px; }
}
@media (max-width: 600px) {
  .split { padding: 64px 0; }
  .visual { padding: 24px; }
  .dash { width: 36px; height: 36px; }
}
</style>
