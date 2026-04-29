<script setup>
const partners = [
  'SAMSUNG', 'LG', 'HYUNDAI', 'POSCO', 'KIA', 'SK',
  'CJ', 'LOTTE', 'HANWHA', 'NAVER', 'KAKAO', 'COUPANG'
]
</script>

<template>
  <section class="partners">
    <div class="container">
      <div class="row">
        <p class="label">
          <span class="dash"></span>
          국내외 1,900여 화주사가 매주 C&k Express의 컨테이너를 띄웁니다
        </p>
        <a href="#" class="see-all">전체 고객사 보기 →</a>
      </div>
      <div class="marquee">
        <div class="track">
          <span v-for="(p, i) in [...partners, ...partners]" :key="i">{{ p }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners {
  padding: 56px 0 60px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  border-top: 1px solid var(--color-border);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.label {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: -0.005em;
}
.dash {
  width: 28px;
  height: 1px;
  background: var(--color-warm);
  flex-shrink: 0;
}
.see-all {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
}

.marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.track {
  display: flex;
  gap: 56px;
  animation: scroll 40s linear infinite;
  width: max-content;
}
.track span {
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.08em;
  color: var(--color-text-subtle);
  flex-shrink: 0;
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  transition: color var(--transition);
}
.track span:hover { color: var(--color-text); }

@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (max-width: 600px) {
  .partners { padding: 40px 0 44px; }
  .label { font-size: 12px; }
  .see-all { font-size: 12px; }
  .track span { font-size: 15px; }
}
</style>
