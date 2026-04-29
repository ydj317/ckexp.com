<script setup>
const certs = [
  { key: 'aeo', title: 'AEO 인증', code: '관세청 종합인증 우수업체', year: '2018' },
  { key: 'iso', title: 'ISO 9001', code: '품질경영시스템 국제 인증', year: '2020' },
  { key: 'iata', title: 'IATA CASS', code: '국제 항공 운송 협회 가맹', year: '2019' },
  { key: 'wca', title: 'WCA Network', code: '글로벌 포워딩 네트워크 멤버', year: '2016' }
]
</script>

<template>
  <section class="cert section">
    <div class="container">
      <div class="head">
        <div class="head-left">
          <span class="eyebrow">Trust & Compliance</span>
          <h2 class="section-title">규정과 보안.<br />출항 전에 우리가 끝냅니다.</h2>
        </div>
        <p class="head-right">
          AEO·ISO·IATA·WCA — 18년 동안 누적해 온 인증과 네트워크가
          매 컨테이너의 통관과 보험을 떠받칩니다.
        </p>
      </div>

      <ul class="grid">
        <li v-for="c in certs" :key="c.title">
          <div class="visual">
            <svg v-if="c.key === 'aeo'" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4l10 4v8c0 6-4.5 10-10 12C10.5 26 6 22 6 16V8l10-4z" />
              <path d="M11 16l3.5 3.5L21 13" />
            </svg>
            <svg v-else-if="c.key === 'iso'" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="16" cy="13" r="7" />
              <path d="M11 19l-3 9 5-2 3 4 3-9" />
              <path d="M21 19l3 9-5-2" />
              <circle cx="16" cy="13" r="3" />
            </svg>
            <svg v-else-if="c.key === 'iata'" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 18l9-2 4-9 2 1-2 8 8-2 1 2-8 4-1 9-2-1 1-7-9 2-3-5z" />
            </svg>
            <svg v-else viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="16" cy="16" r="11" />
              <path d="M5 16h22" />
              <path d="M16 5c3 3 4.5 7 4.5 11s-1.5 8-4.5 11c-3-3-4.5-7-4.5-11s1.5-8 4.5-11z" />
            </svg>
          </div>
          <div class="content">
            <div class="title-row">
              <h3>{{ c.title }}</h3>
              <span class="year">since {{ c.year }}</span>
            </div>
            <p>{{ c.code }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cert {
  background: var(--color-bg);
  padding: 96px 0;
}
.head {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
  align-items: end;
  margin-bottom: 56px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}
.head-right {
  font-size: 15px;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 42ch;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.grid li {
  padding: 28px 24px 28px 0;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: padding var(--transition);
}
.grid li:not(:first-child) { padding-left: 24px; }
.grid li:last-child { border-right: none; }
.visual {
  width: 44px;
  height: 44px;
  color: var(--color-text);
  opacity: 0.85;
}
.visual svg { width: 100%; height: 100%; }
.title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 6px;
}
.content h3 {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.015em;
}
.year {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-warm);
  letter-spacing: 0.04em;
}
.content p {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .head {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .grid li:nth-child(2n) { border-right: none; }
  .grid li:nth-child(3), .grid li:nth-child(4) {
    border-top: 1px solid var(--color-border);
    padding-top: 28px;
  }
  .grid li:nth-child(3) { padding-left: 0; }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
  .grid li {
    padding: 24px 0 !important;
    border-right: none;
    border-top: 1px solid var(--color-border);
  }
  .grid li:first-child {
    border-top: none;
    padding-top: 0 !important;
  }
}
</style>
