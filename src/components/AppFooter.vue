<script setup>
const cols = [
  {
    title: '서비스',
    links: ['국제 포워딩', '풀필먼트', 'PO 관리', '국제 송금', '오픈 API']
  },
  {
    title: '회사',
    links: ['회사 소개', '뉴스룸', '파트너십', '채용', '연혁']
  },
  {
    title: '리소스',
    links: ['도움말 센터', '운임 캘린더', 'API 문서', '자료 다운로드']
  }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="top">
        <div class="brand">
          <a href="#" class="logo">
            <img src="/logo.png" alt="C&k Express" />
          </a>
          <p class="tagline">투명한 스케줄, 합리적인 운임으로<br />당신의 글로벌 무역을 함께합니다.</p>
          <div class="social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
                <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M8 10v7" />
                <circle cx="8" cy="7.2" r="0.9" fill="currentColor" />
                <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4M12 10v7" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v8h3v-8h2.2l.3-3H14V8z" />
              </svg>
            </a>
          </div>
        </div>

        <div class="cols">
          <div v-for="c in cols" :key="c.title" class="col">
            <h4>{{ c.title }}</h4>
            <ul>
              <li v-for="l in c.links" :key="l"><a href="#">{{ l }}</a></li>
            </ul>
          </div>
          <div class="col contact">
            <h4>고객 지원</h4>
            <ul>
              <li><strong>02-1234-5678</strong></li>
              <li>support@ckexp.com</li>
              <li>평일 09:00 - 18:00</li>
              <li>점심 12:30 - 13:30</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="legal">
        <p>
          上海希凯国际货运代理有限公司 · 대표 홍길동 · 사업자등록번호 123-45-67890<br />
          서울특별시 강남구 테헤란로 000, 00층 · 통신판매업 신고: 제2026-서울강남-0000호
        </p>
        <div class="links">
          <a href="#">이용약관</a>
          <a href="#"><strong>개인정보처리방침</strong></a>
          <a href="#">사업자정보확인</a>
        </div>
      </div>

      <div class="copy">
        <span>© 2026 C&k Express (Shanghai Cikai Int'l Freight Forwarding Co., Ltd.) All rights reserved.</span>
        <span>Built with ♥ for global traders.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, #0a1530 0%, #050b1d 100%);
  color: #fff;
  padding: 80px 0 32px;
}
.top {
  display: grid;
  grid-template-columns: 1fr 2.4fr;
  gap: 64px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.logo img {
  height: 56px;
}
.logo span {
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 0.06em;
}
.tagline {
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
  margin-bottom: 28px;
  line-height: 1.7;
}
.social {
  display: flex;
  gap: 12px;
}
.social a {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  transition: background var(--transition), transform var(--transition), color var(--transition);
}
.social a svg {
  width: 18px;
  height: 18px;
}
.social a:hover {
  background: var(--color-primary);
  transform: translateY(-2px);
}

.cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
.col h4 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #fff;
}
.col ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.col a {
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
  transition: color var(--transition);
}
.col a:hover {
  color: #fff;
}
.contact strong {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
.contact li {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
}

.legal {
  padding: 32px 0;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
}
.legal p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.8;
}
.legal .links {
  display: flex;
  gap: 24px;
  flex-shrink: 0;
}
.legal a {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}
.legal a:hover { color: #fff; }

.copy {
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 900px) {
  .top {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .cols {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .cols {
    grid-template-columns: 1fr;
  }
}
</style>
