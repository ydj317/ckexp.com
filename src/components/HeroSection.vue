<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mode = ref('FCL')
const modes = ['FCL', 'LCL', 'AIR', 'EXPRESS']
const origin = ref('')
const destination = ref('')
const date = ref('')

const submit = () => {
  router.push({
    path: '/forwarding/schedule',
    query: {
      freightType: mode.value,
      pol: origin.value || 'BUSAN, KR (KRPUS)',
      pod: destination.value || 'LOS ANGELES, US (USLAX)',
      etd: date.value || '2026-05-01'
    }
  })
}
</script>

<template>
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
    </div>

    <div class="container hero-inner">
      <div class="hero-text">
        <span class="kicker">
          <span class="kicker-rule"></span>
          Since 2008 · Forwarding & Trade
        </span>
        <h1>
          항로는 매일 바뀌어도,<br />
          탑월드의 운임은<br />
          <em>흔들리지 않습니다.</em>
        </h1>
        <p class="lead">
          1,900여 화주사가 매주 의지하는 디지털 포워딩.<br />
          견적·부킹·추적·정산을 한 자리에서, 서류는 우리가 챙깁니다.
        </p>
        <div class="hero-actions">
          <a href="#" class="btn btn-accent">무료로 시작하기</a>
          <a href="#" class="btn-link">서비스 소개 영상 →</a>
        </div>

        <ul class="hero-meta">
          <li>
            <span class="num">1,900<sup>+</sup></span>
            <span class="lbl">누적 화주사</span>
          </li>
          <li>
            <span class="num">160</span>
            <span class="lbl">운송 국가</span>
          </li>
          <li>
            <span class="num">58</span>
            <span class="lbl">지원 통화</span>
          </li>
        </ul>
      </div>

      <div class="quote-card">
        <div class="quote-card-head">
          <span class="card-eyebrow">Instant Quote</span>
          <h2>30초 자동 견적</h2>
        </div>

        <div class="quote-tabs">
          <button
            v-for="m in modes"
            :key="m"
            :class="{ active: mode === m }"
            @click="mode = m"
          >{{ m }}</button>
        </div>

        <div class="quote-form">
          <label>
            <span>출발지</span>
            <input v-model="origin" type="text" placeholder="BUSAN, KR" />
          </label>
          <label>
            <span>도착지</span>
            <input v-model="destination" type="text" placeholder="LOS ANGELES, US" />
          </label>
          <div class="quote-row">
            <label>
              <span>출발 예정일</span>
              <input v-model="date" type="date" />
            </label>
            <label>
              <span>화물</span>
              <select>
                <option>20FT</option>
                <option>40FT</option>
                <option>40FT HC</option>
                <option>혼적(LCL)</option>
              </select>
            </label>
          </div>
          <button class="btn btn-accent quote-submit" @click="submit">즉시 견적 받기</button>
          <p class="quote-hint">평균 회신 30초 · 신용카드 등록 불필요</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 160px 0 100px;
  background: #070d1f;
  color: #fff;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(1.05) brightness(0.95) contrast(1.05);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(7, 13, 31, 0.55) 0%, rgba(7, 13, 31, 0.35) 50%, rgba(7, 13, 31, 0.7) 100%),
    linear-gradient(90deg, rgba(7, 13, 31, 0.7) 0%, rgba(7, 13, 31, 0.1) 60%, transparent 100%);
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 80px;
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
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 28px;
}
.kicker-rule {
  width: 36px;
  height: 1px;
  background: var(--color-warm);
}

.hero-text h1 {
  font-size: 60px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 28px;
  color: #fff;
}
.hero-text h1 em {
  font-style: normal;
  position: relative;
  display: inline-block;
  color: #fff;
}
.hero-text h1 em::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 10px;
  background: var(--color-warm);
  opacity: 0.65;
  z-index: -1;
}

.lead {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 44px;
  max-width: 48ch;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 64px;
}
.btn-link {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  transition: border-color var(--transition), color var(--transition);
}
.btn-link:hover {
  color: #fff;
  border-bottom-color: #fff;
}

.hero-meta {
  display: flex;
  gap: 56px;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}
.hero-meta li {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hero-meta .num {
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fff;
  font-feature-settings: 'tnum' 1;
}
.hero-meta sup {
  font-size: 16px;
  vertical-align: top;
  color: var(--color-warm);
  font-weight: 500;
  margin-left: 1px;
}
.hero-meta .lbl {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.02em;
}

.quote-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 32px 30px;
  color: var(--color-text);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
}
.quote-card::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 24px;
  right: 24px;
  height: 2px;
  background: var(--color-warm);
}
.quote-card-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 22px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--color-border);
}
.card-eyebrow {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-warm);
  font-weight: 600;
}
.quote-card-head h2 {
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.quote-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 22px;
  border-bottom: 1px solid var(--color-border);
}
.quote-tabs button {
  flex: 1;
  padding: 10px 4px 14px;
  font-weight: 600;
  font-size: 13px;
  color: var(--color-text-subtle);
  position: relative;
  transition: color var(--transition);
  letter-spacing: 0.02em;
}
.quote-tabs button.active {
  color: var(--color-text);
}
.quote-tabs button.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--color-text);
}

.quote-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.quote-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.quote-form > label > span,
.quote-row span {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-subtle);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.quote-form input,
.quote-form select {
  padding: 12px 14px;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  font-size: 15px;
  font-family: inherit;
  background: #fff;
  transition: border var(--transition);
  font-weight: 500;
}
.quote-form input:focus,
.quote-form select:focus {
  outline: none;
  border-color: var(--color-text);
}
.quote-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 12px;
}
.quote-row label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.quote-submit {
  margin-top: 10px;
  padding: 16px;
  font-size: 15px;
  width: 100%;
}
.quote-hint {
  text-align: center;
  font-size: 12px;
  color: var(--color-text-subtle);
  margin-top: 6px;
  letter-spacing: 0.01em;
}

@media (max-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 56px;
  }
  .hero-text h1 {
    font-size: 44px;
  }
  .lead { max-width: none; }
  .hero-meta { gap: 40px; }
}

@media (max-width: 600px) {
  .hero { padding: 96px 0 56px; }
  .kicker {
    font-size: 11px;
    margin-bottom: 18px;
  }
  .kicker-rule { width: 24px; }
  .hero-text h1 { font-size: 32px; margin-bottom: 18px; }
  .hero-text h1 em::after { height: 6px; bottom: 2px; }
  .lead { font-size: 15px; margin-bottom: 32px; }
  .hero-actions { margin-bottom: 40px; gap: 18px; }
  .hero-actions .btn { width: 100%; }
  .btn-link { font-size: 13px; }

  .hero-meta {
    gap: 0;
    padding: 24px 0 0;
    justify-content: space-between;
  }
  .hero-meta li {
    flex: 1;
    border-left: 1px solid rgba(255, 255, 255, 0.12);
    padding-left: 16px;
  }
  .hero-meta li:first-child {
    border-left: none;
    padding-left: 0;
  }
  .hero-meta .num { font-size: 22px; }
  .hero-meta .lbl { font-size: 11px; }

  .quote-card { padding: 24px 20px; }
  .quote-card-head h2 { font-size: 17px; }
  .quote-row { grid-template-columns: 1fr 1fr; }
  .quote-form input,
  .quote-form select { font-size: 16px; }
}

@media (max-width: 380px) {
  .hero-text h1 { font-size: 28px; }
  .hero-meta .num { font-size: 20px; }
}
</style>
