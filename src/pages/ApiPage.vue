<script setup>
import { ref } from 'vue'

const tab = ref('rates')

const tabs = [
  { key: 'rates', label: '운임 조회' },
  { key: 'booking', label: '예약 생성' },
  { key: 'tracking', label: '화물 추적' },
  { key: 'webhook', label: 'Webhook' }
]

const samples = {
  rates: `// GET /v1/rates
const res = await fetch('https://api.ckexp.com/v1/rates?' + new URLSearchParams({
  freight_type: 'FCL',
  pol: 'KRPUS',
  pod: 'USLAX',
  etd: '2026-05-01',
  container: '40HC'
}), {
  headers: { Authorization: 'Bearer \${TW_API_KEY}' }
})

const { data } = await res.json()
// data => [{ carrier, vessel, etd, eta, transit, price, currency }, ...]`,
  booking: `// POST /v1/bookings
await fetch('https://api.ckexp.com/v1/bookings', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer \${TW_API_KEY}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    schedule_id: 'sch_8f2a',
    shipper: { name: 'ACME Co.', business_no: '123-45-67890' },
    consignee: { name: 'Buyer Inc.', country: 'US' },
    cargo: [{ hs_code: '8517.13', qty: 200, weight_kg: 1800 }]
  })
})`,
  tracking: `// GET /v1/shipments/:id/events
const events = await tw.shipments.events('shp_a14b9c')

// returns timeline events:
// [
//   { ts: '2026-05-03T08:00Z', type: 'gate-in',   port: 'BUSAN' },
//   { ts: '2026-05-03T18:00Z', type: 'departure', port: 'BUSAN' },
//   { ts: '2026-05-17T10:00Z', type: 'arrival',   port: 'LOS ANGELES' }
// ]`,
  webhook: `// POST {your_endpoint}
// Body when shipment status changes:
{
  "event": "shipment.arrived",
  "ts": "2026-05-17T10:23:11Z",
  "data": {
    "shipment_id": "shp_a14b9c",
    "booking_id": "bk_91dfa",
    "port": "USLAX",
    "vessel": "HMM ALGECIRAS"
  }
}`
}

const endpoints = [
  { method: 'GET', path: '/v1/rates',                   desc: '실시간 운임 조회 · FCL/LCL/AIR/EXPRESS', tag: '조회' },
  { method: 'POST', path: '/v1/bookings',               desc: '신규 부킹 생성 및 화주/수하인 정보 등록', tag: '예약' },
  { method: 'GET', path: '/v1/bookings/:id',            desc: '부킹 상세 조회 (B/L, 인보이스 포함)',      tag: '예약' },
  { method: 'GET', path: '/v1/schedules',               desc: '항차/스케줄 목록 (출/도착 항만 기반)',     tag: '스케줄' },
  { method: 'GET', path: '/v1/shipments/:id/events',    desc: '화물 추적 이벤트 타임라인 조회',            tag: '추적' },
  { method: 'POST', path: '/v1/webhooks',               desc: '이벤트 알림 Webhook 등록 / 해제',          tag: 'Webhook' },
  { method: 'GET', path: '/v1/documents/:id',           desc: 'B/L · COA · Invoice 등 PDF 다운로드',     tag: '문서' },
  { method: 'GET', path: '/v1/exchange-rates',          desc: '160개국 58개 통화 환율 (T+0 기준)',        tag: '송금' }
]

const features = [
  { title: '99.9% 가용성', desc: '글로벌 멀티-리전 인프라 위에서 동작합니다.' },
  { title: '평균 응답 120ms', desc: '운임/스케줄 캐시 레이어로 빠른 응답을 보장합니다.' },
  { title: '엔터프라이즈 보안', desc: 'OAuth 2.0, IP 화이트리스트, mTLS 옵션 제공.' },
  { title: '풍부한 SDK', desc: 'Node.js / Python / Java / Go 공식 SDK 제공.' }
]

const copyState = ref('Copy')
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(samples[tab.value])
    copyState.value = 'Copied!'
    setTimeout(() => (copyState.value = 'Copy'), 1500)
  } catch (e) {
    copyState.value = 'Copy'
  }
}
</script>

