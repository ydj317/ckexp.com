<script setup>
const services = [
  {
    key: 'forwarding',
    no: '01',
    tag: 'Forwarding',
    title: '국제 포워딩',
    desc: '해상·항공·특송을 한 워크플로에. 견적부터 통관까지 종이 없이 처리합니다.',
    points: ['해상 FCL/LCL', '항공 / 특송', '복합 운송 (Sea + Rail)']
  },
  {
    key: 'fulfillment',
    no: '02',
    tag: 'Fulfillment',
    title: '풀필먼트',
    desc: '국내·해외 보관, 피킹·패킹·배송. 셀러를 위한 풀스택 운영 인프라.',
    points: ['국내 3PL 센터 12곳', 'B2B / B2C 출고', '재고 실시간 동기화']
  },
  {
    key: 'po',
    no: '03',
    tag: 'PO Management',
    title: 'PO 관리',
    desc: '구매 오더 단위로 협력사 일정과 문서를 한 화면에서 관리합니다.',
    points: ['멀티 벤더 통합', '문서 자동 정리', '일정 알림']
  },
  {
    key: 'remittance',
    no: '04',
    tag: 'Remittance',
    title: '국제 송금 (T/T)',
    desc: '160개국 58개 통화. 송금부터 환율 헷지까지 같은 자리에서.',
    points: ['실시간 환율', 'SWIFT 송금', '낮은 수수료']
  },
  {
    key: 'api',
    no: '05',
    tag: 'Open API',
    title: '오픈 API',
    desc: '자사 ERP·WMS와 연동해 운송 데이터를 자동 동기화합니다.',
    points: ['REST API', 'Webhook', 'Node · Python · Java SDK']
  },
  {
    key: 'insight',
    no: '06',
    tag: 'Insight',
    title: '데이터 인사이트',
    desc: '월간 KPI, 운송 비용 분석, 예측 ETA를 매주 메일함으로.',
    points: ['커스텀 대시보드', 'CSV / Excel 내보내기', '주간 리포트']
  }
]
</script>

<template>
  <section class="services section" id="services">
    <div class="container">
      <div class="head">
        <div class="head-l">
          <span class="eyebrow">Services</span>
          <h2 class="section-title">한 곳에서 끝나는 글로벌 무역.</h2>
        </div>
        <p class="head-r">
          무역 한 건이 시작되는 순간부터 끝날 때까지,
          탑월드는 6개의 모듈로 빈 공간을 메웁니다.
        </p>
      </div>

      <ul class="grid">
        <li v-for="s in services" :key="s.title" class="card">
          <div class="card-top">
            <span class="no">{{ s.no }}</span>
            <span class="tag">{{ s.tag }}</span>
          </div>
          <div class="icon">
            <svg v-if="s.key === 'forwarding'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 17h18l-1.5 3H4.5L3 17z" /><path d="M5 17V9h14v8" />
              <path d="M9 9V6h6v3" /><path d="M5 13h14" />
            </svg>
            <svg v-else-if="s.key === 'fulfillment'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" /><path d="M3 7l9 4 9-4" />
              <path d="M12 21V11" /><path d="M7.5 5.25l9 4" />
            </svg>
            <svg v-else-if="s.key === 'po'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="4" width="12" height="17" rx="2" />
              <path d="M9 4v2h6V4" /><path d="M9 11h6M9 15h6M9 19h4" />
            </svg>
            <svg v-else-if="s.key === 'remittance'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" />
              <circle cx="6.5" cy="8" r="0.6" fill="currentColor" />
              <circle cx="17.5" cy="16" r="0.6" fill="currentColor" />
            </svg>
            <svg v-else-if="s.key === 'api'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="5" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="12" r="2" />
              <path d="M7 6h6a4 4 0 0 1 4 4v0" /><path d="M7 18h6a4 4 0 0 0 4-4v0" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 20h16" /><rect x="6" y="12" width="3" height="6" rx="0.5" />
              <rect x="11" y="8" width="3" height="10" rx="0.5" />
              <rect x="16" y="4" width="3" height="14" rx="0.5" />
            </svg>
          </div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
          <ul class="points">
            <li v-for="p in s.points" :key="p">{{ p }}</li>
          </ul>
          <a href="#" class="more">자세히 알아보기 →</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--color-bg);
  padding: 120px 0;
}
.head {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 60px;
  align-items: end;
  margin-bottom: 64px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}
.head-r {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 42ch;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.card {
  position: relative;
  padding: 32px 32px 36px;
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transition: background var(--transition);
}
.card:hover { background: var(--color-bg-soft); }
.card:nth-child(3n) { border-right: none; }
.card:nth-last-child(-n+3) { border-bottom: none; }

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 32px;
}
.no {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-warm);
  letter-spacing: 0.06em;
  font-feature-settings: 'tnum' 1;
}
.tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-subtle);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.icon {
  width: 36px;
  height: 36px;
  color: var(--color-text);
  margin-bottom: 16px;
  opacity: 0.85;
}
.icon svg { width: 100%; height: 100%; }
.card h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}
.card p {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 22px;
  line-height: 1.65;
  flex-grow: 1;
}
.points {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
  padding-top: 18px;
  border-top: 1px dashed var(--color-border);
}
.points li {
  font-size: 13px;
  color: var(--color-text);
  padding-left: 14px;
  position: relative;
}
.points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 1px;
  background: var(--color-warm);
}
.more {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  align-self: flex-start;
  transition: color var(--transition), border-color var(--transition);
}
.more:hover {
  color: var(--color-warm);
  border-color: var(--color-warm);
}

@media (max-width: 1024px) {
  .head { grid-template-columns: 1fr; gap: 16px; }
}
@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .card:nth-child(3n) { border-right: 1px solid var(--color-border); }
  .card:nth-child(2n) { border-right: none; }
  .card:nth-last-child(-n+3) { border-bottom: 1px solid var(--color-border); }
  .card:nth-last-child(-n+2) { border-bottom: none; }
}
@media (max-width: 600px) {
  .services { padding: 64px 0; }
  .grid { grid-template-columns: 1fr; }
  .card {
    border-right: none !important;
    border-bottom: 1px solid var(--color-border) !important;
    padding: 28px 0;
  }
  .card:last-child { border-bottom: none !important; }
}
</style>
