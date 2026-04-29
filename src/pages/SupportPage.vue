<script setup>
import { ref, computed } from 'vue'

const tab = ref('faq')
const tabs = [
  { key: 'faq', label: '자주 묻는 질문' },
  { key: 'notice', label: '공지사항' },
  { key: 'guide', label: '이용 가이드' }
]

const categories = ['전체', '계정·결제', '운임·견적', '예약·부킹', '추적·운송', 'API·연동']
const activeCat = ref('전체')

const query = ref('')

const faqs = [
  { cat: '계정·결제', q: '회원가입은 어떻게 하나요?', a: '상단 우측 "무료 가입" 버튼을 클릭하시면 이메일 또는 SNS 계정으로 1분 안에 가입하실 수 있습니다. 사업자 회원의 경우 사업자등록증 업로드 후 영업일 1일 이내에 승인이 완료됩니다.' },
  { cat: '계정·결제', q: '결제는 어떤 방법으로 하나요?', a: '신용카드, 계좌이체, 가상계좌 결제를 지원합니다. 월 거래 1억 원 이상의 기업 회원은 후불 결제(여신)를 신청하실 수 있습니다.' },
  { cat: '운임·견적', q: '견적은 얼마나 빨리 받을 수 있나요?', a: '디지털 견적은 평균 30초 이내에 자동으로 회신됩니다. 특수 화물이나 위험물의 경우 영업 담당자가 30분 이내에 별도로 연락드립니다.' },
  { cat: '운임·견적', q: '운임에 포함되지 않는 비용이 있나요?', a: '기본 견적은 해상/항공 운임만 포함하며, 통관 수수료, 내륙 운송료, 보험료, 현지 부대비용(LCL의 경우 D/O fee 등)은 별도입니다. 모든 비용은 견적 화면에서 사전에 확인할 수 있습니다.' },
  { cat: '예약·부킹', q: '부킹 후 출항일을 변경할 수 있나요?', a: '서류 마감(Cut-off) 이전에는 무료로 변경 가능합니다. 마감 이후 변경 시 선사 정책에 따라 변경 수수료가 발생할 수 있습니다.' },
  { cat: '예약·부킹', q: '예약 취소 정책은 어떻게 되나요?', a: '서류 마감 7일 전 취소 시 무료, 3-7일 전 취소 시 운임의 30%, 3일 이내 취소 시 운임의 70%의 수수료가 부과됩니다.' },
  { cat: '추적·운송', q: '실시간 추적은 어떻게 확인하나요?', a: '대시보드의 "내 화물" 메뉴에서 운송 중인 모든 화물의 위치, 입출항 일정, ETA를 실시간으로 확인할 수 있습니다. SMS, 이메일, Webhook을 통한 알림도 가능합니다.' },
  { cat: '추적·운송', q: '화물이 지연되면 어떻게 되나요?', a: '항만 혼잡, 기상 악화 등으로 인한 지연이 발생하면 즉시 알림이 발송됩니다. 5일 이상 지연 시 보상 정책에 따라 일부 운임이 환급됩니다.' },
  { cat: 'API·연동', q: 'API 키는 어떻게 발급받나요?', a: '대시보드 > 개발자 메뉴에서 즉시 발급 가능합니다. 무료 플랜은 월 10만 콜까지 지원하며, 그 이상은 사용량 기반으로 과금됩니다.' },
  { cat: 'API·연동', q: '어떤 SDK가 제공되나요?', a: 'Node.js, Python, Java, Go 4개 언어의 공식 SDK를 제공하며, GitHub에서 오픈소스로 관리됩니다. PHP / Ruby SDK는 커뮤니티에서 관리됩니다.' }
]

const notices = [
  { date: '2026-04-25', tag: '공지', title: '5월 1일 근로자의 날 고객센터 휴무 안내', pinned: true },
  { date: '2026-04-22', tag: '업데이트', title: '신규 항만 추가: 베트남 다낭(VNDAD), 인도 문드라(INMUN)' },
  { date: '2026-04-18', tag: '점검', title: '4월 23일 새벽 02:00-04:00 시스템 정기 점검 안내' },
  { date: '2026-04-12', tag: '이벤트', title: '신규 가입 화주사 대상 첫 운임 10% 할인 프로모션' },
  { date: '2026-04-05', tag: '업데이트', title: 'Webhook v2 릴리스 및 마이그레이션 가이드' },
  { date: '2026-03-28', tag: '공지', title: '약관 개정 안내 (2026년 5월 1일 적용)' },
  { date: '2026-03-15', tag: '업데이트', title: 'AI 기반 ETA 예측 기능이 정식 출시되었습니다' }
]