<template>
  <div class="api-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <video
          class="hero-video"
          src="/hero.mp4"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          aria-hidden="true"
        ></video>
        <div class="hero-overlay"></div>
        <div class="grid"></div>
      </div>
      <div class="container hero-inner">
        <div class="hero-text">
          <span class="kicker">
            <span class="kicker-rule"></span>
            Developer Platform · v2.4
          </span>
          <h1>
            컨테이너가 항만을 떠나는 그 순간,<br />
            ERP에 한 줄이 <em>자동으로</em> 쌓입니다.
          </h1>
          <p class="lead">
            REST · Webhook · SDK. 운임 조회부터 부킹·추적·송금까지,
            C&k Express API 한 세트로 자사 시스템에 묶어둡니다.
          </p>
          <div class="actions">
            <router-link to="/login" class="btn btn-accent">API 키 발급받기</router-link>
            <a href="#docs" class="btn-link">문서 보러가기 →</a>
          </div>
          <ul class="hero-stats">
            <li>
              <span class="num">120<small>ms</small></span>
              <span class="lbl">평균 응답 속도</span>
            </li>
            <li>
              <span class="num">99.9<small>%</small></span>
              <span class="lbl">가용성 SLA</span>
            </li>
            <li>
              <span class="num">4<small>개</small></span>
              <span class="lbl">공식 SDK</span>
            </li>
          </ul>
        </div>

        <div class="code-card">
          <div class="code-tabs">
            <button v-for="t in tabs" :key="t.key" :class="{ active: tab === t.key }" @click="tab = t.key">
              {{ t.label }}
            </button>
          </div>
          <div class="code-window">
            <div class="code-bar">
              <span class="dot d-r"></span><span class="dot d-y"></span><span class="dot d-g"></span>
              <span class="code-name">app.{{ tab === 'webhook' ? 'json' : 'js' }}</span>
              <button class="copy" @click="copyCode">{{ copyState }}</button>
            </div>
            <pre><code>{{ samples[tab] }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Why -->
    <section class="why section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">WHY C&k Express API</span>
          <h2 class="section-title">개발자가 사랑하는 물류 API</h2>
          <p class="section-subtitle">REST, Webhook, SDK까지. 통합에 필요한 모든 것을 제공합니다.</p>
        </div>
        <div class="why-grid">
          <article v-for="f in features" :key="f.title" class="why-card">
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Endpoints -->
    <section class="endpoints section" id="docs">
      <div class="container">
        <div class="head">
          <span class="eyebrow">API REFERENCE</span>
          <h2 class="section-title">주요 엔드포인트</h2>
          <p class="section-subtitle">전체 레퍼런스는 문서 사이트에서 확인할 수 있습니다.</p>
        </div>
        <div class="ep-table">
          <div class="ep-row head-row">
            <span>Method</span>
            <span>Path</span>
            <span>Description</span>
            <span>Tag</span>
          </div>
          <div v-for="e in endpoints" :key="e.path" class="ep-row">
            <span class="method" :class="`m-${e.method.toLowerCase()}`">{{ e.method }}</span>
            <code class="path">{{ e.path }}</code>
            <span class="desc">{{ e.desc }}</span>
            <span class="tag">{{ e.tag }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Steps -->
    <section class="steps section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">GET STARTED</span>
          <h2 class="section-title">3 분 안에 첫 호출까지</h2>
        </div>
        <ol class="step-list">
          <li>
            <span class="num">01</span>
            <h3>회원가입 후 API 키 발급</h3>
            <p>대시보드 &gt; 개발자 &gt; API 키 메뉴에서 즉시 발급할 수 있습니다.</p>
          </li>
          <li>
            <span class="num">02</span>
            <h3>SDK 설치</h3>
            <pre class="snippet"><code>npm i @ckexp/sdk
yarn add @ckexp/sdk
pip install ckexp</code></pre>
          </li>
          <li>
            <span class="num">03</span>
            <h3>첫 운임 조회 요청</h3>
            <p>위 코드 샘플을 그대로 붙여넣고 <code>TW_API_KEY</code> 만 교체하면 됩니다.</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <div class="cta-card">
          <div>
            <h2>지금 무료로 키를 발급받고<br />첫 호출을 시작해보세요.</h2>
            <p>월 10만 콜까지 무료. 카드 등록 필요 없음.</p>
          </div>
          <div class="cta-actions">
            <router-link to="/login" class="btn btn-primary">무료로 시작하기 →</router-link>
            <router-link to="/support" class="btn btn-outline">기술 문의</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.api-page { padding-top: 64px; }

/* Hero */
.hero {
  position: relative;
  padding: 80px 0 80px;
  background: linear-gradient(135deg, #0a1530 0%, #0f1e3a 50%, #102b5b 100%);
  color: #fff;
  overflow: hidden;
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(1.15) brightness(0.92);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(7, 13, 31, 0.55) 0%, rgba(7, 13, 31, 0.35) 50%, rgba(7, 13, 31, 0.7) 100%),
    linear-gradient(90deg, rgba(7, 13, 31, 0.6) 0%, rgba(7, 13, 31, 0.05) 60%, transparent 100%);
}
.grid { display: none; }
.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 64px;
  align-items: center;
}
.kicker {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 26px;
}
.kicker-rule {
  width: 36px;
  height: 1px;
  background: var(--color-warm);
}
.hero-text h1 {
  font-size: 50px;
  font-weight: 700;
  line-height: 1.14;
  letter-spacing: -0.025em;
  margin-bottom: 24px;
  color: #fff;
}
.hero-text h1 em {
  font-style: normal;
  position: relative;
  display: inline-block;
}
.hero-text h1 em::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 8px;
  background: var(--color-warm);
  opacity: 0.6;
  z-index: -1;
}
.lead {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 36px;
  max-width: 46ch;
  line-height: 1.7;
}
.actions {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.btn-link {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  transition: border-color var(--transition), color var(--transition);
}
.btn-link:hover { color: #fff; border-bottom-color: #fff; }

.hero-stats {
  display: flex;
  gap: 0;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}
.hero-stats li {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 36px;
  margin-right: 36px;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
}
.hero-stats li:last-child {
  padding-right: 0;
  margin-right: 0;
  border-right: none;
}
.hero-stats .num {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
  font-feature-settings: 'tnum' 1;
}
.hero-stats .num small {
  font-size: 14px;
  color: var(--color-warm);
  font-weight: 500;
  margin-left: 1px;
}
.hero-stats .lbl {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
}

/* Code card */
.code-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 8px;
  backdrop-filter: blur(8px);
}
.code-tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  overflow-x: auto;
  scrollbar-width: none;
}
.code-tabs::-webkit-scrollbar { display: none; }
.code-tabs button {
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  white-space: nowrap;
  transition: all var(--transition);
}
.code-tabs button.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.code-window {
  background: #0a1530;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.code-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.dot { width: 11px; height: 11px; border-radius: 50%; }
.d-r { background: #ff5f57; }
.d-y { background: #febc2e; }
.d-g { background: #28c840; }
.code-name {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  margin-left: 8px;
  font-family: 'SF Mono', Menlo, Consolas, monospace;
}
.copy {
  margin-left: auto;
  padding: 4px 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-family: inherit;
}
.copy:hover { background: rgba(255, 255, 255, 0.12); color: #fff; }
pre {
  margin: 0;
  padding: 18px 20px 22px;
  overflow-x: auto;
  font-family: 'SF Mono', Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #d4dceb;
  white-space: pre;
}
pre code { white-space: pre; }

/* Why */
.why { background: var(--color-bg); }
.head { text-align: center; max-width: 720px; margin: 0 auto; }
.why-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.why-card {
  padding: 28px 24px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
}
.why-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}
.why-card h3 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--color-primary);
}
.why-card p { font-size: 14px; color: var(--color-text-muted); }

/* Endpoints */
.endpoints { background: var(--color-bg-soft); }
.ep-table {
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.ep-row {
  display: grid;
  grid-template-columns: 100px 280px 1fr 120px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
}
.ep-row:last-child { border-bottom: none; }
.ep-row.head-row {
  background: var(--color-bg-soft);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.method {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  font-family: 'SF Mono', Menlo, Consolas, monospace;
  letter-spacing: 0.04em;
}
.m-get { background: #e8f0fe; color: #0b5ed7; }
.m-post { background: #e8fbf3; color: #00875a; }
.path {
  font-family: 'SF Mono', Menlo, Consolas, monospace;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}
.desc { font-size: 14px; color: var(--color-text-muted); }
.tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-primary-soft);
  padding: 4px 10px;
  border-radius: 99px;
  text-align: center;
  width: fit-content;
}

/* Steps */
.steps { background: var(--color-bg); }
.step-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  counter-reset: step;
}
.step-list li {
  background: var(--color-bg-soft);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  position: relative;
}
.num {
  display: inline-block;
  font-size: 28px;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 14px;
  font-family: 'SF Mono', Menlo, Consolas, monospace;
}
.step-list h3 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
}
.step-list p {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.7;
}
.step-list code {
  background: rgba(11, 94, 215, 0.08);
  color: var(--color-primary);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'SF Mono', Menlo, Consolas, monospace;
}
.snippet {
  background: #0a1530;
  color: #d4dceb;
  font-family: 'SF Mono', Menlo, Consolas, monospace;
  font-size: 13px;
  padding: 14px 16px;
  border-radius: 10px;
  margin-top: 6px;
  overflow-x: auto;
}
.snippet code {
  background: transparent;
  color: inherit;
  padding: 0;
}

/* CTA */
.cta { padding: 96px 0; background: var(--color-bg); }
.cta-card {
  background:
    radial-gradient(ellipse at top right, rgba(0, 194, 168, 0.3), transparent 60%),
    linear-gradient(135deg, #0b5ed7 0%, #0a1530 100%);
  border-radius: var(--radius-lg);
  padding: 60px 64px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  align-items: center;
  color: #fff;
  box-shadow: var(--shadow-lg);
}
.cta-card h2 {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 12px;
}
.cta-card p { color: rgba(255, 255, 255, 0.78); font-size: 16px; }
.cta-actions { display: flex; flex-direction: column; gap: 10px; }
.cta-actions .btn { width: 100%; padding: 16px; font-size: 15px; }

@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .hero-text h1 { font-size: 40px; }
  .why-grid { grid-template-columns: repeat(2, 1fr); }
  .ep-row { grid-template-columns: 80px 1fr 100px; }
  .ep-row .desc { grid-column: 1 / -1; padding-top: 4px; }
  .step-list { grid-template-columns: 1fr; }
  .cta-card { grid-template-columns: 1fr; padding: 40px 28px; }
  .cta-card h2 { font-size: 24px; }
}

@media (max-width: 600px) {
  .hero { padding: 56px 0 60px; }
  .kicker { font-size: 11px; margin-bottom: 18px; }
  .kicker-rule { width: 24px; }
  .hero-text h1 { font-size: 30px; }
  .hero-text h1 em::after { height: 6px; bottom: 2px; }
  .lead { font-size: 14px; }
  .actions { gap: 18px; margin-bottom: 36px; }
  .actions .btn { width: 100%; }
  .hero-stats { gap: 0; padding-top: 22px; }
  .hero-stats li {
    flex: 1;
    padding-right: 12px;
    margin-right: 12px;
  }
  .hero-stats .num { font-size: 22px; }
  .hero-stats .num small { font-size: 12px; }
  .hero-stats .lbl { font-size: 11px; }
  pre { font-size: 12px; padding: 14px; }
  .why-grid { grid-template-columns: 1fr; }
  .ep-row { grid-template-columns: 70px 1fr; padding: 14px 16px; }
  .ep-row .tag { grid-column: 1 / -1; }
  .ep-row.head-row .tag, .ep-row.head-row .desc { display: none; }
  .cta { padding: 56px 0; }
}
</style>
