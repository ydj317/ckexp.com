<script setup>
const items = [
  {
    quote: '견적부터 통관까지 한 화면에서 처리되니, 우리 팀의 야근이 절반으로 줄었습니다.',
    name: '김민수',
    role: '물류 팀장',
    company: 'ABC Korea',
    industry: '전자부품 · 연 2,400 TEU',
    yearsWith: '5년차'
  },
  {
    quote: '실시간 추적과 자동 알림 덕분에 고객 문의가 70% 가까이 줄었어요. 이제는 필수 인프라.',
    name: '이지영',
    role: 'COO',
    company: 'XYZ Trading',
    industry: '뷰티 D2C · 연 800 TEU',
    yearsWith: '3년차'
  },
  {
    quote: 'API 한 번 붙여두니 자사 ERP에 운송 데이터가 그냥 흘러 들어옵니다. 수기 입력 안녕.',
    name: '박정훈',
    role: 'CTO',
    company: '글로벌커머스',
    industry: '의류 도매 · 연 1,500 TEU',
    yearsWith: '2년차'
  }
]
</script>

<template>
  <section class="testi section">
    <div class="container">
      <div class="head">
        <div>
          <span class="eyebrow">Voices</span>
          <h2 class="section-title">매주 컨테이너를 띄우는<br />사람들의 이야기.</h2>
        </div>
        <a href="#" class="all">사례 전체 보기 →</a>
      </div>

      <ul class="grid">
        <li v-for="(t, i) in items" :key="t.name">
          <span class="idx">No. {{ String(i + 1).padStart(2, '0') }}</span>
          <p class="quote">{{ t.quote }}</p>
          <div class="meta">
            <div class="who">
              <strong>{{ t.name }}</strong>
              <span>{{ t.role }} · {{ t.company }}</span>
            </div>
            <ul class="tags">
              <li>{{ t.industry }}</li>
              <li>{{ t.yearsWith }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.testi { background: var(--color-bg); padding: 120px 0; }
.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 56px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}
.all {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  flex-shrink: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.grid li {
  padding: 4px 32px 12px 0;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}
.grid li:last-child { border-right: none; padding-right: 0; }
.grid li:not(:first-child) { padding-left: 32px; }

.idx {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-warm);
  letter-spacing: 0.1em;
  margin-bottom: 28px;
  font-feature-settings: 'tnum' 1;
}
.quote {
  font-size: 19px;
  line-height: 1.55;
  letter-spacing: -0.015em;
  color: var(--color-text);
  margin-bottom: 36px;
  font-weight: 500;
  flex-grow: 1;
  position: relative;
  padding-left: 18px;
}
.quote::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--color-warm);
}

.meta {
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}
.who { margin-bottom: 12px; }
.who strong {
  display: block;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
}
.who span {
  font-size: 12px;
  color: var(--color-text-muted);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tags li {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border-strong);
  padding: 3px 8px;
  border-radius: 99px;
  letter-spacing: 0.02em;
}

@media (max-width: 900px) {
  .testi { padding: 64px 0; }
  .head { flex-direction: column; align-items: flex-start; gap: 16px; }
  .grid { grid-template-columns: 1fr; }
  .grid li {
    border-right: none !important;
    border-bottom: 1px solid var(--color-border);
    padding: 28px 0 32px !important;
  }
  .grid li:last-child { border-bottom: none; }
  .quote { font-size: 17px; }
}
</style>