const guides = [
  { tag: '시작하기', title: '5분 만에 첫 견적부터 부킹까지', read: '5분', icon: 'rocket' },
  { tag: '시작하기', title: '대시보드 핵심 기능 한눈에 보기', read: '8분', icon: 'compass' },
  { tag: '운임·견적', title: 'FCL과 LCL의 차이, 언제 어떤 것을 선택할까?', read: '6분', icon: 'box' },
  { tag: '운임·견적', title: '운임 견적서 항목 완벽 해부', read: '10분', icon: 'doc' },
  { tag: '운송 관리', title: '실시간 화물 추적 100% 활용하기', read: '7분', icon: 'route' },
  { tag: 'API', title: 'API 첫 호출, 30분 안에 끝내기', read: '12분', icon: 'code' }
]

const openIdx = ref(null)
const toggle = (i) => { openIdx.value = openIdx.value === i ? null : i }

const filteredFaqs = computed(() => {
  let list = faqs
  if (activeCat.value !== '전체') list = list.filter(f => f.cat === activeCat.value)
  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    list = list.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }
  return list
})
</script>

<template>
  <div class="support-page">
    <!-- Hero search -->
    <section class="hero">
      <div class="container">
        <span class="eyebrow light">CUSTOMER SUPPORT</span>
        <h1>무엇을 도와드릴까요?</h1>
        <p>FAQ, 가이드, 공지사항을 한 곳에서 확인하세요.</p>
        <div class="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
          </svg>
          <input v-model="query" type="text" placeholder="궁금한 내용을 검색해보세요. 예: 부킹 취소, API 키 발급" />
        </div>
        <div class="hot">
          <span>인기 검색어</span>
          <button v-for="k in ['부킹 취소', 'API 키', '운임 견적서', '추적', '결제 방법']" :key="k" @click="query = k">{{ k }}</button>
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="tab-bar">
      <div class="container">
        <div class="tabs">
          <button v-for="t in tabs" :key="t.key" :class="{ active: tab === t.key }" @click="tab = t.key">
            {{ t.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="content section" v-if="tab === 'faq'">
      <div class="container">
        <div class="cat-bar">
          <button v-for="c in categories" :key="c" :class="{ active: activeCat === c }" @click="activeCat = c">{{ c }}</button>
        </div>
        <ul class="faq">
          <li v-for="(f, i) in filteredFaqs" :key="i" :class="{ open: openIdx === i }">
            <button class="q" @click="toggle(i)">
              <span class="cat-tag">{{ f.cat }}</span>
              <span class="q-text">{{ f.q }}</span>
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            <div class="a" v-if="openIdx === i">
              <p>{{ f.a }}</p>
              <div class="a-foot">
                <span>도움이 되셨나요?</span>
                <button class="vote">👍 좋아요</button>
                <button class="vote">아쉬워요</button>
              </div>
            </div>
          </li>
          <li v-if="filteredFaqs.length === 0" class="empty">
            <p>검색 결과가 없습니다. 다른 키워드로 검색해보세요.</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Notice -->
    <section class="content section" v-else-if="tab === 'notice'">
      <div class="container">
        <ul class="notice">
          <li v-for="n in notices" :key="n.title" :class="{ pinned: n.pinned }">
            <a href="#">
              <span class="n-tag" :class="`t-${n.tag}`">{{ n.tag }}</span>
              <span class="n-title">
                <svg v-if="n.pinned" class="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 17v5M9 7h6l1 5-4 3-4-3 1-5z"/></svg>
                {{ n.title }}
              </span>
              <span class="n-date">{{ n.date }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Guides -->
    <section class="content section" v-else>
      <div class="container">
        <div class="guide-grid">
          <a v-for="g in guides" :key="g.title" href="#" class="guide-card">
            <div class="g-icon" :class="`g-${g.icon}`">
              <svg v-if="g.icon === 'rocket'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 19l3-3M9 11l4 4M14 4c4 0 6 2 6 6 0 4-7 11-7 11s-7-7-7-11l4-4 4-2z"/><circle cx="14" cy="10" r="1.6"/>
              </svg>
              <svg v-else-if="g.icon === 'compass'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2z"/>
              </svg>
              <svg v-else-if="g.icon === 'box'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/><path d="M3 7l9 4 9-4M12 21V11"/>
              </svg>
              <svg v-else-if="g.icon === 'doc'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>
              </svg>
              <svg v-else-if="g.icon === 'route'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 6h6a4 4 0 0 1 4 4v0M16 18h-6a4 4 0 0 1-4-4v0"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/>
              </svg>
            </div>
            <span class="g-tag">{{ g.tag }}</span>
            <h3>{{ g.title }}</h3>
            <span class="read">읽기 {{ g.read }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="contact section">
      <div class="container">
        <div class="head">
          <span class="eyebrow">CONTACT</span>
          <h2 class="section-title">직접 문의가 필요하신가요?</h2>
          <p class="section-subtitle">전화, 이메일, 카카오톡 채널을 통해 빠르게 답변드립니다.</p>
        </div>
        <div class="contact-grid">
          <article class="c-card">
            <div class="c-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z"/>
              </svg>
            </div>
            <h3>전화 상담</h3>
            <strong>02-1234-5678</strong>
            <p>평일 09:00 - 18:00<br />점심 12:30 - 13:30</p>
          </article>
          <article class="c-card">
            <div class="c-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
              </svg>
            </div>
            <h3>이메일</h3>
            <strong>support@topworld.co.kr</strong>
            <p>24시간 접수<br />영업일 4시간 이내 회신</p>
          </article>
          <article class="c-card">
            <div class="c-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 11c0-4.4 4-8 9-8s9 3.6 9 8-4 8-9 8c-1 0-2-.1-3-.3L4 21l1.5-4.2A7.6 7.6 0 0 1 3 11z"/>
              </svg>
            </div>
            <h3>카카오톡</h3>
            <strong>@topworld</strong>
            <p>플러스친구 추가<br />평일 09:00 - 18:00</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.support-page { padding-top: 64px; }

.hero {
  background: linear-gradient(135deg, #0a1530 0%, #102b5b 100%);
  color: #fff;
  padding: 64px 0 64px;
  text-align: center;
}
.eyebrow.light { color: #6deccf; }
.hero h1 {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 12px 0 8px;
}
.hero p { color: rgba(255, 255, 255, 0.78); font-size: 16px; margin-bottom: 32px; }

.search {
  position: relative;
  max-width: 640px;
  margin: 0 auto 16px;
}
.search svg {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
}
.search input {
  width: 100%;
  padding: 18px 20px 18px 52px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-family: inherit;
  background: #fff;
  color: var(--color-text);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}
.search input:focus { outline: 2px solid #6deccf; outline-offset: 2px; }

.hot {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}
.hot button {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.85);
  border-radius: 99px;
  font-size: 13px;
  font-weight: 500;
  transition: all var(--transition);
}
.hot button:hover { background: rgba(255, 255, 255, 0.2); color: #fff; }

.tab-bar {
  background: #fff;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 64px;
  z-index: 30;
}
.tabs { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tabs button {
  padding: 16px 24px;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-muted);
  position: relative;
  white-space: nowrap;
  transition: color var(--transition);
}
.tabs button.active {
  color: var(--color-primary);
}
.tabs button.active::after {
  content: '';
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 0;
  height: 2px;
  background: var(--color-primary);
}

.content { background: var(--color-bg-soft); padding: 48px 0 80px; }

.cat-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;
}
.cat-bar::-webkit-scrollbar { display: none; }
.cat-bar button {
  padding: 9px 16px;
  border-radius: 99px;
  background: #fff;
  border: 1px solid var(--color-border);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  white-space: nowrap;
  transition: all var(--transition);
}
.cat-bar button.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.faq { display: flex; flex-direction: column; gap: 8px; }
.faq li {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color var(--transition);
}
.faq li.open { border-color: var(--color-primary); }
.q {
  width: 100%;
  display: grid;
  grid-template-columns: 110px 1fr 24px;
  gap: 16px;
  align-items: center;
  padding: 20px 24px;
  text-align: left;
  font-family: inherit;
}
.cat-tag {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-soft);
  padding: 4px 10px;
  border-radius: 99px;
  text-align: center;
}
.q-text { font-size: 16px; font-weight: 600; }
.chev {
  width: 22px;
  height: 22px;
  color: var(--color-text-muted);
  transition: transform var(--transition);
}
.faq li.open .chev { transform: rotate(180deg); color: var(--color-primary); }
.a {
  padding: 0 24px 22px 150px;
  border-top: 1px solid var(--color-border);
  padding-top: 18px;
  margin-top: -1px;
}
.a p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 16px;
}
.a-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-muted);
}
.vote {
  padding: 6px 12px;
  background: var(--color-bg-soft);
  border-radius: 99px;
  font-size: 13px;
  color: var(--color-text);
}
.vote:hover { background: var(--color-primary-soft); color: var(--color-primary); }

.empty {
  background: #fff;
  text-align: center;
  padding: 80px 24px;
  color: var(--color-text-muted);
}

.notice {
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.notice li { border-bottom: 1px solid var(--color-border); }
.notice li:last-child { border-bottom: none; }
.notice li.pinned { background: #fffbf2; }
.notice a {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 18px 24px;
  transition: background var(--transition);
}
.notice a:hover { background: var(--color-bg-soft); }
.n-tag {
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  padding: 4px 10px;
  border-radius: 99px;
}
.t-공지 { background: #e8f0fe; color: #0b5ed7; }
.t-업데이트 { background: #e8fbf3; color: #009972; }
.t-점검 { background: #fff5e6; color: #c87f00; }
.t-이벤트 { background: #fce4f0; color: #c4317c; }
.n-title {
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.pin { width: 14px; height: 14px; color: #c87f00; }
.n-date { font-size: 13px; color: var(--color-text-muted); }

.guide-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.guide-card {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
}
.guide-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}
.g-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}
.g-icon svg { width: 26px; height: 26px; }
.g-tag {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.04em;
}
.guide-card h3 {
  font-size: 17px;
  font-weight: 800;
  line-height: 1.45;
  flex-grow: 1;
}
.read { font-size: 13px; color: var(--color-text-muted); }

/* Contact */
.contact { background: var(--color-bg); }
.head { text-align: center; max-width: 720px; margin: 0 auto; }
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.c-card {
  text-align: center;
  padding: 36px 28px;
  background: var(--color-bg-soft);
  border-radius: var(--radius-lg);
  transition: transform var(--transition), box-shadow var(--transition);
}
.c-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.c-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.c-icon svg { width: 26px; height: 26px; }
.c-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}
.c-card strong {
  display: block;
  font-size: 22px;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}
.c-card p {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .guide-grid { grid-template-columns: repeat(2, 1fr); }
  .contact-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .support-page { padding-top: 56px; }
  .tab-bar { top: 56px; }
  .hero { padding: 40px 0 40px; }
  .hero h1 { font-size: 26px; }
  .hero p { font-size: 14px; }
  .search input { padding: 14px 16px 14px 46px; font-size: 16px; }
  .search svg { left: 16px; }
  .tabs button { padding: 14px 18px; font-size: 14px; }
  .content { padding: 32px 0 56px; }

  .q {
    grid-template-columns: 1fr 22px;
    gap: 12px;
    padding: 16px 18px;
  }
  .cat-tag {
    grid-column: 1 / -1;
    width: fit-content;
    margin-bottom: -4px;
  }
  .q-text { font-size: 15px; }
  .a { padding: 14px 18px 18px; }
  .a-foot { flex-wrap: wrap; }

  .notice a {
    grid-template-columns: 1fr auto;
    padding: 14px 18px;
    row-gap: 6px;
  }
  .n-tag { grid-column: 1; justify-self: start; }
  .n-date { grid-column: 2; grid-row: 1; }
  .n-title { grid-column: 1 / -1; font-size: 14px; }

  .guide-grid { grid-template-columns: 1fr; }
}
</style>
