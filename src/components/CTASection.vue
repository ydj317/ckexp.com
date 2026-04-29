<template>
  <section class="cta">
    <div class="container">
      <div class="frame">
        <div class="left">
          <span class="kicker"><span class="rule"></span>Ready when you are</span>
          <h2>다음 컨테이너부터,<br />운영을 우리에게 맡겨보세요.</h2>
          <p>
            가입은 1 분.<br />
            첫 견적은 30 초 안에.
          </p>
        </div>
        <div class="right">
          <ul class="checklist">
            <li>
              <span class="bullet">01</span>
              <div>
                <strong>30일 무료 체험</strong>
                <span>카드 등록 없이 모든 모듈을 사용해보세요.</span>
              </div>
            </li>
            <li>
              <span class="bullet">02</span>
              <div>
                <strong>전담 매니저 배정</strong>
                <span>온보딩부터 첫 부킹까지 1:1로 지원합니다.</span>
              </div>
            </li>
            <li>
              <span class="bullet">03</span>
              <div>
                <strong>월 10만 API 콜 무료</strong>
                <span>그 이상은 사용한 만큼만 정산됩니다.</span>
              </div>
            </li>
          </ul>
          <div class="actions">
            <a href="#" class="btn btn-accent">무료로 시작하기</a>
            <a href="#" class="btn-link">상담 문의 →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta { padding: 120px 0; background: var(--color-bg); }
.frame {
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 80px;
  padding: 72px 0;
}
.kicker {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 24px;
}
.rule {
  width: 28px;
  height: 1px;
  background: var(--color-warm);
}
.left h2 {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.025em;
  margin-bottom: 24px;
  color: var(--color-text);
}
.left p {
  font-size: 16px;
  color: var(--color-text-muted);
  line-height: 1.7;
}

.checklist {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  border-top: 1px solid var(--color-border);
}
.checklist li {
  display: flex;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--color-border);
  align-items: flex-start;
}
.bullet {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-warm);
  letter-spacing: 0.06em;
  flex-shrink: 0;
  padding-top: 4px;
  font-feature-settings: 'tnum' 1;
}
.checklist strong {
  display: block;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}
.checklist span {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.6;
}
.actions {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.btn-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
}
.btn-link:hover { color: var(--color-warm); border-color: var(--color-warm); }

@media (max-width: 1024px) {
  .frame { grid-template-columns: 1fr; gap: 40px; padding: 48px 0; }
  .left h2 { font-size: 32px; }
}
@media (max-width: 600px) {
  .cta { padding: 64px 0; }
  .left h2 { font-size: 26px; }
  .actions .btn { width: 100%; }
}
</style>
